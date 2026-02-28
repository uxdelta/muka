import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, fn } from 'storybook/test';
import { EmptyState } from './EmptyState';
import { Icon } from '../Icon';
import { verifyThemeLoaded } from '../../.storybook/theme-test-utils';
import './EmptyState.css';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/Display/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# EmptyState Component

The EmptyState component displays zero-state UI when no data is available.

## Features
- Icon or custom illustration support
- Primary and secondary actions
- Three size variants (sm, md, lg)
- Center or left alignment
- Multi-brand/theme support through design tokens

## Token Architecture
This component uses the following token layers:
- **Component tokens**: \`emptystate.container.padding.{size}\`, \`emptystate.icon.color\`
- **Semantic tokens**: \`color.text.default\`, \`color.text.muted\`
- **Button tokens**: Reuses existing button tokens for actions

## Accessibility
- Uses \`role="status"\` for dynamic empty states
- Illustrations should have empty \`alt=""\` (decorative)
- Action buttons fully keyboard accessible
- Proper heading hierarchy with h3 for title
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant - affects padding and icon size',
    },
    align: {
      control: { type: 'radio' },
      options: ['center', 'left'],
      description: 'Content alignment',
    },
    title: {
      control: { type: 'text' },
      description: 'Main title text (required)',
    },
    description: {
      control: { type: 'text' },
      description: 'Optional description text',
    },
  },
  args: {
    title: 'No data',
    description: 'There is nothing to display yet.',
    size: 'md',
    align: 'center',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'No data',
    description: 'There is nothing to display yet.',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Icon name="folder-open" variant="line" size="lg" />,
    title: 'No documents yet',
    description: 'Upload your first document to get started.',
  },
};

export const WithIllustration: Story = {
  render: () => (
    <EmptyState
      illustration={
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="50" fill="var(--color-surface-level2)" />
          <path
            d="M40 50h40M40 60h30M40 70h35"
            stroke="var(--color-border-default)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      }
      title="No projects"
      description="Create your first project to begin tracking."
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'EmptyState with a custom illustration instead of an icon.',
      },
    },
  },
};

export const WithPrimaryAction: Story = {
  args: {
    icon: <Icon name="file-add" variant="line" size="lg" />,
    title: 'No documents yet',
    description: 'Upload your first document to get started.',
    primaryAction: {
      label: 'Upload document',
      onClick: fn(),
    },
  },
};

export const WithBothActions: Story = {
  args: {
    icon: <Icon name="search" variant="line" size="lg" />,
    title: 'No results found',
    description: 'Try adjusting your search or filter criteria.',
    primaryAction: {
      label: 'Clear filters',
      onClick: fn(),
    },
    secondaryAction: {
      label: 'View all',
      onClick: fn(),
    },
  },
};

export const WithActionIcon: Story = {
  args: {
    icon: <Icon name="upload" variant="line" size="lg" />,
    title: 'No files uploaded',
    description: 'Drag and drop files or click to browse.',
    primaryAction: {
      label: 'Upload files',
      onClick: fn(),
      icon: <Icon name="upload" variant="line" size="sm" />,
    },
  },
};

export const SmallSize: Story = {
  args: {
    icon: <Icon name="inbox" variant="line" size="sm" />,
    title: 'No messages',
    description: 'You have no new messages.',
    size: 'sm',
  },
};

export const MediumSize: Story = {
  args: {
    icon: <Icon name="folder" variant="line" size="md" />,
    title: 'No documents',
    description: 'Upload your first document.',
    size: 'md',
  },
};

export const LargeSize: Story = {
  args: {
    icon: <Icon name="file" variant="line" size="lg" />,
    title: 'No content available',
    description: 'Start by creating your first item.',
    size: 'lg',
    primaryAction: {
      label: 'Create item',
      onClick: fn(),
    },
  },
};

export const LeftAligned: Story = {
  args: {
    icon: <Icon name="user" variant="line" size="lg" />,
    title: 'No team members',
    description: 'Invite your first team member to collaborate.',
    align: 'left',
    primaryAction: {
      label: 'Invite member',
      onClick: fn(),
    },
    secondaryAction: {
      label: 'Learn more',
      onClick: fn(),
    },
  },
};

export const CenterAligned: Story = {
  args: {
    icon: <Icon name="star" variant="line" size="lg" />,
    title: 'No favorites',
    description: 'Mark items as favorites to see them here.',
    align: 'center',
  },
};

export const SearchResults: Story = {
  args: {
    icon: <Icon name="search" variant="line" size="lg" />,
    title: 'No results found',
    description: 'Try adjusting your search or filter criteria.',
    secondaryAction: {
      label: 'Clear filters',
      onClick: fn(),
    },
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'EmptyState for search results with no matches.',
      },
    },
  },
};

export const TableEmptyState: Story = {
  render: () => (
    <div style={{ 
      border: '1px solid var(--color-border-default)',
      borderRadius: 'var(--border-radius-md)',
      padding: 'var(--spacing-4)',
      backgroundColor: 'var(--color-surface-level0)'
    }}>
      <EmptyState
        icon={<Icon name="table" variant="line" size="md" />,}
        title="No data"
        description="Add items to see them here."
        size="sm"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'EmptyState used within a table component.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h3 style={{ color: 'var(--color-text-default-default)', marginBottom: '1rem' }}>
          Size Variants
        </h3>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <EmptyState
              icon={<Icon name="folder" variant="line" size="sm" />}
              title="Small"
              description="Small size variant"
              size="sm"
            />
          </div>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <EmptyState
              icon={<Icon name="folder" variant="line" size="md" />}
              title="Medium"
              description="Medium size variant"
              size="md"
            />
          </div>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <EmptyState
              icon={<Icon name="folder" variant="line" size="lg" />}
              title="Large"
              description="Large size variant"
              size="lg"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ color: 'var(--color-text-default-default)', marginBottom: '1rem' }}>
          Alignment Variants
        </h3>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <EmptyState
              icon={<Icon name="align-center" variant="line" size="md" />}
              title="Center Aligned"
              description="Content is centered"
              align="center"
            />
          </div>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <EmptyState
              icon={<Icon name="align-left" variant="line" size="md" />}
              title="Left Aligned"
              description="Content is left aligned"
              align="left"
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Overview of all EmptyState variants.',
      },
    },
  },
};

export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h4 style={{ color: 'var(--color-text-default-default)', marginBottom: '1rem' }}>
          File Upload
        </h4>
        <EmptyState
          icon={<Icon name="upload" variant="line" size="lg" />}
          title="No files uploaded"
          description="Drag and drop files or click to browse."
          primaryAction={{
            label: 'Upload files',
            onClick: () => console.log('Upload clicked'),
            icon: <Icon name="upload" variant="line" size="sm" />,
          }}
        />
      </div>

      <div>
        <h4 style={{ color: 'var(--color-text-default-default)', marginBottom: '1rem' }}>
          Empty Inbox
        </h4>
        <EmptyState
          icon={<Icon name="mail" variant="line" size="lg" />}
          title="All caught up!"
          description="You have no new messages."
          size="md"
        />
      </div>

      <div>
        <h4 style={{ color: 'var(--color-text-default-default)', marginBottom: '1rem' }}>
          New Project
        </h4>
        <EmptyState
          icon={<Icon name="add-circle" variant="line" size="lg" />}
          title="No projects yet"
          description="Create your first project to get started."
          primaryAction={{
            label: 'Create project',
            onClick: () => console.log('Create clicked'),
          }}
          secondaryAction={{
            label: 'Learn more',
            onClick: () => console.log('Learn more clicked'),
          }}
          align="center"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        story: 'Real-world usage examples of the EmptyState component.',
      },
    },
  },
};

export const ThemeDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-default-default)' }}>
          🎨 Brand & Theme Demonstration
        </h3>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-muted-default)' }}>
          Use the toolbar above to switch brands and themes! Notice how the EmptyState
          automatically adapts to different brand personalities and color schemes.
        </p>
      </div>
      
      <EmptyState
        icon={<Icon name="folder-open" variant="line" size="lg" />}
        title="No documents found"
        description="Upload your first document to get started with your project."
        primaryAction={{
          label: 'Upload document',
          onClick: () => console.log('Upload'),
        }}
        secondaryAction={{
          label: 'Browse templates',
          onClick: () => console.log('Browse'),
        }}
      />
      
      <div style={{ 
        padding: 'var(--spacing-4)', 
        backgroundColor: 'var(--color-surface-level1)', 
        borderRadius: 'var(--border-radius-md)',
        border: '1px solid var(--color-border-default)'
      }}>
        <p style={{ 
          color: 'var(--color-text-muted-default)', 
          fontSize: 'var(--text-size-sm)', 
          margin: '0',
          lineHeight: '1.5'
        }}>
          💡 <strong>Pro tip:</strong> Notice how colors, spacing, and typography change 
          when you switch brands/themes, but the component structure and accessibility 
          features remain consistent!
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: `
## Brand & Theme Switching

