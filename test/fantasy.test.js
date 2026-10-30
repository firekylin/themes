'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {render,pages}=require('./port-fixture');
for(const page of pages)test('Fantasy '+page+' renders populated and empty Widgets',async()=>{for(const empty of [false,true]){const html=await render('fantasy',page,{empty});assert.match(html,/Fantasy/);assert(!html.includes('undefined'));}});
test('Fantasy escapes titles, rejects active cover URLs, preserves protected body',async()=>{const html=await render('fantasy','index',{hostile:true,config:{profileName:'<script>alert(1)</script>',logoUrl:'javascript:alert(1)'}});assert(!html.includes('<img src=x onerror'));assert.match(html,/&lt;img/);assert(!html.includes('src="javascript:'));assert.match(await render('fantasy','post',{protected:true}),/protectPassword/);});
test('Fantasy delegates comments and keeps search filters in pagination',async()=>{assert(!(await render('fantasy','post',{comments:false})).includes('class="directory fantasy-comments"'));const html=await render('fantasy','search',{request:'/search.html?keyword=a%26b'});assert.match(html,/keyword=a%26b&amp;page=2/);});
