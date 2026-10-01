# 樱花小镇 · 交付证据

## 结果

完整可玩的 3D 日式模拟小镇，Three.js + Vite，代码生成资源，本地一键启动。

- 启动：`cd sakura-town && npm install && npm run dev` → http://127.0.0.1:5173
- 生产构建：`npm run build`（通过）

## 已验证系统

| 系统 | 结果 |
| --- | --- |
| 曲面小世界（球面映射） | 玩家/建筑/道路/铁路均贴合球面，坐标正确（y≈240） |
| 玩家移动 | WASD 移动、奔跑、相机环绕、缩放 |
| 时间昼夜 | 时钟推进，光照/天空/路灯/窗灯随时间变化 |
| 天气 | 晴/多云/小雨/阵雨切换，雨天 NPC 打伞、路面变湿 |
| 列车 | 环线运行：running → arriving → dwelling → departing |
| 道口 | 列车接近关闭，离站后开放 |
| NPC×8 | 各有姓名/住址/职业/日程；状态 idle/walking/talking/waiting |
| 对话 | 8/8 正确匹配说话人；可打听、示好、告别 |
| 商店 | 可购买，扣款、入包 |
| 自动售货机 | 购买饮料 |
| 任务 | 8 条世界内任务，可完成（如「早晨的咖啡」「等待列车」） |
| 随机事件 | 列车晚点、突降阵雨等，会改变 NPC 对话与交通 |
| 存档 | localStorage 读写成功（金钱/好感/位置/时间一致） |
| 界面 | HUD 时钟/金钱/好感、任务、提示、对话框、地图 |
| 音频 | Web Audio 程序化环境声/音效（点击后解锁） |
| 粒子 | 樱花飘落、夜间萤火 |
| 室内 | 建筑含家具陈设；进入后外壳淡出可见室内 |

## 浏览器检查

- canvas 检查器 pass-3：`ok: nonblank`
- colorEntropyBits 2.6 · luminance mean 115.5 · nonBackgroundShare 0.62
- 无 page errors
- GPU：NVIDIA RTX 4060（非软渲染）
- 视口：桌面 1280×720 + 移动 390×844

## 性能快照（活跃游玩）

- drawCalls ≈ 1100–1300
- triangles ≈ 40k–48k
- geometries ≈ 900–4200（含室内/道具）
- programs ≈ 10

## 架构摘要

- 布局平面坐标 (x,z) → 球面点/法线（`world/Planet.js`）
- 日程表 + 天气/营业/事件 决策层（`entities/NPC.js`）
- 列车按弧长参数运行并进站（`entities/Train.js`）
- 任务由世界状态触发（`systems/Quests.js`）
- 事件池向 NPC/交通传播（`systems/Events.js`）

## 已知限制

- 移动端为触控适配，未做完整手势教程
- 室内为进入时外壳淡出，而非真正可穿模的镂空墙体
- 音频为程序化合成，非外部音源库
- Draw call 偏高，大屏高刷下若掉帧可减植被数量

## 截图

- `artifacts/final/hero-day.png` — 日间车站广场
- `artifacts/final/hero-night.png` — 夜间街灯与窗光
- `artifacts/pass-3/desktop-active-play.png` — 检查器画面
- `artifacts/pass-3/map.png` — 小镇地图
