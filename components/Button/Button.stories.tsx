import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Mock icon component for stories
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 3.5a.5.5 0 0 0-1 0V7H3.5a.5.5 0 0 0 0 1H7v3.5a.5.5 0 0 0 1 0V8h3.5a.5.5 0 0 0 0-1H8V3.5z"/>
  </svg>
);

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="m6 8 4-4v8l-4-4z"/>
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Button Component

The Button component is built using the Muka design token system with support for:
- 3 variants: primary, secondary, ghost
- 3 sizes: sm, md, lg  
- Interactive states: default, hover, pressed, disabled
- Icons with flexible positioning (left, right, or both)
- Icon-only buttons with accessible labels
- Consistent spacing distribution
- Multi-brand theming through design tokens

## Modern Icon API
- **iconLeft**: Icon for left side
- **iconRight**: Icon for right side  
- **iconOnly**: Hide label text (maintains accessibility)

## Token Architecture
This component uses the following token layers:
- **Component tokens**: \`button.color.{variant}.background.{state}\`
- **Semantic tokens**: \`color.action.default\`, \`color.surface.level2\`
- **Alias tokens**: \`alias.color.brand.primary\`, \`alias.font.brand.family\`
- **Primitive tokens**: \`color.gray.9\`, \`spacing.3\`

When you change brand colors in the alias layer, all buttons automatically update!
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'ghost'],
      description: 'Button variant - like Figma component variants',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant - matches your token system',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Full width button',
    },
    iconLeft: {
      control: { type: 'select' },
      options: ['none', 'plus', 'chevron'],
      description: 'Icon for left side',
      mapping: {
        none: undefined,
        plus: <PlusIcon />,
        chevron: <ChevronIcon />,
      },
    },
    iconRight: {
      control: { type: 'select' },
      options: ['none', 'plus', 'chevron'],
      description: 'Icon for right side',
      mapping: {
        none: undefined,
        plus: <PlusIcon />,
        chevron: <ChevronIcon />,
      },
    },
    iconOnly: {
      control: { type: 'boolean' },
      description: 'Hide label text for icon-only button',
    },
    children: {
      control: { type: 'text' },
      description: 'Button content',
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false,
    iconLeft: 'none',
    iconRight: 'none',
    iconOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants - like Figma's main component states
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

// Size variants
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

// State variants
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};

// Icon variants
export const WithIconLeft: Story = {
  args: {
    iconLeft: 'plus',
    children: 'Add Item',
  },
};

export const WithIconRight: Story = {
  args: {
    iconRight: 'chevron',
    children: 'Continue',
  },
};

export const WithoutIcon: Story = {
  args: {
    iconLeft: 'none',
    iconRight: 'none',
    children: 'No Icon Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button without any icon - clean and minimal',
      },
    },
  },
};

export const IconOnly: Story = {
  args: {
    iconLeft: 'plus',
    iconOnly: true,
    children: 'Add Item', // Still needed for accessibility
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon-only button with hidden label text. Label is still provided for accessibility but visually hidden.',
      },
    },
  },
};

export const IconOnlyShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <h4 style={{ color: 'var(--color-text-default-default)', margin: '0' }}>
        🎯 Icon-Only Button Examples
      </h4>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button 
          variant="primary" 
          iconLeft={<PlusIcon />} 
          iconOnly={true}
        >
          Add
        </Button>
        
        <Button 
          variant="secondary" 
          iconRight={<ChevronIcon />} 
          iconOnly={true}
        >
          Next
        </Button>
        
        <Button 
          variant="ghost" 
          iconLeft={<PlusIcon />} 
          iconOnly={true}
        >
          Create
        </Button>
        
        {/* Size variations */}
        <Button 
          variant="primary" 
          size="sm"
          iconLeft={<PlusIcon />} 
          iconOnly={true}
        >
          Add
        </Button>
        
        <Button 
          variant="primary" 
          size="lg"
          iconLeft={<PlusIcon />} 
          iconOnly={true}
        >
          Add
        </Button>
      </div>
      
      <div style={{ 
        padding: 'var(--spacing-3)', 
        backgroundColor: 'var(--color-surface-level1)', 
        borderRadius: 'var(--border-radius-sm)',
        marginTop: '1rem'
      }}>
        <p style={{ 
          color: 'var(--color-text-subtle-default)', 
          fontSize: 'var(--text-size-sm)', 
          margin: '0',
          lineHeight: '1.5'
        }}>
          💡 <strong>Icon-only best practices:</strong><br/>
          • Always provide children text for screen readers<br/>
          • Use consistent sizing (icons are square by nature)<br/>
          • Perfect for toolbars, floating action buttons, or space-constrained UI<br/>
          • Ensure sufficient touch target size (44px minimum)
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        story: `
## Icon-Only Buttons

