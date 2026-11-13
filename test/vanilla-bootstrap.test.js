'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {render,pages}=require('./port-fixture');
for(const page of pages)test('Vanilla Bootstrap '+page+' renders populated and empty Widgets',async()=>{for(const empty of [false,true]){const html=await render('vanilla-bootstrap',page,{empty});assert.match(html,/Vanilla Bootstrap/);assert(!html.includes('undefined'));}});
test('Vanilla Bootstrap escapes titles, ignores unsupported cover options, preserves protected body',async()=>{const html=await render('vanilla-bootstrap','index',{hostile:true,config:{profileName:'<script>alert(1)</script>',backgroundImage:'javascript:alert(1)'}});assert(!html.includes('<img src=x onerror'));assert.match(html,/&lt;img/);assert(!html.includes('src="javascript:'));assert.match(await render('vanilla-bootstrap','post',{protected:true}),/protectPassword/);});
test('Vanilla Bootstrap delegates comments and keeps search filters in pagination',async()=>{assert(!(await render('vanilla-bootstrap','post',{comments:false})).includes('id="comments"'));const html=await render('vanilla-bootstrap','search',{request:'/search.html?keyword=a%26b'});assert.match(html,/keyword=a%26b&amp;page=2/);});

test('vanilla-bootstrap renders attachment media and rejects active file URLs',async()=>{const {context}=require('./port-fixture');const {Eta}=require('eta');const path=require('node:path');for(const [mime,element] of [['image/png','img'],['audio/mpeg','audio'],['video/mp4','video'],['application/pdf',null]]){const ctx=context('vanilla-bootstrap','attachment');const archive=await ctx.widget('Widget_Archive');archive.stack[0].options={attachment:{mime,url:'/uploads/file',name:'Download file'}};const html=await new Eta({views:path.join(__dirname,'../packages/vanilla-bootstrap'),varName:'firekylin'}).renderAsync('attachment',ctx);assert.match(html,/href="\/uploads\/file" download/);if(element)assert(html.includes('<'+element+' '));}const ctx=context('vanilla-bootstrap','attachment');(await ctx.widget('Widget_Archive')).stack[0].options={attachment:{mime:'image/png',url:'javascript:alert(1)'}};const html=await new Eta({views:path.join(__dirname,'../packages/vanilla-bootstrap'),varName:'firekylin'}).renderAsync('attachment',ctx);assert(!html.includes('javascript:'));});

test('Vanilla Bootstrap identifies taxonomy',async()=>{for(const [kind,label] of [['cate','随笔'],['tag','生活']]){assert((await render('vanilla-bootstrap','index',{kind})).includes('<h1>'+label+'</h1>'));}});

test('Vanilla Bootstrap retains the home hero only on home page one',async()=>{
  const home=await render('vanilla-bootstrap','index',{config:{homeText:'Hello <script>alert(1)</script>'}});
  assert.match(home,/id="home-jumbotron"/);assert.match(home,/Hello &lt;script&gt;/);assert(!home.includes('<script>'));
  for(const options of [{currentPage:2},{kind:'cate'},{kind:'tag'}])assert(!(await render('vanilla-bootstrap','index',options)).includes('id="home-jumbotron"'));
});
test('Vanilla Bootstrap uses static icons and deduplicates native navigation',async()=>{
  const html=await render('vanilla-bootstrap','index');
  assert.match(html,/<svg[^>]+aria-hidden="true"/);assert(!html.includes('<script'));
  const nav=html.split('<nav id="nav"')[1].split('</nav>')[0];
  assert.equal((nav.match(/href="\/archives"/g)||[]).length,1);
  assert.equal((nav.match(/href="\/"/g)||[]).length,1);
  assert.match(nav,/href="\/page\/about.html"/);
});
test('Vanilla Bootstrap ships exact pinned Bootstrap and the original 700px defaults',()=>{
  const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');const root=path.join(__dirname,'../packages/vanilla-bootstrap');
  const css=fs.readFileSync(path.join(root,'res/css/bootstrap.css'));
  assert.match(css.toString(),/Bootstrap v4\.3\.1/);
  assert.match(fs.readFileSync(path.join(root,'res/css/upstream.css'),'utf8'),/max-width: 700px/);
  assert(!fs.readFileSync(path.join(root,'res/css/theme.css'),'utf8').includes('https://'));
  assert.equal(crypto.createHash('sha256').update(css).digest('hex'),'60b19e5da6a9234ff9220668a5ec1125c157a268513256188ee80f2d2c8d8d36');
});
