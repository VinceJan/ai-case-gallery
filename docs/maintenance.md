# 造物集 · 标准收录与发布指南（SOP）

本文档面向后续接手维护的开发者与 AI Agent，目标是让任何新作品在 **3 个清晰阶段** 内完成从本地目录到线上 GitHub Pages 的标准化入库、验收与清理。

> **固定维护路径**：`E:\tmp\ai-case-gallery` ｜ **远端仓库**：`VinceJan/ai-case-gallery` ｜ **线上地址**：`https://vincejan.github.io/ai-case-gallery/`
> **环境前置**：Node 24、npm、Git、本机 Microsoft Edge（无 Edge 时自动回退 Playwright Chromium）；推送与监控发布需登录 `gh`。首次在此目录执行 `npm ci`。

---

## 流程总览

```text
[1. 准备 spec.json]
       │
       ▼
npm run intake -- --spec .work/spec.json
  ├─ 1) import-case   → 分配唯一 ID，复制到 .work/incoming/<ID>/source/（自动排除 node_modules/.git/.env）
  ├─ 2) build-demo    → 在 .work/build/<ID> 隔离安装依赖并构建 demo/，生成 SHA-256 指纹
  └─ 3) verify-new    → 本地子路径起服 + Playwright 真浏览器渲染检查，生成封面图与截图
       │
       ▼
[2. 人工看图复核并转正]
  ├─ 查看截图 .work/verification/<ID>.png（确认画面完整、无白屏/菜单遮挡/报错）
  ├─ npm run review -- <ID> "具体看到了什么，交互结果是什么"
  └─ npm run promote -- <ID>   → 移入 cases/<ID>/ 并自动登记 registry/*.json
       │
       ▼
[3. 一键全检、推送、云端核验与自动清理]
./Publish-Cases.ps1 -Message "Add verified <作品> case for <Model> on <Harness>" -VerifyOnlineIds <ID>
  ├─ npm test && npm run check && npm run build
  ├─ git add --all && git add --force -- cases && npm run check -- --tracked
  ├─ git commit && git push && gh run watch (deploy.yml)
  ├─ verify-cloud.mjs（全新浅克隆核对全部云端文件与线上版本）
  ├─ verify-browser.mjs --online（核验线上新作品实际渲染）
  └─ npm run clean（自动清理本地临时构建/截图/dist，保留 .work/incoming/）
```

---

## 阶段一：准备 Spec 并一键导入验收

### 方式 A：直接编写 `.work/spec.json`（推荐，适合 AI Agent）

参考模板 [docs/spec.example.json](spec.example.json)，支持单对象或数组（批量导入）。

### 方式 B：用命令自动探测生成 `.work/spec.json`

```powershell
cd E:\tmp\ai-case-gallery
npm run spec -- `
  --source "E:\tmp\your-work-dir" `
  --topic castle `
  --model "Gemini 4 Neon" `
  --harness Antigravity `
  --effort high `
  --model-evidence "本次 Antigravity 会话模型选择记录"
```

### 执行一键导入、构建与本地浏览器验收

```powershell
npm run intake -- --spec .work/spec.json
```

> 如需单步调试，也可分别运行：
> `npm run import -- --spec .work/spec.json` → `npm run rebuild -- <ID>` → `npm run verify:new -- <ID>`

---

## 阶段二：人工看图复核并转正收录

`intake` 通过后，终端会打印本次分配的 `<ID>` 与截图路径：

1. **必须实际查看截图** `.work/verification/<ID>.png`，排除空白画布、未关闭的开始菜单、贴图缺失或严重穿模。
2. **登记画面复核说明**（复核绑定当前 `source`/`demo` 指纹，若重新构建则自动失效）：
   ```powershell
   npm run review -- <ID> "已复核 1280x800 实际渲染画面：主体场景完整、轮廓与光影正常、无开始层遮挡，WebGL 无脚本与资源错误。"
   ```
3. **转正移入 `cases/` 并更新词表**：
   ```powershell
   npm run promote -- <ID>
   ```

> 若候选构建失败或画面不合格，**不要转正**，留在 `.work/incoming/` 并记录真实失败原因即可，不会进入线上网站。

---

## 阶段三：一键全检、推送发布与本地清理

### 本地预检（不推送）

```powershell
./Publish-Cases.ps1 -LocalOnly
# 如需在本地浏览器预览整个网站：
npm run preview
```

### 正式发布到 GitHub Pages 并验证云端

```powershell
./Publish-Cases.ps1 `
  -Message "Add verified <作品简述> case for <Model> on <Harness>" `
  -VerifyOnlineIds "<ID>"
```

脚本会自动完成：回归测试 → 全库指纹校验 → Astro 站点构建 → 强制暂存 `cases/` 与 tracked 校验 → 推送 `main` → 监控 `deploy.yml` → 云端全新拉取逐文件指纹校验 → 公网新作品渲染验收 → **自动清理本地临时构建产物与缓存**（`npm run clean`）。

> **原测试目录清理原则**：`Publish-Cases.ps1` **不会**自动删除用户原始创作目录（如 `E:\tmp\InterestingThings\xxx`）。仅在用户明确要求清理且确认云端文件校验通过后，再删除对应的原临时目录。

---

