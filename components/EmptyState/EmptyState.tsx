import React from 'react';
import './EmptyState.css';
import { Button } from '../Button';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  illustration?: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  size?: 'sm' | 'md' | 'lg';
  align?: 'center' | 'left';
  className?: string;
}

/**
 * EmptyState Component
 *
 * Displays a zero-state UI when no data is available.
 * Used for empty tables, search results, dashboards, and initial states.
 *
 * @accessibility WCAG 2.1 AA compliant
 * - Uses role="status" for dynamic empty states
 * - Illustrations marked as decorative (aria-hidden)
 * - Action buttons fully accessible
 * - Proper heading hierarchy with title
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/alert/
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  illustration,
  primaryAction,
  secondaryAction,
  size = 'md',
  align = 'center',
  className = '',
  ...props
}) => {
  const emptyStateClasses = [
    'muka-emptystate',
    `muka-emptystate--${size}`,
    `muka-emptystate--${align}`,
    className,
  ].filter(Boolean).join(' ');

  const hasActions = primaryAction || secondaryAction;

  return (
    <div
      className={emptyStateClasses}
      role="status"
      {...props}
    >
      {(icon || illustration) && (
        <div className="muka-emptystate__visual" aria-hidden="true">
          {illustration || icon}
        </div>
      )}

      <div className="muka-emptystate__content">
        <h3 className="muka-emptystate__title">{title}</h3>
        {description && (
          <p className="muka-emptystate__description">{description}</p>
        )}
      </div>

      {hasActions && (
        <div className="muka-emptystate__actions">
          {primaryAction && (
            <Button
              variant="primary"
              size={size}
              onClick={primaryAction.onClick}
              iconLeft={primaryAction.icon}
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="secondary"
              size={size}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
