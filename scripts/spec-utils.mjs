import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT, topics } from './lib.mjs';

export const VALID_ADAPTERS = new Set(['vite', 'bundle', 'custom', 'html', 'static', 'svg']);

export function shanghaiToday() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

/**
 * Inspect a source directory to auto-detect project subdir, adapter, entry file, and prompt file.
 */
export async function detectProjectMeta(sourceDir) {
  const source = path.resolve(sourceDir);
  const stat = await fs.stat(source).catch(() => null);
  if (!stat || !stat.isDirectory()) {
    throw Error(`作品目录不存在或不是文件夹：${source}`);
  }

  const entries = await fs.readdir(source);
  let project = '.';
  if (!entries.includes('package.json')) {
    for (const name of entries) {
      const p = path.join(source, name);
      const isDir = await fs.stat(p).then((s) => s.isDirectory()).catch(() => false);
      if (isDir && (await fs.access(path.join(p, 'package.json')).then(() => true).catch(() => false))) {
        project = name;
        break;
      }
    }
  }

  const files = await fs.readdir(path.join(source, project));
  let adapter = 'materials';
  let entry = 'index.html';

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

  const detectedPrompt =
    entries.find(
      (f) => /prompt|提示词|sakura_town|castle\.txt|store\.txt/i.test(f) && /\.(md|txt)$/i.test(f)
    ) || null;

  return { source, project, adapter, entry, detectedPrompt };
}

/**
 * Validate and enrich a spec object before import (fail-fast before creating any incoming folder).
 */
export async function prepareAndValidateSpec(rawSpec) {
  if (!rawSpec || typeof rawSpec !== 'object') {
    throw Error('spec 必须是 JSON 对象');
  }

  const missing = ['source', 'topic', 'model', 'harness'].filter((k) => !rawSpec[k] || !String(rawSpec[k]).trim());
  if (missing.length) {
    throw Error(`spec 缺少必填字段：${missing.join('、')}`);
  }

  const detected = await detectProjectMeta(rawSpec.source);
  const spec = {
    ...rawSpec,
    source: detected.source,
    project: rawSpec.project || detected.project,
    entry: rawSpec.entry || detected.entry,
    adapter: rawSpec.adapter || detected.adapter,
    variant: rawSpec.variant || 'default',
    date: rawSpec.date || shanghaiToday(),
  };

  if (!VALID_ADAPTERS.has(spec.adapter)) {
    throw Error(
      `不支持的 adapter "${spec.adapter}"；可选值：${[...VALID_ADAPTERS].join(' / ')}（若是纯设计稿或无入口，不应收录）`
    );
  }

  if (!topics[spec.topic] && !spec.topicLabel) {
    throw Error(`"${spec.topic}" 是新题目，请同时在 spec 中提供中文 topicLabel`);
  }

  if (spec.date && !/^\d{4}-\d{2}-\d{2}$/.test(spec.date)) {
    throw Error(`date 格式应为 YYYY-MM-DD，当前为：${spec.date}`);
  }

  if (spec.prompt && !spec.promptText) {
    const pPath = path.resolve(spec.source, spec.prompt);
    const exists = await fs.access(pPath).then(() => true).catch(() => false);
    if (!exists) {
      throw Error(`指定的 prompt 文件不存在：${pPath}`);
    }
  }

  return spec;
}

/**
 * Validate that a candidate directory path is safe to delete when user explicitly passes -RemoveSource.
 */
export function assertSafeSourceRemoval(targetPath) {
  if (!targetPath || !String(targetPath).trim()) {
    throw Error('删除路径不能为空');
  }
  const resolved = path.resolve(targetPath);
  const rootPath = path.parse(resolved).root;
  const galleryRoot = path.resolve(ROOT);
  const galleryParent = path.dirname(galleryRoot);

  // Refuse drive roots, single-level folders like E:\tmp, home directory, or gallery/ancestor paths
  const parts = resolved.slice(rootPath.length).split(path.sep).filter(Boolean);
  if (resolved === rootPath || parts.length < 2) {
    throw Error(`安全拦截：拒绝删除根目录或顶层目录 (${resolved})`);
  }

  const normResolved = resolved.toLowerCase();
  const normGallery = galleryRoot.toLowerCase();
  const normParent = galleryParent.toLowerCase();

  if (
    normResolved === normGallery ||
    normResolved === normParent ||
    normGallery.startsWith(normResolved + path.sep) ||
    normResolved.startsWith(normGallery + path.sep)
  ) {
    throw Error(`安全拦截：不能删除画廊仓库或其父/子目录 (${resolved})`);
  }

  const home = process.env.USERPROFILE || process.env.HOME;
  if (home && normResolved === path.resolve(home).toLowerCase()) {
    throw Error(`安全拦截：拒绝删除用户主目录 (${resolved})`);
  }

  return resolved;
}
