import {test} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {mainCanvas,renderEvidence,enterWork} from './browser-checks.mjs';

test('浏览器检查选主画布，拒绝空白画布、加载层和损坏 SVG',async()=>{
 const browser=await chromium.launch({executablePath:process.platform==='win32'?'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe':undefined,headless:true});
 try{const page=await browser.newPage();
  await page.setContent('<canvas id="map" width="176" height="176"></canvas><canvas id="world" width="600" height="300"></canvas>');
  assert.equal(await (await mainCanvas(page)).getAttribute('id'),'world');assert.equal((await renderEvidence(page)).rendered,false);
  await page.locator('#world').evaluate(c=>{const g=c.getContext('2d');g.fillStyle='red';g.fillRect(0,0,300,300);g.fillStyle='blue';g.fillRect(300,0,300,300);});assert.equal((await renderEvidence(page)).rendered,true);
  await page.locator('body').evaluate(e=>e.insertAdjacentHTML('beforeend','<div id="loader" style="position:fixed;inset:0;background:white">loading</div>'));assert.equal((await renderEvidence(page)).blockingMenus.length,1);
  await page.setContent('<svg width="16" height="16"><rect width="16" height="16"/></svg>');assert.equal((await renderEvidence(page)).rendered,false);
  await page.setContent('<object type="image/svg+xml" style="width:600px;height:300px" data="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cbroken%3E%3C/svg%3E"></object>');await page.waitForTimeout(500);const bad=await renderEvidence(page);assert.equal(bad.rendered,false);assert.ok(bad.objectErrors.length);
  await page.setContent('<button id="toggle" onclick="this.textContent=this.textContent===\'Explode\'?\'Assemble\':\'Explode\'">Explode</button>');const actions=await enterWork(page,{topic:'skeleton-watch'});assert.equal(await page.locator('#toggle').innerText(),'Explode');assert.deepEqual(actions,['机芯展开','机芯收起']);
 }finally{await browser.close();}
});
