'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const {Eta} = require('eta');
const {render, pages, context} = require('./port-fixture');
for (const page of pages) {
  test('Airspace ' + page + ' supports populated and empty Widgets', async () => {
    for (const empty of [false, true]) {
      const html = await render('airspace-hugo', page, {empty});
      assert.match(html, /Airspace Hugo/);
      assert(!html.includes('undefined'));
      assert.match(html, /class="sidebar"/);
    }
  });
}
test('Airspace escapes content and retains native password/comment behavior', async () => {
  const html = await render('airspace-hugo', 'index', {hostile:true, config:{blogTitle:'<script>bad()</script>'}});
  assert(!html.includes('<script>'));
  assert.match(html, /&lt;script&gt;/);
  assert(!html.includes('<img src=x'));
  assert.match(await render('airspace-hugo', 'post', {protected:true}), /protectPassword/);
  assert(!(await render('airspace-hugo', 'post', {comments:false})).includes('id="comments"'));
});
test('Airspace suppresses protected cover metadata after core strips hash', async () => {
  for (const protection of [{password_protected:true}, {options:{postPasswordHash:'hash'}}, {title:'此内容被密码保护'}]) {
    const ctx = context('airspace-hugo', 'index');
    for (const name of ['Widget_Archive', 'Widget_Contents_Post_Recent']) {
      const widget = await ctx.widget(name);
      Object.assign(widget.stack[0], protection);
      widget.stack[0].options = {...widget.stack[0].options, featuredImage:'/SECRET_COVER.png'};
    }
    const html = await new Eta({views:path.join(__dirname, '../packages/airspace-hugo'), varName:'firekylin'}).renderAsync('index', ctx);
    assert(!html.includes('SECRET_COVER'));
  }
});
test('Airspace search preserves encoded query and taxonomy titles', async () => {
  assert.match(await render('airspace-hugo', 'search', {request:'/search.html?keyword=a%26b'}), /keyword=a%26b&amp;page=2/);
  for (const [kind,label] of [['cate','随笔'],['tag','生活']]) {
    assert.match(await render('airspace-hugo', 'index', {kind}), new RegExp('<h1>'+label+'</h1>'));
  }
});
test('Airspace has the pinned layout and no third-party runtime requests', () => {
  const css = fs.readFileSync(path.join(__dirname, '../packages/airspace-hugo/res/css/theme.css'), 'utf8');
  assert.match(css, /2fr/);
  assert.match(css, /#655e7a/);
  assert.match(css, /padding: 100px 0/);
  assert.match(css, /border-radius: 30px/);
  assert(!/https?:|@import/.test(css));
});
