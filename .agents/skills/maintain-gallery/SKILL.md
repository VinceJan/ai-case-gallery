---
name: maintain-gallery
description: 收录、恢复、验证和发布本项目的 AI 案例。用于用户把作品路径交给 Agent、修正模型归属、从 PR 恢复作品或维护画廊；不用于生成新的测试作品。
---

在 `E:\tmp\ai-case-gallery` 工作。读取项目根 AGENTS.md、docs/maintenance.md、docs/naming.md，按当前用户授权执行。

将新作品导入 `.work/incoming/`，使用命名脚本分配 ID。保留原始源码与可恢复素材，记录提示词/模型归属依据。构建后运行浏览器，查看实际画面与必要交互；菜单、空白和失败产物不收录。用 review-case 记录具体复核结果，promote-case 才能移入正式 cases。

发布时检查文件指纹、tracked 文件、站点构建和公网结果；用 verify-cloud 从 GitHub 重新取回确认。原目录删除仍以用户明确要求为准，不把发布成功当作删除授权。失败候选留本地，说明实际失败原因。

新模型/Harness 使用统一词表；未知证据写明不确定性。PR 恢复要保留提交、文件路径、注册信息与第三方许可。实现使用现有脚本，不增加上传后台。
