import React from 'react';
// Removed CSS import to fix loading issue - styles now inline with fallbacks

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
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  // Base styles with CSS custom properties and fallbacks
  const getButtonStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--button-label-margin-md, 0.5rem)',
      fontFamily: 'var(--alias-font-brand-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
      fontWeight: 'var(--alias-font-brand-weight-semibold, 600)',
      textDecoration: 'none',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
      transition: 'all 0.2s ease',
      outline: 'none',
      position: 'relative',
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? 0.6 : 1,
    };

    // Size-specific styles
    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: {
        padding: 'var(--button-padding-sm-y, 0.5rem) var(--button-padding-sm-x, 0.5rem)',
        borderRadius: 'var(--button-radius-sm, 4px)',
        fontSize: 'var(--text-label-sm-fontSize, 0.875rem)',
        lineHeight: 'var(--text-label-sm-lineHeight, 1.25rem)',
        minHeight: '32px',
      },
      md: {
        padding: 'var(--button-padding-md-y, 0.75rem) var(--button-padding-md-x, 0.75rem)',
        borderRadius: 'var(--button-radius-md, 6px)',
        fontSize: 'var(--text-label-md-fontSize, 1rem)',
        lineHeight: 'var(--text-label-md-lineHeight, 1.5rem)',
        minHeight: '40px',
      },
      lg: {
        padding: 'var(--button-padding-lg-y, 1rem) var(--button-padding-lg-x, 1rem)',
        borderRadius: 'var(--button-radius-lg, 6px)',
        fontSize: 'var(--text-label-lg-fontSize, 1.125rem)',
        lineHeight: 'var(--text-label-lg-lineHeight, 1.75rem)',
        minHeight: '48px',
      },
    };

    // Variant-specific styles
    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: 'var(--button-color-primary-background-default, #8d8d8d)',
        color: 'var(--button-color-primary-foreground-default, #ffffff)',
      },
      secondary: {
        backgroundColor: 'var(--button-color-secondary-background-default, #f0f0f0)',
        color: 'var(--button-color-secondary-foreground-default, #646464)',
        border: '1px solid var(--color-border-default, #e8e8e8)',
      },
      ghost: {
        backgroundColor: 'var(--button-color-ghost-background-default, transparent)',
        color: 'var(--button-color-ghost-foreground-default, #8d8d8d)',
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const iconStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
  };

  // Consistent spacing: button padding matches label padding for balanced distribution
  const hasLeftIcon = Boolean(iconLeft);
  const hasRightIcon = Boolean(iconRight);
  const showLabel = !iconOnly;
  
  // Icon spacing - only add margin between icon and label when both are present
  const leftIconMargin = showLabel ? { marginRight: 'var(--button-label-margin-sm, 0.25rem)' } : {};
  const rightIconMargin = showLabel ? { marginLeft: 'var(--button-label-margin-sm, 0.25rem)' } : {};

  return (
    <button
      style={getButtonStyles()}
      onClick={handleClick}
      disabled={disabled}
      type={type}
      className={className}
      {...props}
    >
      {hasLeftIcon && (
        <span style={{ ...iconStyles, ...leftIconMargin }}>
          {iconLeft}
        </span>
      )}
      
      {showLabel && (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          {children}
        </span>
      )}
      
      {hasRightIcon && (
        <span style={{ ...iconStyles, ...rightIconMargin }}>
          {iconRight}
        </span>
      )}
    </button>
  );
};

export default Button;