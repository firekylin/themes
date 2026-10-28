'use strict';
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const {chromium} = require('playwright-core');
const server = require('./preview-ports')();
const {themes,pages} = require('../test/port-fixture');
(async () => {
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {})});
  const output=path.resolve(process.env.SCREENSHOT_DIR || 'artifacts/ports');
  fs.mkdirSync(output,{recursive:true});
  try {
    let checked=0;
    for(const theme of themes) for(const width of [1280,390]) {
      const page=await browser.newPage({viewport:{width,height:900}});
      const failures=[];
      page.on('pageerror',err=>failures.push(err.message));
      page.on('response',res=>{if(res.status()>=400) failures.push(res.url());});
      for(const entry of pages) {
        await page.goto(`http://127.0.0.1:${server.address().port}/${theme}/${entry}`,{waitUntil:'networkidle'});
        assert.equal(await page.locator('main').count(),1);
        if (width === 1280) assert.ok(await page.locator('main').evaluate(el=>el.getBoundingClientRect().width>=500), `${theme}: desktop reading column too narrow`);
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${theme}/${entry}: overflow at ${width}`);
        if(entry==='index' && await page.locator('.item-thumb').count()) {
          const geometry=await page.evaluate(()=>{
            const rect=selector=>document.querySelector(selector).getBoundingClientRect();
            const logo=rect('.navbar-logo'), nav=rect('.navbar-container nav');
            const title=rect('.item-title'), date=rect('.item-meta'), excerpt=rect('.item-excerpt');
            return {coverHeight:rect('.item-thumb').height,navOverlap:logo.left<nav.right&&logo.right>nav.left&&logo.top<nav.bottom&&logo.bottom>nav.top,ordered:title.bottom<=date.top+1&&date.bottom<=excerpt.top+1};
          });
          assert.ok(geometry.coverHeight>100 && !geometry.navOverlap && geometry.ordered, 'Card/navigation geometry');
        }
        if(entry==='index' && await page.locator('.entry-card').count()) {
          const geometry=await page.evaluate(()=>{
            const rect=s=>document.querySelector(s).getBoundingClientRect();
            const title=rect('.entry-title'),card=rect('.entry-card'),logo=rect('.fk-brand'),nav=rect('.fk-nav');
            return {titleVisible:title.height>10&&title.left>=card.left-1&&title.right<=card.right+1,
              navOverlap:logo.left<nav.right&&logo.right>nav.left&&logo.top<nav.bottom&&logo.bottom>nav.top};
          });
          assert.ok(geometry.titleVisible && !geometry.navOverlap, `${theme}: title/navigation geometry`);
        }
        if(entry==='index'||entry==='post') await page.screenshot({path:path.join(output,`${theme}-${entry}-${width}.png`),fullPage:true,animations:"disabled"});
        checked++;
      }
      await page.goto(`http://127.0.0.1:${server.address().port}/${theme}/index?long=1`);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${theme}: long title overflow`);
      await page.goto(`http://127.0.0.1:${server.address().port}/${theme}/search`);
      await page.locator('#keyword').fill('a&b');
      const submission=await page.locator('form').evaluate(form=>({action:form.getAttribute('action'),params:new URLSearchParams(new FormData(form)).toString()}));
      assert.deepEqual(submission,{action:'/search.html',params:'keyword=a%26b'});
      await page.goto(`http://127.0.0.1:${server.address().port}/${theme}/index?dark=1`);
      assert.equal(await page.locator('body.fk-dark').count(),1);
      await page.screenshot({path:path.join(output,`${theme}-dark-${width}.png`),fullPage:true,animations:"disabled"});
      await page.keyboard.press('Tab');
      assert.deepEqual(failures,[]);
      await page.close();
    }
    console.log(`Browser: ${checked} pages; 1280/390px; no overflow, console errors or failed resources; screenshots: ${output}`);
  } finally {await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
