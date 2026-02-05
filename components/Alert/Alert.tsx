import React from 'react';
import './Alert.css';

export interface AlertProps {
  /** Alert content */
  children: React.ReactNode;

  /** Alert variant determines color scheme */
  variant?: 'info' | 'success' | 'warning' | 'error';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Optional title displayed above the message */
  title?: string;

  /** Custom icon (replaces default variant icon) */
  icon?: React.ReactNode;

  /** Hide the icon */
  hideIcon?: boolean;

  /** Dismissible alert with close button */
  dismissible?: boolean;

  /** Callback when dismissed */
  onDismiss?: () => void;

  /** Action element (button/link) rendered on the right */
  action?: React.ReactNode;

  /** Additional CSS classes */
  className?: string;

  /** Accessible role (defaults to 'alert' for error, 'status' for others) */
  role?: 'alert' | 'status' | 'none';
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
 * Alert Component (Inline)
 *
 * Displays an inline alert message with contextual styling.
 * Used for form validation feedback, important notices, and status messages.
 *
 * @accessibility WCAG 2.1 AA compliant
 * - Uses role="alert" for error variants (immediate announcement)
 * - Uses role="status" for other variants (polite announcement)
 * - Dismiss button has accessible label
 * - Color is not the only means of conveying status (icons included)
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/alert/
 */
export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  size = 'md',
  title,
  icon,
  hideIcon = false,
  dismissible = false,
  onDismiss,
  action,
  className = '',
  role: roleProp,
  ...props
}) => {
  const alertClasses = [
    'muka-alert',
    `muka-alert--${variant}`,
    `muka-alert--${size}`,
    className,
  ].filter(Boolean).join(' ');

  // Determine role: error uses 'alert' for immediate announcement, others use 'status'
  const role = roleProp ?? (variant === 'error' ? 'alert' : 'status');

  const displayIcon = hideIcon ? null : (icon ?? defaultIcons[variant]);

  const handleDismiss = () => {
    onDismiss?.();
  };

  return (
    <div
      className={alertClasses}
      role={role === 'none' ? undefined : role}
      aria-live={role === 'alert' ? 'assertive' : 'polite'}
      {...props}
    >
      {displayIcon && (
        <span className="muka-alert__icon" aria-hidden="true">
          {displayIcon}
        </span>
      )}

      <div className="muka-alert__content">
        {title && <div className="muka-alert__title">{title}</div>}
        <div className="muka-alert__message">{children}</div>
      </div>

      {action && <div className="muka-alert__action">{action}</div>}

      {dismissible && (
        <button
          type="button"
          className="muka-alert__dismiss"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default Alert;
