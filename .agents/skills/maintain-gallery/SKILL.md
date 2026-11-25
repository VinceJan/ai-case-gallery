---
name: maintain-gallery
description: 收录、恢复、验证、发布和清理「造物集（ai-case-gallery）」的 AI 作品案例。用于用户将新作品目录交给 Agent 合并上线、修正模型归属、从 PR 恢复作品或维护画廊；不用于生成新的测试作品。
---

在 `E:\tmp\ai-case-gallery` 中工作。执行前读取 `AGENTS.md`、`docs/maintenance.md`、`docs/naming.md`。环境不确定时可先运行 `npm run doctor`。

## 极速两步命令 + 一次看图复核

1. **写入 `.work/spec.json` 并一键导入验收**
   - 参考 `docs/spec.example.json` 写入 `.work/spec.json`（必填 `source`、`topic`、`model`、`harness`；新题目需加 `topicLabel`；`adapter`/`project`/`entry`/`date` 可自动探测；尽量补齐 `effort`、`modelEvidence`、`promptText`、`description`、`controls`）。
   - 运行 `npm run intake -- --spec .work/spec.json`，自动完成校验 → 导入 → 隔离构建 → 本地浏览器渲染验收。
   - 若构建或渲染失败，停止转正并如实报告原因（重试前可用 `npm run discard -- <ID>` 清除失败候选）。

2. **实际查看截图复核画面**
   - 打开 `.work/verification/<ID>.png`，逐项确认主体场景完整、无白屏、无未关闭开始菜单、无明显渲染异常。

3. **一条命令完成复核、转正、推送、云端核验与本地清理**
   - 运行：
     `./Publish-Cases.ps1 -PromoteId "<ID>" -Review "已复核 1280x800 实际渲染画面：..."`
   - 若用户明确要求删除原测试目录，直接追加 `-RemoveSource "<原作品目录>"`（脚本会前置校验路径安全，并严格在 GitHub Pages 部署 + 云端逐文件核验 + 线上渲染校验全部通过后才执行删除）。

## 关键守则

- 验收与人工复核严格绑定当前 `source`/`demo` 文件指纹，重建后必须重新验收与看图，不得沿用旧记录。
- `source/` 保留原作，展示适配在 `demo/` 完成并写入 `notes`；不修改模型业务代码以凑收录数（2026-10-03 确认的 3 个原作错误 PR 候选继续保留在 `.work/incoming/` 并排除）。
- 仅使用现有纯文件与 Git 脚本，不新增后台或上传系统；未获用户明确指令不得使用 `-RemoveSource` 删除原测试目录。
