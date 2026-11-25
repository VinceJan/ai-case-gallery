# 造物集 · AI Case Gallery

[在线作品集](https://vincejan.github.io/ai-case-gallery/) · [标准维护与发布流程 (SOP)](docs/maintenance.md) · [命名规范](docs/naming.md) · [Spec 模板](docs/spec.example.json)

只收藏能在浏览器中真正运行的 AI 作品成品。每条案例完整保留模型/Harness 来源依据、原始提示词、可恢复源码（`source/`）、独立静态展示版（`demo/`）、实测封面图与 SHA-256 文件指纹。

---

## 快速开始

### 1. 本地预览网站

环境要求：Node 24、npm、Git（浏览器验证优先使用本机 Edge，自动回退 Chromium；推送发布需登录 `gh`）。

```powershell
cd E:\tmp\ai-case-gallery
npm ci
npm run check
npm run build
npm run preview
```

### 2. 收录并发布一个新作品（三步完成）

详细字段与故障排查请直接阅读 [docs/maintenance.md](docs/maintenance.md)；把新作品交给 AI Agent 时，Agent 会按 [AGENTS.md](AGENTS.md) 与 [maintain-gallery Skill](.agents/skills/maintain-gallery/SKILL.md) 自动执行以下三步：

```powershell
# 第一步：参考 docs/spec.example.json 准备好 .work/spec.json，一键导入 + 隔离构建 + 浏览器验收
npm run intake -- --spec .work/spec.json

# 第二步：打开 .work/verification/<ID>.png 人工复核画面，登记复核并转正收录
npm run review -- <ID> "具体画面复核说明"
npm run promote -- <ID>

# 第三步：一键回归测试、指纹校验、推送、监控 Pages、云端逐文件核验与自动清理本地缓存
./Publish-Cases.ps1 -Message "Add verified <作品> case for <Model> on <Harness>" -VerifyOnlineIds "<ID>"
```

### 3. 日常清理本地临时产物

```powershell
npm run clean
```

会自动清理 `.work/build`、`.work/verification`、临时云端克隆目录、`dist/`、`.astro/` 与 `public/generated/`，同时严格保留 `.work/incoming/` 中的待处理/历史排除候选，且不会擅自删除原始测试目录。

---

## 目录结构

- `cases/<ID>/`：已验收的正式案例（`source/` 原始源码、`demo/` 静态发布版、`media/` 封面、`prompt.md`、`case.json` 与清单文件）。
- `registry/`：统一的题目、模型、Harness 词表与迁移记录。
- `scripts/`：导入、隔离构建、浏览器验收、人工复核、转正、云端校验与清理脚本。
- `docs/`：标准化收录与发布 SOP、命名规范与 Spec 模板。
- `.work/`（Git 忽略）：本地临时构建与验收工作区（`.work/incoming/` 存放待验收或排除候选）。

---

## 命名与归属说明

- 展示标题统一为 `题目 · 模型 · Harness`；目录与稳定链接格式为 `<topic>--<model>--<harness>--<variant>--r001`（由 `scripts/naming.mjs` 统一生成，旧链接自动跳转）。
- 组织方式参考 [Nagi Bench](https://github.com/nagi-studio/nagi-bench)，恢复自关闭 PR 的作品保留原始提交与来源。标准任务/注册数据遵循 CC-BY-4.0（见 `licenses/NAGI-DATA.txt`）；站点代码采用 MIT，各案例沿用原有许可。
