'use strict';
// Creates a disposable local SQLite site; never points at a user-provided database.
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),crypto=require('node:crypto');
const {spawn,execFileSync}=require('node:child_process');const {createRequire}=require('node:module');const assert=require('node:assert/strict');
const core=process.env.FIREKYLIN_CHECKOUT;if(!core)throw Error('Set FIREKYLIN_CHECKOUT');
const coreRequire=createRequire(path.join(core,'package.json'));const adapterRequire=createRequire(coreRequire.resolve('think-model-sqlite'));const Database=adapterRequire('better-sqlite3');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const repository=path.resolve(__dirname,'../..');const site=fs.mkdtempSync(path.join(os.tmpdir(),'libre-2-site-'));const port=Number(process.env.LIBRE_2_TEST_PORT)||8913;const origin='http://127.0.0.1:'+port;
let server,browser,db;const delay=ms=>new Promise(r=>setTimeout(r,ms));
const boundsChecks = [];
async function verifyBounds(page, width, variant) {
  const elements = await page.locator('.site-title, .site-description, #main, .prose').evaluateAll(nodes => nodes.map(node => {
    const rect = node.getBoundingClientRect();
    const style = getComputedStyle(node);
    const visible = node.getClientRects().length > 0 && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
    const range = document.createRange();
    range.selectNodeContents(node);
    const text = range.getBoundingClientRect();
    return {
      selector: node.id ? '#' + node.id : node.className,
      visible, left: rect.left, right: rect.right,
      textLeft: text.left, textRight: text.right,
      checkText: node.matches('.site-title, .site-description')
    };
  }));
  boundsChecks.push({width, variant, elements});
  fs.writeFileSync(path.join(repository, 'verification/libre-2/bounds-report.json'), JSON.stringify(boundsChecks, null, 2) + '\n');
  assert(elements.some(element => element.selector === '#main' && element.visible), variant + ' has visible main content');
  for (const element of elements.filter(element => element.visible)) {
    assert(element.left >= -1 && element.right <= width + 1, variant + ' clips ' + element.selector + ': ' + JSON.stringify(element));
    if (element.checkText) {
      assert(element.textLeft >= -1 && element.textRight <= width + 1, variant + ' clips branding text: ' + JSON.stringify(element));
    }
  }
}

