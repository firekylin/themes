const assert = require("node:assert/strict");
const { chromium } = require("playwright-core");
const { render } = require("../test/port-fixture");
const server = require("./preview-ports")();
const fs = require("node:fs");
(async () => {
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH,
    args: ["--no-sandbox"],
  });
  try {
    for (const width of [1280, 390]) {
      const page = await browser.newPage({
        viewport: { width, height: 900 },
        reducedMotion: "reduce",
      });
      await page.route("**/fixture.svg", (route) =>
        route.fulfill({
          contentType: "image/svg+xml",
          body: '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="300"><rect width="800" height="300" fill="#4078a8"/><circle cx="600" cy="100" r="80" fill="#8cd4d7"/></svg>',
        }),
      );
      await page.route("**/joe/index", async (route) =>
        route.fulfill({
          contentType: "text/html",
          body: await render("joe", "index", {
            media: true,
            config: {
              carousel:
                "/fixture.svg||/post/one||First\n/fixture.svg||/post/two||Second",
              authorImage: "/fixture.svg",
              authorAvatar: "/fixture.svg",
            },
          }),
        }),
      );
      await page.goto(`http://127.0.0.1:${server.address().port}/joe/index`);
      await page.locator('[data-direction="1"]').click();
      await page.waitForFunction(
        () =>
          Math.abs(
            document.querySelector(".joe-slides").scrollLeft -
              document.querySelector(".joe-slides").clientWidth,
          ) < 3,
      );
      assert.equal(await page.locator(".joe-slide").count(), 2);
      assert.equal(await page.locator(".fk-sidebar").isVisible(), width > 850);
      assert.ok(await page.locator(".joe-categories a").count());
      await page.screenshot({
        path: `artifacts/ports/joe-configured-${width}.png`,
        fullPage: true,
      });
      await page.close();
    }
    console.log(
      "Joe: configured carousel controls, profile, category navigation and mobile sidebar passed",
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
