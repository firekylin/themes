'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {render,pages}=require('./port-fixture');
for(const page of pages)test('Zzo '+page+' renders populated and empty Widgets',async()=>{for(const empty of [false,true]){const html=await render('zzo',page,{empty});assert.match(html,/Zzo/);assert(!html.includes('undefined'));}});
test('Zzo escapes titles, rejects active cover URLs, preserves protected body',async()=>{const html=await render('zzo','index',{hostile:true,config:{profileName:'<script>alert(1)</script>',backgroundImage:'javascript:alert(1)'}});assert(!html.includes('<img src=x onerror'));assert.match(html,/&lt;img/);assert(!html.includes('src="javascript:'));assert.match(await render('zzo','post',{protected:true}),/protectPassword/);});
test('Zzo delegates comments and keeps search filters in pagination',async()=>{assert(!(await render('zzo','post',{comments:false})).includes('id="comments"'));const html=await render('zzo','search',{request:'/search.html?keyword=a%26b'});assert.match(html,/keyword=a%26b&amp;page=2/);});

test('zzo renders attachment media and rejects active file URLs',async()=>{const {context}=require('./port-fixture');const {Eta}=require('eta');const path=require('node:path');for(const [mime,element] of [['image/png','img'],['audio/mpeg','audio'],['video/mp4','video'],['application/pdf',null]]){const ctx=context('zzo','attachment');const archive=await ctx.widget('Widget_Archive');archive.stack[0].options={attachment:{mime,url:'/uploads/file',name:'Download file'}};const html=await new Eta({views:path.join(__dirname,'../packages/zzo'),varName:'firekylin'}).renderAsync('attachment',ctx);assert.match(html,/href="\/uploads\/file" download/);if(element)assert(html.includes('<'+element+' '));}const ctx=context('zzo','attachment');(await ctx.widget('Widget_Archive')).stack[0].options={attachment:{mime:'image/png',url:'javascript:alert(1)'}};const html=await new Eta({views:path.join(__dirname,'../packages/zzo'),varName:'firekylin'}).renderAsync('attachment',ctx);assert(!html.includes('javascript:'));});

test('Zzo validates optional biography photo URL',async()=>{for(const name of ['index','post']){const html=await render('zzo',name,{config:{profileImage:'data:text/html,bad'}});assert(!html.includes('src="javascript:'));assert(!html.includes('src="//evil.test'));assert(!html.includes('src="data:'));}});

test('Zzo preserves native rich content and balanced directory containers', async()=>{
 const html=await render('zzo','post');assert.match(html,/<div class="prose post-content"[^>]*><p>/);assert.match(html,/<pre><code>/);
 for(const type of ['archive','cate','tag']){const html=await render('zzo',type);assert.equal((html.match(/<section class="directory">/g)||[]).length,1);assert.match(html,/<\/section>\s*<\/main><aside/);}
});
test('Zzo accepts only supported thumbnail/photo URLs and escapes settings',async()=>{
 const {context}=require('./port-fixture');const {Eta}=require('eta');const path=require('node:path');
 for(const url of ['javascript:alert(1)','//evil.invalid/a','data:image/svg+xml,bad']){const ctx=context('zzo','index',{config:{profileImage:url,authorName:'<script>bad()</script>',location:'<img onerror=bad>'}});(await ctx.widget('Widget_Archive')).stack[0].options={featuredImage:url};const html=await new Eta({views:path.join(__dirname,'../packages/zzo'),varName:'firekylin'}).renderAsync('index',ctx);assert(!html.includes('src="'+url));assert(!html.includes('<script>bad()'));assert.match(html,/&lt;script&gt;bad/);assert(!html.includes('class="summary-image"'));}
 const ctx=context('zzo','index',{config:{profileImage:'/uploads/avatar.png'}});(await ctx.widget('Widget_Archive')).stack[0].options={featuredImage:'https://example.test/photo.png'};const html=await new Eta({views:path.join(__dirname,'../packages/zzo'),varName:'firekylin'}).renderAsync('index',ctx);assert.match(html,/src="https:\/\/example.test\/photo.png"/);assert.match(html,/src="\/uploads\/avatar.png"/);
});

test('Zzo reserves the masthead for the home listing',async()=>{assert.match(await render('zzo','index'),/class="site-header"/);assert(!(await render('zzo','index',{kind:'cate'})).includes('class="site-header"'));for(const page of ['post','page','attachment','archive','search','tag','cate'])assert(!(await render('zzo',page)).includes('class="site-header"'),page);});
