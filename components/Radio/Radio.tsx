import React, { useId } from 'react';
import './Radio.css';

export interface RadioProps {
  /** Whether the radio is selected */
  checked?: boolean;

  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;

  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /** Label text */
  label?: string;

  /** Disabled state */
  disabled?: boolean;

  /** Name attribute for radio groups */
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
 * Radio Component
 *
 * A circular selection control for single-choice options within a group.
 * Built using the Muka design token system with support for:
 * - 3 sizes: sm, md, lg
 * - Interactive states: default, hover, checked, disabled
 * - Label text with proper accessibility
 * - Multi-brand theming through design tokens
 *
 * Tokens used:
 * - radio.size.{size}
 * - radio.dot.size.{size}
 * - radio.color.{state}.{background|border|dot}
 */
export const Radio: React.FC<RadioProps> = ({
  checked,
  defaultChecked,
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

  const wrapperClasses = [
    'muka-radio',
    `muka-radio--${size}`,
    disabled && 'muka-radio--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <label className={wrapperClasses} htmlFor={inputId}>
      <span className="muka-radio__control">
        <input
          type="radio"
          id={inputId}
          className="muka-radio__input"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          name={name}
          value={value}
          {...props}
        />
        <span className="muka-radio__indicator">
          <span className="muka-radio__dot" />
        </span>
      </span>
      {label && <span className="muka-radio__label">{label}</span>}
    </label>
  );
};

export default Radio;
