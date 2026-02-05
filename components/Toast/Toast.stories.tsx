import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast } from './Toast';
import { Button } from '../Button';
import './Toast.css';

const meta: Meta<typeof Toast> = {
  title: 'Design System/Toast',
  component: Toast,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Toast

Non-blocking notification component that appears temporarily.
Used for success confirmations, error notifications, and status updates.

- 4 variants: info, success, warning, error
- Auto-dismiss with configurable duration
- Pause on hover/focus
- 6 position options
- Action slot for undo/retry buttons
- Accessible with proper ARIA live regions
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['info', 'success', 'warning', 'error'],
    },
    position: {
      control: { type: 'select' },
      options: ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'],
    },
    duration: { control: { type: 'number', min: 0, step: 1000 } },
    hideIcon: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Helper component to demonstrate toast in a relative container
const ToastDemo = ({ children }: { children: React.ReactNode }) => (
  <div style={{ 
    position: 'relative', 
    minHeight: '200px', 
    padding: '1rem',
    border: '1px dashed var(--color-border-default)',
    borderRadius: 'var(--border-radius-md)',
  }}>
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
  </div>
);

export const Playground: Story = {
  args: {
    children: 'This is a toast notification.',
    variant: 'info',
    duration: 0, // Disable auto-dismiss for playground
    open: true,
  },
  render: (args) => (
    <ToastDemo>
      <Toast {...args} position={undefined as any} />
    </ToastDemo>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Toast variant="info" duration={0} position={undefined as any}>
        This is an informational notification.
      </Toast>
      <Toast variant="success" duration={0} position={undefined as any}>
        Changes saved successfully!
      </Toast>
      <Toast variant="warning" duration={0} position={undefined as any}>
        Your session will expire soon.
      </Toast>
      <Toast variant="error" duration={0} position={undefined as any}>
        Failed to save changes.
      </Toast>
    </div>
  ),
};

export const WithTitle: Story = {
  name: 'With Title',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Toast variant="success" title="Saved" duration={0} position={undefined as any}>
        Your profile has been updated.
      </Toast>
      <Toast variant="error" title="Connection Error" duration={0} position={undefined as any}>
        Unable to reach the server. Check your internet connection.
      </Toast>
    </div>
  ),
};

export const WithAction: Story = {
  name: 'With Action',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Toast
        variant="info"
        title="Email Sent"
        duration={0}
        position={undefined as any}
        action={<Button size="sm" variant="ghost">Undo</Button>}
      >
        Message sent to john@example.com
      </Toast>
      <Toast
        variant="error"
        title="Upload Failed"
        duration={0}
        position={undefined as any}
        action={<Button size="sm" variant="ghost">Retry</Button>}
      >
        Could not upload file.pdf
      </Toast>
    </div>
  ),
};

export const Interactive: Story = {
  name: 'Interactive Demo',
  render: function InteractiveDemo() {
    const [toasts, setToasts] = useState<Array<{ id: number; variant: 'info' | 'success' | 'warning' | 'error'; message: string }>>([]);
    let nextId = 0;

    const addToast = (variant: 'info' | 'success' | 'warning' | 'error', message: string) => {
      const id = nextId++;
      setToasts(prev => [...prev, { id, variant, message }]);
    };

    const removeToast = (id: number) => {
      setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
      <div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <Button size="sm" onClick={() => addToast('info', 'New notification received')}>
            Info Toast
          </Button>
          <Button size="sm" onClick={() => addToast('success', 'Action completed successfully!')}>
            Success Toast
          </Button>
          <Button size="sm" onClick={() => addToast('warning', 'Please review your input')}>
            Warning Toast
          </Button>
          <Button size="sm" onClick={() => addToast('error', 'Something went wrong')}>
            Error Toast
          </Button>
        </div>

        <div style={{ 
          position: 'fixed', 
          bottom: 'var(--spacing-4)', 
          right: 'var(--spacing-4)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          zIndex: 9999,
        }}>
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              variant={toast.variant}
              duration={5000}
              position={undefined as any}
              onClose={() => removeToast(toast.id)}
            >
              {toast.message}
            </Toast>
          ))}
        </div>
      </div>
    );
  },
};

export const Positions: Story = {
  name: 'Positions (Fixed)',
  parameters: {
    docs: {
      description: {
        story: 'Toast positions are fixed to the viewport. In production, use a ToastProvider to manage multiple toasts.',
      },
    },
  },
  render: () => (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p style={{ marginBottom: '1rem' }}>
        Toast positions are relative to the viewport. 
        The toast below is positioned at bottom-right.
      </p>
      <Toast 
        variant="success" 
        title="Success"
        duration={0}
        position="bottom-right"
      >
        This toast is fixed to bottom-right.
      </Toast>
    </div>
  ),
};

export const AutoDismiss: Story = {
  name: 'Auto-Dismiss Behavior',
  parameters: {
    docs: {
      description: {
        story: 'Toasts auto-dismiss after the specified duration. Hover or focus to pause the timer.',
      },
    },
  },
  render: function AutoDismissDemo() {
    const [show, setShow] = useState(true);

    return (
      <div>
        <Button onClick={() => setShow(true)} disabled={show}>
          Show Toast (3s auto-dismiss)
        </Button>
        {show && (
          <div style={{ marginTop: '1rem' }}>
            <Toast
              variant="info"
              duration={3000}
              position={undefined as any}
              onClose={() => setShow(false)}
            >
              This toast will dismiss in 3 seconds. Hover to pause.
            </Toast>
          </div>
        )}
      </div>
    );
  },
};
