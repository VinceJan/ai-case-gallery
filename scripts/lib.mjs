import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
export const ROOT=path.resolve(process.env.GALLERY_ROOT||process.cwd());
export const CASES=path.join(ROOT,'cases');
export const hash=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');
export const topics={ 'sakura-town':'樱花小镇',castle:'城堡与农田',konbini:'雨夜便利店',mountain:'体素山川',minecraft:'浏览器方块世界' };
export async function walk(dir){const files=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())files.push(...await walk(p));else if(e.isFile())files.push(p);}return files;}
export async function readCases(){await fs.mkdir(CASES,{recursive:true});const entries=await fs.readdir(CASES,{withFileTypes:true});return Promise.all(entries.filter(e=>e.isDirectory()).map(async e=>JSON.parse(await fs.readFile(path.join(CASES,e.name,'case.json'),'utf8'))));}
export async function fingerprint(dir){const files=(await walk(dir)).map(file=>({file,relative:path.relative(dir,file).replaceAll('\\','/')})).sort((a,b)=>a.relative<b.relative?-1:a.relative>b.relative?1:0);const records=[];for(const {file,relative} of files)records.push({path:relative,sha256:hash(await fs.readFile(file)),bytes:(await fs.stat(file)).size});return {sha256:hash(JSON.stringify(records)),files:records};}
export async function writeJson(file,value){await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(file,JSON.stringify(value,null,2)+'\n');}
