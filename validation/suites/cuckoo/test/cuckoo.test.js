const test = require("node:test"),
  assert = require("node:assert/strict");
const { render } = require("./port-fixture");
test("Cuckoo restores overlay and configurable normal variants, profile/background", async () => {
  const html = await render("cuckoo", "index", {
    config: {
      bgUrl: "/bg.jpg",
      logoUrl: "/avatar.jpg",
      sidebarBg: "/profile.jpg",
      defaultCover: "/cover.jpg",
    },
  });
  for (const name of [
    "cuckoo-background",
    "cuckoo-avatar",
    "cuckoo-profile-cover",
    "cuckoo-card-image",
  ])
    assert.match(html, new RegExp(name));
  assert.match(html, /cuckoo-media/);
  const normal = await render("cuckoo", "index", {
    config: { articleStyle: "normal", defaultCover: "/cover.jpg" },
  });
  assert.match(normal, /cuckoo-normal/);
  assert.doesNotMatch(normal, /cuckoo-card-image/);
  assert.doesNotMatch(
    await render("cuckoo", "index", { config: { bgUrl: "javascript:bad" } }),
    /class="cuckoo-background"/,
  );
});
test("Cuckoo detail has image heading outside article body", async () => {
  const html = await render("cuckoo", "post", {
    config: { defaultCover: "/cover.jpg" },
  });
  assert.match(html, /cuckoo-post-media/);
  assert.match(html, /cuckoo-post-heading/);
  assert.ok(
    html.indexOf("cuckoo-post-heading") < html.indexOf('class="post-content"'),
  );
});
