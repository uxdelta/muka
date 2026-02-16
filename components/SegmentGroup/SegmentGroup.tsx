import React, { useState, useCallback } from 'react';
import './SegmentGroup.css';

export interface SegmentOption {
  /** Unique value for this segment */
  value: string;
  /** Display label */
  label: string;
  /** Disabled state */
  disabled?: boolean;
}

export interface SegmentGroupProps {
  /** Array of segment options */
  options: SegmentOption[];

  /** Currently selected value (controlled) */
  value?: string;

  /** Default selected value (uncontrolled) */
  defaultValue?: string;

  /** Change handler */
  onChange?: (value: string) => void;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Additional CSS classes */
  className?: string;

  /** Full width */
  fullWidth?: boolean;

  /** Disabled state for entire group */
  disabled?: boolean;
}

/**
 * SegmentGroup Component
 *
 * A segmented control for selecting one option from a set of mutually exclusive options.
 * Similar to radio buttons but with a more compact, visual representation.
 *
 * @accessibility WCAG 2.1 AA compliant
 * - role="radiogroup" with aria-label
 * - role="radio" for each segment with aria-checked
 * - Keyboard: Arrow keys for navigation, Space/Enter to select
 * - Roving tabindex pattern
 *
 * @example
 * ```tsx
 * <SegmentGroup
 *   options={[
 *     { value: 'day', label: 'Day' },
 *     { value: 'week', label: 'Week' },
 *     { value: 'month', label: 'Month' }
 *   ]}
 *   defaultValue="day"
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */
export const SegmentGroup: React.FC<SegmentGroupProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  size = 'sm',
  className = '',
  fullWidth = false,
  disabled = false,
}) => {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? options[0]?.value ?? ''
  );

  const selectedValue = value !== undefined ? value : internalValue;

  const handleChange = useCallback(
    (newValue: string) => {
      if (disabled) return;

      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [value, onChange, disabled]
  );

  const handleKeyDown = (e: React.KeyboardEvent, optionValue: string, index: number) => {
    const enabledOptions = options.filter((opt) => !opt.disabled);
    const currentIndex = enabledOptions.findIndex((opt) => opt.value === optionValue);

    let nextIndex: number | null = null;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : enabledOptions.length - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = currentIndex < enabledOptions.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = enabledOptions.length - 1;
        break;
      case ' ':
      case 'Enter':
        e.preventDefault();
        handleChange(optionValue);
        return;
      default:
        return;
    }

    if (nextIndex !== null) {
      handleChange(enabledOptions[nextIndex].value);
    }
  };

  return (
    <div
      className={`muka-segmentgroup muka-segmentgroup--${size} ${
        fullWidth ? 'muka-segmentgroup--full-width' : ''
      } ${className}`.trim()}
      role="radiogroup"
    >
      {options.map((option, index) => {
        const isSelected = selectedValue === option.value;
        const isDisabled = disabled || option.disabled;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={option.label}
            disabled={isDisabled}
            tabIndex={isSelected ? 0 : -1}
            className={`muka-segmentgroup__segment ${
              isSelected ? 'muka-segmentgroup__segment--selected' : ''
            } ${isDisabled ? 'muka-segmentgroup__segment--disabled' : ''}`.trim()}
            onClick={() => !isDisabled && handleChange(option.value)}
            onKeyDown={(e) => !isDisabled && handleKeyDown(e, option.value, index)}
          >
            <span className="muka-segmentgroup__label">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SegmentGroup;
