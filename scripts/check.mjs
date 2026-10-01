import fs from 'node:fs/promises';
import path from 'node:path';
import {CASES,readCases,fingerprint,hash,walk} from './lib.mjs';
import {spawnSync} from 'node:child_process';
const indexed=process.argv.includes('--tracked')?new Set(spawnSync('git',['ls-files','-z'],{encoding:'utf8'}).stdout.split('\0')):null;
let failed=false;const records=await readCases();const seen=new Set();
for(const c of records){const dir=path.join(CASES,c.id);const issues=[];if(seen.has(c.id))issues.push('重复 ID');seen.add(c.id);if(!c.model||!c.harness||!c.title)issues.push('缺少元信息');if((await fingerprint(path.join(dir,'source'))).sha256!==c.sourceFingerprint)issues.push('源码文件指纹不一致');if(c.demoFingerprint&&(await fingerprint(path.join(dir,'demo'))).sha256!==c.demoFingerprint)issues.push('展示产物指纹不一致');if(c.promptHash&&hash(await fs.readFile(path.join(dir,'prompt.md')))!==c.promptHash)issues.push('提示词指纹不一致');if(c.cover)await fs.access(path.join(dir,'media',c.cover)).catch(()=>issues.push('封面缺失'));
 for(const f of await walk(path.join(dir,'source'))){const rel=path.relative(dir,f);if(rel.split(path.sep).some(s=>s==='node_modules'||s==='.git')||/^\.env(?:\.|$)/.test(path.basename(f)))issues.push('包含排除文件 '+rel);if((await fs.stat(f)).size>100*1024*1024)issues.push('单文件过大 '+rel);if(/\.(json|js|ts|mjs|cjs|md|txt|html|yml|yaml|ps1|sh)$/.test(f)){const t=await fs.readFile(f,'utf8');if(/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|(?:sk-(?:proj-|ant-)?|gh[pousr]_|github_pat_)[A-Za-z0-9_-]{24,}|AKIA[0-9A-Z]{16}/.test(t))issues.push('疑似凭据，需先检查该文件 '+rel);}}
 if(indexed){for(const f of await walk(dir)){const rel=path.relative(process.cwd(),f).replaceAll('\\','/');if(!indexed.has(rel))issues.push('文件未进入 Git 提交：'+rel);}}
 if(issues.length){failed=true;console.error(c.id+': '+issues.join('；'));}
}
if(failed)process.exitCode=1;else console.log('通过：'+records.length+' 个案例的元信息、提示词、源码和展示产物指纹一致。');
