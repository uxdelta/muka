import React, { Children } from 'react';
import './Avatar.css';

export interface AvatarGroupProps {
  /** Avatar components to display */
  children: React.ReactNode;
  
  /** Maximum number of avatars to show (rest show as "+N") */
  max?: number;
  
  /** Size of all avatars in group */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Spacing/overlap between avatars */
  spacing?: 'tight' | 'normal';
  
  /** Additional CSS classes */
  className?: string;
  
  /** Accessible label for the group */
  'aria-label'?: string;
}

/**
 * AvatarGroup Component
 *
 * Displays a horizontal stack of avatars with overlap.
 * When there are more avatars than `max`, shows remaining count as "+N".
 *
 * Features:
 * - Configurable max visible avatars
 * - Two spacing modes: tight, normal
 * - Size propagation to child avatars
 * - Overflow counter display
 *
 * @accessibility WCAG 2.1 AA compliant
 * - Uses role="group" with aria-label
 * - Overflow count includes accessible label
 */
export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max = 5,
  size = 'md',
  spacing = 'normal',
  className = '',
  'aria-label': ariaLabel = 'Avatar group',
  ...props
}) => {
  const childArray = Children.toArray(children);
  const totalCount = childArray.length;
  const visibleCount = Math.min(max, totalCount);
  const overflowCount = Math.max(0, totalCount - max);
  
  const visibleChildren = childArray.slice(0, visibleCount);
  
  const groupClasses = [
    'muka-avatar-group',
    `muka-avatar-group--${spacing}`,
    `muka-avatar-group--${size}`,
    className,
  ].filter(Boolean).join(' ');
  
  const overflowClasses = [
    'muka-avatar',
    'muka-avatar--overflow',
    `muka-avatar--${size}`,
    'muka-avatar--circle',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={groupClasses}
      role="group"
      aria-label={ariaLabel}
      {...props}
    >
      {visibleChildren.map((child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        
        // Clone child and inject size prop if not already set
        return (
          <div key={index} className="muka-avatar-group__item">
            {React.cloneElement(child, {
              size: child.props.size || size,
              ...child.props,
            } as any)}
          </div>
        );
      })}
      
      {overflowCount > 0 && (
        <div className="muka-avatar-group__item">
          <div
            className={overflowClasses}
            role="img"
            aria-label={`${overflowCount} more ${overflowCount === 1 ? 'person' : 'people'}`}
          >
            <span className="muka-avatar__overflow-count">
              +{overflowCount}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
