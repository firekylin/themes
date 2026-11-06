'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {Eta} = require('eta');
const {chromium} = require('playwright-core');
const themes = require('../verification/embedded-media/themes.json');
const {context} = require('../test/port-fixture');
const root = path.resolve(__dirname, '..');
const poster = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%221280%22 height=%22720%22%3E%3Crect width=%221280%22 height=%22720%22 fill=%22%239ab%22/%3E%3C/svg%3E';
(async () => {
  const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox']});
  let checked = 0;
  try {
    for (const theme of themes) {
      const pkg = path.join(root, 'packages', theme);
      const ctx = context(theme, 'post');
      const archive = await ctx.widget('Widget_Archive');
      archive.stack[0].content = `<p>Embedded media regression</p><video width="1280" height="720" controls poster="${poster}"></video><audio controls style="width:1280px"></audio>`;
      const html = await new Eta({views: pkg, varName: 'firekylin'}).renderAsync('post', ctx);
      const page = await browser.newPage({viewport: {width: 390, height: 844}});
      await page.route('**/*', route => {
        const url = new URL(route.request().url());
        if (url.origin !== 'http://theme.test') return route.abort();
        if (url.pathname === '/') return route.fulfill({contentType: 'text/html', body: html});
        const prefix = '/themes/' + theme + '/';
        if (!url.pathname.startsWith(prefix)) return route.fulfill({status: 404, body: ''});
        const file = path.resolve(pkg, decodeURIComponent(url.pathname.slice(prefix.length)));
        if (file.startsWith(pkg + path.sep) && fs.existsSync(file) && fs.statSync(file).isFile()) return route.fulfill({path: file});
        return route.fulfill({status: 404, body: ''});
      });
      await page.goto('http://theme.test/');
      await page.evaluate(() => document.fonts.ready);
      const dims = await page.locator('.prose').evaluate(prose => {
        const video = prose.querySelector('video').getBoundingClientRect();
        const audio = prose.querySelector('audio').getBoundingClientRect();
        return {document: document.documentElement.scrollWidth, viewport: innerWidth, column: prose.getBoundingClientRect().width, video: video.width, ratio: video.width / video.height, audio: audio.width};
      });
      assert(dims.document <= dims.viewport && dims.video <= dims.column + 1 && dims.audio <= dims.column + 1, theme + ': embedded media fits mobile column: ' + JSON.stringify(dims));
      assert(Math.abs(dims.ratio - 1280 / 720) < .02, theme + ': preserve video aspect ratio');
      checked++;
      await page.close();
    }
    console.log(`Embedded media: ${checked} themes; explicit 1280px video/audio fit mobile columns and video aspect ratios are preserved.`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
