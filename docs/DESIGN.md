# 转转 C 端设计系统 · 设计总纲(DESIGN.md)

> 设计规范总纲:色彩 / 字体 / 圆角 / 信息密度 / 严禁清单 / 营销例外。
> 配套 `COMPONENT_USAGE.md`(组件用法)与仓库根 `AGENTS.md`(agent 工作约定)一起读。

---

## 0 · 路径基准

本仓库是 Vite + React + TypeScript 平铺工程,所有 DS 资产在 `src/` / `public/` 下。下表是文档里出现的资产路径与真实位置:

| 资产 | 路径 |
|---|---|
| 真实组件源码 | `src/components/*.tsx`(18 个聚合文件) |
| 组件聚合导出 | `src/components/index.ts` |
| 颜色 Token TS 映射 | `src/tokens/colors.ts`(`zhuanColors` / `zhuanColorTokens` / `zhuanColorGroups`) |
| CSS 变量 | `src/styles/tokens.css`(`--zd-*` 全集) |
| 图标 SVG 源 | `public/icons/figma-mcp/*.svg` |
| 图标元数据 | `src/components/iconRegistry.ts`(41 项) |
| 字体文件 | `public/fonts/Akrobat-ExtraBold.otf` |
| 业务页面 / mock | `src/cases/<项目名>/`(自建,不在 `src/components/`) |

> **路径铁律**:不要在 `src/components/` 下加业务一次性页面;不要在生成项目里再写 `import 'inter.css'` 或 `<link href="cdn fonts">`,字体已经通过 `tokens.css` 的 `@font-face` 加载完。

---

## 1 · 产品定位

转转是一个二手商品交易 App,核心品类是**二手手机**和**二手奢侈品**。
用户用 **成色 / 功能等级 / 容量 / 价格** 多维筛选商品,核心场景是 **搜索 → 列表 → 筛选**。
全部界面文案为**简体中文**。

---

## 2 · 视觉语言

**关键词:高密度、克制、少色、商品图自己说话。**

- 不是营销驱动的 App。工具型场景**严禁** banner、轮播、广告位、装饰渐变、毛玻璃、推荐 slogan、感叹号;**默认禁用 emoji**(仅当用户在需求中明确指示使用时方可输出)。
- 文案是"标签式"而非"句子式",不使用"你 / 您"。
- 价格统一 `¥` + 整数无小数,例 `¥2159`。
- 英文型号原样保留大小写:`iPhone`、`GUCCI`、`LV`。

### 2.1 色彩(以新仓库 `--zd-*` token 为权威)

新仓库所有颜色都走 CSS 变量 `var(--zd-color-*)` 或 TS `zhuanColors.xxx` / `zhuanColorTokens.xxx`。**禁止裸 hex**。

#### 品牌 / 行动

| Token(CSS) | TS 别名 | 值 | 用途 |
|---|---|---|---|
| `--zd-color-primary` | `zhuanColors.brandPrimary` | `#FF0F27` | 品牌红 = CTA / 选中态 / 价格强调 / 收藏激活。**新仓库不再区分品牌红 / 操作红**(旧 `#FF0007` 已并入此 token) |
| `--zd-color-primary-soft` | `zhuanColors.brandSoft` | `#FFF2F2` | 极淡红,选中态 chip 背景 / 软强调底色 |
| `--zd-color-link` | `zhuanColors.link` | `#00A3FF` | 文字链 / 系统弹窗强按钮。**只用在文字链与 SystemDialog**,不是装饰色,不要给装饰图标整片刷蓝 |

> **重要:旧仓库 `--zz-brand-red` `#FF0F27` 与 `--zz-action-red` `#FF0007` 在新仓库收敛为单一 `--zd-color-primary` `#FF0F27`**。原"操作红"语义全部走 `--zd-color-primary`,不要再为某个按钮单独引入 `#FF0007`。

#### 文本

| Token | TS 别名 | 值 | 用途 |
|---|---|---|---|
| `--zd-color-text` | `textPrimary` | `#111111` | 标题、商品名 |
| `--zd-color-text-secondary` | `textSecondary` | `#666666` | chip 默认文字、副标题 |
| `--zd-color-text-tertiary` | `textTertiary` | `#999999` | 占位、辅助说明 |
| `--zd-color-text-muted` | `textMuted` | `#BBBBBB` | 价格分隔点、最弱占位 |
| `--zd-color-black` | `black` | `#000000` | 几乎不用,极少数装饰文本 |
| `--zd-color-white` | `white` | `#FFFFFF` | 反白文本 / 白色按钮文字 |

