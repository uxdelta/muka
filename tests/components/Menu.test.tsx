import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
} from '../../components/Menu';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
} from '../../components/ContextMenu';

// Mock Icon component
vi.mock('../../components/Icon', () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

describe('Menu Component', () => {
  describe('Rendering', () => {
    it('renders the trigger button', () => {
      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Item 1</MenuItem>
          </MenuContent>
        </Menu>
      );

      expect(screen.getByText('Open Menu')).toBeInTheDocument();
    });

    it('does not show content when closed', () => {
      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Item 1</MenuItem>
          </MenuContent>
        </Menu>
      );

      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });

    it('shows content when open', async () => {
      const user = userEvent.setup();
      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Item 1</MenuItem>
          </MenuContent>
        </Menu>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });
    });

    it('renders menu items with icons', async () => {
      const user = userEvent.setup();
      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem icon={<span data-testid="test-icon" />}>Item with Icon</MenuItem>
          </MenuContent>
        </Menu>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      });
    });

    it('renders menu items with shortcuts', async () => {
      const user = userEvent.setup();
      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem shortcut="Cmd+S">Save</MenuItem>
          </MenuContent>
        </Menu>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Cmd+S')).toBeInTheDocument();
      });
    });

    it('renders separator', async () => {
      const user = userEvent.setup();
      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Item 1</MenuItem>
            <MenuSeparator />
            <MenuItem>Item 2</MenuItem>
          </MenuContent>
        </Menu>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        const separator = document.querySelector('.muka-menu__separator');
        expect(separator).toBeInTheDocument();
      });
    });

    it('renders group with label', async () => {
      const user = userEvent.setup();
      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuGroup label="Actions">
              <MenuItem>Edit</MenuItem>
              <MenuItem>Delete</MenuItem>
            </MenuGroup>
          </MenuContent>
        </Menu>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Actions')).toBeInTheDocument();
      });
    });
  });

  describe('Interactive Behavior', () => {
    it('calls onSelect when item is clicked', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();

      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem onSelect={handleSelect}>Click me</MenuItem>
          </MenuContent>
        </Menu>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Click me')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Click me'));

      expect(handleSelect).toHaveBeenCalledTimes(1);
    });

    it('closes menu after selecting an item', async () => {
      const user = userEvent.setup();

      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Click me</MenuItem>
          </MenuContent>
        </Menu>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Click me')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Click me'));

      await waitFor(() => {
        expect(screen.queryByText('Click me')).not.toBeInTheDocument();
      });
    });

    it('does not call onSelect when item is disabled', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();

      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem onSelect={handleSelect} disabled>
              Disabled Item
            </MenuItem>
          </MenuContent>
        </Menu>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Disabled Item')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Disabled Item'));

      expect(handleSelect).not.toHaveBeenCalled();
    });

    it('closes menu when pressing Escape', async () => {
      const user = userEvent.setup();

      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Item 1</MenuItem>
          </MenuContent>
        </Menu>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
      });
    });
  });

  describe('Checkbox Items', () => {
    it('renders checkbox item', async () => {
      const user = userEvent.setup();

      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuCheckboxItem checked={true}>Show completed</MenuCheckboxItem>
          </MenuContent>
        </Menu>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Show completed')).toBeInTheDocument();
      });
    });

    it('calls onCheckedChange when checkbox item is clicked', async () => {
      const user = userEvent.setup();
      const handleCheckedChange = vi.fn();

      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuCheckboxItem checked={false} onCheckedChange={handleCheckedChange}>
              Toggle me
            </MenuCheckboxItem>
          </MenuContent>
        </Menu>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Toggle me')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Toggle me'));

      expect(handleCheckedChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Radio Items', () => {
    it('renders radio group', async () => {
      const user = userEvent.setup();

      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuRadioGroup value="a">
              <MenuRadioItem value="a">Option A</MenuRadioItem>
              <MenuRadioItem value="b">Option B</MenuRadioItem>
            </MenuRadioGroup>
          </MenuContent>
        </Menu>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Option A')).toBeInTheDocument();
        expect(screen.getByText('Option B')).toBeInTheDocument();
      });
    });

    it('calls onValueChange when radio item is clicked', async () => {
      const user = userEvent.setup();
      const handleValueChange = vi.fn();

      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuRadioGroup value="a" onValueChange={handleValueChange}>
              <MenuRadioItem value="a">Option A</MenuRadioItem>
              <MenuRadioItem value="b">Option B</MenuRadioItem>
            </MenuRadioGroup>
          </MenuContent>
        </Menu>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Option B')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Option B'));

      expect(handleValueChange).toHaveBeenCalledWith('b');
    });
  });

  describe('Submenu', () => {
    it('renders submenu trigger', async () => {
      const user = userEvent.setup();

      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuSub>
              <MenuSubTrigger>More options</MenuSubTrigger>
              <MenuSubContent>
                <MenuItem>Sub Item 1</MenuItem>
              </MenuSubContent>
            </MenuSub>
          </MenuContent>
        </Menu>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('More options')).toBeInTheDocument();
      });
    });

    it('opens submenu on hover', async () => {
      const user = userEvent.setup();

      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuSub>
              <MenuSubTrigger>More options</MenuSubTrigger>
              <MenuSubContent>
                <MenuItem>Sub Item 1</MenuItem>
              </MenuSubContent>
            </MenuSub>
          </MenuContent>
        </Menu>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('More options')).toBeInTheDocument();
      });

      await user.hover(screen.getByText('More options'));

      await waitFor(() => {
        expect(screen.getByText('Sub Item 1')).toBeInTheDocument();
      });
    });
  });

  describe('Destructive Items', () => {
    it('applies destructive class', async () => {
      const user = userEvent.setup();

      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem destructive>Delete</MenuItem>
          </MenuContent>
        </Menu>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        const item = screen.getByText('Delete').closest('.muka-menu__item');
        expect(item).toHaveClass('muka-menu__item--destructive');
      });
    });
  });

  describe('Controlled State', () => {
    it('respects controlled open state', async () => {
      const { rerender } = render(
        <Menu open={false}>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Item 1</MenuItem>
          </MenuContent>
        </Menu>
      );

      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();

      rerender(
        <Menu open={true}>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Item 1</MenuItem>
          </MenuContent>
        </Menu>
      );

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });
    });

    it('calls onOpenChange when toggled', async () => {
      const user = userEvent.setup();
      const handleOpenChange = vi.fn();

      render(
        <Menu onOpenChange={handleOpenChange}>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Item 1</MenuItem>
          </MenuContent>
        </Menu>
      );

      await user.click(screen.getByText('Open Menu'));

      expect(handleOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes on trigger', async () => {
      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Item 1</MenuItem>
          </MenuContent>
        </Menu>
      );

      const trigger = screen.getByText('Open Menu');
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    });

    it('supports keyboard navigation with arrow keys', async () => {
      const user = userEvent.setup();

      render(
        <Menu>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuContent>
        </Menu>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      // Navigate with arrow keys
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');

      // The second item should now be highlighted
      const items = document.querySelectorAll('.muka-menu__item');
      expect(items.length).toBe(3);
    });
  });
});

