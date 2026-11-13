'use strict';
// Install a theme ZIP into a disposable SQLite site and exercise native protection.
// Never connects to a user-provided database. Browser verification is required unless
// SKIP_BROWSER=1 is explicitly supplied for a partial, HTTP-only local run.
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {spawn, execFileSync} = require('node:child_process');
const {createRequire} = require('node:module');

const core = process.env.FIREKYLIN_CHECKOUT;
if (!core) throw Error('Set FIREKYLIN_CHECKOUT');
const theme = 'independent-publisher-2';
if (!theme || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(theme)) throw Error('Supply a theme ID');
const root = path.resolve(__dirname, '../..');
const coreRequire = createRequire(path.join(core, 'package.json'));
const adapterRequire = createRequire(coreRequire.resolve('think-model-sqlite'));
const Database = adapterRequire('better-sqlite3');
const site = fs.mkdtempSync(path.join(os.tmpdir(), `${theme}-privacy-`));
const port = Number(process.env.PRIVACY_TEST_PORT) || 8971;
const origin = `http://127.0.0.1:${port}`;
const password = 'fixture-password-only';
const secret = {
  title: 'SECRET_TITLE', summary: 'SECRET_SUMMARY', body: 'SECRET_BODY',
  image: `/themes/${theme}/res/SECRET_PHOTO.svg`
};
const salt = crypto.randomBytes(16);
const hash = `scrypt$${salt.toString('base64url')}$${crypto.scryptSync(password, salt, 32).toString('base64url')}`;
const listRoutes = ['/', '/?page=2', '/search.html?keyword=cover-fixture', '/cate/notes', '/tag/life', '/archives'];
const detailRoutes = ['/post/protected-post.html', '/page/protected-page.html'];
let server, db, browser;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const checks = [];
const evidenceDir = path.join(root, 'verification', theme);
function mainContent(html) {
  const match = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  assert(match, 'Expected native main element');
  return match[1];
}
function assertProtectedRecord(html, route) {
  const main = mainContent(html);
  assert(main.includes('此内容被密码保护'), `${route} must contain redacted fixture in main`);
  assert(/href="\/post\/protected-(?:post|second|third)\.html"/.test(main), `${route} must link to a protected fixture in main`);
}
function assertPrivate(html, label) {
  for (const marker of Object.values(secret)) assert(!html.includes(marker), `${label} leaks ${marker}`);
  assert(!html.includes(hash), `${label} leaks the password hash`);
}
async function fetchHtml(route, options) {
  const response = await fetch(origin + route, options);
  assert.equal(response.status, 200, route);
  return response.text();
}

