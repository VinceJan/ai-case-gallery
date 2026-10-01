# 案例命名

展示名称统一为 `题目 · 模型 · Harness`；提示词版本、思考强度、运行序号另列。

目录与稳定链接使用：

`<topic>--<model>--<harness>--<variant>--r001`

例如 `konbini--space-bunny-alpha--pi--single-html--r001`。双连字符区分字段；各字段内部用小写英文、数字和单连字符。中文题目在 `registry/topics.json` 定义。

`variant` 是提示词/配置版本，如 `default`、`short`、`detailed-v2`、`custom`；同组合再次运行递增 r002。已有 ID 不因改文案而变化。修改模型归属后如需迁移，保留 `legacyIds`，站点自动跳转旧详情和旧 demo 入口。

`scripts/naming.mjs` 是唯一生成入口，`allocateId()` 同时检查正式案例和本地候选，防止覆盖。`registry/{topics,models,harnesses}.json` 保存统一显示词表。精确 API 模型标识可写 `exactModelId`；未知精确标识不猜测。

一次运行一条记录。不同 Harness、提示词、思考强度和版本不得合并为同一结果。来自 PR 的思考强度也保存在 effort 字段。
