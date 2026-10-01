import fs from 'node:fs/promises';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {ROOT,readCases,hash,walk} from './lib.mjs';
function git(args,cwd){const result=spawnSync('git',args,{cwd,encoding:'utf8'});if(result.status!==0)throw Error(result.stderr||'Git 操作失败');return result.stdout.trim();}
const args=process.argv.slice(2);const commit=args.includes('--commit')?args[args.indexOf('--commit')+1]:git(['rev-parse','HEAD'],ROOT);if(!/^[a-f0-9]{40}$/.test(commit))throw Error('请提供实际提交 SHA');
const work=path.join(ROOT,'.work');await fs.mkdir(work,{recursive:true});const fresh=await fs.mkdtemp(path.join(work,'cloud-check-'));
git(['init','--quiet'],fresh);git(['remote','add','origin','https://github.com/VinceJan/ai-case-gallery.git'],fresh);git(['fetch','--depth=1','origin',commit],fresh);git(['checkout','--detach','--quiet','FETCH_HEAD'],fresh);
if(git(['rev-parse','HEAD'],fresh)!==commit)throw Error('取回的云端提交不一致');
const errors=[];let total=0;const records=await readCases();for(const c of records){const dir=path.join(ROOT,'cases',c.id);const files=await walk(dir);for(const file of files){const rel=path.relative(ROOT,file);const remote=await fs.readFile(path.join(fresh,rel)).catch(()=>null);if(!remote||hash(remote)!==hash(await fs.readFile(file)))errors.push(rel+': 云端文件缺失或内容不一致');total++;}console.log('已核对 '+c.id);}
const origin='https://vincejan.github.io/ai-case-gallery/';let version,catalog;for(let attempt=0;attempt<18;attempt++){try{version=await fetch(origin+'generated/version.json?v='+commit,{cache:'no-store',signal:AbortSignal.timeout(15000)}).then(r=>{if(!r.ok)throw Error('在线版本记录尚未加载');return r.json();});if(version.commit===commit){catalog=await fetch(origin+'generated/catalog.json?v='+commit,{cache:'no-store'}).then(r=>r.json());break;}}catch{}await new Promise(r=>setTimeout(r,5000));}
if(!catalog)errors.push('在线网站尚未对应本次提交 '+commit);else for(const c of records){const cloud=catalog.find(x=>x.id===c.id);if(!cloud||cloud.sourceFingerprint!==c.sourceFingerprint||cloud.demoFingerprint!==c.demoFingerprint)errors.push(c.id+': 在线案例指纹不一致');}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else{console.log('云端验证通过：'+total+' 个源码、提示词、截图和展示文件均与本地一致，网站已对应提交 '+commit);await fs.writeFile(path.join(work,'cloud-verification.json'),JSON.stringify({commit,files:total,cases:records.length,verifiedAt:new Date().toISOString(),freshCloneVerified:true},null,2));if(path.dirname(fresh)!==work)throw Error('临时路径检查未通过');await fs.rm(fresh,{recursive:true,force:true});}
