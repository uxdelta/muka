import type { Meta, StoryObj } from '@storybook/react';
import { TopBar } from './TopBar';
import { Button } from '../Button';
import { Icon } from '../Icon';
import './TopBar.css';

const meta: Meta<typeof TopBar> = {
  title: 'Components/Navigation/TopBar',
  component: TopBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# TopBar Component

The TopBar is a navigation bar for the top of views, dialogs, and sheets.

- **Default variant**: Standard navigation bar with leading/trailing action slots and a centered title.
- **Draggable variant**: Adds a drag handle above the bar, used in bottom sheets and non-modal dialogs.

## Slots
- \`leading\`: Back button, menu icon, or close button
- \`trailing\`: Primary trailing action (rightmost)
- \`trailingSecondary\`: Secondary trailing action

## Token Architecture
- \`topbar.color.{background|foreground|border}\`
- \`topbar.height\`
- \`topbar.padding.x\`
- \`topbar.title.max-width\`
- \`topbar.drag-handle.{width|height|color|padding-y|radius}\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'draggable'],
    },
    bordered: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopBar>;

/* ─── Helper icons ────────────────────────────────────── */

const BackIcon = () => (
  <Button variant="ghost" size="sm" iconOnly aria-label="Go back">
    <Icon name="arrow-left" size="md" />
  </Button>
);

const CloseIcon = () => (
  <Button variant="ghost" size="sm" iconOnly aria-label="Close">
    <Icon name="x" size="md" />
  </Button>
);

const MoreIcon = () => (
  <Button variant="ghost" size="sm" iconOnly aria-label="More options">
    <Icon name="dots-vertical" size="md" />
  </Button>
);

const HeartIcon = () => (
  <Button variant="ghost" size="sm" iconOnly aria-label="Favorite">
    <Icon name="heart" size="md" />
  </Button>
);

/* ─── Playground ──────────────────────────────────────── */

export const Playground: Story = {
  args: {
    title: 'Page Title',
    variant: 'default',
    bordered: true,
    leading: <BackIcon />,
    trailing: <CloseIcon />,
  },
};

/* ─── Default Variant ─────────────────────────────────── */

export const Default: Story = {
  args: {
    title: 'Page Title',
    leading: <BackIcon />,
    trailing: <CloseIcon />,
  },
};

/* ─── With Two Trailing Actions ───────────────────────── */

export const TwoTrailingActions: Story = {
  name: 'Two Trailing Actions',
  args: {
    title: 'Details',
    leading: <BackIcon />,
    trailing: <MoreIcon />,
    trailingSecondary: <HeartIcon />,
  },
};

/* ─── Title Only ──────────────────────────────────────── */

export const TitleOnly: Story = {
  name: 'Title Only',
  args: {
    title: 'Settings',
    bordered: true,
  },
};

/* ─── No Title ────────────────────────────────────────── */

export const NoTitle: Story = {
  name: 'No Title',
  args: {
    leading: <BackIcon />,
    trailing: <CloseIcon />,
  },
};

/* ─── Long Title with Ellipsis ────────────────────────── */

export const LongTitle: Story = {
  name: 'Long Title (Ellipsis)',
  args: {
    title: 'This is a very long page title that should be truncated with an ellipsis',
    leading: <BackIcon />,
    trailing: <CloseIcon />,
  },
};

/* ─── Draggable Variant ───────────────────────────────── */

export const Draggable: Story = {
  args: {
    title: 'Sheet Title',
    variant: 'draggable',
    leading: <BackIcon />,
    trailing: <CloseIcon />,
  },
};

/* ─── Draggable Without Border ────────────────────────── */

export const DraggableNoBorder: Story = {
  name: 'Draggable (No Border)',
  args: {
    title: 'Sheet Title',
    variant: 'draggable',
    bordered: false,
    trailing: <CloseIcon />,
  },
};

/* ─── All Variants ────────────────────────────────────── */

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '390px' }}>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', opacity: 0.6 }}>Default</p>
        <TopBar
          title="Page Title"
          leading={<BackIcon />}
          trailing={<CloseIcon />}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', opacity: 0.6 }}>Two Trailing Actions</p>
        <TopBar
          title="Details"
          leading={<BackIcon />}
          trailing={<MoreIcon />}
          trailingSecondary={<HeartIcon />}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', opacity: 0.6 }}>Draggable</p>
        <TopBar
          title="Sheet Title"
          variant="draggable"
          trailing={<CloseIcon />}
        />
      </div>
    </div>
  ),
};
