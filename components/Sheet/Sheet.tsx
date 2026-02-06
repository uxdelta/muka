import React, { useEffect, useRef, useCallback } from 'react';
import { TopBar } from '../TopBar';
import './Sheet.css';

export interface SheetProps {
  /** Whether the sheet is open */
  open: boolean;

  /** Called when the sheet should close */
  onClose?: () => void;

  /** Sheet content */
  children: React.ReactNode;

  /** Snap point — determines the sheet height */
  snapPoint?: 'content' | 'half' | 'full';

  /** Title shown in the TopBar */
  title?: string;

  /** Trailing slot in the TopBar (e.g. close button) */
  trailing?: React.ReactNode;

  /** Footer content (e.g. BottomBar with action buttons) */
  footer?: React.ReactNode;

  /** Accessible label */
  'aria-label'?: string;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Sheet Component
 *
 * A bottom-anchored overlay panel that slides up from the bottom of the viewport.
 * Always includes a drag handle and uses the draggable TopBar variant.
 *
 * **Snap points:**
 * - `content`: Sheet height fits its content (hugged).
 * - `half`: Sheet takes up approximately 50% of viewport height.
 * - `full`: Sheet takes up nearly the full viewport height.
 *
 * The sheet is always non-modal: tapping the backdrop dismisses it.
 *
 * @accessibility WCAG 2.1 AA compliant
 * - Uses native `<dialog>` for show/close behavior
 * - Escape key closes the sheet
 * - `aria-label` for screen readers
 */
export const Sheet: React.FC<SheetProps> = ({
  open,
  onClose,
  children,
  snapPoint = 'content',
  title,
  trailing,
  footer,
  'aria-label': ariaLabel,
  className = '',
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Show/hide the native <dialog> (non-modal only)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [open]);

  // Handle escape key
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose?.();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  // Handle backdrop click — sheet is always dismissible
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) {
        onClose?.();
      }
    },
    [onClose]
  );

  const sheetClasses = [
    'muka-sheet',
    `muka-sheet--${snapPoint}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <dialog
      ref={dialogRef}
      className={sheetClasses}
      onClick={handleBackdropClick}
      aria-label={ariaLabel}
    >
      <div className="muka-sheet__surface">
        <TopBar
          title={title}
          trailing={trailing}
          variant="draggable"
          bordered
        />

        <div className="muka-sheet__body">
          {children}
        </div>

        {footer && (
          <div className="muka-sheet__footer">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
};

export default Sheet;