Icon-only buttons hide the label text while maintaining accessibility and consistent spacing.

### Usage:
\`\`\`tsx
<Button 
  iconLeft={<Plus />} 
  iconOnly={true}
>
  Add Item
</Button>
\`\`\`

### Key Features:
- **Accessibility**: Label text still provided for screen readers
- **Consistent Spacing**: Same padding as regular buttons
- **Size Variants**: Works with all button sizes
- **Clean API**: Single \`iconOnly\` prop controls visibility
        `,
      },
    },
  },
};

export const WithBothIcons: Story = {
  args: {
    iconLeft: 'plus',
    iconRight: 'chevron',
    children: 'Add & Continue',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with icons on both sides - great for composite actions like "Add & Continue" or "Save & Next"',
      },
    },
  },
};

export const LeftRightIconsShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <h4 style={{ color: 'var(--color-text-default-default)', margin: '0' }}>
        🎯 Dual Icon Examples
      </h4>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button 
          variant="primary" 
          iconLeft={<PlusIcon />} 
          iconRight={<ChevronIcon />}
        >
          Add & Continue
        </Button>
        
        <Button 
          variant="secondary" 
          iconLeft={<PlusIcon />}
        >
          Add Item
        </Button>
        
        <Button 
          variant="ghost" 
          iconRight={<ChevronIcon />}
        >
          Next Step
        </Button>
        
        <Button 
          variant="primary" 
          iconLeft={<PlusIcon />} 
          iconRight={<PlusIcon />}
        >
          Duplicate
        </Button>
      </div>
      
      <div style={{ 
        padding: 'var(--spacing-3)', 
        backgroundColor: 'var(--color-surface-level1)', 
        borderRadius: 'var(--border-radius-sm)',
        marginTop: '1rem'
      }}>
        <p style={{ 
          color: 'var(--color-text-subtle-default)', 
          fontSize: 'var(--text-size-sm)', 
          margin: '0',
          lineHeight: '1.5'
        }}>
          💡 <strong>Usage patterns:</strong><br/>
          • Left + Right: Composite actions (Add & Continue, Save & Exit)<br/>
          • Left only: Primary action with context (Add Item, Delete File)<br/>
          • Right only: Navigation or progression (Next Step, Continue)<br/>
          • Same icon both sides: Emphasis or symmetry (Duplicate, Mirror)
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        story: `
## Dual Icon Patterns

The Button component now supports separate \`iconLeft\` and \`iconRight\` props for maximum flexibility:

### API Priority:
1. **\`iconLeft\` + \`iconRight\`**: Takes precedence (new API)
2. **\`icon\` + \`iconPosition\`**: Fallback for backward compatibility

### Use Cases:
- **Composite Actions**: "Add & Continue", "Save & Exit" 
- **Directional Actions**: "← Back" and "Next →" in the same interface
- **Action + Status**: "Download ↓" with loading spinner →
- **Symmetric Design**: Same icon on both sides for visual balance

### Implementation:
\`\`\`tsx
// Both sides
<Button iconLeft={<Plus />} iconRight={<Arrow />}>
  Add & Continue
</Button>

// Left only (same as icon="left")
<Button iconLeft={<Plus />}>
  Add Item
</Button>

// Right only (same as icon="right")  
<Button iconRight={<Arrow />}>
  Continue
</Button>
\`\`\`
        `,
      },
    },
  },
};

// Real-world examples
export const CallToAction: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Sign Up Now',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary CTA button - use sparingly, max 1-2 per screen',
      },
    },
  },
};

export const FormSubmit: Story = {
  args: {
    variant: 'primary',
    type: 'submit',
    fullWidth: true,
    children: 'Submit Form',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Form submit button with full width for mobile-first design',
      },
    },
  },
};

export const Navigation: Story = {
  args: {
    variant: 'ghost',
    size: 'sm',
    children: 'Learn More',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ghost button for navigation and tertiary actions',
      },
    },
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary" size="sm">Primary SM</Button>
      <Button variant="primary" size="md">Primary MD</Button>
      <Button variant="primary" size="lg">Primary LG</Button>
      <Button variant="secondary" size="sm">Secondary SM</Button>
      <Button variant="secondary" size="md">Secondary MD</Button>
      <Button variant="secondary" size="lg">Secondary LG</Button>
      <Button variant="ghost" size="sm">Ghost SM</Button>
      <Button variant="ghost" size="md">Ghost MD</Button>
      <Button variant="ghost" size="lg">Ghost LG</Button>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Overview of all button variants and sizes',
      },
    },
  },
};

// Interactive playground
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Playground Button',
    iconLeft: 'plus',
    iconRight: 'none',
    iconOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - try different combinations of props! Use the controls below to test different icon options, icon-only mode, and all variants.',
      },
    },
  },
};

