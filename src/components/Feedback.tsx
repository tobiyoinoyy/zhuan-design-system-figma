export type ToastProps = {
  type?: 'success' | 'warning' | 'loading';
  message?: string;
};

const toastVariants = {
  success: {
    asset: 'toast-success.svg',
    label: '操作成功',
    nodeId: '761:20695'
  },
  warning: {
    asset: 'toast-fail.svg',
    label: '操作失败',
    nodeId: '761:20700'
  },
  loading: {
    asset: 'toast-loading.svg',
    label: '加载中',
    nodeId: '761:20705'
  }
} as const;

export function LoadingSpinner({ progress, size = 32 }: { progress?: number; size?: number }) {
  const safeProgress = Math.max(0, Math.min(100, progress ?? 62.5));
  const circumference = 2 * Math.PI * 13;
  const offset = circumference - (safeProgress / 100) * circumference;

  return (
    <svg
      className={progress == null ? 'zd-spinner zd-spinner--animated' : 'zd-spinner'}
      viewBox="0 0 32 32"
      width={size}
      height={size}
      data-node-id="470:5778"
      aria-hidden="true"
    >
      <circle className="zd-spinner__track" cx="16" cy="16" r="13" />
      <circle
        className="zd-spinner__progress"
        cx="16"
        cy="16"
        r="13"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
}

export function Toast({ type = 'success', message }: ToastProps) {
  const variant = toastVariants[type];
  const label = message ?? variant.label;

  return (
    <div className="zd-toast" data-node-id={variant.nodeId} role="status" aria-label={label}>
      <img className="zd-toast__figma" src={`/icons/figma-mcp/${variant.asset}`} alt="" draggable={false} />
    </div>
  );
}
