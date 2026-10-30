'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {render,pages}=require('./port-fixture');
for(const page of pages)test('Amaze '+page+' renders populated and empty Widgets',async()=>{for(const empty of [false,true]){const html=await render('amaze',page,{empty});assert.match(html,/Amaze/);assert(!html.includes('undefined'));}});
test('Amaze escapes titles, rejects active cover URLs, preserves protected body',async()=>{const html=await render('amaze','index',{hostile:true,config:{profileName:'<script>alert(1)</script>',backgroundImage:'javascript:alert(1)'}});assert(!html.includes('<img src=x onerror'));assert.match(html,/&lt;img/);assert(!html.includes('src="javascript:'));assert.match(await render('amaze','post',{protected:true}),/protectPassword/);});
test('Amaze delegates comments and keeps search filters in pagination',async()=>{assert(!(await render('amaze','post',{comments:false})).includes('class="amaze-comments"'));const html=await render('amaze','search',{request:'/search.html?keyword=a%26b'});assert.match(html,/keyword=a%26b&amp;page=2/);});
