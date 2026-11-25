# 造物集 · 标准收录与发布指南（SOP）

本文档面向后续接手维护的开发者与 AI Agent，让任何新作品通过 **两条命令 + 一次人工看图** 完成从本地目录到线上 GitHub Pages 的标准化入库、验收与清理。

> **固定维护路径**：`E:\tmp\ai-case-gallery` ｜ **远端仓库**：`VinceJan/ai-case-gallery` ｜ **线上地址**：`https://vincejan.github.io/ai-case-gallery/`
> **环境体检**：随时运行 `npm run doctor` 检查 Node、依赖、浏览器、Git 与 `gh` 登录状态。首次使用先执行 `npm ci`。

---

## 流程总览

```text
[准备 .work/spec.json]（adapter / project / entry / date 均可自动探测）
          │
          ▼
【命令 1】npm run intake -- --spec .work/spec.json
  ├─ 0) 校验 spec 并自动补全缺失的 adapter / project / entry / date
  ├─ 1) import-case   → 分配唯一 ID，复制到 .work/incoming/<ID>/source/（自动排除 node_modules/.git/.env）
  ├─ 2) build-demo    → 在 .work/build/<ID> 隔离安装依赖并构建 demo/，生成 SHA-256 指纹
  └─ 3) verify-new    → 本地子路径起服 + Playwright 真浏览器渲染检查，生成封面图与截图
          │
          ▼
【人工看图】打开 .work/verification/<ID>.png 确认画面完整、无白屏/菜单遮挡/报错
          │
          ▼
【命令 2】./Publish-Cases.ps1 -PromoteId "<ID>" -Review "具体画面复核说明" [-RemoveSource "<原测试目录>"]
  ├─ review-case + promote-case（绑定指纹登记复核 → 移入 cases/<ID>/ → 注册 registry/*.json）
  ├─ npm test && npm run check && npm run build
  ├─ git add --all && git add --force -- cases && npm run check -- --tracked
  ├─ 自动生成提交信息（或使用 -Message）→ git commit && git push && gh run watch (deploy.yml)
  ├─ verify-cloud.mjs（全新浅克隆逐文件核对云端与线上版本）
  ├─ verify-browser.mjs --online（核验线上新作品实际渲染）
  ├─ npm run clean（自动清理本地临时构建/截图/dist，保留 .work/incoming/）
  └─ 若传入 -RemoveSource：在以上全部通过后安全删除原测试目录（内置防误删保护）
```

---

## 第一步：准备 Spec 并执行一键验收

参考模板 [docs/spec.example.json](spec.example.json) 写入 `.work/spec.json`（支持单条对象或数组），也可用命令自动探测生成：

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

执行一键导入、构建与本地浏览器验收：

```powershell
npm run intake -- --spec .work/spec.json
```

> - 若需要分步调试，可单独运行：`npm run import -- --spec .work/spec.json` → `npm run rebuild -- <ID>` → `npm run verify:new -- <ID>`。
> - 若某候选构建/渲染失败且需要放弃重试，运行 `npm run discard -- <ID>` 仅删除 `.work/incoming/<ID>`（不会触碰正式 `cases/`）。

---

## 第二步：人工看图复核并一条命令完成上线与清理

1. **必须实际查看截图** `.work/verification/<ID>.png`，排除空白画布、未关闭的开始菜单、贴图缺失或严重穿模。
2. **执行一键复核、转正、推送、云端核验与清理**：

```powershell
./Publish-Cases.ps1 `
  -PromoteId "<ID>" `
  -Review "已复核 1280x800 实际渲染画面：主体场景完整、光影与交互正常、无开始层遮挡，WebGL 无脚本或资源错误。"
```

- 如需同时在**云端与线上验证全部通过后**删除原测试目录（需用户明确授权），追加 `-RemoveSource "E:\tmp\your-work-dir"`。
- 如需自定义提交说明，追加 `-Message "Add verified ..."`（省略时自动根据 `case.json` 生成 `Add verified <topic> case for <model> on <harness>`）。
- 仅本地预检不推送：`./Publish-Cases.ps1 -LocalOnly`（支持先手工 `npm run review` + `npm run promote`，再 `npm run preview` 预览全站）。

---

