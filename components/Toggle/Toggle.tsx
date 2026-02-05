import React, { useId } from 'react';
import './Toggle.css';

export interface ToggleProps {
  /** Whether the toggle is on */
  checked?: boolean;

  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;

  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /** Label text */
  label?: string;

  /** Optional caption/description */
  caption?: string;

  /** Show divider below */
  showDivider?: boolean;

  /** Icon element to show before label */
  icon?: React.ReactNode;

  /** Disabled state */
  disabled?: boolean;

  /** Name attribute */
  name?: string;

  /** Additional CSS classes */
  className?: string;

  /** ID for the input element */
  id?: string;
}

/**
 * Toggle Component
 *
 * A switch control for binary on/off states.
 * Built using the Muka design token system with support for:
 * - On/Off states with smooth animation
 * - Optional label, caption, and icon
 * - Optional divider for list layouts
 * - Disabled state
 * - Multi-brand theming through design tokens
 *
 * Tokens used:
 * - toggle.track.{width|height|radius|color.*}
 * - toggle.knob.{size|offset|color.*}
 * - color.border.muted (for divider)
 * - text.label.lg.* (for label)
 * - text.body.base.regular (for caption)
 */
export const Toggle: React.FC<ToggleProps> = ({
  checked,
  defaultChecked,
  onChange,
  label,
  caption,
  showDivider = false,
  icon,
  disabled = false,
  name,
  className = '',
  id,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  const wrapperClasses = [
    'muka-toggle',
    disabled && 'muka-toggle--disabled',
    showDivider && 'muka-toggle--with-divider',
    caption && 'muka-toggle--with-caption',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {icon && <span className="muka-toggle__icon" aria-hidden="true">{icon}</span>}
      
      <div className="muka-toggle__content">
        {label && (
          <label className="muka-toggle__label" htmlFor={inputId}>
            {label}
          </label>
        )}
        {caption && (
          <span className="muka-toggle__caption">{caption}</span>
        )}
      </div>

      <label className="muka-toggle__switch" htmlFor={inputId}>
        <input
          type="checkbox"
          role="switch"
          id={inputId}
          className="muka-toggle__input"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          name={name}
          aria-checked={checked}
          {...props}
        />
        <span className="muka-toggle__track">
          <span className="muka-toggle__knob" />
        </span>
      </label>

      {showDivider && <div className="muka-toggle__divider" />}
    </div>
  );
};

export default Toggle;
