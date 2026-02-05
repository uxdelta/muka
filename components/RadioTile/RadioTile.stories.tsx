import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioTile } from './RadioTile';
import './RadioTile.css';

const StackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  </svg>
);

const meta: Meta<typeof RadioTile> = {
  title: 'Design System/RadioTile',
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
