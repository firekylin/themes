const test = require("node:test"),
  assert = require("node:assert/strict");
const { render } = require("./port-fixture");
test("Single preserves excerpt-before-date and separates detail from home introduction", async () => {
  const html = await render("single", "index");
  assert.ok(html.indexOf("entry-title") < html.indexOf("entry-excerpt"));
  assert.ok(html.indexOf("entry-excerpt") < html.indexOf("entry-meta"));
  assert.match(html, /home-title/);
  const post = await render("single", "post", {
    config: { author_text: "About <script>author</script>" },
  });
  assert.doesNotMatch(post, /class="fk-hero home-title"/);
  assert.match(post, /single-post-title/);
  assert.match(post, /class="post-author"/);
  assert.match(post, /&lt;script&gt;author/);
});
test("Single background is configurable without accepting unsafe URLs", async () => {
  assert.match(
    await render("single", "index", { config: { background: "/image.jpg" } }),
    /class="single-background" src="\/image.jpg"/,
  );
  assert.doesNotMatch(
    await render("single", "index", {
      config: { background: "javascript:bad" },
    }),
    /class="single-background"/,
  );
});
