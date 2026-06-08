import { ZhuanIcon } from './icons';

export type SearchHeaderMode = 'home' | 'channel' | 'category' | 'address' | 'platform' | 'business' | 'other' | 'template';

export type SearchHeaderProps = {
  mode?: SearchHeaderMode;
  keyword?: string;
  placeholder?: string;
  city?: string;
};

function SearchBox({ keyword, placeholder = '推荐搜索词', square = false }: { keyword?: string; placeholder?: string; square?: boolean }) {
  return (
    <div className={square ? 'zd-search-box zd-search-box--square' : 'zd-search-box'}>
      <ZhuanIcon name="search" className="zd-search-box__icon" size={16} />
      <span className={keyword ? 'zd-search-box__text zd-search-box__text--value' : 'zd-search-box__text'}>{keyword || placeholder}</span>
    </div>
  );
}

export function SearchHeader({ mode = 'home', keyword, placeholder = '推荐搜索词', city = '北京市' }: SearchHeaderProps) {
  if (mode === 'channel') {
    return (
      <div className="zd-search-header zd-search-header--channel" data-node-id="502:5050">
        <ZhuanIcon name="back" className="zd-search-header__icon" />
        <div className="zd-search-header__brand">苹果手机</div>
        <SearchBox keyword={keyword ?? 'iPhone17'} />
        <ZhuanIcon name="more" className="zd-search-header__icon" />
      </div>
    );
  }

  if (mode === 'category') {
    return (
      <div className="zd-search-header" data-node-id="502:5051">
        <ZhuanIcon name="back" className="zd-search-header__icon" />
        <SearchBox keyword={keyword ?? 'iPhone17'} />
      </div>
    );
  }

  if (mode === 'address') {
    return (
      <div className="zd-search-header zd-search-header--address" data-node-id="502:5132">
        <div className="zd-search-header__city">
          {city}
          <ZhuanIcon name="expand" size={12} />
        </div>
        <SearchBox placeholder={placeholder} />
      </div>
    );
  }

  if (mode === 'platform' || mode === 'business') {
    return (
      <div className="zd-search-header zd-search-header--action" data-node-id={mode === 'platform' ? '502:5344' : '502:5305'}>
        <ZhuanIcon name="back" className="zd-search-header__icon" />
        <div className="zd-search-box zd-search-box--action">
          <span className="zd-search-box__prefix">{mode === 'platform' ? '宝贝' : '搜索'}</span>
          <ZhuanIcon name="expand" className="zd-search-box__chevron" size={12} />
          <span className="zd-search-box__divider" />
          <span className="zd-search-box__text">{keyword ?? (mode === 'platform' ? '华为 Mate 80' : placeholder)}</span>
        </div>
        <button className="zd-search-header__submit" type="button">搜索</button>
      </div>
    );
  }

  if (mode === 'other') {
    return (
      <div className="zd-search-header" data-node-id="502:5080">
        <ZhuanIcon name="back" className="zd-search-header__icon" />
        <SearchBox keyword={keyword ?? placeholder} />
        <ZhuanIcon name="more" className="zd-search-header__icon" />
      </div>
    );
  }

  if (mode === 'template') {
    return (
      <div className="zd-search-header zd-search-header--template" data-node-id="555:4522">
        <ZhuanIcon name="back" className="zd-search-header__icon" />
        <SearchBox keyword={keyword ?? 'iPhone13 x'} />
        <ZhuanIcon name="more" className="zd-search-header__icon" />
      </div>
    );
  }

  return (
    <div className="zd-search-header zd-search-header--home" data-node-id="502:5049">
      <SearchBox keyword={keyword} placeholder={placeholder} />
    </div>
  );
}
