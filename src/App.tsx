import {
  Button,
  ButtonBar,
  BottomBarPDP,
  BottomButtonBar,
  AddressFilter,
  CardOption,
  ChipRail,
  ColorTokenGallery,
  CancelOrderSheet,
  CouponSheet,
  CurrentLocation,
  CustomDialog,
  DefaultSheet,
  DialogActions,
  DialogBody,
  FilterOptionGrid,
  FormCheckboxRow,
  FormInput,
  FormRadioRow,
  FormSwitch,
  FormVerticalRadioList,
  ConditionCombo,
  IOSKeyboard,
  IOSStatusBar,
  LoadingSpinner,
  OfficialVerification,
  OptionButton,
  OrderCard,
  Overlay,
  Price,
  ProductCardFeeds,
  ProductCardH,
  ProductImage,
  QuickFilterDropdown,
  RegionSelectSheet,
  RulesSheet,
  SearchHeader,
  SelectCorner,
  SelectionLabel,
  SellChip,
  SkuSheet,
  SortTabs,
  Switch,
  SystemDialog,
  Tabs,
  TagSelectionSheet,
  TextCopySheet,
  Toast,
  TopNav,
  ZHUANLogo,
  ZhuanUITemplateGallery,
  ZhuanIcon,
  iconRegistry
} from './components';

