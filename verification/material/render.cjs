const fs=require('fs'),path=require('path'),http=require('http');
const core=process.env.FIREKYLIN_CHECKOUT; if(!core) throw Error('Set FIREKYLIN_CHECKOUT to a Firekylin checkout with dependencies installed');
const {createRequire}=require('module');const coreRequire=createRequire(path.join(core,'package.json')); const adapterRequire=createRequire(coreRequire.resolve('think-view-eta'));const {Eta}=adapterRequire('eta');
const Archive=require(path.join(core,'src/widget/archive'));
global.think={datetime:()=> '2026-10-28',isEmpty:v=>!v || Object.keys(v).length===0};
const root=process.env.THEME_PATH || path.resolve(__dirname,'../../packages/material');
const eta=new Eta({views:root,varName:'firekylin'});
const rows=[{title:'Material 的第一篇文章',pathname:'hello',summary:'保留原主题的卡片、布局和导航。This is a long bilingual article excerpt.',content:'<h2>文章内容</h2><p>这是文章内容与正常的 <a href="/">链接</a>。</p><pre><code>const theme = "Material";</code></pre>',create_time:'2026-10-28',user:{display_name:'测试作者'},cate:[{name:'设计',pathname:'design'}],tag:[],allow_comment:0}];
const site={title:()=> 'Material 测试博客',description:()=> '一生想做自由极客',themeConfig:{},navigation:[{label:'关于',url:'/page/about.html'}],themeUrl:p=>'/theme/material/'+p};
async function render(file,params={}){
 const controller={ctx:{path:params.path||'/',query:params},get:k=>params[k],options:{}};
 const a=new Archive(controller,{type:file==='index'?'index':file});a.pagination={currentPage:1,totalPages:2,count:params.empty?0:3};a.keyword=params.keyword||'';a.archiveTitle='设计';a.grouped={'2026-10':rows};a.pushAll(params.empty?[]:rows);
 const meta=new (require(path.join(core,'src/widget/base')))(controller);meta.push({name:'设计',pathname:'design',count:1});
 const data={widget:async name=>name==='Widget_Options'?site:name.startsWith('Widget_Metas')?meta:a,comment:()=>'',ctx:controller.ctx};
 return eta.renderAsync(file,data);
}
(async()=>{
 const dir=path.resolve(process.env.EVIDENCE_DIR || '/tmp/material-evidence','rendered');fs.mkdirSync(dir,{recursive:true});
 for(const file of ['index','post','page','search','archive','cate','tag'])fs.writeFileSync(path.join(dir,file+'.html'),await render(file));
 fs.writeFileSync(path.join(dir,'empty.html'),await render('search',{keyword:'missing',empty:true}));
 fs.writeFileSync(path.join(dir,'category.html'),await render('index',{cate:'design'}));
 const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');if(url.pathname.startsWith('/theme/material/')){const name=path.join(root,url.pathname.slice('/theme/material/'.length));if(!name.startsWith(root+'/'))throw Error('invalid');res.setHeader('Content-Type',name.endsWith('.css')?'text/css':'text/javascript');res.end(fs.readFileSync(name));return;}const file=url.pathname==='/search.html'?'search':url.pathname.startsWith('/post/')?'post':url.pathname.startsWith('/page/')?'page':url.pathname==='/archives'?'archive':url.pathname==='/categories'?'cate':url.pathname==='/tags'?'tag':'index';res.setHeader('Content-Type','text/html');res.end(await render(file,Object.fromEntries(url.searchParams)));}catch(e){res.statusCode=500;res.end(e.stack)}});server.listen(8765,'127.0.0.1',()=>console.log('Fixture rendering server on 8765'));
})();
