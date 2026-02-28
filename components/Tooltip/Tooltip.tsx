import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import './Tooltip.css';

export interface TooltipProps {
  /** Tooltip content */
  content: React.ReactNode;

  /** Trigger element */
  children: React.ReactNode;

  /** Side to position the tooltip */
  side?: 'top' | 'right' | 'bottom' | 'left';

  /** Alignment relative to the trigger */
  align?: 'start' | 'center' | 'end';

  /** Distance from the trigger */
  sideOffset?: number;

  /** Delay in milliseconds before showing */
  delayDuration?: number;

  /** Duration to skip delay for subsequent tooltips */
  skipDelayDuration?: number;

  /** Controlled open state */
  open?: boolean;

  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;

  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;

  /** Visual variant */
  variant?: 'default' | 'contrast';

  /** Maximum width of tooltip content */
  maxWidth?: number | string;

  /** Additional CSS classes */
  className?: string;

  /** Whether to disable the tooltip */
  disabled?: boolean;

  /** Merge trigger props onto child element instead of wrapping */
  asChild?: boolean;
}

/**
 * Tooltip Component
 *
 * Displays contextual help text when hovering or focusing on an element.
 * Built on Radix UI Tooltip primitives for accessibility.
 *
 * Features:
 * - Configurable positioning (4 sides, 3 alignments)
 * - Customizable show/hide delays
 * - Rich content support
 * - Controlled and uncontrolled modes
 * - Two visual variants (default: inverse colors, contrast: bordered)
 * - Arrow pointing to trigger
 *
 * @accessibility WCAG 2.1 AA compliant
 * - Content linked via aria-describedby
 * - Keyboard accessible (shows on focus)
 * - Escape key closes tooltip
 * - role="tooltip" on content
 * - Touch-friendly (shows on long press)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Tooltip content="Save changes">
 *   <Button iconOnly><Icon name="save" /></Button>
 * </Tooltip>
 *
 * // With positioning
 * <Tooltip content="Edit document" side="right" align="start">
 *   <Button variant="ghost">Edit</Button>
 * </Tooltip>
 *
 * // Rich content
 * <Tooltip
 *   content={
 *     <>
 *       <Text variant="body-sm" weight="bold">Keyboard shortcut</Text>
 *       <Text variant="body-sm">Press Ctrl+S to save</Text>
 *     </>
 *   }
 *   maxWidth={200}
 * >
 *   <Icon name="keyboard" />
 * </Tooltip>
 * ```
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
  sideOffset = 8,
  delayDuration = 200,
  skipDelayDuration = 300,
  open,
  onOpenChange,
  defaultOpen,
  variant = 'default',
  maxWidth,
  className = '',
  disabled = false,
  asChild = true,
}) => {
  if (disabled) {
    return <>{children}</>;
  }

  const contentClasses = [
    'muka-tooltip__content',
    `muka-tooltip__content--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const contentStyle = maxWidth
    ? { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }
    : undefined;

  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    >
      <TooltipPrimitive.Root
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
      >
        <TooltipPrimitive.Trigger asChild={asChild}>
          {children}
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={contentClasses}
            side={side}
            align={align}
            sideOffset={sideOffset}
            style={contentStyle}
          >
            {content}
            <TooltipPrimitive.Arrow className="muka-tooltip__arrow" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
