import React, { useId } from 'react';
import { Checkbox } from '../Checkbox';
import './CheckboxTile.css';

export interface CheckboxTileProps {
  /** Whether the tile is selected */
  checked?: boolean;

  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;

  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /** Label text */
  label?: string;

  /** Caption/subtitle text (shown below label when provided) */
  caption?: string;

  /** Icon element to display */
  icon?: React.ReactNode;

  /** Image URL to display */
  image?: string;

  /** Image alt text */
  imageAlt?: string;

  /** Orientation - horizontal or vertical */
  orientation?: 'horizontal' | 'vertical';

  /** Disabled state */
  disabled?: boolean;

  /** Name attribute */
  name?: string;

  /** Value attribute */
  value?: string;

  /** Additional CSS classes */
  className?: string;

  /** ID for the input element */
  id?: string;
}

/**
 * CheckboxTile Component
 *
 * A tile-style checkbox with support for icons, images, and vertical layouts.
 * Built using the Muka design token system.
 *
 * Variants:
 * - Default: Checkbox with label
 * - With icon: Checkbox with icon and label/caption
 * - With image: Checkbox with image and label/caption
 * - Vertical: Icon or image at top, label below, checkbox in corner
 */
export const CheckboxTile: React.FC<CheckboxTileProps> = ({
  checked,
  defaultChecked,
  onChange,
  label,
  caption,
  icon,
  image,
  imageAlt = '',
  orientation = 'horizontal',
  disabled = false,
  name,
  value,
  className = '',
  id,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  const isVertical = orientation === 'vertical';
  const hasMedia = Boolean(icon || image);

  const wrapperClasses = [
    'muka-checkbox-tile',
    isVertical && 'muka-checkbox-tile--vertical',
    disabled && 'muka-checkbox-tile--disabled',
    className
  ].filter(Boolean).join(' ');

  // For vertical layout, we use data attribute to control checked styling via CSS
  const tileProps = {
    className: wrapperClasses,
    'data-checked': checked || undefined,
  };

  if (isVertical) {
    return (
      <label {...tileProps} htmlFor={inputId}>
        <div className="muka-checkbox-tile__checkbox muka-checkbox-tile__checkbox--corner">
          <Checkbox
            id={inputId}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            disabled={disabled}
            name={name}
            value={value}
            {...props}
          />
        </div>

        {icon && (
          <span className="muka-checkbox-tile__icon" aria-hidden="true">
            {icon}
          </span>
        )}

        {image && (
          <div className="muka-checkbox-tile__image">
            <img src={image} alt={imageAlt} />
          </div>
        )}

        {label && (
          <span className="muka-checkbox-tile__label muka-checkbox-tile__label--center">
            {label}
          </span>
        )}
      </label>
    );
  }

  // Horizontal layout
  return (
    <label {...tileProps} htmlFor={inputId}>
      <div className="muka-checkbox-tile__checkbox">
        <Checkbox
          id={inputId}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          name={name}
          value={value}
          {...props}
        />
      </div>

      {icon && (
        <span className="muka-checkbox-tile__icon" aria-hidden="true">
          {icon}
        </span>
      )}

      {image && (
        <div className="muka-checkbox-tile__image muka-checkbox-tile__image--horizontal">
          <img src={image} alt={imageAlt} />
        </div>
      )}

      <div className="muka-checkbox-tile__content">
        {label && (
          <span className={`muka-checkbox-tile__label ${caption ? 'muka-checkbox-tile__label--bold' : ''}`}>
            {label}
          </span>
        )}
        {caption && (
          <span className="muka-checkbox-tile__caption">
            {caption}
          </span>
        )}
      </div>
    </label>
  );
};

export default CheckboxTile;
