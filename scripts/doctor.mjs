import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { ROOT, INCOMING, readCases } from './lib.mjs';

const checks = [];

function record(ok, name, detail) {
  checks.push({ ok, name, detail });
  const mark = ok ? '✓' : '✗';
  console.log(`${mark} ${name}: ${detail}`);
}

// 1. Node version
const major = Number(process.versions.node.split('.')[0]);
record(major >= 22, 'Node.js', `v${process.versions.node}${major >= 22 ? '' : '（建议 Node 24）'}`);

// 2. Dependencies
const hasModules = await fs.access(path.join(ROOT, 'node_modules')).then(() => true).catch(() => false);
record(hasModules, '依赖目录', hasModules ? 'node_modules 已就绪' : '缺少 node_modules，请先运行 npm ci');

// 3. Browser availability
const edgePath = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const hasEdge = await fs.access(edgePath).then(() => true).catch(() => false);
record(true, '渲染浏览器', hasEdge ? '本机 Microsoft Edge 可用' : '将回退 Playwright Chromium');

// 4. Git status & branch
const gitBranch = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { cwd: ROOT, encoding: 'utf8' });
const gitStatus = spawnSync('git', ['status', '--short'], { cwd: ROOT, encoding: 'utf8' });
record(
  gitBranch.status === 0,
  'Git 仓库',
  gitBranch.status === 0
    ? `分支 ${gitBranch.stdout.trim()}，${gitStatus.stdout.trim() ? '存在未提交改动' : '工作区干净'}`
    : 'Git 不可用'
);

// 5. GitHub CLI auth
const gh = spawnSync('gh', ['auth', 'status'], { cwd: ROOT, encoding: 'utf8' });
record(
  gh.status === 0,
  'GitHub CLI (gh)',
  gh.status === 0 ? '已登录，可直接发布并监控 Pages' : '未登录或未安装（仅影响推送后自动监控）'
);

// 6. Registry & Cases count
try {
  const cases = await readCases();
  const incoming = (await fs.readdir(INCOMING, { withFileTypes: true }).catch(() => []))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  record(true, '案例与待处理区', `已收录 ${cases.length} 个正式案例；.work/incoming 中有 ${incoming.length} 个待处理/保留候选`);
} catch (err) {
  record(false, '案例与词表', err.message);
}

const failed = checks.filter((c) => !c.ok);
if (failed.length) {
  process.exitCode = 1;
} else {
  console.log('\n环境体检全部通过，可直接执行收录与发布流程。');
}
