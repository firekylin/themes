'use strict';
// Uses the real core installer with an isolated local destination; never publishes.
const fs=require('node:fs/promises'),os=require('node:os'),path=require('node:path'),assert=require('node:assert/strict');
const core=process.env.FIREKYLIN_CORE_PATH;if(!core)throw Error('FIREKYLIN_CORE_PATH required');
const {ThemeInstaller}=require(path.resolve(core,'src/service/theme-installer'));
(async()=>{const root=await fs.mkdtemp(path.join(os.tmpdir(),'sakura-install-'));try{const installer=new ThemeInstaller({themesPath:path.join(root,'themes'),backupPath:path.join(root,'backups'),firekylinVersion:'2.16.0'});const result=await installer.install(await fs.readFile('dist/sakura-0.1.0.zip'));assert.equal(result.id,'sakura');const manifest=JSON.parse(await fs.readFile(path.join(root,'themes/sakura/package.json')));assert.equal(manifest.version,'0.1.0');console.log('Core ThemeInstaller: sakura-0.1.0.zip installed successfully into isolated directory.');}finally{await fs.rm(root,{recursive:true,force:true});}})().catch(e=>{console.error(e);process.exitCode=1;});
