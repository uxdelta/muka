import React, { useState, forwardRef } from 'react';
import { warnMissingA11yProp, VISUALLY_HIDDEN_CLASS } from '../../utils/accessibility';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: React.ReactNode;

  /** Button variant - like Figma component variants */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';

  /** Size variant - matches your token system */
  size?: 'sm' | 'md' | 'lg';

  /** Disabled state */
  disabled?: boolean;

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
 * - 4 variants: primary, secondary, tertiary, ghost
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
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
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
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = useState(false);

    // Warn in development if icon-only button lacks aria-label
    warnMissingA11yProp(
      'Button',
      iconOnly && !props['aria-label'],
      'Icon-only buttons require an aria-label for accessibility'
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && onClick) {
        onClick(e);
      }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        setIsPressed(true);
      }
      onMouseDown?.(e);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false);
      onMouseUp?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false);
      onMouseLeave?.(e);
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
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Consistent spacing: button padding matches label padding for balanced distribution
    const hasLeftIcon = Boolean(iconLeft);
    const hasRightIcon = Boolean(iconRight);
    const showLabel = !iconOnly;

    return (
      <button
        ref={ref}
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

        {showLabel && <span className="muka-button__label">{children}</span>}

        {/* Visually hidden fallback for icon-only buttons without aria-label */}
        {iconOnly && !props['aria-label'] && (
          <span className={VISUALLY_HIDDEN_CLASS}>{children}</span>
        )}

        {hasRightIcon && (
          <span className={`muka-button__icon ${showLabel ? 'muka-button__icon--right' : ''}`}>
            {iconRight}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;