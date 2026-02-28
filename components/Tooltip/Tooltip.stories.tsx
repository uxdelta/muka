import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from 'storybook/test';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { verifyThemeLoaded, verifyUsesTokens } from '../../.storybook/theme-test-utils';
import './Tooltip.css';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Overlay/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RL5IFLUJk4yeAFNXlsX4b5/Muka-UI-Figma-Library',
    },
    docs: {
      description: {
        component: `
# Tooltip Component

The Tooltip component displays contextual help text when hovering or focusing on an element.
Built on Radix UI Tooltip primitives for accessibility and positioning.

## Features
- Configurable positioning (4 sides, 3 alignments)
- Customizable show/hide delays
- Rich content support
- Controlled and uncontrolled modes
- Two visual variants (default: inverse colors, contrast: bordered)
- Arrow pointing to trigger
- Works across all 4 brand/theme combinations

## Accessibility
- Content linked via aria-describedby
- Keyboard accessible (shows on focus)
- Escape key closes tooltip
- role="tooltip" on content
- Touch-friendly (shows on long press)

## Token Architecture
This component uses the following token layers:
- **Component tokens**: \`tooltip.content.color.{variant}.background\`
- **Semantic tokens**: \`color.surface.inverse\`, \`color.text.inverse.default\`
- **Alias tokens**: \`spacing.3\`, \`border.radius.md\`
        `,
      },
    },
  },
  argTypes: {
    side: {
      control: { type: 'radio' },
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Side to position the tooltip',
    },
    align: {
      control: { type: 'radio' },
      options: ['start', 'center', 'end'],
      description: 'Alignment relative to the trigger',
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'contrast'],
      description: 'Visual variant',
    },
    sideOffset: {
      control: { type: 'number' },
      description: 'Distance from the trigger (in pixels)',
    },
    delayDuration: {
      control: { type: 'number' },
      description: 'Delay in milliseconds before showing',
    },
    maxWidth: {
      control: { type: 'number' },
      description: 'Maximum width of tooltip content',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether to disable the tooltip',
    },
  },
  args: {
    side: 'top',
    align: 'center',
    variant: 'default',
    sideOffset: 8,
    delayDuration: 200,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const OnIcon: Story = {
  args: {
    content: 'Save changes',
    children: (
      <Button iconOnly>
        <Icon name="save" variant="line" />
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip on an icon-only button - essential for accessibility when icons need explanation.',
      },
    },
  },
};

export const RichContent: Story = {
  args: {
    content: (
      <div>
        <div style={{ fontWeight: 600, marginBottom: '4px' }}>Keyboard shortcut</div>
        <div style={{ fontSize: '0.875rem' }}>Press Ctrl+S to save</div>
      </div>
    ),
    maxWidth: 200,
    children: <Icon name="keyboard" variant="line" />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip with rich content including formatted text.',
      },
    },
  },
};

export const PositionTop: Story = {
  args: {
    content: 'Top positioned tooltip',
    side: 'top',
    children: <Button>Top</Button>,
  },
};

export const PositionRight: Story = {
  args: {
    content: 'Right positioned tooltip',
    side: 'right',
    children: <Button>Right</Button>,
  },
};

export const PositionBottom: Story = {
  args: {
    content: 'Bottom positioned tooltip',
    side: 'bottom',
    children: <Button>Bottom</Button>,
  },
};

export const PositionLeft: Story = {
  args: {
    content: 'Left positioned tooltip',
    side: 'left',
    children: <Button>Left</Button>,
  },
};

export const AlignStart: Story = {
  args: {
    content: 'Aligned to start',
    side: 'bottom',
    align: 'start',
    children: <Button>Align Start</Button>,
  },
};

export const AlignCenter: Story = {
  args: {
    content: 'Aligned to center',
    side: 'bottom',
    align: 'center',
    children: <Button>Align Center</Button>,
  },
};

export const AlignEnd: Story = {
  args: {
    content: 'Aligned to end',
    side: 'bottom',
    align: 'end',
    children: <Button>Align End</Button>,
  },
};

export const DefaultVariant: Story = {
  args: {
    content: 'Default variant with inverse colors',
    variant: 'default',
    children: <Button>Default</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default variant uses inverse colors for high contrast and immediate visibility.',
      },
    },
  },
};

export const ContrastVariant: Story = {
  args: {
    content: 'Contrast variant with border',
    variant: 'contrast',
    children: <Button>Contrast</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Contrast variant uses lighter colors with a border, better for subtle hints.',
      },
    },
  },
};

export const InstantShow: Story = {
  args: {
    content: 'Instant tooltip (no delay)',
    delayDuration: 0,
    children: <Button>Hover for instant tooltip</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip with no delay - shows immediately on hover.',
      },
    },
  },
};

export const LongDelay: Story = {
  args: {
    content: 'This tooltip appears after 1 second',
    delayDuration: 1000,
    children: <Button>Hover and wait</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip with a 1-second delay before showing.',
      },
    },
  },
};

export const CustomMaxWidth: Story = {
  args: {
    content: 'This is a very long tooltip text that demonstrates the custom maximum width setting. It will wrap to multiple lines when it exceeds the specified width.',
    maxWidth: 150,
    children: <Button>Narrow tooltip</Button>,
  },
};

export const LongText: Story = {
  args: {
    content: 'This is a much longer tooltip that demonstrates how text wraps naturally. It contains enough content to show how the tooltip handles multi-line text content while maintaining readability.',
    maxWidth: 250,
    children: <Button>Long content</Button>,
  },
};

