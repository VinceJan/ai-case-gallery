import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const args = process.argv.slice(2);
const cleanAll = args.includes('--all');
const ids = args.filter((x) => !x.startsWith('--'));

const workRoot = path.resolve(ROOT, '.work');
const buildRoot = path.resolve(workRoot, 'build');

async function safeRemove(target, allowedParent) {
  const resolved = path.resolve(target);
  if (resolved !== allowedParent && !resolved.startsWith(allowedParent + path.sep)) {
    throw Error('清理路径越界：' + target);
  }
  const existed = await fs.access(resolved).then(() => true).catch(() => false);
  if (!existed) return false;
  await fs.rm(resolved, { recursive: true, force: true });
  return true;
}

if (cleanAll) {
  const removed = [];

  // 1. Clean temporary build dependencies, verification screenshots/reports, and spec/logs in .work
  //    NOTE: .work/incoming/ is NEVER removed so pending/excluded candidates stay safe.
  for (const name of ['build', 'verification', 'spec.json']) {
    if (await safeRemove(path.join(workRoot, name), workRoot)) {
      removed.push('.work/' + name);
    }
  }

  const workEntries = await fs.readdir(workRoot, { withFileTypes: true }).catch(() => []);
  for (const entry of workEntries) {
    if (entry.name.startsWith('cloud-check-') || entry.name.endsWith('.log')) {
      if (await safeRemove(path.join(workRoot, entry.name), workRoot)) {
        removed.push('.work/' + entry.name);
      }
    }
  }

  // 2. Clean regenerated static site build outputs (all gitignored)
  for (const rel of ['dist', '.astro', 'public/generated']) {
    if (await safeRemove(path.join(ROOT, rel), ROOT)) {
      removed.push(rel);
    }
  }

  if (removed.length) {
    console.log('已清理本地临时产物与构建目录：' + removed.join('、'));
  } else {
    console.log('本地工作区已干净，无需清理。');
  }
  console.log('已保留 .work/incoming/（待处理或排除的历史候选目录）。');
} else {
  const targets = ids.length ? ids.map((id) => path.resolve(buildRoot, id)) : [buildRoot];
  for (const target of targets) {
    if (target !== buildRoot && !target.startsWith(buildRoot + path.sep)) {
      throw Error('清理路径不在临时构建目录内');
    }
    if (!buildRoot.startsWith(workRoot + path.sep)) {
      throw Error('临时根目录校验失败');
    }
    await fs.rm(target, { recursive: true, force: true });
    console.log('已清理临时依赖：' + path.basename(target));
  }
}
