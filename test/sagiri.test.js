'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {render,pages}=require('./port-fixture');
for(const page of pages)test('Sagiri '+page+' renders populated and empty Widgets',async()=>{for(const empty of [false,true]){const html=await render('sagiri',page,{empty});assert.match(html,/Sagiri/);assert(!html.includes('undefined'));}});
test('Sagiri escapes titles, rejects active cover URLs, preserves protected body',async()=>{const html=await render('sagiri','index',{hostile:true,config:{profileName:'<script>alert(1)</script>',headerImage:'javascript:alert(1)'}});assert(!html.includes('<img src=x onerror'));assert.match(html,/&lt;img/);assert(!html.includes('src="javascript:'));assert.match(await render('sagiri','post',{protected:true}),/protectPassword/);});
test('Sagiri delegates comments and keeps search filters in pagination',async()=>{assert(!(await render('sagiri','post',{comments:false})).includes('class="post sagiri-comments"'));const html=await render('sagiri','search',{request:'/search.html?keyword=a%26b'});assert.match(html,/keyword=a%26b&amp;page=2/);});
