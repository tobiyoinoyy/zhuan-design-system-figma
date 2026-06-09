# Agent UI Design Workflow

> 目标:同事把本工程包上传到 GitHub 后,任何 agent 都能先读取工程包,再基于真实组件、真实 token、真实图标生成高质量 UI 预览,经浏览器审批后,通过 Figma MCP 交付可编辑设计稿。

这份文档不是视觉风格总结,而是团队协作工作流。风格和组件规则仍以 [`DESIGN.md`](./DESIGN.md)、[`COMPONENT_USAGE.md`](./COMPONENT_USAGE.md)、[`INPUT_SOURCE_RULES.md`](./INPUT_SOURCE_RULES.md) 为准。

---

## 1 · 工作流总览

```text
GitHub 工程包
  -> agent 读取规则 / 组件 / token / Figma 映射
  -> 按需求生成 React 预览页
  -> 浏览器渲染自检 + 人工审批
  -> 通过 Figma MCP 写入 Figma
  -> 设计师在 Figma 中继续编辑 / 交付
  -> 反馈沉淀回 docs/HARNESS_ISSUES + CHANGELOG-RULES
```

**关键原则**:

- 工程包是设计系统真身。agent 不能只看截图或描述发挥。
- 浏览器预览是进入 Figma 之前的必经关卡。没有渲染确认,不要直接写 Figma。
- Figma 输出必须可编辑,不能只贴一张截图。
- 组件关联要清楚:代码侧组件、Figma 节点、Figma 组件映射要能互相追踪。

---

## 2 · Agent 读仓库顺序

同事把 GitHub 仓库链接给 agent 后,让 agent 按这个顺序读:

1. [`README.md`](../README.md):组件 batch、Figma 节点、运行方式。
2. [`AGENTS.md`](../AGENTS.md):总约束、复用优先级、反 AI slop 清单。
3. [`docs/DESIGN.md`](./DESIGN.md):颜色、字体、间距、营销例外。
4. [`docs/COMPONENT_USAGE.md`](./COMPONENT_USAGE.md):场景到组件的映射、禁止替代、自查清单。
5. [`docs/FIGMA_COMPONENT_MAPPING.md`](./FIGMA_COMPONENT_MAPPING.md):Figma 节点 / 模版 / 工程组件映射。
6. [`docs/INPUT_SOURCE_RULES.md`](./INPUT_SOURCE_RULES.md):文字、低保真、高保真、PRD、营销、混合输入的处理路径。
7. [`COMPONENT_AUDIT.md`](../COMPONENT_AUDIT.md):Figma 覆盖核对。
8. `src/components/index.ts`:真实导出组件。
9. `src/tokens/colors.ts` 与 `src/styles/tokens.css`:颜色与字体 token。

读完以后再生成。没有读完直接开工,视为流程违规。

---

## 3 · 需求进入方式

### 清晰需求

如果需求已经说明页面类型、用户目标、信息模块、状态和素材,agent 可以直接进入组件匹配。

### 模糊需求

按 [`INPUT_SOURCE_RULES.md`](./INPUT_SOURCE_RULES.md) §1 判断:

- 字段性歧义:只反问 1 个最关键问题。
- 方向性歧义:先给 2-3 个信息架构方向,等用户选定后再生成。

### 图片 / 原型 / 多素材

图片不是默认高保真。agent 必须先判断是低保真、高保真还是混合输入。复杂图片输入命中以下任一条件时,先输出理解摘要,不要直接生成:

- 3 张及以上图片。
- 单图包含 2 屏及以上拼接。
- 有流程箭头、跳转关系或状态转移。
- 同一页面有 3 个及以上状态。
- 用户明确说严格还原、不能删减。
- 单次输入包含 4 个及以上独立模块或页面。

---

## 4 · 代码预览阶段

### 4.1 组件调用规则

生成 UI 预览时,必须优先调用 `src/components/` 的真实组件:

- 顶部导航: `TopNav`
- 搜索: `SearchHeader`
- 排序筛选: `SortTabs`、`ChipRail`、`FilterChip`、`FilterOptionGrid`
- 商品: `ProductCardH`、`ProductCardFeeds`、`Price`
- 弹层: `BottomSheet`、`DefaultSheet`、`SheetFrame`
- 弹窗: `Dialog`、`SystemDialog`、`CustomDialog`
- 订单: `OrderCard`
- 表单: `FormInput`、`FormSwitch`、`FormRadioRow` 等
- 图标: `ZhuanIcon`
- 设备: `IOSStatusBar`、`IOSHomeBar`、`IOSKeyboard`

如果没有现成组件,先使用最接近组件的 token 和布局规律写 custom module,并在交付说明里写清原因。不要把 custom module 伪装成正式组件。

### 4.2 颜色 / 字体 / 图标

- 颜色必须走 `var(--zd-color-*)` 或 `zhuanColors.*`。
- 价格和核心数字必须使用 `Price` 或 `var(--zd-font-akrobat)`。
- 图标必须走 `ZhuanIcon`。`public/icons/figma-mcp/` 中未注册的 SVG 只允许组件内部使用。
- `var(--zd-color-link)` 只用于真链接 / 导航入口,不能给分类图标、标签数字、普通右值批量染蓝。

