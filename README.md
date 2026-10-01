# 造物集 · AI Case Gallery

[在线作品集](https://vincejan.github.io/ai-case-gallery/) · [维护流程](docs/maintenance.md) · [命名规范](docs/naming.md)

只收藏能在浏览器中真正展示的成品。每条保存模型/Harness 依据、提示词来源、可恢复源码、实际截图、发布版与文件指纹。

固定维护项目：`E:\tmp\ai-case-gallery`。以后把新作品路径和模型、Harness、题目、提示词交给 Agent，按 [AGENTS.md](AGENTS.md) 与 [项目 Skill](.agents/skills/maintain-gallery/SKILL.md) 完成收录和发布。使用普通文件与 Git，不需要上传账号或后台服务。

流程：导入本地候选 → 独立构建 → 浏览器加载 → 实际画面和必要交互复核 → 收录 → 推送 → 公网与云端恢复校验。设计阶段和失败候选留本地待处理区，不进入网站。具体命令见维护文档。

案例标题：`题目 · 模型 · Harness`。稳定目录：`题目--模型--harness--版本--r001`。版本和运行序号区分同模型的重复测试；旧详情与作品入口保留跳转。

本地预览（Node 24、npm、Git，验证使用本机 Edge；发布需要登录 gh）：

```powershell
cd E:\tmp\ai-case-gallery
npm ci
npm run check
npm run build
npm run preview
```

`source/` 不保存依赖和 .git；依赖由 package.json 和锁文件重新安装。`demo/` 保存独立静态发布版。站点更新直接使用已验证 demo，不重新安装全部案例依赖。支持 Vite、JS 打包、单文件 HTML、静态目录与原始 SVG。

GitHub Actions 是推送后的自动检查和发布流程，GitHub Pages 是托管这些网页的地方。本站两者已配置完成。已收录并验收的变更可以运行 `./Publish-Cases.ps1` 发布；候选的人工复核由 Agent 完成。

原测试目录不会自动删除。发布后先确认云端源码、提示词和素材齐全、可以取回，再按用户要求清理；日常临时构建依赖用 clean-work 脚本移除。

组织方式参考 [Nagi Bench](https://github.com/nagi-studio/nagi-bench)，恢复自关闭 PR 的作品记录原始提交与来源。标准任务/注册数据遵循 CC-BY-4.0，许可保留于 licenses/NAGI-DATA.txt；站点代码采用 MIT，案例沿用各自原有许可。本次恢复 PR 的标准任务原文已由用户确认使用。