## Spec 字段速查表

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `source` | 是 | 原作品根目录（自动跳过 `node_modules`、`.git`、`dist`、`.env*`、`.map` 等） |
| `topic` | 是 | 英文短标识，已有题目见 `registry/topics.json`；新题目需同时填 `topicLabel` |
| `topicLabel` | 新题目必填 | 中文题目名（如 `城堡与农田`） |
| `model` | 是 | 模型展示名，统一词表见 `registry/models.json`；新模型会自动登记 |
| `harness` | 是 | 执行工具名，见 `registry/harnesses.json`（如 `Antigravity`、`Pi`、`Codex CLI`、`Hermes`） |
| `adapter` | 自动探测 | 可省略由 `intake` 自动探测；可选 `vite` / `bundle` / `custom` / `html` / `static` / `svg` |
| `variant` | 推荐 | 提示词/配置版本，默认 `default`（如 `short`、`detailed-v2`、`custom`） |
| `effort` | 推荐 | 思考强度（如 `high`、`xhigh`、`max`），未知填 `null` |
| `date` | 自动补全 | 运行日期（上海时区 `YYYY-MM-DD`，省略时自动取当天） |
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
| `npm run doctor` | 1 秒体检 Node、依赖、浏览器、Git、`gh` 登录与案例状态 |
| `npm run spec -- ...` | 自动探测作品目录并生成 `.work/spec.json` |
| `npm run intake -- --spec .work/spec.json` | 校验并补全 spec → 导入 → 隔离构建 → 本地浏览器验收 |
| `npm run discard -- <ID>` | 删除 `.work/incoming/<ID>` 下失败或放弃的候选 |
| `npm run review -- <ID> "复核说明"` | 绑定当前指纹写入人工画面复核记录 |
| `npm run promote -- <ID>` | 将通过验收的候选移入 `cases/` 并注册词表 |
| `npm test` | 运行 9 项自动化回归测试（浏览器负例、隔离构建、spec 校验与安全删除防护） |
| `npm run check` / `npm run check -- --tracked` | 校验所有正式案例元信息、SHA-256 指纹与 Git 索引完整性 |
| `npm run build` / `npm run preview` | 生成静态站点并在本地预览 |
| `npm run verify:site -- --url=...` | 整站交互、筛选、折叠、旧链跳转与 390px 手机端布局检查 |
| `npm run verify:browser -- --online` | 复查线上已发布作品（只输出报告，不覆盖公开记录） |
| `npm run verify:cloud -- --commit <SHA>` | 从 GitHub 全新拉取核对全部仓库文件与线上 `version.json` |
| `npm run clean` | 清理本地临时构建、截图、克隆目录与 `dist`（**保留 `.work/incoming/`**） |

---

## 硬性约束与历史约定

1. **禁止绕过验收**：`review`、`promote` 与 `Publish-Cases.ps1 -PromoteId` 均严格校验当前 `source`/`demo` 的 SHA-256 指纹；任何重建后旧验收自动失效，必须重新验证并看图复核。
2. **安全删除防护**：`Publish-Cases.ps1 -RemoveSource` 会前置拦截盘符根目录、顶层目录（如 `E:\tmp`）、用户主目录以及 `ai-case-gallery` 仓库或其父/子目录，且严格在 GitHub Pages 部署 + 云端逐文件核验 + 线上浏览器渲染全部通过后才执行删除。
3. **禁止篡改原作**：`source/` 保存作品原样；路径相对化、依赖打包、许可补充仅发生在 `demo/`，并写入 `notes`。不为提高收录率擅自修改模型生成的业务代码。
4. **证据边界清晰**：模型、Harness、提示词必须写明来源依据；未核对的精确 API ID 不猜测；不公开私人完整对话、密钥或 `node_modules`。
5. **公网复查登记**：运行 `npm run verify:browser -- --online` 并逐图复核 `.work/verification/*-live.png` 后，可用 `node scripts/record-audit.mjs --report .work/verification/live-results.json --reviewed "复核说明"` 登记。
6. **保留历史排除项（2026-10-03 用户决定）**：`.work/incoming/` 中 3 个原作有代码错误的 PR 候选继续原样保留、不修改、不收录；`npm run clean` 会自动保护 `.work/incoming/`。
7. **PR 恢复规范**：从已关闭 PR 恢复作品时保留原始提交 SHA、文件路径、注册数据与第三方许可（Nagi 标准任务遵循 CC-BY-4.0，详见 `licenses/NAGI-DATA.txt`），汇总维护使用 `node scripts/update-recovery.mjs`。
