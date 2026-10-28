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
      if(url.pathname.startsWith('/fixture/')){res.setHeader('Content-Type','image/svg+xml');return res.end('<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500"><rect width="900" height="500" fill="#466471"/><circle cx="680" cy="110" r="55" fill="#e9c179"/><path d="M0 500L230 140L470 420L700 210L900 430V500Z" fill="#203b48"/></svg>');}
      const asset = url.pathname.match(/^\/(?:themes|theme)\/([a-z0-9-]+)\/res\/css\/(upstream|firekylin)\.css$/);
      if(asset && themes.includes(asset[1])) {res.setHeader('Content-Type','text/css');return res.end(fs.readFileSync(path.join(__dirname,'../packages',asset[1],'res/css',asset[2]+'.css')));}
      const [theme,page='index'] = url.pathname.slice(1).split('/');
      if(!themes.includes(theme) || !pages.includes(page)) {res.statusCode=404;return res.end('Not found');}
      res.setHeader('Content-Type','text/html; charset=utf-8');
      res.end(await render(theme,page,{empty:url.searchParams.has('empty'),long:url.searchParams.has('long'),comments:false,config:{...(url.searchParams.has('dark')?{colorMode:'dark'}:{}),...(url.searchParams.has('media')?{defaultBanner:'/fixture/banner.svg'}:{}),...(url.searchParams.has('narrow')?{indexStyle:'narrow'}:{})}}));
    } catch(error) {res.statusCode=500;res.end(error.message);}
  });
}
if(require.main===module) server().listen(4173,'127.0.0.1',()=>console.log(themes.map(theme => `Synthetic preview: http://127.0.0.1:4173/${theme}/index`).join('\n')));
module.exports = server;