> 100% 黑(`#000`)几乎不用;最深用 `#111`。

#### 表面 / 背景

| Token | 值 | 用途 |
|---|---|---|
| `--zd-color-bg` | `#F8F8F8` | 页面外侧 / 卡片间隔 / 分组背景。**注意:feeds / list-search / 快惠选的内容区仍走白底**,`#F8F8F8` 用在 sheet 上方分隔、tab 之间留白等"页面级别外侧"场景 |
| `--zd-color-dark-panel` | `#1F1F1F` | 暗色 sheet / dark mode panel |
| `--zd-color-mask` | `#111111` | 弹层 mask 基色 |
| `--zd-color-overlay` | `rgba(17,17,17,0.7)` | 弹层背景遮罩 |
| `--zd-color-overlay-light` | `rgba(255,255,255,0.8)` | 浅遮罩 / 反白半透明 |

#### 线 / 边框

| Token | 值 | 用途 |
|---|---|---|
| `--zd-color-line` | `#F0F0F0` | 列表分隔线 / 卡片内细分 |
| `--zd-color-border` | `#D8D8D8` | 卡片边框 / 输入框默认描边 |
| `--zd-color-control-border` | `#D5D5D5` | 表单控件边 / radio / checkbox |

#### 反馈

| Token | 值 | 用途 |
|---|---|---|
| `--zd-color-highlight-darkest` | `#006FFD` | 信息蓝重色(notice/info) |
| `--zd-color-spinner-track` | `#E8E9F1` | spinner 轨道色 |

#### 业务专用色(极少用,看着办)

| Token | 值 | 用途 |
|---|---|---|
| `--zd-color-condition-appearance` | `#2E6E89` | 二奢成色标签深青(`8新` / `瑕疵` / `95新`) |
| `--zd-color-condition-function` | `#EE8B57` | 功能等级标签暖橙 |
| `--zd-color-chip-red-border` | `#FFCCD1` | 红色 chip 边 |
| `--zd-color-chip-info-border` | `#BDD8E3` | 信息蓝 chip 边 |
| `--zd-color-coupon-dash` | `#FFB8C0` | 卡券虚线 |
| `--zd-color-coupon-disabled` | `#FF8A98` | 失效卡券 |
| `--zd-color-avatar-blue` | `#34495E` | 头像底色蓝 |
| `--zd-color-avatar-peach` | `#F2B7A0` | 头像底色桃 |

> **不发明新颜色**。需要新色一律先问维护者。完整 token 元数据(`figmaName` / `usage` / `group`)见 `src/tokens/colors.ts`。

### 2.2 字体

- **PingFang SC** 全部中文文本,权重 300/400/500/600。`var(--zd-font-family)`
- **Akrobat ExtraBold** 仅价格数字 20px / SKU 数字。`var(--zd-font-akrobat)`,文件 `public/fonts/Akrobat-ExtraBold.otf` 已通过 `tokens.css` 的 `@font-face` 加载
- **不使用** Inter、Roboto、系统字体作为主要 UI 字体

### 2.3 圆角

| 半径 | Token | 用途 |
|---|---|---|
| 1 px | — | 卖点标签微胶囊(组件内自有) |
| 2 px | — | 热销榜 badge / 小行动按钮 |
| 4 px | — | 商品图小图、品牌机型卡片整体 |
| 6 px | `--zd-radius-sm` | 1-row chip option / 通用小圆角 |
| 8 px | — | feeds 商品图、TwoLineChip、价格区间预设 chip |
| 16 px | — | 弹层底部圆角(仅左/右下) |
| 18 px | — | 搜索框 pill(h36) |
| 20 / 22 px | — | 主按钮 pill(h40 / h44) |
| 999 px | `--zd-radius-pill` | 全 pill 形 |

### 2.4 阴影、描边、动效

- **几乎无阴影**。仅排序面板等下拉浮层用过 `var(--zd-shadow-panel)`(`0 14px 34px rgba(17,17,17,0.08)`)
- 描边:`0.5px var(--zd-color-border)` / `1px var(--zd-color-text)`(搜索框聚焦)
- 动效仅 caret 翻转 `transform: rotate(180deg) 120ms ease`。**不发明**骨架屏、bounce、page transition 等

