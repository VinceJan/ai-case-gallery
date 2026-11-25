import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(
    [
      '用法：npm run spec -- --source <作品目录> --topic <英文题目> --model <模型名> --harness <Harness名> [可选参数]',
      '可选参数：',
      '  --out <路径>              输出 JSON 路径（默认 .work/spec.json）',
      '  --title <中文题目>        新题目时的中文显示名（已有 topic 自动查表）',
      '  --variant <版本>          提示词/配置版本（默认 default）',
      '  --effort <强度>           思考强度，如 high / xhigh / max',
      '  --adapter <适配方式>      强制指定 vite / bundle / custom / html / static / svg',
      '  --prompt <文件路径>       提示词文件（相对作品目录或绝对路径）',
      '  --prompt-text <文本>      直接写入提示词正文',
      '  --model-evidence <说明>   模型与配置来源依据',
      '  --exact-model-id <ID>     精确 API 模型标识（未知可不填）',
      '  --description <简介>      页面展示简介',
      '  --controls <操作说明>     交互与控制方式说明',
    ].join('\n')
  );
  process.exit(0);
}

const opts = {};
for (let i = 0; i < args.length; i += 2) {
  opts[args[i].replace(/^--/, '')] = args[i + 1];
}

if (!opts.source) throw Error('请提供作品目录（--source）');
if (!opts.model || !opts.harness || !opts.topic) {
  throw Error('请提供 --model、--harness、--topic；ID 与标题由导入脚本统一生成');
}

const source = path.resolve(opts.source);
const entries = await fs.readdir(source);
let project = '.';
if (!entries.includes('package.json')) {
  for (const name of entries) {
    const p = path.join(source, name);
    if (
      (await fs.stat(p)).isDirectory() &&
      (await fs.access(path.join(p, 'package.json')).then(() => true).catch(() => false))
    ) {
      project = name;
      break;
    }
  }
}

const files = await fs.readdir(path.join(source, project));
let adapter = opts.adapter || 'materials';
let entry = opts.entry || 'index.html';

if (!opts.adapter) {
  if (files.includes('package.json')) {
    const pkg = JSON.parse(await fs.readFile(path.join(source, project, 'package.json'), 'utf8'));
    if (pkg.dependencies?.vite || pkg.devDependencies?.vite) adapter = 'vite';
    else if (pkg.scripts?.build) adapter = 'custom';
    else if (files.includes('src')) adapter = 'bundle';
    else adapter = 'static';
  } else {
    const html = files.find((f) => f.endsWith('.html'));
    const svg = files.find((f) => f.endsWith('.svg'));
    if (html) {
      adapter = 'html';
      entry = html;
    } else if (svg) {
      adapter = 'svg';
      entry = svg;
    }
  }
}

const detectedPrompt =
  opts.prompt ||
  entries.find((f) => /prompt|提示词|sakura_town|castle\.txt|store\.txt/i.test(f) && /\.(md|txt)$/.test(f));

const todayShanghai = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());

const spec = {
  source,
  topic: opts.topic,
  ...(opts.title ? { topicLabel: opts.title } : {}),
  model: opts.model,
  harness: opts.harness,
  variant: opts.variant || 'default',
  ...(opts.effort ? { effort: opts.effort } : {}),
  date: opts.date || todayShanghai,
  adapter,
  project,
  entry,
  exactModelId: opts['exact-model-id'] || null,
  modelEvidence: opts['model-evidence'] || '用户收录时提供',
  ...(opts['prompt-text']
    ? { promptText: opts['prompt-text'] }
    : { prompt: detectedPrompt ? path.resolve(source, detectedPrompt) : null }),
  ...(opts.description ? { description: opts.description } : {}),
  ...(opts.controls ? { controls: opts.controls } : {}),
};

const outPath = path.resolve(ROOT, opts.out || '.work/spec.json');
await fs.mkdir(path.dirname(outPath), { recursive: true });
await fs.writeFile(outPath, JSON.stringify(spec, null, 2) + '\n');
console.log('已生成 spec：' + outPath);
