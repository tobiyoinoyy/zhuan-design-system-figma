# 协作协议

> 本文由 2026-06-09 同事补充包转译而来,适配当前 `zhuan-design-system-figma` 工程。若团队成员、GitHub 仓库名或权限配置有变化,以实际团队设置为准,但这里的协作边界和审查规则不变。

## 1 · 协作角色

设计系统建议按三类责任分工:

| 责任域 | 主要内容 |
|---|---|
| 规则与文档 | `AGENTS.md`、`docs/INPUT_SOURCE_RULES.md`、`docs/CHANGELOG-RULES.md`、`docs/HARNESS_*`、审查脚本、反馈归档 |
| Figma ↔ 代码通道 | Figma MCP 写回、Code Connect 映射、Figma 节点与代码组件映射清单 |
| 组件源码 | `src/components/`、`src/tokens/`、`src/styles/tokens.css`、`public/icons/figma-mcp/`、`public/fonts/` |

组件源码是共同维护范围。任何会改变组件 API、视觉 token、图标资产或 Figma 映射稳定性的改动,都要比普通文档改动更谨慎。

## 2 · 分支命名

推荐分支前缀:

| 前缀 | 用途 |
|---|---|
| `connect/` | Code Connect、Figma MCP 写回、Figma 映射 |
| `rule/` | 输入源规则、审查脚本、CHANGELOG-RULES、AGENTS、Harness 文档 |
| `component/` | `src/components/` 组件源码、token、字体、图标资产 |
| `docs/` | README、组件清单、说明文档 |
| `auto/` | agent 自动同步类改动,提交前必须人工复核 |

## 3 · PR 规则

- `component/` 范围必须重点 review,尤其是 `src/components/`、`src/styles/tokens.css`、`src/tokens/`、`public/icons/figma-mcp/`。
- `connect/` 和 `rule/` 可以由对应负责人主审,但如果改到了组件源码或 token,必须转为组件级 review。
- main 分支不建议直接提交。若确实本地快速修复,合并前仍要补齐说明、验证和变更记录。
- PR 描述必须说明:
  - 改了哪些组件 / 规则 / 映射。
  - 是否影响 Figma 节点映射。
  - 是否需要浏览器审批。
  - 是否更新了 `docs/CHANGELOG-RULES.md`。

## 4 · 写入边界

生成业务页面或 UI 预览时,以下路径默认只读:

- `src/components/**`
- `src/tokens/**`
- `src/styles/tokens.css`
- `public/icons/figma-mcp/**`
- `public/fonts/**`

只有明确进行设计系统维护时才允许修改。业务页面、实验页、一次性验证不要混入共享组件源码。

## 5 · 决策权

- 规则来源、组件归属、是否沉淀为正式 Harness 规则:规则与文档负责人裁定。
- Figma MCP / Code Connect 技术路径、节点映射优先级:Figma ↔ 代码负责人裁定。
- 组件 API、视觉表现、token 调整:组件源码共同 review。
- 跨边界争议:先写清问题、证据、影响面,再决定是否进入 `docs/HARNESS_ISSUES/`。

## 6 · 反馈处理

用户或同事反馈“不像设计稿 / 不像转转 / 组件不该这样用”时:

1. 先按 `docs/HARNESS_FEEDBACK.md` 判断 A/B/C。
2. A/B 类进入 `docs/HARNESS_ISSUES/`。
3. 规则变更进入 `docs/CHANGELOG-RULES.md`。
4. 当前页面照常修复,但不要只修页面不沉淀规则。

处理人建议:

- 规则 / audit / 文档相关:规则与文档负责人。
- Code Connect / Figma 映射不准 / Figma 反写问题:Figma ↔ 代码负责人。
- 组件字段 / 样式问题:组件源码共同维护。

## 7 · 合并前检查

```bash
npm run build
npm run audit:generated -- .
```

如果是单独生成的业务项目:

```bash
bash scripts/audit-generated-project /path/to/generated-ui
```

审查脚本不能替代人工视觉审批。涉及页面或组件视觉变化时,仍需在浏览器打开预览确认。

## 8 · 相关文档

- [`README.md`](./README.md)
- [`AGENTS.md`](./AGENTS.md)
- [`docs/AI_UI_WORKFLOW.md`](./docs/AI_UI_WORKFLOW.md)
- [`docs/HARNESS_SUPPLEMENT_2026_06_09.md`](./docs/HARNESS_SUPPLEMENT_2026_06_09.md)
- [`docs/FIGMA_COMPONENT_MAPPING.md`](./docs/FIGMA_COMPONENT_MAPPING.md)
- [`docs/HARNESS_FEEDBACK.md`](./docs/HARNESS_FEEDBACK.md)
- [`docs/CHANGELOG-RULES.md`](./docs/CHANGELOG-RULES.md)
