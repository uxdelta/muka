import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import './Label.css';

const meta: Meta<typeof Label> = {
  title: 'Design System/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Label Component

Accessible form label using semantic typography tokens.
- 3 sizes: sm, md, lg
- Required indicator
- Disabled state
- Tokens: \`text.label.{size}.semibold\`
        `,
      },
    },
  },
  argTypes: {
    size: { control: { type: 'radio' }, options: ['sm', 'md', 'lg'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Playground: Story = {
  args: { children: 'Form label', size: 'md' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Label size="sm">Small label</Label>
      <Label size="md">Medium label</Label>
      <Label size="lg">Large label</Label>
    </div>
  ),
};

export const Required: Story = {
  args: { children: 'Required field', required: true },
};

export const Disabled: Story = {
  args: { children: 'Disabled label', disabled: true },
};
