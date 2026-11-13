'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {render,pages}=require('./port-fixture');
for(const page of pages)test('Polymer '+page+' renders populated and empty Widgets',async()=>{for(const empty of [false,true]){const html=await render('polymer',page,{empty});assert.match(html,/Polymer/);assert(!html.includes('undefined'));}});
test('Polymer escapes titles, rejects active cover URLs, preserves protected body',async()=>{const html=await render('polymer','index',{hostile:true,config:{profileName:'<script>alert(1)</script>',backgroundImage:'javascript:alert(1)'}});assert(!html.includes('<img src=x onerror'));assert.match(html,/&lt;img/);assert(!html.includes('src="javascript:'));assert.match(await render('polymer','post',{protected:true}),/protectPassword/);});
test('Polymer delegates comments and keeps search filters in pagination',async()=>{assert(!(await render('polymer','post',{comments:false})).includes('id="comments"'));const html=await render('polymer','search',{request:'/search.html?keyword=a%26b'});assert.match(html,/keyword=a%26b&amp;page=2/);});

test('Polymer image options reject active and protocol-relative URLs',async()=>{const html=await render('polymer','index',{config:{cover:'javascript:alert(1)',profile:'//evil.invalid/photo',photo:'data:image/svg+xml,bad'}});assert(!html.includes('src="javascript:'));assert(!html.includes('src="//evil'));assert(!html.includes('src="data:'));assert(html.includes('class="article entry"'));assert(html.includes('desktop-drawer'));assert(html.includes('mobile-drawer'));});
