import sharp from 'sharp';

export async function mainCanvas(page) {
 const sizes=await page.locator('canvas').evaluateAll(elements=>elements.map((e,index)=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {index,width:r.width,height:r.height,area:r.width*r.height,visible:s.visibility!=='hidden'&&s.display!=='none'&&r.width>0&&r.height>0};}).filter(e=>e.visible).sort((a,b)=>b.area-a.area));
 return sizes.length?page.locator('canvas').nth(sizes[0].index):null;
}

export async function enterWork(page,c,actions=[]) {
 await page.bringToFront();
 if(c.entryAction?.selector) {
  await page.locator(c.entryAction.selector).first().click({timeout:15000,noWaitAfter:true});actions.push('指定入口');
 } else if(c.legacyIds?.includes('sakura-bunnyalpha-pi-short-v2')) {
  await page.keyboard.press('Enter');actions.push('Enter 进入');
 } else {
  const buttons=page.getByRole('button',{name:/开\s*始|进入|踏\s*入|新的(?:春假|生活)|新游戏|^播放$|Click to Enter|ENTER THE WORLD|\bSTART\b|^PLAY$|\bDEPLOY\b/i});
  const count=await buttons.count();
  for(let i=0;i<count;i++){const b=buttons.nth(i);if(await b.isVisible()){actions.push((await b.innerText()).trim().slice(0,70));await b.click({timeout:20000,noWaitAfter:true});break;}}
  if(!actions.length){for(const selector of ['#click-start','#overlay','#start-screen']){const entry=page.locator(selector).first();if(await entry.count()&&await entry.isVisible()&&await entry.innerText().then(t=>/点击.*(?:世界|进入|开始)|click to (?:enter|start)/i.test(t))){await entry.click({timeout:15000,noWaitAfter:true});actions.push('开始层');break;}}}
 }
 await page.waitForTimeout(actions.length?4000:1200);
 if(['mythos-craft','cs-dust2','minecraft'].includes(c.topic)) {
  const canvas=await mainCanvas(page);
  if(canvas&&await canvas.isVisible()){
   const box=await canvas.boundingBox();
   // 按实际画布尺寸点击中心，不能把 176px 小地图当成游戏主画布。
   if(!await page.evaluate(()=>!!document.pointerLockElement))await canvas.click({position:{x:box.width/2,y:box.height/2},timeout:15000,noWaitAfter:true});
   if(await page.evaluate(()=>!!document.pointerLockElement)){await page.mouse.move(box.x+box.width/2+140,box.y+box.height/2);actions.push('锁定鼠标 / 转向');}
   await page.keyboard.down('w');await page.waitForTimeout(800);await page.keyboard.up('w');actions.push('W 移动');
   if(c.topic==='cs-dust2'){await page.keyboard.press('Digit2');await page.mouse.click(box.x+box.width/2,box.y+box.height/2);actions.push('切换武器 / 开火');}
   await page.waitForTimeout(2000);
  }
 }
 if(c.topic==='skeleton-watch'){
  let control=page.getByRole('button',{name:/爆炸|explode|exploded/i}).first();if(!await control.count())control=page.locator('button[id*="explode" i]').first();
  if(await control.count()&&await control.isVisible()){const button=await control.elementHandle();await button.click({timeout:15000});actions.push('机芯展开');await page.waitForTimeout(1600);await button.click({timeout:15000});actions.push('机芯收起');await page.waitForTimeout(1400);}
 }
 return actions;
}

export async function renderEvidence(page) {
 const objectErrors=await page.locator('object[type="image/svg+xml"]').evaluateAll(es=>es.flatMap(e=>{if(!e.contentDocument)return ['SVG 未加载或文档不可读取'];const p=e.contentDocument.querySelector('parsererror');return p?[p.textContent]:[];}));
 const svgCount=await page.locator('svg:visible').count()+await page.locator('object[type="image/svg+xml"]').evaluateAll(es=>es.filter(e=>e.contentDocument?.querySelector('svg')&&!e.contentDocument.querySelector('parsererror')).length);
 const canvas=await mainCanvas(page);
 let canvasSize=null,canvasVariation=0;
 if(canvas){canvasSize=await canvas.boundingBox();const stats=await sharp(await canvas.screenshot()).stats();canvasVariation=Math.max(...stats.channels.slice(0,3).map(c=>c.stdev));}
 const menu=await page.locator('#click-start,#start-screen,#start-overlay,.start-overlay,#loader,#landing.visible').evaluateAll(es=>es.filter(e=>{const r=e.getBoundingClientRect();const s=getComputedStyle(e);return r.width>100&&r.height>100&&s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity)>0.4;}).map(e=>e.innerText.slice(0,100)));
 const largeSvg=await page.locator('svg,object[type="image/svg+xml"]').evaluateAll(es=>es.some(e=>{const r=e.getBoundingClientRect();return r.width>=200&&r.height>=150&&getComputedStyle(e).visibility!=='hidden'&&(e.localName==='svg'||!!e.contentDocument?.querySelector('svg')&&!e.contentDocument.querySelector('parsererror'));}));
 return {canvases:await page.locator('canvas:visible').count(),svg:svgCount,canvasSize,canvasVariation:Math.round(canvasVariation),objectErrors,blockingMenus:menu,rendered:largeSvg||!!canvasSize&&canvasSize.width>=200&&canvasSize.height>=150&&canvasVariation>5};
}
