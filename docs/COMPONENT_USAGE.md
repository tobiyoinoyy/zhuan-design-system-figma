# 转转 C 端设计系统组件调用指南(COMPONENT_USAGE.md)

> 路径基准:本仓库为 Vite + React + TS 平铺工程,所有真实组件在 `src/components/*.tsx`,通过 `src/components/index.ts` 聚合导出。
> 配套 `DESIGN.md`(设计语言总纲)与仓库根 `AGENTS.md`(agent 工作约定)一起读。

本文件指导生成业务页面 / 组件审核 / 模版扩展时主动调用真实组件,避免只复用颜色、字体、图标或商品图片。

---

## 总原则

- 先在 `src/components/index.ts` 里搜共享组件,再写业务组合代码
- 已有组件必须调用,不要在业务页面里手写同名替代物
- 组件缺能力时,优先扩展共享组件;不要在单个 case 里复制出新组件
- 营销活动页可以新增活动视觉模块,但导航、图标、商品、价格、筛选、弹层仍使用共享组件

---

## 1 · 18 个聚合文件能力概览

新仓库 `src/components/` 下 18 个聚合 `.tsx`,具体导出符合下列分组(完整名字以 `src/components/index.ts` 为准):

| 聚合文件 | 主要导出 |
|---|---|
| `Button.tsx` | `Button`、`ButtonBar`、`OptionButton` + 各自 props 类型 |
| `Tabs.tsx` | `Tabs` + `TabsProps` |
| `SearchHeader.tsx` | `SearchHeader`(`mode` 多形态)+ `SearchHeaderProps` |
| `Switch.tsx` | `Switch` + `SwitchProps` |
| `Form.tsx` | `FormSwitch`、`FormRadioRow`、`FormInput`、`FormVerticalRadioList`、`FormCheckboxRow` |
| `Feedback.tsx` | `Toast`、`LoadingSpinner` + `ToastProps` |
| `Filter.tsx` | `SortTabs`、`FilterChip`、`ChipRail`、`FilterOptionGrid`、`QuickFilterDropdown` + 配套类型 |
| `Navigation.tsx` | **`TopNav` 5 variant**(`normal` / `plain` / `immersive` / `white` / `tabs`)、`BottomBarPDP`、`BottomButtonBar` |
| `Product.tsx` | `ProductImage`、`ConditionAppearanceTag`、`ConditionFunctionTag`、`ConditionCombo`、`ConditionTextBadge`、`ConditionTextBlock`、`PromoTag`、`Price`、`SellChip`、`ProductTitle`、`ProductCardFeeds`、`ProductCardH` |
| `Sheet.tsx` | `SheetTitleBar`、`SheetFrame`、`BottomSheet`、`DefaultSheet`、`QuantityStepper`、`TagSelectionSheet`、`SkuSheet`、`CouponSheet`、`CancelOrderSheet`、`TextCopySheet`、`RulesSheet`、`RegionSelectSheet` |
| `Dialog.tsx` | `Dialog`、`DialogBody`、`DialogActions`、`SystemDialog`、`CustomDialog` + `DialogAction` |
| `ColorTokens.tsx` | `ColorTokenGallery`(走查面板,业务页面不直接调用) |
| `OrderCard.tsx` | `OrderCard` + `OrderCardVariant` / `OrderAction` / `OrderProduct` |
| `Device.tsx` | `IOSStatusBar`、`IOSHomeBar`、`IOSKeyboard` |
| `Brand.tsx` | `OfficialVerification`、`ZHUANLogo`、`Overlay` |
| `Business.tsx` | `AddressFilter`、`SelectCorner`、`SelectionLabel`、`CurrentLocation`、`CardOption` |
| `Templates.tsx` | 12 个走查模板(`QuickChoiceTemplate` / `SortDropdownTemplate` / `QuickFilterTemplate` / `FilterSheetTemplate` / `EmptyStateTemplate` / `OrderListTemplate` / `OrderDetailDialogTemplate` / `CardFormTemplate` / `FullWidthFormTemplate` / `LuxuryFeedsTemplate` / `HorizontalCardsTemplate` / `ZhuanUITemplateGallery`),业务页面参考结构、**不直接渲染** |
| `icons.tsx` | `ZhuanIcon`、`SearchIcon`、`BackIcon`、`ChevronDownIcon`、`MoreIcon`、`CheckIcon`、`CloseIcon`、`InfoIcon`、`RadioCheckIcon` |
| `iconRegistry.ts` | 41 项图标元数据 + `IconName` / `IconMeta` 类型 |

