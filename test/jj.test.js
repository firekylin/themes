const test = require("node:test");
const assert = require("node:assert/strict");
const { render } = require("./port-fixture");
test("JJ: media cards, category navigation and distinct detail TOC", async () => {
  const home = await render("jj", "index", {
    media: true,
    config: { avatar: "/avatar.svg" },
  });
  assert.match(home, /jj-categories/);
  assert.match(home, /class="jj-thumb"/);
  assert.match(home, /class="jj-avatar"/);
  assert.ok(home.indexOf("jj-card-head") < home.indexOf("entry-title"));
  assert.doesNotMatch(
    await render("jj", "index", { config: { avatar: "javascript:bad" } }),
    /class="jj-avatar"/,
  );
  const post = await render("jj", "post", { media: true });
  assert.doesNotMatch(post, /jj-categories/);
  assert.match(post, /jj-mobile-toc/);
  assert.match(post, /jj-detail-cover/);
});
