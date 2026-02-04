import React, { useState, useId, useRef } from 'react';
import './Input.css';

export interface InputProps {
  /** Current input value */
  value?: string;

  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /** Placeholder text */
  placeholder?: string;

  /** Label text displayed above the input */
  label?: string;

  /** Helper text displayed below the input */
  helperText?: string;

  /** Error state */
  error?: boolean;

  /** Error message (shown when error is true) */
  errorMessage?: string;

  /** Disabled state */
  disabled?: boolean;

  /** Size variant — matches your token system */
  size?: 'sm' | 'md' | 'lg';

  /** Input type */
  type?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url' | 'search';

  /** Icon for left side */
  iconLeft?: React.ReactNode;

  /** Icon for right side */
  iconRight?: React.ReactNode;

  /** Full width input */
  fullWidth?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** HTML name attribute */
  name?: string;

  /** Required field */
  required?: boolean;

  /** Read-only state */
  readOnly?: boolean;
}

/**
 * Input Component
 *
 * Built using the Muka design token system with support for:
 * - 3 sizes: sm, md, lg
 * - Interactive states: default, hover, focus, error, disabled
 * - Icons with flexible positioning (left, right, or both)
 * - Label and helper text
 * - Multi-brand theming through design tokens
 *
 * Tokens used:
 * - input.field.color.{state}.{background|foreground|border}
 * - input.field.radius.{size}
 * - input.field.padding.{x|y}
 * - input.field.height.{size}
 * - text.input.{size}
 * - text.label.{size}.semibold
 */
export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  helperText,
  error = false,
  errorMessage,
  disabled = false,
  size = 'md',
  type = 'text',
  iconLeft,
  iconRight,
  fullWidth = false,
  className = '',
  name,
  required = false,
  readOnly = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const inputId = name || generatedId;
  const helperTextId = `${inputId}-helper`;
  const errorMessageId = `${inputId}-error`;

  const hasLeftIcon = Boolean(iconLeft);
  const hasRightIcon = Boolean(iconRight);
  const showError = error && errorMessage;
  const describedBy = showError ? errorMessageId : helperText ? helperTextId : undefined;

  // Size mapping for height tokens (sm uses 'sm', md uses 'default', lg uses 'lg')
  const heightSize = size === 'md' ? 'default' : size;

  const wrapperClasses = [
    'muka-input',
    fullWidth && 'muka-input--full-width',
    className
  ].filter(Boolean).join(' ');

  const fieldClasses = [
    'muka-input__field',
    `muka-input__field--${size}`,
    isFocused && 'muka-input__field--focused',
    error && 'muka-input__field--error',
    disabled && 'muka-input__field--disabled',
    hasLeftIcon && 'muka-input__field--has-icon-left',
    hasRightIcon && 'muka-input__field--has-icon-right',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label
          className={`muka-input__label muka-input__label--${size}`}
          htmlFor={inputId}
        >
          {label}
          {required && <span className="muka-input__required" aria-hidden="true"> *</span>}
        </label>
      )}

      <div
        className={fieldClasses}
        onMouseDown={(e) => {
          if (disabled) return;
          if (e.target !== inputRef.current) {
            e.preventDefault();
            inputRef.current?.focus();
          }
        }}
      >
        {hasLeftIcon && (
          <span className="muka-input__icon muka-input__icon--left" aria-hidden="true">
            {iconLeft}
          </span>
        )}

        <input
          ref={inputRef}
          id={inputId}
          className="muka-input__native"
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          name={name}
          required={required}
          aria-invalid={error || undefined}
          aria-describedby={describedBy}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDownCapture={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
              e.stopPropagation();
            }
          }}
          {...props}
        />

        {hasRightIcon && (
          <span className="muka-input__icon muka-input__icon--right" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </div>

      {showError && (
        <p className="muka-input__error" id={errorMessageId} role="alert">
          {errorMessage}
        </p>
      )}

      {!showError && helperText && (
        <p className="muka-input__helper" id={helperTextId}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
