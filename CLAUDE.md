# CLAUDE.md

This is the entry pointer for Claude Code / Codex / any other code agent working in this repository.

## 开工前必读(按这个顺序)

1. **[`AGENTS.md`](./AGENTS.md)** — 设计方法论、组件复用优先级、反 AI slop 规则、技术约定、生成自查清单。
2. **[`docs/INPUT_SOURCE_RULES.md`](./docs/INPUT_SOURCE_RULES.md) §0** — 先判断输入源类型(文字/低保真/高保真/PRD/营销/混合),再按对应章节的处理路径走。**所有开工流程的第一步**。
3. **[`docs/DESIGN.md`](./docs/DESIGN.md)** — token 系统、颜色语义、组件选型映射、§8 营销例外。
4. **[`docs/COMPONENT_USAGE.md`](./docs/COMPONENT_USAGE.md)** — 组件选型决策树、字段语义边界(HARNESS-001/002/003)、图标风格规则、生成自查清单。

## 反馈回流(踩坑了往这走)

- **[`docs/HARNESS_FEEDBACK.md`](./docs/HARNESS_FEEDBACK.md)** — 反馈通道 + GitHub Issue 模板。
- **[`docs/HARNESS_ISSUES.md`](./docs/HARNESS_ISSUES.md)** — 案件汇总表(伙伴问"我提的反馈现在怎么样了"先查这里)。
- **[`docs/HARNESS_ISSUES/`](./docs/HARNESS_ISSUES/)** — 单条案件归档(每个 HI-XXX 一份 markdown)。
- **[`docs/CHANGELOG-RULES.md`](./docs/CHANGELOG-RULES.md)** — 规则演进账本(每条规则的事故源头)。

## 实现层

- **`src/components/`** — 18 个聚合 barrel(Button / Tabs / SearchHeader / Switch / Form / Feedback / Filter / Navigation / Product / Sheet / Dialog / ColorTokens / OrderCard / Device / Brand / Business / Templates),所有组件用真 TS 模块,**不要复制粘贴 HTML 内联 React**。
- **`src/tokens/colors.ts`** + **`src/styles/tokens.css`** — 30 个 color token + radius + shadow + font-family。**只用这里的 token,不写裸色值**。
- **`public/icons/figma-mcp/`** — 45 个 figma 导出 SVG 图标。
- **`src/components/iconRegistry.ts`** — 图标统一入口。

## 启动

```bash
npm install
npm run dev          # http://localhost:5174/
npm run build
```

## 仓库历史

本仓库由 [`GuoNB666/zhuanzhuan-design-system`](https://github.com/GuoNB666/zhuanzhuan-design-system) 的**规则资产**迁移而来,组件代码用 Vite + React + TS 重写。迁移对照见 [`docs/MIGRATION_PLAN.md`](./docs/MIGRATION_PLAN.md)。

旧仓库保持只读,所有规则迭代都在本仓库做。
