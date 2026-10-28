const test = require("node:test"),
  assert = require("node:assert/strict");
const { render } = require("./port-fixture");
test("VOID configurable banner and narrow list preserve source metadata order", async () => {
  const html = await render("void", "index", {
    config: {
      defaultBanner: "/banner.jpg",
      indexBannerTitle: "Banner title",
      indexStyle: "narrow",
    },
  });
  assert.match(html, /void-narrow/);
  assert.match(html, /src="\/banner.jpg"/);
  assert.match(html, /Banner title/);
  assert.ok(html.indexOf("entry-meta") < html.indexOf("entry-title"));
  assert.doesNotMatch(await render("void", "index"), /class="entry-cover"/);
  assert.doesNotMatch(
    await render("void", "index", {
      config: { defaultBanner: "javascript:bad" },
    }),
    /src="javascript/,
  );
});
test("VOID article title belongs to banner before separate article body", async () => {
  const html = await render("void", "post");
  assert.match(html, /void-detail-page/);
  assert.ok(html.indexOf("void-banner-title") < html.indexOf("void-article"));
  assert.equal(
    (html.match(/山间来信 · Letters from the mountains/g) || []).length,
    2,
  );
});
