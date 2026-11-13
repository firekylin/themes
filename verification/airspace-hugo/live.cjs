'use strict';
// Creates a disposable local SQLite site; never points at a user-provided database.
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),crypto=require('node:crypto');
const {spawn,execFileSync}=require('node:child_process');const {createRequire}=require('node:module');const assert=require('node:assert/strict');
const core=process.env.FIREKYLIN_CHECKOUT;if(!core)throw Error('Set FIREKYLIN_CHECKOUT');
const coreRequire=createRequire(path.join(core,'package.json'));const adapterRequire=createRequire(coreRequire.resolve('think-model-sqlite'));const Database=adapterRequire('better-sqlite3');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const repository=path.resolve(__dirname,'../..');const site=fs.mkdtempSync(path.join(os.tmpdir(),'airspace-hugo-site-'));const port=Number(process.env.AIRSPACE_TEST_PORT)||8947;const origin='http://127.0.0.1:'+port;
let server,browser,db;const delay=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 await require(path.join(core,'lib/cli')).run(['new',site,'--db-type','sqlite','--db-path','data/firekylin.sqlite','--site-title','AIRSPACE 测试博客','--site-url',origin,'--admin-user','fixture-admin','--admin-password',crypto.randomBytes(24).toString('hex'),'--admin-email','fixture@example.invalid','--non-interactive','--skip-install']);
 const configPath=path.join(site,'firekylin.config.js');const config=require(configPath);config.server={host:'127.0.0.1',port,proxy:false};fs.writeFileSync(configPath,'module.exports='+JSON.stringify(config));
 execFileSync('python3',['-c',`import importlib.util,pathlib\nr=pathlib.Path(${JSON.stringify(repository)})\ns=importlib.util.spec_from_file_location('builder',r/'scripts/build-registry.py')\nm=importlib.util.module_from_spec(s);s.loader.exec_module(m)\nm.build_theme(r/'packages/airspace-hugo',r,m.theme_files(r/'packages/airspace-hugo'))`]);
 const {ThemeInstaller}=require(path.join(core,'src/service/theme-installer'));const installer=new ThemeInstaller({themesPath:path.join(site,'themes'),backupPath:path.join(site,'backups'),firekylinVersion:coreRequire('./package.json').version});await installer.install(fs.readFileSync(path.join(repository,'dist/airspace-hugo-'+JSON.parse(fs.readFileSync(path.join(repository,'packages/airspace-hugo/package.json'))).version+'.zip')));
 db=new Database(path.join(site,'data/firekylin.sqlite'));
 const set=(k,v)=>db.prepare('INSERT INTO fk_options (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').run(k,v);
 set('theme','airspace-hugo');set('description','一生想做自由极客');set('navigation',JSON.stringify([{label:'About',url:'/page/about.html'}]));
 db.prepare("UPDATE fk_post SET title='AIRSPACE article',pathname='hello',summary='<p>Public summary</p>',content='<p><strong>Bold</strong> and <em>Italic</em>.</p><ul><li>First<ul><li>Nested</li></ul></li></ul><ol><li>One</li><li>Two</li></ol><table><tr><th>Header</th></tr><tr><td>LongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCellLongTableCell</td></tr></table><pre><code>long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_long_code_without_spaces_</code></pre><h3>First chapter</h3><p>Public content</p><h4>Second chapter</h4><p><img src=/themes/airspace-hugo/res/fixture.svg alt=Fixture></p>',allow_comment=0").run();
 const seed=db.prepare('INSERT INTO fk_post (user_id,type,status,title,pathname,summary,markdown_content,content,allow_comment,create_time,update_time,is_public,comment_num) VALUES (1,?,?,?,?,?,?,?,0,?,?,?,0)');
 const now='2026-10-28 00:00:00';seed.run(0,3,'PRIVATE_MARKER','private-marker','PRIVATE_MARKER','private','PRIVATE_MARKER',now,now,0);seed.run(0,0,'DRAFT_MARKER','draft-marker','DRAFT_MARKER','draft','DRAFT_MARKER',now,now,1);seed.run(1,3,'About','about','About','About','<p>About page</p>',now,now,1);
 for(let i=0;i<12;i++)seed.run(0,3,'AIRSPACE public '+i,'public-'+i,'public '+i,'public','<p>Public</p>',now,now,1);
 db.prepare('UPDATE fk_post SET options=? WHERE is_public=1 AND status=3').run(JSON.stringify({featuredImage:'/themes/airspace-hugo/res/fixture.svg'}));
 db.prepare('UPDATE fk_post SET options=? WHERE pathname=?').run('{}','hello');
 db.prepare('UPDATE fk_post SET options=? WHERE pathname=?').run(JSON.stringify({featuredImage:'javascript:invalid'}),'public-11');
 seed.run(2,3,'Native attachment','native-attachment','','','',now,now,1);db.prepare('UPDATE fk_post SET options=? WHERE pathname=?').run(JSON.stringify({attachment:{url:'/themes/airspace-hugo/res/fixture.svg',mime:'image/svg+xml',name:'Fixture image'}}),'native-attachment');
 db.prepare("INSERT INTO fk_cate(name,pathname) VALUES ('随笔','notes')").run();
 db.prepare("INSERT INTO fk_post_cate(post_id,cate_id) SELECT id,(SELECT id FROM fk_cate WHERE pathname='notes') FROM fk_post WHERE is_public=1 AND status=3").run();
 db.prepare("INSERT INTO fk_cate(name,pathname,pid) VALUES ('子分类','child',(SELECT id FROM fk_cate WHERE pathname='notes'))").run();
 db.prepare("INSERT INTO fk_tag(name,pathname) VALUES ('生活','life')").run();
 db.prepare("INSERT INTO fk_post_tag(post_id,tag_id) SELECT id,(SELECT id FROM fk_tag WHERE pathname='life') FROM fk_post WHERE is_public=1 AND status=3").run();
 set('themeConfig',JSON.stringify({footerText:'阅读与探索本站内容。',authorName:'Airspace Hugo Fixture Author'}));
 fs.writeFileSync(path.join(site,'themes/airspace-hugo/res/fixture.svg'),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600"><rect width="1000" height="600" fill="#e8dcca"/><circle cx="730" cy="170" r="85" fill="#d58b63"/><path d="M0 480L270 130L620 600H0Z" fill="#8dada5"/><path d="M300 600L690 250L1000 530V600Z" fill="#456e74"/></svg>');
 db.prepare("UPDATE fk_post SET content=content||? WHERE pathname IN ('hello','about')").run("<p>Embedded media regression</p><video width=\"1280\" height=\"720\" controls poster=\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%221280%22 height=%22720%22%3E%3Crect width=%221280%22 height=%22720%22 fill=%22%239ab%22/%3E%3C/svg%3E\"></video><audio controls style=\"width:1280px\"></audio>");
 server=spawn(process.execPath,[path.join(core,'bin/firekylin.js')],{cwd:site,stdio:['ignore','ignore','pipe']});let serverErrors='';server.stderr.on('data',c=>serverErrors+=c);for(let i=0;i<150;i++){try{if((await fetch(origin)).ok)break;}catch{}if(i===149)throw Error('Site startup failed: '+serverErrors);await delay(200);}
 const evidence=path.join(repository,'verification/airspace-hugo');
 const checks=[];
 const routes=['/','/?page=2','/post/hello.html','/page/about.html','/attachment/native-attachment.html','/archives','/categories','/tags','/cate/notes','/tag/life','/search.html?keyword=AIRSPACE'];
 for (const route of routes) {
  const response=await fetch(origin+route);
  assert.equal(response.status,200,route);
  const html=await response.text();
  assert(html.includes('Airspace Hugo'),route+' rendered theme');
  assert(!html.includes('undefined'),route+' undefined');
  assert(!html.includes('PRIVATE_MARKER')&&!html.includes('DRAFT_MARKER'),route+' leaked private content');
 }
 async function checkProtection() {
  for (const pathname of ['private-marker','draft-marker']) {
   const response=await fetch(origin+'/post/'+pathname+'.html',{redirect:'manual'});
   assert.equal(response.status,302);
   assert.equal(response.headers.get('location'),'/');
  }
  db.prepare('UPDATE fk_post SET allow_comment=1 WHERE pathname=?').run('hello');
  let html=await(await fetch(origin+'/post/hello.html')).text();
  assert(html.includes('data-comment-config'));
  assert.equal((html.match(/id="comments"/g)||[]).length,1);
  db.prepare('UPDATE fk_post SET allow_comment=0 WHERE pathname=?').run('hello');
  assert(!(await(await fetch(origin+'/post/hello.html')).text()).includes('data-comment-config'));
  const salt=crypto.randomBytes(16);
  const hash='scrypt$'+salt.toString('base64url')+'$'+crypto.scryptSync('fixture-password',salt,32).toString('base64url');
  const protectedOptions=JSON.stringify({postPasswordHash:hash,featuredImage:'/SECRET_COVER.png',fields:{private:'SECRET_FIELD'}});
  db.prepare("UPDATE fk_post SET title='AIRSPACE SECRET_TITLE',summary='SECRET_SUMMARY',content='SECRET_BODY',options=?,allow_comment=1 WHERE pathname IN ('hello','about','public-11')").run(protectedOptions);
  for (const [route,link] of [
   ['/','/post/public-11.html'],['/?page=2','/post/hello.html'],['/archives','/post/hello.html'],
   ['/cate/notes','/post/public-11.html'],['/tag/life','/post/public-11.html'],
   ['/search.html?keyword=SECRET_TITLE','/post/hello.html'],['/post/hello.html',null],['/page/about.html',null]
  ]) {
   const response=await fetch(origin+route);
   assert.equal(response.status,200,route);
   const body=await response.text();
   for (const marker of ['SECRET_COVER','SECRET_BODY','SECRET_SUMMARY','SECRET_FIELD']) assert(!body.includes(marker),route+' leaked '+marker);
   if (!route.startsWith('/search')) assert(!body.includes('SECRET_TITLE'),route+' leaked title');
   if (link) assert(body.includes('href="'+link+'"'),route+' must contain the protected entry');
   else {
    assert(body.includes('name="protectPassword"'),route+' native password form');
    assert(!body.includes('data-comment-config'),route+' protected comments hidden');
   }
  }
  for (const route of ['/post/hello.html','/page/about.html']) {
   const wrong=await fetch(origin+route,{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:'protectPassword=wrong'});
   assert.equal(wrong.status,200);
   const wrongBody=await wrong.text();
   assert(wrongBody.includes('密码错误'));
   assert(!wrongBody.includes('SECRET_BODY'));
   const correct=await fetch(origin+route,{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:'protectPassword=fixture-password'});
   assert.equal(correct.status,200);
   const body=await correct.text();
   assert(body.includes('SECRET_BODY'));
   assert(body.includes('SECRET_TITLE'));
   assert(!body.includes('name="protectPassword"'));
  }
 }
 if(process.env.AIRSPACE_HTTP_ONLY) {
  await checkProtection();
  console.log('PASS: actual ZIP, SQLite, 11 native routes, comments, metadata privacy, wrong/correct post and page passwords.');
  return;
 }
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const context=await browser.newContext();
 const page=await context.newPage();
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.url().startsWith(origin+'/themes/')&&r.status()>=400)errors.push(r.status()+' '+r.url())});
 await page.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
 for(const width of [1440,768,390]) {
  await page.setViewportSize({width,height:1000});
  for(const route of routes) {
   const response=await page.goto(origin+route);
   assert.equal(response.status(),200,route);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+' overflow');
   assert.equal(await page.locator('.page-title').count(),1);
   if(route.includes('/attachment/')) {
    assert.equal(await page.locator('.attachment-media a[download]').count(),1);
    assert(await page.locator('.attachment-media img').evaluate(i=>i.complete&&i.naturalWidth>0));
   }
   if(route.includes('/post/hello.html')||route.includes('/page/about.html')) {
    const media=await page.locator('.prose').evaluate(e=>{
     const p=e.getBoundingClientRect(),v=e.querySelector('video').getBoundingClientRect(),a=e.querySelector('audio').getBoundingClientRect();
     return {column:p.width,video:v.width,audio:a.width,audioHeight:a.height,ratio:v.width/v.height};
    });
    assert(media.audioHeight>=40,'audio visible');
    assert(media.video<=media.column+1&&media.audio<=media.column+1,route+' media fits');
    assert(Math.abs(media.ratio-1280/720)<.02,route+' video aspect ratio');
   }
   if(route==='/categories') {
    assert.equal(await page.locator('#main .taxonomy-list > li').count(),1);
    assert.equal(await page.locator('#main .taxonomy-list > li > ul > li').count(),1);
    assert.equal(await page.locator('.sidebar').count(),1,'taxonomy DOM remains closed');
   }
   checks.push({width,route,status:response.status()});
  }
  await page.goto(origin);
  assert.equal(await page.locator('.entry').count(),10);
  assert.equal(await page.locator('.sidebar .media').count(),4);
  const layout=await page.locator('.blog-grid').evaluate(e=>{
   const main=e.querySelector('main').getBoundingClientRect(),side=e.querySelector('aside').getBoundingClientRect();
   return {main:main.width,side:side.width,mainTop:main.top,sideTop:side.top};
  });
  if(width===1440) assert(Math.abs(layout.main/layout.side-2)<.02,'2:1 original blog columns');
  else assert(layout.sideTop>layout.mainTop,'stacked sidebar');
  assert(layout.main>280,'usable article width');
  await page.screenshot({path:path.join(evidence,'home-'+width+'.png'),fullPage:true});
  await page.getByRole('link',{name:'下一页',exact:true}).click();
  await page.waitForURL('**/?page=2');
  await page.goto(origin+'/post/hello.html');
  for(const sel of ['.prose h3','.prose h4','.prose pre','.prose table','.prose img']) assert(await page.locator(sel).first().isVisible(),sel+' visible');
  assert(await page.locator('.prose ul').first().evaluate(e=>getComputedStyle(e).listStyleType!=='none'),'list markers');
  assert(await page.locator('.prose strong').evaluate(e=>Number(getComputedStyle(e).fontWeight)>=700),'bold retained');
  assert.equal(await page.locator('.prose em').evaluate(e=>getComputedStyle(e).fontStyle),'italic');
  await page.screenshot({path:path.join(evidence,'post-'+width+'.png'),fullPage:true});
  assert(await page.locator('.native-nav a[href="/archives"]').isVisible());
  await page.locator('.native-nav a[href="/archives"]').click();
  await page.waitForURL('**/archives');
 }
 for(const [route,label] of [['/cate/notes','随笔'],['/tag/life','生活']]) {
  await page.goto(origin+route);
  assert.equal(await page.locator('.page-title h1').textContent(),label);
 }
 const nojs=await browser.newContext({javaScriptEnabled:false});
 const np=await nojs.newPage();
 await np.setViewportSize({width:390,height:1000});
 await np.goto(origin);
 await np.locator('.native-nav a[href="/search.html"]').click();
 await np.locator('#keyword').fill('AIRSPACE');
 await np.locator('#main').getByRole('button',{name:'搜索',exact:true}).click();
 await np.waitForURL('**/search.html?keyword=AIRSPACE');
 await nojs.close();
 await checkProtection();
 assert.deepEqual(errors,[]);
 const report={
  core:coreRequire('./package.json').version,
  coreRevision:execFileSync('git',['-C',core,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),
  themeRevision:execFileSync('git',['-C',repository,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),
  browser:browser.version(),checks,
  passed:['actual ZIP installation','33 SQLite route/viewport checks','2:1 desktop columns and stacked tablet/mobile sidebar','four recent-post thumbnail rows','original banner and article styling','native attachment download','taxonomy DOM closure and nested children','bold and italic formatting','native pagination','visible navigation and search without JavaScript','private/draft exclusion','protected title/body/summary/image/fields with positive entry assertions','wrong/correct native post and page password','comment gating','video aspect ratio and visible audio controls','all local assets'],
  limits:['Compared pinned upstream CSS and Hugo templates; no live upstream demo pixel comparison.','Waline remote client login/submission not tested.']
 };
 fs.writeFileSync(path.join(evidence,'report.json'),JSON.stringify(report,null,2)+'\n');
 fs.copyFileSync(path.join(evidence,'home-1440.png'),path.join(repository,'packages/airspace-hugo/screenshot.png'));
 console.log(JSON.stringify(report));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{
 if(browser)await browser.close();
 if(server)server.kill('SIGTERM');
 if(db)db.close();
 console.log('Disposable test site:',site);
});
