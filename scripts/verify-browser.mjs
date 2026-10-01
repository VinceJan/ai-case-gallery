import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import {chromium} from 'playwright';
import {ROOT,CASES,readCases,writeJson} from './lib.mjs';
const origin=process.argv.find(x=>x.startsWith('--url='))?.slice(6)||'http://127.0.0.1:4321/ai-case-gallery/';
const ids=process.argv.filter(x=>x.startsWith('--id=')).map(x=>x.slice(5));const online=process.argv.includes('--online');
const edge='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';const executablePath=await fs.access(edge).then(()=>edge).catch(()=>undefined);
const browser=await chromium.launch({executablePath,headless:true,args:['--use-angle=gl','--enable-webgl','--ignore-gpu-blocklist']});
await fs.mkdir(path.join(ROOT,'.work','verification'),{recursive:true});
const records=(await readCases()).filter(c=>c.demoFingerprint&&(!ids.length||ids.includes(c.id)));const results=[];
for(const c of records){
 const context=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1});const page=await context.newPage();const errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/favicon|net::ERR_|fonts\.google|Failed to load resource/.test(m.text()))errors.push(m.text());});page.on('response',r=>{if(r.url().startsWith(new URL(origin).origin)&&r.status()>=400&&!r.url().endsWith('/favicon.ico'))requests.push(r.status()+' '+r.url());});let result;
 try{
  const response=await page.goto(origin+'generated/demos/'+c.id+'/',{waitUntil:'networkidle',timeout:45000});await page.waitForTimeout(4500);
  if(c.topic==='sakura-town'){
   const buttons=await page.getByRole('button').allTextContents();console.log(JSON.stringify({id:c.id,entryButtons:buttons.map(t=>t.trim()).filter(Boolean).slice(0,12)}));
   const enter=page.getByRole('button',{name:/^(?:开\s*始|开始.*|新.*|进入.*|Click to Enter.*|新的生活)$/i}).first();
   if(await enter.count())await enter.click();else if(c.id==='sakura-bunnyalpha-pi-short-v2')await page.keyboard.press('Enter');else{const text=page.getByText(/Click to Enter Town|进入小镇/, {exact:false}).first();if(await text.count())await text.click();}
   await page.waitForTimeout(5500);
  }
  if(c.id==='minecraft-sol'){const enter=page.getByRole('button',{name:/ENTER THE WORLD/i});if(await enter.count())await enter.click();await page.waitForTimeout(3500);await page.keyboard.press('Digit2');await page.keyboard.down('w');await page.waitForTimeout(300);await page.keyboard.up('w');}
  const canvases=await page.locator('canvas:visible').count();const screenshot=path.join(ROOT,'.work','verification',c.id+(online?'-live':'')+'.png');await page.screenshot({path:screenshot});const stats=await sharp(screenshot).stats();const variation=Math.max(...stats.channels.slice(0,3).map(x=>x.stdev));const good=!!response?.ok()&&canvases>0&&variation>10&&!errors.length&&!requests.length;
  result={id:c.id,ok:good,http:response?.status(),canvases,variation:Math.round(variation),errors:[...new Set(errors)],requests,screenshot:path.basename(screenshot)};
  if(!online){const dir=path.join(CASES,c.id);if(good){c.status='verified';await fs.mkdir(path.join(dir,'media'),{recursive:true});await sharp(screenshot).resize({width:1500,withoutEnlargement:true}).webp({quality:88}).toFile(path.join(dir,'media','verified-cover.webp'));c.cover='verified-cover.webp';if(!c.gallery.includes('verified-cover.webp'))c.gallery.unshift('verified-cover.webp');}else c.status='runtime-failed';c.verification={date:new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()),summary:good?'独立发布路径加载成功，页面无脚本异常，已检查实际场景画面。':'展示检查发现问题，详见验证记录。',errors:result.errors,requests:result.requests};await writeJson(path.join(dir,'case.json'),c);}
 }catch(e){result={id:c.id,ok:false,error:e.message};}
 results.push(result);console.log(JSON.stringify(result));await context.close();
}
await browser.close();await writeJson(path.join(ROOT,'.work','verification',online?'live-results.json':'local-results.json'),results);if(results.some(r=>!r.ok))process.exitCode=1;
