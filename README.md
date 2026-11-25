# 造物集 · AI Case Gallery

[在线作品集](https://vincejan.github.io/ai-case-gallery/) · [标准维护与发布流程 (SOP)](docs/maintenance.md) · [命名规范](docs/naming.md) · [Spec 模板](docs/spec.example.json)

只收藏能在浏览器中真正运行的 AI 作品成品。每条案例完整保留模型/Harness 来源依据、原始提示词、可恢复源码（`source/`）、独立静态展示版（`demo/`）、实测封面图与 SHA-256 文件指纹。

---

## 给 AI 的一句话交接指令（做完新测试作品后直接复制发送）

> 请按 `E:\tmp\ai-case-gallery\AGENTS.md` 把刚才这个作品收录并发布到 `https://github.com/VinceJan/ai-case-gallery`，云端核验通过后顺便删除本次本地测试目录。

*若当前工具不向 AI 暴露自身模型名，顺手在末尾补一句：`（模型：XXX，思考强度：high，Harness：YYY）`。*

---

## 两步命令完成收录与上线

详细字段、适配方式与排障见 [docs/maintenance.md](docs/maintenance.md)：

```powershell
cd E:\tmp\ai-case-gallery

# 0. 可选：首次或不确定环境时 1 秒体检
npm run doctor

# 1. 准备好 .work/spec.json（参考 docs/spec.example.json），一键导入 + 隔离构建 + 本地浏览器验收
npm run intake -- --spec .work/spec.json

# 2. 打开 .work/verification/<ID>.png 确认画面无误后，一条命令完成复核、转正、全检、推送、云端/公网核验与自动清理
./Publish-Cases.ps1 `
  -PromoteId "<ID>" `
  -Review "已复核 1280x800 实际渲染画面：..." `
  -RemoveSource "E:\tmp\your-finished-work-dir"   # 可选：仅云端全部验收通过后才安全删除原测试目录
```

---

## 本地预览与日常清理

环境要求：Node 24、npm、Git（浏览器验证优先使用本机 Edge，自动回退 Chromium；推送发布需登录 `gh`）。

```powershell
cd E:\tmp\ai-case-gallery
npm ci
npm run check
npm run build
npm run preview
```

随时一键清理本地临时构建、截图与站点生成目录（严格保留 `.work/incoming/`）：

```powershell
npm run clean
```

---

## 目录结构与命名

- `cases/<ID>/`：已验收的正式案例（`source/` 原始源码、`demo/` 静态发布版、`media/` 封面、`prompt.md`、`case.json` 与清单文件）。
- `registry/`：统一的题目、模型、Harness 词表与迁移记录。
- `scripts/`：环境体检、Spec 自动探测、一键导入验收、人工复核、转正、云端校验、安全清理脚本与回归测试。
- `docs/`：标准化收录与发布 SOP、命名规范与 Spec 模板。
- `.work/`（Git 忽略）：本地临时构建与验收工作区（`.work/incoming/` 存放待验收或历史排除候选）。
- 展示标题统一为 `题目 · 模型 · Harness`；目录与稳定链接格式为 `<topic>--<model>--<harness>--<variant>--r001`（由 `scripts/naming.mjs` 统一生成，旧链接自动跳转）。
- 组织方式参考 [Nagi Bench](https://github.com/nagi-studio/nagi-bench)，恢复自关闭 PR 的作品保留原始提交与来源。标准任务/注册数据遵循 CC-BY-4.0（见 `licenses/NAGI-DATA.txt`）；站点代码采用 MIT，各案例沿用原有许可。
