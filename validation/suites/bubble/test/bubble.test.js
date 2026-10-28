const test = require("node:test");
const assert = require("node:assert/strict");
const { render } = require("./port-fixture");
test("Bubble: landing configuration, safe media and distinct detail header", async () => {
  const home = await render("bubble", "index", {
    config: {
      indexImage: "/cover.svg",
      avatarUrl: "/avatar.svg",
      bubbleShow: "0",
    },
  });
  assert.match(home, /class="bubble-avatar" src="\/avatar.svg"/);
  assert.match(home, /class="bubble-hero-image" src="\/cover.svg"/);
  assert.doesNotMatch(home, /class="bubble-shapes"/);
  const unsafe = await render("bubble", "index", {
    config: {
      indexImage: "javascript:alert(1)",
      avatarUrl: '" onerror="alert(1)',
    },
  });
  assert.doesNotMatch(
    unsafe,
    /class="bubble-avatar"|class="bubble-hero-image"/,
  );
  const detail = await render("bubble", "post");
  assert.match(detail, /bubble-detail-page/);
  assert.match(detail, /bubble-toc/);
  assert.doesNotMatch(detail, /class="bubble-avatar"|class="post-title"/);
  assert.doesNotMatch(
    await render("bubble", "post", { config: { toc: "0" } }),
    /bubble-toc/,
  );
});
