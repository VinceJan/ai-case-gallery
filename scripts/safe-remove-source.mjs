import fs from 'node:fs/promises';
import { assertSafeSourceRemoval } from './spec-utils.mjs';

const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const target = args.find((a) => !a.startsWith('--'));

const resolved = assertSafeSourceRemoval(target);
const exists = await fs.access(resolved).then(() => true).catch(() => false);
if (!exists) {
  if (checkOnly) {
    throw Error(`指定的原测试目录不存在：${resolved}`);
  }
  console.log(`原测试目录已不存在，跳过删除：${resolved}`);
  process.exit(0);
}

if (checkOnly) {
  console.log(`原测试目录删除校验通过：${resolved}`);
} else {
  await fs.rm(resolved, { recursive: true, force: true });
  console.log(`已安全删除原测试目录：${resolved}`);
}
