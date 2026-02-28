import React from 'react';

export interface TimelineSeparatorProps {
  /** Visual style of the connector line */
  variant?: 'solid' | 'dashed';
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * TimelineSeparator Component
 * 
 * Vertical or horizontal connector line between timeline items.
 * Automatically adjusts based on parent Timeline orientation.
 * 
 * Variants:
 * - solid: Continuous line (default, for completed/current items)
 * - dashed: Dashed line (for upcoming/planned items)
 */
export const TimelineSeparator: React.FC<TimelineSeparatorProps> = ({
  variant = 'solid',
  className = '',
}) => {
  const separatorClasses = [
    'muka-timeline-separator',
    `muka-timeline-separator--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={separatorClasses} aria-hidden="true" />
  );
};

export default TimelineSeparator;
