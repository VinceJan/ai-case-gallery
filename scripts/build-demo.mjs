import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {build} from 'esbuild';
import {ROOT,CASES,readCases,fingerprint,writeJson,walk} from './lib.mjs';
function run(command,args,cwd){return new Promise((resolve,reject)=>{const npm=process.platform==='win32'&&command==='npm';const child=spawn(npm?'cmd.exe':command,npm?['/d','/s','/c','npm '+args.join(' ')]:args,{cwd,stdio:['ignore','pipe','pipe'],env:{...process.env,CI:'true'}});let out='';child.stdout.on('data',d=>out+=d);child.stderr.on('data',d=>out+=d);child.on('error',reject);child.on('exit',code=>code===0?resolve(out):reject(Error(out.slice(-7000))));});}
async function copyStatic(source,dest){await fs.mkdir(dest,{recursive:true});for(const f of await walk(source)){const rel=path.relative(source,f);if(rel.split(path.sep).some(s=>['node_modules','tools','shots','tests','docs','artifacts'].includes(s))||/\.(md|png|jpg|json|lock|ps1|cmd)$/i.test(rel)&&!rel.startsWith('assets'+path.sep)&&!rel.startsWith('public'+path.sep))continue;const out=path.join(dest,rel);await fs.mkdir(path.dirname(out),{recursive:true});await fs.copyFile(f,out);}}
export async function buildDemo(record,{force=false}={}){
 const dir=path.join(CASES,record.id);if(record.adapter==='materials')return record;if(!force&&record.demoFingerprint)return record;
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
   const result=await build({entryPoints:[path.resolve(project,entry)],bundle:true,write:false,minify:true,format:'iife',target:'es2020'});
   const final=html.replace(/<script type="importmap">[\s\S]*?<\/script>/,'').replace(/<script[^>]*type=["']module["'][^>]*src=["'][^"']+["'][^>]*><\/script>/,()=>'<script>'+result.outputFiles[0].text.replaceAll('</script','<\\/script')+'</script>');await fs.writeFile(path.join(demo,'index.html'),final);record.notes.push('展示版将 Three.js 与场景模块打包，移除了运行时 CDN 模块依赖。');
  }else if(record.adapter==='custom'){
   await run('npm',['run','build'],project);await fs.copyFile(path.join(project,record.entry),path.join(demo,'index.html'));
  }else if(record.adapter==='html'){
   await fs.copyFile(path.join(project,record.entry),path.join(demo,'index.html'));
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
 const ids=process.argv.slice(2).filter(x=>!x.startsWith('--'));const records=(await readCases()).filter(c=>!ids.length||ids.includes(c.id));let cursor=0;
 await Promise.all(Array.from({length:3},async()=>{while(cursor<records.length)await buildDemo(records[cursor++],{force:process.argv.includes('--force')});}));
}
