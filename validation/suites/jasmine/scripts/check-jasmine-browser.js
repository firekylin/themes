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
      await p.goto(`http://127.0.0.1:${server.address().port}/jasmine/post`);
      assert.equal(await p.locator(".jasmine-rail").isVisible(), width > 991);
      await p.locator(".jasmine-toc summary").click();
      const a = p.locator(".jasmine-toc a").first();
      assert.equal(await a.textContent(), "阅读与记录");
      await a.click();
      assert.match(p.url(), /#jasmine-heading-0$/);
      await p.locator("[data-jasmine-dark]").click();
      await p.reload();
      assert.equal(
        await p.locator("[data-jasmine-dark]").getAttribute("aria-pressed"),
        "true",
      );
      await p.close();
    }
    console.log(
      "Jasmine rail breakpoint, TOC disclosure/anchor and persisted color mode passed at desktop/mobile",
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
