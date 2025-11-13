import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { ReactNode } from 'react';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertProps {
  type: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
}

const alertStyles: Record<AlertType, { bg: string; border: string; text: string; icon: ReactNode }> = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: <CheckCircle size={20} />,
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: <AlertCircle size={20} />,
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: <Info size={20} />,
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: <AlertCircle size={20} />,
  },
};

export default function Alert({ type, title, message, onClose }: AlertProps) {
  const styles = alertStyles[type];

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-lg p-4 ${styles.text} animate-slide-down`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">{styles.icon}</div>
        <div className="ml-3 flex-1">
          {title && <h3 className="font-semibold mb-1">{title}</h3>}
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="flex-shrink-0 ml-2 hover:opacity-70" aria-label="Close alert">
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
