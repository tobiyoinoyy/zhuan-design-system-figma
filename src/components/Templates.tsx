import type { ReactNode } from 'react';
import { Button, ButtonBar } from './Button';
import { CustomDialog } from './Dialog';
import { ChipRail, FilterOptionGrid, SortTabs } from './Filter';
import { FormInput, FormRadioRow, FormSwitch } from './Form';
import { TopNav } from './Navigation';
import { OrderCard } from './OrderCard';
import { ConditionAppearanceTag, ProductCardFeeds, ProductCardH, ProductImage, SellChip } from './Product';
import { IOSHomeBar, IOSStatusBar } from './Device';
import { SearchHeader } from './SearchHeader';
import { Tabs } from './Tabs';
import { ZhuanIcon } from './icons';

type TemplateProduct = {
  title: string;
  subtitle: string | null;
  imageKind: 'electronics' | 'iphone';
  layout: 'two-line' | 'one-line';
  promo: string;
  chips: Array<{ label: string; tone?: 'red' | 'info' | 'black' | 'teal' }>;
};

function TemplatePreviewItem({ title, nodeId, children }: { title: string; nodeId: string; children: ReactNode }) {
  return (
    <div className="zd-template-preview-item">
      <div className="zd-template-preview-item__meta">
        <strong>{title}</strong>
        <span>{nodeId}</span>
      </div>
      {children}
    </div>
  );
}

function TemplateTopNav({
  title = 'Title Label',
  rightText = '文字',
  tabs = false,
  tabItems = ['选项1', '选项2', '选项3', '选项4'],
  activeTab = 1,
  dotIndexes = []
}: {
  title?: ReactNode;
  rightText?: ReactNode;
  tabs?: boolean;
  tabItems?: ReactNode[];
  activeTab?: number;
  dotIndexes?: number[];
}) {
  return (
    <>
      <IOSStatusBar />
      <div className="zd-ui-template__top-nav">
        <TopNav title={title} rightText={rightText} />
      </div>
      {tabs && (
        <div className="zd-ui-template__tabs">
          <Tabs items={tabItems} active={activeTab} dotIndexes={dotIndexes} />
        </div>
      )}
    </>
  );
}

function TemplateSearchStack({ keyword = 'iPhone17' }: { keyword?: string }) {
  return (
    <>
      <IOSStatusBar />
      <SearchHeader mode="category" keyword={keyword} />
      <div className="zd-ui-template__sort zd-ui-template__sort--listing">
        <SortTabs active="综合" />
      </div>
      <div className="zd-ui-template__chip-rail zd-ui-template__chip-rail--listing">
        <ChipRail
          chips={[
            { label: '次日达' },
            { label: '促销' },
            { label: '价格区间', selected: true, open: true },
            { label: '成色', open: true },
            { label: '容量', open: true },
            { label: '容量' }
          ]}
        />
      </div>
    </>
  );
}

function ModelRecommendationAction({ label }: { label: string }) {
  return (
    <button className="zd-template-model-action" type="button">
      <span>{label}</span>
      <ZhuanIcon name="jump-shape" size={10} />
    </button>
  );
}

function FeaturedModelRecommendation() {
  return (
    <section className="zd-template-model-card" data-node-id="732:20650">
      <div className="zd-template-model-card__main">
        <ProductImage kind="model" size={54} />
        <div className="zd-template-model-card__body">
          <p className="zd-template-model-card__title">品牌机型名称</p>
          <div className="zd-template-model-card__meta">
            <span className="zd-template-rank-chip">热销榜</span>
            <span>品牌名称 · 第N名</span>
            <ZhuanIcon name="jump" size={10} />
            <span className="zd-template-model-card__feature">高刷屏</span>
            <i />
            <span>AI智能手机</span>
          </div>
          <div className="zd-template-model-card__price-row">
            <strong>
              <span>￥</span>
              <em>5223-5723</em>
            </strong>
            <span>成交价区间</span>
            <i />
            <span>卖家自主定价，价格存在差异</span>
          </div>
        </div>
      </div>
      <div className="zd-template-model-card__actions">
        <ModelRecommendationAction label="价格行情" />
        <ModelRecommendationAction label="机型攻略" />
      </div>
    </section>
  );
}

