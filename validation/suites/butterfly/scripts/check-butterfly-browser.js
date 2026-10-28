const assert = require("node:assert/strict");
const { chromium } = require("playwright-core");
const server = require("./preview-ports")();
(async () => {
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH,
    args: ["--no-sandbox"],
  });
  try {
    for (const width of [1280, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto(
        `http://127.0.0.1:${server.address().port}/butterfly/index`,
      );
      assert.equal(
        (await page.locator(".butterfly-hero").boundingBox()).height,
        900,
      );
      await page.locator(".butterfly-scroll").click();
      assert.ok(page.url().endsWith("#main"));
      await page.goto(
        `http://127.0.0.1:${server.address().port}/butterfly/post`,
      );
      assert.equal(
        (await page.locator(".butterfly-hero").boundingBox()).height,
        width > 850 ? 400 : 360,
      );
      await page.locator(".butterfly-toc summary").click();
      const target = await page
        .locator(".butterfly-toc a")
        .first()
        .getAttribute("href");
      await page.locator(".butterfly-toc a").first().click();
      assert.ok(page.url().endsWith(target));
      assert.equal(await page.locator(".fk-sidebar").isVisible(), width > 850);
      await page.close();
    }
    console.log(
      "Butterfly: full viewport landing, distinct detail hero, reading anchor and TOC navigation passed",
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
