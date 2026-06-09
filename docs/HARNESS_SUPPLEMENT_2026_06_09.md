# 2026-06-09 同事补充包解析与转译

来源: `/Users/zz/Downloads/合并给朱艺权-2026-06-09.zip`

这份补充包不是组件源码补丁,而是一套 Harness / agent 训练规则。原始内容基于旧仓库形态: `packages/design-system/`、`runtime/zhuan-app.bundle.js`、`outputs/`、`workbench-bootstrap`、`--zz-*` token。当前工程是 Vite + React + TypeScript 平铺结构,真实组件在 `src/components/`,token 为 `--zd-*`。

因此合并策略是: **不剔除规则语义,只转译执行载体**。

---

## 1 · 文件解析

| 补充包文件 | 作用 | 当前工程处理 |
|---|---|---|
| `AGENTS.md` | agent 开工、工作台、反馈回流、维护者约束 | 规则并入当前 `AGENTS.md`、`AI_UI_WORKFLOW.md` 与本文;旧 workbench 命令转为 Vite / 浏览器预览流程 |
| `CONTRIBUTING.md` | 多人协作、分支、PR、决策权 | 转译为仓库根 `CONTRIBUTING.md` |
| `docs/INPUT_SOURCE_RULES.md` | 输入源分流、颜色三声明、跨产物参考 | 当前文档已含 V0~V0.3,本次补齐 `HARNESS-COLOR-V0.2` 与 §2.5 |
| `docs/CHANGELOG-RULES.md` | 规则事故源头和演进账本 | 保留现有迁移账本,追加本次转译记录 |
| `scripts/audit-generated-project` | 生成项目静态审查 | 改写为当前 `src/components` / `--zd-*` / `ZhuanIcon` 版本 |
| `__MACOSX/*` | macOS 压缩包元数据 | 忽略 |

---

## 2 · 旧概念到当前工程映射

| 旧补充包概念 | 当前工程等价物 |
|---|---|
| `packages/design-system/` | `src/components/`、`src/tokens/`、`src/styles/tokens.css`、`public/icons/figma-mcp/` |
| `packages/design-system/ui_kits/zhuan-app/*.jsx` | `src/components/*.tsx` |
| `runtime/zhuan-app.bundle.js` | Vite dev/build 输出,无需手动重打 runtime bundle |
| `outputs/<项目名>/` | 建议使用独立业务预览目录;如果在本工程里演示,使用 `src/cases/<项目名>/` 或模板预览,不要污染共享组件 |
| `workbench-bootstrap` | `npm install` + `npm run dev` + 浏览器审批 |
| `--zz-brand` | `--zd-color-primary` |
| `--zz-brand-bg` | `--zd-color-primary-soft` |
| `--zz-link` | `--zd-color-link` |
| `--zz-fg-1` | `--zd-color-text` |
| `--zz-fg-2` | `--zd-color-text-secondary` |
| `--zz-fg-3` | `--zd-color-text-tertiary` |
| `--zz-fg-dim` | `--zd-color-text-muted` |
| `<Icon name="...">` | `<ZhuanIcon name="...">` |
| `COMPONENT_API.md` | 当前以 `src/components/*.tsx` 类型定义 + `docs/COMPONENT_USAGE.md` 承接 |
| `audit [9][12][13]` | `scripts/audit-generated-project` 中的颜色、证据、溯源检查 |

---

## 3 · 完整保留的约束

### 3.1 开工同步与仓库更新

补充包中的 `HARNESS-DISPATCH-V1.2`、`HARNESS-BOOTSTRAP-V0.1`、`DISPATCH-V1.4-PULL-RESTORE` 解决的是同一个问题:伙伴端拿到旧 clone 或被 agent 改脏的副本后,新规则不会生效。

当前工程保留的约束:

- 同事从 GitHub 使用本包前,应确认本地仓库是最新版本。
- 允许的唯一自动 git 更新动作是 `git pull --ff-only`。
- `git pull --ff-only` 失败时停下,不要让 agent 自行 `reset`、`checkout`、`stash`、`rm -rf` 或强行合并。
- 旧 workbench 的 bootstrap 规则不再执行,但其目的由 `npm install` + `npm run dev` + 浏览器预览承接。

### 3.2 设计系统只读

生成业务页面时,以下路径只读:

- `src/components/**`
- `src/tokens/**`
- `src/styles/tokens.css`
- `public/icons/figma-mcp/**`
- `public/fonts/**`

只有维护者明确说“扩展组件库 / 修改组件 / 更新 token”时,agent 才能改这些路径。

### 3.3 真组件优先

保留补充包的降级顺序:

1. 直接调用 `src/components/index.ts` 中已有组件。
2. 通过 props 组合已有组件。
3. 使用现有组件的 token、字号、间距、圆角规律写 custom module。
4. 如果要沉淀为正式组件,先征得维护者同意。

禁止用普通 `div` 手写替代 `TopNav`、`ProductCardH`、`FilterChip`、`BottomSheet`、`Dialog`、`Toast`、`Price`、`ZhuanIcon`。

