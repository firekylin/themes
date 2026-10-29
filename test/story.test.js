'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {render,pages}=require('./port-fixture');
for(const page of pages)test('Story '+page+' renders populated and empty Widgets',async()=>{for(const empty of [false,true]){const html=await render('story',page,{empty});assert.match(html,/Story/);assert(!html.includes('undefined'));}});
test('Story escapes titles, rejects active cover URLs, preserves protected body',async()=>{const html=await render('story','index',{hostile:true,config:{logoText:'<script>alert(1)</script>',backgroundUrl:'javascript:alert(1)'}});assert(!html.includes('<script>alert'));assert(!html.includes('src="javascript:'));assert.match(html,/&lt;img/);assert.match(await render('story','post',{protected:true}),/protectPassword/);});
test('Story delegates comments and keeps search filters in pagination',async()=>{assert(!(await render('story','post',{comments:false})).includes('story-comments'));const html=await render('story','search',{request:'/search.html?keyword=a%26b'});assert.match(html,/keyword=a%26b&amp;page=2/);});
