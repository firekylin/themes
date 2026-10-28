const assert = require("node:assert/strict");
const { chromium } = require("playwright-core");
const { render } = require("../test/port-fixture");
const server = require("./preview-ports")();
(async () => {
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH,
    args: ["--no-sandbox"],
  });
  try {
    for (const width of [1280, 390]) {
      const p = await b.newPage({ viewport: { width, height: 900 } });
      await p.route("**/fixture.svg", (r) =>
        r.fulfill({
          contentType: "image/svg+xml",
          body: '<svg xmlns="http://www.w3.org/2000/svg" width="700" height="400"><rect width="700" height="400" fill="#cce4fa"/><path d="M80 200L220 80L350 200L220 320Z" fill="#1e80ff"/></svg>',
        }),
      );
      await p.route("**/jj/index", async (r) =>
        r.fulfill({
          contentType: "text/html",
          body: await render("jj", "index", { media: true }),
        }),
      );
      await p.goto(`http://127.0.0.1:${server.address().port}/jj/index`);
      const text = await p.locator(".entry-copy").first().boundingBox(),
        thumb = await p.locator(".jj-thumb").first().boundingBox();
      assert.ok(thumb.x >= text.x + text.width);
      assert.equal(Math.round(thumb.width), width > 850 ? 120 : 80);
      await p.screenshot({
        path: `artifacts/ports/jj-configured-${width}.png`,
        fullPage: true,
      });
      await p.goto(`http://127.0.0.1:${server.address().port}/jj/post`);
      const toc = width > 850 ? ".jj-toc" : ".jj-mobile-toc";
      if (width <= 850) await p.locator(toc + " summary").click();
      const a = p.locator(toc + " a").first(),
        target = await a.getAttribute("href");
      assert.ok(await p.locator(target).count());
      await a.click();
      assert.ok(p.url().endsWith(target));
      await p.close();
    }
    console.log(
      "JJ: right thumbnail geometry and desktop/mobile TOC navigation passed",
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