const templateProducts: TemplateProduct[] = [
  {
    title: '华为 Mate 80 16G+512G 曜石黑',
    subtitle: '国行 全网通',
    imageKind: 'electronics',
    layout: 'two-line',
    promo: '满1299减100',
    chips: [
      { label: '在仓直发' },
      { label: '快速充电', tone: 'black' },
      { label: '充电0次', tone: 'black' }
    ]
  },
  {
    title: '华为 Mate 80 16G+512G 曜石黑',
    subtitle: '国行 全网通',
    imageKind: 'electronics',
    layout: 'two-line',
    promo: '满1299减100',
    chips: [
      { label: '在仓直发' },
      { label: '快速充电', tone: 'black' },
      { label: '充电0次', tone: 'black' }
    ]
  },
  {
    title: 'iPhone X 128G 蓝色 国行 全网通',
    subtitle: null,
    imageKind: 'iphone',
    layout: 'one-line',
    promo: '满1799减80',
    chips: [
      { label: '在仓直发' },
      { label: '三日达', tone: 'black' },
      { label: '手机 · 第1名', tone: 'teal' }
    ]
  },
  {
    title: 'iPhone X 128G 蓝色 国行 全网通',
    subtitle: null,
    imageKind: 'iphone',
    layout: 'one-line',
    promo: '满1799减80',
    chips: [
      { label: '在仓直发' },
      { label: '三日达', tone: 'black' },
      { label: '手机 · 第1名', tone: 'teal' }
    ]
  },
  {
    title: '华为 Mate 80 16G+512G 曜石黑',
    subtitle: '国行 全网通',
    imageKind: 'electronics',
    layout: 'two-line',
    promo: '满1299减100',
    chips: [
      { label: '在仓直发' },
      { label: '快速充电', tone: 'black' },
      { label: '充电0次', tone: 'black' }
    ]
  }
];

function HorizontalProductFeed({ top = 'listing' }: { top?: 'listing' | 'quick' }) {
  return (
    <div className={top === 'quick' ? 'zd-ui-template__feed' : 'zd-ui-template__feed zd-ui-template__feed--listing'} data-node-id={top === 'quick' ? '555:4446' : '557:17566'}>
      {templateProducts.map((product, index) => (
        <ProductCardH
          key={`${product.title}-${index}`}
          className="zd-product-card-h--template"
          imageKind={product.imageKind}
          imageSize={90}
          layout={product.layout}
          title={product.title}
          subtitle={product.subtitle}
          promo={product.promo}
          sellChips={product.chips}
        />
      ))}
    </div>
  );
}

function TemplateOverlay() {
  return <div className="zd-template-overlay" data-node-id="557:14331" />;
}

export function QuickChoiceTemplate() {
  return (
    <article className="zd-ui-template-phone" data-node-id="555:4445">
      <IOSStatusBar />
      <SearchHeader mode="template" keyword="iPhone13 x" />
      <FeaturedModelRecommendation />

      <div className="zd-ui-template__sort">
        <SortTabs active="综合" />
      </div>

      <div className="zd-ui-template__chip-rail">
        <ChipRail
          chips={[
            { label: '次日达' },
            { label: '促销' },
            { label: '价格区间', selected: true, open: true },
            { label: '成色', open: true },
            { label: '容量', open: true },
            { label: '容量' }
          ]}
        />
      </div>

      <HorizontalProductFeed top="quick" />
      <IOSHomeBar light compact />
    </article>
  );
}

export function SortDropdownTemplate() {
  return (
    <article className="zd-ui-template-phone zd-ui-template-phone--dropdown" data-node-id="644:19895">
      <HorizontalProductFeed />
      <TemplateOverlay />
      <IOSStatusBar />
      <SearchHeader mode="category" keyword="iPhone17" />
      <div className="zd-ui-template__sort zd-ui-template__sort--listing zd-ui-template__sort--raised">
        <SortTabs expanded active="综合" />
      </div>
      <IOSHomeBar light compact />
    </article>
  );
}

export function QuickFilterTemplate() {
  return (
    <article className="zd-ui-template-phone zd-ui-template-phone--dropdown" data-node-id="557:15020">
      <HorizontalProductFeed />
      <TemplateOverlay />
      <IOSStatusBar />
      <SearchHeader mode="category" keyword="iPhone17" />
      <section className="zd-template-quick-filter" data-node-id="557:15098">
        <SortTabs active="综合" />
        <ChipRail />
        <FilterOptionGrid />
        <ButtonBar layout="primary" actions={[{ label: '重置', variant: 'weak' }, { label: '确定', variant: 'strong' }]} />
      </section>
      <IOSHomeBar light compact />
    </article>
  );
}

function FilterFunctionRow({ grade, children }: { grade: string; children: ReactNode }) {
  return (
    <div className="zd-template-filter-function-row">
      <strong>{grade}</strong>
      <span>{children}</span>
    </div>
  );
}

