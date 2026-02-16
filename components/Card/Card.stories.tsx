import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import './Card.css';

const meta: Meta<typeof Card> = {
  title: 'Design System/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RL5IFLUJk4yeAFNXlsX4b5/Muka-UI-Figma-Library?node-id=742-13000',
    },
    docs: {
      description: {
        component: `
# Card Component

The Card component is built using the Muka design token system with support for:
- 3 padding sizes: sm, md, lg (plus none)
- 3 border radius sizes: sm, md, lg
- Interactive states: default, hover, pressed, selected
- Semantic HTML element support (div, article, section, aside)
- Multi-brand theming through design tokens

## Token Architecture
- **Component tokens**: \`card.color.{state}.{background|foreground|border}\`
- **Layout tokens**: \`card.padding.{size}\`, \`card.radius.{size}\`
- **Visual tokens**: \`card.shadow.{state}\`, \`card.border.{state}\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'interactive', 'selected'],
    },
    padding: {
      control: { type: 'radio' },
      options: ['none', 'sm', 'md', 'lg'],
    },
    radius: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'article', 'section', 'aside'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// ─── Playground ─────────────────────────────────────────
export const Playground: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Card Title</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>Card content goes here. This is a basic card with default settings.</p>
      </div>
    ),
  },
};

// ─── Padding Variants ───────────────────────────────────
export const PaddingSmall: Story = {
  args: { padding: 'sm', children: <p style={{ margin: 0 }}>Small padding</p> },
};

export const PaddingMedium: Story = {
  args: { padding: 'md', children: <p style={{ margin: 0 }}>Medium padding</p> },
};

export const PaddingLarge: Story = {
  args: { padding: 'lg', children: <p style={{ margin: 0 }}>Large padding</p> },
};

// ─── Interactive ────────────────────────────────────────
export const Interactive: Story = {
  args: {
    variant: 'interactive',
    onClick: () => alert('Card clicked!'),
    children: (
      <div>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Interactive Card</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>Click me — I have hover, pressed, and focus states.</p>
      </div>
    ),
  },
};

// ─── Selected ───────────────────────────────────────────
export const Selected: Story = {
  args: {
    selected: true,
    children: (
      <div>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Selected Card</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>This card is in the selected state.</p>
      </div>
    ),
  },
};

// ─── All Padding Sizes ──────────────────────────────────
export const AllPaddingSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Card key={size} padding={size}>
          <p style={{ margin: 0 }}>Padding: {size}</p>
        </Card>
      ))}
    </div>
  ),
};

// ─── All States ─────────────────────────────────────────
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px' }}>
      <Card>
        <p style={{ margin: 0 }}>Default</p>
      </Card>
      <Card variant="interactive" onClick={() => {}}>
        <p style={{ margin: 0 }}>Interactive (hover me)</p>
      </Card>
      <Card selected>
        <p style={{ margin: 0 }}>Selected</p>
      </Card>
    </div>
  ),
};

// ─── Elevated States (Shadows) ─────────────────────────
export const ElevatedStates: Story = {
  name: 'Elevated States (Shadows)',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 200px)', gap: '2rem', padding: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Card padding="md">
          <p style={{ margin: 0, fontSize: '0.875rem' }}>Default</p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', opacity: 0.6 }}>shadow.level2</p>
        </Card>
        <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.5, textAlign: 'center' }}>Base elevation</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Card variant="interactive" onClick={() => {}} padding="md" className="muka-card--interactive">
          <p style={{ margin: 0, fontSize: '0.875rem' }}>Hover</p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', opacity: 0.6 }}>shadow.level3</p>
        </Card>
        <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.5, textAlign: 'center' }}>Hover over card above</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Card variant="interactive" onClick={() => {}} padding="md" className="muka-card--pressed">
          <p style={{ margin: 0, fontSize: '0.875rem' }}>Pressed</p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', opacity: 0.6 }}>shadow.level2</p>
        </Card>
        <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.5, textAlign: 'center' }}>Active state</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Card selected padding="md">
          <p style={{ margin: 0, fontSize: '0.875rem' }}>Selected</p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', opacity: 0.6 }}>shadow.level1</p>
        </Card>
        <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.5, textAlign: 'center' }}>Selected state</p>
      </div>
    </div>
  ),
};

// ─── Composition: Vehicle Card ──────────────────────────
export const VehicleCard: Story = {
  name: 'Composition: Vehicle Card',
  render: () => (
    <Card variant="interactive" onClick={() => {}} padding="lg" radius="lg" as="article">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Tesla Model 3</h3>
          <span style={{
            fontSize: '0.75rem',
            padding: '0.125rem 0.5rem',
            borderRadius: '999px',
            backgroundColor: 'var(--color-state-success-background)',
            color: 'var(--color-state-success-foreground)',
          }}>
            0% bijtelling
          </span>
        </div>
        <p style={{ margin: 0, opacity: 0.6, fontSize: '0.875rem' }}>AB-123-CD · 2024 · Elektrisch</p>
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
          <div>
            <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.5 }}>Bijtelling/jaar</p>
            <p style={{ margin: 0, fontWeight: 600 }}>€0</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.5 }}>Wegenbelasting/kw</p>
            <p style={{ margin: 0, fontWeight: 600 }}>€0</p>
          </div>
        </div>
      </div>
    </Card>
  ),
};
