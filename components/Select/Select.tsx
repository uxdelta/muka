import React, { useState, useId, useRef } from 'react';
import './Select.css';
import { Icon } from '../Icon';

export interface SelectOption {
  /** Option value */
  value: string;
  /** Option display label */
  label: string;
  /** Disabled option */
  disabled?: boolean;
}

export interface SelectProps {
  /** Available options */
  options: SelectOption[];

  /** Current value */
  value?: string;

  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  /** Placeholder text (shown as first disabled option) */
  placeholder?: string;

  /** Label text */
  label?: string;

  /** Helper text */
  helperText?: string;

  /** Error state */
  error?: boolean;

  /** Error message */
  errorMessage?: string;

  /** Disabled state */
  disabled?: boolean;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Full width */
  fullWidth?: boolean;

  /** Required field */
  required?: boolean;

  /** HTML name attribute */
  name?: string;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Select / Dropdown Component
 *
 * Uses native <select> for maximum accessibility.
 * Styled with the Muka design token system.
 *
 * Tokens used:
 * - select.field.color.{state}.{background|foreground|border}
 * - select.field.radius.{size}
 * - select.field.padding.{x|y}
 * - select.field.height.{size}
 * - text.input.{size}
 * - text.label.{size}.semibold
 */
export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  label,
  helperText,
  error = false,
  errorMessage,
  disabled = false,
  size = 'md',
  fullWidth = false,
  required = false,
  name,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);
  const generatedId = useId();
  const selectId = name || generatedId;
  const helperTextId = `${selectId}-helper`;
  const errorMessageId = `${selectId}-error`;

  const showError = error && errorMessage;
  const describedBy = showError ? errorMessageId : helperText ? helperTextId : undefined;

  const wrapperClasses = [
    'muka-select',
    fullWidth && 'muka-select--full-width',
    className,
  ].filter(Boolean).join(' ');

  const fieldClasses = [
    'muka-select__field',
    `muka-select__field--${size}`,
    isFocused && 'muka-select__field--focused',
    error && 'muka-select__field--error',
    disabled && 'muka-select__field--disabled',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label
          className={`muka-select__label muka-select__label--${size}`}
          htmlFor={selectId}
        >
          {label}
          {required && <span className="muka-select__required" aria-hidden="true"> *</span>}
        </label>
      )}

      <div
        className={fieldClasses}
        onMouseDown={(e) => {
          if (disabled) return;
          if (e.target !== selectRef.current) {
            e.preventDefault();
            selectRef.current?.focus();
          }
        }}
      >
        <select
          ref={selectRef}
          id={selectId}
          className="muka-select__native"
          value={value}
          onChange={onChange}
          disabled={disabled}
          name={name}
          required={required}
          aria-invalid={error || undefined}
          aria-describedby={describedBy}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        <span className="muka-select__chevron" aria-hidden="true">
          <Icon name="arrow-down" variant="line" size="sm" />
        </span>
      </div>

      {showError && (
        <p className="muka-select__error" id={errorMessageId} role="alert">
          {errorMessage}
        </p>
      )}

      {!showError && helperText && (
        <p className="muka-select__helper" id={helperTextId}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Select;
