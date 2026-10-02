import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {existsSync} from 'node:fs';
function projectRoot(){let dir=path.dirname(fileURLToPath(import.meta.url));while(true){if(existsSync(path.join(dir,'registry/topics.json'))&&existsSync(path.join(dir,'package.json')))return dir;const parent=path.dirname(dir);if(parent===dir)break;dir=parent;}throw Error('找不到画廊项目根目录');}
export const ROOT=path.resolve(process.env.GALLERY_ROOT||projectRoot());
export function resolveWithin(root,relative){const target=path.resolve(root,relative),rel=path.relative(path.resolve(root),target);if(rel==='..'||rel.startsWith('..'+path.sep)||path.isAbsolute(rel))throw Error('路径越界：'+relative);return target;}
export const CASES=path.join(ROOT,'cases');
export const hash=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');
export const topics=Object.fromEntries(Object.entries(JSON.parse(await fs.readFile(path.join(ROOT,'registry/topics.json'),'utf8'))).map(([id,v])=>[id,v.label]));
export async function walk(dir){const files=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())files.push(...await walk(p));else if(e.isFile())files.push(p);}return files;}
export async function readCases(){await fs.mkdir(CASES,{recursive:true});const entries=await fs.readdir(CASES,{withFileTypes:true});return Promise.all(entries.filter(e=>e.isDirectory()).map(async e=>{const c=JSON.parse(await fs.readFile(path.join(CASES,e.name,'case.json'),'utf8'));if(c.id!==e.name)throw Error('目录与案例 ID 不一致：'+e.name);return c;}));}
export const INCOMING=path.join(ROOT,'.work/incoming');
export async function caseDir(id){if(!/^[a-z0-9-]+$/.test(id))throw Error('案例 ID 不合法');for(const root of [CASES,INCOMING]){const dir=path.join(root,id);if(await fs.access(path.join(dir,'case.json')).then(()=>true).catch(()=>false))return dir;}throw Error('没有找到案例 '+id);}
export async function readCandidates(){const published=await readCases();const incoming=await fs.readdir(INCOMING,{withFileTypes:true}).catch(()=>[]);const pending=await Promise.all(incoming.filter(e=>e.isDirectory()).map(async e=>{try{const c=JSON.parse(await fs.readFile(path.join(INCOMING,e.name,'case.json'),'utf8'));if(c.id!==e.name)throw Error('目录与案例 ID 不一致：'+e.name);return c;}catch(error){if(error.code==='ENOENT')return null;throw error;}}));return [...published,...pending.filter(Boolean)];}
export async function fingerprint(dir){const files=(await walk(dir)).map(file=>({file,relative:path.relative(dir,file).replaceAll('\\','/')})).sort((a,b)=>a.relative<b.relative?-1:a.relative>b.relative?1:0);const records=[];for(const {file,relative} of files)records.push({path:relative,sha256:hash(await fs.readFile(file)),bytes:(await fs.stat(file)).size});return {sha256:hash(JSON.stringify(records)),files:records};}
export async function writeJson(file,value){await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(file,JSON.stringify(value,null,2)+'\n');}
