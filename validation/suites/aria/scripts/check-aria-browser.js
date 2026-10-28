const assert = require("node:assert/strict"),
  fs = require("node:fs");
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
    fs.mkdirSync("artifacts/ports", { recursive: true });
    for (const width of [1280, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto(
        `http://127.0.0.1:${server.address().port}/aria/index?media=1`,
        { waitUntil: "networkidle" },
      );
      const g = await page.evaluate(() => {
        const r = (s) => document.querySelector(s).getBoundingClientRect();
        return {
          hero: r("#header").height,
          title: r(".card-title").bottom,
          meta: r(".card-meta-top").top,
          cover: r(".card-thumbnail").top,
          metaBottom: r(".card-meta-top").bottom,
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      assert.equal(g.hero, width > 768 ? 720 : 450);
      assert.ok(g.title <= g.meta && g.metaBottom <= g.cover);
      assert.equal(g.overflow, false);
      assert.equal(
        await page.locator(".aria-comment-count").first().getAttribute("href"),
        "/post/article-1.html#comments",
      );
      await page.screenshot({
        path: `artifacts/ports/aria-source-layout-${width}.png`,
        fullPage: true,
      });
      await page.goto(
        `http://127.0.0.1:${server.address().port}/aria/post?media=1`,
      );
      assert.equal(
        await page
          .locator("#header")
          .evaluate((e) => e.getBoundingClientRect().height),
        width > 768 ? 630 : 360,
      );
      await page.screenshot({
        path: `artifacts/ports/aria-source-post-${width}.png`,
        fullPage: true,
      });
      await page.close();
    }
    console.log(
      "Aria source geometry: image hero, title/category/date/cover order, real comment permalink and detail header checked at desktop/mobile",
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
