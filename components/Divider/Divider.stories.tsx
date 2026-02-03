import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';
import './Divider.css';

const meta: Meta<typeof Divider> = {
  title: 'Design System/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Divider / Separator Component

Separates sections in cards and comparison layouts.
- 2 orientations: horizontal, vertical
- 2 variants: default, contrast
- Uses \`separator.color\` and \`separator.width\` tokens
        `,
      },
    },
  },
  argTypes: {
    orientation: { control: { type: 'radio' }, options: ['horizontal', 'vertical'] },
    variant: { control: { type: 'radio' }, options: ['default', 'contrast'] },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Playground: Story = {
  args: { orientation: 'horizontal' },
  decorators: [(Story) => <div style={{ width: '320px' }}><Story /></div>],
};

export const Horizontal: Story = {
  decorators: [(Story) => <div style={{ width: '320px' }}><Story /></div>],
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  decorators: [(Story) => <div style={{ height: '100px', display: 'flex' }}><Story /></div>],
};

export const Contrast: Story = {
  args: { variant: 'contrast' },
  decorators: [(Story) => <div style={{ width: '320px' }}><Story /></div>],
};

export const InCard: Story = {
  name: 'Composition: In Card',
  render: () => (
    <div style={{
      width: '320px',
      padding: 'var(--card-padding-md)',
      border: '1px solid var(--color-border-default)',
      borderRadius: 'var(--card-radius-md)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    }}>
      <p style={{ margin: 0 }}>Section one</p>
      <Divider />
      <p style={{ margin: 0 }}>Section two</p>
      <Divider variant="contrast" />
      <p style={{ margin: 0 }}>Section three</p>
    </div>
  ),
};