export const AllPositions: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '3rem',
        padding: '4rem',
        placeItems: 'center',
      }}
    >
      <div />
      <Tooltip content="Top tooltip" side="top">
        <Button>Top</Button>
      </Tooltip>
      <div />

      <Tooltip content="Left tooltip" side="left">
        <Button>Left</Button>
      </Tooltip>
      <div />
      <Tooltip content="Right tooltip" side="right">
        <Button>Right</Button>
      </Tooltip>

      <div />
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <div />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Overview of all tooltip positions (top, right, bottom, left).',
      },
    },
  },
};

export const IconGallery: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', padding: '2rem' }}>
      <Tooltip content="Information">
        <Button iconOnly>
          <Icon name="information" variant="line" />
        </Button>
      </Tooltip>
      <Tooltip content="Settings">
        <Button iconOnly>
          <Icon name="settings" variant="line" />
        </Button>
      </Tooltip>
      <Tooltip content="Delete" variant="contrast">
        <Button iconOnly variant="ghost">
          <Icon name="delete-bin" variant="line" />
        </Button>
      </Tooltip>
      <Tooltip content="Edit document" side="right">
        <Button iconOnly variant="secondary">
          <Icon name="edit" variant="line" />
        </Button>
      </Tooltip>
      <Tooltip content="Download" side="bottom">
        <Button iconOnly variant="tertiary">
          <Icon name="download" variant="line" />
        </Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Common use case: tooltips on icon-only buttons for accessibility.',
      },
    },
  },
};

export const VariantComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem', alignItems: 'center' }}>
      <div>
        <h4 style={{ color: 'var(--color-text-default-default)', marginBottom: '1rem' }}>
          Default Variant
        </h4>
        <Tooltip content="High contrast inverse colors" variant="default">
          <Button>Hover me</Button>
        </Tooltip>
      </div>
      <div>
        <h4 style={{ color: 'var(--color-text-default-default)', marginBottom: '1rem' }}>
          Contrast Variant
        </h4>
        <Tooltip content="Subtle with border" variant="contrast">
          <Button>Hover me</Button>
        </Tooltip>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Side-by-side comparison of the two tooltip variants.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    content: 'Customize me using controls below!',
    side: 'top',
    align: 'center',
    variant: 'default',
    sideOffset: 8,
    delayDuration: 200,
    maxWidth: 200,
    children: <Button>Playground Button</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - try different combinations of props using the controls below!',
      },
    },
  },
};

export const ThemeDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-default-default)' }}>
          🎨 Brand & Theme Demonstration
        </h3>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-subtle-default)' }}>
          Use the toolbar above to switch brands and themes! Notice how tooltips automatically
          adapt to different brand personalities and color schemes.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <Tooltip content="Default variant tooltip" variant="default">
          <Button variant="primary">Default Tooltip</Button>
        </Tooltip>
        <Tooltip content="Contrast variant tooltip" variant="contrast">
          <Button variant="secondary">Contrast Tooltip</Button>
        </Tooltip>
        <Tooltip content="Tooltip on ghost button">
          <Button variant="ghost">Ghost Button</Button>
        </Tooltip>
      </div>

      <div
        style={{
          padding: 'var(--spacing-4)',
          backgroundColor: 'var(--color-surface-level1)',
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid var(--color-border-default)',
        }}
      >
        <h4 style={{ color: 'var(--color-text-default-default)', margin: '0 0 1rem 0' }}>
          Token Architecture in Action
        </h4>
        <p
          style={{
            color: 'var(--color-text-subtle-default)',
            fontSize: 'var(--text-size-sm)',
            margin: '0',
            lineHeight: '1.5',
          }}
        >
          💡 <strong>Pro tip:</strong> Tooltips use inverse colors by default for maximum
          visibility. The contrast variant adapts to the current surface level for subtle hints.
          Both variants automatically adjust when you switch brands or themes!
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Demonstrates how tooltips adapt across different brand and theme combinations.',
      },
    },
  },
};

export const ThemeTokenValidation: Story = {
  tags: ['test', 'theme'],
  args: {
    content: 'Test tooltip',
    children: <Button>Test</Button>,
  },
  play: async ({ canvasElement, globals }) => {
    verifyThemeLoaded(globals);

    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await userEvent.hover(button);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const tooltip = document.querySelector('.muka-tooltip__content');
    if (tooltip) {
      verifyUsesTokens(tooltip as HTMLElement, [
        'tooltip-content-color-default-background',
        'tooltip-content-color-default-foreground',
        'tooltip-content-padding-x',
        'tooltip-content-padding-y',
      ]);
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests that tooltips properly use design tokens from the theme system.',
      },
    },
  },
};

export const InteractionTest: Story = {
  tags: ['test'],
  args: {
    content: 'Test tooltip',
    children: <Button>Hover me</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await userEvent.hover(button);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const tooltip = document.querySelector('.muka-tooltip__content');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('Test tooltip');

    await userEvent.unhover(button);
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests tooltip hover interaction.',
      },
    },
  },
};

export const KeyboardTest: Story = {
  tags: ['test'],
  args: {
    content: 'Keyboard accessible',
    children: <Button>Focus me</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    button.focus();

    await new Promise((resolve) => setTimeout(resolve, 300));

    const tooltip = document.querySelector('.muka-tooltip__content');
    expect(tooltip).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests that tooltip shows on keyboard focus for accessibility.',
      },
    },
  },
};
