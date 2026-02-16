import type { Meta, StoryObj } from '@storybook/react';
import { SegmentGroup } from './SegmentGroup';
import { useState } from 'react';

const meta: Meta<typeof SegmentGroup> = {
  title: 'Components/SegmentGroup',
  component: SegmentGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A segmented control for selecting one option from a set of mutually exclusive options. Provides a compact, visual alternative to radio buttons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the segment group should take full width',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state for entire group',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentGroup>;

const defaultOptions = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    defaultValue: 'day',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    options: defaultOptions,
    defaultValue: 'week',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    options: defaultOptions,
    defaultValue: 'month',
    size: 'lg',
  },
};

export const FullWidth: Story = {
  args: {
    options: defaultOptions,
    defaultValue: 'day',
    size: 'md',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const TwoOptions: Story = {
  args: {
    options: [
      { value: 'list', label: 'List' },
      { value: 'grid', label: 'Grid' },
    ],
    defaultValue: 'list',
    size: 'md',
  },
};

export const FourOptions: Story = {
  args: {
    options: [
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'draft', label: 'Draft' },
      { value: 'archived', label: 'Archived' },
    ],
    defaultValue: 'all',
    size: 'md',
  },
};

export const WithLongLabels: Story = {
  args: {
    options: [
      { value: 'option1', label: 'First Option' },
      { value: 'option2', label: 'Second Option' },
      { value: 'option3', label: 'Third Option' },
    ],
    defaultValue: 'option1',
    size: 'md',
  },
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    defaultValue: 'day',
    size: 'md',
    disabled: true,
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week', disabled: true },
      { value: 'month', label: 'Month' },
    ],
    defaultValue: 'day',
    size: 'md',
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('day');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <SegmentGroup {...args} value={value} onChange={setValue} />
        <p style={{ fontSize: '14px', color: 'var(--color-text-subtle-default)' }}>
          Selected: <strong>{value}</strong>
        </p>
      </div>
    );
  },
  args: {
    options: defaultOptions,
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Small</h3>
        <SegmentGroup options={defaultOptions} defaultValue="day" size="sm" />
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Medium</h3>
        <SegmentGroup options={defaultOptions} defaultValue="week" size="md" />
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Large</h3>
        <SegmentGroup options={defaultOptions} defaultValue="month" size="lg" />
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    options: defaultOptions,
    defaultValue: 'day',
    size: 'md',
    fullWidth: false,
    disabled: false,
  },
};
