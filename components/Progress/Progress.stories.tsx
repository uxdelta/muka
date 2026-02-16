import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';
import './Progress.css';

const meta: Meta<typeof Progress> = {
  title: 'Components/Information/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Progress Component

Visual indicator of progress or completion status.

## Variants
- **bar**: Horizontal progress bar (default)
- **circle**: Circular progress indicator

## Sizes
- sm, md, lg

## Modes
- **Determinate**: Shows specific progress (0-100%)
- **Indeterminate**: Animated, for unknown duration

## Usage

Use Progress to show completion status of tasks, uploads, or any measurable process.
For multi-step forms, consider using FormProgressBar instead.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['bar', 'circle'],
      description: 'Visual style',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value',
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Show indeterminate animation',
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'Show percentage label',
    },
  },
  args: {
    variant: 'bar',
    size: 'md',
    value: 60,
    indeterminate: false,
    showLabel: false,
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Playground: Story = {};

export const BarVariant: Story = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Progress variant="bar" value={25} />
      <Progress variant="bar" value={50} />
      <Progress variant="bar" value={75} />
      <Progress variant="bar" value={100} />
    </div>
  ),
};

export const BarWithLabel: Story = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Progress variant="bar" value={33} showLabel />
      <Progress variant="bar" value={66} showLabel />
      <Progress variant="bar" value={100} showLabel />
    </div>
  ),
};

export const BarSizes: Story = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Progress variant="bar" size="sm" value={60} />
      <Progress variant="bar" size="md" value={60} />
      <Progress variant="bar" size="lg" value={60} />
    </div>
  ),
};

export const BarIndeterminate: Story = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Progress variant="bar" size="sm" indeterminate />
      <Progress variant="bar" size="md" indeterminate />
      <Progress variant="bar" size="lg" indeterminate />
    </div>
  ),
};

export const CircleVariant: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <Progress variant="circle" value={25} />
      <Progress variant="circle" value={50} />
      <Progress variant="circle" value={75} />
      <Progress variant="circle" value={100} />
    </div>
  ),
};

export const CircleWithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <Progress variant="circle" value={25} showLabel />
      <Progress variant="circle" value={50} showLabel />
      <Progress variant="circle" value={75} showLabel />
      <Progress variant="circle" value={100} showLabel />
    </div>
  ),
};

export const CircleSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <Progress variant="circle" size="sm" value={60} showLabel />
      <Progress variant="circle" size="md" value={60} showLabel />
      <Progress variant="circle" size="lg" value={60} showLabel />
    </div>
  ),
};

export const CircleIndeterminate: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <Progress variant="circle" size="sm" indeterminate />
      <Progress variant="circle" size="md" indeterminate />
      <Progress variant="circle" size="lg" indeterminate />
    </div>
  ),
};

export const BusinessPrivateRatio: Story = {
  name: 'Composition: Business/Private Ratio',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>Zakelijke kilometers</span>
          <span>78%</span>
        </div>
        <Progress variant="bar" value={78} aria-label="Zakelijke kilometers" />
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>Priv&eacute; kilometers</span>
          <span>22%</span>
        </div>
        <Progress variant="bar" value={22} aria-label="Priv&eacute; kilometers" />
      </div>
    </div>
  ),
};

export const UploadProgress: Story = {
  name: 'Composition: Upload Progress',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Progress variant="circle" size="lg" value={67} showLabel />
      <div>
        <div style={{ fontWeight: 600 }}>Uploading...</div>
        <div style={{ color: 'var(--color-text-subtle-default)' }}>document.pdf</div>
      </div>
    </div>
  ),
};
