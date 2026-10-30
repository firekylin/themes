'use strict';
// Creates a disposable local SQLite site; never points at a user-provided database.
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),crypto=require('node:crypto');
const {spawn,execFileSync}=require('node:child_process');const {createRequire}=require('node:module');const assert=require('node:assert/strict');
const core=process.env.FIREKYLIN_CHECKOUT;if(!core)throw Error('Set FIREKYLIN_CHECKOUT');
const coreRequire=createRequire(path.join(core,'package.json'));const adapterRequire=createRequire(coreRequire.resolve('think-model-sqlite'));const Database=adapterRequire('better-sqlite3');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const repository=path.resolve(__dirname,'../..');const site=fs.mkdtempSync(path.join(os.tmpdir(),'susty-site-'));const port=Number(process.env.SUSTY_TEST_PORT)||8844;const origin='http://127.0.0.1:'+port;
let server,browser,db;const delay=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 await require(path.join(core,'lib/cli')).run(['new',site,'--db-type','sqlite','--db-path','data/firekylin.sqlite','--site-title','SUSTY 测试博客','--site-url',origin,'--admin-user','fixture-admin','--admin-password',crypto.randomBytes(24).toString('hex'),'--admin-email','fixture@example.invalid','--non-interactive','--skip-install']);
 const configPath=path.join(site,'firekylin.config.js');const config=require(configPath);config.server={host:'127.0.0.1',port,proxy:false};fs.writeFileSync(configPath,'module.exports='+JSON.stringify(config));
 execFileSync('python3',['-c',`import importlib.util,pathlib\nr=pathlib.Path(${JSON.stringify(repository)})\ns=importlib.util.spec_from_file_location('builder',r/'scripts/build-registry.py')\nm=importlib.util.module_from_spec(s);s.loader.exec_module(m)\nm.build_theme(r/'packages/susty',r,m.theme_files(r/'packages/susty'))`]);
 const {ThemeInstaller}=require(path.join(core,'src/service/theme-installer'));const installer=new ThemeInstaller({themesPath:path.join(site,'themes'),backupPath:path.join(site,'backups'),firekylinVersion:coreRequire('./package.json').version});await installer.install(fs.readFileSync(path.join(repository,'dist/susty-'+JSON.parse(fs.readFileSync(path.join(repository,'packages/susty/package.json'))).version+'.zip')));
 db=new Database(path.join(site,'data/firekylin.sqlite'));
 const set=(k,v)=>db.prepare('INSERT INTO fk_options (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').run(k,v);
 set('theme','susty');set('description','一生想做自由极客');set('navigation',JSON.stringify([{label:'About',url:'/page/about.html'}]));
 db.prepare("UPDATE fk_post SET title='SUSTY article',pathname='hello',summary='<p>Public summary</p>',content='<h3>First chapter</h3><p>Public content</p><h4>Second chapter</h4><p><img src=/themes/susty/res/fixture.svg alt=Fixture></p>',allow_comment=0").run();
 const seed=db.prepare('INSERT INTO fk_post (user_id,type,status,title,pathname,summary,markdown_content,content,allow_comment,create_time,update_time,is_public,comment_num) VALUES (1,?,?,?,?,?,?,?,0,?,?,?,0)');
 const now='2026-10-28 00:00:00';seed.run(0,3,'PRIVATE_MARKER','private-marker','PRIVATE_MARKER','private','PRIVATE_MARKER',now,now,0);seed.run(0,0,'DRAFT_MARKER','draft-marker','DRAFT_MARKER','draft','DRAFT_MARKER',now,now,1);seed.run(1,3,'About','about','About','About','<p>About page</p>',now,now,1);
 for(let i=0;i<12;i++)seed.run(0,3,'SUSTY public '+i,'public-'+i,'public '+i,'public','<p>Public</p>',now,now,1);
 db.prepare('UPDATE fk_post SET options=? WHERE is_public=1 AND status=3').run(JSON.stringify({featuredImage:'/themes/susty/res/fixture.svg'}));
 db.prepare("INSERT INTO fk_cate(name,pathname) VALUES ('随笔','notes')").run();
 db.prepare("INSERT INTO fk_post_cate(post_id,cate_id) SELECT id,(SELECT id FROM fk_cate WHERE pathname='notes') FROM fk_post WHERE is_public=1 AND status=3").run();
 db.prepare("INSERT INTO fk_tag(name,pathname) VALUES ('生活','life')").run();
 db.prepare("INSERT INTO fk_post_tag(post_id,tag_id) SELECT id,(SELECT id FROM fk_tag WHERE pathname='life') FROM fk_post WHERE is_public=1 AND status=3").run();
 set('themeConfig',JSON.stringify({footerText:'阅读与探索本站内容。'}));
 fs.writeFileSync(path.join(site,'themes/susty/res/fixture.svg'),'<svg xmlns="http://www.w3.org/2000/svg" width="500" height="300"><rect width="500" height="300" fill="#ccbb99"/></svg>');
 server=spawn(process.execPath,[path.join(core,'bin/firekylin.js')],{cwd:site,stdio:['ignore','ignore','pipe']});let serverErrors='';server.stderr.on('data',c=>serverErrors+=c);for(let i=0;i<150;i++){try{if((await fetch(origin)).ok)break;}catch{}if(i===149)throw Error('Site startup failed: '+serverErrors);await delay(200);}
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const context=await browser.newContext();const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
 const evidence=path.join(repository,'verification/susty');fs.mkdirSync(evidence,{recursive:true});const checks=[];
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:1000});
  for(const route of ['/','/?page=2','/post/hello.html','/page/about.html','/archives','/categories','/tags','/search.html?keyword=SUSTY']){
   const response=await page.goto(origin+route);assert.equal(response.status(),200,route);
   const html=await page.content();assert(!html.includes('undefined'),route+' contains undefined');assert(!html.includes('PRIVATE_MARKER')&&!html.includes('DRAFT_MARKER'),route+' leaked content');
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+' overflow');checks.push({width,route,status:response.status()});
  }
  await page.goto(origin);assert.equal(await page.locator('.entry').count(),10);await page.evaluate(()=>Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{}))));await page.screenshot({path:path.join(evidence,'home-'+width+'.png'),fullPage:true});
  await page.getByRole('link',{name:'下一页',exact:true}).click();await page.waitForURL('**/?page=2');
  await page.goto(origin+'/post/hello.html');await page.screenshot({path:path.join(evidence,'post-'+width+'.png'),fullPage:true});await page.locator('.menu-open').click();assert(await page.locator('#site-navigation').isVisible());assert(!(await page.locator('#main').isVisible()));await page.locator('.menu-close').click();assert(await page.locator('#main').isVisible());

 }
 for(const pathname of ['private-marker','draft-marker']){const denied=await fetch(origin+'/post/'+pathname+'.html',{redirect:'manual'});assert.equal(denied.status,302);assert.equal(denied.headers.get('location'),'/');}
 db.prepare('UPDATE fk_post SET allow_comment=1 WHERE pathname=?').run('hello');let html=await(await fetch(origin+'/post/hello.html')).text();assert(html.includes('data-comment-config'));assert.equal((html.match(/id="comments"/g)||[]).length,1);
 db.prepare('UPDATE fk_post SET allow_comment=0 WHERE pathname=?').run('hello');assert(!(await(await fetch(origin+'/post/hello.html')).text()).includes('data-comment-config'));
 const nojs=await browser.newContext({javaScriptEnabled:false});const np=await nojs.newPage();await np.goto(origin);await np.locator('.menu-open').click();await np.locator('#site-navigation a[href="/search.html"]').click();await np.locator('#keyword').fill('SUSTY');await np.locator('#main').getByRole('button',{name:'搜索',exact:true}).click();await np.waitForURL('**/search.html?keyword=SUSTY');await nojs.close();
 assert.deepEqual(errors,[]);const report={core:coreRequire('./package.json').version,coreRevision:execFileSync('git',['-C',core,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),browser:browser.version(),checks,passed:['actual ZIP installation','16 real SQLite routes','native article pagination','CSS menu open/close without JavaScript','responsive header navigation','search without JavaScript','private/draft exclusion','comment gating'],limits:['Upstream PHP and JavaScript were not executed. Original comparison is source based; upstream screenshot is blank and demo/GIF inaccessible.','Waline remote client login/submission not tested.']};fs.writeFileSync(path.join(evidence,'report.json'),JSON.stringify(report,null,2)+'\n');fs.copyFileSync(path.join(evidence,'home-1440.png'),path.join(repository,'packages/susty/screenshot.png'));console.log(JSON.stringify(report));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();if(server)server.kill('SIGTERM');if(db)db.close();console.log('Disposable test site:',site)});
