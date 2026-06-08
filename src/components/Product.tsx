import type { ReactNode } from 'react';

export type ProductImageKind = 'electronics' | 'luxury' | 'iphone' | 'placeholder' | 'model' | 'sku-iphone';
export type SellChipTone = 'red' | 'info' | 'black' | 'teal';

const productImageMeta: Record<ProductImageKind, { src?: string; nodeId: string }> = {
  electronics: { src: '/product-assets/electronics.jpg', nodeId: '514:3157' },
  luxury: { src: '/product-assets/luxury.jpg', nodeId: '514:3159' },
  iphone: { src: '/product-assets/iphone.jpg', nodeId: '526:3000' },
  placeholder: { nodeId: '915:3818' },
  model: { src: '/product-assets/model.png', nodeId: '732:20652' },
  'sku-iphone': { src: '/product-assets/sku-iphone.png', nodeId: 'I945:1189;732:20654' }
};

export function ProductImage({ kind = 'electronics', size = 160 }: { kind?: ProductImageKind; size?: number }) {
  const meta = productImageMeta[kind];
  const style = { width: size, height: size };

  return (
    <div className={`zd-product-image zd-product-image--${kind}`} data-node-id={meta.nodeId} style={style}>
      {meta.src && <img src={meta.src} alt="" draggable={false} />}
    </div>
  );
}

export function ConditionAppearanceTag({ value = '99' }: { value?: string }) {
  return (
    <span className="zd-condition-tag zd-condition-tag--appearance" data-node-id="508:2547">
      <strong>{value}</strong>
      <em>新</em>
    </span>
  );
}

export function ConditionFunctionTag({ value = 'A' }: { value?: string }) {
  return (
    <span className="zd-condition-tag zd-condition-tag--function" data-node-id="508:2564">
      <strong>{value}</strong>
    </span>
  );
}

export function ConditionCombo({ wear = '99', grade = 'A' }: { wear?: string; grade?: string }) {
  return (
    <span className="zd-condition-combo" data-node-id="508:2577">
      <ConditionAppearanceTag value={wear} />
      <ConditionFunctionTag value={grade} />
    </span>
  );
}

export function ConditionTextBadge({ children }: { children: ReactNode }) {
  return <span className="zd-condition-text-badge">{children}</span>;
}

export function ConditionTextBlock({
  appearance = '屏幕外观完好 · 机身无痕',
  fn = '保修大于100天'
}: {
  appearance?: string;
  fn?: string;
}) {
  return (
    <div className="zd-condition-text-block" data-node-id="514:3312">
      <div className="zd-condition-text-row">
        <ConditionTextBadge>95外观</ConditionTextBadge>
        <span>{appearance}</span>
      </div>
      <div className="zd-condition-text-row">
        <ConditionTextBadge>S 功能</ConditionTextBadge>
        <span>{fn}</span>
      </div>
    </div>
  );
}

export function PromoTag({ children = '满减标签' }: { children?: ReactNode }) {
  return (
    <span className="zd-promo-tag" data-node-id="516:2879">
      {children}
    </span>
  );
}

export function Price({ value = '2159', promo }: { value?: string; promo?: ReactNode }) {
  return (
    <div className="zd-price" data-node-id={promo ? '514:3249' : '945:1251'}>
      <span className="zd-price__amount">
        <span className="zd-price__currency">￥</span>
        <span className="zd-price__value">{value}</span>
      </span>
      {promo && <PromoTag>{promo}</PromoTag>}
    </div>
  );
}

export function SellChip({ tone = 'red', children }: { tone?: SellChipTone; children: ReactNode }) {
  return (
    <span className={`zd-sell-chip zd-sell-chip--${tone}`}>
      {children}
    </span>
  );
}

