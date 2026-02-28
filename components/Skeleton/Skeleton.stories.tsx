import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard } from './index';
import { verifyThemeLoaded, verifyUsesTokens } from '../../.storybook/theme-test-utils';
import './Skeleton.css';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Skeleton Component

Loading state placeholders with pulse and wave animations.

## Features
- Multiple shape variants (rectangular, circular, rounded)
- Pulse and wave animations
- Respects prefers-reduced-motion
- Fully customizable dimensions
- Compound components for common patterns (Text, Avatar, Card)

## Token Architecture
This component uses the following token layers:
- **Component tokens**: \`skeleton.background\`, \`skeleton.highlight\`
- **Semantic tokens**: \`color.surface.muted\`, \`color.surface.subtle\`
- **Animation tokens**: \`skeleton.animation.duration\`, \`skeleton.animation.timingFunction\`

## Accessibility
- All skeleton elements have \`aria-hidden="true"\` (decorative)
- Wrap in container with \`aria-busy="true"\`
- Parent should have \`role="status"\` for screen readers
- Respects \`prefers-reduced-motion\` user preference
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['rectangular', 'circular', 'rounded'],
      description: 'Shape variant',
    },
    animation: {
      control: { type: 'radio' },
      options: ['pulse', 'wave', 'none'],
      description: 'Animation type',
    },
    width: {
      control: { type: 'text' },
      description: 'Width (string or number)',
    },
    height: {
      control: { type: 'text' },
      description: 'Height (string or number)',
    },
  },
  args: {
    variant: 'rectangular',
    animation: 'pulse',
    width: '200px',
    height: '20px',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Shapes
export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 200,
    height: 20,
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: 200,
    height: 20,
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 40,
    height: 40,
  },
};

// Animations
export const PulseAnimation: Story = {
  args: {
    animation: 'pulse',
    width: 200,
    height: 20,
  },
  parameters: {
    docs: {
      description: {
        story: 'Pulse animation fades opacity in and out',
      },
    },
  },
};

export const WaveAnimation: Story = {
  args: {
    animation: 'wave',
    width: 200,
    height: 20,
  },
  parameters: {
    docs: {
      description: {
        story: 'Wave animation creates a shimmer effect',
      },
    },
  },
};

export const NoAnimation: Story = {
  args: {
    animation: 'none',
    width: 200,
    height: 20,
  },
  parameters: {
    docs: {
      description: {
        story: 'No animation for static placeholder',
      },
    },
  },
};

// Sizes showcase
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <Skeleton width={400} height={12} variant="rounded" />
      <Skeleton width={350} height={16} variant="rounded" />
      <Skeleton width={300} height={20} variant="rounded" />
      <Skeleton width={250} height={24} variant="rounded" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different sizes for various content types',
      },
    },
  },
};

// SkeletonText Examples
export const TextPlaceholder: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <SkeletonText lines={3} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text placeholder with 3 lines',
      },
    },
  },
};

export const TextWithCustomLastLine: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <SkeletonText lines={4} lastLineWidth="60%" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text placeholder with custom last line width for natural appearance',
      },
    },
  },
};

export const TextTightSpacing: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <SkeletonText lines={3} spacing="tight" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text placeholder with tight line spacing',
      },
    },
  },
};

// SkeletonAvatar Examples
export const AvatarSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <SkeletonAvatar size="xs" />
      <SkeletonAvatar size="sm" />
      <SkeletonAvatar size="md" />
      <SkeletonAvatar size="lg" />
      <SkeletonAvatar size="xl" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar placeholders in all sizes (xs, sm, md, lg, xl)',
      },
    },
  },
};

// SkeletonCard Examples
export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ width: '343px' }}>
      <SkeletonCard />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete card placeholder with image, text, and actions',
      },
    },
  },
};

export const CardWithoutImage: Story = {
  render: () => (
    <div style={{ width: '343px' }}>
      <SkeletonCard showImage={false} lines={2} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card placeholder without image',
      },
    },
  },
};

export const CardWithoutActions: Story = {
  render: () => (
    <div style={{ width: '343px' }}>
      <SkeletonCard showActions={false} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card placeholder without action buttons',
      },
    },
  },
};

// Real-world Examples
export const PropertyCardExample: Story = {
  render: () => (
    <div 
      style={{ 
        width: '343px',
        padding: '16px',
        backgroundColor: 'var(--color-surface-level1)',
        borderRadius: 'var(--border-radius-lg)',
        border: '1px solid var(--color-border-default)',
      }}
      role="status"
      aria-busy="true"
      aria-label="Loading property card"
    >
      <Skeleton variant="rounded" height={180} width="100%" style={{ marginBottom: 16 }} />
      <div style={{ padding: '0 8px' }}>
        <Skeleton width="60%" height={24} variant="rounded" style={{ marginBottom: 8 }} />
        <SkeletonText lines={2} spacing="normal" />
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <Skeleton width={80} height={32} variant="rounded" />
          <Skeleton width={80} height={32} variant="rounded" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Real-world example: Property card loading state with proper accessibility',
      },
    },
  },
};

export const UserProfileExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        width: '400px',
      }}
      role="status"
      aria-busy="true"
      aria-label="Loading user profile"
    >
      <SkeletonAvatar size="lg" />
      <div style={{ flex: 1 }}>
        <Skeleton width="120px" height={20} variant="rounded" style={{ marginBottom: 8 }} />
        <SkeletonText lines={2} lastLineWidth="80%" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: User profile loading state',
      },
    },
  },
};

export const ListExample: Story = {
  render: () => (
    <div 
      style={{ 
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
      role="status"
      aria-busy="true"
      aria-label="Loading list"
    >
      {Array(4).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <SkeletonAvatar size="md" />
          <div style={{ flex: 1 }}>
            <Skeleton width="40%" height={16} variant="rounded" style={{ marginBottom: 6 }} />
            <Skeleton width="60%" height={14} variant="rounded" />
          </div>
          <Skeleton width={60} height={32} variant="rounded" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: List of items loading state',
      },
    },
  },
};

export const FormExample: Story = {
  render: () => (
    <div
      style={{
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
      role="status"
      aria-busy="true"
      aria-label="Loading form"
    >
      <div>
        <Skeleton width="80px" height={16} variant="rounded" style={{ marginBottom: 8 }} />
        <Skeleton width="100%" height={40} variant="rounded" />
      </div>
      <div>
        <Skeleton width="120px" height={16} variant="rounded" style={{ marginBottom: 8 }} />
        <Skeleton width="100%" height={40} variant="rounded" />
      </div>
      <div>
        <Skeleton width="100px" height={16} variant="rounded" style={{ marginBottom: 8 }} />
        <Skeleton width="100%" height={80} variant="rounded" />
      </div>
      <Skeleton width="100%" height={48} variant="rounded" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: Form loading state',
      },
    },
  },
};

// Animation comparison
export const AnimationComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '400px' }}>
      <div>
        <h4 style={{ color: 'var(--color-text-default-default)', marginBottom: '1rem' }}>
          Pulse Animation
        </h4>
        <SkeletonText lines={3} animation="pulse" />
      </div>
      <div>
        <h4 style={{ color: 'var(--color-text-default-default)', marginBottom: '1rem' }}>
          Wave Animation
        </h4>
        <SkeletonText lines={3} animation="wave" />
      </div>
      <div>
        <h4 style={{ color: 'var(--color-text-default-default)', marginBottom: '1rem' }}>
          No Animation
        </h4>
        <SkeletonText lines={3} animation="none" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Side-by-side comparison of all animation types',
      },
    },
  },
};

// Theme Demo
export const ThemeDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '400px' }}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-default-default)' }}>
          🎨 Brand & Theme Demonstration
        </h3>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-subtle-default)' }}>
          Use the toolbar above to switch brands and themes! Notice how skeleton colors 
          automatically adapt to maintain proper contrast.
        </p>
      </div>
      
      <SkeletonCard />
      
      <div style={{ 
        padding: 'var(--spacing-4)', 
        backgroundColor: 'var(--color-surface-level1)', 
        borderRadius: 'var(--border-radius-md)',
        border: '1px solid var(--color-border-default)'
      }}>
        <p style={{ 
          color: 'var(--color-text-subtle-default)', 
          fontSize: 'var(--text-size-sm)', 
          margin: '0',
          lineHeight: '1.5'
        }}>
          💡 <strong>Token Architecture:</strong><br/>
          Skeleton uses \`color.surface.muted\` and \`color.surface.subtle\` tokens,
          ensuring proper contrast across all brand/theme combinations.
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Demonstrates how Skeleton adapts to different brands and themes',
      },
    },
  },
};

// Playground
export const Playground: Story = {
  args: {
    variant: 'rounded',
    animation: 'pulse',
    width: '300px',
    height: '20px',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - try different combinations of props!',
      },
    },
  },
};

// Interaction Tests
export const ThemeTokenValidation: Story = {
  tags: ['test', 'theme'],
  args: {
    variant: 'rounded',
    width: 200,
    height: 20,
  },
  play: async ({ canvasElement, globals }) => {
    const canvas = within(canvasElement);

    verifyThemeLoaded(globals);

    const skeleton = canvasElement.querySelector('.muka-skeleton');
    expect(skeleton).toBeInTheDocument();

    verifyUsesTokens(skeleton as HTMLElement, [
      'skeleton-background',
      'skeleton-animation-duration',
      'skeleton-animation-timingFunction',
    ]);

    const styles = window.getComputedStyle(skeleton as HTMLElement);
    expect(styles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests that Skeleton properly uses design tokens from the theme system.',
      },
    },
  },
};

export const AccessibilityTest: Story = {
  tags: ['test'],
  render: () => (
    <div role="status" aria-busy="true" aria-label="Loading content">
      <Skeleton width={200} height={20} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector('[role="status"]');
    expect(container).toHaveAttribute('aria-busy', 'true');
    expect(container).toHaveAttribute('aria-label', 'Loading content');

    const skeleton = canvasElement.querySelector('.muka-skeleton');
    expect(skeleton).toHaveAttribute('aria-hidden', 'true');
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests proper accessibility attributes',
      },
    },
  },
};
