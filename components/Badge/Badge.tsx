import React from 'react';
import './Badge.css';

export interface BadgeProps {
  /** Badge label / content */
  children: React.ReactNode;

  /** Color variant */
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'error';

  /** Size */
  size?: 'sm' | 'md' | 'lg';

  /** Optional leading icon */
  icon?: React.ReactNode;

  /** Show a dot indicator instead of icon */
  dot?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Accessible label for the badge */
  'aria-label'?: string;
}

/**
 * Badge Component
 *
 * Compact status indicators for labels, counts, and status information.
 * Unlike Chip, badges are non-interactive and non-dismissible.
 *
 * Variants: neutral, info, success, warning, error
 * Sizes: sm, md, lg
 * Features: optional leading icon or dot indicator
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  dot = false,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const badgeClasses = [
    'muka-badge',
    `muka-badge--${variant}`,
    `muka-badge--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span
      className={badgeClasses}
      role="status"
      aria-label={ariaLabel}
      {...props}
    >
      {dot && <span className="muka-badge__dot" aria-hidden="true" />}
      {!dot && icon && <span className="muka-badge__icon" aria-hidden="true">{icon}</span>}
      <span className="muka-badge__label">{children}</span>
    </span>
  );
};

export default Badge;