function PreviewBlock({
  title,
  figmaNode,
  wide = false,
  children
}: {
  title: string;
  figmaNode: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={wide ? 'preview-block preview-block--wide' : 'preview-block'}>
      <div className="preview-block__meta">
        <h2>{title}</h2>
        <span>{figmaNode}</span>
      </div>
      <div className="preview-block__canvas">{children}</div>
    </section>
  );
}

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-kicker">ZHUAN Design Components</p>
          <h1>ZHUAN Design 组件代码化预览</h1>
        </div>
        <div className="app-stats" aria-label="组件统计">
          <span>41 个图标</span>
          <span>30 个颜色 token</span>
          <span>100+ 个变体示例</span>
          <span>11 个 UI 模版</span>
        </div>
      </header>

      <div className="preview-grid">
        <PreviewBlock title="Icons" figmaNode="221:785">
          <div className="icon-preview-grid">
            {iconRegistry.map((icon) => {
              const isWhite = icon.name === 'back-white';
              return (
                <div className={isWhite ? 'icon-card icon-card--dark' : 'icon-card'} key={icon.name}>
                  <div className="icon-card__glyph">
                    <ZhuanIcon name={icon.name} size={20} />
                  </div>
                  <div className="icon-card__text">
                    <strong>{icon.name}</strong>
                    <span>{icon.figmaName}</span>
                    <small>{icon.nodeId}</small>
                  </div>
                </div>
              );
            })}
          </div>
        </PreviewBlock>

        <PreviewBlock title="Color Tokens" figmaNode="Figma color foundations" wide>
          <ColorTokenGallery />
        </PreviewBlock>

        <PreviewBlock title="Tabs" figmaNode="502:4695 / 420:4186">
          <div className="phone-strip">
            <Tabs items={['选项1', '选项2', '选项3', '选项4', '选项5']} active={1} layout="equal" />
            <Tabs items={['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7']} active={0} layout="left" />
          </div>
        </PreviewBlock>

        <PreviewBlock title="Buttons" figmaNode="502:3092 / 502:3125 / 502:3270">
          <div className="button-preview">
            <Button variant="strong" size="lg">引导操作</Button>
            <Button variant="weak" size="lg">弱操作</Button>
            <Button variant="ghost" size="sm">引导操作</Button>
            <ButtonBar layout="single" actions={[{ label: '单引导按钮' }]} />
            <ButtonBar layout="equal" actions={[{ label: '弱操作', variant: 'weak' }, { label: '引导操作' }]} />
            <ButtonBar layout="primary" actions={[{ label: '弱操作' }, { label: '引导操作' }]} />
            <div className="option-row">
              <OptionButton state="normal" />
              <OptionButton state="selected" />
              <OptionButton state="disabled" />
            </div>
          </div>
        </PreviewBlock>

        <PreviewBlock title="Search Header" figmaNode="502:5052">
          <div className="phone-strip">
            <SearchHeader mode="home" />
            <SearchHeader mode="channel" keyword="iPhone17" />
            <SearchHeader mode="category" keyword="iPhone17" />
            <SearchHeader mode="address" />
            <SearchHeader mode="platform" />
            <SearchHeader mode="business" />
            <SearchHeader mode="other" />
          </div>
        </PreviewBlock>

        <PreviewBlock title="Product Cards" figmaNode="514:3170 / 516:3127 / 554:13569">
          <div className="product-preview">
            <div className="product-preview__assets">
              <ProductImage kind="electronics" size={72} />
              <ProductImage kind="luxury" size={72} />
              <ProductImage kind="iphone" size={72} />
              <ProductImage kind="model" size={72} />
              <ProductImage kind="placeholder" size={72} />
            </div>
            <div className="product-preview__parts">
              <ConditionCombo />
              <Price promo="满减标签" />
              <SellChip>在仓直发</SellChip>
              <SellChip tone="info">同款销量100+</SellChip>
              <SellChip tone="black">卖点标签</SellChip>
              <SellChip tone="teal">品类 · 第1名</SellChip>
            </div>
            <div className="product-preview__cards">
              <ProductCardFeeds />
              <ProductCardFeeds variant="luxury" />
              <ProductCardH />
            </div>
          </div>
        </PreviewBlock>

        <PreviewBlock title="Business Components" figmaNode="956:3982 / 502:5202 / 892:5601 / 1055:7590">
          <div className="business-preview">
            <div className="business-preview__row">
              <AddressFilter />
              <SelectionLabel />
              <SelectCorner />
              <SelectCorner selected={false} />
            </div>
            <CurrentLocation />
            <div className="business-preview__row">
              <CardOption />
              <CardOption selected />
            </div>
            <div className="business-preview__row">
              <CardOption type="warranty" selected />
              <CardOption type="warranty" />
            </div>
          </div>
        </PreviewBlock>

        <PreviewBlock title="Navigation" figmaNode="502:4878 / 502:3172">
          <div className="navigation-preview">
            <TopNav variant="immersive" />
            <TopNav title="标题" rightText="文字" />
            <TopNav variant="plain" title="标题" />
            <TopNav variant="tabs" />
            <BottomButtonBar />
            <BottomBarPDP />
          </div>
        </PreviewBlock>

        <PreviewBlock title="Filter" figmaNode="525:5867 / 525:6142 / 525:6231">
          <div className="filter-preview">
            <SortTabs />
            <SortTabs expanded />
            <ChipRail />
            <FilterOptionGrid />
            <FilterOptionGrid type="double" />
            <FilterOptionGrid type="price" />
            <QuickFilterDropdown />
          </div>
        </PreviewBlock>

        <PreviewBlock title="Sheet / Drawer" figmaNode="956:4731 / 956:4733 / 956:4734" wide>
          <div className="sheet-preview">
            <DefaultSheet size="50" />
            <DefaultSheet size="80" />
            <TagSelectionSheet />
            <SkuSheet />
            <CouponSheet />
            <CancelOrderSheet />
            <TextCopySheet />
            <RulesSheet />
            <RegionSelectSheet />
            <RegionSelectSheet level="district" />
          </div>
        </PreviewBlock>

        <PreviewBlock title="Dialog" figmaNode="930:4847 / 935:4882 / 935:4887 / 951:1053">
          <div className="dialog-preview">
            <SystemDialog />
            <CustomDialog />
            <div className="dialog-preview__actions">
              <DialogBody>我是对话框正文我是对话框正文我是对话框正文</DialogBody>
              <DialogActions actions={[{ label: '按钮名称' }, { label: '按钮名称', strong: true }]} />
            </div>
          </div>
        </PreviewBlock>

        <PreviewBlock title="Form" figmaNode="961:3096 / 964:3457">
          <div className="form-preview">
            <div className="switch-row">
              <Switch checked />
              <Switch />
              <Switch checked disabled />
            </div>
            <FormSwitch />
            <FormRadioRow />
            <FormInput />
            <FormInput value="输入正文输入正文输入正文输入正文输入正文输入正文输入正文输入正文输入正文" />
            <FormInput label="标题文案" value="输入正文输入正文输入正文输入正文" error="错误内容提示错误内容提示" />
            <FormVerticalRadioList />
            <FormCheckboxRow />
          </div>
        </PreviewBlock>

        <PreviewBlock title="Toast & Loading" figmaNode="761:20694 / 470:5778">
          <div className="feedback-preview">
            <Toast type="success" />
            <Toast type="warning" />
            <Toast type="loading" />
            <div className="spinner-steps">
              {[0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100].map((progress) => (
                <LoadingSpinner key={progress} progress={progress} />
              ))}
            </div>
          </div>
        </PreviewBlock>

        <PreviewBlock title="Order Cards" figmaNode="1119:8131">
          <div className="order-preview">
            <OrderCard />
            <OrderCard
              variant="virtual"
              status="待付款"
              product={{ title: '商品名称商品名称商品名称商品名称', price: '2159.00', count: 1 }}
              actions={[
                { label: '修改地址', variant: 'secondary' },
                { label: '修改地址', variant: 'secondary' }
              ]}
            />
          </div>
        </PreviewBlock>

        <PreviewBlock title="Device / Brand / Overlay" figmaNode="550:7280 / 557:14783 / 590:19160 / 557:14331" wide>
          <div className="foundation-preview">
            <div className="foundation-preview__brand">
              <ZHUANLogo width={180} />
              <div className="foundation-preview__badge-surface">
                <OfficialVerification />
              </div>
              <Overlay width={128} height={160} />
            </div>
            <div className="foundation-preview__device">
              <IOSStatusBar />
              <IOSKeyboard />
              <IOSKeyboard variant="portrait" />
            </div>
          </div>
        </PreviewBlock>

        <PreviewBlock title="UI Templates" figmaNode="555:4438 / 555:4445" wide>
          <div className="template-preview">
            <ZhuanUITemplateGallery />
          </div>
        </PreviewBlock>
      </div>
    </main>
  );
}

export default App;
