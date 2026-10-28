const test = require("node:test");
const assert = require("node:assert/strict");
const { render } = require("./port-fixture");
test("Joe: configured recommendations, profile and separate detail metadata", async () => {
  const html = await render("joe", "index", {
    config: {
      carousel:
        "/one.svg||/post/one||First\n/two.svg||/post/two||Second\njavascript:bad||/||Bad",
      authorImage: "/cover.svg",
      authorAvatar: "/avatar.svg",
      notice: "<b>hello</b>",
    },
  });
  assert.equal((html.match(/class="joe-slide"/g) || []).length, 2);
  assert.match(html, /joe-profile-avatar/);
  assert.match(html, /&lt;b&gt;hello/);
  assert.doesNotMatch(html, /javascript:bad/);
  assert.doesNotMatch(await render("joe", "index"), /class="joe-banner"/);
  assert.doesNotMatch(
    await render("joe", "index", {
      config: { authorAvatar: "javascript:bad" },
    }),
    /joe-profile-avatar/,
  );
  const post = await render("joe", "post");
  assert.match(post, /joe-breadcrumb/);
  assert.match(post, /joe-detail-categories/);
  assert.ok(
    post.indexOf("joe-detail-categories") < post.indexOf('class="post-title"'),
  );
  assert.doesNotMatch(post, /class="joe-banner"/);
});
