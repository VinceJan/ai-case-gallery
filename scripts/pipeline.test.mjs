import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {ROOT} from './lib.mjs';
const run=promisify(execFile);

test('真实导入/构建隔离依赖、保留静态素材，并使旧验收失效',async()=>{
 const base=await fs.mkdtemp(path.join(ROOT,'.work/pipeline-test-'));
 try{
  await fs.mkdir(path.join(base,'registry'));await fs.writeFile(path.join(base,'registry/topics.json'),'{}');await fs.writeFile(path.join(base,'package.json'),'{"private":true}');
  const source=path.join(base,'origin');await fs.mkdir(source);await fs.writeFile(path.join(source,'index.html'),'<html><script src="app.js"></script><img src="texture.png"></html>');await fs.writeFile(path.join(source,'app.js'),'fetch("scene.json")');await fs.writeFile(path.join(source,'scene.json'),'{"terrain":"kept"}');await fs.writeFile(path.join(source,'texture.png'),Buffer.from([1,2,3]));await fs.writeFile(path.join(source,'prompt.txt'),'真实提示词');await fs.writeFile(path.join(source,'.env'),'LOCAL_SECRET=excluded');
  const importUrl=pathToFileURL(path.join(ROOT,'scripts/import-case.mjs')).href,buildUrl=pathToFileURL(path.join(ROOT,'scripts/build-demo.mjs')).href,libUrl=pathToFileURL(path.join(ROOT,'scripts/lib.mjs')).href;
  const worker=`import fs from 'node:fs/promises';import path from 'node:path';import assert from 'node:assert/strict';const {importCase}=await import(${JSON.stringify(importUrl)});const {buildDemo}=await import(${JSON.stringify(buildUrl)});const {ROOT,INCOMING,readCandidates}=await import(${JSON.stringify(libUrl)});const spec={source:path.join(ROOT,'origin'),topic:'fixture',topicLabel:'测试',model:'Fixture',harness:'Pi',adapter:'static',prompt:'prompt.txt'};
const records=await Promise.all([importCase({...spec}),importCase({...spec})]);assert.notEqual(records[0].id,records[1].id);assert.equal((await readCandidates()).length,2);await assert.rejects(importCase({...spec,prompt:'missing.txt'}));assert.equal((await fs.readdir(INCOMING)).length,2);
const c=records[0];c.verification={manualReview:{summary:'旧检查'}};await buildDemo(c);assert.equal(c.status,'built');assert.equal(c.verification,null);const demo=path.join(INCOMING,c.id,'demo');for(const name of ['texture.png','scene.json'])await fs.access(path.join(demo,name));await assert.rejects(fs.access(path.join(INCOMING,c.id,'source/.env')));await fs.writeFile(path.join(demo,'obsolete.js'),'old');await buildDemo(c,{force:true});await assert.rejects(fs.access(path.join(demo,'obsolete.js')));
const html=path.join(ROOT,'single-html');await fs.mkdir(html);await fs.writeFile(path.join(html,'index.html'),'<html><head></head><script src="https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.min.js"></script></html>');const before=await fs.readFile(path.join(ROOT,'package.json'),'utf8');const h=await importCase({...spec,source:html,adapter:'html',prompt:null});await buildDemo(h);assert.equal(h.status,'built',h.buildError);assert.equal(await fs.readFile(path.join(ROOT,'package.json'),'utf8'),before);await fs.access(path.join(INCOMING,h.id,'demo/three.js'));
const modules=path.join(ROOT,'bundle-case');await fs.mkdir(modules);await fs.writeFile(path.join(modules,'package.json'),'{"private":true}');await fs.writeFile(path.join(modules,'index.html'),'<html><head></head><body><script type="module" src="main.js"></script></body></html>');await fs.writeFile(path.join(modules,'main.js'),'import "./style.css";document.body.textContent="scene";');await fs.writeFile(path.join(modules,'style.css'),'body{background-image:url(./texture.png)}');await fs.writeFile(path.join(modules,'texture.png'),Buffer.from([1,2,3]));const b=await importCase({...spec,source:modules,adapter:'bundle',prompt:null});await buildDemo(b);assert.equal(b.status,'built',b.buildError);assert.ok((await fs.readdir(path.join(INCOMING,b.id,'demo/assets'))).some(n=>n.endsWith('.png')));assert.ok((await fs.readFile(path.join(INCOMING,b.id,'demo/index.html'),'utf8')).includes('<style>'));console.log('隔离构建通过');`;
  const script=path.join(base,'worker.mjs');await fs.writeFile(script,worker);const result=await run(process.execPath,[script],{env:{...process.env,GALLERY_ROOT:base},timeout:120000,maxBuffer:200000});assert.ok(result.stdout.includes('隔离构建通过'));
 }finally{const parent=path.resolve(ROOT,'.work');if(path.dirname(base)!==parent)throw Error('测试临时路径越界');await fs.rm(base,{recursive:true,force:true});}
});
