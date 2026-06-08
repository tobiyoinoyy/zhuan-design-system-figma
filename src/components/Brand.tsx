import type { CSSProperties } from 'react';

export function OfficialVerification({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? 'zd-official-badge zd-official-badge--compact' : 'zd-official-badge'} data-node-id="915:1393">
      <img src={compact ? '/brand-assets/order-official-verification.svg' : '/brand-assets/official-verification.svg'} alt="" draggable={false} />
    </span>
  );
}

export function ZHUANLogo({ width = 160 }: { width?: number }) {
  const style = { '--zd-logo-width': `${width}px` } as CSSProperties;

  return (
    <div className="zd-zhuan-logo" data-node-id="590:19160" style={style} aria-label="转转">
      <img className="zd-zhuan-logo__mark" src="/brand-assets/logo-mark.svg" alt="" draggable={false} />
      <img className="zd-zhuan-logo__mark-inner" src="/brand-assets/logo-mark-inner.svg" alt="" draggable={false} />
      <img className="zd-zhuan-logo__text zd-zhuan-logo__text--first" src="/brand-assets/logo-text-1.svg" alt="" draggable={false} />
      <img className="zd-zhuan-logo__text zd-zhuan-logo__text--second" src="/brand-assets/logo-text-2.svg" alt="" draggable={false} />
    </div>
  );
}

export function Overlay({ width = 255, height = 478 }: { width?: number; height?: number }) {
  return <div className="zd-overlay" data-node-id="557:14331" style={{ width, height }} />;
}
