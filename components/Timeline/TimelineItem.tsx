import React from 'react';

export interface TimelineItemProps {
  /** Timeline item content (typically TimelineSeparator, TimelineIcon, TimelineContent) */
  children: React.ReactNode;
  
  /** Status of the timeline item */
  status?: 'completed' | 'current' | 'upcoming' | 'blocked';
  
  /** Date or timestamp for the item */
  date?: string | Date;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * TimelineItem Component
 * 
 * Individual event or milestone in a timeline.
 * Contains a separator line, icon indicator, and content area.
 * 
 * Status variants:
 * - completed: Past/finished events (green)
 * - current: Active/ongoing events (blue)
 * - upcoming: Future/planned events (gray)
 * - blocked: Stopped/blocked events (red)
 */
export const TimelineItem: React.FC<TimelineItemProps> = ({
  children,
  status = 'upcoming',
  date,
  className = '',
}) => {
  const itemClasses = [
    'muka-timeline-item',
    `muka-timeline-item--${status}`,
    className,
  ].filter(Boolean).join(' ');

  const isCurrent = status === 'current';
  
  const formattedDate = date
    ? date instanceof Date
      ? date.toLocaleDateString()
      : date
    : undefined;

  return (
    <li
      className={itemClasses}
      aria-current={isCurrent ? 'step' : undefined}
      data-status={status}
      data-date={formattedDate}
    >
      {children}
    </li>
  );
};

export default TimelineItem;
