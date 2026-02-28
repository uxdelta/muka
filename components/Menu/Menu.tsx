import React, { createContext, useContext } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Icon } from '../Icon';
import './Menu.css';

// ─── Context for shared props ───────────────────────────────────────────────

interface MenuContextValue {
  onOpenChange?: (open: boolean) => void;
}

const MenuContext = createContext<MenuContextValue>({});

// ─── Menu Root ──────────────────────────────────────────────────────────────

export interface MenuProps {
  /** Menu content */
  children: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Called when the open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Default open state for uncontrolled usage */
  defaultOpen?: boolean;
  /** Modal behavior - if true, interactions outside will close the menu */
  modal?: boolean;
}

/**
 * Menu Component
 *
 * A dropdown menu for displaying actions and options.
 * Built on Radix UI DropdownMenu for accessibility and keyboard navigation.
 *
 * @example
 * ```tsx
 * <Menu>
 *   <MenuTrigger asChild>
 *     <Button>Open Menu</Button>
 *   </MenuTrigger>
 *   <MenuContent>
 *     <MenuItem onSelect={() => console.log('Edit')}>Edit</MenuItem>
 *     <MenuItem onSelect={() => console.log('Delete')} destructive>Delete</MenuItem>
 *   </MenuContent>
 * </Menu>
 * ```
 */
export const Menu: React.FC<MenuProps> = ({
  children,
  open,
  onOpenChange,
  defaultOpen,
  modal = true,
}) => {
  return (
    <MenuContext.Provider value={{ onOpenChange }}>
      <DropdownMenuPrimitive.Root
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
        modal={modal}
      >
        {children}
      </DropdownMenuPrimitive.Root>
    </MenuContext.Provider>
  );
};

// ─── Menu Trigger ───────────────────────────────────────────────────────────

export interface MenuTriggerProps {
  /** Trigger element */
  children: React.ReactNode;
  /** Merge trigger props onto child element instead of wrapping */
  asChild?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * MenuTrigger - Button that opens the menu
 */
export const MenuTrigger = React.forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ children, asChild = false, className = '' }, ref) => {
    return (
      <DropdownMenuPrimitive.Trigger
        ref={ref}
        asChild={asChild}
        className={className || undefined}
      >
        {children}
      </DropdownMenuPrimitive.Trigger>
    );
  }
);
MenuTrigger.displayName = 'MenuTrigger';

// ─── Menu Content ───────────────────────────────────────────────────────────

export interface MenuContentProps {
  /** Menu items */
  children: React.ReactNode;
  /** Horizontal alignment relative to trigger */
  align?: 'start' | 'center' | 'end';
  /** Side of the trigger to render on */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Distance from the trigger */
  sideOffset?: number;
  /** Distance from the alignment edge */
  alignOffset?: number;
  /** Additional CSS classes */
  className?: string;
  /** Whether to loop focus within the menu */
  loop?: boolean;
}

/**
 * MenuContent - The dropdown container for menu items
 */
export const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(
  (
    {
      children,
      align = 'start',
      side = 'bottom',
      sideOffset = 4,
      alignOffset = 0,
      className = '',
      loop = true,
    },
    ref
  ) => {
    const contentClasses = ['muka-menu__content', className].filter(Boolean).join(' ');

    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          ref={ref}
          align={align}
          side={side}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          className={contentClasses}
          loop={loop}
        >
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    );
  }
);
MenuContent.displayName = 'MenuContent';

// ─── Menu Item ──────────────────────────────────────────────────────────────

export interface MenuItemProps {
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
 * MenuItem - An action item within the menu
 */
export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
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
      <DropdownMenuPrimitive.Item
        ref={ref}
        className={itemClasses}
        onSelect={onSelect}
        disabled={disabled}
      >
        {icon && <span className="muka-menu__item-icon">{icon}</span>}
        <span className="muka-menu__item-label">{children}</span>
        {shortcut && <span className="muka-menu__item-shortcut">{shortcut}</span>}
      </DropdownMenuPrimitive.Item>
    );
  }
);
MenuItem.displayName = 'MenuItem';

// ─── Menu Separator ─────────────────────────────────────────────────────────

export interface MenuSeparatorProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * MenuSeparator - A visual divider between menu items
 */
export const MenuSeparator = React.forwardRef<HTMLDivElement, MenuSeparatorProps>(
  ({ className = '' }, ref) => {
    const separatorClasses = ['muka-menu__separator', className].filter(Boolean).join(' ');

    return <DropdownMenuPrimitive.Separator ref={ref} className={separatorClasses} />;
  }
);
MenuSeparator.displayName = 'MenuSeparator';

// ─── Menu Group ─────────────────────────────────────────────────────────────

