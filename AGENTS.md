# 造物集（ai-case-gallery）Agent 维护指引

使用简体中文，结论优先。在用户授权范围内直接完成收录、验证、发布与清理，不重复询问常规步骤。

开始操作前请先阅读：[docs/maintenance.md](docs/maintenance.md)、[docs/naming.md](docs/naming.md) 与 [.agents/skills/maintain-gallery/SKILL.md](.agents/skills/maintain-gallery/SKILL.md)。

## 固定上下文
- 本地仓库：`E:\tmp\ai-case-gallery`
- 远端仓库：`VinceJan/ai-case-gallery`（GitHub Pages：`https://vincejan.github.io/ai-case-gallery/`）

## 标准三步发布流程（快速入口）
1. **准备与自动验收**：按 [docs/spec.example.json](docs/spec.example.json) 写入 `.work/spec.json`（或执行 `npm run spec`），然后运行 `npm run intake -- --spec .work/spec.json`（自动完成导入 → 隔离构建 → 本地浏览器验证）。
2. **人工看图复核与转正**：必须实际打开 `.work/verification/<ID>.png` 检查画面，确认无空白/菜单遮挡/渲染异常后，运行：
   - `npm run review -- <ID> "具体画面复核说明"`
   - `npm run promote -- <ID>`
3. **一键发布、云端核验与本地清理**：运行 `./Publish-Cases.ps1 -Message "Add verified ..." -VerifyOnlineIds "<ID>"`（自动执行 `npm test`、`npm run check -- --tracked`、`npm run build`、推送、监控 Pages、云端逐文件核验、线上作品检查与 `npm run clean`）。

## 硬性红线
- **只收录可在线运行的成品**：空白场景、只有菜单、设计文档、运行报错的候选不得进入 `cases/`，留在 `.work/incoming/` 并记录原因。
- **禁止绕过指纹验收**：验收与人工复核严格绑定当前 `source`/`demo` SHA-256 指纹；重建后旧验收自动失效，禁止手改 `case.json` 状态。
- **不篡改原作**：`source/` 保存原始源码；构建与路径适配在 `demo/` 完成并记录在 `notes`。不修改模型代码以“修通”失败作品。
- **统一命名与词表**：ID 与标题只通过 `scripts/naming.mjs` 生成，词表位于 `registry/`；模型/Harness/提示词必须写明依据，未知精确 ID 填 `null` 不猜测。
- **隐私与许可**：不公开私人完整对话、密钥、`.env` 或 `node_modules`；保留第三方许可与来源信息。
- **清理边界**：`npm run clean` 只清理临时构建、截图与站点生成产物，严格保留 `.work/incoming/`（含 2026-10-03 确认继续排除的 3 个原作错误 PR 候选）。原作品测试目录只有在用户明确要求且云端核验通过后才可删除。
- **页面呈现原则**：公开详情页默认直接展示真实可交互作品，生成信息、运行记录、提示词与截图默认折叠；不新增后台服务、数据库或上传系统，不修改全局 Git/工具配置。
