const assert = require("node:assert/strict");
const { chromium } = require("playwright-core");
const server = require("./preview-ports")();
(async () => {
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {}),
  });
  try {
    for (const width of [1280, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto(`http://127.0.0.1:${server.address().port}/single/index`);
      await page.locator(".single-menu summary").click();
      assert.equal(await page.locator(".fk-nav").isVisible(), true);
      assert.equal(await page.locator(".single-menu").getAttribute("open"), "");
      await page.locator("[data-single-dark]").click();
      assert.equal(
        await page.locator("[data-single-dark]").getAttribute("aria-pressed"),
        "true",
      );
      await page.reload();
      assert.equal(
        await page.locator("[data-single-dark]").getAttribute("aria-pressed"),
        "true",
      );
      const g = await page.evaluate(() => {
        const r = (s) => document.querySelector(s).getBoundingClientRect();
        return {
          excerpt: r(".entry-excerpt").bottom,
          meta: r(".entry-meta").top,
        };
      });
      assert.ok(g.excerpt <= g.meta);
      await page.close();
    }
    console.log(
      "Single: menu disclosure, persistent dark switch, excerpt/date order at desktop/mobile passed",
    );
  } finally {
    await browser.close();
    server.close();
  }
})().catch((e) => {
  console.error(e);
  server.close();
  process.exitCode = 1;
});
