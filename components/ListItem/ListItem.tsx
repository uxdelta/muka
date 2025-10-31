import React, { useState } from 'react';
import './ListItem.css';

export interface ListItemProps {
  /** Main label text */
  label: string;
  
  /** Optional caption text below label */
  caption?: string;
  
  /** Leading icon element */
  leadingIcon?: React.ReactNode;
  
  /** Leading image URL */
  leadingImage?: string;
  
  /** Show trailing chevron */
  showChevron?: boolean;
  
  /** Show bottom divider */
  showDivider?: boolean;
  
  /** Click handler */
  onClick?: () => void;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Selected state */
  selected?: boolean;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Semantic HTML element */
  as?: 'div' | 'button' | 'a' | 'li';
  
  /** Additional props for anchor/button elements */
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * ListItem Component
 * 
 * A flexible list item component with support for leading icons/images, 
 * trailing chevrons, labels, and captions. Height adjusts automatically 
 * based on content presence.
 * 
 * Features:
 * - Interactive with hover/pressed/selected states
 * - Accessible keyboard and screen reader support
 * - Flexible leading content (icon or image)
 * - Optional trailing chevron
 * - Semantic HTML support
 * - Uses Muka design tokens
 */
export const ListItem: React.FC<ListItemProps> = ({
  label,
  caption,
  leadingIcon,
  leadingImage,
  showChevron = false,
  showDivider = true,
  onClick,
  disabled = false,
  selected = false,
  className = '',
  as = 'div',
  href,
  type,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const isInteractive = Boolean(onClick) && !disabled;
  const hasLeading = Boolean(leadingIcon || leadingImage);
  
  // Determine semantic element
  const Element = as;

  const handleClick = () => {
    if (isInteractive && onClick) {
      onClick();
    }
  };

  const handleMouseDown = () => {
    if (isInteractive) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleClick();
    }
  };

  // Generate CSS classes
  const itemClasses = [
    'muka-listitem',
    isInteractive && 'muka-listitem--interactive',
    disabled && 'muka-listitem--disabled',
    selected && 'muka-listitem--selected',
    isPressed && 'muka-listitem--pressed',
    !showDivider && 'muka-listitem--no-divider',
    className
  ].filter(Boolean).join(' ');

  // Props for semantic elements
  const elementProps: any = {
    className: itemClasses,
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
    onKeyDown: handleKeyDown,
    'aria-disabled': disabled,
    tabIndex: isInteractive ? 0 : -1,
    ...props
  };

  // Add href for anchor elements
  if (as === 'a' && href) {
    elementProps.href = href;
  }

  // Add type for button elements
  if (as === 'button' && type) {
    elementProps.type = type;
  }

  return (
    <Element {...elementProps}>
      {hasLeading && (
        <div className="muka-listitem__leading">
          {leadingImage ? (
            <img 
              src={leadingImage} 
              alt="" 
              className="muka-listitem__image"
            />
          ) : (
            <div className="muka-listitem__icon">
              {leadingIcon}
            </div>
          )}
        </div>
      )}
      
      <div className="muka-listitem__content">
        <div className="muka-listitem__text">
          <p className="muka-listitem__label">{label}</p>
          {caption && (
            <p className="muka-listitem__caption">{caption}</p>
          )}
        </div>
        
        {showChevron && (
          <div className="muka-listitem__chevron">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none"
              aria-hidden="true"
            >
              <path 
                d="M9 6L15 12L9 18" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
      
      {showDivider && (
        <div className="muka-listitem__divider" aria-hidden="true" />
      )}
    </Element>
  );
};

export default ListItem;
