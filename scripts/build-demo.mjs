import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {build} from 'esbuild';
import {ROOT,caseDir,readCandidates,fingerprint,writeJson,walk} from './lib.mjs';
function run(command,args,cwd){return new Promise((resolve,reject)=>{const npm=process.platform==='win32'&&command==='npm';const child=spawn(npm?'cmd.exe':command,npm?['/d','/s','/c','npm '+args.join(' ')]:args,{cwd,stdio:['ignore','pipe','pipe'],env:{...process.env,CI:'true'}});let out='';child.stdout.on('data',d=>out+=d);child.stderr.on('data',d=>out+=d);child.on('error',reject);child.on('exit',code=>code===0?resolve(out):reject(Error(out.slice(-7000))));});}
async function copyStatic(source,dest){await fs.mkdir(dest,{recursive:true});for(const f of await walk(source)){const rel=path.relative(source,f);if(rel.split(path.sep).some(s=>['node_modules','tools','shots','tests','docs','artifacts'].includes(s))||/\.(md|png|jpg|json|lock|ps1|cmd)$/i.test(rel)&&!rel.startsWith('assets'+path.sep)&&!rel.startsWith('public'+path.sep))continue;const out=path.join(dest,rel);await fs.mkdir(path.dirname(out),{recursive:true});await fs.copyFile(f,out);}}
export async function buildDemo(record,{force=false}={}){
 const dir=await caseDir(record.id);if(record.adapter==='materials')throw Error('只收录可运行成品');if(!force&&record.demoFingerprint)return record;
 const stage=path.join(ROOT,'.work','build',record.id);await fs.mkdir(stage,{recursive:true});await fs.cp(path.join(dir,'source'),stage,{recursive:true});const project=path.resolve(stage,record.project);if(!project.startsWith(stage))throw Error('项目入口越界');const demo=path.join(dir,'demo');await fs.mkdir(demo,{recursive:true});
 try{
  if(['vite','bundle','custom'].includes(record.adapter)){
   const locked=await fs.access(path.join(project,'package-lock.json')).then(()=>true).catch(()=>false);
   try{await run('npm',locked?['ci','--no-audit','--no-fund']:['install','--no-audit','--no-fund'],project);}catch(error){
    if(!locked||!/EUSAGE|in sync|Missing:|Invalid:/.test(error.message))throw error;
    await fs.copyFile(path.join(project,'package-lock.json'),path.join(dir,'source',record.project,'package-lock.original.json'));
    await run('npm',['install','--no-audit','--no-fund'],project);await fs.copyFile(path.join(project,'package-lock.json'),path.join(dir,'source',record.project,'package-lock.json'));record.notes.push('原锁文件与 package.json 不一致；发布时重新同步，原锁文件保存在 package-lock.original.json。');
   }
   if(!locked){await fs.copyFile(path.join(project,'package-lock.json'),path.join(dir,'source',record.project,'package-lock.json'));record.notes.push('恢复 / 发布时补充了依赖锁文件；原有源码保留。');}
  }
  if(record.adapter==='vite'){
   await run('node',['node_modules/vite/bin/vite.js','build','--base=./'],project);await fs.cp(path.join(project,'dist'),demo,{recursive:true});record.notes.push('展示版使用 Vite 生产构建，资源路径设为相对路径；不等同于功能验收。');
  }else if(record.adapter==='bundle'){
   const html=await fs.readFile(path.join(project,'index.html'),'utf8');const entry=html.match(/<script[^>]*type=["']module["'][^>]*src=["']([^"']+)["'][^>]*><\/script>/)?.[1];if(!entry)throw Error('找不到模块入口');
   let moduleEntry=path.resolve(project,entry);if(!await fs.access(moduleEntry).then(()=>true).catch(()=>false)&&await fs.access(path.join(project,'src/main.js')).then(()=>true).catch(()=>false))moduleEntry=path.join(project,'src/main.js');
   const result=await build({entryPoints:[moduleEntry],bundle:true,write:false,minify:true,format:'iife',target:'es2020',loader:{'.css':'css'}});
   const js=result.outputFiles.find(f=>f.path.endsWith('.js'))||result.outputFiles[0];
   let css=result.outputFiles.filter(f=>f.path.endsWith('.css')).map(f=>'<style>'+f.text+'</style>').join('');let baseHtml=html;for(const link of html.matchAll(/<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/g)){if(!/^https?:/.test(link[1])){const candidate=path.resolve(project,link[1]);const fallback=path.join(project,'src/style.css');const style=await fs.readFile(candidate,'utf8').catch(()=>fs.readFile(fallback,'utf8'));css+='<style>'+style+'</style>';baseHtml=baseHtml.replace(link[0],'');}}
   const final=baseHtml.replace(/<script type="importmap">[\s\S]*?<\/script>/,'').replace(/<script[^>]*type=["']module["'][^>]*src=["'][^"']+["'][^>]*><\/script>/,()=>css+'<script>'+js.text.replaceAll('</script','<\\/script')+'</script>');await fs.writeFile(path.join(demo,'index.html'),final);record.notes.push('展示版将 Three.js 与场景模块打包，移除了运行时 CDN 模块依赖。');
  }else if(record.adapter==='custom'){
   await run('npm',['run','build'],project);await fs.copyFile(path.join(project,record.entry),path.join(demo,'index.html'));
  }else if(record.adapter==='html'){
   let html=await fs.readFile(path.join(project,record.entry),'utf8');const globalThree=html.match(/<script[^>]*src=["']https:\/\/cdn\.jsdelivr\.net\/npm\/three@(0\.161\.0)\/build\/three\.min\.js["'][^>]*><\/script>/);
   if(globalThree){await run('npm',['install','--no-audit','--no-fund','--save-exact','three@'+globalThree[1]],project);const bundle=await build({stdin:{contents:"import * as THREE from 'three'; window.THREE=THREE;",resolveDir:project},bundle:true,write:false,minify:true,format:'iife',target:'es2020'});await fs.writeFile(path.join(demo,'three.js'),bundle.outputFiles[0].text);html=html.replace(globalThree[0],'<script src="./three.js"></script>');record.notes.push('原 HTML 引用的 Three.js 0.161.0 全局脚本地址不存在；展示适配将同版本 ESM 打包为全局 THREE，原源码保留。');}
   if(!html.includes('type="importmap"')){const esm=html.match(/https:\/\/cdn\.jsdelivr\.net\/npm\/three@(\d+\.\d+\.\d+)\/build\/three\.module\.js/);if(esm){html=html.replace('</head>',`<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@${esm[1]}/build/three.module.js"}}</script></head>`);record.notes.push('展示层补充与原作相同版本的 Three.js import map，以解析 OrbitControls 的裸模块导入。');}}
   await fs.writeFile(path.join(demo,'index.html'),html);
  }else if(record.adapter==='svg'){
   await fs.copyFile(path.join(project,record.entry),path.join(demo,'artifact.svg'));
   await fs.writeFile(path.join(demo,'index.html'),'<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+record.title+'</title><style>body{margin:0;background:#edf0f3}object{width:100vw;height:100vh;display:block}</style><object type="image/svg+xml" data="artifact.svg" aria-label="'+record.title+'"></object></html>');
  }else if(record.adapter==='static'){
   await copyStatic(project,demo);
  }else throw Error('未知适配方式 '+record.adapter);
  for(const f of await walk(demo))if(f.endsWith('.map'))await fs.unlink(f);
  for(const license of [path.join(project,'node_modules/three/LICENSE'),path.join(project,'THREE-LICENSE.txt'),path.join(ROOT,'licenses/THREE.txt')]){try{await fs.copyFile(license,path.join(demo,'THREE-LICENSE.txt'));break;}catch{}}
  record.status='built';record.buildError=null;record.demoFingerprint=(await fingerprint(demo)).sha256;
 }catch(e){record.status='build-failed';record.buildError=e.message;console.error(record.id+': '+e.message.slice(-500));}
 record.sourceFingerprint=(await fingerprint(path.join(dir,'source'))).sha256;await writeJson(path.join(dir,'source-manifest.json'),await fingerprint(path.join(dir,'source')));await writeJson(path.join(dir,'demo-manifest.json'),await fingerprint(demo));await writeJson(path.join(dir,'case.json'),record);console.log(record.id+': '+record.status);return record;
}
if(process.argv[1]?.replaceAll('\\','/').endsWith('/build-demo.mjs')){
 const ids=process.argv.slice(2).filter(x=>!x.startsWith('--'));const records=(await readCandidates()).filter(c=>!ids.length||ids.includes(c.id));let cursor=0;
 await Promise.all(Array.from({length:3},async()=>{while(cursor<records.length)await buildDemo(records[cursor++],{force:process.argv.includes('--force')});}));
}
