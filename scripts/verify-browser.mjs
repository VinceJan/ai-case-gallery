import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import {chromium} from 'playwright';
import {ROOT,INCOMING,caseDir,readCases,readCandidates,writeJson,fingerprint,hash} from './lib.mjs';
import {enterWork,renderEvidence} from './browser-checks.mjs';
import {sameArtifact} from './verification.mjs';

const args=process.argv.slice(2);
const origin=(args.find(x=>x.startsWith('--url='))?.slice(6)||'http://127.0.0.1:4321/ai-case-gallery/').replace(/\/?$/,'/');
const ids=args.filter(x=>x.startsWith('--id=')).map(x=>x.slice(5));
const online=args.includes('--online');
const jobs=Number(args.find(x=>x.startsWith('--jobs='))?.slice(7)||1);
if(!Number.isInteger(jobs)||jobs<1||jobs>3)throw Error('jobs 应为 1–3；WebGL 默认串行验证');
const all=online?await readCases():await readCandidates(),records=all.filter(c=>c.demoFingerprint&&(!ids.length||ids.includes(c.id)));
for(const id of ids)if(!records.some(c=>c.id===id))throw Error('案例不存在或尚无展示产物：'+id);
const edge='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const executablePath=await fs.access(edge).then(()=>edge).catch(()=>undefined);
const browser=await chromium.launch({executablePath,headless:true,args:['--use-angle=gl','--enable-webgl','--ignore-gpu-blocklist']});
const output=path.join(ROOT,'.work/verification');await fs.mkdir(output,{recursive:true});
const results=[];let cursor=0;
try {
 await Promise.all(Array.from({length:jobs},async()=>{while(cursor<records.length){
  const c=records[cursor++],dir=await caseDir(c.id);
  const context=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1}),page=await context.newPage();
  const errors=[],requests=[],actions=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error'&&!/favicon|fonts\.google|Failed to load resource/.test(m.text()))errors.push(m.text());});
  page.on('response',r=>{if(r.status()>=400&&(/\.(?:js|mjs|css|json|svg|wasm)(?:[?#]|$)/i.test(r.url())||r.url().startsWith(origin))&&!r.url().endsWith('/favicon.ico'))requests.push(r.status()+' '+r.url());});
  page.on('requestfailed',r=>{if(/\.(?:js|mjs|css|json|svg|wasm)(?:[?#]|$)/i.test(r.url()))requests.push((r.failure()?.errorText||'加载失败')+' '+r.url());});
  let result;
  try {
   for(const kind of ['source','demo'])if((await fingerprint(path.join(dir,kind))).sha256!==c[kind+'Fingerprint'])throw Error('验证开始前 '+kind+' 指纹已变化，请重新构建/登记');
   const response=await page.goto(origin+'generated/demos/'+c.id+'/',{waitUntil:'networkidle',timeout:45000});
   await page.waitForTimeout(3000);await enterWork(page,c,actions);
   const render=await renderEvidence(page);errors.push(...render.objectErrors);
   const screenshot=c.id+(online?'-live':'')+'.png';
   await page.screenshot({path:path.join(output,screenshot)});
   const ok=!!response?.ok()&&render.rendered&&!render.blockingMenus.length&&!errors.length&&!requests.length;
   result={id:c.id,ok,http:response?.status(),...render,actions,errors:[...new Set(errors)],requests:[...new Set(requests)],screenshot,screenshotHash:hash(await fs.readFile(path.join(output,screenshot))),sourceFingerprint:c.sourceFingerprint,demoFingerprint:c.demoFingerprint,date:new Date().toISOString(),origin,evidenceVersion:2};
  }catch(e){result={id:c.id,ok:false,errors:[...new Set([...errors,e.message.replace(/\u001b\[[0-9;]*m/g,'')])],requests,actions,sourceFingerprint:c.sourceFingerprint,demoFingerprint:c.demoFingerprint,date:new Date().toISOString(),origin,evidenceVersion:2};}
  try {
   // 已发布案例的复查只写报告；不因测试环境异常改写公开记录。
   if(!online&&path.dirname(dir)===INCOMING){
    const latest=JSON.parse(await fs.readFile(path.join(dir,'case.json'),'utf8'));
    if(!sameArtifact(c,latest))throw Error('验证期间产物已更新，拒绝覆盖最新记录');
    for(const kind of ['source','demo'])if((await fingerprint(path.join(dir,kind))).sha256!==c[kind+'Fingerprint'])throw Error('验证期间 '+kind+' 文件已变化，结果失效');
    latest.status=result.ok?'verified':'runtime-failed';
    latest.verification={...result,summary:result.ok?'已加载实际场景并检查入口、交互与渲染。':'浏览器检查未通过。'};
    if(result.ok){await fs.mkdir(path.join(dir,'media'),{recursive:true});await sharp(path.join(output,result.screenshot)).resize({width:1500,withoutEnlargement:true}).webp({quality:88}).toFile(path.join(dir,'media/verified-cover.webp'));latest.cover='verified-cover.webp';latest.gallery=[...new Set(['verified-cover.webp',...latest.gallery])];}
    await writeJson(path.join(dir,'case.json'),latest);
   }
  }catch(e){result.ok=false;result.errors.push(e.message);}
  results.push(result);console.log(JSON.stringify({id:c.id,ok:result.ok,actions:result.actions,canvasVariation:result.canvasVariation,errors:result.errors,requests:result.requests,blockingMenus:result.blockingMenus}));
  await context.close();
 }}));
} finally {await browser.close();}
await writeJson(path.join(output,online?'live-results.json':'local-results.json'),results);
if(results.some(r=>!r.ok))process.exitCode=1;
