import fs from 'node:fs/promises';
import path from 'node:path';
const args=process.argv.slice(2),opts={};for(let i=0;i<args.length;i+=2)opts[args[i].replace(/^--/,'')]=args[i+1];
if(!opts.source)throw Error('请提供作品目录');const source=path.resolve(opts.source);const entries=await fs.readdir(source);let project='.';
if(!entries.includes('package.json')){for(const name of entries){const p=path.join(source,name);if((await fs.stat(p)).isDirectory()&&await fs.access(path.join(p,'package.json')).then(()=>true).catch(()=>false)){project=name;break;}}}
const files=await fs.readdir(path.join(source,project));let adapter='materials',entry='index.html';
if(files.includes('package.json')){const pkg=JSON.parse(await fs.readFile(path.join(source,project,'package.json'),'utf8'));if(pkg.dependencies?.vite||pkg.devDependencies?.vite)adapter='vite';else if(pkg.scripts?.build)adapter='custom';else if(files.includes('src'))adapter='bundle';else adapter='static';}
else{const html=files.find(f=>f.endsWith('.html'));if(html){adapter='html';entry=html;}}
const prompt=opts.prompt||entries.find(f=>/prompt|提示词|sakura_town|castle\.txt|store\.txt/i.test(f)&&/\.(md|txt)$/.test(f));
const stamp=new Date().toISOString().replace(/[-:.TZ]/g,'').slice(0,17);const slug=path.basename(source).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40)||'case';
const spec={source,id:'run-'+stamp+'-'+slug,title:opts.title||path.basename(source),topic:opts.topic||'other',model:opts.model||'模型未记录',harness:opts.harness||'Harness 未记录',modelEvidence:opts.model?'用户收录时提供':'未找到记录',adapter,project,entry,date:new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()),prompt:prompt?path.resolve(source,prompt):null};
await fs.writeFile(opts.out,JSON.stringify(spec,null,2));console.log(spec.id);
