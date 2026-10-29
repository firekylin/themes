'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {render,pages}=require('./port-fixture');
for(const page of pages)test('Moricolor '+page+' renders populated and empty Widgets',async()=>{for(const empty of [false,true]){const html=await render('moricolor',page,{empty});assert.match(html,/Moricolor/);assert(!html.includes('undefined'));}});
test('Moricolor escapes titles, rejects active cover URLs, preserves protected body',async()=>{const html=await render('moricolor','index',{hostile:true,config:{logoText:'<script>alert(1)</script>',backgroundUrl:'javascript:alert(1)'}});assert(!html.includes('<img src=x onerror'));assert.match(html,/&lt;img/);assert(!html.includes('src="javascript:'));assert.match(await render('moricolor','post',{protected:true}),/protectPassword/);});
test('Moricolor delegates comments and keeps search filters in pagination',async()=>{assert(!(await render('moricolor','post',{comments:false})).includes('id="mori-comments"'));const html=await render('moricolor','search',{request:'/search.html?keyword=a%26b'});assert.match(html,/keyword=a%26b&amp;page=2/);});
