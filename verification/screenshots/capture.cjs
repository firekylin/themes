'use strict';
// Real disposable Firekylin/SQLite site. No production database or mocked Widgets.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const {spawn, execFileSync} = require('node:child_process');
const {createRequire} = require('node:module');
const {chromium} = require('playwright-core');
const root = path.resolve(__dirname, '../..');
const core = process.env.FIREKYLIN_CHECKOUT;
if (!core) throw Error('Set FIREKYLIN_CHECKOUT to a Firekylin 2.16.0 checkout with dependencies installed');
const cr = createRequire(path.join(core, 'package.json'));
const Database = createRequire(cr.resolve('think-model-sqlite'))('better-sqlite3');
const {ThemeInstaller} = require(path.join(core, 'src/service/theme-installer'));
const themes = ['aquila','diaspora','g','green-park-2','kratos','matcha','material','nexmoe','oneblog','paul','puock','svbtle'];
const site = fs.mkdtempSync(path.join(os.tmpdir(), 'theme-screenshots-'));
let origin = 'http://127.0.0.1:8795';
async function freePort(){const srv=require('node:net').createServer();await new Promise(r=>srv.listen(0,'127.0.0.1',r));const port=srv.address().port;await new Promise(r=>srv.close(r));return port;}
const image = name => `/uploads/preview/${name}.svg`;
const settings = {
  aquila: {colorMode:'light'},
  diaspora: {colorMode:'light',coverImage:image('mountains')},
  g: {articleStyle:'0',profileAvatar:image('avatar'),profileBG:image('forest'),profileDes:'记录设计、代码与日常的片刻。',autoNightMode:'0'},
  'green-park-2': {colorMode:'light',feedStyle:'excerpt'},
  kratos: {colorMode:'light',coverImage:image('mountains'),avatarUrl:image('avatar'),profileCover:image('forest'),profileName:'林间来信'},
  matcha: {DarkMode:'no'},
  material: {dailypic:image('mountains'),avatarURL:image('avatar'),slogan:'把生活写成一封长信',langis:'1'},
  nexmoe: {logoUrl:image('avatar'),background:image('mountains')},
  oneblog: {AutoNightMode:'off'},
  paul: {avatar:image('avatar'),profileName:'林间来信',quotes:'保持好奇，慢慢记录。\n在日常里发现新的风景。',projects:JSON.stringify([{title:'山间笔记',url:'/page/about.html',description:'关于阅读、设计与行走的记录。'}])},
  puock: {colorMode:'light',avatarUrl:image('avatar'),profileCover:image('forest'),profileName:'林间来信'},
  svbtle: {colorMode:'light',feedStyle:'excerpt',username:'设计 · 代码 · 生活'}
};
const posts = [
 ['山间来信：把日常写成一段风景','mountains','清晨的薄雾从山谷升起，远处的树影逐渐清晰。带着一本笔记出门，在熟悉的道路上重新观察世界。'],
 ['给阅读留一点安静的时间','forest','翻开一本书，也是在为自己留下一段不被打断的时间。关于纸张、段落与阅读习惯的几则小记。'],
 ['沿着海岸，慢慢走','sea','海风把潮水的声音带到窗边。我们沿着海岸散步，记录天色与街角的变化，也记录旅途里偶然的相遇。'],
 ['设计笔记：清晰比热闹更重要','city','从间距、文字到导航，界面的每一个小决定都在影响阅读。让内容回到中心，让设计自然发生。'],
 ['一间小屋和周末计划','forest','整理书桌，煮一杯咖啡，写几行代码。普通的周末，也有值得留存的细节。'],
 ['让代码成为表达的工具','city','把一个简单的想法变成可以运行的页面。从第一行代码开始，在不断尝试中找到自己的节奏。']
];
let db, server, browser;
const sleep = ms => new Promise(r=>setTimeout(r,ms));
async function stop() {
 if(!server)return;
 const child=server;server=null;
 const closed=new Promise(r=>child.once('exit',r));
 try{process.kill(-child.pid,'SIGTERM')}catch{}
 if(child.exitCode===null&&child.signalCode===null)await Promise.race([closed,sleep(2000)]);
 try{process.kill(-child.pid,'SIGKILL')}catch{}
}
(async()=>{
 await require(path.join(core,'lib/cli')).run(['new',site,'--db-type','sqlite','--db-path','data/firekylin.sqlite','--site-title','纸上时光','--site-url',origin,'--admin-user','preview-admin','--admin-password',crypto.randomBytes(32).toString('hex'),'--admin-email','preview@example.invalid','--non-interactive','--skip-install']);
 const configPath=path.join(site,'firekylin.config.js');const config=require(configPath);
 config.server={host:'127.0.0.1',port:8795,proxy:false};fs.writeFileSync(configPath,'module.exports='+JSON.stringify(config));
 const publicAssets=path.join(site,'uploads/preview');fs.mkdirSync(publicAssets,{recursive:true});fs.cpSync(path.join(__dirname,'assets'),publicAssets,{recursive:true});
 const installer=new ThemeInstaller({themesPath:path.join(site,'themes'),backupPath:path.join(site,'backups'),firekylinVersion:cr('./package.json').version});
 for(const theme of themes){
  const meta=JSON.parse(fs.readFileSync(path.join(root,'packages',theme,'package.json')));
  execFileSync('python3',['-c',`import importlib.util,pathlib\nr=pathlib.Path(${JSON.stringify(root)})\ns=importlib.util.spec_from_file_location('builder',r/'scripts/build-registry.py')\nm=importlib.util.module_from_spec(s);s.loader.exec_module(m)\nm.build_theme(r/'packages/${theme}',r,m.theme_files(r/'packages/${theme}'))`]);
  await installer.install(fs.readFileSync(path.join(root,'dist',`${theme}-${meta.version}.zip`)));
 }
 db=new Database(path.join(site,'data/firekylin.sqlite'));
 const set=(k,v)=>db.prepare('INSERT INTO fk_options (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').run(k,v);
 set('description','记录设计、代码与日常，收藏值得回看的片刻。');set('page_size','6');
 set('navigation',JSON.stringify([{label:'关于',url:'/page/about.html'}]));
 db.prepare('DELETE FROM fk_post').run();
 db.prepare("UPDATE fk_user SET display_name='林间来信'").run();
 const seed=db.prepare('INSERT INTO fk_post (user_id,type,status,title,pathname,summary,markdown_content,content,allow_comment,create_time,update_time,is_public,comment_num,options) VALUES (1,?,3,?,?,?,?,?,0,?,?,1,0,?)');
 posts.forEach(([title,cover,description],i)=>{
  const date=`2026-10-${String(28-i*2).padStart(2,'0')} 10:00:00`;
  const body=`<p>${description}</p><h2>在日常里保持好奇</h2><p>把脚步放慢一点，把目光留给眼前。这里记录的，是一些想要分享的观察与想法。</p><p><img src="${image(cover)}" alt="原创风景插画"></p>`;
  seed.run(0,title,`note-${i+1}`,`<p>${description}</p>`,description,body,date,date,JSON.stringify({featuredImage:image(cover)}));
 });
 seed.run(1,'关于这个小站','about','关于这个小站','关于这个小站','<p>这里是一个记录设计、代码与日常的示例站点。</p>','2026-10-01 10:00:00','2026-10-01 10:00:00','{}');
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const report={browserVersion:browser.version(),coreVersion:cr('./package.json').version,coreRevision:execFileSync('git',['-C',core,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),viewport:{width:1440,height:1000},fixture:'Seeded disposable SQLite site; original local SVG illustrations; no mocked Widgets or HTML overrides.',themes:[]};
 for(const theme of themes){
  await stop();const port=await freePort();origin=`http://127.0.0.1:${port}`;config.server.port=port;fs.writeFileSync(configPath,'module.exports='+JSON.stringify(config));set('site_url',origin);set('theme',theme);set('themeConfig',JSON.stringify(settings[theme]));
  server=spawn(process.execPath,[path.join(core,'bin/firekylin.js')],{cwd:site,detached:true,stdio:['ignore','ignore','pipe']});let errors='';server.stderr.on('data',c=>errors+=c);
  let started=false;for(let i=0;i<150;i++){try{if((await fetch(origin)).ok){started=true;break}}catch{}await sleep(200)}assert(started,theme+': startup failed '+errors);
  const context=await browser.newContext({viewport:report.viewport,deviceScaleFactor:1,colorScheme:'light',reducedMotion:'reduce',locale:'zh-CN',timezoneId:'UTC'});
  const page=await context.newPage();const failures=[];
  page.on('pageerror',e=>failures.push(e.message));page.on('response',r=>{if(r.status()>=400)failures.push(`${r.status()} ${r.url()}`)});
  await page.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
  assert.equal((await page.goto(origin,{waitUntil:'networkidle'})).status(),200);
  await page.evaluate(()=>document.fonts.ready);
  assert((await page.content()).includes(`/themes/${theme}/res/`),theme+': wrong active theme');
  await page.locator('main').first().waitFor({state:'attached'});
  const height=await page.evaluate(()=>document.documentElement.scrollHeight);
  for(let y=0;y<height;y+=800){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(80)}
  await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(250);
  assert((await page.content()).includes(posts[0][0]),theme+': no real post rendered');
  assert(!(await page.locator('body').innerText()).includes('undefined'),theme+': undefined content');
  const images=await page.locator('img[src]').evaluateAll(nodes=>Promise.all(nodes.map(async img=>{if(!img.complete)await img.decode().catch(()=>{});return {src:img.getAttribute('src'),width:img.naturalWidth}})));
  assert(images.every(i=>i.width>0),theme+': broken images '+JSON.stringify(images));
  assert(await page.evaluate(()=>document.styleSheets.length>0),theme+': unstyled page');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),theme+': desktop overflow');
  const screenshot=path.join(root,'packages',theme,'screenshot.png');await page.screenshot({path:screenshot,fullPage:false,animations:'disabled'});
  // Prove the actual installed-theme preview endpoint serves and decodes the image.
  fs.copyFileSync(screenshot,path.join(site,'themes',theme,'screenshot.png'));
  const previewUrl=`/themes/${theme}/screenshot.png`;assert.equal((await page.goto(origin+previewUrl)).status(),200);
  const size=await page.locator('img').evaluate(i=>({width:i.naturalWidth,height:i.naturalHeight}));assert.deepEqual(size,report.viewport);
  assert.equal((await page.goto(origin+'/post/note-1.html',{waitUntil:'networkidle'})).status(),200);
  assert((await page.locator('body').innerText()).includes(posts[0][0]));
  await page.setViewportSize({width:390,height:844});assert.equal((await page.goto(origin,{waitUntil:'networkidle'})).status(),200);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),theme+': mobile overflow');
  assert.deepEqual(failures,[],theme+': browser errors');
  report.themes.push({theme,settings:settings[theme],...size,sha256:crypto.createHash('sha256').update(fs.readFileSync(screenshot)).digest('hex'),previewUrl,homeStatus:200,postStatus:200,mobileStatus:200,browserErrors:failures});
  await context.close();console.log('CAPTURED '+theme);
 }
 assert.equal(new Set(report.themes.map(t=>t.sha256)).size,themes.length,'Duplicate captures');
 fs.writeFileSync(path.join(__dirname,'results.json'),JSON.stringify(report,null,2)+'\n');
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();await stop();if(db)db.close();console.log('Disposable site: '+site)});