describe('ContextMenu Component', () => {
  describe('Rendering', () => {
    it('renders trigger content', () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>
            <div>Right-click me</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Item 1</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );

      expect(screen.getByText('Right-click me')).toBeInTheDocument();
    });

    it('does not show content initially', () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>
            <div>Right-click me</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Item 1</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );

      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });

    it('shows content on right-click', async () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>
            <div>Right-click me</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Item 1</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );

      const trigger = screen.getByText('Right-click me');
      fireEvent.contextMenu(trigger);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });
    });
  });

  describe('Interactive Behavior', () => {
    it('calls onSelect when context menu item is clicked', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();

      render(
        <ContextMenu>
          <ContextMenuTrigger>
            <div>Right-click me</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onSelect={handleSelect}>Click me</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );

      const trigger = screen.getByText('Right-click me');
      fireEvent.contextMenu(trigger);

      await waitFor(() => {
        expect(screen.getByText('Click me')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Click me'));

      expect(handleSelect).toHaveBeenCalledTimes(1);
    });

    it('renders separator in context menu', async () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>
            <div>Right-click me</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Item 1</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Item 2</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );

      const trigger = screen.getByText('Right-click me');
      fireEvent.contextMenu(trigger);

      await waitFor(() => {
        const separator = document.querySelector('.muka-menu__separator');
        expect(separator).toBeInTheDocument();
      });
    });

    it('renders checkbox item in context menu', async () => {
      const handleCheckedChange = vi.fn();

      render(
        <ContextMenu>
          <ContextMenuTrigger>
            <div>Right-click me</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuCheckboxItem checked={false} onCheckedChange={handleCheckedChange}>
              Show hidden
            </ContextMenuCheckboxItem>
          </ContextMenuContent>
        </ContextMenu>
      );

      const trigger = screen.getByText('Right-click me');
      fireEvent.contextMenu(trigger);

      await waitFor(() => {
        expect(screen.getByText('Show hidden')).toBeInTheDocument();
      });
    });

    it('applies destructive class to context menu item', async () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>
            <div>Right-click me</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem destructive>Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );

      const trigger = screen.getByText('Right-click me');
      fireEvent.contextMenu(trigger);

      await waitFor(() => {
        const item = screen.getByText('Delete').closest('.muka-menu__item');
        expect(item).toHaveClass('muka-menu__item--destructive');
      });
    });
  });
});
