import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import {spawn} from 'node:child_process';
import {ROOT} from './lib.mjs';
const base='/ai-case-gallery/';const types={'.html':'text/html;charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.md':'text/plain;charset=utf-8'};
const root=path.join(ROOT,'dist');const server=http.createServer(async(req,res)=>{try{let p=decodeURIComponent(new URL(req.url,'http://local').pathname);if(p==='/favicon.ico'){res.writeHead(204);res.end();return;}if(!p.startsWith(base)){res.writeHead(404);res.end();return;}p=p.slice(base.length);if(p.endsWith('/')||!p)p+='index.html';const file=path.resolve(root,p);if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}const buffer=await fs.readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(buffer);}catch{res.writeHead(404);res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const port=server.address().port;const ids=process.argv.slice(2);const child=spawn(process.execPath,['scripts/verify-browser.mjs','--url=http://127.0.0.1:'+port+base,...ids.map(id=>'--id='+id)],{cwd:ROOT,stdio:'inherit'});const code=await new Promise(r=>{child.on('exit',r);child.on('error',()=>r(1));});await new Promise(r=>server.close(r));process.exitCode=code||0;
