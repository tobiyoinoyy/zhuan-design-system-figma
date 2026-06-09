# Figma Component Mapping

Figma source: [ZHUAN Design](https://www.figma.com/design/2uABdev2ojlhXr9AEDiGcf/ZHUAN-Design?node-id=554-3881&t=vDgpL9NvRD3gAYeN-1)

Last checked: 2026-06-09

This document maps the Figma component/template nodes to the React components in this package. Use it as the handoff checklist for implementation, review, and future Code Connect mapping.

## Status Legend

| Status | Meaning |
| --- | --- |
| Direct | One Figma component maps to one exported React component. |
| Composed | Figma component/page is assembled from multiple exported components. |
| Asset | Figma asset is exported into `public/` and consumed by a component. |
| Token | Figma foundation maps to CSS variables and TypeScript tokens. |

## Figma Pages

| Figma page | Node | Package area |
| --- | --- | --- |
| UI界面模版-快惠选 | `555:4438` | UI templates in `src/components/Templates.tsx` |
| 图片 | `553:2075` | Product images in `public/product-assets/` |
| 图标 | `221:785` | Icons in `public/icons/figma-mcp/`, `ZhuanIcon`, `iconRegistry` |
| 筛选 | `554:10015` | Filter components in `src/components/Filter.tsx` |
| 搜索 | `554:11693` | Search components in `src/components/SearchHeader.tsx` |
| 商品卡片 | `554:12616` | Product card components in `src/components/Product.tsx` |
| 设备端 | `557:14287` | Device primitives in `src/components/Device.tsx` |

## Foundations And Assets

| Figma source | Figma node | Package API | Source file | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Color foundations | Figma variables/styles | `zhuanColors`, `zhuanColorTokens`, `getZhuanColor`, `ColorTokenGallery` | `src/tokens/colors.ts`, `src/styles/tokens.css`, `src/components/ColorTokens.tsx` | Token | 30 color tokens grouped by brand, text, surface, line, feedback, and business. |
| 图标 page | `221:785` | `ZhuanIcon`, `iconRegistry`, `iconRegistryByName` | `src/components/icons.tsx`, `src/components/iconRegistry.ts` | Asset | 41 registry icons. SVG resources live in `public/icons/figma-mcp/`. |
| Toast and quantity SVGs | `761:20695`, `761:20700`, `761:20705`, quantity assets | `Toast`, `QuantityStepper` | `src/components/Feedback.tsx`, `src/components/Sheet.tsx` | Asset | SVG resources are kept in `public/icons/figma-mcp/` but are not all exposed through `iconRegistry`. |
| Product image assets | `553:2075`, `514:3170` | `ProductImage` | `src/components/Product.tsx` | Asset | Product images are stored in `public/product-assets/`. |
| Akrobat numeric font | Font asset | `var(--zd-font-akrobat)` | `src/styles/tokens.css`, `public/fonts/Akrobat-ExtraBold.otf` | Asset | Used for price and numeric emphasis. |

## Basic Components

| Figma component | Figma node | Package component | Source file | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| 标签页 tabs | `502:4695` | `Tabs` | `src/components/Tabs.tsx` | Direct | Supports equal and left-aligned tab layouts. |
| tab项 | `420:4186`, `420:4187`, `420:4191` | `Tabs` | `src/components/Tabs.tsx` | Composed | Active/inactive tab item states are controlled by `active` and `dotIndexes`. |
| 操作按钮 | `502:3092` | `Button` | `src/components/Button.tsx` | Direct | Supports `strong`, `weak`, `ghost`; sizes `lg`, `md`, `sm`. |
| 大按钮 / 底部按钮组 | `502:3125` | `ButtonBar` | `src/components/Button.tsx` | Direct | Supports single, equal two-button, and primary/secondary layouts. |
| 选项按钮大 | `502:3270` | `OptionButton` | `src/components/Button.tsx` | Direct | Supports normal, selected, and disabled states. |
| 搜索栏 | `554:11693`, `502:5052` | `SearchHeader` | `src/components/SearchHeader.tsx` | Direct | Supports home, channel, category, address, platform, business, other, and template modes. |
| switch | `961:3096` | `Switch` | `src/components/Switch.tsx` | Direct | Supports checked, unchecked, and disabled states. |
| 表单行/输入/单选/复选 | `964:3457` | `FormSwitch`, `FormRadioRow`, `FormInput`, `FormVerticalRadioList`, `FormCheckboxRow` | `src/components/Form.tsx` | Direct | Form primitives share row spacing and typography styles. |
| 图形 Toast | `761:20694`, `761:20695`, `761:20700`, `761:20705` | `Toast` | `src/components/Feedback.tsx` | Direct | Uses Figma-exported SVG variants for success, warning/failure, and loading. |
| 加载中 | `470:5778` | `LoadingSpinner` | `src/components/Feedback.tsx` | Direct | Progress states are represented by the `progress` prop. |

## Product Components

| Figma component | Figma node | Package component | Source file | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| 商品图 | `514:3170`, `514:3157`, `514:3159`, `526:3000`, `915:3818` | `ProductImage` | `src/components/Product.tsx` | Direct | Supports electronics, luxury, iPhone, placeholder, model, and SKU image kinds. |
| 成色 外观标签 | `508:2547` | `ConditionAppearanceTag` | `src/components/Product.tsx` | Direct | Uses Akrobat for numeric value. |
| 成色 功能标签 | `508:2564` | `ConditionFunctionTag` | `src/components/Product.tsx` | Direct | Used alone or inside `ConditionCombo`. |
| 成色组合 | `508:2577`, `508:2582` | `ConditionCombo` | `src/components/Product.tsx` | Direct | Combines appearance and function tags. |
| 成色文字 | `514:3312` | `ConditionTextBlock`, `ConditionTextBadge` | `src/components/Product.tsx` | Direct | Two-line condition detail block. |
| 商品标题 | `518:2921`, related title nodes | `ProductTitle` | `src/components/Product.tsx` | Direct | Used in feeds and horizontal cards. |
| 价格 | `945:1250`, `945:1251`, `514:3249` | `Price` | `src/components/Product.tsx` | Direct | Uses Akrobat for price digits. |
| 满减/促销标签 | `516:2879` | `PromoTag` | `src/components/Product.tsx` | Direct | Usually composed inside `Price`. |
| 卖点标签 | `514:3233` | `SellChip` | `src/components/Product.tsx` | Direct | Supports red, info, black, and teal tones. |
| feeds 商品卡片 | `516:3127`, `516:3122`, `516:3123` | `ProductCardFeeds` | `src/components/Product.tsx` | Composed | Assembles image, title, condition, price, and sell chips. |
| 横版卡片 消费电子 | `554:13569` | `ProductCardH` | `src/components/Product.tsx` | Composed | Matches Figma `375 x 120` structure. |

## Navigation And Filter

| Figma component | Figma node | Package component | Source file | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| 顶部导航栏 | `502:4878`, `502:4325`, `502:4326`, `502:4449`, `502:4450`, `502:4808` | `TopNav` | `src/components/Navigation.tsx` | Direct | Supports immersive, white, normal, plain, and tabs variants. |
| 底部导航栏 / PDP button bar | `502:3172`, `532:3782`, `502:3148` | `BottomBarPDP`, `BottomButtonBar` | `src/components/Navigation.tsx` | Direct | Bottom action layouts for PDP and button bar examples. |
| 排序栏 / 排序面板 | `525:5867`, `525:5806`, `525:5866` | `SortTabs` | `src/components/Filter.tsx` | Direct | Supports collapsed and expanded states. |
| 标签选项 | `525:5991` | `FilterChip` | `src/components/Filter.tsx` | Direct | Selected/open states map to Figma icon states. |
| 横向标签栏 | `525:6014` | `ChipRail` | `src/components/Filter.tsx` | Composed | Composes multiple `FilterChip` items. |
| 筛选选项 | `525:6142`, `525:6139`, `525:6140`, `525:6141` | `FilterOptionGrid` | `src/components/Filter.tsx` | Direct | Supports single, double, and price filter modes. |
| 快速筛选下拉 | `525:6231` | `QuickFilterDropdown` | `src/components/Filter.tsx` | Composed | Combines sort tabs, chip rail, option grid, and button bar. |

## Sheet And Dialog

| Figma component | Figma node | Package component | Source file | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| 半层标题栏 | `945:1089`, `945:1090` | `SheetTitleBar` | `src/components/Sheet.tsx` | Direct | Supports title, back icon, close icon, and actions. |
| 半层容器 | `956:4731`, `956:4126`, `956:4127` | `SheetFrame`, `BottomSheet`, `DefaultSheet` | `src/components/Sheet.tsx` | Composed | Supports 50% and 80% sheet examples. |
| 标签选择半层 | `945:480` | `TagSelectionSheet` | `src/components/Sheet.tsx` | Composed | Uses option button and button bar patterns. |
| 商品 SKU 选择 | `945:1850`, `956:4132` | `SkuSheet`, `QuantityStepper` | `src/components/Sheet.tsx` | Composed | Uses product image, price, SKU fields, and quantity stepper. |
| 优惠券半层 | `945:1997`, `945:2101`, `956:4133` | `CouponSheet` | `src/components/Sheet.tsx` | Composed | Coupon card and coupon list sheet. |
| 取消订单半层 | `945:2213`, `956:4134` | `CancelOrderSheet` | `src/components/Sheet.tsx` | Composed | Cancellation reason list. |
| 文字复制半层 | `945:973`, `956:4136` | `TextCopySheet` | `src/components/Sheet.tsx` | Composed | Copy text content area plus sheet title. |
| 活动规则半层 | `956:3406`, `956:3407`, `956:4135` | `RulesSheet` | `src/components/Sheet.tsx` | Composed | Rules text inside tall sheet. |
| 选择省/地区 | `956:3660`, `956:3810`, `956:4129`, `956:4130` | `RegionSelectSheet` | `src/components/Sheet.tsx` | Composed | Province and district variants. |
| 弹窗标题 | `930:4847` | `Dialog` | `src/components/Dialog.tsx` | Composed | Title slot inside `Dialog`. |
| 弹窗内容 | `935:4882` | `DialogBody` | `src/components/Dialog.tsx` | Direct | Body content block. |
| 弹窗按钮 | `935:4887` | `DialogActions` | `src/components/Dialog.tsx` | Direct | Supports one/two/multiple action layouts by prop. |
| 系统弹窗 | `935:4885` | `SystemDialog`, `Dialog` | `src/components/Dialog.tsx` | Composed | Figma size verified as `295 x 210`. |
| 自定义弹窗 | `951:1053`, `951:1051`, `951:2136` | `CustomDialog`, `Dialog` | `src/components/Dialog.tsx` | Composed | Custom content area plus primary button. |

## Business, Order, Device, Brand

| Figma component | Figma node | Package component | Source file | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| 地址筛选 | `502:5202` | `AddressFilter` | `src/components/Business.tsx` | Direct | City selector chip. |
| 当前定位 | `956:3982`, `956:3973` | `CurrentLocation` | `src/components/Business.tsx` | Direct | Includes location and refresh icons. |
| 选择框角标 | `1055:7590`, `1055:7588`, `1055:7589` | `SelectCorner` | `src/components/Business.tsx` | Direct | Selected and unselected corner states. |
| 选择框标签 | `1055:7594` | `SelectionLabel` | `src/components/Business.tsx` | Direct | Recommendation tag. |
| 卡片选项框 | `892:5601` | `CardOption` | `src/components/Business.tsx` | Direct | Business service/insurance option card. |
| 购买订单卡片 | `1119:8131` | `OrderCard` | `src/components/OrderCard.tsx` | Composed | Supports electronics and virtual order examples. |
| 订单类目 | `915:1462`, `915:1439`, `915:1461` | Internal `OrderCategory` | `src/components/OrderCard.tsx` | Composed | Folded into `OrderCard`, not exported separately. |
| 订单状态 | `915:3601` | `OrderCard` | `src/components/OrderCard.tsx` | Composed | Status text is provided by `status` prop. |
| 订单操作栏 | `915:3722` | `OrderCard` | `src/components/OrderCard.tsx` | Composed | Actions are provided through `actions` prop. |
| iOS 状态栏 | `550:7280` | `IOSStatusBar` | `src/components/Device.tsx` | Direct | Used in device and template previews. |
| iOS Home bar | `550:7266` | `IOSHomeBar` | `src/components/Device.tsx` | Direct | Supports transparent/light and compact variants. |
| iOS 键盘 | `557:14783`, `557:14706`, `557:14782` | `IOSKeyboard` | `src/components/Device.tsx` | Direct | Number and portrait keyboard variants. |
| logo | `590:19160` | `ZHUANLogo` | `src/components/Brand.tsx` | Direct | CSS-rendered brand mark. |
| 官方验 | `915:1393` | `OfficialVerification` | `src/components/Brand.tsx` | Direct | Official verification badge. |
| Overlay | `557:14331` | `Overlay`, template-level `TemplateOverlay` | `src/components/Brand.tsx`, `src/components/Templates.tsx` | Direct | Full-screen template overlays use the same token color. |

## UI Templates

| Figma template | Figma node | Package component | Source file | Status | Composition notes |
| --- | --- | --- | --- | --- | --- |
| 快惠选 | `555:4445` | `QuickChoiceTemplate` | `src/components/Templates.tsx` | Composed | Status bar, search stack, model card, horizontal product feed, home bar. |
| 排序综合下拉 | `644:19895` | `SortDropdownTemplate` | `src/components/Templates.tsx` | Composed | Search/header above overlay; sort panel above overlay. |
| 快速筛选下拉 | `557:15020` | `QuickFilterTemplate` | `src/components/Templates.tsx` | Composed | Search/header above overlay; quick-filter panel above overlay. |
| 筛选弹窗向上拉起 | `557:15099` | `FilterSheetTemplate` | `src/components/Templates.tsx` | Composed | Overlay covers status/search; sheet is above overlay. |
| 空状态 | `557:18861` | `EmptyStateTemplate` | `src/components/Templates.tsx` | Composed | Navigation tabs, empty state illustration area, home bar. |
| 购买订单列表 | `915:2168` | `OrderListTemplate` | `src/components/Templates.tsx` | Composed | Top nav, tabs, order-card list, transparent home bar. |
| 购买订单详情弹窗 | `950:467` | `OrderDetailDialogTemplate` | `src/components/Templates.tsx` | Composed | Overlay covers status/nav; custom dialog above overlay. |
| 卡片式表单 | `970:4488` | `CardFormTemplate` | `src/components/Templates.tsx` | Composed | Top nav, card-style form, home bar. |
| 通栏式表单 | `972:5093` | `FullWidthFormTemplate` | `src/components/Templates.tsx` | Composed | Top nav, full-width form rows, home bar. |
| 商品卡片 feeds 二奢 | `557:17549` | `LuxuryFeedsTemplate` | `src/components/Templates.tsx` | Composed | Search stack and luxury feeds cards. |
| 商品卡片 横版消费电子 | `557:17565` | `HorizontalCardsTemplate` | `src/components/Templates.tsx` | Composed | Search stack and horizontal electronics cards. |

## Export Surface

All package components are re-exported from `src/components/index.ts`.

Primary exports by file:

| Source file | Exported package APIs |
| --- | --- |
| `src/components/Button.tsx` | `Button`, `ButtonBar`, `OptionButton` |
| `src/components/Tabs.tsx` | `Tabs` |
| `src/components/SearchHeader.tsx` | `SearchHeader` |
| `src/components/Switch.tsx` | `Switch` |
| `src/components/Form.tsx` | `FormSwitch`, `FormRadioRow`, `FormInput`, `FormVerticalRadioList`, `FormCheckboxRow` |
| `src/components/Feedback.tsx` | `Toast`, `LoadingSpinner` |
| `src/components/Filter.tsx` | `SortTabs`, `FilterChip`, `ChipRail`, `FilterOptionGrid`, `QuickFilterDropdown` |
| `src/components/Navigation.tsx` | `TopNav`, `BottomBarPDP`, `BottomButtonBar` |
| `src/components/Product.tsx` | `ProductImage`, `ConditionAppearanceTag`, `ConditionFunctionTag`, `ConditionCombo`, `ConditionTextBlock`, `PromoTag`, `Price`, `SellChip`, `ProductTitle`, `ProductCardFeeds`, `ProductCardH` |
| `src/components/Sheet.tsx` | `SheetTitleBar`, `SheetFrame`, `BottomSheet`, `DefaultSheet`, `QuantityStepper`, `TagSelectionSheet`, `SkuSheet`, `CouponSheet`, `CancelOrderSheet`, `TextCopySheet`, `RulesSheet`, `RegionSelectSheet` |
| `src/components/Dialog.tsx` | `Dialog`, `DialogBody`, `DialogActions`, `SystemDialog`, `CustomDialog` |
| `src/components/OrderCard.tsx` | `OrderCard` |
| `src/components/Device.tsx` | `IOSStatusBar`, `IOSHomeBar`, `IOSKeyboard` |
| `src/components/Brand.tsx` | `ZHUANLogo`, `OfficialVerification`, `Overlay` |
| `src/components/Business.tsx` | `AddressFilter`, `CurrentLocation`, `SelectCorner`, `SelectionLabel`, `CardOption` |
| `src/components/Templates.tsx` | 11 UI templates and `ZhuanUITemplateGallery` |
| `src/components/icons.tsx` | `ZhuanIcon` and legacy icon aliases |
| `src/components/iconRegistry.ts` | `iconRegistry`, `iconRegistryByName` |
| `src/tokens/colors.ts` | `zhuanColors`, `zhuanColorTokens`, `zhuanColorGroups`, `getZhuanColor` |

## Code Connect Notes

- Prefer mapping Figma component-set variants to the prop-driven components listed above.
- Components marked `Composed` should usually map to the package component that owns the final assembled UI, not every internal child.
- Internal-only helpers, such as order category rendering inside `OrderCard`, should stay folded into the parent mapping unless the Figma library publishes them as reusable standalone components.
- Assets in `public/icons/figma-mcp/` and `public/product-assets/` should not be redrawn. If Figma changes an icon or product asset, re-export it and keep the same component API where possible.