(async () => {
  await require(path.join(core, 'lib/cli')).run([
    'new', site, '--db-type', 'sqlite', '--db-path', 'data/firekylin.sqlite',
    '--site-title', 'Theme privacy fixture', '--site-url', origin,
    '--admin-user', 'fixture-admin', '--admin-password', crypto.randomBytes(24).toString('hex'),
    '--admin-email', 'fixture@example.invalid', '--non-interactive', '--skip-install'
  ]);
  const configPath = path.join(site, 'firekylin.config.js');
  const config = require(configPath);
  config.server = {host: '127.0.0.1', port, proxy: false};
  fs.writeFileSync(configPath, `module.exports=${JSON.stringify(config)}`);
  execFileSync('python3', ['-c', `import importlib.util,pathlib
r=pathlib.Path(${JSON.stringify(root)})
s=importlib.util.spec_from_file_location('builder',r/'scripts/build-registry.py')
m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
t=r/'packages'/${JSON.stringify(theme)}
m.build_theme(t,r,m.theme_files(t))`]);
  const version = JSON.parse(fs.readFileSync(path.join(root, 'packages', theme, 'package.json'))).version;
  const {ThemeInstaller} = require(path.join(core, 'src/service/theme-installer'));
  const installer = new ThemeInstaller({
    themesPath: path.join(site, 'themes'), backupPath: path.join(site, 'backups'),
    firekylinVersion: coreRequire('./package.json').version
  });
  await installer.install(fs.readFileSync(path.join(root, 'dist', `${theme}-${version}.zip`)));
  db = new Database(path.join(site, 'data/firekylin.sqlite'));
  const set = (key, value) => db.prepare('INSERT INTO fk_options (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').run(key, value);
  set('theme', theme);
  set('postsListSize', '2');
  db.prepare('DELETE FROM fk_post').run();
  const seed = db.prepare('INSERT INTO fk_post (user_id,type,status,title,pathname,summary,markdown_content,content,allow_comment,create_time,update_time,is_public,comment_num,options) VALUES (1,?,3,?,?,?,?,?,0,?,?,1,0,?)');
  const now = '2026-01-01 00:00:00';
  const publicImage = `/themes/${theme}/res/PUBLIC_PHOTO.svg`;
  seed.run(0, 'Public cover-fixture', 'public-post', 'Public cover-fixture', '', '<p>PUBLIC_BODY</p>', '2026-01-02 00:00:00', now, JSON.stringify({featuredImage: publicImage}));
  for (const [type, pathname] of [[0, 'protected-post'], [0, 'protected-second'], [0, 'protected-third'], [1, 'protected-page']]) {
    seed.run(type, `${secret.title} cover-fixture`, pathname, `${secret.summary} cover-fixture`, '', `<p>${secret.body}</p>`, now, now, JSON.stringify({postPasswordHash: hash, featuredImage: secret.image}));
  }
  db.prepare("INSERT INTO fk_cate(name,pathname) VALUES ('Notes','notes')").run();
  db.prepare("INSERT INTO fk_post_cate(post_id,cate_id) SELECT id,(SELECT id FROM fk_cate WHERE pathname='notes') FROM fk_post").run();
  db.prepare("INSERT INTO fk_tag(name,pathname) VALUES ('Life','life')").run();
  db.prepare("INSERT INTO fk_post_tag(post_id,tag_id) SELECT id,(SELECT id FROM fk_tag WHERE pathname='life') FROM fk_post").run();
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"><rect width="200" height="100" fill="#8da"/></svg>';
  for (const filename of ['PUBLIC_PHOTO.svg', 'SECRET_PHOTO.svg']) fs.writeFileSync(path.join(site, 'themes', theme, 'res', filename), svg);
  server = spawn(process.execPath, [path.join(core, 'bin/firekylin.js')], {cwd: site, stdio: ['ignore', 'ignore', 'pipe']});
  let serverErrors = '';
  server.stderr.on('data', chunk => { serverErrors += chunk; });
  for (let attempt = 0; ; attempt++) {
    try { if ((await fetch(origin)).ok) break; } catch {}
    if (attempt >= 149) throw Error(`Site startup failed: ${serverErrors}`);
    await delay(200);
  }
  for (const route of [...listRoutes, ...detailRoutes]) {
    const html = await fetchHtml(route);
    assertPrivate(html, route);
    if (detailRoutes.includes(route)) assert(html.includes('protectPassword'), route);
    else assertProtectedRecord(html, route);
    checks.push({mode: 'HTTP', route, result: 'protected metadata absent'});
  }
  assert((await fetchHtml('/post/public-post.html')).includes(publicImage), 'public cover still renders');
  assert(mainContent(await fetchHtml('/')).includes(publicImage), 'public list cover still renders in main');
  for (const route of detailRoutes) {
    const post = value => ({method: 'POST', headers: {'content-type': 'application/x-www-form-urlencoded'}, body: new URLSearchParams({protectPassword: value}).toString()});
    const wrong = await fetchHtml(route, post('incorrect'));
    assertPrivate(wrong, `${route} wrong password`);
    assert(wrong.includes('密码错误'), 'native incorrect-password response');
    const unlocked = await fetchHtml(route, post(password));
    assert(unlocked.includes(secret.title) && unlocked.includes(secret.body) && unlocked.includes(secret.image), 'correct password reveals the article and cover');
    assert(!unlocked.includes('protectPassword') && !unlocked.includes(hash));
    assertPrivate(await fetchHtml(route), `${route} fresh GET after unlock`);
    checks.push({mode: 'HTTP', route, result: 'wrong/correct password and subsequent GET verified'});
  }
  const requests = [];
  if (process.env.SKIP_BROWSER !== '1') {
    const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
    browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox']});
    const context = await browser.newContext();
    await context.route('**/*', route => route.request().url().startsWith(origin) ? route.continue() : route.abort());
    const page = await context.newPage();
    page.on('request', request => requests.push(request.url()));
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const width of [1440, 390]) {
      await page.setViewportSize({width, height: 1000});
      for (const route of [...listRoutes, ...detailRoutes]) {
        requests.length = 0;
        const response = await page.goto(origin + route);
        assert.equal(response.status(), 200);
        const html = await page.content();
        assertPrivate(html, `browser ${width} ${route}`);
        if (listRoutes.includes(route)) assertProtectedRecord(html, route);
        else assert(mainContent(html).includes('protectPassword'));
        if (route === '/' || route === '/post/protected-post.html') {
          await page.screenshot({path: path.join(evidenceDir, `privacy-${route === '/' ? 'listing' : 'locked'}-${width}.png`), fullPage: true});
        }
        assert(!requests.some(url => url.includes('SECRET_PHOTO')), 'locked page must not request private cover');
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} overflow`);
        checks.push({mode: 'browser', width, route, result: 'protected DOM and image requests absent'});
      }
      for (const route of detailRoutes) {
        await page.goto(origin + route);
        requests.length = 0;
        await page.locator('[name=protectPassword]').fill('incorrect');
        await Promise.all([page.waitForNavigation(), page.locator('.post-password-form button').click()]);
        assertPrivate(await page.content(), 'wrong-password browser');
        assert(!requests.some(url => url.includes('SECRET_PHOTO')));
        await page.locator('[name=protectPassword]').fill(password);
        await Promise.all([page.waitForNavigation(), page.locator('.post-password-form button').click()]);
        assert((await page.content()).includes(secret.body));
        assert.equal(await page.locator(`img[src="${secret.image}"]`).count(), 1);
        const cover = page.locator(`img[src="${secret.image}"]`);
        await cover.scrollIntoViewIfNeeded();
        await page.waitForFunction(src => {
          const image = [...document.images].find(image => image.getAttribute('src') === src);
          return image && image.complete && image.naturalWidth > 0;
        }, secret.image);
        assert(requests.some(url => url.includes('SECRET_PHOTO')), 'unlocked cover is requested');
        if (route === '/post/protected-post.html') {
          await page.screenshot({path: path.join(evidenceDir, `privacy-unlocked-${width}.png`), fullPage: true});
        }
        await page.goto(origin + route);
        assertPrivate(await page.content(), 'fresh browser GET after unlock');
        checks.push({mode: 'browser', width, route, result: 'wrong/correct password and fresh GET verified'});
      }
    }
    assert.deepEqual(errors, []);
    await context.close();
  }
  const report = {
    theme, version, coreRevision: execFileSync('git', ['-C', core, 'rev-parse', 'HEAD'], {encoding: 'utf8'}).trim(),
    browser: browser ? browser.version() : 'NOT RUN: HTTP-only partial verification',
    checks
  };
  const evidence = path.join(root, 'verification', theme, 'privacy-report.json');
  fs.writeFileSync(evidence, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
}).finally(async () => {
  if (browser) await browser.close();
  if (server) server.kill('SIGTERM');
  if (db) db.close();
  console.log(`Disposable test site: ${site}`);
});
