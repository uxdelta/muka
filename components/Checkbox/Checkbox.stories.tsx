import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';
import './Checkbox.css';

const meta: Meta<typeof Checkbox> = {
  title: 'Design System/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Checkbox Component

A square selection control for multi-choice options.
Built using the Muka design token system with support for:
- 3 sizes: sm, md, lg
- Interactive states: default, hover, checked, indeterminate, disabled
- Label text with proper accessibility
- Multi-brand theming through design tokens

## Token Architecture
This component uses the following token layers:
- **Component tokens**: \`checkbox.size.{size}\`, \`checkbox.radius\`, \`checkbox.icon.size.{size}\`, \`checkbox.color.{state}.*\`
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
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state (for parent checkboxes)',
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
type Story = StoryObj<typeof Checkbox>;

// ─── Playground ─────────────────────────────────────────
export const Playground: Story = {
  args: {
    label: 'Checkbox option',
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

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate',
    indeterminate: true,
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
      <Checkbox size="sm" label="Small" />
      <Checkbox size="md" label="Medium" />
      <Checkbox size="lg" label="Large" />
    </div>
  ),
};

// ─── All States ─────────────────────────────────────────
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

// ─── Checkbox Group ─────────────────────────────────────
export const CheckboxGroup: Story = {
  name: 'Checkbox Group',
  render: function CheckboxGroupStory() {
    const [selected, setSelected] = useState<string[]>(['option1']);

    const handleChange = (value: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setSelected([...selected, value]);
      } else {
        setSelected(selected.filter((v) => v !== value));
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Checkbox
          name="group"
          value="option1"
          label="Option 1"
          checked={selected.includes('option1')}
          onChange={handleChange('option1')}
        />
        <Checkbox
          name="group"
          value="option2"
          label="Option 2"
          checked={selected.includes('option2')}
          onChange={handleChange('option2')}
        />
        <Checkbox
          name="group"
          value="option3"
          label="Option 3"
          checked={selected.includes('option3')}
          onChange={handleChange('option3')}
        />
      </div>
    );
  },
};

// ─── Parent Checkbox with Indeterminate ─────────────────
export const ParentCheckbox: Story = {
  name: 'Parent with Children',
  render: function ParentCheckboxStory() {
    const [children, setChildren] = useState([false, false, false]);
    
    const allChecked = children.every(Boolean);
    const someChecked = children.some(Boolean);
    const isIndeterminate = someChecked && !allChecked;

    const handleParentChange = () => {
      setChildren(allChecked ? [false, false, false] : [true, true, true]);
    };

    const handleChildChange = (index: number) => () => {
      const newChildren = [...children];
      newChildren[index] = !newChildren[index];
      setChildren(newChildren);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Checkbox
          label="Select all"
          checked={allChecked}
          indeterminate={isIndeterminate}
          onChange={handleParentChange}
        />
        <div style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Checkbox
            label="Child 1"
            checked={children[0]}
            onChange={handleChildChange(0)}
          />
          <Checkbox
            label="Child 2"
            checked={children[1]}
            onChange={handleChildChange(1)}
          />
          <Checkbox
            label="Child 3"
            checked={children[2]}
            onChange={handleChildChange(2)}
          />
        </div>
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
