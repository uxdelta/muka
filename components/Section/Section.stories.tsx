import type { Meta, StoryObj } from '@storybook/react';
import { Section } from './Section';
import { Container } from '../Container';
import './Section.css';

const meta: Meta<typeof Section> = {
  title: 'Design System/Layout/Section',
  component: Section,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Section

Layout primitive that applies consistent vertical and horizontal padding from the Muka layout token system.
Use as the outer wrapper for page sections. Pairs with \`Container\` for max-width and inner spacing.

- **Padding**: compact, default, spacious (responsive via mobile/tablet/desktop tokens)
- **Semantic element**: section (default), div, aside
        `,
      },
    },
  },
  argTypes: {
    padding: { control: { type: 'radio' }, options: ['compact', 'default', 'spacious'] },
    as: { control: { type: 'radio' }, options: ['section', 'div', 'aside'] },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

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
  args: { padding: 'default' },
  render: (args) => (
    <Section {...args}>
      <Placeholder label="Section content — resize or switch theme to see token changes" />
    </Section>
  ),
};

export const Compact: Story = {
  args: { padding: 'compact' },
  render: (args) => (
    <Section {...args}>
      <Placeholder label="Compact padding" />
    </Section>
  ),
};

export const Default: Story = {
  args: { padding: 'default' },
  render: (args) => (
    <Section {...args}>
      <Placeholder label="Default padding" />
    </Section>
  ),
};

export const Spacious: Story = {
  args: { padding: 'spacious' },
  render: (args) => (
    <Section {...args}>
      <Placeholder label="Spacious padding" />
    </Section>
  ),
};

export const WithContainer: Story = {
  name: 'Section + Container',
  render: () => (
    <Section padding="default">
      <Container maxWidth="large" gap="default">
        <Placeholder label="Container (max-width large, default gap)" />
        <Placeholder label="Second block in container" />
      </Container>
    </Section>
  ),
};

export const PageLayout: Story = {
  name: 'Example page layout',
  render: () => (
    <>
      <Section padding="compact">
        <Container maxWidth="large">
          <Placeholder label="Hero / compact section" />
        </Container>
      </Section>
      <Section padding="default">
        <Container maxWidth="large" gap="default">
          <Placeholder label="Main content — default section + container gap" />
          <Placeholder label="Another row" />
        </Container>
      </Section>
      <Section padding="spacious">
        <Container maxWidth="medium">
          <Placeholder label="Footer area — spacious section, medium container" />
        </Container>
      </Section>
    </>
  ),
};
