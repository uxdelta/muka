import React from 'react';
import './BottomBar.css';

/* ─── BottomBarTab Sub-component ──────────────────────── */

export interface BottomBarTabProps {
  /** Icon element (outline/default state) */
  icon: React.ReactNode;

  /** Active icon element (filled state). Falls back to `icon` if not provided. */
  activeIcon?: React.ReactNode;

  /** Tab label */
  label: string;

  /** Whether this tab is currently active */
  active?: boolean;

  /** Click handler */
  onClick?: () => void;
}

/**
 * BottomBarTab — Individual tab item in navigation variant.
 */
export const BottomBarTab: React.FC<BottomBarTabProps> = ({
  icon,
  activeIcon,
  label,
  active = false,
  onClick,
}) => {
  const tabClasses = [
    'muka-bottombar__tab',
    active && 'muka-bottombar__tab--active',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={tabClasses}
      onClick={onClick}
      role="tab"
      aria-selected={active}
      aria-label={label}
      type="button"
    >
      <span className="muka-bottombar__tab-icon">
        {active && activeIcon ? activeIcon : icon}
      </span>
      <span className="muka-bottombar__tab-label">{label}</span>
    </button>
  );
};

/* ─── BottomBar Component ─────────────────────────────── */

export interface BottomBarProps {
  /** Bar variant — "actions" for button groups, "navigation" for tab items */
  variant: 'actions' | 'navigation';

  /** Floating style — elevated card with rounded corners */
  floating?: boolean;

  /** Show top divider when not floating (default: true) */
  bordered?: boolean;

  /**
   * Desktop transformation for the navigation variant.
   * - `sidebar`: On lg breakpoint, transforms into a vertical sidebar rail on the left.
   * - `topnav`: On lg breakpoint, transforms into a horizontal navigation bar at the top.
   * Only applies to `variant="navigation"`. Ignored for `variant="actions"`.
   */
  desktopAs?: 'sidebar' | 'topnav';

  /** Content — Button elements for "actions" or BottomBarTab elements for "navigation" */
  children: React.ReactNode;

  /** Additional CSS classes */
  className?: string;
}

/**
 * BottomBar Component
 *
 * A bar anchored to the bottom of a view, providing either action buttons
 * or navigation tabs.
 *
 * **Variants:**
 * - `actions`: Renders children as a row of action buttons.
 * - `navigation`: Renders BottomBarTab children as a tab bar.
 *
 * **Floating:** When `floating={true}`, the bar becomes a floating card
 * with rounded corners, padding, and shadow — used in "top level" views.
 *
 * @accessibility WCAG 2.1 AA compliant
 * - Navigation variant uses `role="tablist"` on the container
 * - Each tab uses `role="tab"` with `aria-selected`
 * - Actions variant renders as a toolbar with `role="toolbar"`
 */
export const BottomBar: React.FC<BottomBarProps> = ({
  variant,
  floating = false,
  bordered = true,
  desktopAs,
  children,
  className = '',
}) => {
  const bottomBarClasses = [
    'muka-bottombar',
    `muka-bottombar--${variant}`,
    floating && 'muka-bottombar--floating',
    desktopAs && variant === 'navigation' && `muka-bottombar--desktop-${desktopAs}`,
    className,
  ].filter(Boolean).join(' ');

  const containerRole = variant === 'navigation' ? 'tablist' : 'toolbar';

  return (
    <footer className={bottomBarClasses}>
      {!floating && bordered && (
        <div className="muka-bottombar__divider" role="separator" />
      )}
      <div className="muka-bottombar__content" role={containerRole}>
        {children}
      </div>
    </footer>
  );
};

export default BottomBar;
