const test = require("node:test"),
  assert = require("node:assert/strict");
const { render } = require("./port-fixture");
test("Jasmine uses source rail/category navigation and separate post outline", async () => {
  const html = await render("jasmine", "index", {
    config: { logoUrl: "/image.jpg", categoryNum: "1" },
  });
  assert.match(html, /class="jasmine-rail"/);
  assert.match(html, /aria-label="分类导航"/);
  assert.match(html, /\/cate\/notes/);
  assert.doesNotMatch(html, /fk-profile/);
  const post = await render("jasmine", "post");
  assert.match(post, /id="post-article"/);
  assert.match(post, /class="jasmine-toc"/);
  assert.doesNotMatch(
    await render("jasmine", "post", { config: { showToc: "0" } }),
    /class="jasmine-toc"/,
  );
});
