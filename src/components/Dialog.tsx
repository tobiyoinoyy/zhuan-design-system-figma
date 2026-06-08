import type { ReactNode } from 'react';
import { Button } from './Button';
import { ZhuanIcon } from './icons';

export type DialogAction = {
  label: ReactNode;
  strong?: boolean;
};

export function DialogBody({ children }: { children: ReactNode }) {
  return (
    <div className="zd-dialog-body" data-node-id="935:4882">
      <p>{children}</p>
    </div>
  );
}

export function DialogActions({
  actions = [
    { label: '按钮名称' },
    { label: '按钮名称', strong: true }
  ],
  kind = '2'
}: {
  actions?: DialogAction[];
  kind?: '1' | '2' | '3' | 'custom-1' | 'custom-2';
}) {
  const custom = kind.startsWith('custom');
  return (
    <div className={custom ? 'zd-dialog-actions zd-dialog-actions--custom' : `zd-dialog-actions zd-dialog-actions--${kind}`} data-node-id="935:4887">
      {actions.map((action, index) => (
        <button key={index} className={action.strong ? 'zd-dialog-action zd-dialog-action--strong' : 'zd-dialog-action'} type="button">
          {action.label}
        </button>
      ))}
    </div>
  );
}

export function Dialog({
  title = '标题',
  children,
  actions,
  kind = 'system',
  close = false
}: {
  title?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  kind?: 'system' | 'custom';
  close?: boolean;
}) {
  return (
    <section className={`zd-dialog zd-dialog--${kind}`} data-node-id={kind === 'custom' ? '951:1051' : '935:4885'}>
      {close && (
        <button className="zd-dialog-close" type="button" aria-label="关闭">
          <ZhuanIcon name="close" size={20} />
        </button>
      )}
      <div className="zd-dialog-title" data-node-id="930:4847">
        <strong>{title}</strong>
      </div>
      {children}
      {actions}
    </section>
  );
}

export function SystemDialog() {
  return (
    <Dialog title="标题" actions={<DialogActions />}>
      <DialogBody>我是对话框正文我是对话框正文我是对话框正文我是对话框正文我是对话框正文多行左对齐，一行居中对齐</DialogBody>
    </Dialog>
  );
}

export function CustomDialog() {
  return (
    <Dialog
      close
      kind="custom"
      title="标题"
      actions={
        <div className="zd-dialog-custom-footer">
          <Button className="zd-dialog-custom-button" size="lg" variant="strong">
            引导操作
          </Button>
        </div>
      }
    >
      <DialogBody>我是对话框正文我是对话框正文我是对话框正文我是对话框正文我是对话框正文多行左对齐，一行居中对齐</DialogBody>
      <div className="zd-dialog-placeholder" />
    </Dialog>
  );
}
