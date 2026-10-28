'use strict';
// Synthetic public Widget data. Set FIREKYLIN_CORE_PATH to verify the same
// templates with core Widget classes rather than the small contract fixture.
const path = require('node:path');
const {Eta} = require('eta');
const fs = require('node:fs');
const packages = path.join(__dirname, '..', 'packages');
const themes = fs.readdirSync(packages).filter(name =>
  fs.existsSync(path.join(packages, name, 'res/css/upstream.css')) &&
  (!process.env.PORT_THEME || process.env.PORT_THEME === name));
if (!themes.length) throw new Error('No upstream-style theme packages found');
const pages = ['index', 'post', 'page', 'attachment', 'search', 'archive', 'cate', 'tag'];
const rows = Array.from({length: 6}, (_, i) => ({
  id: i + 1, pathname: `article-${i + 1}`, type: 0,
  title: ['山间来信 · Letters from the mountains', '让文字回到阅读本身', 'A small notebook of everyday things', '城市漫步与一些想法', '代码、设计与生活', '把时间留给值得的事'][i],
  summary: '<p>在忙碌的日常中，留一点时间记录观察与思考。A quiet place for words, ideas and stories.</p>',
  content: '<p>在忙碌的日常中，留一点时间记录观察与思考。</p><h2>阅读与记录</h2><p>A quiet place for words, ideas and stories.</p><pre><code>const greeting = "Hello, Firekylin";</code></pre>',
  create_time: '2026-10-28 10:00:00', comment_num:3, update_time:'2026-10-29 10:00:00', allow_comment: 1, status: 3, is_public: 1,
  user: {name: 'writer', display_name: 'Writer'}, cate: [{name:'随笔', pathname:'notes'}], tag: [], options: {},
}));
class FixtureWidget {
  constructor(items = []) {this.stack = items; this.row = {}; this.sequence = 0;}
  next() {if (this.sequence < this.stack.length) return (this.row = this.stack[this.sequence++]); this.sequence = 0; this.row = {}; return false;}
  have() {return this.stack.length > 0;}
  title() {return this.row.title || this.row.name;}
  content() {return this.row.content;}
  date() {return '2026-10-28';}
  author() {return this.row.user?.display_name || '';}
  excerpt(n) {return this.row.summary.replace(/<[^>]*>/g, '').slice(0, n);}
  get permalink() {return this.metaType ? `/${this.metaType}/${this.row.pathname}` : this.permalinkFor(this.row);}
  permalinkFor(row) {return `/${row.type === 1 ? 'page' : 'post'}/${row.pathname}.html`;}
  is(type) {return type === this.kind;}
  pageUrl(page) {const u = new URL(this.request, 'https://example.test'); u.searchParams.set('page', page); return u.pathname + u.search;}
}
function context(theme, page, opts = {}) {
  const core = process.env.FIREKYLIN_CORE_PATH;
  const request = opts.request || (page === 'search' ? '/search.html?keyword=reading' : '/');
  const selected = opts.empty ? [] : structuredClone(rows);
  if(opts.noCategories) selected.forEach(row=>{delete row.cate;delete row.comment_num;});
  if (opts.hostile && selected.length) {
    selected[0].title = '<img src=x onerror=alert(1)>';
    selected[0].cate = [{name:'<script>bad()</script>', pathname:'notes'}];
    selected[0].featuredImage = 'javascript:alert(1)';
  }
  if(opts.neighbors && selected.length)selected[0].prev={title:'Previous article',pathname:'previous',type:0};
  if (opts.long && selected.length) selected[0].title = 'LongUnbrokenTitle'.repeat(15);
  if (opts.protected && selected.length) selected[0].content = '<form method="post"><label>Password<input name="protectPassword" type="password"></label><button>解锁</button></form>';
  const detail = ['post','page','attachment'].includes(page);
  const items = detail ? selected.slice(0,1) : selected;
  if (detail && items.length) items[0].type = page === 'page' ? 1 : page === 'attachment' ? 2 : 0;
  let archive, recent, categories, tags;
  if (core) {
    global.think = {datetime: () => '2026-10-28', Service: class {}};
    const controller = {ctx:{path:request.split('?')[0],query:Object.fromEntries(new URL(request,'https://example.test').searchParams)},options:{}, get:key => ({cate:opts.kind === 'cate' ? 'notes' : undefined,tag:opts.kind === 'tag' ? 'notes' : undefined,name:opts.kind === 'author' ? 'writer' : undefined})[key]};
    function instance(file, data, parameters) {const Class = require(path.join(core, 'src/widget',file)); const w = new Class(controller,parameters); w.pushAll(data); return w;}
    archive = instance('archive', items, {type:page});
    recent = instance('base/contents', selected.slice(0,5));
    categories = instance('metas/category/list', opts.empty ? [] : [{name:'随笔',pathname:'notes',count:6,children:[{name:'子分类',pathname:'child',count:1}]}]);
    tags = instance('metas/tag/cloud', opts.empty ? [] : [{name:'生活',pathname:'life',count:2}]);
  } else {
    archive = new FixtureWidget(items); archive.kind = opts.kind || page; archive.request = request;
    recent = new FixtureWidget(selected.slice(0,5));
    categories = new FixtureWidget(opts.empty ? [] : [{name:'随笔',pathname:'notes',count:6,children:[{name:'子分类',pathname:'child',count:1}]}]); categories.metaType = 'cate';
    tags = new FixtureWidget(opts.empty ? [] : [{name:'生活',pathname:'life',count:2}]); tags.metaType = 'tag';
  }
  archive.pagination = page === 'search' && opts.noKeyword ? null : {currentPage:opts.currentPage || 1,totalPages:3,count:selected.length};
  archive.keyword = opts.noKeyword ? '' : new URL(request,'https://example.test').searchParams.get('keyword') || '';
  archive.archiveTitle = opts.kind === 'cate' ? '随笔' : opts.kind === 'tag' ? '生活' : '';
  archive.grouped = opts.empty ? {} : {'2026-10':selected};
  const site = {title:() => '纸上时光',description:() => '记录生活，分享想法 · Notes on a slower life',siteUrl:'https://example.test',themeConfig:opts.config || {},navigation:[{url:'/',label:'首页'},{url:'/archives',label:'归档'},{url:'/categories',label:'分类'},{url:'/page/about.html',label:'关于'}],themeUrl:file => `/${opts.legacy ? 'theme' : 'themes'}/${theme}/${file}`};
  let comment = () => opts.comments === false ? '' : '<section id="comments">评论由 Firekylin Waline 提供</section>';
  if (core) {
    if (archive.stack[0] && opts.comments === false) archive.stack[0].allow_comment = 0;
    const Renderer = require(path.join(core,'src/service/comment-render'));
    const controller = {archive,options:{siteUrl:site.siteUrl,comment:{forceLogin:opts.forceLogin,locale:'zh-CN'}},get:()=>undefined};
    comment = options => new Renderer().render(controller,options);
  }
  return {widget:async name => ({Widget_Options:site,Widget_Archive:archive,Widget_Contents_Post_Recent:recent,Widget_Metas_Category_List:categories,Widget_Metas_Tag_Cloud:tags})[name],comment};
}
async function render(theme,page,opts) {return new Eta({views:path.join(__dirname,'..','packages',theme),varName:'firekylin'}).renderAsync(page,context(theme,page,opts));}
module.exports = {themes,pages,render,context};
