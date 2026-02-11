import React from 'react';
import './Progress.css';

export interface ProgressProps {
  /** Current progress value (0-100) */
  value?: number;

  /** Maximum value (defaults to 100) */
  max?: number;

  /** Visual style: horizontal bar or circular */
  variant?: 'bar' | 'circle';

  /** Size */
  size?: 'sm' | 'md' | 'lg';

  /** Show indeterminate animation (ignores value) */
  indeterminate?: boolean;

  /** Show percentage label */
  showLabel?: boolean;

  /** Custom label text (overrides percentage) */
  label?: string;

  /** Additional CSS classes */
  className?: string;

  /** Accessible label for the progress */
  'aria-label'?: string;
}

/**
 * Progress Component
 *
 * Visual indicator of progress or completion status.
 *
 * Variants:
 * - bar: Horizontal progress bar
 * - circle: Circular progress indicator
 *
 * Sizes: sm, md, lg
 * Modes: Determinate (with value) or indeterminate (animated)
 */
export const Progress: React.FC<ProgressProps> = ({
  value = 0,
  max = 100,
  variant = 'bar',
  size = 'md',
  indeterminate = false,
  showLabel = false,
  label,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const normalizedValue = Math.min(Math.max(0, value), max);
  const percentage = Math.round((normalizedValue / max) * 100);

  const progressClasses = [
    'muka-progress',
    `muka-progress--${variant}`,
    `muka-progress--${size}`,
    indeterminate && 'muka-progress--indeterminate',
    className,
  ].filter(Boolean).join(' ');

  const displayLabel = label ?? `${percentage}%`;

  if (variant === 'circle') {
    // Circle variant uses SVG
    const strokeWidth = 4; // Will be styled via CSS
    const radius = 50 - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = indeterminate
      ? circumference * 0.75
      : circumference * (1 - percentage / 100);

    return (
      <div
        className={progressClasses}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : normalizedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel}
        {...props}
      >
        <svg
          className="muka-progress__circle"
          viewBox="0 0 100 100"
        >
          <circle
            className="muka-progress__track"
            cx="50"
            cy="50"
            r={radius}
            strokeWidth={strokeWidth}
          />
          <circle
            className="muka-progress__fill"
            cx="50"
            cy="50"
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        {showLabel && (
          <span className="muka-progress__label">{displayLabel}</span>
        )}
      </div>
    );
  }

  // Bar variant (default)
  return (
    <div
      className={progressClasses}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : normalizedValue}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
      {...props}
    >
      <div className="muka-progress__track">
        <div
          className="muka-progress__fill"
          style={indeterminate ? undefined : { width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="muka-progress__label">{displayLabel}</span>
      )}
    </div>
  );
};

export default Progress;
