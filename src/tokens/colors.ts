export type ZhuanColorGroup = 'brand' | 'text' | 'surface' | 'line' | 'feedback' | 'business';

export type ZhuanColorToken = {
  name: keyof typeof zhuanColors;
  cssVar: string;
  value: string;
  figmaName: string;
  usage: string;
  group: ZhuanColorGroup;
};

export const zhuanColors = {
  brandPrimary: '#FF0F27',
  brandSoft: '#FFF2F2',
  link: '#00A3FF',
  textPrimary: '#111111',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textMuted: '#BBBBBB',
  black: '#000000',
  white: '#FFFFFF',
  pageBg: '#F8F8F8',
  line: '#F0F0F0',
  border: '#D8D8D8',
  controlBorder: '#D5D5D5',
  neutralDarkest: '#1F2024',
  neutralLightDark: '#D4D6DD',
  neutralLightDarkest: '#C5C6CC',
  highlightDarkest: '#006FFD',
  darkPanel: '#1F1F1F',
  mask: '#111111',
  overlay: 'rgba(17, 17, 17, 0.7)',
  overlayLight: 'rgba(255, 255, 255, 0.8)',
  spinnerTrack: '#E8E9F1',
  conditionAppearance: '#2E6E89',
  conditionFunction: '#EE8B57',
  chipRedBorder: '#FFCCD1',
  chipInfoBorder: '#BDD8E3',
  couponDash: '#FFB8C0',
  couponDisabled: '#FF8A98',
  avatarBlue: '#34495E',
  avatarPeach: '#F2B7A0'
} as const;

