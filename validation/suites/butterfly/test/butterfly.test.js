const test = require("node:test");
const assert = require("node:assert/strict");
const { render } = require("./port-fixture");
test("Butterfly: responsive configured cover and distinct post hero", async () => {
  const html = await render("butterfly", "index", {
    config: {
      headerimg: "/cover.svg",
      mobileHeaderImg: "/mobile.svg",
      avatar: "/avatar.svg",
      followUrl: "/about",
    },
  });
  assert.match(html, /srcset="\/mobile.svg"/);
  assert.match(html, /class="butterfly-avatar"/);
  assert.match(html, /class="butterfly-follow"/);
  const unsafe = await render("butterfly", "index", {
    config: {
      headerimg: "javascript:bad",
      avatar: "javascript:bad",
      followUrl: "javascript:bad",
    },
  });
  assert.doesNotMatch(unsafe, /javascript:bad/);
  const post = await render("butterfly", "post");
  assert.match(post, /butterfly-detail/);
  assert.match(post, /butterfly-toc/);
  assert.doesNotMatch(post, /class="post-title"/);
});
