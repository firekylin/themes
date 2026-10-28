'use strict';
const fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
if(!process.env.FIREKYLIN_CORE_PATH)throw Error('FIREKYLIN_CORE_PATH required');
const {ThemeInstaller}=require(path.join(process.env.FIREKYLIN_CORE_PATH,'src/service/theme-installer'));
(async()=>{const root=await fs.mkdtemp(path.join(os.tmpdir(),'fluid-install-'));try{const installer=new ThemeInstaller({themesPath:path.join(root,'themes'),backupPath:path.join(root,'backups'),firekylinVersion:'2.16.0'});const result=await installer.install(await fs.readFile(path.join(__dirname,'../dist/fluid-0.1.0.zip')));assert.equal(result.id,'fluid');const html=await fs.readFile(path.join(root,'themes/fluid/index.eta'),'utf8');assert.match(html,/includeAsync/);console.log('Actual core ThemeInstaller installed Fluid ZIP');}finally{await fs.rm(root,{recursive:true,force:true});}})().catch(error=>{console.error(error);process.exit(1)});
