import type { ReactNode } from 'react';
import { OfficialVerification } from './Brand';

export type OrderCardVariant = 'electronics' | 'virtual';
export type OrderAction = {
  label: ReactNode;
  variant?: 'primary' | 'secondary';
};

export type OrderProduct = {
  title: ReactNode;
  price: string;
  count?: number;
};

const defaultActions: OrderAction[] = [
  { label: '修改地址', variant: 'secondary' },
  { label: '修改地址', variant: 'secondary' },
  { label: '确认支付', variant: 'primary' }
];

function OrderCategory({ variant }: { variant: OrderCardVariant }) {
  if (variant === 'virtual') {
    return (
      <div className="zd-order-category zd-order-category--virtual" data-node-id="915:1461">
        <img src="/brand-assets/logo-small.svg" alt="" draggable={false} />
        <span>一杯冰美式</span>
      </div>
    );
  }

  return (
    <div className="zd-order-category" data-node-id="915:1439">
      <span className="zd-order-category__badge">
        <OfficialVerification compact />
      </span>
      <span>一物一验 · 正品保障 · 7天无理由</span>
    </div>
  );
}

function OrderPrice({ price, count = 1 }: { price: string; count?: number }) {
  return (
    <div className="zd-order-price">
      <strong>
        <span>￥</span>
        {price}
      </strong>
      <small>共{count}件</small>
    </div>
  );
}

function OrderActionButton({ action }: { action: OrderAction }) {
  return (
    <button className={action.variant === 'primary' ? 'zd-order-action zd-order-action--primary' : 'zd-order-action'} type="button">
      {action.label}
    </button>
  );
}

export function OrderCard({
  variant = 'electronics',
  status = '待付款',
  product,
  actions = defaultActions,
  showMore,
  logistics = true
}: {
  variant?: OrderCardVariant;
  status?: ReactNode;
  product?: OrderProduct;
  actions?: OrderAction[];
  showMore?: boolean;
  logistics?: boolean;
}) {
  const isVirtual = variant === 'virtual';
  const normalizedProduct: OrderProduct = product ?? {
    title: isVirtual ? '商品名称商品名称商品名称商品名称' : '95新 荣耀 荣耀 荣耀 V20 6GB+128G',
    price: '2159.00',
    count: 1
  };
  const shouldShowMore = showMore ?? !isVirtual;
  const shouldShowLogistics = logistics && !isVirtual;
  const nodeId = isVirtual ? '1119:8130' : '915:2077';

  return (
    <article className={isVirtual ? 'zd-order-card zd-order-card--virtual' : 'zd-order-card'} data-node-id={nodeId}>
      <header className="zd-order-card__header">
        <OrderCategory variant={variant} />
        <span className={status === '待付款' ? 'zd-order-status zd-order-status--primary' : 'zd-order-status'}>{status}</span>
      </header>
      <div className="zd-order-card__product">
        <div className={isVirtual ? 'zd-order-product-image zd-order-product-image--placeholder' : 'zd-order-product-image'} data-node-id={isVirtual ? '915:3818' : '514:3157'}>
          {!isVirtual && <img src="/order-assets/order-electronics.jpg" alt="" draggable={false} />}
        </div>
        <p>{normalizedProduct.title}</p>
        <OrderPrice price={normalizedProduct.price} count={normalizedProduct.count} />
      </div>
      {shouldShowLogistics && (
        <div className="zd-order-logistics">
          <strong>运输中</strong>
          <span>预计12月18日送达</span>
        </div>
      )}
      <footer className={shouldShowMore ? 'zd-order-card__footer' : 'zd-order-card__footer zd-order-card__footer--actions-only'}>
        {shouldShowMore && <button className="zd-order-more" type="button">更多</button>}
        <div className="zd-order-actions">
          {actions.map((action, index) => (
            <OrderActionButton action={action} key={index} />
          ))}
        </div>
      </footer>
    </article>
  );
}
