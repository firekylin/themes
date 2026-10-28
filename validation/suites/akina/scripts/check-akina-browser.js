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
          body: '<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="550"><rect width="1000" height="550" fill="#c5dcd9"/><path d="M0 550L350 100L700 550ZM500 550L800 180L1000 550Z" fill="#6a9e99"/></svg>',
        }),
      );
      await p.route("**/akina/index", async (r) =>
        r.fulfill({
          contentType: "text/html",
          body: await render("akina", "index", {
            media: true,
            config: {
              headimg: "/fixture.svg",
              avatar: "/fixture.svg",
              notice: "记录生活，分享想法",
            },
          }),
        }),
      );
      await p.goto(`http://127.0.0.1:${server.address().port}/akina/index`);
      assert.equal(await p.locator(".akina-hero").isVisible(), width > 860);
      assert.equal(
        Math.round(
          (await p.locator(".akina-icon img").first().boundingBox()).width,
        ),
        width > 860 ? 100 : 48,
      );
      assert.equal(
        await p
          .locator(".akina-icon img")
          .first()
          .evaluate((e) => getComputedStyle(e).borderRadius),
        "50%",
      );
      await p.screenshot({
        path: `artifacts/ports/akina-configured-${width}.png`,
        fullPage: true,
      });
      await p.goto(`http://127.0.0.1:${server.address().port}/akina/post`);
      await p.locator(".akina-toc summary").click();
      const link = p.locator(".akina-toc a").first();
      const target = await link.getAttribute("href");
      await link.click();
      assert.ok(p.url().endsWith(target));
      await p.close();
    }
    console.log(
      "Akina: responsive profile hero, round media icons and TOC passed",
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
