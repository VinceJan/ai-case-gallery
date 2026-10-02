import fs from 'node:fs/promises';
import path from 'node:path';
import {ROOT,INCOMING,topics,hash,fingerprint,writeJson,resolveWithin} from './lib.mjs';
import {allocateId,formatTitle,canonicalModel,canonicalHarness} from './naming.mjs';
const skipDirs=new Set(['node_modules','.git','dist','.vite','.astro','.playwright-cli','playwright-report','test-results','.cache','.agents','.pi','.codex','.claude','.gemini','.antigravity']);
const skipFile=name=>/^\.env(?:\.|$)/i.test(name)||/\.(zip|map|log|tsbuildinfo)$/i.test(name)||['Thumbs.db','.DS_Store'].includes(name);
async function copy(source,target){await fs.mkdir(target,{recursive:true});for(const e of await fs.readdir(source,{withFileTypes:true})){if(e.isSymbolicLink())continue;const a=path.join(source,e.name),b=path.join(target,e.name);if(e.isDirectory()){if(!skipDirs.has(e.name))await copy(a,b);}else if(e.isFile()&&!skipFile(e.name))await fs.copyFile(a,b);}}
export async function importCase(spec){
 if(!spec.topic||!spec.model||!spec.harness)throw Error('请提供题目、模型与 Harness');
 if(!(await fs.stat(path.resolve(spec.source))).isDirectory())throw Error('作品 source 应为目录');
 spec={...spec,model:canonicalModel(spec.model),harness:canonicalHarness(spec.harness),variant:spec.variant||'default',topicLabel:spec.topicLabel||topics[spec.topic]||spec.topic};
 const sourceRoot=path.resolve(spec.source);const projectRoot=resolveWithin(sourceRoot,spec.project||'.');resolveWithin(projectRoot,spec.entry||'index.html');
 await fs.mkdir(INCOMING,{recursive:true});let dir;
 for(;;){const allocated=await allocateId(spec);spec.id=allocated.id;spec.serial=allocated.serial;dir=path.join(INCOMING,spec.id);const rel=path.relative(sourceRoot,dir);if(!rel.startsWith('..'+path.sep)&&rel!=='..'&&!path.isAbsolute(rel))throw Error('导入目标不能位于原目录内');try{await fs.mkdir(dir);break;}catch(e){if(e.code!=='EEXIST')throw e;}}
 try {
 const source=path.resolve(spec.source);await fs.mkdir(path.join(dir,'source'),{recursive:true});await copy(source,path.join(dir,'source'));
 const prompt=spec.promptText??(spec.prompt?await fs.readFile(path.resolve(source,spec.prompt),'utf8'):null);
 if(prompt!==null)await fs.writeFile(path.join(dir,'prompt.md'),prompt);
 const record={id:spec.id,title:spec.title||topics[spec.topic]||'新案例',topic:spec.topic||'other',topicLabel:topics[spec.topic]||spec.topic||'其他作品',model:spec.model||'模型未记录',harness:spec.harness||'Harness 未记录',modelEvidence:spec.modelEvidence||'未找到记录',date:spec.date||null,promptVariant:spec.promptVariant||'原始提示词',promptHash:prompt===null?null:hash(prompt),description:spec.description||'保留本次运行的原始材料，供在线体验与回看。',notes:spec.notes||[],controls:spec.controls||'拖拽旋转视角，滚轮缩放。',adapter:spec.adapter||'vite',project:spec.project||'.',entry:spec.entry||'index.html',status:'materials',cover:null,gallery:[],verification:null,sourceFingerprint:(await fingerprint(path.join(dir,'source'))).sha256};
 Object.assign(record,{title:formatTitle(spec),topicLabel:spec.topicLabel,serial:spec.serial,variant:spec.variant,effort:spec.effort||null,provenance:spec.provenance||null,promptSource:spec.promptSource||null,promptEvidence:spec.promptEvidence||null,exactModelId:spec.exactModelId||null,entryAction:spec.entryAction||null});
 record.status='pending';await writeJson(path.join(dir,'source-manifest.json'),await fingerprint(path.join(dir,'source')));await writeJson(path.join(dir,'case.json'),record);console.log('待验收 '+record.id);return record;
 }catch(e){if(path.dirname(dir)!==INCOMING)throw Error('清理路径越界');await fs.rm(dir,{recursive:true,force:true});throw e;}
}
if(process.argv[1]===new URL(import.meta.url).pathname||process.argv[1]?.replaceAll('\\','/').endsWith('/import-case.mjs')){
 const args=process.argv.slice(2);if(args[0]==='--spec'){const data=JSON.parse(await fs.readFile(args[1],'utf8'));for(const spec of (Array.isArray(data)?data:[data]))await importCase(spec);}else{const opts={};for(let i=0;i<args.length;i+=2)opts[args[i].replace(/^--/,'')]=args[i+1];await importCase(opts);}
}
