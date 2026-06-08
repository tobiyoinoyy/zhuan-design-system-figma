import type { CSSProperties, HTMLAttributes } from 'react';
import { iconRegistry, iconRegistryByName, type IconName } from './iconRegistry';

export { iconRegistry, iconRegistryByName };
export type { IconName };

type IconProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  name: IconName;
  size?: number;
  color?: string;
  title?: string;
};

function iconStyle(size: number, color?: string, style?: CSSProperties): CSSProperties {
  return {
    width: size,
    height: size,
    color,
    ...style
  };
}

function iconSrc(name: IconName) {
  return `/icons/figma-mcp/${name}.svg`;
}

export function ZhuanIcon({ name, size = 20, color, className = '', title, style, ...props }: IconProps) {
  const meta = iconRegistryByName[name];
  const resolvedColor = color ?? ('defaultColor' in meta ? meta.defaultColor : undefined);

  return (
    <span
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={`zd-icon zd-figma-icon zd-figma-icon--${name} ${className}`.trim()}
      data-icon-name={name}
      data-figma-node-id={meta.nodeId}
      role={title ? 'img' : undefined}
      style={iconStyle(size, resolvedColor, style)}
      {...props}
    >
      <img className="zd-figma-icon__svg" src={iconSrc(name)} alt="" draggable={false} />
    </span>
  );
}

type LegacyIconProps = Omit<IconProps, 'name'>;

export function SearchIcon({ size = 16, ...props }: LegacyIconProps) {
  return <ZhuanIcon name="search" size={size} {...props} />;
}

export function BackIcon({ size = 20, ...props }: LegacyIconProps) {
  return <ZhuanIcon name="back" size={size} {...props} />;
}

export function ChevronDownIcon({ size = 12, ...props }: LegacyIconProps) {
  return <ZhuanIcon name="expand" size={size} {...props} />;
}

export function MoreIcon({ size = 20, ...props }: LegacyIconProps) {
  return <ZhuanIcon name="more" size={size} {...props} />;
}

export function CheckIcon({ size = 28, ...props }: LegacyIconProps) {
  return <ZhuanIcon name="normal" size={size} {...props} />;
}

export function CloseIcon({ size = 28, ...props }: LegacyIconProps) {
  return <ZhuanIcon name="close" size={size} {...props} />;
}

export function InfoIcon({ size = 14, ...props }: LegacyIconProps) {
  return <ZhuanIcon name="info" size={size} {...props} />;
}

export function RadioCheckIcon({ selected = false }: { selected?: boolean }) {
  return (
    <span className={selected ? 'zd-radio-icon zd-radio-icon--selected' : 'zd-radio-icon'} aria-hidden="true">
      {selected && <span className="zd-radio-icon__mark" />}
    </span>
  );
}
