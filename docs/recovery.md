# 2026-10-01 PR 恢复记录

从用户 VinceJan 的 6 个已关闭、未合并 PR 恢复 40 个候选，36 个通过构建、浏览器与人工画面复核进入作品集；4 个未通过，不出现在网站。逐文件按 Git blob SHA 校对原始 PR 文件，共 123 个；锁文件有适配时保留原始版本。

| 原始 PR | 恢复 | 收录 | 原始提交 |
|---|---:|---:|---|
| [#53](https://github.com/nagi-studio/nagi-bench/pull/53) | 24 | 21 | c408203bdfbb |
| [#54](https://github.com/nagi-studio/nagi-bench/pull/54) | 6 | 6 | a53eb03f0b86 |
| [#55](https://github.com/nagi-studio/nagi-bench/pull/55) | 5 | 4 | 5719d5ccdcb1 |
| [#59](https://github.com/nagi-studio/nagi-bench/pull/59) | 2 | 2 | 848d5d22f860 |
| [#60](https://github.com/nagi-studio/nagi-bench/pull/60) | 2 | 2 | 11e508e5b5eb |
| [#61](https://github.com/nagi-studio/nagi-bench/pull/61) | 1 | 1 | 6b122aaa2cd3 |

用户确认这些作品使用 Nagi 标准任务原文；文本取自对应 PR 提交的 cases.json，并保留 CC-BY-4.0 来源。模型、Harness、思考强度来自各 PR 注册文件，未声称上游已收录。

未收录原因：

- `cs-dust2--muse-spark-1-2-contributor--pi--xhigh--r001`：locator.click: Timeout 30000ms exceeded. Call log: [2m  - waiting for locator('canvas:visible').first()[22m [2m    - locator resolved to <canvas width="176" height="176"></canvas>[22m [2m  - attempting click action[22m [2m    2 × waiting for element to be visible, enabled and stable[22m [2m      - element is visible, enabled and stable[22m [2m      - scrolling into view if needed[22m [2m      - done scrolling[22m [2m      - <html lang="zh-CN">…</html> intercepts pointer events[22
- `cs-dust2--muse-spark-1-3-contributor--pi--xhigh--r001`：nearestWP is not defined
- `pelican-cycling--muse-spark-1-2-contributor--zcode--default--r001`：This page contains the following errors:error on line 356 at column 155: Namespace prefix xlink for href on animateTransform is not defined Below is a rendering of the page up to the first error.
- `skeleton-watch--muse-spark-1-2-contributor--pi--xhigh--r001`：THREE.Object3D.add: object not an instance of THREE.Object3D. Vector3

另外，原画廊两个仅设计/材料阶段记录已删除。单文件雨夜便利店根据用户补充归为 Pi + Space Bunny Alpha，页面保留未独立找到原会话的说明；两个原先模型缺失的 Antigravity 案例归为用户确认的 Gemini 3.8 Flash。
