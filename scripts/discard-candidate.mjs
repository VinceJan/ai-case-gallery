import fs from 'node:fs/promises';
import path from 'node:path';
import { INCOMING } from './lib.mjs';

const ids = process.argv.slice(2).filter((x) => !x.startsWith('--'));
if (!ids.length) {
  console.log('用法：npm run discard -- <incoming-case-id>');
  console.log('说明：仅删除 .work/incoming/ 下指定的失败或放弃候选（不会触碰正式 cases/ 目录）。');
  process.exit(1);
}

const incomingRoot = path.resolve(INCOMING);
for (const id of ids) {
  if (!/^[a-z0-9-]+$/.test(id)) {
    throw Error(`候选 ID 不合法：${id}`);
  }
  const target = path.resolve(incomingRoot, id);
  if (path.dirname(target) !== incomingRoot) {
    throw Error(`路径越界：${id}`);
  }
  const exists = await fs.access(target).then(() => true).catch(() => false);
  if (!exists) {
    throw Error(`.work/incoming/ 下未找到候选：${id}`);
  }
  await fs.rm(target, { recursive: true, force: true });
  console.log(`已移除本地候选：.work/incoming/${id}`);
}
