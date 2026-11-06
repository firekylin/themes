'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {render,pages}=require('./port-fixture');
for(const page of pages)test('Ink '+page+' renders populated and empty Widgets',async()=>{for(const empty of [false,true]){const html=await render('ink',page,{empty});assert.match(html,/Ink/);assert(!html.includes('undefined'));}});
test('Ink escapes titles, rejects active cover URLs, preserves protected body',async()=>{const html=await render('ink','index',{hostile:true,config:{profileName:'<script>alert(1)</script>',backgroundImage:'javascript:alert(1)'}});assert(!html.includes('<img src=x onerror'));assert.match(html,/&lt;img/);assert(!html.includes('src="javascript:'));assert.match(await render('ink','post',{protected:true}),/protectPassword/);});
test('Ink delegates comments and keeps search filters in pagination',async()=>{assert(!(await render('ink','post',{comments:false})).includes('id="comments"'));const html=await render('ink','search',{request:'/search.html?keyword=a%26b'});assert.match(html,/keyword=a%26b&amp;page=2/);});
