'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),{render}=require('./port-fixture');
test('Green Park 2 uses full content by default and supports excerpt mode',async()=>{const full=await render('green-park-2','index');assert.equal((full.match(/<pre>/g)||[]).length,6);const excerpt=await render('green-park-2','index',{config:{feedStyle:'excerpt'}});assert.doesNotMatch(excerpt,/<pre>/);assert.match(excerpt,/阅读全文/);});
test('Green Park 2 supports split, single and hidden native sidebars',async()=>{assert.match(await render('green-park-2','index'),/gp-groups/);assert.match(await render('green-park-2','index',{config:{sidebarColumns:'1'}}),/gp-single/);assert.doesNotMatch(await render('green-park-2','index',{config:{hideSidebar:'true'}}),/id="sidebar"/);});
