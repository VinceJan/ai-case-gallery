import path from 'node:path';
import fs from 'node:fs/promises';
import {caseDir,writeJson,fingerprint} from './lib.mjs';
import {verificationCurrent} from './verification.mjs';
const [id,...description]=process.argv.slice(2);if(!id||!description.length)throw Error('用法：node scripts/review-case.mjs <id> <实际画面复核说明>');
const dir=await caseDir(id),c=JSON.parse(await fs.readFile(path.join(dir,'case.json'),'utf8'));if(c.status!=='verified'||!verificationCurrent(c))throw Error('先通过当前产物的浏览器验证');for(const kind of ['source','demo'])if((await fingerprint(path.join(dir,kind))).sha256!==c[kind+'Fingerprint'])throw Error('产物已变化，先重新验证');c.verification.manualReview={date:new Date().toISOString(),summary:description.join(' '),sourceFingerprint:c.sourceFingerprint,demoFingerprint:c.demoFingerprint};await writeJson(path.join(dir,'case.json'),c);
