import React from 'react';
import './Divider.css';

export interface DividerProps {
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';

  /** Visual weight */
  variant?: 'default' | 'contrast';

  /** Additional CSS classes */
  className?: string;
}

/**
 * Divider / Separator Component
 *
 * Separates sections in cards and comparison layouts.
 *
 * Tokens used:
 * - separator.color.{default|contrast}
 * - separator.width
 */
export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'default',
  className = '',
  ...props
}) => {
  const dividerClasses = [
    'muka-divider',
    `muka-divider--${orientation}`,
    `muka-divider--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={dividerClasses}
      role="separator"
      aria-orientation={orientation}
      {...props}
    />
  );
};

export default Divider;