### 2.5 图标风格

- **业务装饰位默认线稿、外不裹底色、同页风格不混搭**。具体规则、41 个图标的 `style/usage` 元数据、扩充方式见 `COMPONENT_USAGE.md` §图标风格清单(HARNESS-ICON-V0.1)
- 装饰图标默认走 `--zd-color-text` `#111` 或 `--zd-color-text-tertiary` `#999`,**不要默认刷成 `--zd-color-link` `#00A3FF`**(见 `HARNESS_ISSUES/001.md`)
- 例外(高保真稿 + 使用者明确要求"参考此图标风格")走 `INPUT_SOURCE_RULES.md` §3

---

## 3 · 字号字重总表(速查)

| 场景 | 字号 | 字重 | 颜色 |
|---|---|---|---|
| 标题 / 商品名 | 14–16 | 400 | `--zd-color-text` |
| Tab 文字 | 14 | 500 | `--zd-color-text` / `--zd-color-text-tertiary` |
| chip 文字(默认/选中) | 12 | **300**(open / 选中态**不加粗**) | `--zd-color-text-secondary` / `--zd-color-text` |
| TwoLineChip 主标 | 14 | 400 | `--zd-color-text` / `--zd-color-primary` |
| TwoLineChip 副标 | 11 | 300 | `--zd-color-text-tertiary` / `--zd-color-primary` |
| 价格 ¥ | 14 | 500 | `--zd-color-primary` |
| 价格数字 | 20 | ExtraBold(Akrobat) | `--zd-color-primary` |

> 详见 `src/components/Product.tsx` 中 `<Price />`,使用时不要自己写 `<span>¥xxx</span>`,字体不会用上。

---

## 4 · 布局基线

- iOS 设计宽度 **375 px**(Figma 原稿)
- 状态栏 44 / 搜索栏 44 / 排序栏 36 / chip rail 34,合计 158px chrome
- 横版商品卡 图 90×90 + 文本 239 + 总高 120
- feeds 双排:单卡宽 168,gap 12
- 内容左右 padding 16;商品列表项内部 padding 12

---

## 5 · 组件共享原则(**必读**)

> 任何对 `<Chip>` / `<ChipRail>` / `<SortTabs>` / `<FilterChip>` / `<ProductCardH>` / `<ProductCardFeeds>` / `<ZhuanIcon>` / `<TopNav>` 等共享组件的修改,**必须**改在 `src/components/<聚合>.tsx` 共享源文件,**不允许 per-screen fork**。
> 用户提到"全局 / 同步到全局 / 通用组件"时按硬约束处理。

完成后必须用 `search_files`(grep)全局确认所有消费方都生效,并在回复里列出实际修改的文件。

具体每个组件的硬约束(SortTabs 默认灰打开变红、Chip 字重恒 300、feeds 模式不画整张白卡等)见 `COMPONENT_USAGE.md` §组件硬约束。

---

## 6 · 严禁清单(项目级)

> ⚠️ 本节为**工具型场景**(搜索 / 列表 / 商详 / 订单 / 表单 / 我的 / 设置等)的硬约束。
> 营销场景例外见 § 7。

- ✗ 感叹号 / 营销 slogan / "全网最低 / 独家 / 史上最便宜"等绝对化文案
- ▲ emoji — 默认禁用;仅当用户在需求中明确指示使用时方可输出
- ✗ 渐变 / 毛玻璃 / `backdrop-filter`
- ✗ Inter / Roboto / 系统字体作为主字体
- ✗ 整张卡片画白底 + 阴影 + 圆角(feeds 模式)
- ✗ 在业务页面里重新定义 `function ProductCard` / `function Chip` / `function Icon` / 任何已存在的真实组件
- ✗ 修改一个 case 的副本而不同步到 `src/components/` 共享源(维护者会立即识破)
- ✗ chip 字重在 open / 选中时变化
- ✗ 综合 tab 默认红色(必须默认灰,open 才红)
- ✗ feeds / list-search 页面**内容区**用 `--zd-color-bg` `#F8F8F8`(必须 `--zd-color-white` `#FFFFFF`)
- ✗ 直接 `<img src="public/icons/figma-mcp/xxx.svg">` 当主图标系统(用 `<ZhuanIcon name="..." />`)
- ✗ 凭感觉新发颜色(包括 oklch / hsla),用现有 `--zd-color-*`
- ✗ 自画 SVG 插画,用占位图,向维护者要真素材
- ✗ 占位文本 / 虚假数据 / 凑数图标