This story demonstrates how the token architecture enables seamless brand and theme switching.

### Try switching between:
- **🎨 Muka**: Creative indigo palette
- **📐 Wireframe**: Professional gray palette
- **☀️ Light**: Bright backgrounds
- **🌙 Dark**: Dark backgrounds

The EmptyState component uses semantic tokens that automatically adapt to each combination.
        `,
      },
    },
  },
};

export const Playground: Story = {
  args: {
    icon: <Icon name="folder" variant="line" size="md" />,
    title: 'No items',
    description: 'Try different combinations using the controls below.',
    size: 'md',
    align: 'center',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - try different combinations of props!',
      },
    },
  },
};

// ============================================================================
// INTERACTION TESTS WITH PLAY FUNCTIONS
// ============================================================================

export const InteractionTest: Story = {
  tags: ['test'],
  args: {
    icon: <Icon name="folder" variant="line" size="md" />,
    title: 'No items',
    description: 'Click the button to test interaction.',
    primaryAction: {
      label: 'Primary Action',
      onClick: fn(),
    },
    secondaryAction: {
      label: 'Secondary Action',
      onClick: fn(),
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const primaryButton = canvas.getByText('Primary Action');
    const secondaryButton = canvas.getByText('Secondary Action');

    await userEvent.click(primaryButton);
    expect(args.primaryAction?.onClick).toHaveBeenCalledTimes(1);

    await userEvent.click(secondaryButton);
    expect(args.secondaryAction?.onClick).toHaveBeenCalledTimes(1);
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests button click interactions.',
      },
    },
  },
};

export const AccessibilityTest: Story = {
  tags: ['test'],
  args: {
    icon: <Icon name="folder" variant="line" size="md" />,
    title: 'No data',
    description: 'Accessibility test',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emptyState = canvasElement.querySelector('.muka-emptystate');
    expect(emptyState).toHaveAttribute('role', 'status');

    const title = canvas.getByText('No data');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H3');
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests accessibility features like role and heading hierarchy.',
      },
    },
  },
};

export const ThemeTokenValidation: Story = {
  tags: ['test', 'theme'],
  args: {
    icon: <Icon name="folder" variant="line" size="md" />,
    title: 'Token validation',
    description: 'Verifying design tokens',
  },
  play: async ({ canvasElement, globals }) => {
    verifyThemeLoaded(globals);

    const emptyState = canvasElement.querySelector('.muka-emptystate');
    expect(emptyState).toBeInTheDocument();

    const styles = window.getComputedStyle(emptyState!);
    expect(styles.display).toBe('flex');
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests that the component properly uses design tokens from the theme system.',
      },
    },
  },
};
