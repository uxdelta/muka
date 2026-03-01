import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from './ListItem';
import { Icon } from '../Icon';
import { Card } from '../Card';
import './ListItem.css';

const meta: Meta<typeof ListItem> = {
  title: 'Components/Display/ListItem',
  component: ListItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# ListItem Component

A flexible list item component with support for leading icons/images,
trailing chevrons, labels, and captions. Height adjusts automatically
based on content presence.

## Features
- Leading content: icon or image
- Label with optional caption
- Trailing chevron for navigation
- Interactive, disabled, and selected states
- Semantic HTML element support (div, button, a, li)

## Accessibility
- Keyboard support: Enter and Space keys activate interactive items
- aria-disabled for disabled state
- aria-selected for selection state in lists
- imageAlt prop for leading image accessibility
- Focus indicator meets WCAG 2.4.7
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Main label text',
    },
    caption: {
      control: 'text',
      description: 'Optional caption text below label',
    },
    showChevron: {
      control: 'boolean',
      description: 'Show trailing chevron',
    },
    showDivider: {
      control: 'boolean',
      description: 'Show bottom divider',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    selected: {
      control: 'boolean',
      description: 'Selected state',
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'button', 'a', 'li'],
      description: 'Semantic HTML element',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

// ─── Playground ─────────────────────────────────────────
export const Playground: Story = {
  args: {
    label: 'List Item',
    caption: 'Optional caption text',
    showChevron: true,
    showDivider: true,
    disabled: false,
    selected: false,
  },
};

// ─── Leading Icon ───────────────────────────────────────
export const LeadingIcon: Story = {
  args: {
    label: 'Settings',
    caption: 'Manage your preferences',
    leadingIcon: <Icon name="settings" size="md" />,
    showChevron: true,
    onClick: () => {},
  },
};

// ─── Leading Image ──────────────────────────────────────
export const LeadingImage: Story = {
  args: {
    label: 'John Doe',
    caption: 'john.doe@example.com',
    leadingImage: 'https://i.pravatar.cc/40?img=1',
    imageAlt: 'John Doe profile picture',
    showChevron: true,
    onClick: () => {},
  },
};

// ─── No Leading ─────────────────────────────────────────
export const NoLeading: Story = {
  name: 'Label Only',
  args: {
    label: 'Simple list item',
    onClick: () => {},
  },
};

// ─── With Caption ───────────────────────────────────────
export const WithCaption: Story = {
  args: {
    label: 'Notifications',
    caption: 'Receive alerts and updates',
    onClick: () => {},
  },
};

// ─── With Chevron ───────────────────────────────────────
export const WithChevron: Story = {
  args: {
    label: 'View Details',
    showChevron: true,
    onClick: () => {},
  },
};

// ─── Disabled ───────────────────────────────────────────
export const Disabled: Story = {
  args: {
    label: 'Disabled Item',
    caption: 'This item cannot be selected',
    leadingIcon: <Icon name="lock" size="md" />,
    disabled: true,
  },
};

// ─── Selected ───────────────────────────────────────────
export const Selected: Story = {
  args: {
    label: 'Selected Item',
    caption: 'This item is currently selected',
    leadingIcon: <Icon name="check" size="md" />,
    selected: true,
    onClick: () => {},
  },
};

// ─── All Leading Variants ───────────────────────────────
export const AllLeadingVariants: Story = {
  name: 'All Leading Variants',
  render: () => (
    <div style={{ width: '320px' }}>
      <ListItem
        label="With Icon"
        caption="Leading icon variant"
        leadingIcon={<Icon name="user" size="md" />}
        showChevron
        onClick={() => {}}
      />
      <ListItem
        label="With Image"
        caption="Leading image variant"
        leadingImage="https://i.pravatar.cc/40?img=2"
        imageAlt="User avatar"
        showChevron
        onClick={() => {}}
      />
      <ListItem
        label="No Leading"
        caption="Text only variant"
        showChevron
        showDivider={false}
        onClick={() => {}}
      />
    </div>
  ),
};

// ─── Composition: Card with ListItems ───────────────────
export const CardWithListItems: Story = {
  name: 'Composition: Card with ListItems',
  parameters: {
    docs: {
      description: {
        story: `
**Design Guideline:** When displaying ListItems inside a Card, use \`padding="none"\`
to avoid double padding. ListItems have their own internal padding.
        `,
      },
    },
  },
  render: () => (
    <Card padding="none" style={{ width: '320px' }}>
      <ListItem
        label="Settings"
        leadingIcon={<Icon name="settings" size="md" />}
        showChevron
        onClick={() => {}}
      />
      <ListItem
        label="Notifications"
        leadingIcon={<Icon name="bell" size="md" />}
        showChevron
        onClick={() => {}}
      />
      <ListItem
        label="Privacy"
        leadingIcon={<Icon name="lock" size="md" />}
        showChevron
        showDivider={false}
        onClick={() => {}}
      />
    </Card>
  ),
};
