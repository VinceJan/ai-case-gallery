import fs from 'node:fs/promises';
import path from 'node:path';
import {readCases,CASES} from '../../scripts/lib.mjs';
export const cases=await readCases();
export const base='/ai-case-gallery/';
export const repository='https://github.com/VinceJan/ai-case-gallery';
export const url=p=>base+p.replace(/^\//,'');
export const caseUrl=c=>url('cases/'+c.id+'/');
export const demoUrl=c=>url('generated/demos/'+c.id+'/');
export const imageUrl=(c,name=c.cover)=>url('generated/media/'+c.id+'/'+name);
export const labels={verified:'已验证展示',built:'构建通过',materials:'仅有材料','build-failed':'构建未通过','runtime-failed':'运行有问题'};
export const playable=c=>!!c.demoFingerprint&&c.status!=='runtime-failed';
export async function prompt(c){return c.promptHash?fs.readFile(path.join(CASES,c.id,'prompt.md'),'utf8'):null;}
const priority=['konbini-space-bunny-pi','castle-codex-61-sol','konbini-offline-unattributed','voxel-mountain','sakura-bunnyalpha-pi-short-v2'];
export const sorted=[...cases].sort((a,b)=>{const ai=priority.indexOf(a.id),bi=priority.indexOf(b.id);return (ai<0?99:ai)-(bi<0?99:bi)||a.topic.localeCompare(b.topic)||a.id.localeCompare(b.id);});
