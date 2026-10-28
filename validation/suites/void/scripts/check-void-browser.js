const assert = require("node:assert/strict");
const { chromium } = require("playwright-core");
const server = require("./preview-ports")();
(async () => {
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const b = await chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {}),
  });
  try {
    for (const width of [1280, 390]) {
      const p = await b.newPage({ viewport: { width, height: 900 } });
      await p.goto(
        `http://127.0.0.1:${server.address().port}/void/index?media=1&narrow=1`,
        { waitUntil: "networkidle" },
      );
      assert.equal(await p.locator(".void-banner>img").count(), 1);
      assert.equal(
        await p
          .locator(".fk-feed")
          .evaluate(
            (e) => getComputedStyle(e).gridTemplateColumns.split(" ").length,
          ),
        1,
      );
      await p.screenshot({
        path: `artifacts/ports/void-banner-narrow-${width}.png`,
        fullPage: true,
      });
      await p.goto(
        `http://127.0.0.1:${server.address().port}/void/post?media=1`,
      );
      const g = await p.evaluate(() => ({
        banner: document.querySelector(".void-banner").getBoundingClientRect()
          .bottom,
        body: document.querySelector(".void-article").getBoundingClientRect()
          .top,
      }));
      assert.ok(g.banner <= g.body);
      await p.screenshot({
        path: `artifacts/ports/void-banner-post-${width}.png`,
        fullPage: true,
      });
      await p.close();
    }
    console.log(
      "VOID banner image, narrow grid and article banner/body separation verified at desktop/mobile",
    );
  } finally {
    await b.close();
    server.close();
  }
})().catch((e) => {
  console.error(e);
  server.close();
  process.exitCode = 1;
});
