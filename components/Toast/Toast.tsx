import React, { useEffect, useState, useCallback } from 'react';
import './Toast.css';

export interface ToastProps {
  /** Toast content/message */
  children: React.ReactNode;

  /** Toast variant determines color scheme */
  variant?: 'info' | 'success' | 'warning' | 'error';

  /** Optional title displayed above the message */
  title?: string;

  /** Custom icon (replaces default variant icon) */
  icon?: React.ReactNode;

  /** Hide the icon */
  hideIcon?: boolean;

  /** Auto-dismiss duration in milliseconds (0 = no auto-dismiss) */
  duration?: number;

  /** Whether the toast is visible */
  open?: boolean;

  /** Callback when toast should close */
  onClose?: () => void;

  /** Action element (button/link) */
  action?: React.ReactNode;

  /** Additional CSS classes */
  className?: string;

  /** Position of the toast */
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
}

// Default icons for each variant
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 9V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="6.5" r="0.75" fill="currentColor" />
  </svg>
);

const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6.5 10L9 12.5L13.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2L18.66 17H1.34L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10 8V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="14" r="0.75" fill="currentColor" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7.5 7.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12.5 7.5L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const defaultIcons: Record<string, React.ReactNode> = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
};

/**
 * Toast Component
 *
 * A non-blocking notification that appears temporarily.
 * Used for success confirmations, error notifications, and status updates.
 *
 * @accessibility WCAG 2.1 AA compliant
 * - Uses role="status" with aria-live="polite" for non-intrusive announcements
 * - Error toasts use role="alert" with aria-live="assertive"
 * - Dismiss button has accessible label
 * - Supports keyboard navigation
 * - Pause on hover/focus to prevent dismissal while user is interacting
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/alert/
 */
export const Toast: React.FC<ToastProps> = ({
  children,
  variant = 'info',
  title,
  icon,
  hideIcon = false,
  duration = 5000,
  open = true,
  onClose,
  action,
  className = '',
  position = 'bottom-right',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(open);
  const [isPaused, setIsPaused] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose?.();
  }, [onClose]);

  // Auto-dismiss timer
  useEffect(() => {
    if (!open || duration === 0 || isPaused) return;

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [open, duration, isPaused, handleClose]);

  // Sync with open prop
  useEffect(() => {
    setIsVisible(open);
  }, [open]);

  if (!isVisible) return null;

  const toastClasses = [
    'muka-toast',
    `muka-toast--${variant}`,
    `muka-toast--${position}`,
    className,
  ].filter(Boolean).join(' ');

  const displayIcon = hideIcon ? null : (icon ?? defaultIcons[variant]);

  // Determine role: error uses 'alert' for immediate announcement
  const role = variant === 'error' ? 'alert' : 'status';

  return (
    <div
      className={toastClasses}
      role={role}
      aria-live={role === 'alert' ? 'assertive' : 'polite'}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      {...props}
    >
      {displayIcon && (
        <span className="muka-toast__icon" aria-hidden="true">
          {displayIcon}
        </span>
      )}

      <div className="muka-toast__content">
        {title && <div className="muka-toast__title">{title}</div>}
        <div className="muka-toast__message">{children}</div>
      </div>

      {action && <div className="muka-toast__action">{action}</div>}

      <button
        type="button"
        className="muka-toast__dismiss"
        onClick={handleClose}
        aria-label="Dismiss notification"
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default Toast;