---

## 2 · 场景到组件映射

| 生成场景 | 必用组件 | 聚合文件 |
|---|---|---|
| 顶部导航 / 商详白底导航 / 沉浸导航 | `TopNav`(按 variant 选) | `Navigation.tsx` |
| 搜索列表页 | `SearchHeader`、`SortTabs`、`ChipRail`、`ProductCardH` | `SearchHeader.tsx`、`Filter.tsx`、`Product.tsx` |
| 双列商品流 / 二奢 feeds | `ProductCardFeeds`、`Price`、`ZhuanIcon` | `Product.tsx`、`icons.tsx` |
| 筛选 / 排序 / 价格区间 | `SortTabs`、`FilterChip`、`ChipRail`、`FilterOptionGrid`、`QuickFilterDropdown`、`FilterSheetTemplate`(参考) | `Filter.tsx`、`Templates.tsx` |
| 商品卡 / 价格 / 标签 | `ProductCardH`、`ProductCardFeeds`、`Price`、`PromoTag`、`SellChip`、`ConditionAppearanceTag` 等 | `Product.tsx` |
| 图标 | `<ZhuanIcon name="..." />` | `icons.tsx`,数据 `iconRegistry.ts` |
| 底部弹层 / 对话 | `BottomSheet`、`DefaultSheet`、`SheetFrame`、`Dialog`、`SystemDialog`、`CustomDialog` | `Sheet.tsx`、`Dialog.tsx` |
| 按钮 / 底部操作区 | `Button`、`ButtonBar`、`OptionButton` | `Button.tsx` |
| Toast / 轻提示 | `Toast`、`LoadingSpinner` | `Feedback.tsx` |
| iOS 设备框 | `IOSStatusBar` + `IOSHomeBar`(必要时 `IOSKeyboard`) | `Device.tsx` |
| 订单 / 履约 | `OrderCard` + 必要的 `OrderProduct` 子项;详情摘要参考 `OrderListTemplate` / `OrderDetailDialogTemplate` | `OrderCard.tsx`、`Templates.tsx` |
| 表单 | `FormInput`、`FormSwitch`、`FormRadioRow`、`FormVerticalRadioList`、`FormCheckboxRow`、参考 `CardFormTemplate` / `FullWidthFormTemplate` | `Form.tsx`、`Templates.tsx` |
| 地址 / 区域选择 | `RegionSelectSheet`、`AddressFilter`、`CurrentLocation` | `Sheet.tsx`、`Business.tsx` |
| 优惠券 / 售后 / 取消订单 | `CouponSheet`、`CancelOrderSheet`、`TextCopySheet`、`RulesSheet`、`SkuSheet` | `Sheet.tsx` |

订单/售后相关的选择边界:

- `OrderCard` 用于订单列表、履约列表、售后单列表中的整单卡片
- 订单详情 / 退款详情 / 售后详情 / 寄回用户等页面里的"商品摘要区"用 `OrderProduct` 子项嵌入页面或参考 `Templates.tsx` 里对应模板的写法
- 不要因为需求里出现"订单/售后/商品"就默认 `OrderCard`。先判断页面位置:列表卡走 `OrderCard`,详情摘要走 `OrderProduct` / 模板里更匹配的详情卡

---

## 3 · TopNav variant 选型

新仓库 `<TopNav>` 5 种 variant,按"页面类型 → variant"对号入座,不要混用,也不要手写代替。具体每个 variant 的对应 Figma 节点见 README.md / Navigation.tsx 内注释:

| 页面类型 | variant | 结构 | 节点参考 |
|---|---|---|---|
| 普通详情页 / 二级页 | `normal` | 返回 + 居中标题 + 右侧文字或图标 | 502:4325 |
| 沉浸态(顶部是大图,如商详) | `immersive` | 透明背景 + 收藏者头像组 + 右侧三按钮 | 502:4326 |
| 商品详情灰底搜索栏 | `plain` 或专用 search 形(看 Navigation.tsx 实际导出) | 返回 + 灰色搜索框 + 右侧 share/rent/more 三圆按钮 | 502:4878 / 502:4450 |
| 频道页 / 专场 / 品牌频道(如"官方严选") | `white` | 返回 + 频道标题 + 白底描边搜索框 | 502:4808 |
| 顶部带 tabs 的二级页 | `tabs` | 返回 + Tabs + 右侧图标 | 502:4449 |

> **频道页的硬约束**:必须用 `<TopNav variant="white" />`,不要拼"标题 + 小搜索框"。也不要把灰底 `plain` 搬过来 —— 那是商详灰底搜索栏,含右侧三按钮,与频道页结构不同。

---

## 4 · 最小可接受调用

业务页面应至少出现以下真实组件调用中的**四类**:

```tsx
import {
  TopNav, BottomBarPDP, BottomButtonBar,
  SearchHeader, SortTabs, ChipRail,
  ProductCardH, ProductCardFeeds, Price,
  BottomSheet, DefaultSheet,
  Button, ButtonBar,
  Toast,
  ZhuanIcon,
  IOSStatusBar, IOSHomeBar,
} from '../../components';

<TopNav variant="normal" title="标题" />
<TopNav variant="white" title="官方严选" placeholder="搜型号/品牌" />
<TopNav variant="plain" /> {/* 商详灰底 */}
<SearchHeader keyword="iPhone 15 Pro" />
<SortTabs active="价格" />
<ChipRail chips={...} selected={...} />
<ProductCardH title="..." price="8078" />
<ProductCardFeeds title="..." price="4380" promo="满1299减100" />
<BottomSheet open onClose={...}>...</BottomSheet>
<Toast open={!!toast} message={toast?.message} duration={1600} onClose={() => setToast(null)} />
<ZhuanIcon name="rent" />
```

> `<ZhuanIcon name>` 走 `IconName` 字面量类型,IDE 会提示 41 个名字。打错 TypeScript 直接报。

---

## 5 · 禁止替代

- 不要用 `.topnav`、`.header`、`.nav-icon` 手写替代 `<TopNav>`
- 不要在业务项目里新建 `ChannelSearchBar`、`SearchBar`、`SmallSearch` 这类自定义"顶部搜索栏组件"代替 `<TopNav>`。频道页/专场页(标题就是频道名 + 一个搜索入口)必须 `<TopNav variant="white" title="..." placeholder="..." />`
- 不要用 `.chip` 手写替代 `<FilterChip>` / `<ChipRail>`
- 不要用 `.product-card` 手写替代 `<ProductCardH>` / `<ProductCardFeeds>`
- 不要直接 `<img src="public/icons/figma-mcp/rent.svg">` 替代 `<ZhuanIcon name="rent" />`
- 不要用普通固定条手写 iOS 状态栏;需要时调用 `<IOSStatusBar />`
- 不要用 `.toast` 手写轻提示;需要时调用 `<Toast>`,并提供短暂反馈生命周期
- 不要在业务里复制一份 `<Price>`、`<PromoTag>`、`<SellChip>`
- 不要在 `<ProductCardH>` / `<ProductCardFeeds>` 外层包装上再加 `border-bottom` / `border-top` / `divider` 类样式。组件自身已通过留白区分,外层包装重复加横线属于回流式覆盖组件规则,**禁止**。需要分组用 section 间留白或 SectionHeader,不用线

---

## 6 · App / H5 设备边界

