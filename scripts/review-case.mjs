import path from 'node:path';
import fs from 'node:fs/promises';
import {caseDir,writeJson} from './lib.mjs';
const [id,...description]=process.argv.slice(2);if(!id||!description.length)throw Error('用法：node scripts/review-case.mjs <id> <实际画面复核说明>');
const dir=await caseDir(id),c=JSON.parse(await fs.readFile(path.join(dir,'case.json'),'utf8'));if(c.status!=='verified')throw Error('先通过浏览器验证');c.verification.manualReview={date:new Date().toISOString(),summary:description.join(' ')};await writeJson(path.join(dir,'case.json'),c);
