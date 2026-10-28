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
        `http://127.0.0.1:${server.address().port}/cuckoo/index?media=1`,
        { waitUntil: "networkidle" },
      );
      const g = await p.evaluate(() => {
        const r = (s) => document.querySelector(s).getBoundingClientRect();
        return {
          title: r(".entry-title").bottom,
          image: r(".cuckoo-card-image").bottom,
          top: r(".entry-title").top,
          imageTop: r(".cuckoo-card-image").top,
        };
      });
      assert.ok(g.title <= g.image && g.top >= g.imageTop);
      assert.equal(await p.locator(".fk-sidebar").isVisible(), width > 850);
      await p.screenshot({
        path: `artifacts/ports/cuckoo-source-layout-${width}.png`,
        fullPage: true,
      });
      await p.goto(
        `http://127.0.0.1:${server.address().port}/cuckoo/post?media=1`,
      );
      await p.screenshot({
        path: `artifacts/ports/cuckoo-source-post-${width}.png`,
        fullPage: true,
      });
      await p.close();
    }
    console.log(
      "Cuckoo image/title overlay and source sidebar breakpoint verified at desktop/mobile",
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
