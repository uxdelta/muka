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

  /** Semantic role for the badge */
  role?: 'status' | 'alert' | 'img' | 'none';

  /** Accessible label when badge needs additional context */
  'aria-label'?: string;

  /** Live region behavior for dynamic content */
  'aria-live'?: 'polite' | 'assertive' | 'off';

  /** Whether badge is purely decorative (hidden from assistive tech) */
  decorative?: boolean;
}

/**
 * Badge / Tag Component
 *
 * Used for license plate type indicators, vehicle category labels, status tags.
 *
 * @accessibility WCAG 2.1 AA compliant
 * - Default role="status" for status indicators
 * - aria-live automatically set based on variant (assertive for error)
 * - Use decorative={true} to hide from assistive technology
 * - Provide aria-label for badges that need context (e.g., "3 new notifications")
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/alert/
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  role,
  'aria-label': ariaLabel,
  'aria-live': ariaLive,
  decorative = false,
  ...props
}) => {
  const badgeClasses = [
    'muka-badge',
    `muka-badge--${variant}`,
    `muka-badge--${size}`,
    className,
  ].filter(Boolean).join(' ');

  // Determine default aria-live based on variant
  const defaultAriaLive = variant === 'error' ? 'assertive' : 'polite';

  // Build accessibility attributes
  const a11yProps = decorative
    ? { 'aria-hidden': true as const }
    : {
        role: role || 'status',
        'aria-label': ariaLabel,
        'aria-live': ariaLive ?? defaultAriaLive,
      };

  return (
    <span className={badgeClasses} {...a11yProps} {...props}>
      {children}
    </span>
  );
};

export default Badge;
