import React from 'react';
import { Skeleton } from './Skeleton';
import { SkeletonText } from './SkeletonText';
import './Skeleton.css';

export interface SkeletonCardProps {
  /** Show image placeholder at the top */
  showImage?: boolean;
  
  /** Height of the image placeholder (in pixels) */
  imageHeight?: number;
  
  /** Number of text lines */
  lines?: number;
  
  /** Show action button placeholders at the bottom */
  showActions?: boolean;
  
  /** Animation type */
  animation?: 'pulse' | 'wave' | 'none';
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * SkeletonCard Component
 *
 * Common card layout placeholder for loading states.
 * 
 * Features:
 * - Optional image placeholder
 * - Configurable text lines
 * - Optional action buttons
 * - Pre-composed layout pattern
 *
 * @example
 * <SkeletonCard showImage imageHeight={200} lines={2} showActions />
 *
 * @accessibility
 * - All skeleton elements have aria-hidden="true"
 * - Should be wrapped in container with aria-busy="true"
 */
export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  showImage = true,
  imageHeight = 180,
  lines = 3,
  showActions = true,
  animation = 'pulse',
  className = '',
  ...props
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-4)',
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-3)',
  };

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--spacing-2)',
  };

  return (
    <div 
      className={`muka-skeleton-card ${className}`}
      style={containerStyle}
      {...props}
    >
      {showImage && (
        <Skeleton
          width="100%"
          height={imageHeight}
          variant="rounded"
          animation={animation}
        />
      )}
      
      <div style={contentStyle}>
        <Skeleton
          width="60%"
          height="24px"
          variant="rounded"
          animation={animation}
        />
        
        <SkeletonText
          lines={lines}
          lastLineWidth="75%"
          spacing="normal"
          animation={animation}
        />
      </div>
      
      {showActions && (
        <div style={actionsStyle}>
          <Skeleton
            width="80px"
            height="32px"
            variant="rounded"
            animation={animation}
          />
          <Skeleton
            width="80px"
            height="32px"
            variant="rounded"
            animation={animation}
          />
        </div>
      )}
    </div>
  );
};

export default SkeletonCard;
