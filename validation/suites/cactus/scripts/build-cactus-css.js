'use strict';
const fs=require('node:fs'),path=require('node:path'),stylus=require('stylus'),nib=require('nib');
const root=path.join(__dirname,'../packages/cactus');
// Keep original Stylus sources intact; omit only the external font import.
const source=fs.readFileSync(path.join(root,'source/css/style.styl'),'utf8').replace('@import "_fonts"','');
for(const scheme of ['dark','light','classic','white']){
const values={page_width:48,'logo.width':50,'logo.height':50,'logo.grayout':true,colorscheme:scheme};
const css=stylus(source).set('filename',path.join(root,'source/css/style.styl')).use(nib()).import('nib').define('hexo-config',key=>stylus.utils.coerce(values[key.val]??false)).render();
fs.writeFileSync(path.join(root,'res/css',scheme+'.css'),'/* Cactus MIT; see LICENSE. Generated from source/css. */\n'+css);
}
// Discovery marker for shared rendering fixtures.
fs.writeFileSync(path.join(root,'res/css/upstream.css'),'/* Original compiled styles are dark/light/classic/white.css. */\n');
