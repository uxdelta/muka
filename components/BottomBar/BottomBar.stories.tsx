import type { Meta, StoryObj } from '@storybook/react';
import { BottomBar, BottomBarTab } from './BottomBar';
import { Button } from '../Button';
import { Icon } from '../Icon';
import './BottomBar.css';

const meta: Meta<typeof BottomBar> = {
  title: 'Design System/BottomBar',
  component: BottomBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# BottomBar Component

A bottom bar anchored to the foot of a view for action buttons or navigation tabs.

## Variants
- **actions**: A row of action buttons (e.g. "Cancel" + "Save").
- **navigation**: A tab bar with icons and labels for app-level navigation.

## Floating
Set \`floating={true}\` for a detached floating card style with rounded corners,
padding, and elevation — used on "top level" home views.

## Token Architecture
- \`bottombar.color.{background|border|tab.active|tab.inactive}\`
- \`bottombar.floating.{radius|padding|margin-x|shadow}\`
- \`bottombar.tab.{icon-size|gap|padding-y}\`
- \`bottombar.actions.{padding-t|padding-x|gap|button-height}\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['actions', 'navigation'],
    },
    floating: {
      control: { type: 'boolean' },
    },
    bordered: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomBar>;

/* ─── Placeholder icons ───────────────────────────────── */

const HomeIcon = () => <Icon name="home" size="md" />;
const SearchIcon = () => <Icon name="search" size="md" />;
const BellIcon = () => <Icon name="bell" size="md" />;
const UserIcon = () => <Icon name="user" size="md" />;

/* ─── Container wrapper for stories ───────────────────── */

const MobileFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    width: '390px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    border: '1px solid var(--color-border-default)',
    borderRadius: '12px',
    overflow: 'hidden',
    minHeight: '200px',
    background: 'var(--color-surface-level0)',
  }}>
    <div style={{ flex: 1, padding: '1rem', opacity: 0.4, fontSize: '0.75rem' }}>
      Content area
    </div>
    {children}
  </div>
);

/* ─── Playground ──────────────────────────────────────── */

export const Playground: Story = {
  args: {
    variant: 'actions',
    floating: false,
    bordered: true,
  },
  render: (args) => (
    <MobileFrame>
      <BottomBar {...args}>
        <Button variant="secondary" size="lg">Cancel</Button>
        <Button variant="primary" size="lg">Save</Button>
      </BottomBar>
    </MobileFrame>
  ),
};

/* ─── Actions: Default ────────────────────────────────── */

export const Actions: Story = {
  render: () => (
    <MobileFrame>
      <BottomBar variant="actions">
        <Button variant="secondary" size="lg">Cancel</Button>
        <Button variant="primary" size="lg">Confirm</Button>
      </BottomBar>
    </MobileFrame>
  ),
};

/* ─── Actions: Floating ───────────────────────────────── */

export const ActionsFloating: Story = {
  name: 'Actions (Floating)',
  render: () => (
    <MobileFrame>
      <BottomBar variant="actions" floating>
        <Button variant="secondary" size="lg">Discard</Button>
        <Button variant="primary" size="lg">Apply</Button>
      </BottomBar>
    </MobileFrame>
  ),
};

/* ─── Navigation: Default ─────────────────────────────── */

export const Navigation: Story = {
  render: () => (
    <MobileFrame>
      <BottomBar variant="navigation">
        <BottomBarTab icon={<HomeIcon />} label="Home" active />
        <BottomBarTab icon={<SearchIcon />} label="Search" />
        <BottomBarTab icon={<BellIcon />} label="Alerts" />
        <BottomBarTab icon={<UserIcon />} label="Profile" />
      </BottomBar>
    </MobileFrame>
  ),
};

/* ─── Navigation: Floating ────────────────────────────── */

export const NavigationFloating: Story = {
  name: 'Navigation (Floating)',
  render: () => (
    <MobileFrame>
      <BottomBar variant="navigation" floating>
        <BottomBarTab icon={<HomeIcon />} label="Home" active />
        <BottomBarTab icon={<SearchIcon />} label="Search" />
        <BottomBarTab icon={<BellIcon />} label="Alerts" />
        <BottomBarTab icon={<UserIcon />} label="Profile" />
      </BottomBar>
    </MobileFrame>
  ),
};

/* ─── All Combinations ────────────────────────────────── */

export const AllCombinations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', opacity: 0.6 }}>Actions (default)</p>
        <MobileFrame>
          <BottomBar variant="actions">
            <Button variant="secondary" size="lg">Cancel</Button>
            <Button variant="primary" size="lg">Save</Button>
          </BottomBar>
        </MobileFrame>
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', opacity: 0.6 }}>Actions (floating)</p>
        <MobileFrame>
          <BottomBar variant="actions" floating>
            <Button variant="secondary" size="lg">Cancel</Button>
            <Button variant="primary" size="lg">Save</Button>
          </BottomBar>
        </MobileFrame>
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', opacity: 0.6 }}>Navigation (default)</p>
        <MobileFrame>
          <BottomBar variant="navigation">
            <BottomBarTab icon={<HomeIcon />} label="Home" active />
            <BottomBarTab icon={<SearchIcon />} label="Search" />
            <BottomBarTab icon={<BellIcon />} label="Alerts" />
          </BottomBar>
        </MobileFrame>
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', opacity: 0.6 }}>Navigation (floating)</p>
        <MobileFrame>
          <BottomBar variant="navigation" floating>
            <BottomBarTab icon={<HomeIcon />} label="Home" active />
            <BottomBarTab icon={<SearchIcon />} label="Search" />
            <BottomBarTab icon={<BellIcon />} label="Alerts" />
          </BottomBar>
        </MobileFrame>
      </div>
    </div>
  ),
};