## Spec 字段速查表

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `source` | 是 | 原作品根目录（自动跳过 `node_modules`、`.git`、`dist`、`.env*`、`.map` 等） |
| `topic` | 是 | 英文短标识，已有题目见 `registry/topics.json`；新题目需同时填 `topicLabel` |
| `topicLabel` | 新题目必填 | 中文题目名（如 `城堡与农田`） |
| `model` | 是 | 模型展示名，统一词表见 `registry/models.json`；新模型会自动登记 |
| `harness` | 是 | 执行工具名，见 `registry/harnesses.json`（如 `Antigravity`、`Pi`、`Codex CLI`、`Hermes`） |
| `adapter` | 是 | 构建适配方式：`vite` / `bundle` / `custom` / `html` / `static` / `svg` |
| `variant` | 推荐 | 提示词/配置版本，默认 `default`（如 `short`、`detailed-v2`、`custom`） |
| `effort` | 推荐 | 思考强度（如 `high`、`xhigh`、`max`），未知填 `null` |
| `date` | 推荐 | 运行日期（上海时区 `YYYY-MM-DD`） |
| `modelEvidence` | 推荐 | 模型/配置来源依据（区分会话日志、PR 数据、用户补充、推测；不臆造） |
| `exactModelId` | 可选 | 精确 API 模型标识；未明确记录时填 `null`，不要猜测 |
| `promptText` / `prompt` | 推荐 | 提示词正文字符串，或指向源码目录内的提示词文件路径 |
| `promptEvidence` | 可选 | 提示词来源说明 |
| `description` | 推荐 | 1–2 句中文作品简介 |
| `controls` | 推荐 | 交互操作说明（拖拽、滚轮、快捷键等） |
| `notes` | 可选 | 字符串数组，记录适配动作或特殊说明 |

### Adapter 适配方式说明

| `adapter` | 适用项目类型 | `build-demo.mjs` 行为 |
| --- | --- | --- |
| `vite` | Vite 项目（Three.js / WebGL 等） | 隔离安装依赖，执行 `vite build --base=./` 输出相对路径静态站点 |
| `bundle` | 无 Vite 但有 `index.html` + ESM 入口 | 使用 esbuild 打包为自包含 IIFE + 内联样式与本地资源 |
| `custom` | 自定义 `npm run build` 输出单页 | 执行 `npm run build` 并复制 `entry` |
| `html` | 单文件 HTML（含常见 Three.js CDN 修复） | 必要时自动补齐 importmap 或本地打包旧版 Three.js |
| `static` | 纯静态 HTML/JS/资源目录 | 过滤开发文件后原样复制到 `demo/` |
| `svg` | 独立 SVG 矢量作品 | 原样保存 `artifact.svg` 并生成全屏查看页 |

---

## 常用维护命令速查

| 命令 | 用途 |
| --- | --- |
| `npm run spec -- ...` | 自动探测作品目录并生成 `.work/spec.json` |
| `npm run intake -- --spec .work/spec.json` | 一键导入 → 独立构建 → 本地浏览器验收 |
| `npm run review -- <ID> "复核说明"` | 绑定当前指纹写入人工画面复核记录 |
| `npm run promote -- <ID>` | 将通过验收的候选移入 `cases/` 并注册词表 |
| `npm test` | 运行 8 项自动化回归测试（浏览器负例 + 隔离构建 + 安全清理） |
| `npm run check` | 校验所有已收录案例的元信息与 SHA-256 文件指纹 |
| `npm run check -- --tracked` | 额外校验 `cases/` 下每个文件均已纳入 Git 索引 |
| `npm run build` / `npm run preview` | 生成静态站点并在本地预览 |
| `npm run verify:site -- --url=...` | 整站交互、筛选、折叠、旧链跳转与 390px 手机端布局检查 |
| `npm run verify:browser -- --online` | 复查线上已发布作品（只输出报告，不覆盖公开记录） |
| `npm run verify:cloud -- --commit <SHA>` | 从 GitHub 全新拉取核对全部仓库文件与线上 `version.json` |
| `npm run clean` | 清理本地 `.work/build`、`.work/verification`、临时克隆、`dist` 等（**保留 `.work/incoming/`**） |

---

## 硬性约束与历史约定

1. **禁止绕过验收**：`review` 与 `promote` 严格校验当前 `source`/`demo` 的 SHA-256 指纹；任何重建后旧验收自动失效，必须重新验证并看图复核。
2. **禁止篡改原作**：`source/` 保存作品原样；路径相对化、依赖打包、许可补充仅发生在 `demo/`，并写入 `notes`。不为提高收录率擅自修改模型生成的业务代码。
3. **证据边界清晰**：模型、Harness、提示词必须写明来源依据；未核对的精确 API ID 不猜测；不公开私人完整对话、密钥或 `node_modules`。
4. **公网复查登记**：运行 `npm run verify:browser -- --online` 并逐图复核 `.work/verification/*-live.png` 后，可用 `node scripts/record-audit.mjs --report .work/verification/live-results.json --reviewed "复核说明"` 登记。
5. **保留历史排除项（2026-10-03 用户决定）**：`.work/incoming/` 中 3 个原作有代码错误的 PR 候选继续原样保留、不修改、不收录；`npm run clean` 会自动保护 `.work/incoming/`。
6. **PR 恢复规范**：从已关闭 PR 恢复作品时保留原始提交 SHA、文件路径、注册数据与第三方许可（Nagi 标准任务遵循 CC-BY-4.0，详见 `licenses/NAGI-DATA.txt`），汇总维护使用 `node scripts/update-recovery.mjs`。
