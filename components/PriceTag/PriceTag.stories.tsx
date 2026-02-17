import type { Meta, StoryObj } from '@storybook/react';
import { PriceTag } from './PriceTag';
import './PriceTag.css';

const meta: Meta<typeof PriceTag> = {
  title: 'Components/Information/PriceTag',
  component: PriceTag,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RL5IFLUJk4yeAFNXlsX4b5/Muka-UI-Figma-Library?node-id=62-197',
    },
    docs: {
      description: {
        component: `
# PriceTag Component

Displays a formatted price with currency symbol, whole units, cents, and an optional unit label.

## Sizes
- **Medium (md)**: Stacked layout — price on top, unit below. Used in large/medium tiles.
- **Small (sm)**: Inline layout — all elements in a single row. Used in small tiles.

## Token Architecture
- Currency: \`--text-subheading-md-*\` (md) / \`--text-body-base-regular-*\` (sm)
- Whole units: \`--text-label-2xl-bold-*\` (md) / \`--text-label-md-bold-*\` (sm)
- Cents: \`--text-label-md-bold-*\`
- Unit: \`--text-body-sm-regular-*\`
        `,
      },
    },
  },
  argTypes: {
    currency: {
      control: { type: 'radio' },
      options: ['EUR', 'USD', 'GBP', 'JPY'],
    },
    size: {
      control: { type: 'radio' },
      options: ['md', 'sm'],
    },
    decimal: {
      control: { type: 'radio' },
      options: ['comma', 'dot'],
    },
    showCents: {
      control: { type: 'boolean' },
    },
    showUnit: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PriceTag>;

// ─── Playground ─────────────────────────────────────────
export const Playground: Story = {
  args: {
    currency: 'EUR',
    wholeUnits: '1.250',
    amount: '00',
    showCents: true,
    decimal: 'comma',
    unit: 'unit',
    showUnit: true,
    size: 'md',
  },
};

// ─── Medium ─────────────────────────────────────────────
export const Medium: Story = {
  args: {
    wholeUnits: '0',
    amount: '99',
    size: 'md',
  },
};

// ─── Small ──────────────────────────────────────────────
export const Small: Story = {
  args: {
    wholeUnits: '0',
    amount: '00',
    size: 'sm',
  },
};

// ─── Without Cents ──────────────────────────────────────
export const WithoutCents: Story = {
  args: {
    wholeUnits: '250',
    showCents: false,
    size: 'md',
  },
};

// ─── Without Unit ───────────────────────────────────────
export const WithoutUnit: Story = {
  args: {
    wholeUnits: '49',
    amount: '95',
    showUnit: false,
    size: 'md',
  },
};

// ─── All Currencies ─────────────────────────────────────
export const AllCurrencies: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
      {(['EUR', 'USD', 'GBP', 'JPY'] as const).map((currency) => (
        <PriceTag
          key={currency}
          currency={currency}
          wholeUnits="99"
          amount="50"
          unit="night"
          size="md"
        />
      ))}
    </div>
  ),
};

// ─── Both Sizes ─────────────────────────────────────────
export const BothSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
      <div>
        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', opacity: 0.5 }}>Medium</p>
        <PriceTag wholeUnits="1.250" amount="00" unit="month" size="md" />
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', opacity: 0.5 }}>Small</p>
        <PriceTag wholeUnits="1.250" amount="00" unit="month" size="sm" />
      </div>
    </div>
  ),
};

// ─── Dot Decimal ────────────────────────────────────────
export const DotDecimal: Story = {
  args: {
    wholeUnits: '1,250',
    amount: '00',
    decimal: 'dot',
    size: 'md',
  },
};
