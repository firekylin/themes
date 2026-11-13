'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {render,pages}=require('./port-fixture');
for(const page of pages)test('Baskerville '+page+' renders populated and empty Widgets',async()=>{for(const empty of [false,true]){const html=await render('baskerville',page,{empty});assert.match(html,/Baskerville/);assert(!html.includes('undefined'));}});
test('Baskerville escapes titles, rejects active cover URLs, preserves protected body',async()=>{const html=await render('baskerville','index',{hostile:true,config:{profileName:'<script>alert(1)</script>',backgroundImage:'javascript:alert(1)'}});assert(!html.includes('<img src=x onerror'));assert.match(html,/&lt;img/);assert(!html.includes('src="javascript:'));assert.match(await render('baskerville','post',{protected:true}),/protectPassword/);});
test('Baskerville delegates comments and keeps search filters in pagination',async()=>{assert(!(await render('baskerville','post',{comments:false})).includes('id="comments"'));const html=await render('baskerville','search',{request:'/search.html?keyword=a%26b'});assert.match(html,/keyword=a%26b&amp;page=2/);});

test('baskerville renders attachment media and rejects active file URLs',async()=>{const {context}=require('./port-fixture');const {Eta}=require('eta');const path=require('node:path');for(const [mime,element] of [['image/png','img'],['audio/mpeg','audio'],['video/mp4','video'],['application/pdf',null]]){const ctx=context('baskerville','attachment');const archive=await ctx.widget('Widget_Archive');archive.stack[0].options={attachment:{mime,url:'/uploads/file',name:'Download file'}};const html=await new Eta({views:path.join(__dirname,'../packages/baskerville'),varName:'firekylin'}).renderAsync('attachment',ctx);assert.match(html,/href="\/uploads\/file" download/);if(element)assert(html.includes('<'+element+' '));}const ctx=context('baskerville','attachment');(await ctx.widget('Widget_Archive')).stack[0].options={attachment:{mime:'image/png',url:'javascript:alert(1)'}};const html=await new Eta({views:path.join(__dirname,'../packages/baskerville'),varName:'firekylin'}).renderAsync('attachment',ctx);assert(!html.includes('javascript:'));});

// The core redacts list titles and hashes, but retains options.featuredImage.
test('baskerville hides protected covers in populated main listings', async () => {
  const {context} = require('./port-fixture');
  const {Eta} = require('eta');
  const path = require('node:path');
  for (const [page, options] of [['index', {}], ['search', {}], ['index', {kind: 'cate'}], ['index', {kind: 'tag'}]]) {
    for (const protection of [{title: '此内容被密码保护'}, {password_protected: true}, {options: {postPasswordHash: 'fixture-hash'}}]) {
      const ctx = context('baskerville', page, options);
      const archive = await ctx.widget('Widget_Archive');
      Object.assign(archive.stack[0], protection);
      archive.stack[0].options = {...archive.stack[0].options, featuredImage: '/PRIVATE_COVER.jpg'};
      const html = await new Eta({views: path.join(__dirname, '../packages/baskerville'), varName: 'firekylin'}).renderAsync(page, ctx);
      const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0];
      assert(main, page + ' has a main region');
      assert(main.includes('/post/article-1.html'), page + ' contains the protected record');
      assert(!html.includes('PRIVATE_COVER'), page + ' must not expose a protected cover');
    }
  }
});
test('baskerville keeps public covers and rejects active or protocol-relative URLs', async () => {
  const {context} = require('./port-fixture');
  const {Eta} = require('eta');
  const path = require('node:path');
  for (const url of ['/uploads/public.jpg', 'https://example.test/public.jpg', 'javascript:alert(1)', '//evil.invalid/cover', 'data:image/svg+xml,bad']) {
    const ctx = context('baskerville', 'index');
    (await ctx.widget('Widget_Archive')).stack[0].options = {featuredImage: url};
    const html = await new Eta({views: path.join(__dirname, '../packages/baskerville'), varName: 'firekylin'}).renderAsync('index', ctx);
    assert.equal(html.includes('src="' + url + '"'), url.startsWith('/uploads/') || url.startsWith('https://'));
  }
});

test('baskerville constrains wide native post and page media', async () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const {context} = require('./port-fixture');
  const {Eta} = require('eta');
  const css = fs.readFileSync(path.join(__dirname, '../packages/baskerville/res/css/theme.css'), 'utf8');
  assert.match(css, /\.prose video,\s*\.prose audio\s*\{\s*max-width: 100%;/);
  assert.match(css, /\.prose video\s*\{\s*height: auto;/);
  for (const page of ['post', 'page']) {
    const ctx = context('baskerville', page);
    (await ctx.widget('Widget_Archive')).stack[0].content = '<video width="1280" height="720" controls></video><audio controls style="width:1280px"></audio>';
    const html = await new Eta({views: path.join(__dirname, '../packages/baskerville'), varName: 'firekylin'}).renderAsync(page, ctx);
    assert.match(html, /<video width="1280" height="720" controls>/);
    assert.match(html, /<audio controls style="width:1280px">/);
  }
});
