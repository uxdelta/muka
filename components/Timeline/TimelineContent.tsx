import React from 'react';

export interface TimelineContentProps {
  /** Content to display (headings, text, badges, etc.) */
  children: React.ReactNode;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * TimelineContent Component
 * 
 * Content area for timeline item details.
 * Contains text, headings, badges, chips, or any other content.
 * 
 * Recommended content:
 * - Heading (Text variant="heading-sm")
 * - Description (Text variant="body-sm")
 * - Status badge (Badge)
 * - Tags (Chip)
 */
export const TimelineContent: React.FC<TimelineContentProps> = ({
  children,
  className = '',
}) => {
  const contentClasses = [
    'muka-timeline-content',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={contentClasses}>
      {children}
    </div>
  );
};

export default TimelineContent;