// Run before the browser snapshots so their normal public fixture is unchanged.
async function verifyProtectedPost() {
  const saved = db.prepare("SELECT title,summary,content,options FROM fk_post WHERE pathname='hello'").get();
  const update = db.prepare("UPDATE fk_post SET title=?,summary=?,content=?,options=? WHERE pathname='hello'");
  const password = crypto.randomBytes(24).toString('hex');
  const salt = crypto.randomBytes(16);
  const hash = 'scrypt$' + salt.toString('base64url') + '$' +
    crypto.scryptSync(password, salt, 32).toString('base64url');
  const photo = '/themes/libre-2/res/fixture.svg?SECRET_PHOTO';
  const routes = ['/', '/search.html?keyword=privacy-fixture', '/cate/notes', '/tag/life', '/archives', '/post/hello.html'];
  const results = [];
  try {
    update.run('SECRET_TITLE privacy-fixture', 'SECRET_SUMMARY',
      '<p>SECRET_BODY</p><img src="' + photo + '" alt="">',
      JSON.stringify({postPasswordHash: hash, featuredImage: photo}));
    for (const route of routes) {
      const response = await fetch(origin + route);
      assert.equal(response.status, 200, route);
      const html = await response.text();
      assert(!/SECRET_(TITLE|SUMMARY|BODY|PHOTO)/.test(html), route + ' leaked protected metadata');
      const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
      assert(main, route + ' must render main');
      assert(main.includes('/post/hello.html'), route + ' must contain the protected post in main');
      assert(main.includes('此内容被密码保护'), route + ' must display the core redaction in main');
      if (['/', '/cate/notes', '/tag/life'].includes(route)) {
        assert(main.includes('src="/themes/libre-2/res/fixture.svg"'), route + ' retains public thumbnails');
      }
      results.push({route, status: response.status, protectedTargetPresentInMain: true, protectedMetadataHidden: true});
    }
    const unlock = password => fetch(origin + '/post/hello.html', {
      method: 'POST',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      body: new URLSearchParams({protectPassword: password})
    });
    const denied = await unlock('wrong-password');
    assert.equal(denied.status, 200);
    const lockedHtml = await denied.text();
    assert(lockedHtml.includes('protectPassword'), 'wrong password retains native form');
    assert(!/SECRET_(TITLE|SUMMARY|BODY|PHOTO)/.test(lockedHtml), 'wrong password leaks protected metadata');
    const allowed = await unlock(password);
    assert.equal(allowed.status, 200);
    const unlockedHtml = await allowed.text();
    for (const marker of ['SECRET_TITLE', 'SECRET_BODY', 'SECRET_PHOTO']) {
      assert(unlockedHtml.includes(marker), 'successful native unlock restores ' + marker);
    }
    assert(!unlockedHtml.includes('name="protectPassword"'), 'successful unlock removes password form');
    results.push({route: '/post/hello.html', wrongPasswordHidden: true, correctPasswordRestoresContent: true});
  } finally {
    update.run(saved.title, saved.summary, saved.content, saved.options);
  }
  for (const route of ['/', '/search.html?keyword=LIBRE-2', '/cate/notes', '/tag/life', '/post/hello.html']) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
    assert(main && main.includes('src="/themes/libre-2/res/fixture.svg"'), route + ' restores public thumbnails');
  }
  const evidence = path.join(repository, 'verification/libre-2');
  const report = {
    coreRevision: execFileSync('git', ['-C', core, 'rev-parse', 'HEAD'], {encoding: 'utf8'}).trim(),
    checks: results,
    passed: ['actual ZIP installation', 'real SQLite core redaction', 'home/search/category/tag/archive/locked detail privacy', 'native wrong-password and successful unlock flows', 'public thumbnail preservation in home/search/category/tag/detail']
  };
  fs.writeFileSync(path.join(evidence, 'protection-report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log('Protected-post HTTP verification: ' + JSON.stringify(report));
}

(async()=>{
 await require(path.join(core,'lib/cli')).run(['new',site,'--db-type','sqlite','--db-path','data/firekylin.sqlite','--site-title','LIBRE-2 测试博客','--site-url',origin,'--admin-user','fixture-admin','--admin-password',crypto.randomBytes(24).toString('hex'),'--admin-email','fixture@example.invalid','--non-interactive','--skip-install']);
 const configPath=path.join(site,'firekylin.config.js');const config=require(configPath);config.server={host:'127.0.0.1',port,proxy:false};fs.writeFileSync(configPath,'module.exports='+JSON.stringify(config));
 execFileSync('python3',['-c',`import importlib.util,pathlib\nr=pathlib.Path(${JSON.stringify(repository)})\ns=importlib.util.spec_from_file_location('builder',r/'scripts/build-registry.py')\nm=importlib.util.module_from_spec(s);s.loader.exec_module(m)\nm.build_theme(r/'packages/libre-2',r,m.theme_files(r/'packages/libre-2'))`]);
 const {ThemeInstaller}=require(path.join(core,'src/service/theme-installer'));const installer=new ThemeInstaller({themesPath:path.join(site,'themes'),backupPath:path.join(site,'backups'),firekylinVersion:coreRequire('./package.json').version});await installer.install(fs.readFileSync(path.join(repository,'dist/libre-2-'+JSON.parse(fs.readFileSync(path.join(repository,'packages/libre-2/package.json'))).version+'.zip')));
 db=new Database(path.join(site,'data/firekylin.sqlite'));
 const set=(k,v)=>db.prepare('INSERT INTO fk_options (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').run(k,v);
 set('theme','libre-2');set('description','一生想做自由极客');set('navigation',JSON.stringify([{label:'About',url:'/page/about.html'}]));
 db.prepare("UPDATE fk_post SET title='LIBRE-2 article',pathname='hello',summary='<p>Public summary</p>',content='<p><strong>Bold</strong> and <em>Italic</em>.</p><ul><li>First<ul><li>Nested</li></ul></li></ul><ol><li>One</li><li>Two</li></ol><table><tr><th>Header</th></tr><tr><td>LongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCell</td></tr></table><pre><code>long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_</code></pre><h3>First chapter</h3><p>Public content</p><h4>Second chapter</h4><p><img src=/themes/libre-2/res/fixture.svg alt=Fixture></p>',allow_comment=0").run();
 const seed=db.prepare('INSERT INTO fk_post (user_id,type,status,title,pathname,summary,markdown_content,content,allow_comment,create_time,update_time,is_public,comment_num) VALUES (1,?,?,?,?,?,?,?,0,?,?,?,0)');
 const now='2026-10-28 00:00:00';seed.run(0,3,'PRIVATE_MARKER','private-marker','PRIVATE_MARKER','private','PRIVATE_MARKER',now,now,0);seed.run(0,0,'DRAFT_MARKER','draft-marker','DRAFT_MARKER','draft','DRAFT_MARKER',now,now,1);seed.run(1,3,'About','about','About','About','<p>About page</p>',now,now,1);
 for(let i=0;i<12;i++)seed.run(0,3,'LIBRE-2 public '+i,'public-'+i,'public '+i,'public','<p>Public</p>',now,now,1);
 db.prepare('UPDATE fk_post SET options=? WHERE is_public=1 AND status=3').run(JSON.stringify({featuredImage:'/themes/libre-2/res/fixture.svg'}));
 seed.run(2,3,'Native attachment','native-attachment','','','',now,now,1);db.prepare('UPDATE fk_post SET options=? WHERE pathname=?').run(JSON.stringify({attachment:{url:'/themes/libre-2/res/fixture.svg',mime:'image/svg+xml',name:'Fixture image'}}),'native-attachment');
 db.prepare("INSERT INTO fk_cate(name,pathname) VALUES ('随笔','notes')").run();
 db.prepare("INSERT INTO fk_post_cate(post_id,cate_id) SELECT id,(SELECT id FROM fk_cate WHERE pathname='notes') FROM fk_post WHERE is_public=1 AND status=3").run();
 db.prepare("INSERT INTO fk_tag(name,pathname) VALUES ('生活','life')").run();
 db.prepare("INSERT INTO fk_post_tag(post_id,tag_id) SELECT id,(SELECT id FROM fk_tag WHERE pathname='life') FROM fk_post WHERE is_public=1 AND status=3").run();
 set('themeConfig',JSON.stringify({footerText:'阅读与探索本站内容。'}));
 fs.writeFileSync(path.join(site,'themes/libre-2/res/fixture.svg'),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600"><rect width="1000" height="600" fill="#e8dcca"/><circle cx="730" cy="170" r="85" fill="#d58b63"/><path d="M0 480L270 130L620 600H0Z" fill="#8dada5"/><path d="M300 600L690 250L1000 530V600Z" fill="#456e74"/></svg>');
 const embeddedMedia = '<video width="1280" height="720" controls poster="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%221280%22 height=%22720%22%3E%3Crect width=%221280%22 height=%22720%22 fill=%22%239ab%22/%3E%3C/svg%3E"></video><audio controls style="width:1280px"></audio>';
 db.prepare("UPDATE fk_post SET content=content||? WHERE pathname IN ('hello','about')").run(embeddedMedia);
 server=spawn(process.execPath,[path.join(core,'bin/firekylin.js')],{cwd:site,stdio:['ignore','ignore','pipe']});let serverErrors='';server.stderr.on('data',c=>serverErrors+=c);for(let i=0;i<150;i++){try{if((await fetch(origin)).ok)break;}catch{}if(i===149)throw Error('Site startup failed: '+serverErrors);await delay(200);}
 await verifyProtectedPost();
 if (process.env.PROTECTION_HTTP_ONLY === '1') return;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const context=await browser.newContext();const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.url().startsWith(origin+'/themes/')&&r.status()>=400)errors.push(r.status()+' '+r.url())});
 await page.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
 const evidence=path.join(repository,'verification/libre-2');fs.mkdirSync(evidence,{recursive:true});const checks=[]; const mediaChecks=[];
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:1000});
  for(const route of ['/','/?page=2','/post/hello.html','/page/about.html','/attachment/native-attachment.html','/archives','/categories','/tags','/search.html?keyword=LIBRE-2']){
   const response=await page.goto(origin+route);assert.equal(response.status(),200,route);
   await verifyBounds(page, width, route);
   const html=await page.content();assert(!html.includes('undefined'),route+' contains undefined');assert(!html.includes('MMM D'),'unsupported date format');assert(!html.includes('PRIVATE_MARKER')&&!html.includes('DRAFT_MARKER'),route+' leaked content');
   if(route.includes('/attachment/')){assert.equal(await page.locator('.attachment-media a[download]').count(),1);assert(await page.locator('.attachment-media img').evaluate(i=>i.complete&&i.naturalWidth>0));}assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+' overflow');if (route === '/post/hello.html' || route === '/page/about.html') {
    const media = await page.locator('.prose').evaluate(element => {
     const column = element.getBoundingClientRect();
     const video = element.querySelector('video').getBoundingClientRect();
     const audio = element.querySelector('audio').getBoundingClientRect();
     return {column: column.width, video: video.width, audio: audio.width, ratio: video.width / video.height, audioHeight: audio.height};
    });
    assert(media.video <= media.column + 1 && media.audio <= media.column + 1, route + ' media fits reading column');
    assert(Math.abs(media.ratio - 1280 / 720) < .02, route + ' video aspect ratio');
    assert(media.audioHeight >= 40, route + ' audio controls visible');
    mediaChecks.push({width, route, ...media});
    if (route === '/page/about.html') {
      await page.screenshot({path:path.join(evidence,'page-'+width+'.png'),fullPage:true});
    }
   }
   checks.push({width,route,status:response.status()});
  }
  await page.goto(origin);await page.locator('.native-nav a[href="/archives"]').click();await page.waitForURL('**/archives');await page.goto(origin);assert.equal(await page.locator('.entry').count(),10);assert(await page.locator('#main').evaluate(e=>e.getBoundingClientRect().width>280),'usable main width');await page.evaluate(()=>Promise.all(document.getAnimations().filter(a=>a.effect.getTiming().iterations!==Infinity).map(a=>a.finished.catch(()=>{}))));await page.screenshot({path:path.join(evidence,'home-'+width+'.png'),fullPage:true});
  await page.getByRole('link',{name:'下一页',exact:true}).click();await page.waitForURL('**/?page=2');
  await page.goto(origin+'/post/hello.html');for(const sel of ['.prose h3','.prose h4','.prose pre','.prose table','.prose img'])assert(await page.locator(sel).first().isVisible(),sel+' visible');assert(await page.locator('.prose ul').first().evaluate(e=>getComputedStyle(e).listStyleType!=='none'),'list markers');await page.screenshot({path:path.join(evidence,'post-'+width+'.png'),fullPage:true});assert(await page.locator('.nav-items a[href="/archives"]').isVisible());

  await page.goto(origin);
  const branding = await page.locator('.site-title a, .site-description').evaluateAll(nodes => nodes.map(node => {
    const text = node.textContent;
    node.textContent = node.matches('.site-description')
      ? '这是用于检查长站点描述的示例。A longer site description should wrap without losing words on either side. '.repeat(3)
      : 'A long native blog title 测试长标题 LongUnbrokenTitleLongUnbrokenTitleLongUnbrokenTitle';
    return text;
  }));
  await page.screenshot({path:path.join(evidence,'branding-stress-'+width+'.png'),fullPage:true});
  await verifyBounds(page, width, 'long branding');
  await page.locator('.site-title a, .site-description').evaluateAll((nodes, values) => nodes.forEach((node, index) => {node.textContent = values[index];}), branding);
 }
 for(const pathname of ['private-marker','draft-marker']){const denied=await fetch(origin+'/post/'+pathname+'.html',{redirect:'manual'});assert.equal(denied.status,302);assert.equal(denied.headers.get('location'),'/');}
 db.prepare('UPDATE fk_post SET allow_comment=1 WHERE pathname=?').run('hello');let html=await(await fetch(origin+'/post/hello.html')).text();assert(html.includes('data-comment-config'));assert.equal((html.match(/id="comments"/g)||[]).length,1);
 db.prepare('UPDATE fk_post SET allow_comment=0 WHERE pathname=?').run('hello');assert(!(await(await fetch(origin+'/post/hello.html')).text()).includes('data-comment-config'));
 const nojs=await browser.newContext({javaScriptEnabled:false});const np=await nojs.newPage();await np.setViewportSize({width:390,height:1000});await np.goto(origin);await np.locator('.nav-items a[href="/search.html"]').click();await np.locator('#keyword').fill('LIBRE-2');await np.locator('#main').getByRole('button',{name:'搜索',exact:true}).click();await np.waitForURL('**/search.html?keyword=LIBRE-2');await nojs.close();
 assert.deepEqual(errors,[]);const report={core:coreRequire('./package.json').version,coreRevision:execFileSync('git',['-C',core,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),browser:browser.version(),checks,mediaChecks,boundsChecks,passed:['wide post/page video and audio containment with video aspect ratio', 'protected thumbnail HTTP regression and native password unlock', 'actual ZIP installation','18 real SQLite routes','native attachment image/download','long native code containment','native article pagination','visible wrapping navigation without JavaScript','responsive header navigation','search without JavaScript','private/draft exclusion','comment gating'],limits:['Compared pinned upstream CSS and PHP templates; no live upstream demo comparison.','Waline remote client login/submission not tested.']};fs.writeFileSync(path.join(evidence,'report.json'),JSON.stringify(report,null,2)+'\n');fs.copyFileSync(path.join(evidence,'home-1440.png'),path.join(repository,'packages/libre-2/screenshot.png'));console.log(JSON.stringify(report));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();if(server)server.kill('SIGTERM');if(db)db.close();console.log('Disposable test site:',site)});
