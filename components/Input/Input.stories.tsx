import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import './Input.css';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242.156a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l5 3.125 5-3.125V4a1 1 0 0 0-1-1H4zm9 2.441-4.684 2.928a.5.5 0 0 1-.632 0L3 5.441V12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5.441z"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4A.75.75 0 0 1 8 3.5zM8 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
  </svg>
);

const meta: Meta<typeof Input> = {
  title: 'Components/Input/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Input Component

The Input component is built using the Muka design token system with support for:
- 3 sizes: sm, md, lg
- Interactive states: default, hover, focus, error, disabled
- Icons with flexible positioning (left, right, or both)
- Label, helper text, and error messages
- Multi-brand theming through design tokens

## Token Architecture
This component uses the following token layers:
- **Component tokens**: \`input.field.color.{state}.{background|foreground|border}\`
- **Semantic tokens**: \`color.text.default\`, \`color.state.error\`, \`color.border.focus\`
- **Typography tokens**: \`text.input.{size}\`, \`text.label.{size}.semibold\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant — matches token system',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'number', 'email', 'password', 'tel', 'url', 'search'],
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
  args: {
    placeholder: 'Enter text...',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ─── Playground ─────────────────────────────────────────
export const Playground: Story = {
  args: {
    label: 'Label',
    placeholder: 'Enter text...',
    helperText: 'This is helper text',
  },
};

// ─── Sizes ──────────────────────────────────────────────
export const Small: Story = {
  args: { size: 'sm', placeholder: 'Small input', label: 'Small' },
};

export const Medium: Story = {
  args: { size: 'md', placeholder: 'Medium input', label: 'Medium' },
};

export const Large: Story = {
  args: { size: 'lg', placeholder: 'Large input', label: 'Large' },
};

// ─── States ─────────────────────────────────────────────
export const Default: Story = {
  args: { label: 'Default', placeholder: 'Default state' },
};

export const WithValue: Story = {
  args: { label: 'With value', value: 'Hello world' },
};

export const Error: Story = {
  args: {
    label: 'Email',
    value: 'invalid-email',
    error: true,
    errorMessage: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    value: 'Cannot edit this',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Required field',
    placeholder: 'This field is required',
    required: true,
  },
};

// ─── With Icons ─────────────────────────────────────────
export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    iconLeft: <SearchIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    iconRight: <MailIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Search email',
    placeholder: 'Search...',
    iconLeft: <SearchIcon />,
    iconRight: <MailIcon />,
  },
};

export const ErrorWithIcon: Story = {
  args: {
    label: 'Email',
    value: 'bad-email',
    error: true,
    errorMessage: 'Invalid email',
    iconRight: <AlertIcon />,
  },
};

// ─── With Helper Text ───────────────────────────────────
export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters',
  },
};

// ─── Full Width ─────────────────────────────────────────
export const FullWidth: Story = {
  args: {
    label: 'Full width input',
    placeholder: 'Takes full width of container',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

// ─── All Sizes ──────────────────────────────────────────
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '320px' }}>
      <Input size="sm" label="Small" placeholder="Small input" helperText="Helper text" />
      <Input size="md" label="Medium" placeholder="Medium input" helperText="Helper text" />
      <Input size="lg" label="Large" placeholder="Large input" helperText="Helper text" />
    </div>
  ),
};

// ─── All States ─────────────────────────────────────────
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '320px' }}>
      <Input label="Default" placeholder="Default state" />
      <Input label="With value" value="Entered text" />
      <Input label="Error" value="Invalid" error errorMessage="Something went wrong" />
      <Input label="Disabled" value="Cannot edit" disabled />
      <Input label="Required" placeholder="Required field" required />
    </div>
  ),
};

// ─── Real-World: License Plate Entry ────────────────────
export const LicensePlateEntry: Story = {
  name: 'Composition: License Plate',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px' }}>
      <Input
        label="Kenteken"
        placeholder="AB-123-CD"
        iconLeft={<SearchIcon />}
        helperText="Voer het kenteken in om voertuiggegevens op te halen"
      />
    </div>
  ),
};
