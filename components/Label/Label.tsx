import React from 'react';
import './Label.css';

export interface LabelProps {
  /** Label content */
  children: React.ReactNode;

  /** Associated input ID */
  htmlFor?: string;

  /** Size variant — matches token system */
  size?: 'sm' | 'md' | 'lg';

  /** Show required indicator */
  required?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Label Component
 *
 * Built using the Muka design token system.
 * Uses semantic typography tokens: text.label.{size}.semibold
 *
 * Tokens used:
 * - text.label.{size}.semibold (fontFamily, fontWeight, fontSize, lineHeight)
 * - color.text.default.default
 * - color.text.subtle.default (disabled)
 * - color.state.error.foreground (required indicator)
 */
export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  size = 'md',
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const labelClasses = [
    'muka-label',
    `muka-label--${size}`,
    disabled && 'muka-label--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <label className={labelClasses} htmlFor={htmlFor} {...props}>
      {children}
      {required && <span className="muka-label__required" aria-hidden="true"> *</span>}
    </label>
  );
};

export default Label;
