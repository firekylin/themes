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
          body: '<svg xmlns="http://www.w3.org/2000/svg" width="700" height="400"><rect width="700" height="400" fill="#b6d0c8"/><circle cx="500" cy="110" r="60" fill="#e6ddbd"/></svg>',
        }),
      );
      await p.route("**/miracles/index", async (r) =>
        r.fulfill({
          contentType: "text/html",
          body: await render("miracles", "index", {
            media: true,
            config: { bannerUrl: "/fixture.svg", bannerHeight: "50" },
          }),
        }),
      );
      await p.goto(`http://127.0.0.1:${server.address().port}/miracles/index`);
      const hero = await p.locator(".miracles-banner").boundingBox(),
        card = await p.locator(".entry-card").first().boundingBox(),
        cover = await p.locator(".miracles-cover").first().boundingBox(),
        copy = await p.locator(".entry-copy").first().boundingBox();
      assert.equal(hero.height, 450);
      assert.ok(card.y < hero.y + hero.height);
      assert.ok(
        width > 768
          ? copy.x >= cover.x + cover.width - 1
          : copy.y >= cover.y + cover.height - 1,
      );
      await p.screenshot({
        path: `artifacts/ports/miracles-configured-${width}.png`,
        fullPage: true,
      });
      await p.locator(".miracles-palette").click();
      assert.equal(await p.locator("body.fk-dark").count(), 1);
      await p.reload();
      assert.equal(await p.locator("body.fk-dark").count(), 1);
      assert.equal(
        await p.locator(".miracles-palette").getAttribute("aria-pressed"),
        "true",
      );
      await p.close();
    }
    console.log(
      "Miracles: banner configuration, card overlap, responsive split and persistent palette passed",
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
