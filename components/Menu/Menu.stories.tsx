import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuGroup,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSub,
  MenuSubTrigger,
  MenuSubContent,
} from './Menu';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from '../ContextMenu';
import { Button } from '../Button';
import { Card } from '../Card';
import { Icon } from '../Icon';
import './Menu.css';

const meta: Meta<typeof Menu> = {
  title: 'Components/Overlay/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Menu Component

Dropdown and context menus for displaying actions and options.

## Features
- **Dropdown Menu**: Triggered by clicking a button
- **Context Menu**: Triggered by right-clicking an element
- **Menu Items**: Standard actions with optional icons and shortcuts
- **Checkbox Items**: Toggleable items for settings
- **Radio Groups**: Mutually exclusive options
- **Submenus**: Nested menus for hierarchical options
- **Separators & Groups**: Visual organization of items
- **Destructive Items**: Red styling for dangerous actions
- **Disabled Items**: Non-interactive items

## Accessibility
- Full keyboard navigation (arrows, Enter, Escape)
- Type-ahead search
- Focus management
- Screen reader announcements

## Token Architecture
- \`menu.content.{color|border|shadow|padding}\`
- \`menu.item.{color|border|padding|gap|height}\`
- \`menu.separator.{color|height|margin}\`
- \`menu.group.label.{color|padding}\`
- \`menu.shortcut.color\`
- \`menu.checkbox.indicator.{size|color}\`
- \`menu.radio.indicator.{size|color}\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

/* ─── Basic Dropdown Menu ────────────────────────────────────────────────── */

export const Playground: Story = {
  render: () => (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="secondary">
          Open Menu
          <Icon name="arrow-down" variant="line" size="sm" />
        </Button>
      </MenuTrigger>
      <MenuContent align="start">
        <MenuItem icon={<Icon name="eye" variant="line" size="sm" />} onSelect={() => console.log('View')}>
          View details
        </MenuItem>
        <MenuItem icon={<Icon name="pencil" variant="line" size="sm" />} onSelect={() => console.log('Edit')}>
          Edit
        </MenuItem>
        <MenuItem icon={<Icon name="file-copy" variant="line" size="sm" />} shortcut="Cmd+D" onSelect={() => console.log('Duplicate')}>
          Duplicate
        </MenuItem>
        <MenuSeparator />
        <MenuItem
          icon={<Icon name="delete-bin" variant="line" size="sm" />}
          destructive
          onSelect={() => console.log('Delete')}
        >
          Delete
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
};

/* ─── With Icons ─────────────────────────────────────────────────────────── */

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="ghost" iconOnly aria-label="More options">
          <Icon name="more-2" variant="line" size="md" />
        </Button>
      </MenuTrigger>
      <MenuContent align="end">
        <MenuItem icon={<Icon name="eye" variant="line" size="sm" />}>View</MenuItem>
        <MenuItem icon={<Icon name="pencil" variant="line" size="sm" />}>Edit</MenuItem>
        <MenuItem icon={<Icon name="share" variant="line" size="sm" />}>Share</MenuItem>
        <MenuItem icon={<Icon name="download" variant="line" size="sm" />}>Download</MenuItem>
      </MenuContent>
    </Menu>
  ),
};

/* ─── With Shortcuts ─────────────────────────────────────────────────────── */

export const WithShortcuts: Story = {
  name: 'With Shortcuts',
  render: () => (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="secondary">Edit Menu</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem shortcut="Cmd+Z">Undo</MenuItem>
        <MenuItem shortcut="Cmd+Shift+Z">Redo</MenuItem>
        <MenuSeparator />
        <MenuItem shortcut="Cmd+X">Cut</MenuItem>
        <MenuItem shortcut="Cmd+C">Copy</MenuItem>
        <MenuItem shortcut="Cmd+V">Paste</MenuItem>
        <MenuSeparator />
        <MenuItem shortcut="Cmd+A">Select All</MenuItem>
      </MenuContent>
    </Menu>
  ),
};

/* ─── With Disabled Items ────────────────────────────────────────────────── */

export const WithDisabledItems: Story = {
  name: 'With Disabled Items',
  render: () => (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="secondary">Actions</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Available action</MenuItem>
        <MenuItem disabled>Disabled action</MenuItem>
        <MenuItem>Another action</MenuItem>
        <MenuSeparator />
        <MenuItem disabled destructive>
          Disabled destructive
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
};

/* ─── With Groups ────────────────────────────────────────────────────────── */

export const WithGroups: Story = {
  name: 'With Groups',
  render: () => (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="secondary">Grouped Menu</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuGroup label="Actions">
          <MenuItem icon={<Icon name="pencil" variant="line" size="sm" />}>Edit</MenuItem>
          <MenuItem icon={<Icon name="file-copy" variant="line" size="sm" />}>Duplicate</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup label="Share">
          <MenuItem icon={<Icon name="mail" variant="line" size="sm" />}>Email</MenuItem>
          <MenuItem icon={<Icon name="links" variant="line" size="sm" />}>Copy link</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup label="Danger zone">
          <MenuItem icon={<Icon name="delete-bin" variant="line" size="sm" />} destructive>
            Delete
          </MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  ),
};

/* ─── Checkbox Items ─────────────────────────────────────────────────────── */

export const CheckboxItems: Story = {
  name: 'Checkbox Items',
  render: function CheckboxStory() {
    const [showCompleted, setShowCompleted] = useState(true);
    const [showArchived, setShowArchived] = useState(false);
    const [compactView, setCompactView] = useState(false);

    return (
      <Menu>
        <MenuTrigger asChild>
          <Button variant="secondary">
            <Icon name="settings-3" variant="line" size="sm" />
            View Options
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuCheckboxItem checked={showCompleted} onCheckedChange={setShowCompleted}>
            Show completed
          </MenuCheckboxItem>
          <MenuCheckboxItem checked={showArchived} onCheckedChange={setShowArchived}>
            Show archived
          </MenuCheckboxItem>
          <MenuSeparator />
          <MenuCheckboxItem checked={compactView} onCheckedChange={setCompactView}>
            Compact view
          </MenuCheckboxItem>
        </MenuContent>
      </Menu>
    );
  },
};

/* ─── Radio Group ────────────────────────────────────────────────────────── */

export const RadioGroup: Story = {
  name: 'Radio Group',
  render: function RadioStory() {
    const [sortBy, setSortBy] = useState('date');

    return (
      <Menu>
        <MenuTrigger asChild>
          <Button variant="secondary">
            <Icon name="sort-desc" variant="line" size="sm" />
            Sort by
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuRadioGroup value={sortBy} onValueChange={setSortBy}>
            <MenuRadioItem value="date">Date</MenuRadioItem>
            <MenuRadioItem value="name">Name</MenuRadioItem>
            <MenuRadioItem value="size">Size</MenuRadioItem>
            <MenuRadioItem value="type">Type</MenuRadioItem>
          </MenuRadioGroup>
        </MenuContent>
      </Menu>
    );
  },
};

/* ─── With Submenu ───────────────────────────────────────────────────────── */

export const WithSubmenu: Story = {
  name: 'With Submenu',
  render: () => (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="secondary">Menu with Submenu</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem icon={<Icon name="eye" variant="line" size="sm" />}>View</MenuItem>
        <MenuItem icon={<Icon name="pencil" variant="line" size="sm" />}>Edit</MenuItem>
        <MenuSeparator />
        <MenuSub>
          <MenuSubTrigger icon={<Icon name="share" variant="line" size="sm" />}>
            Share
          </MenuSubTrigger>
          <MenuSubContent>
            <MenuItem icon={<Icon name="mail" variant="line" size="sm" />}>Email</MenuItem>
            <MenuItem icon={<Icon name="message-2" variant="line" size="sm" />}>Message</MenuItem>
            <MenuItem icon={<Icon name="links" variant="line" size="sm" />}>Copy link</MenuItem>
          </MenuSubContent>
        </MenuSub>
        <MenuSub>
          <MenuSubTrigger icon={<Icon name="download" variant="line" size="sm" />}>
            Export
          </MenuSubTrigger>
          <MenuSubContent>
            <MenuItem>PDF</MenuItem>
            <MenuItem>CSV</MenuItem>
            <MenuItem>Excel</MenuItem>
          </MenuSubContent>
        </MenuSub>
        <MenuSeparator />
        <MenuItem icon={<Icon name="delete-bin" variant="line" size="sm" />} destructive>
          Delete
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
};

/* ─── Context Menu ───────────────────────────────────────────────────────── */

export const ContextMenuExample: Story = {
  name: 'Context Menu',
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Card style={{ padding: '3rem', textAlign: 'center', cursor: 'context-menu' }}>
          <p style={{ margin: 0, color: 'var(--color-text-subtle-default)' }}>
            Right-click me
          </p>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem icon={<Icon name="file-copy" variant="line" size="sm" />} shortcut="Cmd+C">
          Copy
        </ContextMenuItem>
        <ContextMenuItem icon={<Icon name="clipboard" variant="line" size="sm" />} shortcut="Cmd+V">
          Paste
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem icon={<Icon name="refresh" variant="line" size="sm" />}>
          Refresh
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem icon={<Icon name="delete-bin" variant="line" size="sm" />} destructive>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

/* ─── Context Menu with Checkbox ─────────────────────────────────────────── */

export const ContextMenuWithCheckbox: Story = {
  name: 'Context Menu with Checkbox',
  render: function ContextCheckboxStory() {
    const [showHidden, setShowHidden] = useState(false);
    const [showExtensions, setShowExtensions] = useState(true);

    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Card style={{ padding: '3rem', textAlign: 'center', cursor: 'context-menu' }}>
            <p style={{ margin: 0, color: 'var(--color-text-subtle-default)' }}>
              Right-click for view options
            </p>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem checked={showHidden} onCheckedChange={setShowHidden}>
            Show hidden files
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={showExtensions} onCheckedChange={setShowExtensions}>
            Show file extensions
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

/* ─── Context Menu with Submenu ──────────────────────────────────────────── */

export const ContextMenuWithSubmenu: Story = {
  name: 'Context Menu with Submenu',
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Card style={{ padding: '3rem', textAlign: 'center', cursor: 'context-menu' }}>
          <p style={{ margin: 0, color: 'var(--color-text-subtle-default)' }}>
            Right-click for nested menu
          </p>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>New File</ContextMenuItem>
        <ContextMenuItem>New Folder</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Open with</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>VS Code</ContextMenuItem>
            <ContextMenuItem>Sublime Text</ContextMenuItem>
            <ContextMenuItem>Vim</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Email</ContextMenuItem>
            <ContextMenuItem>Slack</ContextMenuItem>
            <ContextMenuItem>Copy link</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

/* ─── All Alignments ─────────────────────────────────────────────────────── */

export const Alignments: Story = {
  name: 'Alignments',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Menu>
        <MenuTrigger asChild>
          <Button variant="secondary">Align Start</Button>
        </MenuTrigger>
        <MenuContent align="start">
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </MenuContent>
      </Menu>

      <Menu>
        <MenuTrigger asChild>
          <Button variant="secondary">Align Center</Button>
        </MenuTrigger>
        <MenuContent align="center">
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </MenuContent>
      </Menu>

      <Menu>
        <MenuTrigger asChild>
          <Button variant="secondary">Align End</Button>
        </MenuTrigger>
        <MenuContent align="end">
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </MenuContent>
      </Menu>
    </div>
  ),
};

/* ─── Complex Example ────────────────────────────────────────────────────── */

export const ComplexExample: Story = {
  name: 'Complex Example',
  render: function ComplexStory() {
    const [showPreview, setShowPreview] = useState(true);
    const [density, setDensity] = useState('comfortable');

    return (
      <Menu>
        <MenuTrigger asChild>
          <Button variant="secondary">
            <Icon name="settings-3" variant="line" size="sm" />
            Settings
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuGroup label="View">
            <MenuCheckboxItem checked={showPreview} onCheckedChange={setShowPreview}>
              Show preview panel
            </MenuCheckboxItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuGroup label="Density">
            <MenuRadioGroup value={density} onValueChange={setDensity}>
              <MenuRadioItem value="compact">Compact</MenuRadioItem>
              <MenuRadioItem value="comfortable">Comfortable</MenuRadioItem>
              <MenuRadioItem value="spacious">Spacious</MenuRadioItem>
            </MenuRadioGroup>
          </MenuGroup>
          <MenuSeparator />
          <MenuSub>
            <MenuSubTrigger icon={<Icon name="palette" variant="line" size="sm" />}>
              Theme
            </MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>Light</MenuItem>
              <MenuItem>Dark</MenuItem>
              <MenuItem>System</MenuItem>
            </MenuSubContent>
          </MenuSub>
          <MenuSeparator />
          <MenuItem icon={<Icon name="settings-3" variant="line" size="sm" />}>
            Advanced settings...
          </MenuItem>
        </MenuContent>
      </Menu>
    );
  },
};
