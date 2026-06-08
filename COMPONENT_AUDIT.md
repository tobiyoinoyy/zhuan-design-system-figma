# ZHUAN Design Component Audit

Figma source: `2uABdev2ojlhXr9AEDiGcf`

Audit date: 2026-06-08

This checklist compares the Figma MCP component/template nodes against the current React/Vite implementation.

## Summary

| Area | Figma nodes checked | Code coverage | Status |
| --- | --- | --- | --- |
| Icons | `221:785` | `ZhuanIcon`, `iconRegistry`, 41 mapped icons | Implemented |
| Image assets | `553:2075`, `514:3170` | `ProductImage` variants and exported assets | Implemented |
| Colors | Figma color foundations | CSS variables, TS color map, gallery | Implemented |
| Search | `554:11693`, `502:5052`, `543:5734` | `SearchHeader` variants, search box text states | Implemented |
| Filter | `554:10015`, `525:5867`, `525:5991`, `525:6014`, `525:6142`, `525:6231`, `552:7599` | `SortTabs`, `FilterChip`, `ChipRail`, `FilterOptionGrid`, `QuickFilterDropdown`, filter sheet template | Implemented |
| Product card | `554:12616`, `516:3127`, `554:13569`, `508:2582`, `514:3233`, `945:1250` | `ProductCardFeeds`, `ProductCardH`, title, condition, price, promo, sell chip | Implemented |
| Device | `557:14287`, `550:7280`, `550:7266`, `557:14783` | `IOSStatusBar`, `IOSHomeBar`, `IOSKeyboard` | Implemented |
| Navigation | `502:4878`, `502:3172` | `TopNav`, `BottomButtonBar`, `BottomBarPDP` | Implemented |
| Buttons and tabs | `502:3092`, `502:3125`, `502:3270`, `502:4695`, `420:4186` | `Button`, `ButtonBar`, `OptionButton`, `Tabs` | Implemented |
| Forms | `961:3096`, `964:3457` | `Switch`, `FormSwitch`, `FormRadioRow`, `FormInput`, vertical radio, checkbox | Implemented |
| Sheets and dialogs | `956:4731`, `956:4733`, `956:4734`, `945:1850`, `930:4847`, `935:4882`, `935:4887`, `951:1053` | bottom sheet variants, SKU, coupon, cancel order, text copy, rules, region, dialogs | Implemented |
| Business components | `956:3982`, `502:5202`, `892:5601`, `1055:7590`, `1055:7594` | address filter, current location, select corner, selection label, card option | Implemented |
| Order components | `1119:8131`, `915:1462`, `915:3601`, `915:3722` | `OrderCard`, category, status, price, action bar | Implemented |
| Brand and overlay | `590:19160`, `915:1393`, `557:14331` | ZHUAN logo assets, official verification, overlay | Implemented |
| UI templates | `555:4438`, `555:4445`, plus known UI template nodes | 11 composed templates in `ZhuanUITemplateGallery` | Implemented |

## Implemented Directly

- `ZhuanIcon`, 41 registry entries, and Figma-exported SVG icon files.
- `ProductImage` covers `electronics`, `luxury`, `iphone`, `placeholder`, `model`, and `sku-iphone`.
- Filter states are covered by `SortTabs`, `FilterChip`, `ChipRail`, and `FilterOptionGrid`.
- Search header covers home, channel, category, address, platform, business, other, and template modes.
- Product-card primitives cover condition badges/text, price with/without promo, sell chips, feeds card, and horizontal card.
- Device primitives cover iOS status bar, transparent/light home indicator, and number/portrait keyboards.
- Order list/card UI is implemented and recently realigned to Figma `915:2168`.

## Implemented By Composition

- `筛选向上拉起` is represented in `FilterSheetTemplate`, composed from the filter primitives and bottom-sheet structure.
- UI pages are represented as composed templates rather than separate route-level pages.
- Search box text states are represented through `SearchHeader` props rather than a standalone exported `SearchBox`.
- Several small label states, such as condition and sell-chip variants, are folded into prop-driven components.

## Current UI Template Coverage

| Template | Figma node | Code |
| --- | --- | --- |
| 快惠选 | `555:4445` | `QuickChoiceTemplate` |
| 排序综合下拉 | `644:19895` | `SortDropdownTemplate` |
| 快速筛选下拉 | `557:15020` | `QuickFilterTemplate` |
| 筛选弹窗向上拉起 | `557:15099` | `FilterSheetTemplate` |
| 空状态 | `557:18861` | `EmptyStateTemplate` |
| 购买订单列表 | `915:2168` | `OrderListTemplate` |
| 购买订单详情弹窗 | `950:467` | `OrderDetailDialogTemplate` |
| 卡片式表单 | `970:4488` | `CardFormTemplate` |
| 通栏式表单 | `972:5093` | `FullWidthFormTemplate` |
| 商品卡片 feeds 二奢 | `557:17549` | `LuxuryFeedsTemplate` |
| 商品卡片 横版消费电子 | `557:17565` | `HorizontalCardsTemplate` |

## No Blocking Missing Components

No blocking missing component category was found in this pass.

Remaining work is visual QA and approval: if a specific rendered area differs from Figma, adjust it against the exact node screenshot, as already done for filter chips, template overlays, order list positioning, and iOS home indicator background.

