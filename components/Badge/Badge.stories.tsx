import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import './Badge.css';

const meta: Meta<typeof Badge> = {
  title: 'Design System/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Badge / Tag Component

Used for license plate type indicators (gray/yellow/green), vehicle category labels, and status tags.
- 5 variants: default, success, warning, error, info
- 2 sizes: sm, md
- Uses state color tokens and chip sizing tokens
        `,
      },
    },
  },
  argTypes: {
    variant: { control: { type: 'radio' }, options: ['default', 'success', 'warning', 'error', 'info'] },
    size: { control: { type: 'radio' }, options: ['sm', 'md'] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
  args: { children: 'Badge', variant: 'default', size: 'sm' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Badge size="sm" variant="success">Small</Badge>
      <Badge size="md" variant="success">Medium</Badge>
    </div>
  ),
};

export const LicensePlateTypes: Story = {
  name: 'Composition: License Plate Types',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge variant="default">Grijs kenteken</Badge>
      <Badge variant="success">0% bijtelling</Badge>
      <Badge variant="info">Elektrisch</Badge>
      <Badge variant="warning">Youngtimer</Badge>
      <Badge variant="error">Vervuiler</Badge>
    </div>
  ),
};
