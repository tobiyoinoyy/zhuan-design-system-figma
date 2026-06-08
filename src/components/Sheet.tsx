import type { ReactNode } from 'react';
import { Button } from './Button';
import { OptionButton } from './Button';
import { Price, ProductImage } from './Product';
import { RadioCheckIcon, ZhuanIcon } from './icons';

type SheetHeight = '50' | '80' | 'short' | 'tall';

const heightClass: Record<SheetHeight, string> = {
  '50': 'zd-sheet-panel--50',
  '80': 'zd-sheet-panel--80',
  short: 'zd-sheet-panel--short',
  tall: 'zd-sheet-panel--tall'
};

function MobileHomeIndicator() {
  return (
    <div className="zd-mobile-home-indicator" data-node-id="550:7266">
      <span />
    </div>
  );
}

export function SheetTitleBar({
  title = '标题栏配置区域',
  back = false,
  close = true,
  nodeId = '945:1090'
}: {
  title?: ReactNode;
  back?: boolean;
  close?: boolean;
  nodeId?: string;
}) {
  return (
    <div className="zd-sheet-title" data-node-id={nodeId}>
      <span className="zd-sheet-title__side">
        {back && <ZhuanIcon name="dialog-back" size={20} />}
      </span>
      <strong>{title}</strong>
      <span className="zd-sheet-title__side">
        {close && <ZhuanIcon name="close" size={20} />}
      </span>
    </div>
  );
}

export function SheetFrame({
  children,
  nodeId,
  className = ''
}: {
  children: ReactNode;
  nodeId: string;
  className?: string;
}) {
  return (
    <div className={`zd-sheet-frame ${className}`.trim()} data-node-id={nodeId}>
      <div className="zd-sheet-mask" />
      {children}
    </div>
  );
}

export function BottomSheet({
  children,
  title = '标题栏配置区域',
  height = 'tall',
  nodeId,
  titleNodeId,
  footer,
  back = false,
  className = ''
}: {
  children: ReactNode;
  title?: ReactNode;
  height?: SheetHeight;
  nodeId: string;
  titleNodeId?: string;
  footer?: ReactNode;
  back?: boolean;
  className?: string;
}) {
  return (
    <SheetFrame nodeId={nodeId}>
      <section className={`zd-sheet-panel ${heightClass[height]} ${className}`.trim()}>
        <SheetTitleBar title={title} back={back} nodeId={titleNodeId} />
        <div className="zd-sheet-panel__body">{children}</div>
        {footer && <div className="zd-sheet-panel__footer">{footer}</div>}
        <MobileHomeIndicator />
      </section>
    </SheetFrame>
  );
}

export function DefaultSheet({ size = '50' }: { size?: '50' | '80' }) {
  const is80 = size === '80';

  return (
    <BottomSheet
      height={size}
      nodeId={is80 ? '956:4126' : '956:4127'}
      titleNodeId={is80 ? '956:4126-title' : '956:4127-title'}
    >
      <div className="zd-sheet-default-content">
        <span>内容区域</span>
        {is80 && <span>超出后可滚动</span>}
      </div>
    </BottomSheet>
  );
}

export function QuantityStepper({ value = '20', unit = 'kg' }: { value?: ReactNode; unit?: ReactNode }) {
  return (
    <div className="zd-quantity-stepper" data-node-id="520:2655">
      <img src="/icons/figma-mcp/qty-minus.svg" alt="" draggable={false} />
      <div className="zd-quantity-stepper__value">
        <strong>{value}</strong>
        <span>{unit}</span>
      </div>
      <img src="/icons/figma-mcp/qty-plus.svg" alt="" draggable={false} />
    </div>
  );
}

function SheetFooterButton({ label = '单引导按钮' }: { label?: ReactNode }) {
  return (
    <Button className="zd-sheet-primary-button" size="lg" variant="strong">
      {label}
    </Button>
  );
}

export function TagSelectionSheet() {
  return (
    <BottomSheet
      className="zd-sheet-panel--tag-selection"
      footer={<SheetFooterButton />}
      height="short"
      nodeId="956:4131"
      title="选择物品信息"
      titleNodeId="945:1147"
    >
      <div className="zd-tag-select" data-node-id="945:480">
        <div className="zd-sheet-field-group">
          <p>物品名称</p>
          <div className="zd-sheet-option-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <OptionButton key={index} label="按钮名称" size="large" state={index === 0 ? 'selected' : 'normal'} />
            ))}
          </div>
        </div>
        <div className="zd-tag-select__weight">
          <span>预估重量</span>
          <QuantityStepper />
        </div>
      </div>
    </BottomSheet>
  );
}

