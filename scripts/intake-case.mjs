import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { ROOT, INCOMING } from './lib.mjs';
import { components } from './naming.mjs';
import { importCase } from './import-case.mjs';
import { buildDemo } from './build-demo.mjs';
import { prepareAndValidateSpec } from './spec-utils.mjs';

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
      '说明：自动校验并补全 spec（可自动探测 adapter/project/entry/date），依次执行',
      '     「导入候选 → 独立构建 demo → 本地浏览器验收」，完成后输出截图路径与一键发布命令。',
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
const rawSpecs = Array.isArray(raw) ? raw : [raw];

// Fail-fast: validate & auto-detect every spec before writing anything to .work/incoming/
const validatedSpecs = [];
const existingIncoming = (await fs.readdir(INCOMING, { withFileTypes: true }).catch(() => []))
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

for (const rawSpec of rawSpecs) {
  const spec = await prepareAndValidateSpec(rawSpec);
  const c = components(spec);
  const prefix = `${c.topic}--${c.model}--${c.harness}--${c.variant}--r`;
  const pendingMatches = existingIncoming.filter((name) => name.startsWith(prefix));
  if (pendingMatches.length) {
    console.log(
      `提示：.work/incoming/ 中已有同组合待处理候选（${pendingMatches.join(', ')}），本次将分配新序号；若需重试旧候选可先执行 npm run discard -- <ID>。`
    );
  }
  validatedSpecs.push(spec);
}

const imported = [];
for (const spec of validatedSpecs) {
  console.log(`\n[1/3] 导入候选：${spec.topic} / ${spec.model} / ${spec.harness} (adapter=${spec.adapter})`);
  const record = await importCase(spec);

  console.log(`[2/3] 独立构建展示版：${record.id}`);
  const built = await buildDemo(record, { force: true });
  if (built.status !== 'built') {
    throw Error(`构建失败（候选已保留在 .work/incoming/${record.id}）：${built.buildError || '未知错误'}`);
  }

  console.log(`[3/3] 浏览器加载与渲染验收：${record.id}`);
  await runNode('scripts/verify-new.mjs', [record.id]);
  imported.push({ record: built, sourceDir: spec.source });
}

console.log('\n============================================================');
console.log(`候选自动验收通过（共 ${imported.length} 条）。请先查看实际截图，确认无误后执行一步发布：`);
for (const { record, sourceDir } of imported) {
  const shot = path.join(ROOT, '.work/verification', `${record.id}.png`);
  console.log(`\n- ID: ${record.id}`);
  console.log(`  标题: ${record.title}`);
  console.log(`  截图: ${shot}`);
  console.log(`  一键复核、收录、推送、云端核验并清理：`);
  console.log(
    `  ./Publish-Cases.ps1 -PromoteId "${record.id}" -Review "已复核 1280x800 实际渲染画面：..."`
  );
  console.log(`  （若用户已明确授权删除原测试目录，追加参数：-RemoveSource "${sourceDir}"）`);
}
console.log('============================================================\n');