- `<IOSStatusBar />` + `<IOSHomeBar />` 负责 iOS 状态栏和 home indicator。页面第一层直接放 `<TopNav>`,不要再写 `.status-bar`、`.status-spacer` 或额外顶部 padding
- 真实 App 界面内部只放产品会出现的控件;链路演示、画板切换、页面导航说明等调试控件必须放在设备框外侧
- 页面底部固定操作区使用 `<ButtonBar>` 或 `<BottomBarPDP>` / `<BottomButtonBar>`。屏幕结构必须是 `TopNav` + 可滚动内容 + 底部操作区三段式;让内容区滚动,底部操作区作为屏幕根容器的底部兄弟节点固定在底部,不要把它放进滚动内容里
- 可滚动内容区如果用 `display:flex; flex-direction:column`,直接子级卡片/section 必须保持自然高度,不允许被 flex shrink 压缩;使用 `flexShrink:0`,或改用 block 流加 margin/gap。生成后必须检查卡片内容没有被裁切
- `<BottomSheet>` / `<DefaultSheet>` 负责弹层底部安全区。弹层按钮优先传 `actions`,不要在弹层内部再手写 home indicator
- `<Toast>` 默认显示在设备水平/垂直中心,默认 1600ms 后消失;长文案最多 2200ms。生成项目时用 `showToast(message, duration)` 或等效受控状态,并传 `onClose={() => setToast(null)}`,**禁止常驻**。只有明确需要避开键盘或底部操作栏时,才传 `placement="bottom"`

推荐结构:

```tsx
<div className="preview-toolbar">{/* 方案切换按钮放这里,在设备框外 */}</div>
<div style={{ width: 390, height: 844, display: 'flex', flexDirection: 'column' }}>
  <IOSStatusBar />
  <TopNav variant="normal" title="售后处理" />
  <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
    {/* 页面主体,直接子级 flexShrink:0 */}
  </div>
  <ButtonBar layout="primary" actions={[{ label: '取消' }, { label: '提交处理' }]} />
  <IOSHomeBar />
  <Toast open={!!toast} message={toast?.message} duration={1600} onClose={() => setToast(null)} />
</div>
```

---

## 7 · 自定义模块的布局反模式

业务里没现成组件、需要自己写新模块(如品质保障面板、活动腰带、卖家信息卡)时,避开下面这几条:

- **不要"绝对定位填右侧 + 固定宽度遮罩"**。常见错误写法:左侧文字 in-flow,右侧装饰用 `position: absolute; right: 0; width: 104px`,再给文字加 `max-width: 228px` 防被压住。结果是装饰宽度小于遮罩、右侧大片留白、文案宽度被锁死、首屏改尺寸全套要重调。**改用 flex 两列**:父容器 `display: flex; align-items: center; gap: 12px;`,左列 `flex: 1; min-width: 0;` 装文案(`min-width: 0` 让长文本能正常省略不撑破布局),右列固定宽度装装饰
- **不要给"防被遮罩压住"的文字写死 `max-width: <px>`**。flex 布局下用 `flex: 1; min-width: 0;` 自然让出空间,比硬编码像素稳。一定要限宽则用 `max-width: calc(100% - <右列宽度> - <gap>)`,跟着右列变
- **装饰元素的视觉占位和实际尺寸要匹配**。58px 宽的小图配 104px 的遮罩 = 右侧空一截;要么把图放大到接近遮罩宽度,要么把遮罩缩到接近图宽度。两个数字不要互相打架
- **可点击的卡/面板用一个 onClick 包外层**。不要给标题、副标题、装饰各绑一个 onClick;外层一个、内部 chevron 走真组件(如 `<ZhuanIcon name="jump" />`)

参考结构(自定义两列卡片):

```tsx
<div className="quality-panel" onClick={onOpen} style={{
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: 16,
  background: 'var(--zd-color-white)',
  borderRadius: 12,
}}>
  <div style={{ flex: 1, minWidth: 0 }}>
    <div className="quality-title">官方严选 · 品质保障</div>
    <div className="quality-sub">平台质检｜报告可查｜整机实拍｜一机一租</div>
    <div className="quality-link">点击了解严选标准 <ZhuanIcon name="jump" /></div>
  </div>
  <div style={{ flex: '0 0 76px', position: 'relative' }}>
    {/* 装饰图 + seal 在这个 76px 容器内绝对定位组合 */}
  </div>
</div>
```

---

## 8 · 组件硬约束(来自迭代沉淀)

> 任何对共享组件的修改,**必须**改在 `src/components/<聚合>.tsx` 共享源文件,**不允许 per-screen fork**。修完用 `search_files` 全局确认所有消费方都生效,并在回复里列出实际修改的文件。

