import React from 'react';
import './TopBar.css';

export interface TopBarProps {
  /** Title text displayed in the center */
  title?: string;

  /** Leading element (back button, menu icon) */
  leading?: React.ReactNode;

  /** Primary trailing action (rightmost, e.g. close button) */
  trailing?: React.ReactNode;

  /** Secondary trailing action (e.g. favorite button) */
  trailingSecondary?: React.ReactNode;

  /** TopBar variant */
  variant?: 'default' | 'draggable';

  /** Show bottom divider (default: true) */
  bordered?: boolean;

  /** Additional CSS classes */
  className?: string;
}

/**
 * TopBar Component
 *
 * A navigation bar used at the top of views, dialogs, and sheets.
 * Provides slots for a leading action (back/close), a centered title,
 * and up to two trailing actions.
 *
 * The "draggable" variant adds a drag handle above the bar, used in
 * bottom sheets and non-modal dialogs.
 *
 * @accessibility WCAG 2.1 AA compliant
 * - Uses `<header>` landmark for semantic structure
 * - Navigation elements are focusable and keyboard-accessible
 * - Title uses `aria-live="polite"` for dynamic updates
 */
export const TopBar: React.FC<TopBarProps> = ({
  title,
  leading,
  trailing,
  trailingSecondary,
  variant = 'default',
  bordered = true,
  className = '',
}) => {
  const topBarClasses = [
    'muka-topbar',
    variant === 'draggable' && 'muka-topbar--draggable',
    className,
  ].filter(Boolean).join(' ');

  return (
    <header className={topBarClasses}>
      {variant === 'draggable' && (
        <div className="muka-topbar__drag-handle-container">
          <div className="muka-topbar__drag-handle" />
        </div>
      )}

      <div className="muka-topbar__container">
        {leading && (
          <div className="muka-topbar__leading">
            {leading}
          </div>
        )}

        {title && (
          <p className="muka-topbar__title" aria-live="polite">
            {title}
          </p>
        )}

        <div className="muka-topbar__trailing">
          {trailingSecondary && (
            <div className="muka-topbar__trailing-action">
              {trailingSecondary}
            </div>
          )}
          {trailing && (
            <div className="muka-topbar__trailing-action">
              {trailing}
            </div>
          )}
        </div>
      </div>

      {bordered && (
        <div className="muka-topbar__divider" role="separator" />
      )}
    </header>
  );
};

export default TopBar;
