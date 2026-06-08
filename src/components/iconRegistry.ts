import { zhuanColors } from '../tokens';

export const iconRegistry = [
  { name: 'share', figmaName: '分享', nodeId: '451:6445', category: 'general' },
  { name: 'more', figmaName: '更多', nodeId: '453:6469', category: 'general' },
  { name: 'search', figmaName: '搜索', nodeId: '441:6394', category: 'general' },
  { name: 'favorite-folder', figmaName: '收藏夹', nodeId: '541:4339', category: 'general' },
  { name: 'settings', figmaName: '设置', nodeId: '541:4345', category: 'general' },
  { name: 'customer-service', figmaName: '客服', nodeId: '454:6566', category: 'general' },
  { name: 'scan', figmaName: '扫一扫', nodeId: '541:4355', category: 'general' },
  { name: 'rent', figmaName: '租', nodeId: '452:6459', category: 'business' },
  { name: 'sell', figmaName: '卖', nodeId: '541:4356', category: 'business' },
  { name: 'compare', figmaName: '商品对比', nodeId: '541:4357', category: 'business' },
  { name: 'close', figmaName: '关闭', nodeId: '471:6238', category: 'general' },
  { name: 'dialog-back', figmaName: '弹窗返回', nodeId: '542:4398', category: 'general' },
  { name: 'footprint', figmaName: '足迹', nodeId: '543:4413', category: 'general' },
  { name: 'message', figmaName: '消息', nodeId: '541:4390', category: 'general' },
  { name: 'back', figmaName: 'Property 1=返回-黑色', nodeId: '438:5525', category: 'navigation', componentSet: '541:4295' },
  { name: 'back-white', figmaName: 'Property 1=返回-白色', nodeId: '541:4294', category: 'navigation', componentSet: '541:4295', defaultColor: zhuanColors.white },
  { name: 'favorite', figmaName: 'Property 1=收藏', nodeId: '458:4125', category: 'general', componentSet: '541:4321' },
  { name: 'favorite-active', figmaName: 'Property 1=收藏-选中', nodeId: '458:4124', category: 'general', componentSet: '541:4321', defaultColor: zhuanColors.brandPrimary },
  { name: 'jump', figmaName: '通用场景/跳转', nodeId: '542:4409', category: 'general' },
  { name: 'cart', figmaName: '购物车', nodeId: '458:4108', category: 'commerce' },
  { name: 'filter-expand-done', figmaName: '筛选场景/下拉展开_筛选完成', nodeId: '434:5384', category: 'filter', defaultColor: zhuanColors.brandPrimary },
  { name: 'filter-expand', figmaName: '筛选场景/下拉展开', nodeId: '434:5380', category: 'filter' },
  { name: 'jump-shape', figmaName: '通用场景/跳转=面型', nodeId: '664:20594', category: 'general' },
  { name: 'filter-collapse-done', figmaName: '筛选场景/下拉收起_筛选完成', nodeId: '434:5385', category: 'filter', defaultColor: zhuanColors.brandPrimary },
  { name: 'filter-collapse', figmaName: '筛选场景/下拉收起', nodeId: '434:5381', category: 'filter' },
  { name: 'sort', figmaName: '筛选场景/排序', nodeId: '434:5382', category: 'filter' },
  { name: 'sort-asc', figmaName: '筛选场景/升序', nodeId: '434:5386', category: 'filter', defaultColor: zhuanColors.brandPrimary },
  { name: 'sort-desc', figmaName: '筛选场景/降序', nodeId: '434:5387', category: 'filter', defaultColor: zhuanColors.brandPrimary },
  { name: 'category-brand-model', figmaName: '筛选场景/分类、品牌、型号', nodeId: '434:5388', category: 'filter' },
  { name: 'filter', figmaName: '筛选场景/筛选', nodeId: '434:5383', category: 'filter' },
  { name: 'filter-region', figmaName: '筛选场景/筛选栏_区域', nodeId: '542:4412', category: 'filter' },
  { name: 'collapse', figmaName: '通用场景/收起', nodeId: '543:4426', category: 'general' },
  { name: 'expand', figmaName: '通用场景/展开', nodeId: '543:4423', category: 'general' },
  { name: 'order', figmaName: '订单', nodeId: '543:4443', category: 'commerce' },
  { name: 'abnormal', figmaName: '通用场景/异常', nodeId: '908:5912', category: 'status' },
  { name: 'info', figmaName: '通用场景/info', nodeId: '908:5913', category: 'status' },
  { name: 'normal', figmaName: '通用场景/正常', nodeId: '908:5914', category: 'status' },
  { name: 'red-dot-number', figmaName: '红点=数字', nodeId: '951:2191', category: 'badge', componentSet: '951:2200', defaultColor: zhuanColors.brandPrimary },
  { name: 'red-dot', figmaName: '红点=仅红点', nodeId: '951:2199', category: 'badge', componentSet: '951:2200', defaultColor: zhuanColors.brandPrimary },
  { name: 'location', figmaName: '定位', nodeId: '956:3716', category: 'general' },
  { name: 'refresh', figmaName: '刷新', nodeId: '956:3726', category: 'general' }
] as const;

export type IconName = (typeof iconRegistry)[number]['name'];
export type IconMeta = (typeof iconRegistry)[number];

export const iconRegistryByName = Object.fromEntries(iconRegistry.map((icon) => [icon.name, icon])) as Record<IconName, IconMeta>;