### 8.1 Chip / FilterChip
- 默认文字 `--zd-color-text-secondary` `#666`,选中文字 `--zd-color-text` `#111`
- **font-weight 恒为 300**,open / 选中**不允许加粗**
- 带下拉的 chip:右侧 caret,open 时旋转 180°

### 8.2 SortTabs(综合 / 价格 / 型号 / 筛选)
- 综合默认 `--zd-color-text-secondary` `#666` + 灰 caret-down;**只在**下拉打开时变 `--zd-color-primary` + caret-up(实心三角,非旋转)
- 任何一个 chip 下拉打开时,必须自动关闭其他下拉(互斥)

### 8.3 SortDropdown / QuickFilterDropdown
- 弹层为 `position: absolute` 浮层 + 自带 `var(--zd-color-overlay)` scrim,覆盖在商品列表上方(**不是** in-flow 把列表挤下去)
- 弹层底部 `borderRadius: 0 0 16px 16px`,与 chip rail 视觉拼接,无缝
- 内边距 `32px 12px 16px`,chips gap 12px,底部"重置/确定"按钮 h44 / radius 22

### 8.4 ProductCardFeeds(二奢双列)
- 描边只画在**图片**上(蓝框位置),标题、价格直接落在页面背景上 — **不**给整张卡画白色 / 灰色卡片容器
- 二奢卡片自动根据 `luxuryTag` 推导 variant,显示单段深青色 `8新` / `瑕疵` / `95新` 标签(`--zd-color-condition-appearance`)

### 8.5 ProductCardH(横版)
- 价格走 `<Price value="..." />`,**纯数字**(规则编号 HARNESS-001):value 不接受`¥` / 千分位 / 货币符号 / 中文,字体 Akrobat-ExtraBold 自动应用
- `promo` ≤ 8 个汉字(规则编号 HARNESS-002)
- variant 显式传,**不交叉字段**(规则编号 HARNESS-003)

---

## 9 · 字号字重总表(组件级速查)

| 组件 / 位置 | 字号 | 字重 | 颜色 |
|---|---|---|---|
| TopNav 标题 | 17 | 500 | `--zd-color-text` |
| 商品名 / 列表标题 | 14–16 | 400 | `--zd-color-text` |
| Tab 文字(active / inactive) | 14 | 500 | `--zd-color-text` / `--zd-color-text-tertiary` |
| Chip / FilterChip 文字 | 12 | **300** | `--zd-color-text-secondary` / `--zd-color-text` |
| TwoLineChip 主标 / 副标 | 14 / 11 | 400 / 300 | `--zd-color-text` 或 `--zd-color-primary` |
| Price ¥ 符号 | 14 | 500 | `--zd-color-primary` |
| Price 数字 | 20 | ExtraBold(Akrobat) | `--zd-color-primary` |
| PromoTag | 11 | 400 | `--zd-color-primary` |
| SellChip | 11 | 400 | 见组件源 |

---

## 10 · 自查清单(交付前过一遍)

### 必须通过

- 业务页面里出现真实组件调用:`<TopNav>` / `<ZhuanIcon>` / `<FilterChip>` / `<ProductCardH>` / `<ProductCardFeeds>` / `<BottomSheet>` 或 `<DefaultSheet>` / `<Button>` 中至少**四类**
- 页面 mount 后浏览器 console 没有 error / 没有 broken icon / 没有 font 加载失败
- 颜色全部走 `var(--zd-color-*)` 或 `zhuanColors.*`,**没有**裸 hex
- 字体走 `var(--zd-font-family)` / `var(--zd-font-akrobat)`,没有 import Inter / Roboto

### 需要警惕

出现以下内容时,通常代表没有真正调用组件:

- 大量 `.topnav`、`.chip`、`.product-card`、`.sheet`、`.status-bar` CSS 类
- 直接写 `<img src="public/icons/figma-mcp/...">` 作为主图标系统
- 业务里重新定义 `function ProductCard` / `function Chip` / `function Icon`
- 商品卡、导航栏、筛选栏、弹层全部由普通 `div` 拼出来
- 装饰图标整片刷 `--zd-color-link` `#00A3FF`(见 `HARNESS_ISSUES/001.md`)

