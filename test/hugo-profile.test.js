'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {Eta} = require('eta');
const {render, pages, context} = require('./port-fixture');
const root = path.join(__dirname, '../packages/hugo-profile');
for (const page of pages) {
  test(`Hugo Profile ${page}: populated and empty native Widget data`, async () => {
    for (const empty of [false, true]) {
      const html = await render('hugo-profile', page, {empty});
      assert.match(html, /Hugo Profile/);
      assert.doesNotMatch(html, /undefined|\[object Object\]|<%/);
      for (const [, url] of html.matchAll(/(?:href|src)="(\/themes\/hugo-profile\/[^\"]+)"/g)) {
        assert(fs.existsSync(path.join(root, url.replace('/themes/hugo-profile/', ''))), url);
      }
    }
  });
}
test('Hugo Profile escapes text settings and delegates body, password form and comments', async () => {
  const html = await render('hugo-profile', 'post', {hostile:true, config:{footerText:'<script>bad()</script>'}});
  assert.match(html, /&lt;img/);
  assert.match(html, /&lt;script/);
  assert.doesNotMatch(html, /<script>bad/);
  assert.match(html, /<pre><code>/);
  assert.match(html, /id="comments"/);
  assert.doesNotMatch(await render('hugo-profile','post',{comments:false}), /id="comments"/);
  assert.match(await render('hugo-profile','post',{protected:true}), /protectPassword/);
});
test('Hugo Profile keeps filters in native pagination and taxonomy heading', async () => {
  for (const [kind, request, label] of [['cate','/cate/notes?sort=recent','随笔'],['tag','/tag/life','生活']]) {
    const html = await render('hugo-profile','index',{kind,request,currentPage:2});
    assert.match(html, new RegExp('>'+label+'</h1>'));
    assert.match(html, /page=1/);
    assert.match(html, /page=3/);
  }
  assert.match(await render('hugo-profile','search',{request:'/search.html?keyword=a%26b'}), /keyword=a%26b&amp;page=2/);
});
test('Hugo Profile optional hero is first-home-page only, escaped and safe URL only', async () => {
  const config={profileTitle:'<script>name</script>',profileIntro:'Hi',profileSubtitle:'Writer',profileText:'My profile',profileImage:'javascript:bad',profileLink:'//evil.example'};
  const home=await render('hugo-profile','index',{config});
  assert.match(home, /id="hero"/);
  assert.match(home, /&lt;script&gt;name/);
  assert.doesNotMatch(home, /javascript:bad|evil.example/);
  for(const opts of [{currentPage:2},{kind:'cate'},{kind:'tag'},{kind:'author',request:'/author/writer'}])assert.doesNotMatch(await render('hugo-profile','index',{config,...opts}), /id="hero"/);
  assert.doesNotMatch(await render('hugo-profile','index'), /id="hero"/);
});
test('Hugo Profile hides protected cover metadata, including core sentinel-only rows', async () => {
  for(const marker of [{password_protected:true},{options:{postPasswordHash:'not-a-secret'}},{title:'此内容被密码保护'}]){
    const ctx=context('hugo-profile','index');
    const archive=await ctx.widget('Widget_Archive');
    Object.assign(archive.stack[0],marker);
    archive.stack[0].options={...archive.stack[0].options,featuredImage:'/SECRET_COVER'};
    const html=await new Eta({views:root,varName:'firekylin'}).renderAsync('index',ctx);
    assert.doesNotMatch(html,/SECRET_COVER/);
  }
});
test('Hugo Profile safe attachment images, audio, video and download fallback', async () => {
  for(const [mime, element] of [['image/png','img'],['audio/mpeg','audio'],['video/mp4','video'],['application/pdf',null]]){
    const ctx=context('hugo-profile','attachment');
    (await ctx.widget('Widget_Archive')).stack[0].options={attachment:{mime,url:'/uploads/file',name:'Download'}};
    const html=await new Eta({views:root,varName:'firekylin'}).renderAsync('attachment',ctx);
    assert.match(html,/download href="\/uploads\/file"/);
    if(element)assert(html.includes('<'+element+' '));
  }
  const ctx=context('hugo-profile','attachment');
  (await ctx.widget('Widget_Archive')).stack[0].options={attachment:{mime:'image/png',url:'javascript:bad'}};
  assert.doesNotMatch(await new Eta({views:root,varName:'firekylin'}).renderAsync('attachment',ctx),/javascript:bad/);
});
test('Hugo Profile retains pinned upstream styles and audited local fonts', () => {
  const manifest=JSON.parse(fs.readFileSync(path.join(root,'SOURCE.json')));
  for(const [file, hash] of Object.entries(manifest.assets))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),hash,file);
  const css=fs.readFileSync(path.join(root,'res/css/upstream.css'),'utf8');
  assert.match(css,/0px 8px 56px rgba\(15, 80, 100, 0.16\)/);
  assert.match(css,/height: 250px !important/);
  assert.doesNotMatch(css,/@import|url\(/);
  assert.match(fs.readFileSync(path.join(root,'res/css/bootstrap.css'),'utf8'),/Bootstrap v5\.1\.3/);
  for(const file of ['Bootstrap-MIT.txt','Alata-OFL.txt','Lora-OFL.txt'])assert(fs.existsSync(path.join(root,'res/licenses',file)));
});

test('Hugo Profile keeps safe public covers while omitting active URLs', async () => {
  const ctx=context('hugo-profile','index');
  const archive=await ctx.widget('Widget_Archive');
  archive.stack[0].options={featuredImage:'/PUBLIC_COVER'};
  archive.stack[1].options={featuredImage:'javascript:bad-cover'};
  const html=await new Eta({views:root,varName:'firekylin'}).renderAsync('index',ctx);
  assert.match(html,/src="\/PUBLIC_COVER"/);
  assert.doesNotMatch(html,/javascript:bad-cover/);
});