---

## 7 · 营销场景例外条款

§ 2 / § 6 的禁令仅在**工具型场景**强制。当生成需求落在"营销场景"时,本条款列出的禁令**软化但不全开放**——营销模块允许视觉张力表达。

### 7.1 触发例外的条件

满足**任一**即可视为营销场景:

1. **页面/模块类型显式属于营销** — 活动会场页 / 节点页(双 11 / 618 / 周年庆)/ 抽奖页 / 倒计时活动入口 / 营销主题 banner / 大促集合页
2. **用户在需求中明确要求** — 关键词:营销氛围、促销活动、造节、会场、主题活动、运营页、活动 banner、节日活动、大促;或显式语句如"做出强营销感"、"要有冲击力"、"要吸引用户点击"、"要有视觉张力"
3. **PRD 显式标记** `type: marketing` / `type: campaign` / `type: 活动`

不满足以上任一时:**默认按工具型处理**,禁令照旧。模糊场景在 `INPUT_SOURCE_RULES.md` 反问用户。

### 7.2 例外软化清单(仅营销场景可用)

| 默认禁用项 | 营销场景 | 限制 |
|---|---|---|
| 装饰渐变 | ✓ 允许 | 仅用在营销模块本身(活动 banner / 倒计时条 / 抽奖入口卡);同一页面内的**商品卡 / 列表项 / 商详正文**仍禁渐变 |
| 大面积品牌红 | ✓ 允许 | 营销模块可用 `--zd-color-primary` `#FF0F27` 作为大底色 / 大色块;非营销模块仍只用作 token 强调 |
| 暖红 / 橙红辅色 | ✓ 允许 | 营销可引入 `#FF7466` / `#FF483C` 等暖红,但需在该模块内自洽(**不污染全局 token**,即不要写进 `tokens.css`) |
| 营销文案 | ✓ 允许 | 但**仍不允许**绝对化文案:"全网最低 / 独家 / 史上最便宜 / 错过等一年";可用"低价 / 优惠 / 立省 ¥N / 限时" |
| 感叹号 | ✓ 允许 | 营销标题可用,但全模块不超过 2 处 |
| 投影 / 装饰发光 | ✓ 允许 | 仅活动模块;不允许在常规商品卡 / 商详卡上加 |
| emoji | ⛔️ 仍禁 | 即便营销,仍用 SVG icon。emoji 跨平台一致性差且与转转字体不协调 |
| 毛玻璃 / `backdrop-filter` | ⛔️ 仍禁 | 性能 + 一致性考虑,不软化 |

### 7.3 营销模块在页面里的边界

- 营销模块**视觉张力可以强**,但必须**位置明确、与工具型内容分区**
- 例:活动 banner 在 TopNav 下方独占 96-160h,下方的商品列表仍走严禁清单
- 不允许把"营销视觉"渗透到商品卡、商详正文、订单卡、表单等工具型组件
- 在 PR / 交付里标注"本模块属营销场景,已套用 § 7 例外条款"

### 7.4 工具型 vs 营销型快速判定表

```
工具型(默认 / 守严禁清单)
  搜索 · 列表 · 商详 · 订单 · 表单 · 回收估价 · 卖闲置 · 装机大师
  · 快惠选 · 我的 · 设置 · 反馈 · 帮助 · 地址管理

营销型(走 § 7 例外)
  活动会场 · 节点专题(双11/618/周年)· banner · 倒计时入口
  · 抽奖 · 大促集合页 · 主题运营页
```

不确定时默认按工具型,反问用户。

---

## 8 · Voice & Brand

The brand voice is restrained, practical, and commerce-first. Use Simplified Chinese labels such as 综合、价格、型号、筛选、重置、确定. Prices use `¥` plus integers only. Keep product names such as iPhone, GUCCI, and LV in their source casing.

---

## 9 · Anti-patterns(综合反清单)

Avoid emoji by default, marketing slogans, exclamation-heavy copy, banners, carousels, decorative gradients, glassmorphism, generic rounded cards with shadows, whole-card containers in feeds, unsourced colors, renamed filter tabs, and per-screen forks of shared primitives.
