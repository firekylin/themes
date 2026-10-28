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
      await p.goto(`http://127.0.0.1:${server.address().port}/initial/post`);
      await p.locator(".initial-toc summary").click();
      const link = p.locator(".initial-toc a").first();
      const target = await link.getAttribute("href");
      await link.click();
      assert.ok(p.url().endsWith(target));
      await p.route("**/initial/index", async (r) =>
        r.fulfill({
          contentType: "text/html",
          body: await render("initial", "index", {
            config: { oneColumn: "1", fixedHeader: "1" },
          }),
        }),
      );
      await p.goto(`http://127.0.0.1:${server.address().port}/initial/index`);
      assert.equal(await p.locator(".fk-sidebar").count(), 0);
      await p.evaluate(() => scrollTo(0, 400));
      assert.equal(
        Math.round((await p.locator(".fk-header").boundingBox()).y),
        0,
      );
      assert.ok((await p.locator("main").boundingBox()).width <= 750);
      await p.close();
    }
    console.log(
      "Initial: TOC, one-column width and fixed header passed at desktop/mobile",
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
