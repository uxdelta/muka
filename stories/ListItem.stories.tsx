import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from '../components/ListItem';

// Mock icon components for stories
const FolderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 4h6l2 2h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM10 13c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const ChevronIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 5l5 5-5 5"/>
  </svg>
);

const meta: Meta<typeof ListItem> = {
  title: 'Components/Navigation/ListItem',
  component: ListItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# ListItem Component

A flexible list item component with support for leading icons/images, trailing chevrons, labels, and captions. Height adjusts automatically based on content presence.

## Features
- Interactive with hover/pressed/selected states
- Accessible keyboard and screen reader support
- Flexible leading content (icon or image)
- Optional trailing chevron
- Semantic HTML support
- Uses Muka design tokens

## Token Usage
- Background: \`color.surface.level3\` (default) → \`level2\` (hover) → \`level1\` (pressed)
- Text: \`color.text.default.default\` for label, \`color.text.subtle.default\` for caption
- Divider: \`color.border.default\`
- Spacing: \`spacing.4\` gap, \`spacing.5\` vertical padding, \`spacing.4\` horizontal padding
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Main label text',
    },
    caption: {
      control: { type: 'text' },
      description: 'Optional caption text below label',
    },
    showChevron: {
      control: { type: 'boolean' },
      description: 'Show trailing chevron',
    },
    showDivider: {
      control: { type: 'boolean' },
      description: 'Show bottom divider',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
    selected: {
      control: { type: 'boolean' },
      description: 'Selected state',
    },
    onClick: {
      control: { type: 'boolean' },
      description: 'Click handler (makes item interactive)',
      mapping: {
        false: undefined,
        true: () => console.log('Clicked!'),
      },
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'button', 'a', 'li'],
      description: 'Semantic HTML element',
    },
  },
  args: {
    label: 'Label',
    caption: 'Caption',
    showChevron: true,
    showDivider: true,
    disabled: false,
    selected: false,
    onClick: false,
    as: 'div',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    label: 'Label',
    caption: 'Caption',
    leadingIcon: <FolderIcon />,
    showChevron: true,
  },
};

export const LabelOnly: Story = {
  args: {
    label: 'Label only',
    caption: undefined,
    leadingIcon: <FolderIcon />,
    showChevron: false,
  },
};

export const WithLeadingIcon: Story = {
  args: {
    label: 'Item with icon',
    caption: 'Leading icon example',
    leadingIcon: <FolderIcon />,
    showChevron: true,
  },
};

export const WithLeadingImage: Story = {
  args: {
    label: 'Item with image',
    caption: 'Leading image example',
    leadingImage: 'https://via.placeholder.com/48x48',
    showChevron: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use leadingImage prop to display an image instead of an icon',
      },
    },
  },
};

export const WithCaption: Story = {
  args: {
    label: 'Item with caption',
    caption: 'This is a caption providing additional context',
    leadingIcon: <FolderIcon />,
    showChevron: true,
  },
};

export const WithChevron: Story = {
  args: {
    label: 'Navigation item',
    caption: 'Shows chevron for navigation',
    leadingIcon: <FolderIcon />,
    showChevron: true,
  },
};

export const WithoutDivider: Story = {
  args: {
    label: 'Item without divider',
    caption: 'Divider is hidden',
    leadingIcon: <FolderIcon />,
    showChevron: true,
    showDivider: false,
  },
};

// Interactive states
export const Interactive: Story = {
  args: {
    label: 'Clickable item',
    caption: 'Has onClick handler',
    leadingIcon: <FolderIcon />,
    showChevron: true,
    onClick: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive item with click handler. Check console for click events.',
      },
    },
  },
};

export const Selected: Story = {
  args: {
    label: 'Selected item',
    caption: 'Currently selected',
    leadingIcon: <FolderIcon />,
    showChevron: true,
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled item',
    caption: 'Not clickable',
    leadingIcon: <FolderIcon />,
    showChevron: true,
    disabled: true,
    onClick: true,
  },
};

export const DisabledInteractive: Story = {
  args: {
    label: 'Disabled item (no onClick)',
    caption: 'Disabled state without interactivity',
    leadingIcon: <FolderIcon />,
    showChevron: true,
    disabled: true,
  },
};

// Semantic element variants
export const AsButton: Story = {
  args: {
    label: 'Button element',
    caption: 'Semantic button element',
    leadingIcon: <FolderIcon />,
    showChevron: true,
    as: 'button',
    onClick: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'ListItem as a button element - better for forms',
      },
    },
  },
};

export const AsAnchor: Story = {
  args: {
    label: 'Link element',
    caption: 'Semantic anchor element',
    leadingIcon: <FolderIcon />,
    showChevron: true,
    as: 'a',
    href: '#',
  },
  parameters: {
    docs: {
      description: {
        story: 'ListItem as an anchor element - better for navigation',
      },
    },
  },
};

export const AsListItem: Story = {
  args: {
    label: 'List item element',
    caption: 'Semantic li element',
    leadingIcon: <FolderIcon />,
    showChevron: true,
    as: 'li',
  },
  render: (args) => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '343px' }}>
      <ListItem {...args} />
    </ul>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ListItem as an li element - better for lists',
      },
    },
  },
};

// Different compositions matching Figma
export const FullComposition: Story = {
  args: {
    label: 'Full composition',
    caption: 'Icon + Label + Caption + Chevron',
    leadingIcon: <FolderIcon />,
    showChevron: true,
  },
};

export const MinimalComposition: Story = {
  args: {
    label: 'Minimal composition',
    caption: undefined,
    leadingIcon: undefined,
    showChevron: false,
  },
};

export const IconAndLabel: Story = {
  args: {
    label: 'Icon and label',
    caption: undefined,
    leadingIcon: <FolderIcon />,
    showChevron: false,
  },
};

export const LabelAndChevron: Story = {
  args: {
    label: 'Label and chevron',
    caption: undefined,
    leadingIcon: undefined,
    showChevron: true,
  },
};

export const LabelCaptionOnly: Story = {
  args: {
    label: 'Label and caption',
    caption: 'No icons or chevron',
    leadingIcon: undefined,
    showChevron: false,
  },
};

// Grouped lists
export const ListGroup: Story = {
  render: () => (
    <div style={{ width: '343px' }}>
      <ListItem 
        label="Documents"
        caption="Folder"
        leadingIcon={<FolderIcon />}
        showChevron={true}
      />
      <ListItem 
        label="Pictures"
        caption="Folder"
        leadingIcon={<FolderIcon />}
        showChevron={true}
      />
      <ListItem 
        label="Videos"
        caption="Folder"
        leadingIcon={<FolderIcon />}
        showChevron={true}
      />
      <ListItem 
        label="Music"
        caption="Folder"
        leadingIcon={<FolderIcon />}
        showChevron={true}
      />
      <ListItem 
        label="Downloads"
        caption="Folder"
        leadingIcon={<FolderIcon />}
        showChevron={true}
        showDivider={false}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        story: 'Multiple list items grouped together showing a typical list pattern',
      },
    },
  },
};

export const UserList: Story = {
  render: () => (
    <div style={{ width: '343px' }}>
      <ListItem 
        label="John Doe"
        caption="john.doe@example.com"
        leadingIcon={<UserIcon />}
        showChevron={true}
      />
      <ListItem 
        label="Jane Smith"
        caption="jane.smith@example.com"
        leadingIcon={<UserIcon />}
        showChevron={true}
      />
      <ListItem 
        label="Bob Johnson"
        caption="bob.johnson@example.com"
        leadingIcon={<UserIcon />}
        showChevron={true}
        showDivider={false}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        story: 'User list with profile information',
      },
    },
  },
};

export const MixedCompositions: Story = {
  render: () => (
    <div style={{ width: '343px' }}>
      <ListItem 
        label="Full composition"
        caption="With all elements"
        leadingIcon={<FolderIcon />}
        showChevron={true}
      />
      <ListItem 
        label="Icon and label only"
        caption={undefined}
        leadingIcon={<FolderIcon />}
        showChevron={false}
      />
      <ListItem 
        label="Label and chevron"
        caption={undefined}
        leadingIcon={undefined}
        showChevron={true}
      />
      <ListItem 
        label="Label only"
        caption={undefined}
        leadingIcon={undefined}
        showChevron={false}
      />
      <ListItem 
        label="Label with caption"
        caption="No leading or trailing elements"
        leadingIcon={undefined}
        showChevron={false}
        showDivider={false}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        story: 'Different list item compositions showing flexibility',
      },
    },
  },
};

// States showcase
export const StatesShowcase: Story = {
  render: () => (
    <div style={{ width: '343px' }}>
      <ListItem 
        label="Default state"
        caption="Normal appearance"
        leadingIcon={<FolderIcon />}
        showChevron={true}
      />
      <ListItem 
        label="Selected state"
        caption="Currently selected"
        leadingIcon={<FolderIcon />}
        showChevron={true}
        selected={true}
      />
      <ListItem 
        label="Disabled state"
        caption="Not interactive"
        leadingIcon={<FolderIcon />}
        showChevron={true}
        disabled={true}
      />
      <ListItem 
        label="Interactive hover state"
        caption="Hover to see background change"
        leadingIcon={<FolderIcon />}
        showChevron={true}
        onClick={() => {}}
        showDivider={false}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        story: 'Visual states: default, selected, disabled, and interactive',
      },
    },
  },
};

// Playground
export const Playground: Story = {
  args: {
    label: 'Playground',
    caption: 'Try different prop combinations',
    leadingIcon: <FolderIcon />,
    showChevron: true,
    onClick: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use the controls below to test different combinations!',
      },
    },
  },
};
