import type { ReactNode } from 'react';
import { RadioCheckIcon, ZhuanIcon } from './icons';
import { Switch } from './Switch';

export function FormSwitch({ label = '标题', required = false, value = true }: { label?: string; required?: boolean; value?: boolean }) {
  return (
    <div className="zd-form-row" data-node-id="964:3452">
      <div className="zd-form-row__label">
        {required && <span className="zd-required">*</span>}
        {label}
      </div>
      <Switch checked={value} />
    </div>
  );
}

export function FormRadioRow({
  label = '文案字段',
  options = ['单选项', '单选项', '单选项'],
  value = '单选项'
}: {
  label?: string;
  options?: string[];
  value?: string;
}) {
  return (
    <div className="zd-form-row zd-form-row--radio" data-node-id="964:3453">
      <div className="zd-form-row__label">
        {label}
        <ZhuanIcon name="abnormal" className="zd-form-row__info" size={14} />
      </div>
      <div className="zd-radio-list zd-radio-list--horizontal">
        {options.map((option, index) => (
          <label key={`${option}-${index}`} className="zd-radio">
            <RadioCheckIcon selected={option === value && index === 0} />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function FormInput({
  label = '标题文案',
  placeholder = '输入提示',
  value,
  error,
  count
}: {
  label?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  count?: string;
}) {
  const displayCount = count ?? (value ? '30/100' : '0/100');
  return (
    <div className={error ? 'zd-form-field zd-form-field--error' : 'zd-form-field'} data-node-id={error ? '964:3456' : value ? '964:3455' : '964:3454'}>
      <div className="zd-form-field__top">
        <div className="zd-form-row__label">
          {error && <span className="zd-required">*</span>}
          {label}
          {!error && <ZhuanIcon name="abnormal" className="zd-form-row__info" size={14} />}
        </div>
        <div className={value ? 'zd-form-field__value' : 'zd-form-field__placeholder'}>{value || placeholder}</div>
      </div>
      {error ? <div className="zd-form-field__error">{error}</div> : <div className="zd-form-field__counter">{displayCount}</div>}
    </div>
  );
}

export function FormVerticalRadioList({ options = ['单选项', '单选项'], value = '单选项' }: { options?: string[]; value?: string }) {
  return (
    <div className="zd-form-stack" data-node-id="969:4318">
      {options.map((option, index) => (
        <label key={`${option}-${index}`} className="zd-radio zd-radio--vertical">
          <RadioCheckIcon selected={option === value && index === 0} />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

export function FormCheckboxRow({
  label = '签约动作或关联协议等',
  link = '可配置文字链',
  value = true
}: {
  label?: ReactNode;
  link?: ReactNode;
  value?: boolean;
}) {
  return (
    <div className="zd-form-row zd-form-row--checkbox" data-node-id="892:5427">
      <label className="zd-radio">
        <RadioCheckIcon selected={value} />
        <span className="zd-form-row__muted">{label}</span>
        <a href="#form-link">{link}</a>
      </label>
    </div>
  );
}
