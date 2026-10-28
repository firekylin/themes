'use strict';
const fs=require('node:fs'),path=require('node:path'),stylus=require('stylus'),nib=require('nib');const root=path.join(__dirname,'../packages/icarus');
const bulma=path.dirname(require.resolve('bulma-stylus/package.json'));
for(const variant of ['default','cyberpunk','m3e']){const file=path.join(root,'source/css',variant+'.styl');const css=stylus(fs.readFileSync(file,'utf8')).set('filename',file).use(nib()).define('bulma-stylus-root',path.join(bulma,'stylus')).render();fs.writeFileSync(path.join(root,'res/css',variant+'.css'),'/* Icarus and bulma-stylus: MIT; see LICENSE and BULMA-STYLUS-LICENSE. */\n'+css);}
const license=['LICENSE','LICENSE.md','LICENSE.txt'].find(f=>fs.existsSync(path.join(bulma,f)));fs.copyFileSync(path.join(bulma,license),path.join(root,'BULMA-STYLUS-LICENSE'));fs.writeFileSync(path.join(root,'res/css/upstream.css'),'/* Styles: default.css, cyberpunk.css, m3e.css */\n');
