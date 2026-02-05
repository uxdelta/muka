import React, { useId } from 'react';
import { Radio } from '../Radio';
import './RadioTile.css';

export interface RadioTileProps {
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

  /** Name attribute for radio groups */
  name?: string;

  /** Value attribute */
  value?: string;

  /** Additional CSS classes */
  className?: string;

  /** ID for the input element */
  id?: string;
}

/**
 * RadioTile Component
 *
 * A tile-style radio button with support for icons, images, and vertical layouts.
 * Built using the Muka design token system.
 *
 * Variants:
 * - Default: Radio with label
 * - With icon: Radio with icon and label/caption
 * - With image: Radio with image and label/caption
 * - Vertical: Icon or image at top, label below, radio in corner
 */
export const RadioTile: React.FC<RadioTileProps> = ({
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
    'muka-radio-tile',
    isVertical && 'muka-radio-tile--vertical',
    disabled && 'muka-radio-tile--disabled',
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
        <div className="muka-radio-tile__radio muka-radio-tile__radio--corner">
          <Radio
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
          <span className="muka-radio-tile__icon" aria-hidden="true">
            {icon}
          </span>
        )}

        {image && (
          <div className="muka-radio-tile__image">
            <img src={image} alt={imageAlt} />
          </div>
        )}

        {label && (
          <span className="muka-radio-tile__label muka-radio-tile__label--center">
            {label}
          </span>
        )}
      </label>
    );
  }

  // Horizontal layout
  return (
    <label {...tileProps} htmlFor={inputId}>
      <div className="muka-radio-tile__radio">
        <Radio
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
        <span className="muka-radio-tile__icon" aria-hidden="true">
          {icon}
        </span>
      )}

      {image && (
        <div className="muka-radio-tile__image muka-radio-tile__image--horizontal">
          <img src={image} alt={imageAlt} />
        </div>
      )}

      <div className="muka-radio-tile__content">
        {label && (
          <span className={`muka-radio-tile__label ${caption ? 'muka-radio-tile__label--bold' : ''}`}>
            {label}
          </span>
        )}
        {caption && (
          <span className="muka-radio-tile__caption">
            {caption}
          </span>
        )}
      </div>
    </label>
  );
};

export default RadioTile;
