import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';
import { Section } from '../Section';
import './Container.css';

const meta: Meta<typeof Container> = {
  title: 'Design System/Layout/Container',
  component: Container,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Container

Layout primitive that constrains content width and optionally adds gap between children.
Center-aligned. Use inside \`Section\` for page-level layout.

- **Max width**: small, medium, large, xlarge (responsive via breakpoints)
- **Gap**: none (max-width only), compact, default, spacious
- **Semantic element**: div (default), main, article
        `,
      },
    },
  },
  argTypes: {
    maxWidth: { control: { type: 'radio' }, options: ['small', 'medium', 'large', 'xlarge'] },
    gap: { control: { type: 'radio' }, options: ['none', 'compact', 'default', 'spacious'] },
    as: { control: { type: 'radio' }, options: ['div', 'main', 'article'] },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

const Placeholder = ({ label }: { label: string }) => (
  <div
    style={{
      padding: '1rem',
      background: 'var(--color-surface-level1)',
      border: '1px dashed var(--color-border-default)',
      borderRadius: '4px',
      color: 'var(--color-text-subtle-default)',
    }}
  >
    {label}
  </div>
);

export const Playground: Story = {
  args: { maxWidth: 'large', gap: 'none' },
  render: (args) => (
    <Container {...args}>
      <Placeholder label="Container content — switch theme or resize to see token changes" />
    </Container>
  ),
};

export const MaxWidthSmall: Story = {
  args: { maxWidth: 'small', gap: 'none' },
  render: (args) => (
    <Container {...args}>
      <Placeholder label="Small max-width" />
    </Container>
  ),
};

export const MaxWidthMedium: Story = {
  args: { maxWidth: 'medium', gap: 'none' },
  render: (args) => (
    <Container {...args}>
      <Placeholder label="Medium max-width" />
    </Container>
  ),
};

export const MaxWidthLarge: Story = {
  args: { maxWidth: 'large', gap: 'none' },
  render: (args) => (
    <Container {...args}>
      <Placeholder label="Large max-width" />
    </Container>
  ),
};

export const MaxWidthXLarge: Story = {
  args: { maxWidth: 'xlarge', gap: 'none' },
  render: (args) => (
    <Container {...args}>
      <Placeholder label="XLarge (100%)" />
    </Container>
  ),
};

export const WithGapDefault: Story = {
  args: { maxWidth: 'large', gap: 'default' },
  render: (args) => (
    <Container {...args}>
      <Placeholder label="First child" />
      <Placeholder label="Second child" />
      <Placeholder label="Third child" />
    </Container>
  ),
};

export const WithGapCompact: Story = {
  args: { maxWidth: 'medium', gap: 'compact' },
  render: (args) => (
    <Container {...args}>
      <Placeholder label="Compact gap" />
      <Placeholder label="Between items" />
    </Container>
  ),
};

export const WithGapSpacious: Story = {
  args: { maxWidth: 'medium', gap: 'spacious' },
  render: (args) => (
    <Container {...args}>
      <Placeholder label="Spacious gap" />
      <Placeholder label="Between items" />
    </Container>
  ),
};

export const InsideSection: Story = {
  name: 'Section + Container',
  render: () => (
    <Section padding="default">
      <Container maxWidth="large" gap="default">
        <Placeholder label="Content inside Section and Container" />
        <Placeholder label="With default gap" />
      </Container>
    </Section>
  ),
};
