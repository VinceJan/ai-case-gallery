# Sakura Town — 进度

## 当前意图
可玩的日本地方小镇模拟：曲面世界、昼夜天气、居民生活、列车环线、交互经济、委托秘密。

## 约束
- 仅项目文件夹内工作，无外部素材服务
- Three.js + Vite，程序化几何/贴图
- 优先完成度与系统连接，而非地图面积

## 已完成
- Vite+Three.js 工程与 toon 渲染
- 曲面世界映射（平坦坐标 + 轻微球面曲率）
- 建筑群：车站、商店街、便利店、学校、神社、住宅、公寓、诊所、交番、咖啡
- 道路、人行道、铁路环线、站台、河渠桥
- 街道道具：电线杆、路灯、长椅、售货机、自行车、公告板、邮筒、樱花/绿树
- 玩家第三人称控制
- 时间昼夜 + 天气系统
- 12 NPC 作息/关系/对话
- 列车运行 + 道口
- 交互/购物/经济/存档
- 委托、随机事件、秘密点
- HUD、程序化音频

## 证据
- artifacts/pass-8/desktop-active-play.png（街道日景）
- artifacts/pass-night2/desktop-night.png（夜景）
- artifacts/pass-rain/desktop-rain.png（雨天）
- artifacts/final-evidence.md

## 剩余缺陷
- draw call ~790（超 300 参考线）
- 室内未做完整第一人称走入
- 乘车为简化版

## 下一步（若继续）
1. InstancedMesh 合并树木/枕木降低 draw call
2. 完整室内（便利店/面包店第一人称走入）
3. 更多委托故事线
4. 列车完整乘车视角
