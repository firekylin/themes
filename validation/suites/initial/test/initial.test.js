const test = require("node:test");
const assert = require("node:assert/strict");
const { render } = require("./port-fixture");
test("Initial: one-column layout, fixed header and safe logo", async () => {
  const html = await render("initial", "index", {
    config: { oneColumn: "1", fixedHeader: "1", logoUrl: "/logo.svg" },
  });
  assert.match(html, /initial-one/);
  assert.match(html, /initial-fixed/);
  assert.match(html, /class="initial-logo"/);
  assert.doesNotMatch(html, /class="fk-sidebar"/);
  assert.doesNotMatch(
    await render("initial", "index", { config: { logoUrl: "javascript:bad" } }),
    /class="initial-logo"/,
  );
  const post = await render("initial", "post");
  assert.match(post, /initial-breadcrumb/);
  assert.match(post, /initial-toc/);
});
