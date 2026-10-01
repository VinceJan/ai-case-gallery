# 造物集 · AI Case Gallery

收录 AI 模型配合不同 harness 在实际任务中的作品。保存原始提示词、生成条件、源码、截图和可在线体验的静态产物。

[在线作品集](https://vincejan.github.io/ai-case-gallery/) · [公开仓库](https://github.com/VinceJan/ai-case-gallery)

## 日常使用

本地跑完测试后，收录到仓库，再自动发布。网站用于浏览和分享，上传由本地脚本完成。

```powershell
./Publish-Cases.ps1 -Path 'E:\tmp\my-case' -Model '实际模型标识' -Harness 'Pi' -Topic 'konbini' -Prompt 'prompt.md'
```

`-Topic` 可用 `sakura-town`、`castle`、`konbini`、`mountain`、`minecraft`，其他类型用 `other`。模型和 harness 不知道可以留空，页面会显示“未记录”。使用 `-LocalOnly` 只收录和预览，不推送。

脚本自动创建新的运行 ID、过滤依赖和缓存、保存提示词、构建展示版、浏览器检查、核对文件指纹、推送、等待发布并核对云端材料，成功后清理本次临时构建依赖。原目录始终保留。发布后请打开新案例，确认真实画面和操作再清理；原始素材、提示词或辅助文件若不在项目目录，需要一起提供才能收录。

## 本地预览与重新构建

需要 Node.js 24、npm、Git、已登录的 GitHub CLI。首次使用：

```powershell
npm ci
npm run build
npm run preview
```

每个案例的 `source` 是可恢复源码；`demo` 是已生成的展示版。新案例在本地独立构建，站点更新不会重复安装全部历史案例的依赖。

```powershell
npm run rebuild -- 案例ID --force
npm run check
npm run build
```

当前支持 Vite、单文件 HTML、静态目录、带 `build` 脚本的项目，以及可打包的 JS 模块项目。未知类型可先作为材料收录，再增加必要适配。

`npm run verify:browser` 使用本机 Edge 执行场景加载和截图检查；先启动 `npm run preview -- --port 4321`。这项检查不等同于完整玩法验收。运行记录中的历史检查与当前验证分别呈现。

## 保存与清理

GitHub Pages 保存的是网站展示内容；仓库同时保存源码、锁文件、提示词与有用素材。仅确认网页打开不够，需要核对云端材料能恢复。

```powershell
node scripts/verify-cloud.mjs --commit 实际提交SHA
```

依赖目录、Git 数据、环境变量文件、日志、缓存、已有重复构建目录和重复压缩包不导入。单文件离线作品的 HTML 本身会保留。源文件和展示文件都附有 SHA-256 校验清单；同步过的锁文件会保留原始版本并在案例页注明。案例快照提交时显式包含已收录文件，防止原项目的 `.gitignore` 把截图等证据排除；发布前另查全部收录文件是否进入 Git 提交。

## 部署

向 `main` 推送后，GitHub Actions 校验案例文件并生成静态网站，发布到 GitHub Pages。第一次需要在仓库设置中启用 Pages，Source 选择 GitHub Actions。

不需要服务器、数据库或账号系统。后续想改域名或迁移托管，源码和内容仍是普通文件。

## 记录规则

- 每次运行独立保存，不覆盖原始产出。
- 按提示词全文指纹分辨版本，不依据文件名假设文本相同。
- 模型归属优先使用会话记录，目录命名作为较弱依据；没有记录就标为未知。
- “构建通过”“已验证展示”“仅有材料”分别记录，不用自动状态代替作品质量评价。
- 从归档补回的源码注明恢复来源，重新构建和验证后才提供体验入口。
- 不公开完整私人对话或模型凭据，只保存相关任务原文和必要归属说明。

站点自有代码使用 MIT 许可证；案例项目保留原有许可证和第三方声明，不把站点许可证自动套用到全部素材。
