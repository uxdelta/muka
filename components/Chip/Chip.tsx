import React from 'react';
import './Chip.css';
import { Icon } from '../Icon';

export interface ChipProps {
  /** Chip label / content */
  children: React.ReactNode;

  /** Color variant (aligns with Figma: default, success, error, info) */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';

  /** Visual style: solid fill or outline/ghost */
  appearance?: 'solid' | 'outline';

  /** Size */
  size?: 'sm' | 'md' | 'lg';

  /** Optional leading icon */
  icon?: React.ReactNode;

  /** Called when the remove button is clicked; when set, shows dismiss control */
  onRemove?: (e: React.MouseEvent) => void;

  /** Additional CSS classes */
  className?: string;

  /** Accessible label for the chip */
  'aria-label'?: string;

  /** Accessible label for the remove button (when onRemove is set) */
  removeButtonLabel?: string;
}

/**
 * Chip Component
 *
 * Compact pill-shaped control for labels, tags, and removable selections.
 * Matches Muka Figma Chip: optional icon, label, optional dismiss.
 *
 * Variants: default (gray), success, error, info, warning
 * Appearance: solid (filled) or outline (light background)
 */
export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'default',
  appearance = 'solid',
  size = 'sm',
  icon,
  onRemove,
  className = '',
  'aria-label': ariaLabel,
  removeButtonLabel = 'Remove',
  ...props
}) => {
  const chipClasses = [
    'muka-chip',
    `muka-chip--${variant}`,
    `muka-chip--${appearance}`,
    `muka-chip--${size}`,
    onRemove && 'muka-chip--dismissible',
    className,
  ].filter(Boolean).join(' ');

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove?.(e);
  };

  return (
    <span
      className={chipClasses}
      role={onRemove ? undefined : 'status'}
      aria-label={ariaLabel}
      {...props}
    >
      {icon && <span className="muka-chip__icon" aria-hidden="true">{icon}</span>}
      <span className="muka-chip__label">{children}</span>
      {onRemove && (
        <button
          type="button"
          className="muka-chip__remove"
          onClick={handleRemoveClick}
          aria-label={removeButtonLabel}
        >
          <Icon name="x" variant="line" size="sm" />
        </button>
      )}
    </span>
  );
};

export default Chip;
