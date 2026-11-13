'use strict';
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

// Runs against the disposable, ZIP-installed SQLite site created by live.cjs.
module.exports = async function verifyProtectedContent(db, origin) {
  function mainContent(html) {
    const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0];
    assert(main, 'the response contains a main content region');
    return main;
  }
  const publicResponse = await fetch(origin + '/');
  assert.equal(publicResponse.status, 200);
  assert(mainContent(await publicResponse.text()).includes('class="native-cover"'), 'public covers render before protection');
  const password = 'fixture-unlock-only';
  const salt = crypto.randomBytes(16);
  const hash = 'scrypt$' + salt.toString('base64url') + '$' + crypto.scryptSync(password, salt, 32).toString('base64url');
  const protect = db.prepare('UPDATE fk_post SET options=?,title=?,summary=?,content=?,create_time=? WHERE pathname=?');
  for (const [pathname, time] of [['hello', '2026-11-01 00:00:00'], ['public-0', '2000-01-01 00:00:00']]) {
    const updated = protect.run(JSON.stringify({postPasswordHash: hash, featuredImage: '/SECRET_PHOTO'}), 'SECRET_TITLE', 'SECRET_SUMMARY', 'SECRET_BODY', time, pathname);
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
    checks.push({route, status: response.status, protectedRecordInMain: true});
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
    if (!unlocked) {
      assert(main.includes('protectPassword'), 'wrong password retains the form');
      assert(!html.includes('SECRET_PHOTO'), 'wrong password hides the cover');
    }
  }
  return {checks, passwordFlows: ['wrong rejected', 'correct unlocked']};
};
