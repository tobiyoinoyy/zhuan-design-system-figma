import type { ReactNode } from 'react';
import { ZhuanIcon } from './icons';

export function AddressFilter({ city = '北京市' }: { city?: ReactNode }) {
  return (
    <button className="zd-address-filter" type="button" data-node-id="502:5202">
      <span>{city}</span>
      <img src="/business-assets/address-expand.svg" alt="" draggable={false} />
    </button>
  );
}

export function SelectCorner({ selected = true }: { selected?: boolean }) {
  return (
    <span className={selected ? 'zd-select-corner zd-select-corner--selected' : 'zd-select-corner'} data-node-id={selected ? '1055:7589' : '1055:7588'}>
      <img src="/business-assets/select-corner-check.svg" alt="" draggable={false} />
    </span>
  );
}

export function SelectionLabel({ children = '80%用户选择' }: { children?: ReactNode }) {
  return (
    <span className="zd-selection-label" data-node-id="1055:7594">
      {children}
    </span>
  );
}

export function CurrentLocation({ located = true }: { located?: boolean }) {
  return (
    <div className="zd-current-location zd-current-location--standalone" data-node-id="956:3982">
      <p>当前定位</p>
      {located ? (
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
      ) : (
        <button className="zd-current-location__refresh" type="button">
          <ZhuanIcon name="refresh" size={20} />
          重新定位
        </button>
      )}
    </div>
  );
}

export function CardOption({
  type = 'installment',
  selected = false
}: {
  type?: 'installment' | 'warranty';
  selected?: boolean;
}) {
  const warranty = type === 'warranty';
  const title = warranty ? (selected ? '1年碎屏保' : '3年碎屏保') : '¥568.89x3期';
  const meta = warranty ? null : '含服务费¥0.65/期  费率0.8%月';
  const price = warranty ? (selected ? '179.00' : '269.00') : null;
  const original = warranty ? (selected ? '¥ 338' : '¥ 468') : null;

  return (
    <button
      className={[
        'zd-card-option',
        warranty ? 'zd-card-option--warranty' : 'zd-card-option--installment',
        selected ? 'zd-card-option--selected' : ''
      ].filter(Boolean).join(' ')}
      type="button"
      data-node-id="892:5601"
    >
      <strong>{title}{warranty && <span>i</span>}</strong>
      {meta && <small>{meta}</small>}
      {price && (
        <span className="zd-card-option__price">
          <span>￥</span>
          <em>{price}</em>
          <del>{original}</del>
        </span>
      )}
      <SelectCorner selected={selected} />
    </button>
  );
}
