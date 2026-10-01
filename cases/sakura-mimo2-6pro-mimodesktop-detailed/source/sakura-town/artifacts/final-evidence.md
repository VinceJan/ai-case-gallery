# Sakura Town — 最终证据

运行：`cd sakura-town && npm install && npm run dev` → http://127.0.0.1:5188

## 构建

- `npm run build`：tsc + vite 通过
- 产物：`dist/`，约 595 KB JS（gzip 156 KB）

## 画面验证（canvas inspector）

| 状态 | run-id | 结果 | luminance mean | colorEntropy | calls | triangles |
| --- | --- | --- | --- | --- | --- | --- |
| active-play | pass-8 | nonblank | 159.8 | 4.64 | 791 | 33678 |
| night | pass-night2 | nonblank | 76.4 | 4.35 | 790 | 33666 |
| rain | pass-rain | nonblank | 125.5 | 4.65 | 790 | 33666 |

- 无 consoleErrors / pageErrors
- GPU：NVIDIA RTX 4060，硬件渲染
- draw calls 791 超出 300 参考预算（街道道具未做实例化），三角形 33k 远低于 750k 上限

截图目录：`artifacts/pass-8/`、`artifacts/pass-night2/`、`artifacts/pass-rain/`

## 设计

- `artifacts/game-design.md` — 玩家承诺、核心循环契约、世界结构

## 已实现系统

1. 曲面世界（平坦坐标 + 轻微球面曲率 + 环状铁路闭环）
2. cel/toon 渲染 + 程序化日文招牌/橱窗/海报贴图
3. 玩家第三人称移动（WASD / Shift / E）
4. 时间昼夜 + 天气（晴/阴/雨/雾）联动光照与 NPC
5. 12 位居民：职业、住所、作息表、关系网、对话、雨天行为
6. 列车环线：运行、进站、道口、延误事件
7. 交互：购物、长椅、售货机、公告板、邮筒、神社、自行车、门
8. 经济与背包、localStorage 存档
9. 委托/随机事件/秘密点（世界状态触发）
10. 程序化音频（脚步、交互、列车、雨声、秘密发现）
11. HUD：时刻、天气、金钱、线索、物品、提示、对话

## 操作摘要

WASD 移动 · Shift 奔跑 · E 交互

## 已知限制

- draw call 偏高（未对树木/路桩做 InstancedMesh 合并）
- 室内为外观级（货架/柜台可见），未做完整可走入室内
- 列车可观察运行与道口，完整乘车通勤为简化版
- 移动端有触屏摇杆，未做完整触屏交互菜单