export interface MenuGroupProps {
  /** Group items */
  children: React.ReactNode;
  /** Group label */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * MenuGroup - A labeled group of menu items
 */
export const MenuGroup = React.forwardRef<HTMLDivElement, MenuGroupProps>(
  ({ children, label, className = '' }, ref) => {
    const groupClasses = ['muka-menu__group', className].filter(Boolean).join(' ');

    return (
      <DropdownMenuPrimitive.Group ref={ref} className={groupClasses}>
        {label && (
          <DropdownMenuPrimitive.Label className="muka-menu__group-label">
            {label}
          </DropdownMenuPrimitive.Label>
        )}
        {children}
      </DropdownMenuPrimitive.Group>
    );
  }
);
MenuGroup.displayName = 'MenuGroup';

// ─── Menu Checkbox Item ─────────────────────────────────────────────────────

export interface MenuCheckboxItemProps {
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
 * MenuCheckboxItem - A checkable menu item
 */
export const MenuCheckboxItem = React.forwardRef<HTMLDivElement, MenuCheckboxItemProps>(
  ({ children, checked, onCheckedChange, disabled = false, className = '' }, ref) => {
    const itemClasses = [
      'muka-menu__item',
      'muka-menu__item--checkbox',
      disabled && 'muka-menu__item--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <DropdownMenuPrimitive.CheckboxItem
        ref={ref}
        className={itemClasses}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      >
        <span className="muka-menu__item-indicator">
          <DropdownMenuPrimitive.ItemIndicator>
            <Icon name="check" size="sm" />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
        <span className="muka-menu__item-label">{children}</span>
      </DropdownMenuPrimitive.CheckboxItem>
    );
  }
);
MenuCheckboxItem.displayName = 'MenuCheckboxItem';

// ─── Menu Radio Group ───────────────────────────────────────────────────────

export interface MenuRadioGroupProps {
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
 * MenuRadioGroup - A group of radio menu items
 */
export const MenuRadioGroup = React.forwardRef<HTMLDivElement, MenuRadioGroupProps>(
  ({ children, value, onValueChange, className = '' }, ref) => {
    const groupClasses = ['muka-menu__radio-group', className].filter(Boolean).join(' ');

    return (
      <DropdownMenuPrimitive.RadioGroup
        ref={ref}
        className={groupClasses}
        value={value}
        onValueChange={onValueChange}
      >
        {children}
      </DropdownMenuPrimitive.RadioGroup>
    );
  }
);
MenuRadioGroup.displayName = 'MenuRadioGroup';

// ─── Menu Radio Item ────────────────────────────────────────────────────────

export interface MenuRadioItemProps {
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
 * MenuRadioItem - A radio option within a MenuRadioGroup
 */
export const MenuRadioItem = React.forwardRef<HTMLDivElement, MenuRadioItemProps>(
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
      <DropdownMenuPrimitive.RadioItem
        ref={ref}
        className={itemClasses}
        value={value}
        disabled={disabled}
      >
        <span className="muka-menu__item-indicator">
          <DropdownMenuPrimitive.ItemIndicator>
            <span className="muka-menu__radio-dot" />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
        <span className="muka-menu__item-label">{children}</span>
      </DropdownMenuPrimitive.RadioItem>
    );
  }
);
MenuRadioItem.displayName = 'MenuRadioItem';

// ─── Menu Sub (Submenu) ─────────────────────────────────────────────────────

export interface MenuSubProps {
  /** Submenu content */
  children: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Default open state for uncontrolled usage */
  defaultOpen?: boolean;
}

/**
 * MenuSub - A submenu container
 */
export const MenuSub: React.FC<MenuSubProps> = ({
  children,
  open,
  onOpenChange,
  defaultOpen,
}) => {
  return (
    <DropdownMenuPrimitive.Sub open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
      {children}
    </DropdownMenuPrimitive.Sub>
  );
};

// ─── Menu Sub Trigger ───────────────────────────────────────────────────────

export interface MenuSubTriggerProps {
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
 * MenuSubTrigger - Trigger that opens a submenu
 */
export const MenuSubTrigger = React.forwardRef<HTMLDivElement, MenuSubTriggerProps>(
  ({ children, icon, disabled = false, className = '' }, ref) => {
    const itemClasses = [
      'muka-menu__item',
      'muka-menu__item--sub-trigger',
      disabled && 'muka-menu__item--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <DropdownMenuPrimitive.SubTrigger ref={ref} className={itemClasses} disabled={disabled}>
        {icon && <span className="muka-menu__item-icon">{icon}</span>}
        <span className="muka-menu__item-label">{children}</span>
        <span className="muka-menu__item-chevron">
          <Icon name="arrow-right" variant="line" size="sm" />
        </span>
      </DropdownMenuPrimitive.SubTrigger>
    );
  }
);
MenuSubTrigger.displayName = 'MenuSubTrigger';

// ─── Menu Sub Content ───────────────────────────────────────────────────────

export interface MenuSubContentProps {
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
 * MenuSubContent - The dropdown container for submenu items
 */
export const MenuSubContent = React.forwardRef<HTMLDivElement, MenuSubContentProps>(
  ({ children, sideOffset = 2, alignOffset = -4, className = '', loop = true }, ref) => {
    const contentClasses = ['muka-menu__content', 'muka-menu__content--sub', className]
      .filter(Boolean)
      .join(' ');

    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.SubContent
          ref={ref}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          className={contentClasses}
          loop={loop}
        >
          {children}
        </DropdownMenuPrimitive.SubContent>
      </DropdownMenuPrimitive.Portal>
    );
  }
);
MenuSubContent.displayName = 'MenuSubContent';

export default Menu;
