import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { Icon } from '../Icon';
import '../Menu/Menu.css';

// ─── ContextMenu Root ───────────────────────────────────────────────────────

export interface ContextMenuProps {
  /** Content that can be right-clicked */
  children: React.ReactNode;
  /** Called when the open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Modal behavior */
  modal?: boolean;
}

/**
 * ContextMenu Component
 *
 * A menu that appears on right-click (context menu).
 * Built on Radix UI ContextMenu for accessibility and keyboard navigation.
 *
 * @example
 * ```tsx
 * <ContextMenu>
 *   <ContextMenuTrigger>
 *     <Card>Right-click me</Card>
 *   </ContextMenuTrigger>
 *   <ContextMenuContent>
 *     <ContextMenuItem onSelect={() => console.log('Copy')}>Copy</ContextMenuItem>
 *     <ContextMenuItem onSelect={() => console.log('Paste')}>Paste</ContextMenuItem>
 *   </ContextMenuContent>
 * </ContextMenu>
 * ```
 */
export const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  onOpenChange,
  modal = true,
}) => {
  return (
    <ContextMenuPrimitive.Root onOpenChange={onOpenChange} modal={modal}>
      {children}
    </ContextMenuPrimitive.Root>
  );
};

// ─── ContextMenu Trigger ────────────────────────────────────────────────────

export interface ContextMenuTriggerProps {
  /** The element that can be right-clicked */
  children: React.ReactNode;
  /** Merge trigger props onto child element instead of wrapping */
  asChild?: boolean;
  /** Disable the context menu trigger */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ContextMenuTrigger - The area that triggers the context menu on right-click
 */
export const ContextMenuTrigger = React.forwardRef<HTMLSpanElement, ContextMenuTriggerProps>(
  ({ children, asChild = false, disabled = false, className = '' }, ref) => {
    const triggerClasses = ['muka-context-menu__trigger', className].filter(Boolean).join(' ');

    return (
      <ContextMenuPrimitive.Trigger
        ref={ref}
        asChild={asChild}
        disabled={disabled}
        className={triggerClasses || undefined}
      >
        {children}
      </ContextMenuPrimitive.Trigger>
    );
  }
);
ContextMenuTrigger.displayName = 'ContextMenuTrigger';

// ─── ContextMenu Content ────────────────────────────────────────────────────

export interface ContextMenuContentProps {
  /** Menu items */
  children: React.ReactNode;
  /** Distance from the pointer */
  alignOffset?: number;
  /** Additional CSS classes */
  className?: string;
  /** Whether to loop focus within the menu */
  loop?: boolean;
}

/**
 * ContextMenuContent - The dropdown container for context menu items
 */
export const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ children, alignOffset = 0, className = '', loop = true }, ref) => {
    const contentClasses = ['muka-menu__content', className].filter(Boolean).join(' ');

    return (
      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content
          ref={ref}
          alignOffset={alignOffset}
          className={contentClasses}
          loop={loop}
        >
          {children}
        </ContextMenuPrimitive.Content>
      </ContextMenuPrimitive.Portal>
    );
  }
);
ContextMenuContent.displayName = 'ContextMenuContent';

// ─── ContextMenu Item ───────────────────────────────────────────────────────

export interface ContextMenuItemProps {
  /** Item content */
  children: React.ReactNode;
  /** Called when the item is selected */
  onSelect?: () => void;
  /** Disables the item */
  disabled?: boolean;
  /** Renders as a destructive/danger action */
  destructive?: boolean;
  /** Icon to display before the label */
  icon?: React.ReactNode;
  /** Keyboard shortcut to display */
  shortcut?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ContextMenuItem - An action item within the context menu
 */
export const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  (
    {
      children,
      onSelect,
      disabled = false,
      destructive = false,
      icon,
      shortcut,
      className = '',
    },
    ref
  ) => {
    const itemClasses = [
      'muka-menu__item',
      destructive && 'muka-menu__item--destructive',
      disabled && 'muka-menu__item--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <ContextMenuPrimitive.Item
        ref={ref}
        className={itemClasses}
        onSelect={onSelect}
        disabled={disabled}
      >
        {icon && <span className="muka-menu__item-icon">{icon}</span>}
        <span className="muka-menu__item-label">{children}</span>
        {shortcut && <span className="muka-menu__item-shortcut">{shortcut}</span>}
      </ContextMenuPrimitive.Item>
    );
  }
);
ContextMenuItem.displayName = 'ContextMenuItem';

// ─── ContextMenu Separator ──────────────────────────────────────────────────

export interface ContextMenuSeparatorProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * ContextMenuSeparator - A visual divider between menu items
 */
export const ContextMenuSeparator = React.forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(
  ({ className = '' }, ref) => {
    const separatorClasses = ['muka-menu__separator', className].filter(Boolean).join(' ');

    return <ContextMenuPrimitive.Separator ref={ref} className={separatorClasses} />;
  }
);
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

// ─── ContextMenu Group ──────────────────────────────────────────────────────

