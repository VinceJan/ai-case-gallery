# 造物集（ai-case-gallery）Agent 维护指引

使用简体中文，结论优先。在用户授权范围内直接完成收录、验证、发布与清理，不重复询问常规步骤。

开始操作前请先阅读：[docs/maintenance.md](docs/maintenance.md)、[docs/naming.md](docs/naming.md) 与 [.agents/skills/maintain-gallery/SKILL.md](.agents/skills/maintain-gallery/SKILL.md)。

## 固定上下文
- 本地仓库：`E:\tmp\ai-case-gallery`
- 远端仓库：`VinceJan/ai-case-gallery`（GitHub Pages：`https://vincejan.github.io/ai-case-gallery/`）

## 极速两步命令发布流程（推荐入口）
1. **命令 1 · 写入 Spec 并一键验收**：参考 [docs/spec.example.json](docs/spec.example.json) 写入 `.work/spec.json`（`adapter`、`project`、`entry`、`date` 均可自动探测补全），运行：
   ```powershell
   cd E:\tmp\ai-case-gallery
   npm run intake -- --spec .work/spec.json
   ```
   自动完成：参数校验 → 分配 ID 导入 → 隔离构建 demo → 本地真机浏览器验收，并输出截图路径与下一步命令。
2. **人工看图复核**：**必须实际打开并检查** `.work/verification/<ID>.png`，确认画面完整、无白屏/开始层遮挡/报错。
3. **命令 2 · 一键复核、转正、推送、云端核验并清理**：
   ```powershell
   ./Publish-Cases.ps1 -PromoteId "<ID>" -Review "已复核 1280x800 实际渲染画面：..."
   ```
   - 自动完成：`review` → `promote` → `npm test` → `npm run check -- --tracked` → `npm run build` → 自动生成提交信息并推送 → 监控 Pages → `verify-cloud` 逐文件核验 → `verify-browser --online` 线上渲染检查 → `npm run clean`。
   - 若用户**已明确要求同时删除原测试目录**，在同一条命令中追加 `-RemoveSource "<原作品目录>"`（脚本带严格路径防护，仅在云端与线上验收全部通过后执行删除）。

## 硬性红线
- **只收录可在线运行的成品**：空白场景、只有菜单、设计文档、运行报错的候选不得进入 `cases/`；留在 `.work/incoming/` 并记录原因（重试失败候选可用 `npm run discard -- <ID>` 清理该条）。
- **禁止绕过指纹验收**：验收与人工复核严格绑定当前 `source`/`demo` SHA-256 指纹；重建后旧验收自动失效，禁止手改 `case.json` 状态。
- **不篡改原作**：`source/` 保存原始源码；构建与路径适配在 `demo/` 完成并记录在 `notes`。不修改模型代码以“修通”失败作品。
- **统一命名与词表**：ID 与标题只通过 `scripts/naming.mjs` 生成，词表位于 `registry/`；模型/Harness/提示词必须写明依据，未知精确 ID 填 `null` 不猜测。
- **隐私与许可**：不公开私人完整对话、密钥、`.env` 或 `node_modules`；保留第三方许可与来源信息。
- **清理边界**：`npm run clean` 只清理临时构建、截图与站点生成产物，严格保留 `.work/incoming/`（含 2026-10-03 确认继续排除的 3 个原作错误 PR 候选）。未获用户明确要求禁止传入 `-RemoveSource`。
- **页面呈现原则**：公开详情页默认直接展示真实可交互作品，生成信息、运行记录、提示词与截图默认折叠；不新增后台服务、数据库或上传系统，不修改全局 Git/工具配置。