// Brand & Theme demonstration
export const ThemeDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-default-default)' }}>
          🎨 Brand & Theme Demonstration
        </h3>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-subtle-default)' }}>
          Use the toolbar above to switch brands and themes! Notice how the same components 
          automatically adapt to different brand personalities and color schemes.
        </p>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button variant="primary" size="lg">Primary CTA</Button>
        <Button variant="secondary" size="lg">Secondary</Button>
        <Button variant="ghost" size="lg">Ghost Button</Button>
      </div>
      
      <div style={{ 
        padding: 'var(--spacing-4)', 
        backgroundColor: 'var(--color-surface-level1)', 
        borderRadius: 'var(--border-radius-md)',
        border: '1px solid var(--color-border-default)'
      }}>
        <h4 style={{ 
          color: 'var(--color-text-default-default)', 
          margin: '0 0 1rem 0',
          fontSize: 'var(--text-size-md)'
        }}>
          Token Architecture in Action
        </h4>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <Button variant="primary">Uses color.action.default</Button>
          <Button variant="secondary">Uses color.surface.level2</Button>
        </div>
        <p style={{ 
          color: 'var(--color-text-subtle-default)', 
          fontSize: 'var(--text-size-sm)', 
          margin: '0',
          lineHeight: '1.5'
        }}>
          💡 <strong>Pro tip:</strong> Notice how colors change when you switch brands/themes, 
          but the relationships and contrast ratios stay consistent! This is the power of the 
          alias layer in action.
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

This story demonstrates how your token architecture enables seamless brand and theme switching:

### Current Token Chain:
\`\`\`
button.color.primary.background.default
  → color.action.default  
  → alias.color.accent.default
  → [brand/theme specific color]
\`\`\`

### Brand Differences:
- **🎨 Muka**: Uses indigo color palette, modern personality, designed for creative professionals
- **⚪ WhiteLabel**: Uses gray palette, neutral professional look, designed for enterprise clients

### Theme Differences:  
- **☀️ Light**: Bright backgrounds, dark text, optimized for daytime use
- **🌙 Dark**: Dark backgrounds, light text, reduced eye strain for night work

### AI-IDE Integration:
The toolbar controls make it easy to test your components across all brand/theme combinations, 
ensuring your design system works perfectly for different use cases and user preferences.

**Try switching between combinations using the Brand and Theme controls in the toolbar above!**
        `,
      },
    },
  },
};

export const BrandComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div 
        data-brand="muka" 
        data-theme="light" 
        style={{ 
          padding: '1.5rem', 
          border: '2px solid var(--color-border-default)', 
          borderRadius: 'var(--border-radius-lg)',
          backgroundColor: 'var(--color-surface-level0)'
        }}
      >
        <h4 style={{ color: 'var(--color-text-default-default)', margin: '0 0 1rem 0' }}>
          🎨 Muka Brand
        </h4>
        <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
          <Button variant="primary" size="md">Primary Action</Button>
          <Button variant="secondary" size="md">Secondary Action</Button>
          <Button variant="ghost" size="md">Tertiary Action</Button>
        </div>
        <p style={{ 
          color: 'var(--color-text-subtle-default)', 
          fontSize: 'var(--text-size-sm)', 
          margin: '1rem 0 0 0' 
        }}>
          Modern, creative, indigo-based palette
        </p>
      </div>
      
      <div 
        data-brand="whitelabel" 
        data-theme="light" 
        style={{ 
          padding: '1.5rem', 
          border: '2px solid var(--color-border-default)', 
          borderRadius: 'var(--border-radius-lg)',
          backgroundColor: 'var(--color-surface-level0)'
        }}
      >
        <h4 style={{ color: 'var(--color-text-default-default)', margin: '0 0 1rem 0' }}>
          ⚪ WhiteLabel Brand
        </h4>
        <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
          <Button variant="primary" size="md">Primary Action</Button>
          <Button variant="secondary" size="md">Secondary Action</Button>
          <Button variant="ghost" size="md">Tertiary Action</Button>
        </div>
        <p style={{ 
          color: 'var(--color-text-subtle-default)', 
          fontSize: 'var(--text-size-sm)', 
          margin: '1rem 0 0 0' 
        }}>
          Professional, neutral, gray-based palette
        </p>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    layout: 'padded',
    docs: {
      description: {
        story: `
## Side-by-Side Brand Comparison

This story shows both brands using the same components simultaneously. 

**Key Observations:**
- Same component code, different visual personalities
- Consistent spacing, typography, and interaction patterns
- Brand-specific color palettes applied through the alias layer
- Perfect for client presentations and design system documentation

This demonstrates how a single component library can serve multiple brands effectively.
        `,
      },
    },
  },
};

