import React, { useState } from 'react';
import { warnMissingA11yProp } from '../../utils/accessibility';
import './Avatar.css';

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  
  /** Alt text for image (required when src is provided) */
  alt?: string;
  
  /** Custom icon element */
  icon?: React.ReactNode;
  
  /** Name for generating initials */
  name?: string;
  
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Shape variant */
  shape?: 'circle' | 'square';
  
  /** Status indicator */
  status?: 'online' | 'offline' | 'busy' | 'away';
  
  /** Status indicator position */
  statusPosition?: 'top-right' | 'bottom-right';
  
  /** Click handler */
  onClick?: () => void;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Accessible label */
  'aria-label'?: string;
}

/**
 * Generate initials from a name string
 */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Avatar Component
 *
 * Displays user representation with multiple fallback options:
 * 1. Image (src) - Primary display if available
 * 2. Icon (icon) - Custom icon fallback
 * 3. Initials (name) - Generated from name
 * 4. Default icon - Generic user icon
 *
 * Features:
 * - 5 sizes: xs, sm, md, lg, xl
 * - 2 shapes: circle, square
 * - Status indicators: online, offline, busy, away
 * - Loading and error states
 * - Clickable support
 *
 * @accessibility WCAG 2.1 AA compliant
 * - Requires alt text when using image
 * - Uses role="img" with aria-label for non-image avatars
 * - Status indicators include aria-label
 * - Clickable avatars use role="button" with keyboard support
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  icon,
  name,
  size = 'md',
  shape = 'circle',
  status,
  statusPosition = 'bottom-right',
  onClick,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(!!src);

  // Warn if src provided without alt
  warnMissingA11yProp(
    'Avatar',
    src && !alt,
    'Avatar with src requires alt text for accessibility'
  );

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  const avatarClasses = [
    'muka-avatar',
    `muka-avatar--${size}`,
    `muka-avatar--${shape}`,
    onClick && 'muka-avatar--clickable',
    imageLoading && 'muka-avatar--loading',
    className,
  ].filter(Boolean).join(' ');

  const statusClasses = [
    'muka-avatar__status',
    `muka-avatar__status--${status}`,
    `muka-avatar__status--${statusPosition}`,
  ].filter(Boolean).join(' ');

  // Determine what to display (fallback chain)
  const showImage = src && !imageError;
  const showIcon = !showImage && icon;
  const showInitials = !showImage && !showIcon && name;
  const showFallback = !showImage && !showIcon && !showInitials;

  // Generate accessible label
  const computedAriaLabel = ariaLabel || (name ? `${name}` : alt || 'User avatar');

  const statusLabels = {
    online: 'Online',
    offline: 'Offline',
    busy: 'Busy',
    away: 'Away',
  };

  const WrapperTag = onClick ? 'button' : 'div';
  const wrapperProps = onClick ? {
    type: 'button' as const,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    'aria-label': computedAriaLabel,
  } : {
    role: 'img',
    'aria-label': computedAriaLabel,
  };

  return (
    <WrapperTag
      className={avatarClasses}
      {...wrapperProps}
      {...props}
    >
      {showImage && (
        <img
          src={src}
          alt={alt}
          className="muka-avatar__image"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}

      {showIcon && (
        <span className="muka-avatar__icon" aria-hidden="true">
          {icon}
        </span>
      )}

      {showInitials && (
        <span className="muka-avatar__initials" aria-hidden="true">
          {getInitials(name!)}
        </span>
      )}

      {showFallback && (
        <svg
          className="muka-avatar__fallback"
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        </svg>
      )}

      {imageLoading && (
        <span className="muka-avatar__skeleton" aria-hidden="true" />
      )}

      {status && (
        <span
          className={statusClasses}
          aria-label={statusLabels[status]}
          role="status"
        />
      )}
    </WrapperTag>
  );
};

export default Avatar;
