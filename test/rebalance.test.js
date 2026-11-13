'use strict';
const fs = require('node:fs');
const path = require('node:path');
const test=require('node:test'),assert=require('node:assert/strict');
const {render,pages}=require('./port-fixture');
test('Rebalance constrains embedded post and page media', () => {
  const css = fs.readFileSync(path.join(__dirname, '../packages/rebalance/res/css/theme.css'), 'utf8');
  assert.match(css, /\.prose video,\s*\.prose audio\s*\{\s*max-width: 100%;/);
  assert.match(css, /\.prose video\s*\{\s*height: auto;/);
});
for(const page of pages)test('Rebalance '+page+' renders populated and empty Widgets',async()=>{for(const empty of [false,true]){const html=await render('rebalance',page,{empty});assert.match(html,/Rebalance/);assert(!html.includes('undefined'));}});
test('Rebalance escapes titles, rejects active cover URLs, preserves protected body',async()=>{const html=await render('rebalance','index',{hostile:true,config:{profileName:'<script>alert(1)</script>',backgroundImage:'javascript:alert(1)'}});assert(!html.includes('<img src=x onerror'));assert.match(html,/&lt;img/);assert(!html.includes('src="javascript:'));assert.match(await render('rebalance','post',{protected:true}),/protectPassword/);});
test('Rebalance delegates comments and keeps search filters in pagination',async()=>{assert(!(await render('rebalance','post',{comments:false})).includes('id="comments"'));const html=await render('rebalance','search',{request:'/search.html?keyword=a%26b'});assert.match(html,/keyword=a%26b&amp;page=2/);});

test('rebalance renders attachment media and rejects active file URLs',async()=>{const {context}=require('./port-fixture');const {Eta}=require('eta');const path=require('node:path');for(const [mime,element] of [['image/png','img'],['audio/mpeg','audio'],['video/mp4','video'],['application/pdf',null]]){const ctx=context('rebalance','attachment');const archive=await ctx.widget('Widget_Archive');archive.stack[0].options={attachment:{mime,url:'/uploads/file',name:'Download file'}};const html=await new Eta({views:path.join(__dirname,'../packages/rebalance'),varName:'firekylin'}).renderAsync('attachment',ctx);assert.match(html,/href="\/uploads\/file" download/);if(element)assert(html.includes('<'+element+' '));}const ctx=context('rebalance','attachment');(await ctx.widget('Widget_Archive')).stack[0].options={attachment:{mime:'image/png',url:'javascript:alert(1)'}};const html=await new Eta({views:path.join(__dirname,'../packages/rebalance'),varName:'firekylin'}).renderAsync('attachment',ctx);assert(!html.includes('javascript:'));});

// The current core removes the password hash but preserves featuredImage on list rows.
test('Rebalance hides protected thumbnails on index, search and taxonomy lists',async()=>{
 const {context}=require('./port-fixture');const {Eta}=require('eta');
 for(const [page,opts] of [['index',{}],['search',{}],['index',{kind:'cate'}],['index',{kind:'tag'}]]){
  for(const protection of [{title:'此内容被密码保护'},{password_protected:true},{options:{postPasswordHash:'fixture-hash'}}]){
   const ctx=context('rebalance',page,opts);const archive=await ctx.widget('Widget_Archive');
   Object.assign(archive.stack[0],protection);archive.stack[0].options={...archive.stack[0].options,featuredImage:'/PRIVATE_COVER.jpg'};
   const html=await new Eta({views:path.join(__dirname,'../packages/rebalance'),varName:'firekylin'}).renderAsync(page,ctx);
   assert(!html.includes('PRIVATE_COVER'),page+' protected thumbnail');
  }
 }
});
test('Rebalance renders public cover URLs and rejects active schemes',async()=>{
 const {context}=require('./port-fixture');const {Eta}=require('eta');
 for(const url of ['/uploads/public.jpg','javascript:alert(1)','//evil.invalid/a','data:image/svg+xml,bad']){
  const ctx=context('rebalance','index');(await ctx.widget('Widget_Archive')).stack[0].options={featuredImage:url};
  const html=await new Eta({views:path.join(__dirname,'../packages/rebalance'),varName:'firekylin'}).renderAsync('index',ctx);
  assert.equal(html.includes('src="'+url+'"'),url==='/uploads/public.jpg');
 }
});