### 4.3 浏览器自检

进入 Figma 前必须运行并检查预览:

```bash
npm install
npm run dev
```

如果端口被占用:

```bash
npm run dev -- --port 5176 --strictPort
```

自检重点:

- 页面在 375/390 宽度下不溢出、不遮挡、不裁切。
- 状态栏、导航、蒙层、底部 home bar 的层级符合 Figma。
- 商品价格、SKU 数字、优惠价使用 Akrobat。
- 图标来自 Figma MCP 导出的 SVG,不是 agent 自画。
- 弹窗 / 半层 / 筛选浮层的蒙版覆盖范围符合设计稿。
- 浏览器 console 无 error,图片和字体无 404。

可选静态审查:

```bash
npm run audit:generated -- .
```

生成业务项目在其它目录时:

```bash
bash scripts/audit-generated-project /path/to/generated-ui
```

---

## 5 · 审批关卡

agent 必须把浏览器预览地址给审批人,例如:

```text
http://localhost:5176/
```

审批人看过后只有三种结论:

- 通过:进入 Figma MCP。
- 有局部问题:先改代码预览,再重新渲染。
- 方向不对:回到输入源判断或信息架构阶段。

不要在预览未通过时把页面写入 Figma,否则 Figma 会变成返工场。

---

## 6 · Figma MCP 交付阶段

### 6.1 写入原则

Figma 输出必须是可编辑结构:

- 画板按 iPhone 宽度组织,默认 375 或 390。
- 页面分区、组件实例、文本、图片都要可编辑。
- 不把浏览器截图作为最终交付稿。
- 能复用 Figma 组件库时,优先导入组件实例。
- 能绑定变量 / 样式时,优先绑定变量 / 样式。
- 图标使用 Figma 文件里的真实图标或工程包中 `public/icons/figma-mcp/` 对应资产。

### 6.2 推荐 MCP 顺序

1. 用 `get_metadata` 或 `get_design_context` 读取目标 Figma 文件结构。
2. 用 `search_design_system` 查找可复用组件、变量、样式。
3. 用 `use_figma` 创建页面 wrapper frame。
4. 分区写入 UI,每次写入后返回 node id。
5. 对照浏览器预览截图检查位置、尺寸、蒙层、状态栏层级。
6. 对关键组件建立或复用 Code Connect 映射。
7. 把 Figma 文件链接交付给设计师继续编辑。

### 6.3 Figma 写入禁止项

- 不用硬编码 hex 绕开变量。
- 不在 Figma 里重新画一套与工程组件不一致的按钮、商品卡、筛选栏、弹层。
- 不把状态栏 / 导航 / 搜索栏层级随意放到蒙层上方或下方,必须按对应模板和 Figma 节点。
- 不使用不可编辑截图冒充 UI 设计稿。

---

## 7 · Code Connect 映射

当 GitHub 仓库与 Figma 文件都稳定后,可以逐步做 Code Connect:

1. 先从 `docs/FIGMA_COMPONENT_MAPPING.md` 找 Figma 节点和代码组件对应关系。
2. 对核心组件优先映射: `Button`、`TopNav`、`SearchHeader`、`ProductCardH`、`ProductCardFeeds`、`BottomSheet`、`Dialog`、`OrderCard`。
3. 映射前确认组件 API 稳定,不要把临时业务 custom module 映射成设计系统组件。
4. 映射后用 Figma MCP 读取确认,再写入文档。

---

## 8 · 交付证据包

复杂页面或多人协作时,生成目录建议带 `.harness-evidence/`:

```text
.harness-evidence/
  input.md
  generation-summary.md
  USER-COLOR-SPEC.md
  PROJECT-COLOR-LICENSE.md
  BASED-ON.md
  audit-result.txt
```

证据包用途:

- 记录输入源和 agent 理解。
- 记录颜色例外是否来自用户原话。
- 记录是否基于上一个通过审查的产物继续迭代。
- 让后续反馈能沉淀到 `docs/HARNESS_ISSUES/`。

---

## 9 · 推荐给同事的 Prompt

```text
请先读取这个 GitHub 仓库里的 README.md、AGENTS.md、docs/DESIGN.md、
docs/COMPONENT_USAGE.md、docs/FIGMA_COMPONENT_MAPPING.md 和
docs/INPUT_SOURCE_RULES.md。

你要基于仓库中的真实 React 组件、token、Figma MCP 图标资产生成 UI,
不要手写替代组件,不要发明颜色、字体或图标。

先做浏览器可运行预览,给我 localhost 地址审批。
我确认后,再通过 Figma MCP 把页面写入 Figma,并保持图层可编辑、组件关系清楚。
```

---

## 10 · 成功标准

- 预览代码能 `npm run build` 通过。
- 浏览器渲染效果接近 Figma 设计稿,且关键状态完整。
- 设计稿写回 Figma 后可编辑。
- 核心 UI 调用工程包组件,不是截图或手写仿制。
- 反馈能回流到 Harness 文档,下次同类问题不再重复发生。
