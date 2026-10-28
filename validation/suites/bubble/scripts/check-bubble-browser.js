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
      await page.goto(`http://127.0.0.1:${server.address().port}/bubble/index`);
      const hero = await page.locator(".bubble-hero").boundingBox();
      const card = await page.locator(".bubble-card").first().boundingBox();
      const second = await page.locator(".bubble-card").nth(1).boundingBox();
      assert.equal(hero.height, 900);
      assert.ok(second.y > card.y + card.height, "single column");
      assert.ok(
        width > 768 ? card.y < 900 && card.y >= 780 : card.y >= 900,
        "responsive overlap",
      );
      await page.goto(`http://127.0.0.1:${server.address().port}/bubble/post`);
      await page.locator(".bubble-toc summary").click();
      const link = page.locator(".bubble-toc nav a").first();
      const target = await link.getAttribute("href");
      assert.ok(await page.locator(target).count());
      await link.click();
      assert.ok(page.url().endsWith(target));
      await page.close();
    }
    console.log(
      "Bubble: full-screen landing, single column, responsive overlap and native TOC passed at 1280/390px",
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
