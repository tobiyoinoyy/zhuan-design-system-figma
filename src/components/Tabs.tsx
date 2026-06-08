import type { ReactNode } from 'react';

export type TabsProps = {
  items: ReactNode[];
  active?: number;
  layout?: 'equal' | 'left';
  dotIndexes?: number[];
  onChange?: (index: number) => void;
};

export function Tabs({ items, active = 0, layout = 'equal', dotIndexes = [], onChange }: TabsProps) {
  return (
    <div className={`zd-tabs zd-tabs--${layout}`} data-node-id="502:4695">
      {items.map((item, index) => {
        const selected = index === active;
        return (
          <button
            key={index}
            type="button"
            className={selected ? 'zd-tab zd-tab--active' : 'zd-tab'}
            onClick={() => onChange?.(index)}
            data-node-id={selected ? '420:4187' : '420:4191'}
          >
            <span className="zd-tab__label">
              {item}
              {dotIndexes.includes(index) && <span className="zd-tab__dot" />}
            </span>
            <span className="zd-tab__indicator" />
          </button>
        );
      })}
    </div>
  );
}
