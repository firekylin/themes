"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { render } = require("./port-fixture");
test("icefox: source cover/avatar settings, media precedence and URL filtering", async () => {
  const html = await render("icefox", "index", {
    config: {
      topImage: "/fixture/cover.svg",
      topVideo: "https://example.test/cover.mp4",
      logoUrl: "/fixture/avatar.svg",
      avatarLink: "/page/about.html",
    },
  });
  assert.match(
    html,
    /<video src="https:\/\/example.test\/cover.mp4" poster="\/fixture\/cover.svg"/,
  );
  assert.match(html, /class="header-avatar-link" href="\/page\/about.html"/);
  assert.match(html, /src="\/fixture\/avatar.svg"/);
  for (const url of [
    "javascript:alert(1)",
    "//evil.test/a",
    'https://a.test/" onerror="x',
  ]) {
    const unsafe = await render("icefox", "index", {
      config: { topImage: url, topVideo: url, logoUrl: url, avatarLink: url },
    });
    assert.doesNotMatch(
      unsafe,
      /<video|class="icefox-cover"|class="header-avatar-link"/,
    );
  }
});
test("icefox: author timeline, four-image grid, expandable summary and full summary setting", async () => {
  const html = await render("icefox", "index", { media: true });
  assert.match(html, /class="post-title"><a href="\/author\/writer">Writer/);
  assert.match(html, /icefox-images count-4/);
  assert.match(html, /class="icefox-expand"/);
  assert.match(html, /展开摘要/);
  assert.match(html, /data-preview-image/);
  assert.doesNotMatch(
    await render("icefox", "index", {
      media: true,
      config: { autoCollapse: "0" },
    }),
    /class="icefox-expand"/,
  );
  const post = await render("icefox", "post");
  assert.match(post, /post-item post-detail-item/);
  assert.match(post, /icefox-detail-content/);
});
