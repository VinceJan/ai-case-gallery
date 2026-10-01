import fs from 'node:fs/promises';
import path from 'node:path';
import {ROOT,CASES,topics,hash,fingerprint,writeJson} from './lib.mjs';
const skipDirs=new Set(['node_modules','.git','dist','.vite','.astro','.playwright-cli','playwright-report','test-results','.cache','.agents','.pi','.codex','.claude','.gemini','.antigravity']);
const skipFile=name=>/^\.env(?:\.|$)/i.test(name)||/\.(zip|map|log|tsbuildinfo)$/i.test(name)||['Thumbs.db','.DS_Store'].includes(name);
async function copy(source,target){await fs.mkdir(target,{recursive:true});for(const e of await fs.readdir(source,{withFileTypes:true})){if(e.isSymbolicLink())continue;const a=path.join(source,e.name),b=path.join(target,e.name);if(e.isDirectory()){if(!skipDirs.has(e.name))await copy(a,b);}else if(e.isFile()&&!skipFile(e.name))await fs.copyFile(a,b);}}
export async function importCase(spec){
 if(!/^[a-z0-9][a-z0-9-]{1,100}$/.test(spec.id))throw Error('案例 ID 只能使用小写英文、数字和连字符');
 const dir=path.join(CASES,spec.id);try{await fs.access(dir);throw Error('案例 ID 已存在，请用新的 ID 保存本次运行：'+spec.id);}catch(e){if(e.code!=='ENOENT')throw e;}
 const source=path.resolve(spec.source);await fs.mkdir(path.join(dir,'source'),{recursive:true});await copy(source,path.join(dir,'source'));
 const prompt=spec.promptText??(spec.prompt?await fs.readFile(spec.prompt,'utf8'):null);
 if(prompt!==null)await fs.writeFile(path.join(dir,'prompt.md'),prompt);
 const record={id:spec.id,title:spec.title||topics[spec.topic]||'新案例',topic:spec.topic||'other',topicLabel:topics[spec.topic]||spec.topic||'其他作品',model:spec.model||'模型未记录',harness:spec.harness||'Harness 未记录',modelEvidence:spec.modelEvidence||'未找到记录',date:spec.date||null,promptVariant:spec.promptVariant||'原始提示词',promptHash:prompt===null?null:hash(prompt),description:spec.description||'保留本次运行的原始材料，供在线体验与回看。',notes:spec.notes||[],controls:spec.controls||'拖拽旋转视角，滚轮缩放。',adapter:spec.adapter||'vite',project:spec.project||'.',entry:spec.entry||'index.html',status:'materials',cover:null,gallery:[],verification:null,sourceFingerprint:(await fingerprint(path.join(dir,'source'))).sha256};
 await writeJson(path.join(dir,'case.json'),record);await writeJson(path.join(dir,'source-manifest.json'),await fingerprint(path.join(dir,'source')));console.log('已收录 '+record.id);return record;
}
if(process.argv[1]===new URL(import.meta.url).pathname||process.argv[1]?.replaceAll('\\','/').endsWith('/import-case.mjs')){
 const args=process.argv.slice(2);if(args[0]==='--spec'){const data=JSON.parse(await fs.readFile(args[1],'utf8'));for(const spec of (Array.isArray(data)?data:[data]))await importCase(spec);}else{const opts={};for(let i=0;i<args.length;i+=2)opts[args[i].replace(/^--/,'')]=args[i+1];await importCase(opts);}
}
