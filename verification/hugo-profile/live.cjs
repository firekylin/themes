'use strict';
// Creates a disposable local SQLite site; never points at a user-provided database.
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),crypto=require('node:crypto');
const {spawn,execFileSync}=require('node:child_process');const {createRequire}=require('node:module');const assert=require('node:assert/strict');
const core=process.env.FIREKYLIN_CHECKOUT;if(!core)throw Error('Set FIREKYLIN_CHECKOUT');
const coreRequire=createRequire(path.join(core,'package.json'));const adapterRequire=createRequire(coreRequire.resolve('think-model-sqlite'));const Database=adapterRequire('better-sqlite3');
const browserless=process.env.HTTP_ONLY==='1';
const {chromium}=browserless?{}:require(process.env.PLAYWRIGHT_MODULE||'playwright-core');
const repository=path.resolve(__dirname,'../..');const site=fs.mkdtempSync(path.join(os.tmpdir(),'hugo-profile-site-'));const port=Number(process.env.PROFILE_TEST_PORT)||8937;const origin='http://127.0.0.1:'+port;
let server,browser,db;const delay=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 await require(path.join(core,'lib/cli')).run(['new',site,'--db-type','sqlite','--db-path','data/firekylin.sqlite','--site-title','PROFILE 测试博客','--site-url',origin,'--admin-user','fixture-admin','--admin-password',crypto.randomBytes(24).toString('hex'),'--admin-email','fixture@example.invalid','--non-interactive','--skip-install']);
 const configPath=path.join(site,'firekylin.config.js');const config=require(configPath);config.server={host:'127.0.0.1',port,proxy:false};fs.writeFileSync(configPath,'module.exports='+JSON.stringify(config));
 execFileSync('python3',['-c',`import importlib.util,pathlib\nr=pathlib.Path(${JSON.stringify(repository)})\ns=importlib.util.spec_from_file_location('builder',r/'scripts/build-registry.py')\nm=importlib.util.module_from_spec(s);s.loader.exec_module(m)\nm.build_theme(r/'packages/hugo-profile',r,m.theme_files(r/'packages/hugo-profile'))`]);
 const {ThemeInstaller}=require(path.join(core,'src/service/theme-installer'));const installer=new ThemeInstaller({themesPath:path.join(site,'themes'),backupPath:path.join(site,'backups'),firekylinVersion:coreRequire('./package.json').version});await installer.install(fs.readFileSync(path.join(repository,'dist/hugo-profile-'+JSON.parse(fs.readFileSync(path.join(repository,'packages/hugo-profile/package.json'))).version+'.zip')));
 db=new Database(path.join(site,'data/firekylin.sqlite'));
 const set=(k,v)=>db.prepare('INSERT INTO fk_options (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').run(k,v);
 set('theme','hugo-profile');set('description','一生想做自由极客');set('navigation',JSON.stringify([{label:'About',url:'/page/about.html'}]));
 db.prepare("UPDATE fk_post SET title='PROFILE article',pathname='hello',summary='<p>Public summary</p>',content='<p><strong>Bold</strong> and <em>Italic</em>.</p><ul><li>First<ul><li>Nested</li></ul></li></ul><ol><li>One</li><li>Two</li></ol><table><tr><th>Header</th></tr><tr><td>LongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCell</td></tr></table><pre><code>long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_</code></pre><h3>First chapter</h3><p>Public content</p><h4>Second chapter</h4><p><img src=/themes/hugo-profile/res/fixture.svg alt=Fixture></p>',allow_comment=0").run();
 const seed=db.prepare('INSERT INTO fk_post (user_id,type,status,title,pathname,summary,markdown_content,content,allow_comment,create_time,update_time,is_public,comment_num) VALUES (1,?,?,?,?,?,?,?,0,?,?,?,0)');
 const now='2026-10-28 00:00:00';db.prepare("UPDATE fk_post SET create_time='2026-11-01 10:00:00' WHERE pathname='hello'").run();seed.run(0,3,'PRIVATE_MARKER','private-marker','PRIVATE_MARKER','private','PRIVATE_MARKER',now,now,0);seed.run(0,0,'DRAFT_MARKER','draft-marker','DRAFT_MARKER','draft','DRAFT_MARKER',now,now,1);seed.run(1,3,'About','about','About','About','<p>About page</p>',now,now,1);
 for(let i=0;i<12;i++)seed.run(0,3,'PROFILE public '+i,'public-'+i,'public '+i,'public','<p>Public</p>',now,now,1);
 db.prepare('UPDATE fk_post SET options=? WHERE is_public=1 AND status=3').run(JSON.stringify({featuredImage:'/themes/hugo-profile/res/fixture.svg'}));
 db.prepare('UPDATE fk_post SET options=? WHERE pathname=?').run('{}','hello');
 db.prepare('UPDATE fk_post SET options=? WHERE pathname=?').run(JSON.stringify({featuredImage:'javascript:invalid'}),'public-11');
 seed.run(2,3,'Native attachment','native-attachment','','','',now,now,1);db.prepare('UPDATE fk_post SET options=? WHERE pathname=?').run(JSON.stringify({attachment:{url:'/themes/hugo-profile/res/fixture.svg',mime:'image/svg+xml',name:'Fixture image'}}),'native-attachment');
 db.prepare("INSERT INTO fk_cate(name,pathname) VALUES ('随笔','notes')").run();
 db.prepare("INSERT INTO fk_cate(name,pathname,pid) SELECT '子分类','child',id FROM fk_cate WHERE pathname='notes'").run();
 db.prepare("INSERT INTO fk_post_cate(post_id,cate_id) SELECT id,(SELECT id FROM fk_cate WHERE pathname='notes') FROM fk_post WHERE is_public=1 AND status=3").run();
 db.prepare("INSERT INTO fk_tag(name,pathname) VALUES ('生活','life')").run();
 db.prepare("INSERT INTO fk_post_tag(post_id,tag_id) SELECT id,(SELECT id FROM fk_tag WHERE pathname='life') FROM fk_post WHERE is_public=1 AND status=3").run();
 set('themeConfig',JSON.stringify({footerText:'阅读与探索本站内容。'}));
 fs.writeFileSync(path.join(site,'themes/hugo-profile/res/fixture.svg'),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600"><rect width="1000" height="600" fill="#e8dcca"/><circle cx="730" cy="170" r="85" fill="#d58b63"/><path d="M0 480L270 130L620 600H0Z" fill="#8dada5"/><path d="M300 600L690 250L1000 530V600Z" fill="#456e74"/></svg>');
 db.prepare("UPDATE fk_post SET content=content||? WHERE pathname IN ('hello','about')").run("<p>Embedded media regression</p><video width=\"1280\" height=\"720\" controls poster=\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%221280%22 height=%22720%22%3E%3Crect width=%221280%22 height=%22720%22 fill=%22%239ab%22/%3E%3C/svg%3E\"></video><audio controls style=\"width:1280px\"></audio>");
 server=spawn(process.execPath,[path.join(core,'bin/firekylin.js')],{cwd:site,stdio:['ignore','ignore','pipe']});let serverErrors='';server.stderr.on('data',c=>serverErrors+=c);for(let i=0;i<150;i++){try{if((await fetch(origin)).ok)break;}catch{}if(i===149)throw Error('Site startup failed: '+serverErrors);await delay(200);}

 const evidence=path.join(repository,'verification/hugo-profile');
 const checks=[];
 const routes=['/','/?page=2','/post/hello.html','/page/about.html','/attachment/native-attachment.html','/archives','/categories','/tags','/search.html?keyword=PROFILE','/cate/notes','/tag/life','/author/fixture-admin'];
 for(const route of routes){
  const response=await fetch(origin+route,{redirect:'manual'});
  assert.equal(response.status,200,route);
  const html=await response.text();
  assert(!html.includes('undefined'),route+' contains undefined');
  assert(!html.includes('PRIVATE_MARKER')&&!html.includes('DRAFT_MARKER'),route+' leaks unpublished content');
  if(route==='/')assert(html.includes('src="/themes/hugo-profile/res/fixture.svg"'),'public cover survives');
  checks.push({route,status:response.status,type:'HTTP'});
 }
 const errors=[];
 if(!browserless){
  browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
  const context=await browser.newContext({colorScheme:'light'});
  const page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.url().startsWith(origin+'/themes/')&&r.status()>=400)errors.push(r.status()+' '+r.url())});
  await page.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
  for(const width of [1440,768,390]){
   await page.setViewportSize({width,height:1000});
   for(const route of routes){
    const response=await page.goto(origin+route);
    assert.equal(response.status(),200,route);
    await page.evaluate(()=>document.fonts.ready);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+' overflow at '+width);
    assert.equal(await page.locator('main').count(),1);
    if(route==='/categories'){
     assert.equal(await page.locator('.taxonomy-list > li').count(),1);
     assert.equal(await page.locator('.taxonomy-list > li > ul > li').count(),1);
     assert.equal(await page.locator('a[href="/cate/child"]').textContent(),'子分类');
    }
    if(route.includes('/attachment/')){
     assert.equal(await page.locator('.attachment-media a[download]').count(),1);
     assert(await page.locator('.attachment-media img').evaluate(i=>i.complete&&i.naturalWidth>0));
    }
    if(route==='/post/hello.html'||route==='/page/about.html'){
     const media=await page.locator('.prose').evaluate(e=>{const p=e.getBoundingClientRect(),v=e.querySelector('video').getBoundingClientRect(),a=e.querySelector('audio').getBoundingClientRect();return {column:p.width,video:v.width,audio:a.width,audioHeight:a.height,ratio:v.width/v.height}});
     assert(media.audioHeight>=40,'audio visible');
     assert(media.video<=media.column+1&&media.audio<=media.column+1,route+' embedded media fits');
     assert(Math.abs(media.ratio-1280/720)<.02,route+' video aspect ratio');
    }
    checks.push({width,route,status:response.status()});
   }
   await page.goto(origin);
   await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('.entry').count(),10);
   const positions=await page.locator('.post-grid > div').evaluateAll(els=>els.slice(0,4).map(e=>({x:e.getBoundingClientRect().x,y:e.getBoundingClientRect().y})));
   const columns=positions.filter(p=>Math.abs(p.y-positions[0].y)<2).length;
   assert.equal(columns,width===1440?3:width===768?2:1,'upstream responsive card columns');
   assert.equal(await page.locator('.card').first().evaluate(e=>getComputedStyle(e).borderRadius),'12px');
   assert.equal(await page.locator('.card-img-top').first().evaluate(e=>e.getBoundingClientRect().height),250);
   await page.screenshot({path:path.join(evidence,'home-'+width+'.png'),fullPage:true});
   await page.getByRole('link',{name:'下一页',exact:true}).click();
   await page.waitForURL('**/?page=2');
   await page.goto(origin+'/post/hello.html');
   for(const sel of ['.prose h3','.prose h4','.prose pre','.prose table','.prose img'])assert(await page.locator(sel).first().isVisible(),sel+' visible');
   assert(Number(await page.locator('.prose strong').evaluate(e=>getComputedStyle(e).fontWeight))>=600,'strong weight');
   assert.equal(await page.locator('.prose em').evaluate(e=>getComputedStyle(e).fontStyle),'italic');
   assert(await page.locator('.prose ul').first().evaluate(e=>getComputedStyle(e).listStyleType!=='none'),'list markers');
   assert(await page.locator('.nav-items a[href="/archives"]').isVisible());
   await page.evaluate(()=>document.fonts.ready);
   await page.screenshot({path:path.join(evidence,'post-'+width+'.png'),fullPage:true});
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(origin+'/post/hello.html');
  assert(await page.locator('aside.toc').isVisible());
  await page.locator('.toc-content a').first().click();
  assert(await page.evaluate(()=>location.hash.startsWith('#profile-section-')));
  await page.locator('#theme-toggle').click();
  assert(await page.locator('html').evaluate(e=>e.classList.contains('dark')));
  await page.reload();
  assert(await page.locator('html').evaluate(e=>e.classList.contains('dark')));
  await page.screenshot({path:path.join(evidence,'post-dark-1440.png'),fullPage:true});
  await page.locator('#theme-toggle').click();
  assert(!(await page.locator('html').evaluate(e=>e.classList.contains('dark'))));
  set('themeConfig',JSON.stringify({profileTitle:'A life of curiosity',profileIntro:'Hello, I am',profileSubtitle:'Writer. Builder. Explorer.',profileText:'Notes about code, design, and the places in between.',profileImage:'/themes/hugo-profile/res/fixture.svg',profileLink:'/page/about.html',profileLinkLabel:'About me'}));
  for(const width of [1440,390]){
   await page.setViewportSize({width,height:1000});await page.goto(origin);await page.evaluate(()=>document.fonts.ready);
   assert(await page.locator('#hero').isVisible());assert(await page.locator('#hero img').evaluate(i=>i.complete&&i.naturalWidth>0));
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await page.screenshot({path:path.join(evidence,'profile-'+width+'.png'),fullPage:true});
   await page.goto(origin+'/?page=2');assert.equal(await page.locator('#hero').count(),0);
   await page.goto(origin+'/author/fixture-admin');assert.equal(await page.locator('#hero').count(),0);
  }
  set('themeConfig','{}');
  const blocked=await browser.newContext();
  await blocked.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw Error('storage unavailable')}})});
  const bp=await blocked.newPage();await bp.goto(origin);await bp.locator('#theme-toggle').click();assert(await bp.locator('html').evaluate(e=>e.classList.contains('dark')));await blocked.close();
  const nojs=await browser.newContext({javaScriptEnabled:false});
  const np=await nojs.newPage();await np.setViewportSize({width:390,height:1000});await np.goto(origin);
  await np.locator('.nav-items a[href="/search.html"]').click();await np.locator('#keyword').fill('PROFILE');await np.locator('#main').getByRole('button',{name:'搜索',exact:true}).click();await np.waitForURL('**/search.html?keyword=PROFILE');await nojs.close();
 }
 for(const pathname of ['private-marker','draft-marker']){const denied=await fetch(origin+'/post/'+pathname+'.html',{redirect:'manual'});assert.equal(denied.status,302);assert.equal(denied.headers.get('location'),'/');}
 db.prepare('UPDATE fk_post SET allow_comment=1 WHERE pathname=?').run('hello');
 let html=await(await fetch(origin+'/post/hello.html')).text();assert(html.includes('data-comment-config'));assert.equal((html.match(/id="comments"/g)||[]).length,1);
 db.prepare('UPDATE fk_post SET allow_comment=0 WHERE pathname=?').run('hello');assert(!(await(await fetch(origin+'/post/hello.html')).text()).includes('data-comment-config'));
 set('themeConfig',JSON.stringify({profileTitle:'PROFILE_HOME_ONLY'}));
 assert((await(await fetch(origin)).text()).includes('id="hero"'));
 for(const route of ['/?page=2','/author/fixture-admin','/cate/notes','/tag/life']){const response=await fetch(origin+route);assert.equal(response.status,200);assert(!(await response.text()).includes('id="hero"'),route+' homepage hero leaked');}
 set('themeConfig','{}');
 // Core list redaction leaves featuredImage behind: verify the sentinel guard in real list routes.
 const password='fixture-unlock-only';const salt=crypto.randomBytes(16);const hash='scrypt$'+salt.toString('base64url')+'$'+crypto.scryptSync(password,salt,32).toString('base64url');
 db.prepare('UPDATE fk_post SET options=?,title=?,summary=?,content=? WHERE pathname=?').run(JSON.stringify({postPasswordHash:hash,featuredImage:'/SECRET_PHOTO'}),'SECRET_TITLE','SECRET_SUMMARY','SECRET_BODY','hello');
 for(const route of ['/','/search.html?keyword=SECRET','/cate/notes','/tag/life','/archives','/post/hello.html']){
  const response=await fetch(origin+route,{redirect:'manual'});assert.equal(response.status,200,route+' protected status');const html=await response.text();const main=html.match(/<main id="main">([\s\S]*?)<\/main>/)?.[1]||'';
  assert(main.includes('此内容被密码保护'),route+' protected entry present');
  if(route!=='/post/hello.html')assert(main.includes('href="/post/hello.html"'),route+' protected link present');
  for(const marker of ['SECRET_PHOTO','SECRET_TITLE','SECRET_SUMMARY','SECRET_BODY'])assert(!html.includes(marker),route+' leaked '+marker);
  if(route==='/post/hello.html')assert(html.includes('protectPassword'));
 }
 const wrongResponse=await fetch(origin+'/post/hello.html',{method:'POST',redirect:'manual',headers:{'content-type':'application/x-www-form-urlencoded'},body:'protectPassword=wrong'});assert.equal(wrongResponse.status,200);const wrong=await wrongResponse.text();assert(wrong.includes('protectPassword'));assert(!wrong.includes('SECRET_BODY'));
 const unlockResponse=await fetch(origin+'/post/hello.html',{method:'POST',redirect:'manual',headers:{'content-type':'application/x-www-form-urlencoded'},body:'protectPassword='+password});assert.equal(unlockResponse.status,200);const unlocked=await unlockResponse.text();assert(unlocked.includes('SECRET_BODY'));assert(unlocked.includes('SECRET_TITLE'));
 // Pages also delegate access control and do not expose image/options before unlock.
 db.prepare('UPDATE fk_post SET options=?,title=?,summary=?,content=? WHERE pathname=?').run(JSON.stringify({postPasswordHash:hash,featuredImage:'/SECRET_PAGE_PHOTO'}),'SECRET_PAGE_TITLE','SECRET_PAGE_SUMMARY','SECRET_PAGE_BODY','about');
 const pageLocked=await fetch(origin+'/page/about.html');assert.equal(pageLocked.status,200);const lockedHtml=await pageLocked.text();assert(lockedHtml.includes('protectPassword'));for(const marker of ['SECRET_PAGE_PHOTO','SECRET_PAGE_TITLE','SECRET_PAGE_SUMMARY','SECRET_PAGE_BODY'])assert(!lockedHtml.includes(marker));
 const pageWrong=await fetch(origin+'/page/about.html',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:'protectPassword=wrong'});assert.equal(pageWrong.status,200);const pageWrongHtml=await pageWrong.text();assert(pageWrongHtml.includes('protectPassword'));assert(!pageWrongHtml.includes('SECRET_PAGE_BODY'));
 const pageUnlock=await fetch(origin+'/page/about.html',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:'protectPassword='+password});assert.equal(pageUnlock.status,200);const pageUnlockedHtml=await pageUnlock.text();assert(pageUnlockedHtml.includes('SECRET_PAGE_BODY'));assert(pageUnlockedHtml.includes('SECRET_PAGE_TITLE'));
 assert.deepEqual(errors,[]);
 const report={sourceCommit:execFileSync('git',['-C',repository,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),sourceTree:execFileSync('git',['-C',repository,'rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),coreRevision:execFileSync('git',['-C',core,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),browser:browser?.version()||'not run (HTTP-only)',checks,passed:['actual native ZIP installer and SQLite routes','private/draft exclusion','native comments gating','six protected routes with positive entry presence and no secret metadata','wrong and correct native passwords for posts and pages','public covers remain visible and hero excluded from author route'],limits:['No live upstream demo comparison; layout and resources compared to pinned upstream source.','Remote Waline client authentication/submission not tested.']};
 if(!browserless)report.passed.push('1440/768/390 card columns and no overflow','taxonomy parent/child DOM closure','local fonts and image decoding','strong/italic, long code and tables','video aspect ratio and audio controls','dark/light toggle, persistence and storage failure','TOC links','optional profile homepage and page-two gating','navigation/search without JavaScript');
 fs.writeFileSync(path.join(evidence,browserless?'http-report.json':'report.json'),JSON.stringify(report,null,2)+'\n');
 if(!browserless)fs.copyFileSync(path.join(evidence,'home-1440.png'),path.join(repository,'packages/hugo-profile/screenshot.png'));
 console.log(JSON.stringify(report));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();if(server)server.kill('SIGTERM');if(db)db.close();console.log('Disposable test site:',site)});
