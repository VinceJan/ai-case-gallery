---
name: maintain-gallery
description: 收录、恢复、验证、发布和清理「造物集（ai-case-gallery）」的 AI 作品案例。用于用户将新作品目录交给 Agent 合并上线、修正模型归属、从 PR 恢复作品或维护画廊；不用于生成新的测试作品。
---

在 `E:\tmp\ai-case-gallery` 中工作。执行前读取 `AGENTS.md`、`docs/maintenance.md`、`docs/naming.md`。

## 标准三步操作

1. **导入、构建与本地浏览器验收**
   - 参考 `docs/spec.example.json` 写入 `.work/spec.json`（或运行 `npm run spec`），明确填写 `source`、`topic`、`model`、`harness`、`adapter`、`modelEvidence`、提示词原文及操作说明。
   - 运行 `npm run intake -- --spec .work/spec.json`，自动完成 `import → build-demo → verify-new`。
   - 若构建或运行失败，停止转正，保留在 `.work/incoming/` 并如实说明原因。

2. **人工查看截图并转正收录**
   - 实际查看 `.work/verification/<ID>.png`，确认画面完整、交互正常、无开始层或白屏。
   - 运行 `npm run review -- <ID> "具体看到了什么，操作与 WebGL 检查结果是什么"`。
   - 运行 `npm run promote -- <ID>`，移入 `cases/<ID>/` 并自动更新 `registry/*.json`。

3. **全检、推送、云端核验与本地清理**
   - 运行 `./Publish-Cases.ps1 -Message "Add verified <作品> case for <Model> on <Harness>" -VerifyOnlineIds "<ID>"`。
   - 脚本自动完成：`npm test` → `npm run check -- --tracked` → `npm run build` → `git push` → 监控 `deploy.yml` → `verify-cloud` 全新浅克隆逐文件比对 → `verify-browser --online` 线上渲染检查 → `npm run clean`（自动清理临时构建/截图/`dist`，并保留 `.work/incoming/`）。

## 关键守则

- 验收与人工复核严格绑定当前 `source`/`demo` 文件指纹，重建后必须重新验收与看图，不得沿用旧记录。
- `source/` 保留原作，展示适配在 `demo/` 完成并写入 `notes`；不修改模型业务代码以凑收录数（2026-10-03 确认的 3 个原作错误 PR 候选继续保留在 `.work/incoming/` 并排除）。
- 仅使用现有纯文件与 Git 脚本，不新增后台或上传系统；未获用户明确指令不删除用户原始测试目录，确认云端核验通过并获授权后再清理。
