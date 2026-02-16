import type { Meta, StoryObj } from '@storybook/react';
import { Section } from './Section';
import { Container } from '../Container';
import './Section.css';

const meta: Meta<typeof Section> = {
  title: 'Components/Layout/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
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

const ContainerVisualizer = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      background: 'var(--color-surface-level2)',
      border: '2px solid var(--color-border-brand)',
      borderRadius: '8px',
      padding: '2rem',
      color: 'var(--color-text-default)',
    }}
  >
    {children}
  </div>
);

export const ResponsiveTest: Story = {
  name: 'Responsive Section + Container Test',
  render: () => (
    <Section padding="default">
      <Container gap="default">
        <ContainerVisualizer>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 600 }}>
            Responsive Container Max-Width
          </h3>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>
            <strong>Mobile (640px):</strong> Container max-width = 640px (sm)
          </p>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>
            <strong>Tablet (768px):</strong> Container max-width = 768px (md)
          </p>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>
            <strong>Desktop (1024px):</strong> Container max-width = 1280px (xl)
          </p>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem' }}>
            <strong>Wide (1280px+):</strong> Container max-width = 1536px (2xl)
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.7 }}>
            Use the viewport toggle to test each breakpoint. Watch the container border resize!
          </p>
        </ContainerVisualizer>
      </Container>
    </Section>
  ),
};

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
