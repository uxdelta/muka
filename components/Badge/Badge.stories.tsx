import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import './Badge.css';

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const meta: Meta<typeof Badge> = {
  title: 'Design System/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Badge Component

Compact status indicators for labels, counts, and status information.
Unlike Chip, badges are non-interactive and non-dismissible.

- Variants: neutral, info, success, warning, error
- Sizes: sm, md, lg
- Features: optional leading icon or dot indicator

## Usage

Use badges to highlight status, counts, or categorization.
For interactive/removable tags, use Chip instead.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['neutral', 'info', 'success', 'warning', 'error'],
      description: 'Color variant',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    dot: {
      control: { type: 'boolean' },
      description: 'Show dot indicator',
    },
  },
  args: {
    children: 'Badge',
    variant: 'neutral',
    size: 'md',
    dot: false,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Badge size="sm" variant="info">Small</Badge>
      <Badge size="md" variant="info">Medium</Badge>
      <Badge size="lg" variant="info">Large</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge dot variant="neutral">Neutral</Badge>
      <Badge dot variant="info">Info</Badge>
      <Badge dot variant="success">Success</Badge>
      <Badge dot variant="warning">Warning</Badge>
      <Badge dot variant="error">Error</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge icon={<CheckIcon />} variant="success">Approved</Badge>
      <Badge icon={<InfoIcon />} variant="info">Information</Badge>
      <Badge icon={<AlertIcon />} variant="warning">Warning</Badge>
      <Badge icon={<AlertIcon />} variant="error">Error</Badge>
    </div>
  ),
};

export const VehicleStatus: Story = {
  name: 'Composition: Vehicle Status',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge variant="success">0% bijtelling</Badge>
      <Badge variant="info">Elektrisch</Badge>
      <Badge variant="warning" dot>Youngtimer</Badge>
      <Badge variant="neutral">Grijs kenteken</Badge>
      <Badge variant="error" dot>Vervuiler</Badge>
    </div>
  ),
};

export const TripTypes: Story = {
  name: 'Composition: Trip Types',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge variant="info" dot>Zakelijk</Badge>
      <Badge variant="neutral" dot>Priv&eacute;</Badge>
      <Badge variant="success" dot>Woon-werk</Badge>
    </div>
  ),
};
