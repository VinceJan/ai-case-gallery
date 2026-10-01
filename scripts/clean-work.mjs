import fs from 'node:fs/promises';
import path from 'node:path';
import {ROOT} from './lib.mjs';
const buildRoot=path.resolve(ROOT,'.work/build');const ids=process.argv.slice(2);const targets=ids.length?ids.map(id=>path.resolve(buildRoot,id)):[buildRoot];
for(const target of targets){if(target!==buildRoot&&!target.startsWith(buildRoot+path.sep))throw Error('清理路径不在临时构建目录内');if(!buildRoot.startsWith(path.resolve(ROOT,'.work')+path.sep))throw Error('临时根目录校验失败');await fs.rm(target,{recursive:true,force:true});console.log('已清理临时依赖：'+path.basename(target));}