### 3.4 输入源分流

当前 [`INPUT_SOURCE_RULES.md`](./INPUT_SOURCE_RULES.md) 已保留:

- 文字指令清晰 / 模糊分流。
- 字段性歧义和方向性歧义分流。
- 图片附件先判断低保真 / 高保真 / 判断不出来。
- 复杂附件先输出理解摘要。
- 低保真只取信息架构,不继承视觉值。
- 高保真只提取视觉意图,最终回到组件和 token。
- PRD 先提 UX Brief。
- 营销例外必须命中 `DESIGN.md` §8。
- 混合输入按 PRD / 设计系统 / 低保真 / 高保真权重判断。

### 3.5 颜色约束 V0.2

补充包中的 `HARNESS-COLOR-V0.2` 已转译为 `--zd-*` 版本:

- 默认颜色白名单:
  - `--zd-color-text`
  - `--zd-color-text-secondary`
  - `--zd-color-text-tertiary`
  - `--zd-color-text-muted`
  - `--zd-color-primary`
  - `--zd-color-primary-soft`
- `--zd-color-link` 只用于真链接 / 真导航入口。
- 业务装饰类、分类图标、右值、标签数字不能批量用链接蓝。
- 用户指定颜色必须有 `HARNESS-COLOR-INTENT: user-spec` 和 `.harness-evidence/USER-COLOR-SPEC.md`。
- user-spec 证据中的用户原话必须真的包含颜色词。
- 高保真项目级颜色许可必须有 `HARNESS-COLOR-INTENT: hifi-license` 和 `.harness-evidence/PROJECT-COLOR-LICENSE.md`。
- 不确定时默认回到中性色,不能切例外模式。

### 3.6 跨产物参考

补充包中的 §2.5 已保留:

- 优先重新调用真组件生成,不要复制旧产物改壳。
- 确实基于旧产物继续迭代时,必须写 `.harness-evidence/BASED-ON.md`。
- `source-audit-status` 必须是 `pass`。
- 旧产物没有通过审查,不能当模板。

### 3.7 图标风格

保留 `HARNESS-ICON-V0.1`:

- 工具型页面默认线稿、透明底、同页不混搭。
- 低保真图标颜色、底色块、面型风格都不继承。
- 高保真图标风格例外必须同时满足:输入源是高保真,且用户文字明确说按图标风格走。
- 组件内部状态图标不作为业务装饰图标直接调用。

### 3.8 反馈回流

保留补充包中的反馈闭环:

- 用户说“不对 / 怪 / 跑偏 / 不像转转 / 组件不该这样用”时,先整理 Harness 反馈卡,再修当前页面。
- 反馈按 A/B/C 初判:
  - A:客观规则违反。
  - B:专业判断跑偏。
  - C:个人审美偏好。
- A/B 类沉淀到 `docs/HARNESS_ISSUES/` 与 `docs/CHANGELOG-RULES.md`。
- 用户提到 HI 编号时,先查归档再用业务语言回复,不要只讲 token 或脚本编号。

### 3.9 审查脚本

旧脚本依赖 workbench / runtime。当前脚本保留其检查意图:

- 是否调用真实组件。
- 是否手写替代已有组件。
- 是否绕过 `ZhuanIcon` 直接拼图标。
- 是否误用颜色 token / 裸写 hex / 伪造 user-spec。
- 是否复制未通过审查的旧产物。
- `Price` / `ProductCardH.price` 是否塞入非数字。
- 是否引入外部字体。
- 是否使用渐变、毛玻璃、伪装饰图位等反模式。
- 如果存在 `.harness-evidence/`,自动写入 `audit-result.txt`。

---

## 4 · 不原样复制的内容

以下内容不是删除规则,而是旧执行载体在当前工程中不存在,已转译:

- `scripts/workbench-bootstrap`:当前没有旧 workbench,用 Vite dev server 取代。
- `runtime/zhuan-app.bundle.js`:当前 Vite 构建无需维护者手动重打 bundle。
- `packages/design-system/ui_kits/`:当前真实源码为 `src/components/*.tsx`。
- `outputs/` 工作台目录:当前工程包不强制内置 outputs,业务预览可放外部项目或 `src/cases/`。
- `--zz-*` token:全部转为 `--zd-*`。

---

## 5 · 本次并入文件

- [`AI_UI_WORKFLOW.md`](./AI_UI_WORKFLOW.md)
- [`HARNESS_SUPPLEMENT_2026_06_09.md`](./HARNESS_SUPPLEMENT_2026_06_09.md)
- [`../CONTRIBUTING.md`](../CONTRIBUTING.md)
- [`../scripts/audit-generated-project`](../scripts/audit-generated-project)
- [`INPUT_SOURCE_RULES.md`](./INPUT_SOURCE_RULES.md)
- [`CHANGELOG-RULES.md`](./CHANGELOG-RULES.md)
- [`../README.md`](../README.md)
- [`../AGENTS.md`](../AGENTS.md)
