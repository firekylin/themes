'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {render,pages}=require('./port-fixture');
for(const page of pages)test('TimePlus '+page+' renders populated and empty Widgets',async()=>{for(const empty of [false,true]){const html=await render('timeplus',page,{empty});assert.match(html,/TimePlus/);assert(!html.includes('undefined'));}});
test('TimePlus escapes titles, rejects active cover URLs, preserves protected body',async()=>{const html=await render('timeplus','index',{hostile:true,config:{aboutText:'<script>alert(1)</script>',headerImage:'javascript:alert(1)'}});assert(!html.includes('<img src=x onerror'));assert.match(html,/&lt;img/);assert(!html.includes('src="javascript:'));assert.match(await render('timeplus','post',{protected:true}),/protectPassword/);});
test('TimePlus delegates comments and keeps search filters in pagination',async()=>{assert(!(await render('timeplus','post',{comments:false})).includes('class="album-reading timeplus-comments"'));const html=await render('timeplus','search',{request:'/search.html?keyword=a%26b'});assert.match(html,/keyword=a%26b&amp;page=2/);});
