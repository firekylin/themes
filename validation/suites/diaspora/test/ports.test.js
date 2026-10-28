'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const {themes,pages,render} = require('./port-fixture');
for (const theme of themes) {
  for (const page of pages) test(`${theme}: ${page} renders populated and empty data`, async () => {
    for (const empty of [false,true]) {
      const html = await render(theme,page,{empty});
      assert.match(html, /<!doctype html>/i);
      assert.match(html, /<main /);
      assert.match(html, /纸上时光/);
      assert.doesNotMatch(html, /<\?php|<%|undefined|\[object Object\]/);
      for (const [,url] of html.matchAll(/(?:href|src)="(\/themes\/[^\"]+)"/g)) {
        assert.ok(fs.existsSync(path.join(__dirname,'..','packages',url.replace('/themes/',''))),url);
      }
    }
  });
  test(`${theme}: taxonomy, author and search pagination retain filters`, async () => {
    for (const [kind,request] of [['cate','/cate/notes?sort=recent'],['tag','/tag/life'],['author','/author/writer'],['search','/search.html?keyword=a%26b']]) {
      const html = await render(theme,kind === 'search' ? 'search' : 'index',{kind,request,currentPage:2});
      assert.match(html,/rel="prev"/); assert.match(html,/rel="next"/);
      assert.match(html,/page=1/); assert.match(html,/page=3/);
      if (kind === 'search') assert.match(html,/keyword=a%26b&amp;page=3/);
      if (kind === 'cate') assert.match(html,/sort=recent&amp;page=3/);
    }
    assert.doesNotMatch(await render(theme,'search',{noKeyword:true,empty:true}),/rel="next"/);
  });
  test(`${theme}: escape labels and settings; delegate trusted body and comments`,async () => {
    const html = await render(theme,'post',{hostile:true,config:{footerText:'<script>bad()</script>'}});
    assert.match(html,/&lt;img/);
    const configured = await render(theme,'index',{config:{colorMode:'dark',heroText:'<img onerror=bad>',accentColor:'</style><script>bad()</script>'}});
    assert.match(configured,/fk-dark/);
    assert.match(configured,/&lt;img onerror=bad&gt;/);
    assert.doesNotMatch(configured,/<script>bad/); assert.match(html,/&lt;script/);
    assert.doesNotMatch(html,/<script>bad/);
    assert.match(html,/<pre><code>/);
    assert.match(html,/id="comments"/);
    if (process.env.FIREKYLIN_CORE_PATH) assert.match(await render(theme,'post',{forceLogin:true}), /&quot;login&quot;:&quot;force&quot;/);
    assert.doesNotMatch(await render(theme,'post',{comments:false}),/id="comments"/);
    assert.match(await render(theme,'post',{protected:true}),/name="protectPassword"/);
    assert.doesNotMatch(await render(theme,'index',{hostile:true}),/src="javascript:/);
    assert.match(await render(theme,'index',{legacy:true}),new RegExp(`/theme/${theme}/res/css/`));
  });
  test(`${theme}: license, status templates and local-only CSS`, () => {
    const dir=path.join(__dirname,'..','packages',theme);
    assert.match(fs.readFileSync(path.join(dir,'LICENSE'),'utf8'),/Permission to use|Permission is hereby granted|GNU GENERAL PUBLIC LICENSE|Apache License|Redistribution and use/);
    for(const code of [404,500]) assert.match(fs.readFileSync(path.join(dir,`error/${code}.html`),'utf8'),new RegExp(`<h1>${code}</h1>`));
    for(const file of ['upstream.css','firekylin.css']) assert.doesNotMatch(fs.readFileSync(path.join(dir,'res/css',file),'utf8'),/url\(|@import/);
  });
}
test('Diaspora first story appears once, five alternating cards and validated cover settings',async()=>{const html=await render('diaspora','index',{media:true,config:{coverImage:'/fixture/cover.svg'}});assert.equal((html.match(/class="post"/g)||[]).length,5);assert.equal((html.match(/id="post0"/g)||[]).length,1);assert.match(html,/points="2000,1620 0,1620 0,0 600,0"/);assert.doesNotMatch(await render('diaspora','index',{config:{coverImage:'javascript:alert(1)',overlayColor:'</style><script>bad()</script>'}}),/src="javascript:|<script>bad/);});
test('Diaspora detail preserves audio/body and delegates protected content',async()=>{const {context}=require('./port-fixture'),{Eta}=require('eta');const c=context('diaspora','post');const a=await c.widget('Widget_Archive');a.stack[0].content+='<audio controls src="/own-audio.mp3"></audio>';const html=await new Eta({views:path.join(__dirname,'../packages/diaspora'),varName:'firekylin'}).renderAsync('post',c);assert.match(html,/<audio controls/);assert.match(html,/data-gallery hidden/);});
