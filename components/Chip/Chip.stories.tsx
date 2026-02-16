import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';
import './Chip.css';

import { Icon } from '../Icon';

const meta: Meta<typeof Chip> = {
  title: 'Design System/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RL5IFLUJk4yeAFNXlsX4b5/Muka-UI-Figma-Library?node-id=464-5304',
    },
    docs: {
      description: {
        component: `
# Chip Component

Pill-shaped labels with optional icon and dismiss. Use for tags, filters, and removable selections.
- Variants: default, success, warning, error, info
- Appearance: solid (filled) or outline (light background)
- Sizes: sm, md, lg
- Optional leading icon and \`onRemove\` for dismissible chips
        `,
      },
    },
  },
  argTypes: {
    variant: { control: { type: 'radio' }, options: ['default', 'success', 'warning', 'error', 'info'] },
    appearance: { control: { type: 'radio' }, options: ['solid', 'outline'] },
    size: { control: { type: 'radio' }, options: ['sm', 'md', 'lg'] },
  },
  args: {
    children: 'Label',
    variant: 'default',
    appearance: 'solid',
    size: 'sm',
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Chip variant="default">Default</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="error">Error</Chip>
      <Chip variant="info">Info</Chip>
    </div>
  ),
};

export const SolidAndOutline: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Chip appearance="solid" variant="default">Solid default</Chip>
        <Chip appearance="solid" variant="success">Solid success</Chip>
        <Chip appearance="solid" variant="error">Solid error</Chip>
        <Chip appearance="solid" variant="info">Solid info</Chip>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Chip appearance="outline" variant="default">Outline default</Chip>
        <Chip appearance="outline" variant="success">Outline success</Chip>
        <Chip appearance="outline" variant="error">Outline error</Chip>
        <Chip appearance="outline" variant="info">Outline info</Chip>
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Chip icon={<Icon name="file-text" variant="line" size="sm" />} variant="default">Label</Chip>
      <Chip icon={<Icon name="file-text" variant="line" size="sm" />} variant="success">Label</Chip>
      <Chip icon={<Icon name="file-text" variant="line" size="sm" />} variant="info">Label</Chip>
    </div>
  ),
};

export const Dismissible: Story = {
  render: function DismissibleStory() {
    const [chips, setChips] = React.useState(['Tag one', 'Tag two', 'Tag three']);
    const remove = (i: number) => setChips((prev) => prev.filter((_, j) => j !== i));
    return (
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {chips.map((label, i) => (
          <Chip key={label} variant="default" onRemove={() => remove(i)}>
            {label}
          </Chip>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Chip size="sm" variant="success">Small</Chip>
      <Chip size="md" variant="success">Medium</Chip>
      <Chip size="lg" variant="success">Large</Chip>
    </div>
  ),
};

export const LicensePlateTypes: Story = {
  name: 'Composition: License Plate Types',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Chip variant="default">Grijs kenteken</Chip>
      <Chip variant="success">0% bijtelling</Chip>
      <Chip variant="info">Elektrisch</Chip>
      <Chip variant="warning">Youngtimer</Chip>
      <Chip variant="error">Vervuiler</Chip>
    </div>
  ),
};