export function FilterSheetTemplate() {
  return (
    <article className="zd-ui-template-phone zd-ui-template-phone--mask-top" data-node-id="557:15099">
      <TemplateSearchStack />
      <HorizontalProductFeed />
      <TemplateOverlay />
      <section className="zd-template-filter-sheet" data-node-id="557:15179">
        <header className="zd-template-filter-sheet__title">
          <ZhuanIcon name="dialog-back" size={20} />
          <strong>全部筛选</strong>
          <ZhuanIcon name="close" size={20} />
        </header>
        <div className="zd-template-filter-sheet__body">
          <aside className="zd-template-filter-sheet__aside">
            {['型号', '整体成色', '存储容量', '颜色', '电池健康度', '版本', '精选机况', '商品来源', '价格区间', '优惠服务'].map((item) => (
              <button className={item === '整体成色' ? 'is-active' : ''} key={item} type="button">{item}</button>
            ))}
          </aside>
          <div className="zd-template-filter-sheet__content">
            <h3>整体成色</h3>
            <h4>外观</h4>
            <FilterOptionGrid
              type="double"
              selectedIndex={1}
              options={[
                { label: '全新', helper: '堪比新机' },
                { label: '99新', helper: '堪比新机' },
                { label: '95新', helper: '轻微使用痕迹' },
                { label: '9成新', helper: '中度使用痕迹' },
                { label: '8成新', helper: '明显使用痕迹' }
              ]}
            />
            <h4>功能</h4>
            <div className="zd-template-filter-function">
              <FilterFunctionRow grade="S">功能完好无换修,保修&gt;200天,电池95%+</FilterFunctionRow>
              <FilterFunctionRow grade="A">功能完好无换修，且电池85%+</FilterFunctionRow>
              <FilterFunctionRow grade="B">功能基本完好，且电池85%+</FilterFunctionRow>
              <FilterFunctionRow grade="C">功能基本完好，可能存在电池更换</FilterFunctionRow>
            </div>
            <h3>容量</h3>
          </div>
        </div>
        <div className="zd-template-filter-sheet__footer">
          <ButtonBar layout="primary" actions={[{ label: '重置', variant: 'weak' }, { label: '确定', variant: 'strong' }]} />
        </div>
      </section>
      <IOSHomeBar light compact />
    </article>
  );
}

export function EmptyStateTemplate() {
  return (
    <article className="zd-ui-template-phone" data-node-id="557:18861">
      <TemplateTopNav tabs />
      <section className="zd-template-empty-state">
        <img src="/template-assets/empty-state.png" alt="" draggable={false} />
        <div>
          <h3>空状态标题</h3>
          <p>辅助文本辅助文本辅助文本辅助文本辅助文本辅助文本</p>
        </div>
        <Button variant="strong" size="lg">引导操作</Button>
      </section>
      <IOSHomeBar light compact />
    </article>
  );
}

export function OrderListTemplate() {
  return (
    <article className="zd-ui-template-phone zd-ui-template-phone--gray zd-ui-template-phone--order-list" data-node-id="915:2168">
      <TemplateTopNav
        title="我买的"
        rightText="编辑"
        tabs
        tabItems={['全部', '待付款', '待发货', '待收货', '待评价']}
        activeTab={0}
        dotIndexes={[1]}
      />
      <section className="zd-template-order-list" data-node-id="915:4040">
        <OrderCard
          status="运输中"
          actions={[
            { label: '修改地址', variant: 'secondary' },
            { label: '查看订单详情', variant: 'secondary' }
          ]}
          showMore={false}
        />
        <OrderCard
          status="交易关闭"
          actions={[
            { label: '修改地址', variant: 'secondary' },
            { label: '修改地址', variant: 'secondary' },
            { label: '确认支付', variant: 'primary' }
          ]}
        />
        <OrderCard
          variant="virtual"
          status="交易成功"
          product={{ title: '瑞幸美式/耶加奥瑞白/去水加冰', price: '9.88', count: 1 }}
          actions={[
            { label: '联系卖家', variant: 'secondary' },
            { label: '查看钱款去向', variant: 'secondary' },
            { label: '查看评价', variant: 'secondary' }
          ]}
        />
      </section>
      <IOSHomeBar light compact />
    </article>
  );
}

function DetailCard({ children }: { children: ReactNode }) {
  return <section className="zd-template-detail-card">{children}</section>;
}

