import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
const base=path.dirname(fileURLToPath(import.meta.url));
const result=await build({entryPoints:[path.join(base,'src/main.js')],bundle:true,write:false,minify:true,format:'iife',target:'es2020'});
const shell=fs.readFileSync(path.join(base,'src/shell.html'),'utf8');
fs.writeFileSync(path.join(base,'index.html'),shell.replace('/*__BUNDLE__*/',()=>result.outputFiles[0].text.replaceAll('</script','<\\/script')));
console.log('离线场景已生成：index.html');
