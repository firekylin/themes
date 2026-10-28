'use strict';
// Uses the real core installer with an isolated local destination; never publishes.
const fs=require('node:fs/promises'),os=require('node:os'),path=require('node:path'),assert=require('node:assert/strict');
const core=process.env.FIREKYLIN_CORE_PATH;if(!core)throw Error('FIREKYLIN_CORE_PATH required');
const {ThemeInstaller}=require(path.resolve(core,'src/service/theme-installer'));
(async()=>{const expected=JSON.parse(await fs.readFile(path.resolve(__dirname,'../packages/puock/package.json')));const root=await fs.mkdtemp(path.join(os.tmpdir(),'puock-install-'));try{const installer=new ThemeInstaller({themesPath:path.join(root,'themes'),backupPath:path.join(root,'backups'),firekylinVersion:'2.16.0'});const result=await installer.install(await fs.readFile('dist/puock-'+expected.version+'.zip'));assert.equal(result.id,'puock');const manifest=JSON.parse(await fs.readFile(path.join(root,'themes/puock/package.json')));assert.equal(manifest.version,expected.version);console.log('Core ThemeInstaller: puock ZIP installed successfully into isolated directory.');}finally{await fs.rm(root,{recursive:true,force:true});}})().catch(e=>{console.error(e);process.exitCode=1;});
