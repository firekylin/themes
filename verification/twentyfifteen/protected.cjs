'use strict';
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

// Runs against the disposable, ZIP-installed SQLite site created by live.cjs.
module.exports = async function verifyProtectedContent(db, origin, page = null) {
  function mainContent(html) {
    const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0];
    assert(main, 'the response contains a main content region');
    return main;
  }
  const saved = db.prepare("SELECT pathname,title,summary,content,options,create_time FROM fk_post WHERE pathname IN ('hello', 'public-0')").all();
  assert.equal(saved.length, 2, 'both protected test fixtures exist');
  const publicResponse = await fetch(origin + '/');
  assert.equal(publicResponse.status, 200);
  assert(mainContent(await publicResponse.text()).includes('src="/themes/twentyfifteen/res/fixture.svg"'), 'public cover URL renders before protection');
  const password = 'fixture-unlock-only';
  const salt = crypto.randomBytes(16);
  const hash = 'scrypt$' + salt.toString('base64url') + '$' + crypto.scryptSync(password, salt, 32).toString('base64url');
  const protect = db.prepare('UPDATE fk_post SET options=?,title=?,summary=?,content=?,create_time=? WHERE pathname=?');
  try {
    for (const [pathname, time] of [['hello', '2026-11-01 00:00:00'], ['public-0', '2000-01-01 00:00:00']]) {
      const updated = protect.run(JSON.stringify({postPasswordHash: hash, featuredImage: '/themes/twentyfifteen/res/fixture.svg?SECRET_PHOTO'}), 'SECRET_TITLE', 'SECRET_SUMMARY', 'SECRET_BODY', time, pathname);
      assert.equal(updated.changes, 1, 'protected fixture exists: ' + pathname);
    }
    const routes = [
      ['/', 'hello'], ['/?page=2', 'public-0'],
      ['/search.html?keyword=SECRET', 'hello'], ['/cate/notes', 'hello'],
      ['/tag/life', 'hello'], ['/archives', 'hello'], ['/post/hello.html', null]
    ];
    const checks = [];
    for (const [route, pathname] of routes) {
      const response = await fetch(origin + route);
      assert.equal(response.status, 200, route + ' returns a real page');
      const html = await response.text();
      const main = mainContent(html);
      assert(main.includes('此内容被密码保护'), route + ' includes a protected record in main');
      if (pathname) assert(main.includes('/post/' + pathname + '.html'), route + ' includes the expected fixture in main');
      else assert(main.includes('protectPassword'), 'detail includes the password form');
      assert(!/SECRET_(PHOTO|TITLE|SUMMARY|BODY)/.test(html), route + ' does not leak protected data');
      if (route === '/' || route === '/?page=2') {
        assert(main.includes('src="/themes/twentyfifteen/res/fixture.svg"'), 'other public covers remain visible');
      }
      if (page) {
        for (const width of [1440, 390]) {
          await page.setViewportSize({width, height: 1000});
          const navigation = await page.goto(origin + route);
          assert.equal(navigation.status(), 200, 'browser ' + route);
          const rendered = mainContent(await page.content());
          assert(rendered.includes('此内容被密码保护'), 'browser includes protected content in main');
          if (pathname) assert(rendered.includes('/post/' + pathname + '.html'), 'browser includes target record');
          assert(!/SECRET_(PHOTO|TITLE|SUMMARY|BODY)/.test(await page.content()), 'browser hides protected metadata');
          if (route === '/' || route === '/post/hello.html') {
            const kind = route === '/' ? 'home' : 'locked';
            await page.screenshot({path: require('node:path').join(__dirname, 'protected-' + kind + '-' + width + '.png'), fullPage: true});
          }
        }
      }
      checks.push({route, status: response.status, protectedRecordInMain: true, confidentialDataAbsent: true});
    }
    for (const [attempt, unlocked] of [['wrong', false], [password, true]]) {
      const response = await fetch(origin + '/post/hello.html', {
        method: 'POST', headers: {'content-type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({protectPassword: attempt})
      });
      assert.equal(response.status, 200);
      const html = await response.text();
      const main = mainContent(html);
      assert.equal(main.includes('SECRET_BODY'), unlocked, 'native password body visibility');
      assert.equal(main.includes('SECRET_TITLE'), unlocked, 'native password title visibility');
      assert.equal(main.includes('SECRET_PHOTO'), unlocked, 'native password cover visibility');
      if (!unlocked) {
        assert(main.includes('protectPassword'), 'wrong password retains the form');
        assert(!/SECRET_(PHOTO|TITLE|SUMMARY|BODY)/.test(html), 'wrong password hides all confidential data');
      }
    }
    if (page) {
      await page.goto(origin + '/post/hello.html');
      await page.locator('[name="protectPassword"]').fill('wrong');
      await Promise.all([page.waitForNavigation(), page.locator('.prose button[type="submit"]').click()]);
      assert(!/SECRET_(PHOTO|TITLE|SUMMARY|BODY)/.test(await page.content()), 'browser wrong password hides all confidential data');
      await page.locator('[name="protectPassword"]').fill(password);
      await Promise.all([page.waitForNavigation(), page.locator('.prose button[type="submit"]').click()]);
      const unlocked = mainContent(await page.content());
      assert(unlocked.includes('SECRET_TITLE') && unlocked.includes('SECRET_BODY') && unlocked.includes('SECRET_PHOTO'), 'browser correct password unlocks title, body and cover');
    }
    return {checks, publicCoversPreserved: true, passwordFlows: ['wrong rejected', 'correct unlocked'], browserChecks: page ? '1440/390 route checks and native wrong/correct password submission' : 'not run locally'};
  } finally {
    const restore = db.prepare('UPDATE fk_post SET title=?,summary=?,content=?,options=?,create_time=? WHERE pathname=?');
    for (const row of saved) restore.run(row.title, row.summary, row.content, row.options, row.create_time, row.pathname);
    const response = await fetch(origin + '/');
    assert.equal(response.status, 200);
    assert(mainContent(await response.text()).includes('src="/themes/twentyfifteen/res/fixture.svg"'), 'public cover URL survives fixture restoration');
  }
};
