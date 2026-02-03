import React from 'react';
import './Badge.css';

export interface BadgeProps {
  /** Badge content */
  children: React.ReactNode;

  /** Color variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';

  /** Size variant */
  size?: 'sm' | 'md';

  /** Additional CSS classes */
  className?: string;
}

/**
 * Badge / Tag Component
 *
 * Used for license plate type indicators, vehicle category labels, status tags.
 *
 * Tokens used:
 * - color.state.{success|error|info}.{default|foreground|background}
 * - color.surface, color.text (default variant)
 * - chip.size.height.{sm|md}
 * - text.label.{size}
 * - border.radius.full
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  ...props
}) => {
  const badgeClasses = [
    'muka-badge',
    `muka-badge--${variant}`,
    `muka-badge--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  );
};

export default Badge;