export const TokenUsageGuide: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
      <div>
        <h3 style={{ color: 'var(--color-text-default-default)', margin: '0 0 1rem 0' }}>
          🔗 Token Usage Guide for AI-IDEs
        </h3>
        <p style={{ color: 'var(--color-text-subtle-default)', margin: '0 0 2rem 0' }}>
          Here's how to understand and use the token relationships in AI-powered development:
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem' 
      }}>
        {/* Token Chain Examples */}
        <div style={{ 
          padding: 'var(--spacing-4)', 
          backgroundColor: 'var(--color-surface-level1)', 
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid var(--color-border-default)'
        }}>
          <h4 style={{ color: 'var(--color-text-default-default)', margin: '0 0 1rem 0' }}>
            Primary Button
          </h4>
          <Button variant="primary" size="md">Click me</Button>
          <div style={{ marginTop: '1rem', fontSize: 'var(--text-size-sm)' }}>
            <strong style={{ color: 'var(--color-text-default-default)' }}>Token Chain:</strong>
            <br />
            <code style={{ 
              color: 'var(--color-text-subtle-default)', 
              backgroundColor: 'var(--color-surface-level0)',
              padding: '0.25rem',
              borderRadius: 'var(--border-radius-sm)',
              fontSize: '0.8rem',
              display: 'block',
              marginTop: '0.5rem',
              lineHeight: '1.4'
            }}>
              button.color.primary.background.default<br />
              → color.action.default<br />
              → alias.color.accent.default<br />
              → [theme-specific color]
            </code>
          </div>
        </div>

        <div style={{ 
          padding: 'var(--spacing-4)', 
          backgroundColor: 'var(--color-surface-level1)', 
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid var(--color-border-default)'
        }}>
          <h4 style={{ color: 'var(--color-text-default-default)', margin: '0 0 1rem 0' }}>
            Secondary Button
          </h4>
          <Button variant="secondary" size="md">Click me</Button>
          <div style={{ marginTop: '1rem', fontSize: 'var(--text-size-sm)' }}>
            <strong style={{ color: 'var(--color-text-default-default)' }}>Token Chain:</strong>
            <br />
            <code style={{ 
              color: 'var(--color-text-subtle-default)', 
              backgroundColor: 'var(--color-surface-level0)',
              padding: '0.25rem',
              borderRadius: 'var(--border-radius-sm)',
              fontSize: '0.8rem',
              display: 'block',
              marginTop: '0.5rem',
              lineHeight: '1.4'
            }}>
              button.color.secondary.background.default<br />
              → color.surface.level2<br />
              → alias.color.neutral.2<br />
              → [theme-specific color]
            </code>
          </div>
        </div>
      </div>

      <div style={{ 
        padding: 'var(--spacing-4)', 
        backgroundColor: 'var(--color-surface-level1)', 
        borderRadius: 'var(--border-radius-md)',
        border: '1px solid var(--color-border-default)'
      }}>
        <h4 style={{ color: 'var(--color-text-default-default)', margin: '0 0 1rem 0' }}>
          🤖 AI Instructions for Token Usage
        </h4>
        <div style={{ 
          color: 'var(--color-text-subtle-default)', 
          fontSize: 'var(--text-size-sm)',
          lineHeight: '1.6'
        }}>
          <p><strong>When creating new components:</strong></p>
          <ul>
            <li>Always use component-layer tokens first (e.g., <code>button.color.primary.*</code>)</li>
            <li>Fall back to semantic tokens for common patterns (e.g., <code>color.action.default</code>)</li>
            <li>Never reference primitive tokens directly in components</li>
            <li>Use CSS custom properties: <code>var(--token-name)</code></li>
          </ul>
          
          <p><strong>Multi-brand considerations:</strong></p>
          <ul>
            <li>Test components with both brands using Storybook toolbar</li>
            <li>Ensure contrast ratios work in all theme combinations</li>
            <li>Use alias layer tokens for brand-specific customizations</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: `
## Token Architecture for AI Development

This story is specifically designed for AI-IDE integration and developer education.

### Copy-Paste Code Examples:

**Basic Button Usage:**
\`\`\`tsx
<Button variant="primary" size="md">
  Primary Action
</Button>
\`\`\`

**With Custom Styling:**
\`\`\`tsx
<Button 
  variant="primary" 
  style={{
    backgroundColor: 'var(--button-color-primary-background-default)',
    color: 'var(--button-color-primary-text-default)',
    borderRadius: 'var(--button-radius-md)'
  }}
>
  Custom Button
</Button>
\`\`\`

### AI Prompt Examples:
- "Create a button component using the Muka design tokens"
- "Make this button match the secondary variant from our design system"
- "Apply proper semantic tokens for an action button"
        `,
      },
    },
  },
};
