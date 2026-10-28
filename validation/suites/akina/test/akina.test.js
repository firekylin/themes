const test = require("node:test");
const assert = require("node:assert/strict");
const { render } = require("./port-fixture");
test("Akina: profile configuration and separate detail", async () => {
  const home = await render("akina", "index", {
    media: true,
    config: {
      headimg: "/cover.svg",
      avatar: "/avatar.svg",
      socialUrl: "/about",
      notice: "<b>Hello</b>",
    },
  });
  assert.match(home, /class="akina-background"/);
  assert.match(home, /class="akina-avatar"/);
  assert.match(home, /&lt;b&gt;Hello/);
  assert.match(home, /class="akina-icon"/);
  const post = await render("akina", "post");
  assert.doesNotMatch(post, /class="akina-hero"/);
  assert.match(post, /akina-toc/);
  assert.doesNotMatch(
    await render("akina", "index", {
      config: { headimg: "javascript:bad", avatar: "javascript:bad" },
    }),
    /src="javascript:/,
  );
});
