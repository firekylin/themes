'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {render,pages}=require('./port-fixture');
for(const page of pages)test('AltoFocus '+page+' renders populated and empty Widgets',async()=>{for(const empty of [false,true]){const html=await render('altofocus',page,{empty});assert.match(html,/AltoFocus/);assert(!html.includes('undefined'));}});
test('AltoFocus escapes titles, rejects active cover URLs, preserves protected body',async()=>{const html=await render('altofocus','index',{hostile:true,config:{profileName:'<script>alert(1)</script>',backgroundImage:'javascript:alert(1)'}});assert(!html.includes('<img src=x onerror'));assert.match(html,/&lt;img/);assert(!html.includes('src="javascript:'));assert.match(await render('altofocus','post',{protected:true}),/protectPassword/);});
test('AltoFocus delegates comments and keeps search filters in pagination',async()=>{assert(!(await render('altofocus','post',{comments:false})).includes('id="comments"'));const html=await render('altofocus','search',{request:'/search.html?keyword=a%26b'});assert.match(html,/keyword=a%26b&amp;page=2/);});

test('altofocus renders attachment media and rejects active file URLs',async()=>{const {context}=require('./port-fixture');const {Eta}=require('eta');const path=require('node:path');for(const [mime,element] of [['image/png','img'],['audio/mpeg','audio'],['video/mp4','video'],['application/pdf',null]]){const ctx=context('altofocus','attachment');const archive=await ctx.widget('Widget_Archive');archive.stack[0].options={attachment:{mime,url:'/uploads/file',name:'Download file'}};const html=await new Eta({views:path.join(__dirname,'../packages/altofocus'),varName:'firekylin'}).renderAsync('attachment',ctx);assert.match(html,/href="\/uploads\/file" download/);if(element)assert(html.includes('<'+element+' '));}const ctx=context('altofocus','attachment');(await ctx.widget('Widget_Archive')).stack[0].options={attachment:{mime:'image/png',url:'javascript:alert(1)'}};const html=await new Eta({views:path.join(__dirname,'../packages/altofocus'),varName:'firekylin'}).renderAsync('attachment',ctx);assert(!html.includes('javascript:'));});


test('AltoFocus constrains embedded post/page media and preserves video proportions', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const css = fs.readFileSync(path.join(__dirname, '../packages/altofocus/res/css/theme.css'), 'utf8');
  assert.match(css, /\.prose video,\s*\.prose audio\s*\{\s*max-width: 100%;/);
  assert.match(css, /\.prose video\s*\{\s*height: auto;/);
});
