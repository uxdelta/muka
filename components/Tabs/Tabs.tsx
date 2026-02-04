import React, { useState, createContext, useContext, useRef, useCallback } from 'react';
import './Tabs.css';

// ─── Context ────────────────────────────────────────────
interface TabsContextValue {
  activeValue: string;
  setActiveValue: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs components must be used within a <Tabs> provider');
  return context;
};

// ─── Tabs (root) ────────────────────────────────────────
export interface TabsProps {
  /** Tab content (TabList + TabPanels) */
  children: React.ReactNode;

  /** Default active tab value (uncontrolled) */
  defaultValue?: string;

  /** Active tab value (controlled) */
  value?: string;

  /** Change handler */
  onChange?: (value: string) => void;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Tabs Component (Compound)
 *
 * Accessible tab interface with keyboard navigation.
 * Uses: <Tabs>, <TabList>, <Tab>, <TabPanel>
 *
 * @accessibility WCAG 2.1 AA compliant (WAI-ARIA Tabs Pattern)
 * - role="tablist" with aria-orientation
 * - role="tab" with aria-selected, aria-controls
 * - role="tabpanel" with aria-labelledby
 * - Keyboard: ArrowLeft/Right, Home/End navigation
 * - Roving tabindex pattern (active tab is focusable)
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 */
export const Tabs: React.FC<TabsProps> = ({
  children,
  defaultValue = '',
  value,
  onChange,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const activeValue = value !== undefined ? value : internalValue;

  const setActiveValue = useCallback(
    (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [value, onChange]
  );

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue }}>
      <div className={`muka-tabs ${className}`.trim()}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// ─── TabList ────────────────────────────────────────────
export interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabList: React.FC<TabListProps> = ({ children, className = '' }) => {
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const tabs = listRef.current?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]:not([disabled])'
    );
    if (!tabs?.length) return;

    const tabArray = Array.from(tabs);
    const currentIndex = tabArray.findIndex((tab) => tab === document.activeElement);

    let nextIndex: number | null = null;

    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabArray.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabArray.length) % tabArray.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabArray.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      tabArray[nextIndex].focus();
      tabArray[nextIndex].click();
    }
  };

  return (
    <div
      ref={listRef}
      className={`muka-tabs__list ${className}`.trim()}
      role="tablist"
      aria-orientation="horizontal"
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};

// ─── Tab ────────────────────────────────────────────────
export interface TabProps {
  /** Tab value (must match TabPanel value) */
  value: string;

  /** Tab label */
  children: React.ReactNode;

  /** Disabled state */
  disabled?: boolean;

  /** Additional CSS classes */
  className?: string;
}

export const Tab: React.FC<TabProps> = ({
  value,
  children,
  disabled = false,
  className = '',
}) => {
  const { activeValue, setActiveValue } = useTabsContext();
  const isActive = activeValue === value;

  const tabClasses = [
    'muka-tabs__trigger',
    isActive && 'muka-tabs__trigger--current',
    disabled && 'muka-tabs__trigger--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={tabClasses}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      id={`tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => !disabled && setActiveValue(value)}
    >
      {children}
    </button>
  );
};

// ─── TabPanel ───────────────────────────────────────────
export interface TabPanelProps {
  /** Panel value (must match Tab value) */
  value: string;

  /** Panel content */
  children: React.ReactNode;

  /** Additional CSS classes */
  className?: string;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  value,
  children,
  className = '',
}) => {
  const { activeValue } = useTabsContext();
  const isActive = activeValue === value;

  if (!isActive) return null;

  return (
    <div
      className={`muka-tabs__panel ${className}`.trim()}
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

export default Tabs;
