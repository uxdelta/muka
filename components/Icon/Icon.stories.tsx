import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import './Icon.css';

const CarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </svg>
);

const meta: Meta<typeof Icon> = {
  title: 'Design System/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Icon Component

Wrapper that enforces consistent sizing and color inheritance.
- 4 sizes: xs, sm, md, lg
- Uses \`icon.size\` tokens
- Color inherits from parent or can be overridden
- Accessible: aria-label for meaningful icons, aria-hidden for decorative
        `,
      },
    },
  },
  argTypes: {
    size: { control: { type: 'radio' }, options: ['xs', 'sm', 'md', 'lg'] },
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  args: { children: <CarIcon />, size: 'md' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Icon size="xs"><CheckIcon /></Icon>
      <Icon size="sm"><CheckIcon /></Icon>
      <Icon size="md"><CheckIcon /></Icon>
      <Icon size="lg"><CheckIcon /></Icon>
    </div>
  ),
};

export const WithColor: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Icon color="var(--color-state-success-foreground)"><CheckIcon /></Icon>
      <Icon color="var(--color-state-error-foreground)"><AlertIcon /></Icon>
      <Icon color="var(--color-action-default)"><CarIcon /></Icon>
    </div>
  ),
};

export const Accessible: Story = {
  args: { children: <AlertIcon />, label: 'Warning', size: 'lg' },
};
