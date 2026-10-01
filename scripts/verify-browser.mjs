import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import {chromium} from 'playwright';
import {ROOT,caseDir,readCandidates,writeJson} from './lib.mjs';
const origin=process.argv.find(x=>x.startsWith('--url='))?.slice(6)||'http://127.0.0.1:4321/ai-case-gallery/';
const ids=process.argv.filter(x=>x.startsWith('--id=')).map(x=>x.slice(5));const online=process.argv.includes('--online');
const edge='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';const executablePath=await fs.access(edge).then(()=>edge).catch(()=>undefined);
const browser=await chromium.launch({executablePath,headless:true,args:['--use-angle=gl','--enable-webgl','--ignore-gpu-blocklist']});
await fs.mkdir(path.join(ROOT,'.work','verification'),{recursive:true});
const records=(await readCandidates()).filter(c=>c.demoFingerprint&&(!ids.length||ids.includes(c.id)));const results=[];let cursor=0;
await Promise.all(Array.from({length:Number(process.argv.find(x=>x.startsWith('--jobs='))?.slice(7)||1)},async()=>{while(cursor<records.length){const c=records[cursor++];
 const context=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1});const page=await context.newPage();const errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/favicon|net::ERR_|fonts\.google|Failed to load resource/.test(m.text()))errors.push(m.text());});page.on('response',r=>{if(r.url().startsWith(new URL(origin).origin)&&r.status()>=400&&!r.url().endsWith('/favicon.ico'))requests.push(r.status()+' '+r.url());});let result;
 try{
  const response=await page.goto(origin+'generated/demos/'+c.id+'/',{waitUntil:'networkidle',timeout:45000});await page.waitForTimeout(4500);
  await page.bringToFront();
  if(c.entryAction?.selector){await page.locator(c.entryAction.selector).first().click({timeout:15000,noWaitAfter:true});await page.waitForTimeout(5000);}
  if(c.topic==='sakura-town'){
   const buttons=await page.getByRole('button').allTextContents();console.log(JSON.stringify({id:c.id,entryButtons:buttons.map(t=>t.trim()).filter(Boolean).slice(0,12)}));
   const enter=page.getByRole('button',{name:/^(?:开\s*始|开始.*|新.*|进入.*|Click to Enter.*|新的生活)$/i}).first();
   if(await enter.count())await enter.click();else if(c.id==='sakura-bunnyalpha-pi-short-v2')await page.keyboard.press('Enter');else{const text=page.getByText(/Click to Enter Town|进入小镇/, {exact:false}).first();if(await text.count())await text.click();}
   await page.waitForTimeout(5500);
  }
  if(c.topic==='minecraft'){const enter=page.getByRole('button',{name:/ENTER THE WORLD/i});if(await enter.count())await enter.click();await page.waitForTimeout(3500);await page.keyboard.press('Digit2');await page.keyboard.down('w');await page.waitForTimeout(300);await page.keyboard.up('w');}
  if(c.legacyIds?.includes('sakura-bunnyalpha-pi-short-v2')){await page.keyboard.press('Enter');await page.waitForTimeout(2500);}
  if(['mythos-craft','cs-dust2','beihai-meteorite'].includes(c.topic)){if(!c.entryAction?.selector){let enter=page.getByRole('button',{name:/开始|进入|踏\s*入|播放|start|play|enter|launch|begin|出发|启程/i}).first();if(!await enter.count())enter=page.getByText(/点击.*(?:世界|进入|开始)|click to (?:enter|start)/i).first();if(await enter.count()&&await enter.isVisible())await enter.click({timeout:20000,noWaitAfter:true});}await page.waitForTimeout(4500);if(['mythos-craft','cs-dust2'].includes(c.topic)){await page.keyboard.down('w');await page.waitForTimeout(600);await page.keyboard.up('w');}}
  if(c.topic==='cs-dust2'){const canvas=page.locator('canvas:visible').first();if(await canvas.count()){await canvas.click({position:{x:600,y:400},noWaitAfter:true});await page.mouse.move(850,400);await page.keyboard.down('w');await page.waitForTimeout(1000);await page.keyboard.up('w');await page.waitForTimeout(2000);}}
  const canvases=await page.locator('canvas:visible').count();const svg=await page.locator('svg:visible').count()+await page.locator('object[type="image/svg+xml"]').evaluateAll(es=>es.filter(e=>e.contentDocument?.querySelector('svg')).length);const parseErrors=await page.locator('object[type="image/svg+xml"]').evaluateAll(es=>es.filter(e=>e.contentDocument?.querySelector('parsererror')).map(e=>e.contentDocument.querySelector('parsererror').textContent));errors.push(...parseErrors);const dom=await page.locator('body').evaluate(e=>({nodes:e.querySelectorAll('*').length,text:e.innerText.length}));const screenshot=path.join(ROOT,'.work','verification',c.id+(online?'-live':'')+'.png');await page.screenshot({path:screenshot});const stats=await sharp(screenshot).stats();const variation=Math.max(...stats.channels.slice(0,3).map(x=>x.stdev));const good=!!response?.ok()&&(canvases>0||svg>0||dom.nodes>30)&&variation>10&&!errors.length&&!requests.length;
  result={id:c.id,ok:good,http:response?.status(),canvases,svg,dom,variation:Math.round(variation),errors:[...new Set(errors)],requests,screenshot:path.basename(screenshot)};
  if(!online){const dir=await caseDir(c.id);const priorReview=good?c.verification?.manualReview:undefined;if(good){c.status='verified';await fs.mkdir(path.join(dir,'media'),{recursive:true});await sharp(screenshot).resize({width:1500,withoutEnlargement:true}).webp({quality:88}).toFile(path.join(dir,'media','verified-cover.webp'));c.cover='verified-cover.webp';if(!c.gallery.includes('verified-cover.webp'))c.gallery.unshift('verified-cover.webp');}else c.status='runtime-failed';c.verification={date:new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()),summary:good?'独立发布路径加载成功，无脚本异常；保存实际渲染画面供人工复核。':'展示检查发现问题，详见验证记录。',errors:result.errors,requests:result.requests,manualReview:priorReview};await writeJson(path.join(dir,'case.json'),c);}
 }catch(e){result={id:c.id,ok:false,error:e.message};if(!online){c.status='runtime-failed';c.verification={date:new Date().toISOString(),summary:e.message,errors:[e.message]};await writeJson(path.join(await caseDir(c.id),'case.json'),c);}}
 results.push(result);console.log(JSON.stringify(result));await context.close();
}}));
await browser.close();await writeJson(path.join(ROOT,'.work','verification',online?'live-results.json':'local-results.json'),results);if(results.some(r=>!r.ok))process.exitCode=1;
