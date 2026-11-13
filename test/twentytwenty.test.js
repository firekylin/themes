'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {render,pages}=require('./port-fixture');
for(const page of pages)test('Twenty Twenty '+page+' renders populated and empty Widgets',async()=>{for(const empty of [false,true]){const html=await render('twentytwenty',page,{empty});assert.match(html,/Twenty Twenty/);assert(!html.includes('undefined'));}});
test('Twenty Twenty escapes titles, rejects active cover URLs, preserves protected body',async()=>{const html=await render('twentytwenty','index',{hostile:true,config:{profileName:'<script>alert(1)</script>',backgroundImage:'javascript:alert(1)'}});assert(!html.includes('<img src=x onerror'));assert.match(html,/&lt;img/);assert(!html.includes('src="javascript:'));assert.match(await render('twentytwenty','post',{protected:true}),/protectPassword/);});
test('Twenty Twenty delegates comments and keeps search filters in pagination',async()=>{assert(!(await render('twentytwenty','post',{comments:false})).includes('id="comments"'));const html=await render('twentytwenty','search',{request:'/search.html?keyword=a%26b'});assert.match(html,/keyword=a%26b&amp;page=2/);});

test('twentytwenty renders attachment media and rejects active file URLs',async()=>{const {context}=require('./port-fixture');const {Eta}=require('eta');const path=require('node:path');for(const [mime,element] of [['image/png','img'],['audio/mpeg','audio'],['video/mp4','video'],['application/pdf',null]]){const ctx=context('twentytwenty','attachment');const archive=await ctx.widget('Widget_Archive');archive.stack[0].options={attachment:{mime,url:'/uploads/file',name:'Download file'}};const html=await new Eta({views:path.join(__dirname,'../packages/twentytwenty'),varName:'firekylin'}).renderAsync('attachment',ctx);assert.match(html,/href="\/uploads\/file" download/);if(element)assert(html.includes('<'+element+' '));}const ctx=context('twentytwenty','attachment');(await ctx.widget('Widget_Archive')).stack[0].options={attachment:{mime:'image/png',url:'javascript:alert(1)'}};const html=await new Eta({views:path.join(__dirname,'../packages/twentytwenty'),varName:'firekylin'}).renderAsync('attachment',ctx);assert(!html.includes('javascript:'));});

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {Eta} = require('eta');
const {context} = require('./port-fixture');

async function renderProtectedList(page, update, options = {}) {
  const ctx = context('twentytwenty', page, options);
  Object.assign((await ctx.widget('Widget_Archive')).stack[0], update);
  return new Eta({
    views: path.join(__dirname, '../packages/twentytwenty'),
    varName: 'firekylin'
  }).renderAsync(page, ctx);
}

for (const [page, options] of [['index', {}], ['search', {}], ['index', {kind: 'cate'}], ['index', {kind: 'tag'}]]) {
  test(`Twentytwenty hides protected cover metadata on ${page}/${options.kind || 'all'}`, async () => {
    for (const update of [
      {title: '此内容被密码保护', options: {featuredImage: '/SECRET_PHOTO.svg'}},
      {password_protected: true, options: {featuredImage: '/SECRET_PHOTO.svg'}},
      {options: {postPasswordHash: 'fixture-only', featuredImage: '/SECRET_PHOTO.svg'}}
    ]) {
      assert(!(await renderProtectedList(page, update, options)).includes('SECRET_PHOTO'));
    }
    const publicHtml = await renderProtectedList(page, {options: {featuredImage: '/PUBLIC_PHOTO.svg'}}, options);
    assert.match(publicHtml, /src="\/PUBLIC_PHOTO.svg"/);
  });
}

test('Twentytwenty rejects unsafe optional cover URLs in the actual metadata field', async () => {
  for (const featuredImage of ['javascript:alert(1)', '//evil.invalid/photo', 'data:image/svg+xml,bad']) {
    const html = await renderProtectedList('index', {options: {featuredImage}});
    assert(!html.includes(`src="${featuredImage}"`));
  }
});

test('Twentytwenty protects rows redacted by the installed core model', {
  skip: !process.env.FIREKYLIN_CORE_PATH && 'Set FIREKYLIN_CORE_PATH for actual core model regression'
}, async () => {
  // Execute the installed model unchanged. Only the DB/dependency boundary is stubbed.
  // This deliberately does not reproduce redactProtectedPosts in the fixture.
  const filename = path.join(process.env.FIREKYLIN_CORE_PATH, 'src/model/post.js');
  const module = {exports: {}};
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), {
    module,
    require(name) {
      if (name === './base') return class {};
      if (name === '../service/markdown') return {};
      if (name === '../plugin/runtime') return {};
      throw Error(`Unexpected core dependency: ${name}`);
    }
  }, {filename});
  for (const serialized of [false, true]) {
    const model = new module.exports();
    const metadata = {postPasswordHash: 'fixture-only', featuredImage: '/SECRET_PHOTO.svg'};
    const row = {title: 'SECRET_TITLE', summary: 'SECRET_SUMMARY', content: 'SECRET_BODY', options: serialized ? JSON.stringify(metadata) : metadata};
    for (const method of ['field', 'page', 'setRelation', 'order', 'where']) model[method] = () => model;
    model.getWhereCondition = () => ({});
    model.countSelect = async () => ({data: [row]});
    const {data: [redacted]} = await model.getPostList(1, {pageSize: 10});
    assert.equal(redacted.title, '此内容被密码保护');
    assert.equal(redacted.options.postPasswordHash, undefined);
    assert.equal(redacted.options.featuredImage, '/SECRET_PHOTO.svg', 'core retains this metadata; the theme must suppress it');
    assert(!(await renderProtectedList('index', redacted)).includes('SECRET_'));
    assert(!(await renderProtectedList('search', redacted)).includes('SECRET_'));
  }
});

test('Twentytwenty conservatively hides a public cover with the redacted sentinel title', async () => {
  const html = await renderProtectedList('index', {
    title: '此内容被密码保护', options: {featuredImage: '/PUBLIC_SENTINEL_PHOTO.svg'}
  });
  assert(!html.includes('PUBLIC_SENTINEL_PHOTO'));
});

test('Twentytwenty constrains native embedded audio and video without distorting video', () => {
  const css = fs.readFileSync(path.join(__dirname, '../packages/twentytwenty/res/css/theme.css'), 'utf8');
  assert.match(css, /#post-content\.prose video,\s*#post-content\.prose audio\s*\{\s*max-width: 100%;/);
  assert.match(css, /\.prose video\s*\{\s*height: auto;/);
});
