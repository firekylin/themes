'use strict';
// Local synthetic previews, never a blog/database server.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const {themes,pages,render} = require('../test/port-fixture');
function server() {
  return http.createServer(async (req,res) => {
    try {
      const url = new URL(req.url,'http://localhost');
      if(url.pathname.startsWith('/fixture/')) {res.setHeader('Content-Type','image/svg+xml');return res.end('<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500"><rect width="900" height="500" fill="#29435e"/><circle cx="690" cy="100" r="48" fill="#f8df97"/><path d="M0 420 L250 130 L420 340 L640 190 L900 400 V500 H0Z" fill="#719b99"/></svg>');}
      const asset = url.pathname.match(/^\/(?:themes|theme)\/([a-z0-9-]+)\/res\/css\/(upstream|firekylin)\.css$/);
      if(asset && themes.includes(asset[1])) {res.setHeader('Content-Type','text/css');return res.end(fs.readFileSync(path.join(__dirname,'../packages',asset[1],'res/css',asset[2]+'.css')));}
      const [theme,page='index'] = url.pathname.slice(1).split('/');
      if(!themes.includes(theme) || !pages.includes(page)) {res.statusCode=404;return res.end('Not found');}
      res.setHeader('Content-Type','text/html; charset=utf-8');
      res.end(await render(theme,page,{empty:url.searchParams.has('empty'),long:url.searchParams.has('long'),comments:false,config:{...(url.searchParams.has('dark')?{colorMode:'dark'}:{}),...(url.searchParams.has('media')?{backgroundUrl:'/fixture/cover.svg',avatarUrl:'/fixture/avatar.svg',defaultThumbnail:'/fixture/image.svg'}:{})}}));
    } catch(error) {res.statusCode=500;res.end(error.message);}
  });
}
if(require.main===module) server().listen(4173,'127.0.0.1',()=>console.log(themes.map(theme => `Synthetic preview: http://127.0.0.1:4173/${theme}/index`).join('\n')));
module.exports = server;
