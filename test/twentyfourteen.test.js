'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {render,pages}=require('./port-fixture');
for(const page of pages)test('Twenty Fourteen '+page+' renders populated and empty Widgets',async()=>{for(const empty of [false,true]){const html=await render('twentyfourteen',page,{empty});assert.match(html,/Twenty Fourteen/);assert(!html.includes('undefined'));}});
test('Twenty Fourteen escapes titles, rejects active cover URLs, preserves protected body',async()=>{const html=await render('twentyfourteen','index',{hostile:true,config:{profileName:'<script>alert(1)</script>',backgroundImage:'javascript:alert(1)'}});assert(!html.includes('<img src=x onerror'));assert.match(html,/&lt;img/);assert(!html.includes('src="javascript:'));assert.match(await render('twentyfourteen','post',{protected:true}),/protectPassword/);});
test('Twenty Fourteen delegates comments and keeps search filters in pagination',async()=>{assert(!(await render('twentyfourteen','post',{comments:false})).includes('id="comments"'));const html=await render('twentyfourteen','search',{request:'/search.html?keyword=a%26b'});assert.match(html,/keyword=a%26b&amp;page=2/);});

test('twentyfourteen renders attachment media and rejects active file URLs',async()=>{const {context}=require('./port-fixture');const {Eta}=require('eta');const path=require('node:path');for(const [mime,element] of [['image/png','img'],['audio/mpeg','audio'],['video/mp4','video'],['application/pdf',null]]){const ctx=context('twentyfourteen','attachment');const archive=await ctx.widget('Widget_Archive');archive.stack[0].options={attachment:{mime,url:'/uploads/file',name:'Download file'}};const html=await new Eta({views:path.join(__dirname,'../packages/twentyfourteen'),varName:'firekylin'}).renderAsync('attachment',ctx);assert.match(html,/href="\/uploads\/file" download/);if(element)assert(html.includes('<'+element+' '));}const ctx=context('twentyfourteen','attachment');(await ctx.widget('Widget_Archive')).stack[0].options={attachment:{mime:'image/png',url:'javascript:alert(1)'}};const html=await new Eta({views:path.join(__dirname,'../packages/twentyfourteen'),varName:'firekylin'}).renderAsync('attachment',ctx);assert(!html.includes('javascript:'));});

// The core redacts list titles and hashes, but retains options.featuredImage.
test('twentyfourteen hides protected covers in populated main listings', async () => {
  const {context} = require('./port-fixture');
  const {Eta} = require('eta');
  const path = require('node:path');
  for (const [page, options] of [['index', {}], ['search', {}], ['index', {kind: 'cate'}], ['index', {kind: 'tag'}]]) {
    for (const protection of [{title: '此内容被密码保护'}, {password_protected: true}, {options: {postPasswordHash: 'fixture-hash'}}]) {
      const ctx = context('twentyfourteen', page, options);
      const archive = await ctx.widget('Widget_Archive');
      Object.assign(archive.stack[0], protection);
      archive.stack[0].options = {...archive.stack[0].options, featuredImage: '/PRIVATE_COVER.jpg'};
      const html = await new Eta({views: path.join(__dirname, '../packages/twentyfourteen'), varName: 'firekylin'}).renderAsync(page, ctx);
      const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0];
      assert(main, page + ' has a main region');
      assert(main.includes('/post/article-1.html'), page + ' contains the protected record');
      assert(!html.includes('PRIVATE_COVER'), page + ' must not expose a protected cover');
    }
  }
});
test('twentyfourteen keeps public covers and rejects active or protocol-relative URLs', async () => {
  const {context} = require('./port-fixture');
  const {Eta} = require('eta');
  const path = require('node:path');
  for (const url of ['/uploads/public.jpg', 'https://example.test/public.jpg', 'javascript:alert(1)', '//evil.invalid/cover', 'data:image/svg+xml,bad']) {
    const ctx = context('twentyfourteen', 'index');
    (await ctx.widget('Widget_Archive')).stack[0].options = {featuredImage: url};
    const html = await new Eta({views: path.join(__dirname, '../packages/twentyfourteen'), varName: 'firekylin'}).renderAsync('index', ctx);
    assert.equal(html.includes('src="' + url + '"'), url.startsWith('/uploads/') || url.startsWith('https://'));
  }
});

test('twentyfourteen does not expose real core-redacted post metadata', {
  skip: !process.env.FIREKYLIN_CORE_PATH && 'Set FIREKYLIN_CORE_PATH for the real core redactor and Widgets'
}, async () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const vm = require('node:vm');
  const {Eta} = require('eta');
  const {context} = require('./port-fixture');
  const source = fs.readFileSync(path.join(process.env.FIREKYLIN_CORE_PATH, 'src/model/post.js'), 'utf8');
  // Execute the actual checked-out core redactor, not a hand-written copy.
  // Other model imports are unused by this pure function.
  const redact = vm.runInNewContext(source + '\n;redactProtectedPosts;', {
    module: {exports: {}}, require: name => name === './base' ? class {} : {}
  });
  const eta = new Eta({views: path.join(__dirname, '../packages/twentyfourteen'), varName: 'firekylin'});
  for (const [page, kind] of [['index'], ['search'], ['index', 'cate'], ['index', 'tag'], ['archive']]) {
    const ctx = context('twentyfourteen', page, {kind});
    const row = (await ctx.widget('Widget_Archive')).stack[0];
    const [redacted] = redact([{
      ...row, title: 'SECRET_TITLE', content: 'SECRET_BODY', summary: 'SECRET_SUMMARY',
      options: {postPasswordHash: 'fixture-hash', featuredImage: '/SECRET_PHOTO.png'}
    }]);
    assert.equal(redacted.title, '此内容被密码保护');
    assert.equal(redacted.options.featuredImage, '/SECRET_PHOTO.png');
    assert(!redacted.options.postPasswordHash);
    Object.assign(row, redacted);
    const html = await eta.renderAsync(page, ctx);
    const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0];
    assert(main, 'main content renders');
    assert(main.includes('/post/' + row.pathname + '.html'), 'protected target renders in main');
    assert(!/SECRET_(TITLE|BODY|SUMMARY|PHOTO)/.test(html), page + ':' + kind);
  }
});

test('twentyfourteen constrains native post and page media without changing audio height', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const css = fs.readFileSync(path.join(__dirname, '../packages/twentyfourteen/res/css/theme.css'), 'utf8');
  assert.match(css, /\.prose video,\s*\.prose audio\s*\{\s*max-width: 100%;/);
  assert.match(css, /\.prose video\s*\{\s*height: auto;/);
});
