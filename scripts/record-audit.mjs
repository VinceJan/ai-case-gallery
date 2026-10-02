import fs from 'node:fs/promises';
import path from 'node:path';
import {ROOT,caseDir,hash,fingerprint,writeJson} from './lib.mjs';
import {sameArtifact} from './verification.mjs';
const args=process.argv.slice(2),report=args[args.indexOf('--report')+1],summary=args[args.indexOf('--reviewed')+1];
if(!args.includes('--report')||!args.includes('--reviewed')||!summary?.trim())throw Error('用法：node scripts/record-audit.mjs --report 报告.json --reviewed "实际画面人工复核说明"');
const results=JSON.parse(await fs.readFile(path.resolve(ROOT,report),'utf8'));const selected=args.filter(s=>s.startsWith('--id=')).map(s=>s.slice(5));const items=results.filter(r=>!selected.length||selected.includes(r.id));
if(!items.length||selected.some(id=>!items.some(r=>r.id===id)))throw Error('报告没有对应案例');
// 先检查整个批次，避免中途遇到失效证据留下部分更新。
const prepared=[];
for(const r of items){const dir=await caseDir(r.id),c=JSON.parse(await fs.readFile(path.join(dir,'case.json'),'utf8'));if(!r.ok||r.evidenceVersion!==2||!sameArtifact(c,r))throw Error('报告未通过或对应旧产物：'+r.id);for(const kind of ['source','demo'])if((await fingerprint(path.join(dir,kind))).sha256!==c[kind+'Fingerprint'])throw Error('实际产物已变化：'+r.id);const screenshot=path.join(ROOT,'.work/verification',path.basename(r.screenshot));if(hash(await fs.readFile(screenshot))!==r.screenshotHash)throw Error('截图与报告不一致：'+r.id);prepared.push({dir,c,r});}
for(const {dir,c,r} of prepared){c.verification={...r,summary:c.adapter==='svg'?'已检查完整 SVG 画面与浏览器渲染。':r.actions.length?'已检查实际场景与入口、基础交互。':'已检查作品加载与实际场景画面。',manualReview:{date:new Date().toISOString(),summary,sourceFingerprint:c.sourceFingerprint,demoFingerprint:c.demoFingerprint}};await writeJson(path.join(dir,'case.json'),c);}
console.log('已登记 '+prepared.length+' 个当前产物的复核记录。');
