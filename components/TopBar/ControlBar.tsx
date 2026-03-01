import React from 'react';
import './ControlBar.css';

export interface ControlBarProps {
  /** Content to render inside the ControlBar (Buttons, Input, Tabs, etc.) */
  children: React.ReactNode;

  /** Layout justification */
  justify?: 'start' | 'center' | 'end' | 'between';

  /** Additional CSS classes */
  className?: string;
}

/**
 * ControlBar Component
 *
 * A slot-based container that appears below the TopBar for secondary controls.
 * Accepts any children (buttons, inputs, tabs, etc.) and arranges them with
 * configurable justification.
 *
 * @example
 * ```tsx
 * <ControlBar justify="between">
 *   <Button variant="ghost" size="sm" iconLeft={<Icon name="filter-3" />}>Filter</Button>
 *   <Button variant="ghost" size="sm" iconRight={<Icon name="sort-desc" />}>Sort</Button>
 * </ControlBar>
 * ```
 */
export const ControlBar: React.FC<ControlBarProps> = ({
  children,
  justify = 'start',
  className = '',
}) => {
  const controlBarClasses = [
    'muka-controlbar',
    `muka-controlbar--justify-${justify}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={controlBarClasses}>
      {children}
    </div>
  );
};

export default ControlBar;