export interface ContextMenuGroupProps {
  /** Group items */
  children: React.ReactNode;
  /** Group label */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ContextMenuGroup - A labeled group of context menu items
 */
export const ContextMenuGroup = React.forwardRef<HTMLDivElement, ContextMenuGroupProps>(
  ({ children, label, className = '' }, ref) => {
    const groupClasses = ['muka-menu__group', className].filter(Boolean).join(' ');

    return (
      <ContextMenuPrimitive.Group ref={ref} className={groupClasses}>
        {label && (
          <ContextMenuPrimitive.Label className="muka-menu__group-label">
            {label}
          </ContextMenuPrimitive.Label>
        )}
        {children}
      </ContextMenuPrimitive.Group>
    );
  }
);
ContextMenuGroup.displayName = 'ContextMenuGroup';

// ─── ContextMenu Checkbox Item ──────────────────────────────────────────────

export interface ContextMenuCheckboxItemProps {
  /** Item content */
  children: React.ReactNode;
  /** Controlled checked state */
  checked?: boolean;
  /** Called when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Disables the item */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ContextMenuCheckboxItem - A checkable context menu item
 */
export const ContextMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuCheckboxItemProps
>(({ children, checked, onCheckedChange, disabled = false, className = '' }, ref) => {
  const itemClasses = [
    'muka-menu__item',
    'muka-menu__item--checkbox',
    disabled && 'muka-menu__item--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      className={itemClasses}
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
    >
      <span className="muka-menu__item-indicator">
        <ContextMenuPrimitive.ItemIndicator>
          <Icon name="check" size="sm" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      <span className="muka-menu__item-label">{children}</span>
    </ContextMenuPrimitive.CheckboxItem>
  );
});
ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

// ─── ContextMenu Radio Group ────────────────────────────────────────────────

export interface ContextMenuRadioGroupProps {
  /** Radio items */
  children: React.ReactNode;
  /** Controlled selected value */
  value?: string;
  /** Called when selection changes */
  onValueChange?: (value: string) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ContextMenuRadioGroup - A group of radio context menu items
 */
export const ContextMenuRadioGroup = React.forwardRef<
  HTMLDivElement,
  ContextMenuRadioGroupProps
>(({ children, value, onValueChange, className = '' }, ref) => {
  const groupClasses = ['muka-menu__radio-group', className].filter(Boolean).join(' ');

  return (
    <ContextMenuPrimitive.RadioGroup
      ref={ref}
      className={groupClasses}
      value={value}
      onValueChange={onValueChange}
    >
      {children}
    </ContextMenuPrimitive.RadioGroup>
  );
});
ContextMenuRadioGroup.displayName = 'ContextMenuRadioGroup';

// ─── ContextMenu Radio Item ─────────────────────────────────────────────────

export interface ContextMenuRadioItemProps {
  /** Item content */
  children: React.ReactNode;
  /** The value of this radio item */
  value: string;
  /** Disables the item */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ContextMenuRadioItem - A radio option within a ContextMenuRadioGroup
 */
export const ContextMenuRadioItem = React.forwardRef<HTMLDivElement, ContextMenuRadioItemProps>(
  ({ children, value, disabled = false, className = '' }, ref) => {
    const itemClasses = [
      'muka-menu__item',
      'muka-menu__item--radio',
      disabled && 'muka-menu__item--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <ContextMenuPrimitive.RadioItem
        ref={ref}
        className={itemClasses}
        value={value}
        disabled={disabled}
      >
        <span className="muka-menu__item-indicator">
          <ContextMenuPrimitive.ItemIndicator>
            <span className="muka-menu__radio-dot" />
          </ContextMenuPrimitive.ItemIndicator>
        </span>
        <span className="muka-menu__item-label">{children}</span>
      </ContextMenuPrimitive.RadioItem>
    );
  }
);
ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';

// ─── ContextMenu Sub ────────────────────────────────────────────────────────

export interface ContextMenuSubProps {
  /** Submenu content */
  children: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Default open state */
  defaultOpen?: boolean;
}

/**
 * ContextMenuSub - A submenu container
 */
export const ContextMenuSub: React.FC<ContextMenuSubProps> = ({
  children,
  open,
  onOpenChange,
  defaultOpen,
}) => {
  return (
    <ContextMenuPrimitive.Sub open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
      {children}
    </ContextMenuPrimitive.Sub>
  );
};

// ─── ContextMenu Sub Trigger ────────────────────────────────────────────────

export interface ContextMenuSubTriggerProps {
  /** Trigger content */
  children: React.ReactNode;
  /** Icon to display before the label */
  icon?: React.ReactNode;
  /** Disables the trigger */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ContextMenuSubTrigger - Trigger that opens a submenu
 */
export const ContextMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  ContextMenuSubTriggerProps
>(({ children, icon, disabled = false, className = '' }, ref) => {
  const itemClasses = [
    'muka-menu__item',
    'muka-menu__item--sub-trigger',
    disabled && 'muka-menu__item--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ContextMenuPrimitive.SubTrigger ref={ref} className={itemClasses} disabled={disabled}>
      {icon && <span className="muka-menu__item-icon">{icon}</span>}
      <span className="muka-menu__item-label">{children}</span>
      <span className="muka-menu__item-chevron">
        <Icon name="arrow-right" variant="line" size="sm" />
      </span>
    </ContextMenuPrimitive.SubTrigger>
  );
});
ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';

// ─── ContextMenu Sub Content ────────────────────────────────────────────────

export interface ContextMenuSubContentProps {
  /** Submenu items */
  children: React.ReactNode;
  /** Distance from the trigger */
  sideOffset?: number;
  /** Distance from the alignment edge */
  alignOffset?: number;
  /** Additional CSS classes */
  className?: string;
  /** Whether to loop focus within the submenu */
  loop?: boolean;
}

/**
 * ContextMenuSubContent - The dropdown container for submenu items
 */
export const ContextMenuSubContent = React.forwardRef<
  HTMLDivElement,
  ContextMenuSubContentProps
>(({ children, sideOffset = 2, alignOffset = -4, className = '', loop = true }, ref) => {
  const contentClasses = ['muka-menu__content', 'muka-menu__content--sub', className]
    .filter(Boolean)
    .join(' ');

  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.SubContent
        ref={ref}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className={contentClasses}
        loop={loop}
      >
        {children}
      </ContextMenuPrimitive.SubContent>
    </ContextMenuPrimitive.Portal>
  );
});
ContextMenuSubContent.displayName = 'ContextMenuSubContent';

export default ContextMenu;
