"use strict";
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
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(
        `http://127.0.0.1:${server.address().port}/icefox/index?media=1`,
        { waitUntil: "networkidle" },
      );
      const geometry = await page.evaluate(() => {
        const r = (s) => document.querySelector(s).getBoundingClientRect();
        return {
          main: r("main").width,
          cover: r(".header-container").height,
          avatar: r(".header-avatar-link").bottom,
          coverBottom: r(".header-container").bottom,
          grid: r(".icefox-images.count-4").width,
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      assert.equal(geometry.main, Math.min(width, 576));
      assert.equal(geometry.cover, 320);
      assert.ok(geometry.avatar > geometry.coverBottom);
      assert.ok(geometry.grid <= 212);
      assert.equal(geometry.overflow, false);
      await page.screenshot({
        path: `artifacts/ports/icefox-reference-layout-${width}.png`,
        fullPage: true,
      });
      await page.locator(".icefox-expand summary").first().click();
      assert.equal(
        await page.locator(".icefox-expand").first().getAttribute("open"),
        "",
      );
      await page.locator("[data-preview-image]").first().click();
      assert.equal(await page.locator("dialog").evaluate((d) => d.open), true);
      await page.keyboard.press("Escape");
      assert.equal(await page.locator("dialog").evaluate((d) => d.open), false);
      assert.equal(
        await page
          .locator("[data-preview-image]")
          .first()
          .evaluate((e) => e === document.activeElement),
        true,
      );
      await page.locator("[data-theme-toggle]").click();
      assert.equal(await page.locator("html").getAttribute("class"), "dark");
      await page.reload();
      assert.equal(await page.locator("html").getAttribute("class"), "dark");
      await page.screenshot({
        path: `artifacts/ports/icefox-reference-dark-${width}.png`,
        fullPage: true,
      });
      await page.locator(".icefox-menu summary").click();
      assert.equal(await page.locator(".icefox-menu").getAttribute("open"), "");
      assert.deepEqual(errors, []);
      await page.close();
    }
    const nojs = await browser.newContext({ javaScriptEnabled: false });
    const page = await nojs.newPage();
    await page.goto(
      `http://127.0.0.1:${server.address().port}/icefox/index?media=1`,
    );
    await page.locator(".icefox-expand summary").first().click();
    assert.equal(
      await page.locator(".icefox-expand").first().getAttribute("open"),
      "",
    );
    assert.match(
      await page.locator("[data-preview-image]").first().getAttribute("href"),
      /^\/fixture\//,
    );
    await nojs.close();
    console.log(
      "icefox source geometry and behavior: desktop/mobile cover/avatar, 4-image grid, disclosure, dialog/Escape/focus, theme persistence, navigation and no-JS fallback passed",
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
