'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {render,pages}=require('./port-fixture');
for(const page of pages)test('Publication '+page+' renders populated and empty Widgets',async()=>{for(const empty of [false,true]){const html=await render('publication',page,{empty});assert.match(html,/Publication/);assert(!html.includes('undefined'));}});
test('Publication escapes titles, rejects active cover URLs, preserves protected body',async()=>{const html=await render('publication','index',{hostile:true,config:{profileName:'<script>alert(1)</script>',backgroundImage:'javascript:alert(1)'}});assert(!html.includes('<img src=x onerror'));assert.match(html,/&lt;img/);assert(!html.includes('src="javascript:'));assert.match(await render('publication','post',{protected:true}),/protectPassword/);});
test('Publication delegates comments and keeps search filters in pagination',async()=>{assert(!(await render('publication','post',{comments:false})).includes('id="comments"'));const html=await render('publication','search',{request:'/search.html?keyword=a%26b'});assert.match(html,/keyword=a%26b&amp;page=2/);});

test('publication renders attachment media and rejects active file URLs',async()=>{const {context}=require('./port-fixture');const {Eta}=require('eta');const path=require('node:path');for(const [mime,element] of [['image/png','img'],['audio/mpeg','audio'],['video/mp4','video'],['application/pdf',null]]){const ctx=context('publication','attachment');const archive=await ctx.widget('Widget_Archive');archive.stack[0].options={attachment:{mime,url:'/uploads/file',name:'Download file'}};const html=await new Eta({views:path.join(__dirname,'../packages/publication'),varName:'firekylin'}).renderAsync('attachment',ctx);assert.match(html,/href="\/uploads\/file" download/);if(element)assert(html.includes('<'+element+' '));}const ctx=context('publication','attachment');(await ctx.widget('Widget_Archive')).stack[0].options={attachment:{mime:'image/png',url:'javascript:alert(1)'}};const html=await new Eta({views:path.join(__dirname,'../packages/publication'),varName:'firekylin'}).renderAsync('attachment',ctx);assert(!html.includes('javascript:'));});

test('publication hides protected thumbnails in lists and detail templates', async () => {
  const {context} = require('./port-fixture');
  const {Eta} = require('eta');
  const path = require('node:path');
  const eta = new Eta({views: path.join(__dirname, '../packages/publication'), varName: 'firekylin'});
  for (const page of ['index', 'search', 'post', 'page']) {
    for (const protection of [
      {title: '此内容被密码保护'},
      {password_protected: true},
      {options: {postPasswordHash: 'fixture-hash'}}
    ]) {
      const ctx = context('publication', page);
      const row = (await ctx.widget('Widget_Archive')).stack[0];
      Object.assign(row, protection);
      row.options = {...row.options, featuredImage: '/SECRET_PHOTO.png'};
      assert(!(await eta.renderAsync(page, ctx)).includes('SECRET_PHOTO'), page);
    }
    const ctx = context('publication', page);
    (await ctx.widget('Widget_Archive')).stack[0].options = {featuredImage: '/PUBLIC_PHOTO.png'};
    assert.match(await eta.renderAsync(page, ctx), /src="\/PUBLIC_PHOTO.png"/, page);
  }
});

test('publication validates the native options.featuredImage URL', async () => {
  const {context} = require('./port-fixture');
  const {Eta} = require('eta');
  const path = require('node:path');
  const eta = new Eta({views: path.join(__dirname, '../packages/publication'), varName: 'firekylin'});
  for (const url of ['javascript:alert(1)', '//evil.invalid/photo', 'data:image/svg+xml,bad']) {
    for (const page of ['index', 'search', 'post', 'page']) {
      const ctx = context('publication', page);
      (await ctx.widget('Widget_Archive')).stack[0].options = {featuredImage: url};
      assert(!(await eta.renderAsync(page, ctx)).includes('src="' + url), page + ': ' + url);
    }
  }
});

test('publication does not expose real core-redacted post metadata', {
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
  const eta = new Eta({views: path.join(__dirname, '../packages/publication'), varName: 'firekylin'});
  for (const [page, kind] of [['index'], ['search'], ['index', 'cate'], ['index', 'tag'], ['archive']]) {
    const ctx = context('publication', page, {kind});
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
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
    assert(main, 'main content must render');
    assert(main.includes('/post/' + row.pathname + '.html'), 'protected target must render in main');
    assert(!/SECRET_(TITLE|BODY|SUMMARY|PHOTO)/.test(html), page + ':' + kind);
  }
});