### 建议命令

在业务目录里检查组件调用:

```bash
rg "from '\\.\\./components'|from '\\.\\./\\.\\./components'|<TopNav|<ZhuanIcon|<FilterChip|<ProductCardH|<ProductCardFeeds|<BottomSheet|<DefaultSheet|<Button" .
```

检查疑似手写替代:

```bash
rg "class=\"[^\"]*(topnav|chip|product-card|sheet|status-bar)|function (ProductCard|Chip|Icon)|public/icons/figma-mcp" .
```

---

## 11 · 交付说明模板

```md
本业务页面已按转转 C 端设计系统组件优先规则生成。

已调用组件:
- TopNav(variant: normal) / SearchHeader / SortTabs / ChipRail
- ProductCardH / ProductCardFeeds / Price / PromoTag
- ZhuanIcon / FilterChip / BottomSheet / Button

未调用组件的部分:
- 活动视觉区为本项目场景新增,但其中图标、商品卡、价格仍来自共享组件
```

---

## 12 · 图标风格清单(HARNESS-ICON-V0.1)

### 默认规则(业务装饰图标)

- **风格默认线性**:业务页面装饰位(分组左侧、列表项左侧、引导提示等)默认调线稿图标
- **底色默认透明**:装饰图标外不裹底色块。除非输入源是高保真且使用者明确说"参考此图标风格(含底色)",按 `INPUT_SOURCE_RULES.md §3` 走例外
- **风格不混搭**:同一页面所有装饰图标必须统一风格(同为线 / 同为面),不能线面混搭
- **后缀 / variant 只用于组件内部状态**:激活态、方向态变体(如 `favorite-active`、`sort-asc` / `sort-desc`、`filter-collapse-done`)由组件源码调用,业务装饰位不调用

### 41 个图标

新仓库图标元数据由 `src/components/iconRegistry.ts` 维护(每项含 `name` / `figmaName` / `nodeId` / `category` / 可选 `componentSet` 与 `defaultColor`)。当前 41 个 `name`:

```
abnormal · back · back-white · cart · category-brand-model
close · collapse · compare · customer-service · dialog-back
expand · favorite · favorite-active · favorite-folder
filter · filter-collapse · filter-collapse-done · filter-expand · filter-expand-done · filter-region
footprint · info · jump · jump-shape · location
message · more · normal · order · qty-minus · qty-plus
red-dot · red-dot-number · refresh · rent · scan
search · sell · settings · share
sort · sort-asc · sort-desc
```

> `category: filter` 中带 `-done` 后缀的(`filter-expand-done` / `filter-collapse-done` / `sort-asc` / `sort-desc`)是组件内部"已选中"状态,业务装饰位**不直接调用**。同理 `favorite-active`、`back-white`、`red-dot-number` 是组件状态变体。
>
> `public/icons/figma-mcp/` 目录下还有 `qty-minus` / `qty-plus` / `toast-fail` / `toast-loading` / `toast-success` 等 SVG 文件未注册到 `iconRegistry.ts`,暂为组件内部资源(由 `Sheet.tsx`、`Feedback.tsx` 直接 `<img>` 引用),业务装饰位也不调用。

### 同页风格一致的判定

同一页面所有"业务装饰位"图标必须保持风格统一:

- 全部线稿(推荐,工具型页面默认)
- 或全部面型 / 天然面型(`location` / `cart` / `search` 等无线稿替代版的图标)

**线 + 面混搭 = audit 报错**。如果某页必须用天然面型(如 `location` / `cart` / `search`),要么整页改用面型风格,要么换信息表达方式(纯文本列表 + `jump` chevron,见 `INPUT_SOURCE_RULES.md` §2.1)避开这个图标。

某个组件 / 场景日后明确要求面型,在该组件源码里追加注释,audit 按组件规则查,不改图标风格清单本身。

---

## 13 · 自述要求(交付项目时)

业务交付说明必须写清:

- 已调用哪些共享组件
- 若某个界面元素没有组件可用,说明原因
- 是否扩展了共享组件。若扩展,说明改在 `src/components/`(共享源),不是在业务里新增重复组件
