import React, { useEffect, useRef, useCallback } from 'react';
import { TopBar } from '../TopBar';
import { Button } from '../Button';
import './Dialog.css';

export interface DialogProps {
  /** Whether the dialog is open */
  open: boolean;

  /** Called when the dialog should close (backdrop click on non-modal, or close button) */
  onClose?: () => void;

  /** Dialog content (body area) */
  children: React.ReactNode;

  /** Size — sm: centered card, lg: full-height on mobile */
  size?: 'sm' | 'lg';

  /** Modal behavior — if true, backdrop click does NOT dismiss (default: true) */
  modal?: boolean;

  /** Title shown in the TopBar */
  title?: string;

  /** Leading slot in the TopBar (e.g. back/close button) */
  leading?: React.ReactNode;

  /** Trailing slot in the TopBar (e.g. action buttons) */
  trailing?: React.ReactNode;

  /** Footer content (e.g. BottomBar with action buttons) */
  footer?: React.ReactNode;

  /** Mobile-only: leading action text (e.g., "Cancel") */
  mobileLeadingLabel?: string;

  /** Mobile-only: trailing action text (e.g., "Done") */
  mobileTrailingLabel?: string;

  /** Callback for mobile leading action */
  onMobileLeadingClick?: () => void;

  /** Callback for mobile trailing action (defaults to onClose) */
  onMobileTrailingClick?: () => void;

  /** Accessible label */
  'aria-label'?: string;

  /** ID of element describing the dialog */
  'aria-describedby'?: string;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Dialog Component
 *
 * A modal or non-modal overlay that presents content in a card (sm)
 * or full-height panel (lg).
 *
 * **Size variants:**
 * - `sm`: Centered card with max-width, rounded corners, and shadow.
 * - `lg`: Full-height on mobile, centered card on desktop.
 *
 * **Modality:**
 * - `modal={true}` (default): Backdrop does not dismiss. Uses native `<dialog>` modal.
 * - `modal={false}`: Tapping the backdrop dismisses the dialog.
 *
 * @accessibility WCAG 2.1 AA compliant
 * - Uses native `<dialog>` element for focus management and inert behavior
 * - Escape key closes the dialog
 * - Focus trap for modal dialogs
 * - `aria-label` and `aria-describedby` for screen readers
 */
export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  children,
  size = 'sm',
  modal = true,
  title,
  leading,
  trailing,
  footer,
  mobileLeadingLabel,
  mobileTrailingLabel,
  onMobileLeadingClick,
  onMobileTrailingClick,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  className = '',
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Show/hide the native <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (modal && !dialog.open) {
        dialog.showModal();
      } else if (!modal && !dialog.open) {
        dialog.show();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [open, modal]);

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

  // Handle backdrop click for non-modal
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (!modal && e.target === dialogRef.current) {
        onClose?.();
      }
    },
    [modal, onClose]
  );

  const dialogClasses = [
    'muka-dialog',
    `muka-dialog--${size}`,
    !modal && 'muka-dialog--non-modal',
    className,
  ].filter(Boolean).join(' ');

  return (
    <dialog
      ref={dialogRef}
      className={dialogClasses}
      onClick={handleBackdropClick}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
    >
      <div className="muka-dialog__surface">
        <TopBar
          title={title}
          leading={
            <>
              {/* Desktop: original leading (if any) */}
              {leading && <span className="muka-dialog__desktop-only">{leading}</span>}

              {/* Mobile: Cancel/leading button */}
              {mobileLeadingLabel && (
                <span className="muka-dialog__mobile-only">
                  <Button variant="tertiary" size="sm" onClick={onMobileLeadingClick}>
                    {mobileLeadingLabel}
                  </Button>
                </span>
              )}
            </>
          }
          trailing={
            <>
              {/* Desktop: original trailing (close button) */}
              {trailing && <span className="muka-dialog__desktop-only">{trailing}</span>}

              {/* Mobile: Done/trailing button */}
              {mobileTrailingLabel && (
                <span className="muka-dialog__mobile-only">
                  <Button variant="primary" size="sm" onClick={onMobileTrailingClick || onClose}>
                    {mobileTrailingLabel}
                  </Button>
                </span>
              )}
            </>
          }
        />

        <div className="muka-dialog__body">
          {children}
        </div>

        {footer && (
          <>
            {size === 'sm' && <div className="muka-dialog__divider" role="separator" />}
            <div className="muka-dialog__footer">
              {footer}
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};

export default Dialog;
