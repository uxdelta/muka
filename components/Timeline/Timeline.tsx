import React from 'react';
import './Timeline.css';

export interface TimelineProps {
  /** Timeline items */
  children: React.ReactNode;
  
  /** Layout orientation */
  orientation?: 'vertical' | 'horizontal';
  
  /** Content alignment (vertical orientation only) */
  align?: 'left' | 'right' | 'alternate';
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Timeline Component
 * 
 * A flexible timeline component for displaying events, milestones, and progress.
 * Commonly used for construction project tracking, order history, and process flows.
 * 
 * Features:
 * - Vertical and horizontal orientations
 * - Multiple alignment options
 * - Status-based styling (completed, current, upcoming, blocked)
 * - Fully accessible with ARIA support
 * - Multi-brand theming through design tokens
 * 
 * Usage:
 * ```tsx
 * <Timeline orientation="vertical" align="left">
 *   <TimelineItem status="completed" date="2026-01-15">
 *     <TimelineSeparator />
 *     <TimelineIcon />
 *     <TimelineContent>
 *       <Text variant="heading-sm">Foundation Complete</Text>
 *     </TimelineContent>
 *   </TimelineItem>
 * </Timeline>
 * ```
 */
export const Timeline: React.FC<TimelineProps> = ({
  children,
  orientation = 'vertical',
  align = 'left',
  className = '',
}) => {
  const timelineClasses = [
    'muka-timeline',
    `muka-timeline--${orientation}`,
    orientation === 'vertical' && `muka-timeline--align-${align}`,
    className,
  ].filter(Boolean).join(' ');

  const listTag = orientation === 'vertical' ? 'ol' : 'ul';
  const TimelineList = listTag;

  return (
    <TimelineList
      className={timelineClasses}
      role={orientation === 'horizontal' ? 'list' : undefined}
      aria-label="Timeline"
    >
      {children}
    </TimelineList>
  );
};

export default Timeline;
