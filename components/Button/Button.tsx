import React, { useState } from 'react';
import { warnMissingA11yProp, VISUALLY_HIDDEN_CLASS } from '../../utils/accessibility';
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

  /** Accessible label (required for icon-only buttons) */
  'aria-label'?: string;

  /** Indicates button is currently pressed (for toggle buttons) */
  'aria-pressed'?: boolean;

  /** Indicates button controls an expanded element */
  'aria-expanded'?: boolean;

  /** ID of element this button controls */
  'aria-controls'?: string;

  /** Indicates button triggers a popup */
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
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
 * @accessibility WCAG 2.1 AA compliant
 * - Uses native <button> element for full keyboard support
 * - Focus indicator meets WCAG 2.4.7 (visible focus)
 * - When iconOnly=true, aria-label is required (dev warning if missing)
 * - Supports aria-pressed for toggle buttons
 * - Supports aria-expanded/aria-controls for menu buttons
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/button/
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
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
  'aria-expanded': ariaExpanded,
  'aria-controls': ariaControls,
  'aria-haspopup': ariaHaspopup,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  // Warn in development if icon-only button lacks aria-label
  warnMissingA11yProp(
    'Button',
    iconOnly && !ariaLabel,
    'Icon-only buttons require an aria-label for accessibility'
  );

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
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-haspopup={ariaHaspopup}
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

      {/* Visually hidden fallback for icon-only buttons without aria-label */}
      {iconOnly && !ariaLabel && (
        <span className={VISUALLY_HIDDEN_CLASS}>
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