import React from 'react';

export interface TimelineIconProps {
  /** Custom icon element (e.g., from react-icons) */
  icon?: React.ReactNode;
  
  /** Status determines the background color */
  status?: 'completed' | 'current' | 'upcoming' | 'blocked';
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * TimelineIcon Component
 * 
 * Status indicator circle/icon for timeline items.
 * Shows a colored circle with optional custom icon inside.
 * 
 * Status colors:
 * - completed: Green (success)
 * - current: Blue (info)
 * - upcoming: Gray (neutral)
 * - blocked: Red (error)
 */
export const TimelineIcon: React.FC<TimelineIconProps> = ({
  icon,
  status = 'upcoming',
  className = '',
}) => {
  const iconClasses = [
    'muka-timeline-icon',
    `muka-timeline-icon--${status}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={iconClasses} aria-hidden="true">
      {icon ? (
        <span className="muka-timeline-icon__content">{icon}</span>
      ) : (
        <span className="muka-timeline-icon__dot" />
      )}
    </div>
  );
};

export default TimelineIcon;
