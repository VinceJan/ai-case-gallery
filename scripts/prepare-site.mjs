import fs from 'node:fs/promises';
import path from 'node:path';
import {ROOT,CASES,readCases,writeJson} from './lib.mjs';
import {spawnSync} from 'node:child_process';
import {assertReady} from './verification.mjs';
const records=await readCases();for(const c of records)assertReady(c);const generated=path.join(ROOT,'public/generated');if(path.dirname(generated)!==path.join(ROOT,'public'))throw Error('生成目录越界');await fs.rm(generated,{recursive:true,force:true});await fs.mkdir(generated,{recursive:true});
for(const c of records){
 const dir=path.join(CASES,c.id),media=path.join(dir,'media');
 await fs.cp(media,path.join(generated,'media',c.id),{recursive:true});
 if(c.demoFingerprint)await fs.cp(path.join(dir,'demo'),path.join(generated,'demos',c.id),{recursive:true});
 for(const old of c.legacyIds||[]){const legacy=path.join(generated,'demos',old);await fs.mkdir(legacy,{recursive:true});await fs.writeFile(path.join(legacy,'index.html'),`<!doctype html><meta http-equiv="refresh" content="0;url=../${c.id}/"><a href="../${c.id}/">打开作品</a>`);}
 if(c.promptHash){await fs.mkdir(path.join(generated,'prompts'),{recursive:true});await fs.copyFile(path.join(dir,'prompt.md'),path.join(generated,'prompts',c.id+'.md'));}
}
await writeJson(path.join(generated,'catalog.json'),records.map(({buildError,...c})=>c));await writeJson(path.join(generated,'version.json'),{commit:process.env.GITHUB_SHA||spawnSync('git',['rev-parse','HEAD'],{cwd:ROOT,encoding:'utf8'}).stdout?.trim()||'local-preview'});console.log('已准备 '+records.length+' 个案例');
