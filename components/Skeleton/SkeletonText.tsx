import React from 'react';
import { Skeleton } from './Skeleton';
import './Skeleton.css';

export interface SkeletonTextProps {
  /** Number of text lines to display */
  lines?: number;
  
  /** Width of the last line (e.g., "60%", 200, "10rem") */
  lastLineWidth?: string | number;
  
  /** Spacing between lines */
  spacing?: 'tight' | 'normal';
  
  /** Animation type */
  animation?: 'pulse' | 'wave' | 'none';
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * SkeletonText Component
 *
 * Text placeholder with multiple lines for loading states.
 * 
 * Features:
 * - Configurable number of lines
 * - Custom last line width for natural text appearance
 * - Adjustable line spacing (tight/normal)
 * - Inherits all Skeleton animations
 *
 * @example
 * <SkeletonText lines={3} lastLineWidth="75%" />
 *
 * @accessibility
 * - All skeleton elements have aria-hidden="true"
 * - Should be wrapped in container with aria-busy="true"
 */
export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  lastLineWidth = '60%',
  spacing = 'normal',
  animation = 'pulse',
  className = '',
  ...props
}) => {
  const lineSpacing = spacing === 'tight' 
    ? 'var(--skeleton-text-spacing-tight)' 
    : 'var(--skeleton-text-spacing-normal)';

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: lineSpacing,
  };

  return (
    <div 
      className={`muka-skeleton-text ${className}`} 
      style={containerStyle}
      {...props}
    >
      {Array.from({ length: lines }, (_, index) => {
        const isLastLine = index === lines - 1;
        const lineWidth = isLastLine && lines > 1 ? lastLineWidth : '100%';
        
        return (
          <Skeleton
            key={index}
            width={lineWidth}
            height="var(--skeleton-text-lineHeight)"
            variant="rounded"
            animation={animation}
          />
        );
      })}
    </div>
  );
};

export default SkeletonText;
