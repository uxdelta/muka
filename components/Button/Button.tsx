import React, { useState } from 'react';
import './Button.css';

export interface ButtonProps {
  /** Button content */
  children: React.ReactNode;
  
  /** Button variant - like Figma component variants */
  variant?: 'primary' | 'secondary' | 'ghost';
  
  /** Size variant - matches your token system */
  size?: 'sm' | 'md' | 'lg';
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Click handler */
  onClick?: () => void;
  
  /** Button type for forms */
  type?: 'button' | 'submit' | 'reset';
  
  /** Icon for left side */
  iconLeft?: React.ReactNode;
  
  /** Icon for right side */
  iconRight?: React.ReactNode;
  
  /** Hide label text for icon-only button */
  iconOnly?: boolean;
  
  /** Full width button */
  fullWidth?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Button Component
 * 
 * Built using the Muka design token system with support for:
 * - 3 variants: primary, secondary, ghost
 * - 3 sizes: sm, md, lg
 * - Interactive states: default, hover, pressed, disabled
 * - Icons with flexible positioning (left, right, or both)
 * - Icon-only buttons (label can be hidden)
 * - Consistent spacing distribution
 * 
 * Icon API:
 * - iconLeft: Icon for left side
 * - iconRight: Icon for right side
 * - iconOnly: Hide label for icon-only buttons
 * 
 * Tokens used:
 * - button.color.{variant}.background.{state}
 * - button.color.{variant}.foreground.{state}
 * - button.padding.{size}.{x|y}
 * - button.radius.{size}
 * - text.label.{size}
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  iconLeft,
  iconRight,
  iconOnly = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  // Generate CSS classes for the button
  const buttonClasses = [
    'muka-button',
    `muka-button--${variant}`,
    `muka-button--${size}`,
    disabled && 'muka-button--disabled',
    fullWidth && 'muka-button--full-width',
    iconOnly && 'muka-button--icon-only',
    isPressed && 'muka-button--pressed',
    className
  ].filter(Boolean).join(' ');

  // Consistent spacing: button padding matches label padding for balanced distribution
  const hasLeftIcon = Boolean(iconLeft);
  const hasRightIcon = Boolean(iconRight);
  const showLabel = !iconOnly;

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      type={type}
      {...props}
    >
      {hasLeftIcon && (
        <span className={`muka-button__icon ${showLabel ? 'muka-button__icon--left' : ''}`}>
          {iconLeft}
        </span>
      )}
      
      {showLabel && (
        <span className="muka-button__label">
          {children}
        </span>
      )}
      
      {hasRightIcon && (
        <span className={`muka-button__icon ${showLabel ? 'muka-button__icon--right' : ''}`}>
          {iconRight}
        </span>
      )}
    </button>
  );
};

export default Button;