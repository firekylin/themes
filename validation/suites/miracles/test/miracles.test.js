const test = require("node:test");
const assert = require("node:assert/strict");
const { render } = require("./port-fixture");
test("Miracles: safe banner settings and article-specific heading", async () => {
  const html = await render("miracles", "index", {
    config: {
      bannerUrl: "/cover.svg",
      bannerTitle: "<b>Title</b>",
      bannerHeight: "999",
    },
  });
  assert.match(html, /height:90vh/);
  assert.match(html, /&lt;b&gt;Title/);
  assert.match(html, /src="\/cover.svg"/);
  assert.doesNotMatch(
    await render("miracles", "index", {
      config: { bannerUrl: "javascript:bad" },
    }),
    /src="javascript:/,
  );
  const post = await render("miracles", "post");
  assert.match(post, /miracles-detail/);
  assert.doesNotMatch(post, /class="post-title"/);
  assert.match(post, /miracles-heading/);
});
