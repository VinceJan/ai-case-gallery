import fs from 'node:fs/promises';
import path from 'node:path';
import {CASES,INCOMING,readCandidates,fingerprint} from './lib.mjs';
import {register,formatId,formatTitle} from './naming.mjs';
export async function promoteCase(c){
 if(c.status!=='verified'||!c.cover||!c.demoFingerprint||!c.verification?.manualReview)throw Error('必须通过浏览器和画面人工复核才能发布：'+c.id);
 if(c.id!==formatId(c,c.serial)||c.title!==formatTitle(c))throw Error('命名不符合规范');
 const dir=path.join(INCOMING,c.id);
 for(const kind of ['source','demo'])if((await fingerprint(path.join(dir,kind))).sha256!==c[kind+'Fingerprint'])throw Error(kind+' 指纹不一致');
 await fs.rename(dir,path.join(CASES,c.id));await register(c);console.log('已发布收录 '+c.id);
}
if(process.argv[1]?.replaceAll('\\','/').endsWith('/promote-case.mjs')){for(const c of await readCandidates())if(process.argv.slice(2).includes(c.id))await promoteCase(c);}