export function ProductTitle({
  children,
  condition,
  width = 168,
  strong = false
}: {
  children: ReactNode;
  condition?: ReactNode;
  width?: number;
  strong?: boolean;
}) {
  return (
    <div className={strong ? 'zd-product-title zd-product-title--strong' : 'zd-product-title'} style={{ width }}>
      <span className="zd-product-title__line">
        {condition}
        <span>{children}</span>
      </span>
    </div>
  );
}

export type ProductCardFeedsProps = {
  variant?: 'electronics' | 'luxury';
  title?: string;
  subtitle?: string;
  wear?: string;
  grade?: string;
  luxuryWear?: string;
  price?: string;
  promo?: string;
  sellChips?: Array<{ label: string; tone?: SellChipTone }>;
};

export function ProductCardFeeds({
  variant = 'electronics',
  title = variant === 'luxury' ? 'GUCCI S码 春秋黑色' : '华为 Mate 80 16G+',
  subtitle = variant === 'luxury' ? '驼毛男士长袖开衫' : '512G 曜石黑 国行 全网通',
  wear = '99',
  grade = 'A',
  luxuryWear = '8',
  price = '2159',
  promo = variant === 'luxury' ? '公价5.3折' : '满减标签',
  sellChips = variant === 'luxury'
    ? [
        { label: '同款销量100+', tone: 'info' },
        { label: '三日达', tone: 'black' }
      ]
    : [
        { label: '在仓直发' },
        { label: '快速充电', tone: 'black' }
      ]
}: ProductCardFeedsProps) {
  const isLuxury = variant === 'luxury';

  return (
    <article className={`zd-product-card-feeds zd-product-card-feeds--${variant}`} data-node-id={isLuxury ? '516:3123' : '516:3122'}>
      <ProductImage kind={isLuxury ? 'luxury' : 'electronics'} size={168} />
      <ProductTitle condition={isLuxury ? <ConditionAppearanceTag value={luxuryWear} /> : <ConditionCombo wear={wear} grade={grade} />}>
        {title}
      </ProductTitle>
      <p className="zd-product-card-feeds__subtitle">{subtitle}</p>
      {!isLuxury && <ConditionTextBlock />}
      <Price value={price} promo={promo} />
      <div className="zd-sell-chip-row">
        {sellChips.map((chip) => (
          <SellChip key={chip.label} tone={chip.tone}>
            {chip.label}
          </SellChip>
        ))}
      </div>
    </article>
  );
}

export type ProductCardHProps = {
  title?: string;
  subtitle?: string | null;
  price?: string;
  promo?: string;
  condition?: ReactNode;
  imageKind?: ProductImageKind;
  imageSize?: number;
  layout?: 'two-line' | 'one-line';
  className?: string;
  sellChips?: Array<{ label: string; tone?: SellChipTone }>;
};

export function ProductCardH({
  title = '华为 Mate 80 16G+512G 曜石黑',
  subtitle = '国行 全网通',
  price = '2159',
  promo = '满1299减100',
  condition,
  imageKind = 'electronics',
  imageSize = 88,
  layout = 'two-line',
  className = '',
  sellChips = [
    { label: '在仓直发' },
    { label: '快速充电', tone: 'black' },
    { label: '充电0次', tone: 'black' }
  ]
}: ProductCardHProps) {
  return (
    <article className={['zd-product-card-h', `zd-product-card-h--${layout}`, className].filter(Boolean).join(' ')} data-node-id="554:13569">
      <ProductImage kind={imageKind} size={imageSize} />
      <div className="zd-product-card-h__body">
        <ProductTitle condition={condition ?? <ConditionCombo />} width={239} strong>
          {title}
        </ProductTitle>
        {subtitle && <p className="zd-product-card-h__subtitle">{subtitle}</p>}
        <ConditionTextBlock />
        <Price value={price} promo={promo} />
        <div className="zd-sell-chip-row">
          {sellChips.map((chip) => (
            <SellChip key={chip.label} tone={chip.tone}>
              {chip.label}
            </SellChip>
          ))}
        </div>
      </div>
    </article>
  );
}
