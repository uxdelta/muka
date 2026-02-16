import React from 'react';
import './Alert.css';
import { Icon } from '../Icon';

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

// Default icons per variant (Remix Icon fill style)
const defaultIcons: Record<string, React.ReactNode> = {
  info: <Icon name="information" variant="fill" size="md" />,
  success: <Icon name="check" variant="fill" size="md" />,
  warning: <Icon name="error-warning" variant="fill" size="md" />,
  error: <Icon name="error-warning" variant="fill" size="md" />,
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
          <Icon name="x" variant="line" size="sm" />
        </button>
      )}
    </div>
  );
};

export default Alert;
