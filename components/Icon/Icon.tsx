import React from 'react';
import './Icon.css';

export interface IconProps {
  /** SVG element to render */
  children: React.ReactNode;

  /** Size variant — uses icon.size tokens */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /** Color override (defaults to currentColor) */
  color?: string;

  /** Accessible label (sets aria-label) */
  label?: string;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Icon Component
 *
 * Wrapper that enforces consistent sizing and color inheritance.
 *
 * Tokens used:
 * - icon.size.{xs|sm|default|lg}
 */
export const Icon: React.FC<IconProps> = ({
  children,
  size = 'md',
  color,
  label,
  className = '',
  ...props
}) => {
  const iconClasses = [
    'muka-icon',
    `muka-icon--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span
      className={iconClasses}
      style={color ? { color } : undefined}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={!label}
      {...props}
    >
      {children}
    </span>
  );
};

export default Icon;
