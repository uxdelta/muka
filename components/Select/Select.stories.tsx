import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import './Select.css';

const vehicleTypes = [
  { value: 'car', label: 'Personenauto' },
  { value: 'motorcycle', label: 'Motorfiets' },
  { value: 'van', label: 'Bestelauto (grijs kenteken)' },
  { value: 'electric', label: 'Elektrische auto' },
];

const fuelTypes = [
  { value: 'petrol', label: 'Benzine' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'electric', label: 'Elektrisch' },
  { value: 'hybrid', label: 'Hybride' },
  { value: 'lpg', label: 'LPG', disabled: true },
];

const meta: Meta<typeof Select> = {
  title: 'Design System/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Select / Dropdown Component

Native \`<select>\` styled with the Muka design token system.
- 3 sizes: sm, md, lg
- States: default, hover, focus, error, disabled
- Accessible: native select behavior, keyboard navigation, screen reader support

## Token Architecture
- **Component tokens**: \`select.field.color.{state}.{property}\`
- **Layout tokens**: \`select.field.radius.{size}\`, \`select.field.height.{size}\`
        `,
      },
    },
  },
  argTypes: {
    size: { control: { type: 'radio' }, options: ['sm', 'md', 'lg'] },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {
  args: {
    label: 'Voertuigtype',
    placeholder: 'Selecteer een type...',
    options: vehicleTypes,
  },
};

export const Small: Story = {
  args: { size: 'sm', label: 'Small', placeholder: 'Select...', options: vehicleTypes },
};

export const Medium: Story = {
  args: { size: 'md', label: 'Medium', placeholder: 'Select...', options: vehicleTypes },
};

export const Large: Story = {
  args: { size: 'lg', label: 'Large', placeholder: 'Select...', options: vehicleTypes },
};

export const WithValue: Story = {
  args: { label: 'Brandstof', options: fuelTypes, value: 'electric' },
};

export const Error: Story = {
  args: {
    label: 'Voertuigtype',
    placeholder: 'Selecteer...',
    options: vehicleTypes,
    error: true,
    errorMessage: 'Selecteer een voertuigtype',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Voertuigtype',
    options: vehicleTypes,
    value: 'car',
    disabled: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Brandstof',
    placeholder: 'Selecteer...',
    options: fuelTypes,
    helperText: 'Dit bepaalt de bijtelling berekening',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '320px' }}>
      <Select size="sm" label="Small" placeholder="Select..." options={vehicleTypes} />
      <Select size="md" label="Medium" placeholder="Select..." options={vehicleTypes} />
      <Select size="lg" label="Large" placeholder="Select..." options={vehicleTypes} />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '320px' }}>
      <Select label="Default" placeholder="Select..." options={vehicleTypes} />
      <Select label="With value" options={vehicleTypes} value="electric" />
      <Select label="Error" options={vehicleTypes} error errorMessage="Required" />
      <Select label="Disabled" options={vehicleTypes} value="car" disabled />
    </div>
  ),
};
