import React, { useId, useRef, useEffect } from 'react';
import './Checkbox.css';

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked?: boolean;

  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;

  /** Indeterminate state (for parent checkboxes) */
  indeterminate?: boolean;

  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /** Label text */
  label?: string;

  /** Disabled state */
  disabled?: boolean;

  /** Name attribute */
  name?: string;

  /** Value attribute */
  value?: string;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Additional CSS classes */
  className?: string;

  /** ID for the input element */
  id?: string;
}

/**
 * Checkbox Component
 *
 * A square selection control for multi-choice options.
 * Built using the Muka design token system with support for:
 * - 3 sizes: sm, md, lg
 * - Interactive states: default, hover, checked, indeterminate, disabled
 * - Label text with proper accessibility
 * - Multi-brand theming through design tokens
 *
 * Tokens used:
 * - checkbox.size.{size}
 * - checkbox.radius
 * - checkbox.icon.size.{size}
 * - checkbox.color.{state}.{background|border|icon}
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked,
  indeterminate = false,
  onChange,
  label,
  disabled = false,
  name,
  value,
  size = 'md',
  className = '',
  id,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle indeterminate state (can only be set via JavaScript)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const wrapperClasses = [
    'muka-checkbox',
    `muka-checkbox--${size}`,
    disabled && 'muka-checkbox--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <label className={wrapperClasses} htmlFor={inputId}>
      <span className="muka-checkbox__control">
        <input
          ref={inputRef}
          type="checkbox"
          id={inputId}
          className="muka-checkbox__input"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          name={name}
          value={value}
          {...props}
        />
        <span className="muka-checkbox__indicator">
          {/* Checkmark icon */}
          <svg
            className="muka-checkbox__icon muka-checkbox__icon--check"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Indeterminate icon (minus) */}
          <svg
            className="muka-checkbox__icon muka-checkbox__icon--indeterminate"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.91675 7H11.0834"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
      {label && <span className="muka-checkbox__label">{label}</span>}
    </label>
  );
};

export default Checkbox;
