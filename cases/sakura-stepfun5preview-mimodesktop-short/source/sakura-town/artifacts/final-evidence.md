# 樱花小镇 Sakura Town — 最终验证报告（run-id: pass-3）

## 结果总览

游戏完整可玩：标题 → 新游戏 → 开场委托 → 探索/对话/购物/送礼 → 交付委托 → 睡眠推进 →
自动存档 → 读档继续。桌面与移动端均通过真实输入测试，生产构建在静态预览下无错误。

## 构建与测试命令

```bash
npm run build        # tsc + vite build ✓（673KB JS / 178KB gzip，13KB CSS）
npx playwright test  # 3 passed, 1 skipped（移动 bot 按设计跳过）
```

测试明细：

| 测试 | 结果 |
| --- | --- |
| visual.spec · desktop-chrome | ✓ 画布非空白（variance/colorBuckets），W 键移动 -z，零 console/page 错误 |
| visual.spec · mobile-safari (iPhone 13) | ✓ 触屏摇杆驱动移动，HUD/触控适配 |
| bot-playtest · desktop-chrome | ✓ 完整委托循环：moneyBefore 800 → moneyAfter 880，questsDone 1，framesAdvanced 4615，零错误 |
| bot-playtest · mobile-safari | 按设计跳过（bot 用键盘；触屏由 visual.spec 覆盖） |

Bot playtest 报告（JSON 附件）：真实键盘导航（贪心轴+卡死侧移）沿道路走到面包店、
购买黄油面包、出店、追随委托人（含进店场景）、对话交付。证明核心循环可通过真实输入闭环。

## 画布检查（canvas inspector，pass-3）

证据清单 `artifacts/evidence.json`，`check_evidence.py` 全部通过（7 artifacts confirmed）：

| 状态 | 视口 | ok | colorEntropyBits | 备注 |
| --- | --- | --- | --- | --- |
| active-play | desktop 1280×720 | ✓ | 1.95 | 96 色桶，dominantColorShare 0.48 |
| night | desktop | ✓ | 3.50 | 22:00 广场：路灯/橱窗/售货机点亮 |
| rain | desktop | ✓ | 3.51 | 15:00 雨天：天空压暗、雨粒子 |
| festival | desktop | ✓ | 3.01 | 第 3 天 18:32 樱花祭：鸟居/灯笼/摊位 |
| interior-bakery | desktop | ✓ | 1.81 | 面包店室内：概览相机、桌面、柜台 |
| active-play | mobile 390×844 | ✓ | 2.85 | HUD/小地图/触屏控件适配 |

生产构建预览（`npm run preview` → 127.0.0.1:4188）额外抽查 active-play：非空白、零错误。

## 渲染预算（desktop tier）

| 指标 | 实际 | 上限 | |
| --- | --- | --- | --- |
| draw calls | 80 | 300 | ✓ |
| triangles | 23,780 | 750,000 | ✓ |
| geometries | 77 | 300 | ✓ |
| textures | 12 | 60 | ✓ |

GPU：ANGLE (NVIDIA RTX 4060, D3D11)，`softwareRendered: false`（真实 GPU，FPS 数据可信）。
帧率观感：开发期桌面稳定 60fps（delta 时间步，软 GL 无头环境下亦按墙钟推进）。

## 玩法验证记录（人工+脚本）

- 开场：点击"新的开始"→ 1.5s 后自动发放开场委托（带一个黄油面包，当日到期）。
- 委托循环：面包店购买（¥800→¥620）→ 交付（+¥260、好感+12，questsDone=1）。
- 睡眠：自家床边交互 → 黑场过渡 → 次日 06:31，自动存档生成。
- NPC 作息快照：10:31 店主均在店内、农夫在田、学生在校、渔民在河；
  22:00 全员回家（神主住神社）。
- 列车：每小时 :05/:35 发车，接近平交口 34m 时栏杆关闭、铃声+环境音。
- 雨天：户外 NPC 避雨（决策 1），光照压暗（sun 1.75→0.87）。
- 事件：迷路小猫（神社石阶，8-18 时）、遗失钱包（随机地点，9-17 时）可拾取并归还。
- 樱花祭：第 3 天 18:00-22:00，灯笼/摊位/烟花（20:00 起三 volleys）；雨天顺延。

## 设计三件套

见 `artifacts/design-brief.md`（设计简报 / 核心循环契约 / 关卡规划）。

## 已知限制

- 雨天粒子为 Points（细线段感），未做拉长网格。
- 室内相机为固定概览位，不支持室内自由环绕。
- 触屏对话选项超过 4 个时需要滚动（当前所有 NPC 选项 ≤4）。
- Bot 寻路为贪心轴+侧移，非全功能 A*（游戏内 NPC 用 BFS 路网，不受此影响）。

## 文件清单（主要）

- 源码：`src/game/`（Game 编排、TownState 存档、hooks、types）、`src/world/`（布局/建筑/道具/寻路）、
  `src/entities/`（Player/Npc/Train）、`src/systems/`（Time/Weather/Npc/Economy/Dialogue/Event/
  Interior/Camera/Audio/Hud）、`src/ui/`（Panels/TitleScreen）、`src/core/`、`src/utils/`。
- 测试：`tests/visual.spec.ts`、`tests/bot-playtest.spec.ts`。
- 证据：`artifacts/pass-3/`（6 份 inspector 报告+截图）、`artifacts/screens/`（世界巡游截图）、
  `artifacts/evidence.json`、`artifacts/game-progress.md`。
