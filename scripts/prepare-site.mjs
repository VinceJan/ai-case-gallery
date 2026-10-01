import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import {ROOT,CASES,readCases,walk,writeJson} from './lib.mjs';
import {spawnSync} from 'node:child_process';
const records=await readCases();const generated=path.join(ROOT,'public/generated');await fs.mkdir(generated,{recursive:true});
for(const c of records){
 const dir=path.join(CASES,c.id);const images=(await walk(path.join(dir,'source'))).filter(f=>/\.(png|jpg|jpeg|webp)$/i.test(f));
 const rank=f=>/cover|scene\.png|hero|overview|preview/.test(f)?0:/shots|docs/.test(f)?1:2;images.sort((a,b)=>rank(a)-rank(b)||a.localeCompare(b));
 const media=path.join(dir,'media');await fs.mkdir(media,{recursive:true});
 if(!c.cover&&images.length){await sharp(images[0]).rotate().resize({width:1500,height:900,fit:'inside',withoutEnlargement:true}).webp({quality:86}).toFile(path.join(media,'cover.webp'));c.cover='cover.webp';}
 if(!c.gallery.length){for(let i=0;i<Math.min(images.length,4);i++){const name='view-'+(i+1)+'.webp';await sharp(images[i]).rotate().resize({width:1600,height:1000,fit:'inside',withoutEnlargement:true}).webp({quality:84}).toFile(path.join(media,name));c.gallery.push(name);}}
 await fs.cp(media,path.join(generated,'media',c.id),{recursive:true});
 if(c.demoFingerprint)await fs.cp(path.join(dir,'demo'),path.join(generated,'demos',c.id),{recursive:true});
 if(c.promptHash){await fs.mkdir(path.join(generated,'prompts'),{recursive:true});await fs.copyFile(path.join(dir,'prompt.md'),path.join(generated,'prompts',c.id+'.md'));}
 await writeJson(path.join(dir,'case.json'),c);
}
await writeJson(path.join(generated,'catalog.json'),records.map(({buildError,...c})=>c));await writeJson(path.join(generated,'version.json'),{commit:process.env.GITHUB_SHA||spawnSync('git',['rev-parse','HEAD'],{cwd:ROOT,encoding:'utf8'}).stdout?.trim()||'local-preview'});console.log('已准备 '+records.length+' 个案例');