export function OrderDetailDialogTemplate() {
  return (
    <article className="zd-ui-template-phone zd-ui-template-phone--gray" data-node-id="950:467">
      <IOSStatusBar />
      <div className="zd-ui-template__top-nav">
        <TopNav title="Title Label" variant="plain" />
      </div>
      <div className="zd-template-order-detail">
        <DetailCard>
          <div className="zd-template-detail-address">
            <strong>深圳文化园A座2单元2层2007室</strong>
            <ZhuanIcon name="jump" size={12} />
            <span>深圳文化园A座2单元2层2007室</span>
            <p>顺丰包邮（送货上门），预计02月26日送达</p>
          </div>
        </DetailCard>
        <DetailCard>
          <div className="zd-template-detail-product">
            <ProductImage kind="electronics" size={64} />
            <div>
              <p>华为 Mate 80 16G+512G 曜石黑 国行 全网通</p>
              <small>处理器2.0GHz Intel Core i5 / 集成显卡 / 256G SSD硬盘</small>
              <strong>￥2159</strong>
              <div className="zd-sell-chip-row">
                <SellChip>在仓直发</SellChip>
                <SellChip>在仓直发</SellChip>
                <SellChip>在仓直发</SellChip>
              </div>
            </div>
          </div>
        </DetailCard>
        <DetailCard>
          <div className="zd-template-detail-total">
            <span>商品总额 <strong>¥2994.00</strong></span>
            <span>运费 <strong>¥0.00</strong></span>
            <span>红包优惠 <em>-¥162.00</em></span>
            <b>合计：¥2832.00</b>
          </div>
        </DetailCard>
      </div>
      <div className="zd-template-order-submit">
        <div>
          <strong>￥2159</strong>
          <span>详情页还有¥200红包待领取</span>
        </div>
        <Button variant="strong" size="sm">提交订单</Button>
      </div>
      <TemplateOverlay />
      <div className="zd-template-dialog">
        <CustomDialog />
      </div>
    </article>
  );
}

export function CardFormTemplate() {
  return (
    <article className="zd-ui-template-phone zd-ui-template-phone--gray" data-node-id="970:4488">
      <TemplateTopNav title="Title Label" rightText={null} />
      <section className="zd-template-form zd-template-form--card">
        <div>
          <FormSwitch />
          <FormInput />
        </div>
        <div>
          <FormRadioRow />
          <FormInput />
          <FormInput />
        </div>
      </section>
      <IOSHomeBar light compact />
    </article>
  );
}

export function FullWidthFormTemplate() {
  return (
    <article className="zd-ui-template-phone zd-ui-template-phone--gray" data-node-id="972:5093">
      <TemplateTopNav title="Title Label" rightText={null} />
      <section className="zd-template-form">
        <div>
          <FormSwitch />
          <FormInput />
        </div>
        <div>
          <FormRadioRow />
          <FormInput />
          <FormInput value="输入内容" error="错误提示" />
          <FormInput />
        </div>
      </section>
      <IOSHomeBar light compact />
    </article>
  );
}

export function LuxuryFeedsTemplate() {
  return (
    <article className="zd-ui-template-phone" data-node-id="557:17549">
      <TemplateSearchStack keyword="搜索" />
      <section className="zd-template-feeds-grid" data-node-id="557:17550">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardFeeds
            key={index}
            variant="luxury"
            title="华为 Mate 80 16G+"
            subtitle="512G 曜石黑 国行"
            promo="公价标签"
            sellChips={[{ label: '同款销量100+', tone: 'info' }, { label: '三日达', tone: 'info' }]}
          />
        ))}
      </section>
      <IOSHomeBar light compact />
    </article>
  );
}

export function HorizontalCardsTemplate() {
  return (
    <article className="zd-ui-template-phone" data-node-id="557:17565">
      <TemplateSearchStack />
      <HorizontalProductFeed />
      <IOSHomeBar light compact />
    </article>
  );
}

const templateItems = [
  { title: '快惠选', nodeId: '555:4445', component: <QuickChoiceTemplate /> },
  { title: '排序综合下拉', nodeId: '644:19895', component: <SortDropdownTemplate /> },
  { title: '快速筛选下拉', nodeId: '557:15020', component: <QuickFilterTemplate /> },
  { title: '筛选弹窗向上拉起', nodeId: '557:15099', component: <FilterSheetTemplate /> },
  { title: '空状态', nodeId: '557:18861', component: <EmptyStateTemplate /> },
  { title: '购买订单列表', nodeId: '915:2168', component: <OrderListTemplate /> },
  { title: '购买订单详情弹窗', nodeId: '950:467', component: <OrderDetailDialogTemplate /> },
  { title: '卡片式表单', nodeId: '970:4488', component: <CardFormTemplate /> },
  { title: '通栏式表单', nodeId: '972:5093', component: <FullWidthFormTemplate /> },
  { title: '商品卡片 feeds 二奢', nodeId: '557:17549', component: <LuxuryFeedsTemplate /> },
  { title: '商品卡片 横版消费电子', nodeId: '557:17565', component: <HorizontalCardsTemplate /> }
];

export function ZhuanUITemplateGallery() {
  return (
    <div className="zd-template-gallery">
      {templateItems.map((item) => (
        <TemplatePreviewItem key={item.nodeId} title={item.title} nodeId={item.nodeId}>
          {item.component}
        </TemplatePreviewItem>
      ))}
    </div>
  );
}