export const zhuanColorTokens: ZhuanColorToken[] = [
  {
    name: 'brandPrimary',
    cssVar: '--zd-color-primary',
    value: zhuanColors.brandPrimary,
    figmaName: '品牌色',
    usage: '主按钮、选中态、价格强调、关键行动',
    group: 'brand'
  },
  {
    name: 'brandSoft',
    cssVar: '--zd-color-primary-soft',
    value: zhuanColors.brandSoft,
    figmaName: '品牌色背景',
    usage: '选中态浅底、优惠券底色',
    group: 'brand'
  },
  {
    name: 'link',
    cssVar: '--zd-color-link',
    value: zhuanColors.link,
    figmaName: '链接色',
    usage: '文字链、弹窗系统强按钮',
    group: 'brand'
  },
  {
    name: 'textPrimary',
    cssVar: '--zd-color-text',
    value: zhuanColors.textPrimary,
    figmaName: '一级黑',
    usage: '正文主文字、标题、普通图标',
    group: 'text'
  },
  {
    name: 'textSecondary',
    cssVar: '--zd-color-text-secondary',
    value: zhuanColors.textSecondary,
    figmaName: '二级文字',
    usage: '辅助正文、说明文字',
    group: 'text'
  },
  {
    name: 'textTertiary',
    cssVar: '--zd-color-text-tertiary',
    value: zhuanColors.textTertiary,
    figmaName: '三级文字',
    usage: '弱提示、关闭图标、索引字母',
    group: 'text'
  },
  {
    name: 'textMuted',
    cssVar: '--zd-color-text-muted',
    value: zhuanColors.textMuted,
    figmaName: '暗文字',
    usage: '禁用文字、输入占位、计数',
    group: 'text'
  },
  {
    name: 'black',
    cssVar: '--zd-color-black',
    value: zhuanColors.black,
    figmaName: 'Label Color / Light / Primary',
    usage: '系统黑、特殊强调黑',
    group: 'text'
  },
  {
    name: 'white',
    cssVar: '--zd-color-white',
    value: zhuanColors.white,
    figmaName: '白色',
    usage: '卡片、导航、面板、弹窗背景',
    group: 'surface'
  },
  {
    name: 'pageBg',
    cssVar: '--zd-color-bg',
    value: zhuanColors.pageBg,
    figmaName: '背景色',
    usage: '页面底、选项底、内容占位底',
    group: 'surface'
  },
  {
    name: 'darkPanel',
    cssVar: '--zd-color-dark-panel',
    value: zhuanColors.darkPanel,
    figmaName: '深色预览底',
    usage: '底部栏外层、预览暗底',
    group: 'surface'
  },
  {
    name: 'neutralDarkest',
    cssVar: '--zd-color-neutral-darkest',
    value: zhuanColors.neutralDarkest,
    figmaName: 'Neutral/Dark/Darkest',
    usage: 'iOS Home Indicator',
    group: 'surface'
  },
  {
    name: 'neutralLightDark',
    cssVar: '--zd-color-neutral-light-dark',
    value: zhuanColors.neutralLightDark,
    figmaName: 'Neutral/Light/Dark',
    usage: 'iOS 键盘背景',
    group: 'surface'
  },
  {
    name: 'neutralLightDarkest',
    cssVar: '--zd-color-neutral-light-darkest',
    value: zhuanColors.neutralLightDarkest,
    figmaName: 'Neutral/Light/Darkest',
    usage: 'iOS 键盘功能键',
    group: 'surface'
  },
  {
    name: 'highlightDarkest',
    cssVar: '--zd-color-highlight-darkest',
    value: zhuanColors.highlightDarkest,
    figmaName: 'Highlight/Darkest',
    usage: 'iOS 键盘 return 键',
    group: 'brand'
  },
  {
    name: 'mask',
    cssVar: '--zd-color-mask',
    value: zhuanColors.mask,
    figmaName: '黑色蒙层',
    usage: '遮罩基色',
    group: 'surface'
  },
  {
    name: 'line',
    cssVar: '--zd-color-line',
    value: zhuanColors.line,
    figmaName: '分割线',
    usage: '列表分割线、弱描边',
    group: 'line'
  },
  {
    name: 'border',
    cssVar: '--zd-color-border',
    value: zhuanColors.border,
    figmaName: '描边',
    usage: '输入框、计步器、标签边框',
    group: 'line'
  },
  {
    name: 'controlBorder',
    cssVar: '--zd-color-control-border',
    value: zhuanColors.controlBorder,
    figmaName: '控件描边',
    usage: '单选/勾选未选态',
    group: 'line'
  },
  {
    name: 'overlay',
    cssVar: '--zd-color-overlay',
    value: zhuanColors.overlay,
    figmaName: '黑色蒙层 70%',
    usage: '半层、弹窗背景遮罩',
    group: 'surface'
  },
  {
    name: 'overlayLight',
    cssVar: '--zd-color-overlay-light',
    value: zhuanColors.overlayLight,
    figmaName: '白色浮层 80%',
    usage: '沉浸导航圆形图标底',
    group: 'surface'
  },
  {
    name: 'spinnerTrack',
    cssVar: '--zd-color-spinner-track',
    value: zhuanColors.spinnerTrack,
    figmaName: '加载轨道',
    usage: 'Loading spinner 背景轨道',
    group: 'feedback'
  },
  {
    name: 'conditionAppearance',
    cssVar: '--zd-color-condition-appearance',
    value: zhuanColors.conditionAppearance,
    figmaName: '外观成色标签',
    usage: '商品成色外观标签',
    group: 'business'
  },
  {
    name: 'conditionFunction',
    cssVar: '--zd-color-condition-function',
    value: zhuanColors.conditionFunction,
    figmaName: '功能成色标签',
    usage: '商品成色功能标签',
    group: 'business'
  },
  {
    name: 'chipRedBorder',
    cssVar: '--zd-color-chip-red-border',
    value: zhuanColors.chipRedBorder,
    figmaName: '红色标签描边',
    usage: '卖点标签红色描边',
    group: 'business'
  },
  {
    name: 'chipInfoBorder',
    cssVar: '--zd-color-chip-info-border',
    value: zhuanColors.chipInfoBorder,
    figmaName: '信息标签描边',
    usage: '销量/品类标签描边',
    group: 'business'
  },
  {
    name: 'couponDash',
    cssVar: '--zd-color-coupon-dash',
    value: zhuanColors.couponDash,
    figmaName: '优惠券虚线',
    usage: '优惠券左右区域分割',
    group: 'business'
  },
  {
    name: 'couponDisabled',
    cssVar: '--zd-color-coupon-disabled',
    value: zhuanColors.couponDisabled,
    figmaName: '优惠券已领取',
    usage: '优惠券禁用行动文字',
    group: 'business'
  },
  {
    name: 'avatarBlue',
    cssVar: '--zd-color-avatar-blue',
    value: zhuanColors.avatarBlue,
    figmaName: '收藏头像蓝',
    usage: '沉浸导航收藏头像示例',
    group: 'business'
  },
  {
    name: 'avatarPeach',
    cssVar: '--zd-color-avatar-peach',
    value: zhuanColors.avatarPeach,
    figmaName: '收藏头像肤色',
    usage: '沉浸导航收藏头像示例',
    group: 'business'
  }
];

export const zhuanColorGroups = [
  { group: 'brand', label: 'Brand', tokens: zhuanColorTokens.filter((token) => token.group === 'brand') },
  { group: 'text', label: 'Text', tokens: zhuanColorTokens.filter((token) => token.group === 'text') },
  { group: 'surface', label: 'Surface', tokens: zhuanColorTokens.filter((token) => token.group === 'surface') },
  { group: 'line', label: 'Line', tokens: zhuanColorTokens.filter((token) => token.group === 'line') },
  { group: 'feedback', label: 'Feedback', tokens: zhuanColorTokens.filter((token) => token.group === 'feedback') },
  { group: 'business', label: 'Business', tokens: zhuanColorTokens.filter((token) => token.group === 'business') }
] as const;

export type ZhuanColorName = keyof typeof zhuanColors;

export function getZhuanColor(name: ZhuanColorName) {
  return zhuanColors[name];
}
