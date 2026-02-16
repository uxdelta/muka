import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxTile } from './CheckboxTile';
import { Chip } from '../Chip';
import './CheckboxTile.css';

import { Icon } from '../Icon';

const StackIcon = () => <Icon name="stack" variant="line" size="md" />;
const HomeIcon = () => <Icon name="home" variant="line" size="md" />;
const StarIcon = () => <Icon name="star" variant="line" size="md" />;

const meta: Meta<typeof CheckboxTile> = {
  title: 'Components/Input/CheckboxTile',
  component: CheckboxTile,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RL5IFLUJk4yeAFNXlsX4b5/Muka-UI-Figma-Library?node-id=1058-9317',
    },
    docs: {
      description: {
        component: `
# CheckboxTile Component

A tile-style checkbox with support for icons, images, and vertical layouts.
Perfect for selection cards, option grids, and visual selection interfaces.

## Variants
- **Default**: Simple checkbox with label
- **With Icon**: Checkbox with an icon and optional caption
- **With Image**: Checkbox with an image and optional caption
- **Vertical**: Stacked layout with checkbox in corner
        `,
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    caption: {
      control: 'text',
    },
  },
  args: {
    label: 'Label',
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxTile>;

// ─── Playground ─────────────────────────────────────────
export const Playground: Story = {
  args: {
    label: 'Option label',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '280px' }}>
        <Story />
      </div>
    ),
  ],
};

// ─── Default ────────────────────────────────────────────
export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <CheckboxTile label="Unselected" />
      <CheckboxTile label="Selected" checked />
    </div>
  ),
};

// ─── With Icon ──────────────────────────────────────────
export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '280px' }}>
      <CheckboxTile label="With icon" icon={<StackIcon />} />
      <CheckboxTile label="With icon selected" icon={<StackIcon />} checked />
      <CheckboxTile label="With caption" caption="Description text" icon={<StackIcon />} />
      <CheckboxTile label="With caption selected" caption="Description text" icon={<StackIcon />} checked />
    </div>
  ),
};

// ─── With Image ─────────────────────────────────────────
export const WithImage: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '280px' }}>
      <CheckboxTile 
        label="With image" 
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop" 
      />
      <CheckboxTile 
        label="With image selected" 
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop" 
        checked 
      />
      <CheckboxTile 
        label="Heading" 
        caption="Caption text" 
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop" 
      />
    </div>
  ),
};

// ─── Vertical with Icon ─────────────────────────────────
export const VerticalWithIcon: Story = {
  name: 'Vertical with Icon',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <CheckboxTile label="Option" icon={<StackIcon />} orientation="vertical" />
      <CheckboxTile label="Selected" icon={<StackIcon />} orientation="vertical" checked />
    </div>
  ),
};

// ─── Vertical with Image ────────────────────────────────
export const VerticalWithImage: Story = {
  name: 'Vertical with Image',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <CheckboxTile 
        label="Option" 
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=160&h=120&fit=crop" 
        orientation="vertical" 
      />
      <CheckboxTile 
        label="Selected" 
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=160&h=120&fit=crop" 
        orientation="vertical" 
        checked 
      />
    </div>
  ),
};

// ─── With Chip ──────────────────────────────────────────
export const WithChip: Story = {
  name: 'With Chip',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '280px' }}>
      <CheckboxTile
        label="Option with chip"
        caption="Description"
        icon={<StackIcon />}
        chip={<Chip variant="success" size="sm">0% bijtelling</Chip>}
      />
      <CheckboxTile
        label="Selected with chip"
        caption="Description"
        icon={<StackIcon />}
        chip={<Chip variant="info" size="sm">Elektrisch</Chip>}
        checked
      />
      <CheckboxTile
        label="Vertical with chip"
        icon={<StackIcon />}
        orientation="vertical"
        chip={<Chip variant="default" size="sm">Label</Chip>}
      />
    </div>
  ),
};

// ─── Checkbox Group ─────────────────────────────────────
export const CheckboxTileGroup: Story = {
  name: 'Tile Group',
  render: function CheckboxTileGroupStory() {
    const [selected, setSelected] = useState<string[]>(['home']);

    const toggleOption = (value: string) => {
      if (selected.includes(value)) {
        setSelected(selected.filter((v) => v !== value));
      } else {
        setSelected([...selected, value]);
      }
    };

    return (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <CheckboxTile
          label="Home"
          icon={<HomeIcon />}
          orientation="vertical"
          checked={selected.includes('home')}
          onChange={() => toggleOption('home')}
        />
        <CheckboxTile
          label="Stack"
          icon={<StackIcon />}
          orientation="vertical"
          checked={selected.includes('stack')}
          onChange={() => toggleOption('stack')}
        />
        <CheckboxTile
          label="Favorites"
          icon={<StarIcon />}
          orientation="vertical"
          checked={selected.includes('favorites')}
          onChange={() => toggleOption('favorites')}
        />
      </div>
    );
  },
};

// ─── Disabled ───────────────────────────────────────────
export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '280px' }}>
        <Story />
      </div>
    ),
  ],
};
