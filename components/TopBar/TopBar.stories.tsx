import type { Meta, StoryObj } from '@storybook/react';
import { TopBar } from './TopBar';
import { ControlBar } from './ControlBar';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { FormProgressBar } from '../FormProgressBar';
import './TopBar.css';
import './ControlBar.css';

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

## Responsive Behavior
- **Mobile** (< 1024px): 64px height
- **Desktop** (≥ 1024px): 80px height

## ControlBar
A slot-based container below the TopBar for secondary controls (filter buttons, search, progress, etc).
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'draggable'],
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

const CartIcon = () => (
  <Button variant="ghost" size="sm" iconOnly aria-label="Cart">
    <Icon name="shopping-cart2" size="md" />
  </Button>
);

const FilterButton = () => (
  <Button variant="ghost" size="sm" iconLeft={<Icon name="filter3" size="sm" />}>
    Filter
  </Button>
);

const SortButton = () => (
  <Button variant="ghost" size="sm" iconRight={<Icon name="sort-desc" size="sm" />}>
    Sort
  </Button>
);

/* ─── Playground ──────────────────────────────────────── */

export const Playground: Story = {
  args: {
    title: 'Page Title',
    variant: 'default',
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

/* ─── Draggable Minimal ──────────────────────────────── */

export const DraggableMinimal: Story = {
  name: 'Draggable (Minimal)',
  args: {
    title: 'Sheet Title',
    variant: 'draggable',
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

/* ─── All View Variants ──────────────────────────────── */

export const AllViewVariants: Story = {
  name: 'All View Variants',
  parameters: {
    docs: {
      description: {
        story: `
Shows all 4 view types as defined in the design system:
- **Top-level**: App home, no back button, trailing actions (heart, cart)
- **Sub-level**: Detail view with back button and trailing actions
- **Modal**: Dialog with close button only (actions in footer on desktop)
- **Non-modal**: Sheet with drag handle, close button (can be dismissed by backdrop)
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '390px' }}>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', opacity: 0.6 }}>Top-level View</p>
        <TopBar
          title="Home"
          trailing={<CartIcon />}
          trailingSecondary={<HeartIcon />}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', opacity: 0.6 }}>Sub-level View</p>
        <TopBar
          title="Product Details"
          leading={<BackIcon />}
          trailing={<CartIcon />}
          trailingSecondary={<HeartIcon />}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', opacity: 0.6 }}>Modal Dialog</p>
        <TopBar
          title="Edit Profile"
          trailing={<CloseIcon />}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', opacity: 0.6 }}>Non-modal Dialog (Sheet)</p>
        <TopBar
          title="Filter Options"
          variant="draggable"
          trailing={<CloseIcon />}
        />
      </div>
    </div>
  ),
};

/* ─── With ControlBar: Buttons ───────────────────────── */

export const WithControlBarButtons: Story = {
  name: 'With ControlBar (Buttons)',
  args: {
    title: 'Products',
    controlBar: (
      <ControlBar justify="between">
        <FilterButton />
        <SortButton />
      </ControlBar>
    ),
  },
};

/* ─── With ControlBar: Search ────────────────────────── */

export const WithControlBarSearch: Story = {
  name: 'With ControlBar (Search)',
  args: {
    title: 'Search',
    trailing: <CloseIcon />,
    controlBar: (
      <ControlBar>
        <div style={{ width: '100%' }}>
          <Input
            type="search"
            placeholder="Search products..."
            fullWidth
          />
        </div>
      </ControlBar>
    ),
  },
};

/* ─── With ControlBar: Progress ──────────────────────── */

export const WithControlBarProgress: Story = {
  name: 'With ControlBar (Progress)',
  args: {
    title: 'Checkout',
    leading: <BackIcon />,
    trailing: <CloseIcon />,
    controlBar: (
      <ControlBar justify="center">
        <FormProgressBar
          steps={[
            { label: 'Cart' },
            { label: 'Shipping' },
            { label: 'Payment' },
            { label: 'Review' },
          ]}
          currentStep={2}
        />
      </ControlBar>
    ),
  },
};

/* ─── Responsive Demo ────────────────────────────────── */

export const ResponsiveDemo: Story = {
  name: 'Responsive Demo',
  parameters: {
    docs: {
      description: {
        story: `
**Resize your browser window** to see the responsive behavior:
- **< 1024px (Mobile)**: 64px height
- **≥ 1024px (Desktop)**: 80px height

The TopBar automatically adjusts its height based on the viewport width.
        `,
      },
    },
  },
  render: () => (
    <div>
      <TopBar
        title="Responsive TopBar"
        leading={<BackIcon />}
        trailing={<MoreIcon />}
        trailingSecondary={<HeartIcon />}
        controlBar={
          <ControlBar justify="between">
            <FilterButton />
            <SortButton />
          </ControlBar>
        }
      />
      <div style={{ padding: '1rem', background: 'var(--color-surface-level2)', minHeight: '200px' }}>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-subtle-default)' }}>
          Resize the viewport to see the TopBar height change at 1024px breakpoint.
        </p>
      </div>
    </div>
  ),
};
