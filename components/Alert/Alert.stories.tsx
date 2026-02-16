import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { Button } from '../Button';
import './Alert.css';

const meta: Meta<typeof Alert> = {
  title: 'Design System/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RL5IFLUJk4yeAFNXlsX4b5/Muka-UI-Figma-Library?node-id=463-4962&m=dev',
    },
    docs: {
      description: {
        component: `
# Alert (Inline)

Inline alert component for displaying contextual feedback messages.
Used for form validation, status messages, and important notices.

- 4 variants: info, success, warning, error
- 3 sizes: sm, md, lg
- Optional title for additional context
- Dismissible with close button
- Action slot for buttons/links
- Accessible with proper ARIA attributes
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['info', 'success', 'warning', 'error'],
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    dismissible: { control: 'boolean' },
    hideIcon: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {
  args: {
    children: 'This is an informational alert message.',
    variant: 'info',
    size: 'md',
    dismissible: false,
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info" title="Message title" dismissible onDismiss={() => {}}>
        Message content
      </Alert>
      <Alert variant="error" title="Message title" dismissible onDismiss={() => {}}>
        Message content
      </Alert>
      <Alert variant="success" title="Message title" dismissible onDismiss={() => {}}>
        Message content
      </Alert>
      <Alert variant="warning" title="Message title" dismissible onDismiss={() => {}}>
        Message content
      </Alert>
    </div>
  ),
};

export const WithTitle: Story = {
  name: 'With Title',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info" title="Information">
        This is an informational alert with a title for additional context.
      </Alert>
      <Alert variant="success" title="Success">
        Your changes have been saved successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Your session will expire in 5 minutes.
      </Alert>
      <Alert variant="error" title="Error">
        Failed to save changes. Please check your connection and try again.
      </Alert>
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info" size="sm">
        Small alert for compact spaces.
      </Alert>
      <Alert variant="info" size="md">
        Medium alert is the default size.
      </Alert>
      <Alert variant="info" size="lg">
        Large alert for prominent messages.
      </Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  name: 'Dismissible',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert
        variant="info"
        title="Dismissible Alert"
        dismissible
        onDismiss={() => console.log('Alert dismissed')}
      >
        Click the X button to dismiss this alert.
      </Alert>
      <Alert
        variant="success"
        dismissible
        onDismiss={() => console.log('Success dismissed')}
      >
        You can dismiss this success message.
      </Alert>
    </div>
  ),
};

export const WithAction: Story = {
  name: 'With Action',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert
        variant="info"
        title="Update Available"
        action={<Button size="sm" variant="secondary">Update</Button>}
      >
        A new version is available. Update now to get the latest features.
      </Alert>
      <Alert
        variant="error"
        title="Connection Lost"
        action={<Button size="sm" variant="secondary">Retry</Button>}
        dismissible
      >
        We couldn't connect to the server.
      </Alert>
    </div>
  ),
};

export const WithoutIcon: Story = {
  name: 'Without Icon',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info" hideIcon>
        Alert without an icon for a cleaner look.
      </Alert>
      <Alert variant="success" hideIcon title="Success">
        Icon hidden but title shown for context.
      </Alert>
    </div>
  ),
};

export const FormValidation: Story = {
  name: 'Composition: Form Validation',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <Alert variant="error" size="sm">
        Please correct the following errors before submitting.
      </Alert>
      <Alert variant="success" size="sm">
        All fields are valid. Ready to submit.
      </Alert>
    </div>
  ),
};

export const ErrorBoundary: Story = {
  name: 'Composition: Error Boundary',
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <Alert
        variant="error"
        title="Something went wrong"
        action={<Button size="sm" variant="primary">Try Again</Button>}
      >
        We encountered an unexpected error. Our team has been notified. 
        You can try refreshing the page or contact support if the problem persists.
      </Alert>
    </div>
  ),
};
