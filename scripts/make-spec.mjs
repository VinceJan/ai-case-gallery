import fs from 'node:fs/promises';
import path from 'node:path';
const args=process.argv.slice(2),opts={};for(let i=0;i<args.length;i+=2)opts[args[i].replace(/^--/,'')]=args[i+1];
if(!opts.source)throw Error('请提供作品目录');const source=path.resolve(opts.source);const entries=await fs.readdir(source);let project='.';
if(!entries.includes('package.json')){for(const name of entries){const p=path.join(source,name);if((await fs.stat(p)).isDirectory()&&await fs.access(path.join(p,'package.json')).then(()=>true).catch(()=>false)){project=name;break;}}}
const files=await fs.readdir(path.join(source,project));let adapter='materials',entry='index.html';
if(files.includes('package.json')){const pkg=JSON.parse(await fs.readFile(path.join(source,project,'package.json'),'utf8'));if(pkg.dependencies?.vite||pkg.devDependencies?.vite)adapter='vite';else if(pkg.scripts?.build)adapter='custom';else if(files.includes('src'))adapter='bundle';else adapter='static';}
else{const html=files.find(f=>f.endsWith('.html')),svg=files.find(f=>f.endsWith('.svg'));if(html){adapter='html';entry=html;}else if(svg){adapter='svg';entry=svg;}}
const prompt=opts.prompt||entries.find(f=>/prompt|提示词|sakura_town|castle\.txt|store\.txt/i.test(f)&&/\.(md|txt)$/.test(f));
if(!opts.model||!opts.harness||!opts.topic)throw Error('请提供 model、harness、topic；名称由导入脚本统一生成');
const spec={source,topic:opts.topic,topicLabel:opts.title,model:opts.model,harness:opts.harness,variant:opts.variant||'default',modelEvidence:'用户收录时提供',adapter,project,entry,date:new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()),prompt:prompt?path.resolve(source,prompt):null};
await fs.writeFile(opts.out,JSON.stringify(spec,null,2));console.log(opts.out);
