'use strict';
const fs=require('node:fs'),path=require('node:path'),stylus=require('stylus'),nib=require('nib');
const root=path.join(__dirname,'../packages/fluid'),file=path.join(root,'source/css/main.styl');
const values={'dark_mode.enable':true,'banner.width_height_ratio':1,'scroll_down_arrow.banner_height_limit':80};
let source=fs.readFileSync(file,'utf8').replace(/for \$inject_\w+ in hexo-config\("injects\.\w+"\)\n  @import \$inject_\w+;?/g,'');
const css=stylus(source).set('filename',file).use(nib()).import('nib').define('hexo-config',key=>stylus.utils.coerce(values[key.val]??false)).render();
fs.writeFileSync(path.join(root,'res/css/upstream.css'),'/* Fluid GPL-3.0-or-later. Generated; source/css and LICENSE included. */\n'+css);
const bootstrap=path.dirname(require.resolve('bootstrap/package.json'));
fs.copyFileSync(path.join(bootstrap,'dist/css/bootstrap.min.css'),path.join(root,'res/css/bootstrap.min.css'));
fs.copyFileSync(path.join(bootstrap,'LICENSE'),path.join(root,'BOOTSTRAP-LICENSE'));

const markdown=path.dirname(require.resolve("github-markdown-css/package.json"));
fs.copyFileSync(path.join(markdown,"github-markdown.css"),path.join(root,"res/css/github-markdown.css"));
fs.copyFileSync(path.join(markdown,"license"),path.join(root,"GITHUB-MARKDOWN-LICENSE"));
