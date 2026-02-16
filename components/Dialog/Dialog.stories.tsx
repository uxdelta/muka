import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { BottomBar } from '../BottomBar';
import { Button } from '../Button';
import { Icon } from '../Icon';
import './Dialog.css';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Layout/Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Dialog Component

A modal or non-modal overlay for presenting focused content.

## Sizes
- **sm**: Centered card with max-width (370px), rounded corners, and shadow.
- **lg**: Full-height on mobile, centered card (max 640px) on desktop.

## Modality
- **modal** (default): Cannot be dismissed by tapping the backdrop. Uses native \`<dialog>\` modal behavior with focus trap.
- **non-modal**: Tapping the backdrop dismisses the dialog.

## Composition
The Dialog composes TopBar internally and accepts an optional footer slot
for BottomBar with action buttons.

## Token Architecture
- \`dialog.color.{backdrop|background|body-background}\`
- \`dialog.border.radius\`
- \`dialog.shadow.default\`
- \`dialog.padding.x\`
- \`dialog.small.max-width\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'lg'],
    },
    modal: {
      control: { type: 'boolean' },
    },
    open: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

/* ─── Helper: Close icon button ───────────────────────── */

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <Button variant="ghost" size="sm" iconOnly aria-label="Close" onClick={onClick}>
    <Icon name="x" size="md" />
  </Button>
);

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <Button variant="ghost" size="sm" iconOnly aria-label="Go back" onClick={onClick}>
    <Icon name="arrow-left" size="md" />
  </Button>
);

/* ─── Helper: Interactive wrapper ─────────────────────── */

const DialogDemo: React.FC<{
  label: string;
  children: (props: { open: boolean; onClose: () => void }) => React.ReactNode;
}> = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="primary" onClick={() => setOpen(true)}>{label}</Button>
      {children({ open, onClose: () => setOpen(false) })}
    </div>
  );
};

/* ─── Playground ──────────────────────────────────────── */

export const Playground: Story = {
  render: () => (
    <div style={{ padding: '2rem' }}>
      <DialogDemo label="Open Dialog">
        {({ open, onClose }) => (
          <Dialog
            open={open}
            onClose={onClose}
            title="Dialog Title"
            size="sm"
            modal
            trailing={<CloseButton onClick={onClose} />}
            footer={
              <BottomBar variant="actions" bordered={false}>
                <Button variant="secondary" size="lg" onClick={onClose}>Cancel</Button>
                <Button variant="primary" size="lg" onClick={onClose}>Confirm</Button>
              </BottomBar>
            }
          >
            <p style={{ margin: 0 }}>This is the dialog body content. It can contain forms, text, or any other UI elements.</p>
          </Dialog>
        )}
      </DialogDemo>
    </div>
  ),
};

/* ─── Small Modal ─────────────────────────────────────── */

export const SmallModal: Story = {
  name: 'Small — Modal',
  render: () => (
    <div style={{ padding: '2rem' }}>
      <DialogDemo label="Open Small Modal">
        {({ open, onClose }) => (
          <Dialog
            open={open}
            onClose={onClose}
            title="Confirm Action"
            size="sm"
            modal
            trailing={<CloseButton onClick={onClose} />}
            footer={
              <BottomBar variant="actions" bordered={false}>
                <Button variant="secondary" size="lg" onClick={onClose}>Cancel</Button>
                <Button variant="primary" size="lg" onClick={onClose}>Delete</Button>
              </BottomBar>
            }
          >
            <p style={{ margin: 0 }}>Are you sure you want to delete this item? This action cannot be undone.</p>
          </Dialog>
        )}
      </DialogDemo>
    </div>
  ),
};

/* ─── Small Non-Modal ─────────────────────────────────── */

export const SmallNonModal: Story = {
  name: 'Small — Non-Modal',
  render: () => (
    <div style={{ padding: '2rem' }}>
      <DialogDemo label="Open Small Non-Modal">
        {({ open, onClose }) => (
          <Dialog
            open={open}
            onClose={onClose}
            title="Quick Info"
            size="sm"
            modal={false}
            trailing={<CloseButton onClick={onClose} />}
          >
            <p style={{ margin: 0 }}>This dialog can be dismissed by tapping the backdrop. No action buttons needed.</p>
          </Dialog>
        )}
      </DialogDemo>
    </div>
  ),
};

/* ─── Large Modal ─────────────────────────────────────── */

export const LargeModal: Story = {
  name: 'Large — Modal',
  render: () => (
    <div style={{ padding: '2rem' }}>
      <DialogDemo label="Open Large Modal">
        {({ open, onClose }) => (
          <Dialog
            open={open}
            onClose={onClose}
            title="Edit Profile"
            size="lg"
            modal
            leading={<BackButton onClick={onClose} />}
            trailing={<CloseButton onClick={onClose} />}
            footer={
              <BottomBar variant="actions">
                <Button variant="secondary" size="lg" onClick={onClose}>Discard</Button>
                <Button variant="primary" size="lg" onClick={onClose}>Save Changes</Button>
              </BottomBar>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ margin: 0 }}>Full-height dialog on mobile, centered card on desktop.</p>
              <p style={{ margin: 0, opacity: 0.6 }}>This is useful for forms, detailed content, or multi-step workflows where you need the full screen estate on mobile devices.</p>
              <div style={{ height: '300px', background: 'var(--color-surface-level1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.4 }}>
                Content placeholder
              </div>
            </div>
          </Dialog>
        )}
      </DialogDemo>
    </div>
  ),
};

/* ─── Large Non-Modal ─────────────────────────────────── */

export const LargeNonModal: Story = {
  name: 'Large — Non-Modal',
  render: () => (
    <div style={{ padding: '2rem' }}>
      <DialogDemo label="Open Large Non-Modal">
        {({ open, onClose }) => (
          <Dialog
            open={open}
            onClose={onClose}
            title="Preview"
            size="lg"
            modal={false}
            trailing={<CloseButton onClick={onClose} />}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ margin: 0 }}>This large dialog is non-modal — tap the backdrop to dismiss.</p>
              <div style={{ height: '200px', background: 'var(--color-surface-level1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.4 }}>
                Preview content
              </div>
            </div>
          </Dialog>
        )}
      </DialogDemo>
    </div>
  ),
};

/* ─── All Combinations ────────────────────────────────── */

export const AllCombinations: Story = {
  render: () => (
    <div style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <DialogDemo label="Small Modal">
        {({ open, onClose }) => (
          <Dialog
            open={open}
            onClose={onClose}
            title="Small Modal"
            size="sm"
            modal
            trailing={<CloseButton onClick={onClose} />}
            footer={
              <BottomBar variant="actions" bordered={false}>
                <Button variant="secondary" size="lg" onClick={onClose}>Cancel</Button>
                <Button variant="primary" size="lg" onClick={onClose}>OK</Button>
              </BottomBar>
            }
          >
            <p style={{ margin: 0 }}>Modal — cannot dismiss by tapping backdrop.</p>
          </Dialog>
        )}
      </DialogDemo>

      <DialogDemo label="Small Non-Modal">
        {({ open, onClose }) => (
          <Dialog
            open={open}
            onClose={onClose}
            title="Small Non-Modal"
            size="sm"
            modal={false}
            trailing={<CloseButton onClick={onClose} />}
          >
            <p style={{ margin: 0 }}>Non-modal — tap backdrop to dismiss.</p>
          </Dialog>
        )}
      </DialogDemo>

      <DialogDemo label="Large Modal">
        {({ open, onClose }) => (
          <Dialog
            open={open}
            onClose={onClose}
            title="Large Modal"
            size="lg"
            modal
            trailing={<CloseButton onClick={onClose} />}
            footer={
              <BottomBar variant="actions">
                <Button variant="secondary" size="lg" onClick={onClose}>Cancel</Button>
                <Button variant="primary" size="lg" onClick={onClose}>Save</Button>
              </BottomBar>
            }
          >
            <p style={{ margin: 0 }}>Full-height on mobile, centered on desktop.</p>
          </Dialog>
        )}
      </DialogDemo>

      <DialogDemo label="Large Non-Modal">
        {({ open, onClose }) => (
          <Dialog
            open={open}
            onClose={onClose}
            title="Large Non-Modal"
            size="lg"
            modal={false}
            trailing={<CloseButton onClick={onClose} />}
          >
            <p style={{ margin: 0 }}>Large non-modal — tap backdrop to dismiss.</p>
          </Dialog>
        )}
      </DialogDemo>
    </div>
  ),
};
