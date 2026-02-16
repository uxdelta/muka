import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioTile } from './RadioTile';
import './RadioTile.css';

import { Icon } from '../Icon';

const StackIcon = () => <Icon name="stack" variant="line" size="md" />;
const HomeIcon = () => <Icon name="home" variant="line" size="md" />;
const StarIcon = () => <Icon name="star" variant="line" size="md" />;

const meta: Meta<typeof RadioTile> = {
  title: 'Components/Input/RadioTile',
  component: RadioTile,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# RadioTile Component

A tile-style radio button with support for icons, images, and vertical layouts.
Perfect for selection cards, option grids, and visual selection interfaces.

## Variants
- **Default**: Simple radio with label
- **With Icon**: Radio with an icon and optional caption
- **With Image**: Radio with an image and optional caption
- **Vertical**: Stacked layout with radio in corner
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
type Story = StoryObj<typeof RadioTile>;

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
      <RadioTile label="Unselected" name="default" value="1" />
      <RadioTile label="Selected" name="default" value="2" checked />
    </div>
  ),
};

// ─── With Icon ──────────────────────────────────────────
export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '280px' }}>
      <RadioTile label="With icon" icon={<StackIcon />} name="icon" value="1" />
      <RadioTile label="With icon selected" icon={<StackIcon />} name="icon" value="2" checked />
      <RadioTile label="With caption" caption="Description text" icon={<StackIcon />} name="icon2" value="3" />
      <RadioTile label="With caption selected" caption="Description text" icon={<StackIcon />} name="icon2" value="4" checked />
    </div>
  ),
};

// ─── With Image ─────────────────────────────────────────
export const WithImage: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '280px' }}>
      <RadioTile 
        label="With image" 
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop" 
        name="image"
        value="1"
      />
      <RadioTile 
        label="With image selected" 
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop" 
        name="image"
        value="2"
        checked 
      />
      <RadioTile 
        label="Heading" 
        caption="Caption text" 
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop"
        name="image2"
        value="3"
      />
    </div>
  ),
};

// ─── Vertical with Icon ─────────────────────────────────
export const VerticalWithIcon: Story = {
  name: 'Vertical with Icon',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <RadioTile label="Option" icon={<StackIcon />} orientation="vertical" name="vert-icon" value="1" />
      <RadioTile label="Selected" icon={<StackIcon />} orientation="vertical" name="vert-icon" value="2" checked />
    </div>
  ),
};

// ─── Vertical with Image ────────────────────────────────
export const VerticalWithImage: Story = {
  name: 'Vertical with Image',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <RadioTile 
        label="Option" 
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=160&h=120&fit=crop" 
        orientation="vertical"
        name="vert-image"
        value="1"
      />
      <RadioTile 
        label="Selected" 
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=160&h=120&fit=crop" 
        orientation="vertical"
        name="vert-image"
        value="2"
        checked 
      />
    </div>
  ),
};

// ─── Radio Group ────────────────────────────────────────
export const RadioTileGroup: Story = {
  name: 'Tile Group',
  render: function RadioTileGroupStory() {
    const [selected, setSelected] = useState('home');

    return (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <RadioTile
          label="Home"
          icon={<HomeIcon />}
          orientation="vertical"
          name="group"
          value="home"
          checked={selected === 'home'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <RadioTile
          label="Stack"
          icon={<StackIcon />}
          orientation="vertical"
          name="group"
          value="stack"
          checked={selected === 'stack'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <RadioTile
          label="Favorites"
          icon={<StarIcon />}
          orientation="vertical"
          name="group"
          value="favorites"
          checked={selected === 'favorites'}
          onChange={(e) => setSelected(e.target.value)}
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