const skuGroups = [
  { title: '成色', options: ['全新', '99新', '95新'] },
  { title: '容量', options: ['6G+128G', '4G+128G', '4G+64G'] },
  { title: '颜色', options: ['夜阑灰', '贝母白'], disabledIndex: 1 },
  { title: '购买渠道', options: ['国行'] },
  { title: '网络制式', options: ['WLAN版', 'Cellular版'] }
];

export function SkuSheet() {
  return (
    <SheetFrame nodeId="956:4132">
      <section className="zd-sheet-panel zd-sheet-panel--tall zd-sheet-panel--sku">
        <button className="zd-sheet-close" type="button" aria-label="关闭">
          <ZhuanIcon name="close" size={20} />
        </button>
        <div className="zd-sheet-sku-head" data-node-id="945:1800">
          <div className="zd-sheet-sku-head__image">
            <ProductImage kind="sku-iphone" size={51.2} />
          </div>
          <div className="zd-sheet-sku-head__copy">
            <Price value="2879" />
            <p>已选：全新、64G+128G、夜阑灰、国行、WLAN版</p>
          </div>
        </div>
        <div className="zd-sheet-divider" />
        <div className="zd-sheet-panel__body zd-sheet-sku-body">
          {skuGroups.map((group) => (
            <div className="zd-sheet-field-group" key={group.title} data-node-id="945:1850">
              <p>{group.title}</p>
              <div className="zd-sheet-small-options">
                {group.options.map((option, index) => (
                  <OptionButton
                    key={option}
                    label={option}
                    size="small"
                    state={index === group.disabledIndex ? 'disabled' : index === 0 ? 'selected' : 'normal'}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="zd-sheet-panel__footer">
          <SheetFooterButton label="确定" />
        </div>
        <MobileHomeIndicator />
      </section>
    </SheetFrame>
  );
}

type CouponData = {
  amount: string;
  suffix?: string;
  threshold: string;
  title: string;
  meta: string;
  action: ReactNode;
  disabled?: boolean;
};

const coupons: CouponData[] = [
  { amount: '100', threshold: '满1799元可用', title: '双12提前购', meta: '仅限2022.12.12当日使用\n手机商品可用，全新品除外', action: '免费领' },
  { amount: '160', threshold: '满2799元可用', title: '双12提前购', meta: '仅限2022.12.12当日使用\n手机商品可用，全新品除外', action: '已领取', disabled: true },
  { amount: '300', threshold: '满1799元可用', title: '奢品新人专享', meta: '仅限2022.12.12当日使用\n手机商品可用，全新品除外', action: '去下单' },
  { amount: '300', threshold: '满1799元可用', title: '奢品新人专享', meta: '仅限2022.12.12当日使用\n手机商品可用，全新品除外', action: '免费领' },
  { amount: '8.8', suffix: '折', threshold: '无门槛', title: '图书新人免邮券', meta: '有效期至2022.05.06\n使用说明', action: '免费领' }
];

function CouponCard({ coupon }: { coupon: CouponData }) {
  const isDiscount = coupon.suffix === '折';

  return (
    <div className="zd-coupon-card" data-node-id="945:2101">
      <div className={isDiscount ? 'zd-coupon-card__value zd-coupon-card__value--discount' : 'zd-coupon-card__value'}>
        <span>{coupon.amount}</span>
        <em>{coupon.suffix ?? '元'}</em>
        <small>{coupon.threshold}</small>
      </div>
      <div className="zd-coupon-card__detail">
        <strong>{coupon.title}</strong>
        <p>{coupon.meta}</p>
      </div>
      <button className={coupon.disabled ? 'zd-coupon-card__action zd-coupon-card__action--disabled' : 'zd-coupon-card__action'} type="button">
        {coupon.action}
      </button>
    </div>
  );
}

export function CouponSheet() {
  return (
    <BottomSheet height="tall" nodeId="956:4133" title="优惠" titleNodeId="945:1997">
      <div className="zd-coupon-sheet">
        <p className="zd-sheet-caption">可领取优惠券</p>
        <div className="zd-coupon-list">
          {coupons.map((coupon, index) => (
            <CouponCard key={`${coupon.amount}-${index}`} coupon={coupon} />
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}

const cancelReasons = ['我所在的城市不支持上门回收', '随便试试，还没打算卖', '礼品不喜欢', '已经卖/送人了', '想留下来还能有用', '其他'];

export function CancelOrderSheet() {
  return (
    <BottomSheet
      className="zd-sheet-panel--cancel"
      footer={
        <div className="zd-sheet-dual-footer">
          <Button size="lg" variant="weak">我再看看</Button>
          <Button size="lg" variant="strong">确定取消</Button>
        </div>
      }
      height="tall"
      nodeId="956:4134"
      title="取消订单"
      titleNodeId="945:2212"
    >
      <div className="zd-cancel-sheet" data-node-id="945:2213">
        <p className="zd-sheet-caption">请选择取消订单原因</p>
        <div className="zd-cancel-reasons">
          {cancelReasons.map((reason, index) => (
            <label className="zd-cancel-reason" key={reason}>
              <RadioCheckIcon selected={index === 0} />
              <span>{reason}</span>
            </label>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}

export function TextCopySheet() {
  return (
    <BottomSheet
      className="zd-sheet-panel--text-copy"
      footer={
        <div className="zd-sheet-dual-footer">
          <Button size="lg" variant="weak">自己发布</Button>
          <Button size="lg" variant="strong">复制发帖</Button>
        </div>
      }
      height="short"
      nodeId="956:4136"
      title="复制内容快捷发帖"
      titleNodeId="945:1156"
    >
      <div className="zd-copy-box" data-node-id="945:973">
        <p>转转的游戏账号非常好，比交易猫等平台购买的更有保障,永久包赔是真的，上次买的号被找回了转转第一时间给了我赔偿。强烈推荐来转转购买游戏账号，王者和平原神都有！！！</p>
        <button type="button">换一个</button>
      </div>
    </BottomSheet>
  );
}

export function RulesSheet() {
  return (
    <BottomSheet height="tall" nodeId="956:4135" title="活动规则" titleNodeId="956:3406">
      <div className="zd-rules-sheet" data-node-id="956:3407">
        <p className="zd-sheet-caption">请选择取消订单原因</p>
        <p>进入“转转APP-图书-邀请有礼”活动页面参与活动</p>
        <strong>活动规则</strong>
        <p>
          活动期间，用户通过活动邀请图书新用户，被邀请的新用户可直接获得20元组合红包；接受邀请的新用户，在14个自然天内，购买转转自营图书并确认收货视为成功邀请。
        </p>
        <strong>红包规则</strong>
        <p>
          活动涉及红包仅限转转自营图书可用，自领取后7天内可用，不与其他促销叠加。每个用户仅限使用1个账号参与活动。
        </p>
      </div>
    </BottomSheet>
  );
}

const provinceGroups = [
  ['A', ['安徽省', '澳门']],
  ['B', ['北京']],
  ['C', ['重庆']],
  ['F', ['福建省']],
  ['G', ['甘肃省', '广东省', '广西壮族自治区', '贵州省']],
  ['H', ['海南省']]
];

const districtGroups = [
  ['G', ['鼓楼', '鼓楼']],
  ['T', ['台州']],
  ['C', ['仓山', '长乐']],
  ['J', ['晋安']],
  ['M', ['马尾', '闽侯', '闽清']],
  ['L', ['罗源', '连江']],
  ['Y', ['永泰']],
  ['P', ['平潭']]
];

export function RegionSelectSheet({ level = 'province' }: { level?: 'province' | 'district' }) {
  const district = level === 'district';
  const groups = district ? districtGroups : provinceGroups;

  return (
    <BottomSheet
      className="zd-sheet-panel--region"
      height="tall"
      nodeId={district ? '956:4129' : '956:4130'}
      title="标题栏配置区域"
      titleNodeId={district ? '956:3809' : '956:3467'}
    >
      <div className="zd-region-sheet" data-node-id={district ? '956:3810' : '956:3660'}>
        <div className={district ? 'zd-region-tabs zd-region-tabs--trail' : 'zd-region-tabs'}>
          {district ? (
            <>
              <span>福建省</span>
              <span>福州市</span>
              <strong>选择区/县</strong>
            </>
          ) : (
            <strong>选择省/地区</strong>
          )}
        </div>
        {!district && (
          <div className="zd-current-location" data-node-id="956:3973">
            <p>当前定位</p>
            <div>
              <span className="zd-current-location__place">
                <ZhuanIcon name="location" size={14} />
                北京 朝阳
              </span>
              <button className="zd-current-location__refresh" type="button">
                <ZhuanIcon name="refresh" size={20} />
                刷新
              </button>
            </div>
          </div>
        )}
        <div className="zd-region-list">
          {groups.map(([letter, items]) => (
            <div className="zd-region-group" key={letter as string}>
              <span>{letter}</span>
              <div>
                {(items as string[]).map((item) => (
                  <p key={`${letter}-${item}`}>{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={district ? 'zd-region-index zd-region-index--active' : 'zd-region-index'}>
          {(district ? ['G', 'T', 'C', 'J', 'M', 'L', 'Y', 'P', 'F'] : ['F', 'L', 'N', 'P', 'Q', 'S', 'X', 'Z']).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}
