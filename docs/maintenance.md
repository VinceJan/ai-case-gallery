# Agent 收录与发布

用户以后只需给 Agent：作品路径、模型、Harness、题目与提示词/会话记录，并说明要发布。Agent 在本项目中处理，不需要上传表单或后台。

初次在此路径操作执行 `npm ci`。Node 24、Git、GitHub CLI 与本机 Edge 可用，gh 已登录时可以发布。

1. 准备 JSON spec，支持单条或数组。题目参考 registry；新题目提供英文 topic 与中文 topicLabel。提供 source、model、harness、variant、adapter、entry、prompt 或 promptText、modelEvidence。可另给 effort、notes、provenance、promptSource。
2. `node scripts/import-case.mjs --spec .work/spec.json`。ID 自动生成；候选写入 `.work/incoming/`，自动排除 node_modules、.git、缓存、.env。源码之外的原创素材需一并提供。
3. `node scripts/build-demo.mjs <ID>`。支持 vite、bundle、custom、html、static、svg。依赖只在 `.work/build` 安装；source 和 demo 分别校验。SVG 以原始向量代码在线渲染。
4. `node scripts/verify-new.mjs <ID>`。启动临时本地静态服务，在实际子目录路径加载；进入开始菜单后检查脚本/资源/画面，截图在 `.work/verification`。自动通过只说明具备渲染条件，仍需看真实画面、尝试必要交互，排除空白或菜单占位。
5. 检查截图与作品后执行 `node scripts/review-case.mjs <ID> "具体看到了什么，操作结果是什么"`，再 `node scripts/promote-case.mjs <ID>`。失败候选只留本地，不会出现在网站或公共仓库。
6. `npm run check`、`npm run build`；检查新详情、提示词、分类筛选、手机布局与旧链接。查看 git diff。
7. `git add --all`，`git add --force -- cases`，`npm run check -- --tracked`，提交并推送。已授权发布时无需再问常规确认；未授权发布时先给可审查成果。
8. `gh run list --workflow deploy.yml --commit <SHA>` 检查发布结果。`node scripts/verify-cloud.mjs --commit <SHA>` 从 GitHub 全新取回并逐文件比较，核对站点版本。必要时 `node scripts/verify-browser.mjs --online --url=https://vincejan.github.io/ai-case-gallery/ --id=<ID>` 验证公网作品。
9. `node scripts/clean-work.mjs <ID>` 清理本次临时依赖。原始工作区不自动删除；只有用户明确要求、确认源码/提示词/素材云端齐全后再清理。

`Publish-Cases.ps1` 负责已验收成品的检查、构建、提交、发布和恢复校验，不替代 Agent 的画面复核。适配未知项目时可以增加小脚本，不引入长期后台。

PR 恢复：查询已关闭 PR 的 files（注意分页）、head SHA 和 refs/pull/N/head，从固定提交取回原始文件、注册元信息与当时标准任务。保留来源 URL、commit、paths。不要公开私人对话或重新打开上游 PR。Nagi 标准任务与注册数据使用 CC-BY-4.0，详见 licenses/NAGI-DATA.txt。
