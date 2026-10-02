import fs from 'node:fs/promises';
import path from 'node:path';
import {CASES,INCOMING,readCandidates,fingerprint} from './lib.mjs';
import {register,formatId,formatTitle} from './naming.mjs';
import {assertReady} from './verification.mjs';
export async function promoteCase(c){
 assertReady(c);
 if(c.id!==formatId(c,c.serial)||c.title!==formatTitle(c))throw Error('命名不符合规范');
 const dir=path.join(INCOMING,c.id);
 const stored=JSON.parse(await fs.readFile(path.join(dir,'case.json'),'utf8'));assertReady(stored);if(JSON.stringify(stored)!==JSON.stringify(c))throw Error('案例记录已更新，请重新读取后收录');
 for(const kind of ['source','demo'])if((await fingerprint(path.join(dir,kind))).sha256!==c[kind+'Fingerprint'])throw Error(kind+' 指纹不一致');
 await fs.rename(dir,path.join(CASES,c.id));await register(c);console.log('已发布收录 '+c.id);
}
if(process.argv[1]?.replaceAll('\\','/').endsWith('/promote-case.mjs')){for(const c of await readCandidates())if(process.argv.slice(2).includes(c.id))await promoteCase(c);}
