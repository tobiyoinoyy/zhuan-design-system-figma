# ZHUAN Design Components

Figma source: [ZHUAN Design](https://www.figma.com/design/2uABdev2ojlhXr9AEDiGcf/ZHUAN-Design?node-id=554-3881&t=vDgpL9NvRD3gAYeN-1)

This project is the code implementation workspace for the ZHUAN Design component library.

> **For AI agents working in this repository:** before producing any design artifact, load these files —
> - [`AGENTS.md`](./AGENTS.md) — design methodology, component-reuse priority, anti-AI-slop rules, technical conventions, agent self-check list.
> - [`docs/DESIGN.md`](./docs/DESIGN.md) — token system, component selection map, hard constraints, §8 marketing exception.
> - [`docs/COMPONENT_USAGE.md`](./docs/COMPONENT_USAGE.md) — component picking decision tree, field semantics, icon style rules.
> - [`docs/INPUT_SOURCE_RULES.md`](./docs/INPUT_SOURCE_RULES.md) — six input-source archetypes (text / lo-fi / hi-fi / PRD / marketing / mixed), §0.1 image attachment rules, §0.2 complex input pacing, §2.1/§2.2/§2.4 token-semantic boundaries.
> - [`docs/AI_UI_WORKFLOW.md`](./docs/AI_UI_WORKFLOW.md) — GitHub repo → agent browser preview → approval → Figma MCP editable handoff workflow.
> - [`FIGMA_UI_GENERATION_PROMPT.md`](./FIGMA_UI_GENERATION_PROMPT.md) — workflow for turning low-fidelity mockups into high-fidelity UI by mapping every element to real components in this repo and the matching Figma libraries.
>
> Reuse existing components in `src/components/` and tokens in `src/tokens/` first; do not invent new styles.

## 📚 设计规则文档

所有规则、约定、踩坑账本都在 `docs/` 下:

| 文档 | 用途 |
|---|---|
| [`docs/DESIGN.md`](./docs/DESIGN.md) | 设计系统硬约束:token 系统 / 颜色语义 / §8 营销例外 |
| [`docs/COMPONENT_USAGE.md`](./docs/COMPONENT_USAGE.md) | 组件选型决策树 / 字段语义边界 / 生成自查清单 |
| [`docs/FIGMA_COMPONENT_MAPPING.md`](./docs/FIGMA_COMPONENT_MAPPING.md) | Figma 节点 / 组件 / 模版到工程包组件的映射清单 |
| [`docs/AI_UI_WORKFLOW.md`](./docs/AI_UI_WORKFLOW.md) | GitHub 工程包 → agent 生成预览 → 浏览器审批 → Figma MCP 可编辑交付工作流 |
| [`docs/HARNESS_SUPPLEMENT_2026_06_09.md`](./docs/HARNESS_SUPPLEMENT_2026_06_09.md) | 2026-06-09 同事训练补充包解析 + 当前工程转译说明 |
| [`docs/INPUT_SOURCE_RULES.md`](./docs/INPUT_SOURCE_RULES.md) | 6 类输入源处理规则 + token 语义边界 + 颜色三声明 |
| [`docs/HARNESS_FEEDBACK.md`](./docs/HARNESS_FEEDBACK.md) | 反馈回流通道 + GitHub Issue 模板 |
| [`docs/HARNESS_ISSUES.md`](./docs/HARNESS_ISSUES.md) | 案件汇总表 + 评级体系 + 状态流转 |
| [`docs/HARNESS_ISSUES/_template.md`](./docs/HARNESS_ISSUES/_template.md) | 单条案件 14 字段模板 |
| [`docs/CHANGELOG-RULES.md`](./docs/CHANGELOG-RULES.md) | 规则演进账本(每条规则的事故源头) |
| [`docs/MIGRATION_PLAN.md`](./docs/MIGRATION_PLAN.md) | 从旧仓库迁移规则的对照清单 + 改写约定 |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | 多人协作、分支、PR 和维护边界 |

## Batch 00: Icons

Implemented first as the shared asset layer for all later components:

- `ZhuanIcon`
- `iconRegistry`
- 45 icon variants from the Figma `图标` page
- Figma-exported SVG assets in `public/icons/figma-mcp`
- Figma node mapping through `data-figma-node-id`

Representative Figma node:

- `221:785` 图标

## Foundation: Colors

Implemented as shared design tokens:

- CSS variables in `src/styles/tokens.css`
- TypeScript token map in `src/tokens/colors.ts`
- `ColorTokenGallery` browser approval component
- 30 color tokens grouped by brand, text, surface, line, feedback, and business usage

Usage:

```tsx
import { zhuanColors, getZhuanColor } from './tokens';

const primary = zhuanColors.brandPrimary;
const link = getZhuanColor('link');
```

```css
.example {
  color: var(--zd-color-text);
  background: var(--zd-color-primary-soft);
  border-color: var(--zd-color-line);
}
```

Representative Figma color names:

- `品牌色` `#FF0F27`
- `品牌色背景` `#FFF2F2`
- `一级黑` `#111111`
- `二级文字` `#666666`
- `三级文字` `#999999`
- `暗文字` `#BBBBBB`
- `背景色` `#F8F8F8`
- `分割线` `#F0F0F0`
- `白色` `#FFFFFF`
- `链接色` `#00A3FF`
- `黑色蒙层` `rgba(17, 17, 17, 0.7)`

## Batch 01

Implemented for browser approval:

- `Tabs`
- `Button`
- `ButtonBar`
- `OptionButton`
- `SearchHeader`
- `Switch`
- `FormSwitch`
- `FormRadioRow`
- `FormInput`
- `FormVerticalRadioList`
- `FormCheckboxRow`
- `Toast`
- `LoadingSpinner`

Note: `Toast` success/failure/loading visuals use the full Figma-exported SVG variants from `761:20695`, `761:20700`, and `761:20705`.

Representative Figma nodes:

- `502:4695` 标签页tabs
- `420:4186` tab项
- `502:3092` 操作按钮
- `502:3125` 大按钮
- `502:3270` 选项按钮大
- `502:5052` 搜索栏
- `961:3096` switch
- `964:3457` 表单
- `761:20694` 图形Toast
- `470:5778` 加载中

## Batch 02: Product Cards

Implemented for browser approval:

- `ProductImage`
- `ConditionAppearanceTag`
- `ConditionFunctionTag`
- `ConditionCombo`
- `ConditionTextBlock`
- `Price`
- `PromoTag`
- `SellChip`
- `ProductTitle`
- `ProductCardFeeds`
- `ProductCardH`

Representative Figma nodes:

- `514:3170` 商品图
- `516:3127` feeds卡片
- `554:13569` 横版卡片 消费电子
- `508:2582` 成色标签
- `514:3233` 卖点标签
- `945:1250` 价格

Product image assets are exported from Figma MCP into `public/product-assets`.

## Batch 03: Navigation And Filter

Implemented for browser approval:

- `TopNav`
- `BottomButtonBar`
- `BottomBarPDP`
- `SortTabs`
- `FilterChip`
- `ChipRail`
- `FilterOptionGrid`
- `QuickFilterDropdown`

Representative Figma nodes:

- `502:4878` 顶部导航栏
- `502:3172` 底部导航栏
- `525:5867` 排序面板
- `525:5991` 标签选项
- `525:6142` 筛选选项
- `525:6231` 快速筛选下拉

## Batch 04: Sheet / Drawer And Dialog

Implemented for browser approval:

- `SheetFrame`
- `BottomSheet`
- `SheetTitleBar`
- `DefaultSheet`
- `TagSelectionSheet`
- `SkuSheet`
- `CouponSheet`
- `CancelOrderSheet`
- `TextCopySheet`
- `RulesSheet`
- `RegionSelectSheet`
- `QuantityStepper`
- `Dialog`
- `DialogBody`
- `DialogActions`
- `SystemDialog`
- `CustomDialog`

Representative Figma nodes:

- `945:1089` 弹窗标题
- `956:4731` 半层默认样式
- `956:4733` 业务服务类
- `956:4734` 列表选项类
- `945:1850` 商品属性选择
- `930:4847` 弹窗标题
- `935:4882` 弹窗内容
- `935:4887` 弹窗按钮
- `951:1053` 弹窗

Quantity stepper icons use Figma MCP-exported SVG assets in `public/icons/figma-mcp`.

Akrobat numeric typography is bundled in `public/fonts/Akrobat-ExtraBold.otf` and loaded through `@font-face`.

## Batch 05: Business Components

Implemented for browser approval:

- `AddressFilter`
- `CurrentLocation`
- `SelectCorner`
- `SelectionLabel`
- `CardOption`

Representative Figma nodes:

- `956:3982` 当前定位
- `502:5202` 地址筛选
- `892:5601` 卡片选项框
- `1055:7590` 选择框角标
- `1055:7594` 选择框标签

## Batch 06: Order Cards

Implemented for browser approval:

- `OrderCard`
- `OrderCategory`
- `OrderPrice`

Representative Figma nodes:

- `1119:8131` 购买订单卡片
- `915:1462` 类目
- `915:3601` 订单状态
- `915:3722` 操作栏

## Batch 07: Device / Brand / Overlay

Implemented for browser approval:

- `IOSStatusBar`
- `IOSHomeBar`
- `IOSKeyboard`
- `ZHUANLogo`
- `OfficialVerification`
- `Overlay`

Representative Figma nodes:

- `550:7280` iOS 状态栏
- `550:7266` iOS Home bar
- `557:14783` iOS 键盘
- `590:19160` logo
- `915:1393` 官方验
- `557:14331` Overlay

## Batch 08: UI Templates

Implemented for browser approval:

- `QuickChoiceTemplate`
- `SortDropdownTemplate`
- `QuickFilterTemplate`
- `FilterSheetTemplate`
- `EmptyStateTemplate`
- `OrderListTemplate`
- `OrderDetailDialogTemplate`
- `CardFormTemplate`
- `FullWidthFormTemplate`
- `LuxuryFeedsTemplate`
- `HorizontalCardsTemplate`
- `ZhuanUITemplateGallery`
- Template-level composition of status bars, navigation, search, filter, sheet, order, form, product card, and home indicator components

Representative Figma nodes:

- `555:4438` UI界面模版-快惠选
- `555:4445` 快惠选
- `732:20650` 主搜机型推荐
- `555:4446` Horizontal Card
- `644:19895` 排序综合下拉
- `557:15020` 快速筛选下拉
- `557:15099` 筛选弹窗向上拉起
- `557:18861` 空状态
- `915:2168` 购买订单列表
- `950:467` 购买订单详情弹窗
- `970:4488` 卡片式表单
- `972:5093` 通栏式表单
- `557:17549` 商品卡片 feeds 二奢
- `557:17565` 商品卡片 横版消费电子

## Audit

The final Figma-to-code coverage checklist is in `COMPONENT_AUDIT.md`. The detailed Figma node to package component mapping is in [`docs/FIGMA_COMPONENT_MAPPING.md`](./docs/FIGMA_COMPONENT_MAPPING.md).

For generated UI projects or preview pages, run the adapted Harness audit:

```bash
npm run audit:generated -- .
```

For a generated project in another folder:

```bash
bash scripts/audit-generated-project /path/to/generated-ui
```

## Scripts

```bash
npm install
npm run dev
npm run build
npm run audit:generated -- .
```

Local preview:

```text
http://localhost:5173/
```

If that port is occupied, start Vite with another port, for example `npm run dev -- --port 5176 --strictPort`.

## Structure

```text
src/components/       React + TypeScript components
src/tokens/           TypeScript design token maps
src/styles/           Design tokens and component CSS
src/App.tsx           Approval preview page
public/               Figma-exported assets and bundled Akrobat font
dist/                 Production build output
zhuan-design-component-inventory.md
```
