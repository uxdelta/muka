import React from 'react';
import './Skeleton.css';

export interface SkeletonProps {
  /** Width of the skeleton */
  width?: string | number;
  
  /** Height of the skeleton */
  height?: string | number;
  
  /** Shape variant */
  variant?: 'rectangular' | 'circular' | 'rounded';
  
  /** Custom border radius (overrides variant) */
  borderRadius?: string | number;
  
  /** Animation type */
  animation?: 'pulse' | 'wave' | 'none';
  
  /** Additional CSS classes */
  className?: string;
  
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Skeleton Component
 *
 * Base skeleton shape for loading state placeholders.
 * 
 * Features:
 * - Multiple shape variants (rectangular, circular, rounded)
 * - Pulse and wave animations
 * - Respects prefers-reduced-motion
 * - Fully customizable dimensions
 *
 * @accessibility
 * - aria-hidden="true" (decorative element)
 * - Should be wrapped in container with aria-busy="true"
 * - Parent should have role="status" for screen readers
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = 'rectangular',
  borderRadius,
  animation = 'pulse',
  className = '',
  style,
  ...props
}) => {
  const skeletonClasses = [
    'muka-skeleton',
    `muka-skeleton--${variant}`,
    animation !== 'none' && `muka-skeleton--${animation}`,
    className,
  ].filter(Boolean).join(' ');

  const skeletonStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: borderRadius 
      ? (typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius)
      : undefined,
    ...style,
  };

  return (
    <span
      className={skeletonClasses}
      style={skeletonStyle}
      aria-hidden="true"
      {...props}
    />
  );
};

export default Skeleton;
