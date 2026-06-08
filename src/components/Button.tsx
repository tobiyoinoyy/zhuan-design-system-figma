import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'strong' | 'weak' | 'ghost';
type ButtonSize = 'lg' | 'md' | 'sm';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

export function Button({ variant = 'strong', size = 'lg', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`zd-button zd-button--${variant} zd-button--${size} ${className}`.trim()}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonAction = {
  label: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export type ButtonBarProps = {
  layout?: 'single' | 'equal' | 'primary';
  actions: ButtonAction[];
  className?: string;
};

export function ButtonBar({ layout = 'single', actions, className = '' }: ButtonBarProps) {
  const normalized = layout === 'single' ? actions.slice(0, 1) : actions.slice(0, 2);
  return (
    <div className={`zd-button-bar zd-button-bar--${layout} ${className}`.trim()} data-node-id="502:3125">
      {normalized.map((action, index) => {
        const variant = action.variant ?? (layout === 'primary' && index === 0 ? 'weak' : 'strong');
        return (
          <Button key={index} variant={variant} size={action.size ?? 'lg'} className="zd-button-bar__button">
            {action.label}
          </Button>
        );
      })}
    </div>
  );
}

export type OptionButtonProps = {
  label?: ReactNode;
  state?: 'normal' | 'selected' | 'disabled';
  size?: 'large' | 'small';
};

export function OptionButton({ label = '按钮名称', state = 'normal', size = 'large' }: OptionButtonProps) {
  return (
    <button className={`zd-option-button zd-option-button--${size} zd-option-button--${state}`} type="button" data-node-id="502:3270">
      {label}
    </button>
  );
}
