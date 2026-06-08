export type SwitchProps = {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
};

export function Switch({ checked = false, disabled = false, label }: SwitchProps) {
  return (
    <button
      aria-checked={checked}
      aria-label={label}
      className={`zd-switch ${checked ? 'zd-switch--checked' : ''} ${disabled ? 'zd-switch--disabled' : ''}`.trim()}
      role="switch"
      type="button"
      data-node-id={checked ? (disabled ? '961:3093' : '961:3095') : '961:3094'}
    >
      <span className="zd-switch__thumb" />
    </button>
  );
}
