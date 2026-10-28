const test = require("node:test"),
  assert = require("node:assert/strict");
const { render } = require("./port-fixture");
test("Aria retains real category/comment metadata and source order", async () => {
  const html = await render("aria", "index", {
    config: { defaultThumbnail: "/fixture/image.svg" },
  });
  assert.match(html, /\/cate\/notes/);
  assert.match(html, /评论 3/);
  assert.ok(html.indexOf("card-title") < html.indexOf("card-meta-top"));
  assert.ok(html.indexOf("card-meta-top") < html.indexOf("card-thumbnail"));
  assert.doesNotMatch(
    await render("aria", "index", { noCategories: true }),
    /评论 0|评论 3|\/cate\/notes/,
  );
});
test("Aria background, avatar, thumbnail and detail update structure", async () => {
  const html = await render("aria", "index", {
    config: {
      backgroundUrl: "/fixture/cover.svg",
      avatarUrl: "/fixture/avatar.svg",
    },
  });
  assert.match(html, /class="aria-background" src="\/fixture\/cover.svg"/);
  assert.match(html, /class="aria-avatar"/);
  const detail = await render("aria", "post");
  assert.match(detail, /aria-detail-page/);
  assert.match(detail, /class="post-header"/);
  assert.match(detail, /最后一次更新于 2026-10-29/);
  assert.doesNotMatch(
    await render("aria", "index", {
      config: { backgroundUrl: "javascript:bad", avatarUrl: "//evil.test/a" },
    }),
    /class="aria-background"|class="aria-avatar"/,
  );
});
