import type { ReactNode } from 'react';
import { ButtonBar } from './Button';
import { Tabs } from './Tabs';
import { ZhuanIcon, type IconName } from './icons';

export type TopNavVariant = 'normal' | 'plain' | 'immersive' | 'white' | 'tabs';

export type TopNavProps = {
  variant?: TopNavVariant;
  title?: ReactNode;
  rightText?: ReactNode;
  collectors?: number;
  collectorsLabel?: string;
};

export function TopNav({ variant = 'normal', title = '标题', rightText = '文字', collectors = 3, collectorsLabel = '一分钟前收藏' }: TopNavProps) {
  const isImmersive = variant === 'immersive';
  const nodeId = variant === 'immersive' ? '502:4325' : variant === 'white' ? '502:4326' : variant === 'plain' ? '502:4450' : variant === 'tabs' ? '502:4808' : '502:4449';

  if (variant === 'tabs') {
    return (
      <div className="zd-top-nav zd-top-nav--tabs" data-node-id={nodeId}>
        <ZhuanIcon name="back" size={20} />
        <Tabs items={['选项1', '选项2', '选项3']} active={0} layout="equal" />
      </div>
    );
  }

  return (
    <header className={`zd-top-nav zd-top-nav--${variant}`} data-node-id={nodeId}>
      <button className="zd-nav-icon-button" type="button" aria-label="返回">
        <ZhuanIcon name="back" size={20} />
      </button>
      {isImmersive ? (
        <div className="zd-top-nav__collector">
          <span className="zd-top-nav__avatar-stack" aria-hidden="true">
            {Array.from({ length: collectors }).map((_, index) => (
              <span key={index} className={`zd-top-nav__avatar zd-top-nav__avatar--${index + 1}`} />
            ))}
          </span>
          <span>{collectorsLabel}</span>
        </div>
      ) : (
        <div className="zd-top-nav__title">{title}</div>
      )}
      <div className="zd-top-nav__actions">
        {isImmersive && (
          <>
            <button className="zd-nav-icon-button" type="button" aria-label="分享">
              <ZhuanIcon name="share" size={20} />
            </button>
            <button className="zd-nav-icon-button" type="button" aria-label="租">
              <ZhuanIcon name="rent" size={20} />
            </button>
          </>
        )}
        {!isImmersive && variant !== 'plain' && (
          <>
            <button className="zd-nav-icon-button" type="button" aria-label="分享">
              <ZhuanIcon name="share" size={20} />
            </button>
            <button className="zd-top-nav__text-action" type="button">{rightText}</button>
          </>
        )}
        {isImmersive && (
          <button className="zd-nav-icon-button" type="button" aria-label="更多">
            <ZhuanIcon name="more" size={20} />
          </button>
        )}
      </div>
    </header>
  );
}

function HomeIndicator() {
  return (
    <div className="zd-home-indicator" data-node-id="550:7266">
      <span />
    </div>
  );
}

function BottomTool({ icon, label }: { icon: IconName; label: ReactNode }) {
  return (
    <button className="zd-bottom-tool" type="button">
      <ZhuanIcon name={icon} size={20} />
      <span>{label}</span>
    </button>
  );
}

export type BottomBarPDPProps = {
  weakLabel?: ReactNode;
  strongLabel?: ReactNode;
};

export function BottomBarPDP({ weakLabel = '弱操作', strongLabel = '引导操作' }: BottomBarPDPProps) {
  return (
    <div className="zd-bottom-bar zd-bottom-bar--pdp" data-node-id="532:3782">
      <div className="zd-bottom-bar__content">
        <BottomTool icon="customer-service" label="文案" />
        <BottomTool icon="cart" label="文案文案" />
        <BottomTool icon="favorite" label="文案" />
        <div className="zd-bottom-bar__actions">
          <ButtonBar
            layout="primary"
            actions={[
              { label: weakLabel, variant: 'weak' },
              { label: strongLabel, variant: 'strong' }
            ]}
          />
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

export function BottomButtonBar() {
  return (
    <div className="zd-bottom-bar zd-bottom-bar--buttons" data-node-id="502:3148">
      <ButtonBar
        layout="equal"
        actions={[
          { label: '弱操作', variant: 'weak' },
          { label: '引导操作', variant: 'strong' }
        ]}
      />
      <HomeIndicator />
    </div>
  );
}
