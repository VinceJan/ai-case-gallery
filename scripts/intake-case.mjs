import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { ROOT } from './lib.mjs';
import { importCase } from './import-case.mjs';
import { buildDemo } from './build-demo.mjs';

function runNode(scriptRel, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptRel, ...args], {
      cwd: ROOT,
      stdio: 'inherit',
    });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(Error(`${scriptRel} 退出码 ${code}`));
    });
  });
}

function usage() {
  console.log(
    [
      '用法：npm run intake -- --spec .work/spec.json',
      '说明：一键执行「导入候选 → 独立构建 demo → 本地浏览器验收」，完成后输出截图路径与下一步复核命令。',
    ].join('\n')
  );
}

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  usage();
  process.exit(0);
}

const specIdx = args.indexOf('--spec');
const specPath = specIdx !== -1 ? args[specIdx + 1] : path.join(ROOT, '.work/spec.json');
if (!specPath) {
  usage();
  throw Error('缺少 spec 路径');
}

const raw = JSON.parse(await fs.readFile(path.resolve(ROOT, specPath), 'utf8'));
const specs = Array.isArray(raw) ? raw : [raw];
const imported = [];

for (const spec of specs) {
  console.log(`\n[1/3] 导入候选：${spec.topic || '?'} / ${spec.model || '?'} / ${spec.harness || '?'}`);
  const record = await importCase(spec);

  console.log(`[2/3] 独立构建展示版：${record.id}`);
  const built = await buildDemo(record, { force: true });
  if (built.status !== 'built') {
    throw Error(`构建失败（候选已保留在 .work/incoming/${record.id}）：${built.buildError || '未知错误'}`);
  }

  console.log(`[3/3] 浏览器加载与渲染验收：${record.id}`);
  await runNode('scripts/verify-new.mjs', [record.id]);
  imported.push(built);
}

console.log('\n============================================================');
console.log(`候选自动验收通过（共 ${imported.length} 条）。请查看实际画面后再转正收录：`);
for (const r of imported) {
  const shot = path.join(ROOT, '.work/verification', `${r.id}.png`);
  console.log(`\n- ID: ${r.id}`);
  console.log(`  标题: ${r.title}`);
  console.log(`  截图: ${shot}`);
  console.log(`  1) 登记画面复核: npm run review -- ${r.id} "具体看到了什么，操作结果是什么"`);
  console.log(`  2) 移入正式案例: npm run promote -- ${r.id}`);
}
const idsArg = imported.map((r) => r.id).join(',');
console.log(
  `\n  3) 发布并核验线上: ./Publish-Cases.ps1 -Message "Add verified case" -VerifyOnlineIds ${idsArg}`
);
console.log('============================================================\n');
