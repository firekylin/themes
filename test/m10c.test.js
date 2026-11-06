'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {render,pages}=require('./port-fixture');
for(const page of pages)test('m10c '+page+' renders populated and empty Widgets',async()=>{for(const empty of [false,true]){const html=await render('m10c',page,{empty});assert.match(html,/m10c/);assert(!html.includes('undefined'));}});
test('m10c escapes titles, rejects active cover URLs, preserves protected body',async()=>{const html=await render('m10c','index',{hostile:true,config:{profileName:'<script>alert(1)</script>',backgroundImage:'javascript:alert(1)'}});assert(!html.includes('<img src=x onerror'));assert.match(html,/&lt;img/);assert(!html.includes('src="javascript:'));assert.match(await render('m10c','post',{protected:true}),/protectPassword/);});
test('m10c delegates comments and keeps search filters in pagination',async()=>{assert(!(await render('m10c','post',{comments:false})).includes('id="comments"'));const html=await render('m10c','search',{request:'/search.html?keyword=a%26b'});assert.match(html,/keyword=a%26b&amp;page=2/);});
