# PR 恢复记录

恢复 40 个候选，收录 37 个；另 3 个保留原样、继续排除。原始 PR 文件共 123 个，已按 Git blob SHA 校对；原锁文件有适配时保留原版本。

| 原始 PR | 恢复 | 收录 | 提交 |
|---|---:|---:|---|
| [#53](https://github.com/nagi-studio/nagi-bench/pull/53) | 24 | 22 | c408203bdfbb |
| [#54](https://github.com/nagi-studio/nagi-bench/pull/54) | 6 | 6 | a53eb03f0b86 |
| [#55](https://github.com/nagi-studio/nagi-bench/pull/55) | 5 | 4 | 5719d5ccdcb1 |
| [#59](https://github.com/nagi-studio/nagi-bench/pull/59) | 2 | 2 | 848d5d22f860 |
| [#60](https://github.com/nagi-studio/nagi-bench/pull/60) | 2 | 2 | 11e508e5b5eb |
| [#61](https://github.com/nagi-studio/nagi-bench/pull/61) | 1 | 1 | 6b122aaa2cd3 |

用户确认使用 Nagi 标准任务原文，文本取自对应提交的 cases.json 并保留 CC-BY-4.0 来源。模型、Harness、思考强度来自 PR 注册数据，PR 均关闭未合并。

2026-10-03 修正浏览器检查选错小地图的问题，重新验证 Muse Spark 1.2 / Pi 的 Dust2 主场景、移动和开火后补收录；原始作品未修改。

按用户选择继续排除：

- `cs-dust2--muse-spark-1-3-contributor--pi--xhigh--r001`：原作缺失 nearestWP 导入，运行时出错。
- `pelican-cycling--muse-spark-1-2-contributor--zcode--default--r001`：原 SVG 缺失 xlink 命名空间，浏览器 XML 解析失败。
- `skeleton-watch--muse-spark-1-2-contributor--pi--xhigh--r001`：原作将 Vector3 当作 Object3D 添加，运行时报错。

原画廊两个设计/材料阶段记录已删除。单文件便利店根据用户补充归属 Pi + Space Bunny Alpha，保留未独立定位原会话的说明；两个原先模型缺失的 Antigravity 案例归为用户确认的 Gemini 3.8 Flash。
