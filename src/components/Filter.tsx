import type { ReactNode } from 'react';
import { ButtonBar } from './Button';
import { ZhuanIcon } from './icons';

type SortItem = {
  label: string;
  icon?: 'expand' | 'collapse' | 'sort' | 'filter' | 'model';
};

const sortItems: SortItem[] = [
  { label: '综合', icon: 'collapse' },
  { label: '价格', icon: 'sort' },
  { label: '型号', icon: 'model' },
  { label: '筛选', icon: 'filter' }
];

export function SortTabs({ expanded = false, active = '综合' }: { expanded?: boolean; active?: string }) {
  return (
    <div className={expanded ? 'zd-sort-tabs zd-sort-tabs--expanded' : 'zd-sort-tabs'} data-node-id={expanded ? '525:5866' : '525:5806'}>
      <div className="zd-sort-tabs__bar">
        {sortItems.map((item) => {
          const selected = item.label === active;
          return (
            <button key={item.label} className={selected ? 'zd-sort-tab zd-sort-tab--active' : 'zd-sort-tab'} type="button">
              <span>{item.label}</span>
              {item.icon === 'collapse' && <ZhuanIcon name={expanded && selected ? 'filter-collapse-done' : 'filter-expand-done'} size={12} />}
              {item.icon === 'sort' && <ZhuanIcon name="sort" size={12} />}
              {item.icon === 'model' && <ZhuanIcon name="category-brand-model" size={12} />}
              {item.icon === 'filter' && <ZhuanIcon name="filter" size={12} />}
            </button>
          );
        })}
      </div>
      {expanded && (
        <div className="zd-sort-tabs__panel">
          <button className="zd-sort-tabs__option zd-sort-tabs__option--active" type="button">综合</button>
          <button className="zd-sort-tabs__option" type="button">最新上架</button>
        </div>
      )}
    </div>
  );
}

export function FilterChip({ label, selected = false, open = false }: { label: ReactNode; selected?: boolean; open?: boolean }) {
  return (
    <button className={selected ? 'zd-filter-chip zd-filter-chip--selected' : 'zd-filter-chip'} type="button">
      <span>{label}</span>
      {open && <ZhuanIcon name={selected ? 'filter-collapse' : 'filter-expand'} size={12} />}
    </button>
  );
}

export function ChipRail({
  chips = [
    { label: '次日达' },
    { label: '促销' },
    { label: '价格区间', open: true },
    { label: '成色', open: true },
    { label: '容量', open: true, selected: true },
    { label: '容量' }
  ]
}: {
  chips?: Array<{ label: ReactNode; selected?: boolean; open?: boolean }>;
}) {
  return (
    <div className="zd-chip-rail" data-node-id="525:6014">
      {chips.map((chip, index) => (
        <FilterChip key={index} {...chip} />
      ))}
    </div>
  );
}

export type FilterOption = {
  label: ReactNode;
  helper?: ReactNode;
};

export type FilterOptionGridProps = {
  type?: 'single' | 'double' | 'price';
  options?: FilterOption[];
  selectedIndex?: number;
};

const singleOptions: FilterOption[] = ['16GB', '32GB', '64GB', '128GB', '256GB', '512GB'].map((label) => ({ label }));
const doubleOptions: FilterOption[] = [
  { label: '99新', helper: '堪比新机' },
  { label: '95新', helper: '自用首选' },
  { label: '9成新', helper: '高性价比' },
  { label: '8成新', helper: '超值实用' },
  { label: '瑕疵', helper: '实惠之选' },
  { label: '7成新', helper: '良品特惠' }
];
const priceOptions: FilterOption[] = [
  { label: '0-300', helper: '19%用户的选择' },
  { label: '300-1000', helper: '70%用户的选择' },
  { label: '1000-2000', helper: '21%用户的选择' }
];

export function FilterOptionGrid({ type = 'single', options, selectedIndex = 0 }: FilterOptionGridProps) {
  const resolvedOptions = options ?? (type === 'double' ? doubleOptions : type === 'price' ? priceOptions : singleOptions);
  const nodeId = type === 'double' ? '525:6140' : type === 'price' ? '525:6141' : '525:6139';

  return (
    <div className={`zd-filter-options zd-filter-options--${type}`} data-node-id={nodeId}>
      {type === 'price' && (
        <div className="zd-filter-price-inputs">
          <span />
          <em />
          <span />
        </div>
      )}
      <div className="zd-filter-options__grid">
        {resolvedOptions.map((option, index) => (
          <button key={index} className={index === selectedIndex ? 'zd-filter-option zd-filter-option--selected' : 'zd-filter-option'} type="button">
            <span>{option.label}</span>
            {option.helper && <small>{option.helper}</small>}
          </button>
        ))}
      </div>
    </div>
  );
}

export function QuickFilterDropdown() {
  return (
    <div className="zd-quick-filter" data-node-id="525:6231">
      <SortTabs active="综合" />
      <ChipRail />
      <FilterOptionGrid />
      <ButtonBar
        layout="primary"
        actions={[
          { label: '弱操作', variant: 'weak' },
          { label: '引导操作', variant: 'strong' }
        ]}
      />
    </div>
  );
}
