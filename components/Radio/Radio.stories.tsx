import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio } from './Radio';
import './Radio.css';

const meta: Meta<typeof Radio> = {
  title: 'Design System/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Radio Component

A circular selection control for single-choice options within a group.
Built using the Muka design token system with support for:
- 3 sizes: sm, md, lg
- Interactive states: default, hover, checked, disabled
- Label text with proper accessibility
- Multi-brand theming through design tokens

## Token Architecture
This component uses the following token layers:
- **Component tokens**: \`radio.size.{size}\`, \`radio.dot.size.{size}\`, \`radio.color.{state}.*\`
- **Semantic tokens**: \`color.text.default\`, \`color.border.focus\`
- **Typography tokens**: \`text.label.{size}.regular\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
  },
  args: {
    label: 'Label',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// ─── Playground ─────────────────────────────────────────
export const Playground: Story = {
  args: {
    label: 'Radio option',
  },
};

// ─── States ─────────────────────────────────────────────
export const Unchecked: Story = {
  args: {
    label: 'Unchecked',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked',
    disabled: true,
    checked: true,
  },
};

// ─── Sizes ──────────────────────────────────────────────
export const Small: Story = {
  args: { size: 'sm', label: 'Small' },
};

export const Medium: Story = {
  args: { size: 'md', label: 'Medium' },
};

export const Large: Story = {
  args: { size: 'lg', label: 'Large' },
};

// ─── All Sizes ──────────────────────────────────────────
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Radio size="sm" label="Small" name="sizes" value="sm" />
      <Radio size="md" label="Medium" name="sizes" value="md" />
      <Radio size="lg" label="Large" name="sizes" value="lg" />
    </div>
  ),
};

// ─── All States ─────────────────────────────────────────
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Radio label="Unchecked" />
      <Radio label="Checked" defaultChecked />
      <Radio label="Disabled" disabled />
      <Radio label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

// ─── Radio Group ────────────────────────────────────────
export const RadioGroup: Story = {
  name: 'Radio Group',
  render: function RadioGroupStory() {
    const [selected, setSelected] = useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Radio
          name="group"
          value="option1"
          label="Option 1"
          checked={selected === 'option1'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          name="group"
          value="option2"
          label="Option 2"
          checked={selected === 'option2'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          name="group"
          value="option3"
          label="Option 3"
          checked={selected === 'option3'}
          onChange={(e) => setSelected(e.target.value)}
        />
      </div>
    );
  },
};

// ─── Without Label ──────────────────────────────────────
export const WithoutLabel: Story = {
  args: {
    label: undefined,
  },
};
