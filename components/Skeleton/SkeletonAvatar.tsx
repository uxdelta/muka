import React from 'react';
import { Skeleton } from './Skeleton';
import './Skeleton.css';

export interface SkeletonAvatarProps {
  /** Avatar size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Animation type */
  animation?: 'pulse' | 'wave' | 'none';
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * SkeletonAvatar Component
 *
 * Circular avatar placeholder for loading states.
 * 
 * Features:
 * - 5 size variants (xs, sm, md, lg, xl)
 * - Circular shape (1:1 aspect ratio)
 * - Inherits all Skeleton animations
 *
 * @example
 * <SkeletonAvatar size="md" />
 *
 * @accessibility
 * - Has aria-hidden="true" (decorative)
 * - Should be wrapped in container with aria-busy="true"
 */
export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = 'md',
  animation = 'pulse',
  className = '',
  ...props
}) => {
  const avatarSize = `var(--skeleton-avatar-size-${size})`;

  return (
    <Skeleton
      width={avatarSize}
      height={avatarSize}
      variant="circular"
      animation={animation}
      className={`muka-skeleton-avatar ${className}`}
      {...props}
    />
  );
};

export default SkeletonAvatar;
