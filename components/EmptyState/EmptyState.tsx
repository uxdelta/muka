import React from 'react';
import './EmptyState.css';

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
 * Displays zero-state UI when no data is available.
 *
 * @accessibility WCAG 2.1 AA compliant
 * - Uses role="status" for dynamic empty states
 * - Illustrations have empty alt="" (decorative)
 * - Action buttons fully accessible
 * - Proper heading hierarchy
 *
 * @example
 * <EmptyState
 *   icon={<Icon name="folder-open" size="lg" />}
 *   title="No documents yet"
 *   description="Upload your first document to get started."
 *   primaryAction={{
 *     label: "Upload document",
 *     onClick: handleUpload
 *   }}
 * />
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
}) => {
  const containerClasses = [
    'muka-emptystate',
    `muka-emptystate--${size}`,
    `muka-emptystate--${align}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} role="status">
      {(icon || illustration) && (
        <div className="muka-emptystate__visual">
          {illustration || icon}
        </div>
      )}
      
      <div className="muka-emptystate__content">
        <h3 className="muka-emptystate__title">{title}</h3>
        {description && (
          <p className="muka-emptystate__description">{description}</p>
        )}
      </div>

      {(primaryAction || secondaryAction) && (
        <div className="muka-emptystate__actions">
          {primaryAction && (
            <button
              className="muka-emptystate__action muka-emptystate__action--primary"
              onClick={primaryAction.onClick}
              type="button"
            >
              {primaryAction.icon && (
                <span className="muka-emptystate__action-icon">
                  {primaryAction.icon}
                </span>
              )}
              <span>{primaryAction.label}</span>
            </button>
          )}
          {secondaryAction && (
            <button
              className="muka-emptystate__action muka-emptystate__action--secondary"
              onClick={secondaryAction.onClick}
              type="button"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
