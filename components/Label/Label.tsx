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

  /** Hide label visually but keep accessible to screen readers */
  visuallyHidden?: boolean;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Label Component
 *
 * Built using the Muka design token system.
 * Uses semantic typography tokens: text.label.{size}.semibold
 *
 * @accessibility WCAG 2.1 AA compliant
 * - Native <label> element with htmlFor association
 * - Required indicator hidden from assistive tech (visual only)
 * - visuallyHidden prop for accessible but invisible labels
 */
export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  size = 'md',
  required = false,
  disabled = false,
  visuallyHidden = false,
  className = '',
  ...props
}) => {
  const labelClasses = [
    'muka-label',
    `muka-label--${size}`,
    disabled && 'muka-label--disabled',
    visuallyHidden && 'muka-visually-hidden',
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
