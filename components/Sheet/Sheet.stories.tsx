import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sheet } from './Sheet';
import { BottomBar } from '../BottomBar';
import { Button } from '../Button';
import { Icon } from '../Icon';
import './Sheet.css';

const meta: Meta<typeof Sheet> = {
  title: 'Components/Layout/Sheet',
  component: Sheet,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Sheet Component

A bottom-anchored overlay panel that slides up from the bottom of the viewport.
Always includes a drag handle (draggable TopBar variant).

## Snap Points
- **content**: Sheet height fits its content (hugged).
- **half**: Sheet takes up ~50% of viewport height.
- **full**: Sheet takes up nearly full viewport height.

## Behavior
Sheets are always dismissible: tapping the backdrop or pressing Escape closes them.
On desktop (lg breakpoint), the sheet transforms into a centered card.

## Token Architecture
- \`sheet.color.{backdrop|background|body-background}\`
- \`sheet.border.radius\`
- \`sheet.shadow.default\`
- \`sheet.padding.x\`
- \`sheet.drag-handle.{width|height|color|padding-y|radius}\`
        `,
      },
    },
  },
  argTypes: {
    snapPoint: {
      control: { type: 'radio' },
      options: ['content', 'half', 'full'],
    },
    open: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sheet>;

/* ─── Helpers ─────────────────────────────────────────── */

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <Button variant="ghost" size="sm" iconOnly aria-label="Close" onClick={onClick}>
    <Icon name="x" size="md" />
  </Button>
);

const SheetDemo: React.FC<{
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
      <SheetDemo label="Open Sheet">
        {({ open, onClose }) => (
          <Sheet
            open={open}
            onClose={onClose}
            title="Sheet Title"
            snapPoint="content"
            trailing={<CloseButton onClick={onClose} />}
            footer={
              <BottomBar variant="actions">
                <Button variant="secondary" size="lg" onClick={onClose}>Cancel</Button>
                <Button variant="primary" size="lg" onClick={onClose}>Apply</Button>
              </BottomBar>
            }
          >
            <p style={{ margin: 0 }}>This is a bottom sheet with content-fitting height.</p>
          </Sheet>
        )}
      </SheetDemo>
    </div>
  ),
};

/* ─── Content Snap ────────────────────────────────────── */

export const ContentSnap: Story = {
  name: 'Snap: Content (Hugged)',
  render: () => (
    <div style={{ padding: '2rem' }}>
      <SheetDemo label="Open Content Sheet">
        {({ open, onClose }) => (
          <Sheet
            open={open}
            onClose={onClose}
            title="Quick Actions"
            snapPoint="content"
            trailing={<CloseButton onClick={onClose} />}
            footer={
              <BottomBar variant="actions">
                <Button variant="secondary" size="lg" onClick={onClose}>Cancel</Button>
                <Button variant="primary" size="lg" onClick={onClose}>Done</Button>
              </BottomBar>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ margin: 0 }}>Select an option below:</p>
              <Button variant="tertiary" fullWidth>Option A</Button>
              <Button variant="tertiary" fullWidth>Option B</Button>
              <Button variant="tertiary" fullWidth>Option C</Button>
            </div>
          </Sheet>
        )}
      </SheetDemo>
    </div>
  ),
};

/* ─── Half Snap ───────────────────────────────────────── */

export const HalfSnap: Story = {
  name: 'Snap: Half',
  render: () => (
    <div style={{ padding: '2rem' }}>
      <SheetDemo label="Open Half Sheet">
        {({ open, onClose }) => (
          <Sheet
            open={open}
            onClose={onClose}
            title="Details"
            snapPoint="half"
            trailing={<CloseButton onClick={onClose} />}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ margin: 0 }}>This sheet takes up half the viewport.</p>
              <p style={{ margin: 0, opacity: 0.6 }}>Useful for showing additional details, lists, or supplementary content that doesn't need the full screen.</p>
              <div style={{ height: '200px', background: 'var(--color-surface-level1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.4 }}>
                Scrollable content area
              </div>
            </div>
          </Sheet>
        )}
      </SheetDemo>
    </div>
  ),
};

/* ─── Full Snap ───────────────────────────────────────── */

export const FullSnap: Story = {
  name: 'Snap: Full',
  render: () => (
    <div style={{ padding: '2rem' }}>
      <SheetDemo label="Open Full Sheet">
        {({ open, onClose }) => (
          <Sheet
            open={open}
            onClose={onClose}
            title="Full View"
            snapPoint="full"
            trailing={<CloseButton onClick={onClose} />}
            footer={
              <BottomBar variant="actions">
                <Button variant="secondary" size="lg" onClick={onClose}>Discard</Button>
                <Button variant="primary" size="lg" onClick={onClose}>Save</Button>
              </BottomBar>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ margin: 0 }}>This sheet takes up nearly the full viewport height.</p>
              <p style={{ margin: 0, opacity: 0.6 }}>Ideal for complex forms, multi-step workflows, or content that benefits from maximum screen space.</p>
              <div style={{ height: '400px', background: 'var(--color-surface-level1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.4 }}>
                Large content area
              </div>
            </div>
          </Sheet>
        )}
      </SheetDemo>
    </div>
  ),
};

/* ─── All Snap Points ─────────────────────────────────── */

export const AllSnapPoints: Story = {
  render: () => (
    <div style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <SheetDemo label="Content">
        {({ open, onClose }) => (
          <Sheet
            open={open}
            onClose={onClose}
            title="Content Sheet"
            snapPoint="content"
            trailing={<CloseButton onClick={onClose} />}
          >
            <p style={{ margin: 0 }}>Hugged to content height.</p>
          </Sheet>
        )}
      </SheetDemo>

      <SheetDemo label="Half">
        {({ open, onClose }) => (
          <Sheet
            open={open}
            onClose={onClose}
            title="Half Sheet"
            snapPoint="half"
            trailing={<CloseButton onClick={onClose} />}
          >
            <p style={{ margin: 0 }}>50% viewport height.</p>
          </Sheet>
        )}
      </SheetDemo>

      <SheetDemo label="Full">
        {({ open, onClose }) => (
          <Sheet
            open={open}
            onClose={onClose}
            title="Full Sheet"
            snapPoint="full"
            trailing={<CloseButton onClick={onClose} />}
          >
            <p style={{ margin: 0 }}>Nearly full viewport.</p>
          </Sheet>
        )}
      </SheetDemo>
    </div>
  ),
};
