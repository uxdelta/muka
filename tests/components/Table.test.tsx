import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderHook, act } from '@testing-library/react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  TablePagination,
  useTableSelection,
} from '../../components/Table';

describe('Table Component', () => {
  describe('Basic Rendering', () => {
    it('renders a table with data', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Value</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Item 1</TableCell>
              <TableCell>100</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('applies size classes', () => {
      const { container, rerender } = render(
        <Table size="sm">
          <TableBody>
            <TableRow><TableCell>Cell</TableCell></TableRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('.muka-table--sm')).toBeInTheDocument();

      rerender(
        <Table size="lg">
          <TableBody>
            <TableRow><TableCell>Cell</TableCell></TableRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('.muka-table--lg')).toBeInTheDocument();
    });

    it('applies selected class to selected rows', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow selected>
              <TableCell>Selected Row</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(container.querySelector('.muka-table__row--selected')).toBeInTheDocument();
    });

    it('sets aria-selected on selected rows', () => {
      render(
        <Table>
          <TableBody>
            <TableRow selected>
              <TableCell>Selected Row</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const row = screen.getByText('Selected Row').closest('tr');
      expect(row).toHaveAttribute('aria-selected', 'true');
    });
  });
});

describe('TablePagination Component', () => {
  const defaultProps = {
    page: 1,
    pageSize: 10,
    totalItems: 100,
    onPageChange: vi.fn(),
    onPageSizeChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders pagination controls', () => {
      render(<TablePagination {...defaultProps} />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('displays item range', () => {
      render(<TablePagination {...defaultProps} showItemRange />);
      expect(screen.getByText('1-10 of 100')).toBeInTheDocument();
    });

    it('displays correct range on different pages', () => {
      render(<TablePagination {...defaultProps} page={2} showItemRange />);
      expect(screen.getByText('11-20 of 100')).toBeInTheDocument();
    });

    it('displays correct range on last page', () => {
      render(<TablePagination {...defaultProps} page={10} showItemRange />);
      expect(screen.getByText('91-100 of 100')).toBeInTheDocument();
    });

    it('handles partial last page', () => {
      render(<TablePagination {...defaultProps} totalItems={95} page={10} showItemRange />);
      expect(screen.getByText('91-95 of 95')).toBeInTheDocument();
    });

    it('shows 0-0 when no items', () => {
      render(<TablePagination {...defaultProps} totalItems={0} showItemRange />);
      expect(screen.getByText('0-0 of 0')).toBeInTheDocument();
    });

    it('renders page size selector when onPageSizeChange is provided', () => {
      render(<TablePagination {...defaultProps} showPageSizeSelector />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders page size options', () => {
      render(<TablePagination {...defaultProps} pageSizeOptions={[5, 10, 25]} />);
      const select = screen.getByRole('combobox');
      expect(select).toContainElement(screen.getByText('5'));
      expect(select).toContainElement(screen.getByText('10'));
      expect(select).toContainElement(screen.getByText('25'));
    });

    it('hides page size selector when showPageSizeSelector is false', () => {
      render(<TablePagination {...defaultProps} showPageSizeSelector={false} />);
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });

    it('renders page number buttons when showPageNumbers is true', () => {
      render(<TablePagination {...defaultProps} showPageNumbers />);
      expect(screen.getByRole('button', { name: 'Page 1' })).toBeInTheDocument();
    });

    it('marks current page with aria-current', () => {
      render(<TablePagination {...defaultProps} showPageNumbers />);
      const currentPage = screen.getByRole('button', { name: 'Page 1' });
      expect(currentPage).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Navigation', () => {
    it('calls onPageChange when clicking next', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(<TablePagination {...defaultProps} onPageChange={onPageChange} showPageNumbers />);

      await user.click(screen.getByRole('button', { name: 'Next page' }));
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange when clicking previous', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(<TablePagination {...defaultProps} page={2} onPageChange={onPageChange} showPageNumbers />);

      await user.click(screen.getByRole('button', { name: 'Previous page' }));
      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it('disables previous button on first page', () => {
      render(<TablePagination {...defaultProps} showPageNumbers />);
      expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'First page' })).toBeDisabled();
    });

    it('disables next button on last page', () => {
      render(<TablePagination {...defaultProps} page={10} showPageNumbers />);
      expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Last page' })).toBeDisabled();
    });

    it('calls onPageChange when clicking a page number', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(<TablePagination {...defaultProps} onPageChange={onPageChange} showPageNumbers />);

      await user.click(screen.getByRole('button', { name: 'Page 3' }));
      expect(onPageChange).toHaveBeenCalledWith(3);
    });

    it('calls onPageChange when clicking first page button', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(<TablePagination {...defaultProps} page={5} onPageChange={onPageChange} showPageNumbers />);

      await user.click(screen.getByRole('button', { name: 'First page' }));
      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it('calls onPageChange when clicking last page button', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(<TablePagination {...defaultProps} onPageChange={onPageChange} showPageNumbers />);

      await user.click(screen.getByRole('button', { name: 'Last page' }));
      expect(onPageChange).toHaveBeenCalledWith(10);
    });
  });

  describe('Page Size', () => {
    it('calls onPageSizeChange when selecting new page size', async () => {
      const user = userEvent.setup();
      const onPageSizeChange = vi.fn();
      const onPageChange = vi.fn();
      render(
        <TablePagination
          {...defaultProps}
          onPageSizeChange={onPageSizeChange}
          onPageChange={onPageChange}
          pageSizeOptions={[10, 25, 50]}
        />
      );

      await user.selectOptions(screen.getByRole('combobox'), '25');
      expect(onPageSizeChange).toHaveBeenCalledWith(25);
      expect(onPageChange).toHaveBeenCalledWith(1); // Resets to page 1
    });
  });

  describe('Custom Labels', () => {
    it('uses custom labels for i18n', () => {
      render(
        <TablePagination
          {...defaultProps}
          showItemRange
          labels={{
            itemsPerPage: 'Artikelen per pagina:',
            of: 'van',
          }}
        />
      );
      expect(screen.getByText('Artikelen per pagina:')).toBeInTheDocument();
      expect(screen.getByText('1-10 van 100')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has navigation role', () => {
      render(<TablePagination {...defaultProps} />);
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Pagination');
    });

    it('navigation buttons have accessible labels', () => {
      render(<TablePagination {...defaultProps} showPageNumbers />);
      expect(screen.getByRole('button', { name: 'Previous page' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Next page' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'First page' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Last page' })).toBeInTheDocument();
    });
  });
});

describe('useTableSelection Hook', () => {
  const testItems = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
  ];

  it('initializes with empty selection', () => {
    const { result } = renderHook(() =>
      useTableSelection({
        items: testItems,
        getItemId: (item) => item.id,
      })
    );

    expect(result.current.selectedIds.size).toBe(0);
    expect(result.current.isAllSelected).toBe(false);
    expect(result.current.isIndeterminate).toBe(false);
  });

  it('initializes with provided selection', () => {
    const { result } = renderHook(() =>
      useTableSelection({
        items: testItems,
        getItemId: (item) => item.id,
        initialSelected: ['1', '2'],
      })
    );

    expect(result.current.selectedIds.size).toBe(2);
    expect(result.current.isSelected('1')).toBe(true);
    expect(result.current.isSelected('2')).toBe(true);
    expect(result.current.isSelected('3')).toBe(false);
  });

  describe('toggleItem', () => {
    it('selects an unselected item', () => {
      const { result } = renderHook(() =>
        useTableSelection({
          items: testItems,
          getItemId: (item) => item.id,
        })
      );

      act(() => {
        result.current.toggleItem('1');
      });

      expect(result.current.isSelected('1')).toBe(true);
    });

    it('deselects a selected item', () => {
      const { result } = renderHook(() =>
        useTableSelection({
          items: testItems,
          getItemId: (item) => item.id,
          initialSelected: ['1'],
        })
      );

      act(() => {
        result.current.toggleItem('1');
      });

      expect(result.current.isSelected('1')).toBe(false);
    });
  });

  describe('toggleAll', () => {
    it('selects all items when none are selected', () => {
      const { result } = renderHook(() =>
        useTableSelection({
          items: testItems,
          getItemId: (item) => item.id,
        })
      );

      act(() => {
        result.current.toggleAll();
      });

      expect(result.current.isAllSelected).toBe(true);
      expect(result.current.selectedIds.size).toBe(3);
    });

    it('deselects all items when all are selected', () => {
      const { result } = renderHook(() =>
        useTableSelection({
          items: testItems,
          getItemId: (item) => item.id,
          initialSelected: ['1', '2', '3'],
        })
      );

      act(() => {
        result.current.toggleAll();
      });

      expect(result.current.isAllSelected).toBe(false);
      expect(result.current.selectedIds.size).toBe(0);
    });

    it('selects all items when some are selected (indeterminate)', () => {
      const { result } = renderHook(() =>
        useTableSelection({
          items: testItems,
          getItemId: (item) => item.id,
          initialSelected: ['1'],
        })
      );

      expect(result.current.isIndeterminate).toBe(true);

      act(() => {
        result.current.toggleAll();
      });

      expect(result.current.isAllSelected).toBe(true);
    });
  });

  describe('selectAll', () => {
    it('selects all items', () => {
      const { result } = renderHook(() =>
        useTableSelection({
          items: testItems,
          getItemId: (item) => item.id,
        })
      );

      act(() => {
        result.current.selectAll();
      });

      expect(result.current.isAllSelected).toBe(true);
    });
  });

  describe('clearSelection', () => {
    it('clears all selections', () => {
      const { result } = renderHook(() =>
        useTableSelection({
          items: testItems,
          getItemId: (item) => item.id,
          initialSelected: ['1', '2', '3'],
        })
      );

      act(() => {
        result.current.clearSelection();
      });

      expect(result.current.selectedIds.size).toBe(0);
      expect(result.current.isAllSelected).toBe(false);
    });
  });

  describe('selectedItems', () => {
    it('returns array of selected items', () => {
      const { result } = renderHook(() =>
        useTableSelection({
          items: testItems,
          getItemId: (item) => item.id,
          initialSelected: ['1', '3'],
        })
      );

      expect(result.current.selectedItems).toHaveLength(2);
      expect(result.current.selectedItems[0].name).toBe('Item 1');
      expect(result.current.selectedItems[1].name).toBe('Item 3');
    });
  });

  describe('isIndeterminate', () => {
    it('is false when no items selected', () => {
      const { result } = renderHook(() =>
        useTableSelection({
          items: testItems,
          getItemId: (item) => item.id,
        })
      );

      expect(result.current.isIndeterminate).toBe(false);
    });

    it('is true when some items selected', () => {
      const { result } = renderHook(() =>
        useTableSelection({
          items: testItems,
          getItemId: (item) => item.id,
          initialSelected: ['1'],
        })
      );

      expect(result.current.isIndeterminate).toBe(true);
    });

    it('is false when all items selected', () => {
      const { result } = renderHook(() =>
        useTableSelection({
          items: testItems,
          getItemId: (item) => item.id,
          initialSelected: ['1', '2', '3'],
        })
      );

      expect(result.current.isIndeterminate).toBe(false);
    });
  });

  describe('empty items array', () => {
    it('handles empty items array', () => {
      const { result } = renderHook(() =>
        useTableSelection({
          items: [],
          getItemId: (item: { id: string }) => item.id,
        })
      );

      expect(result.current.isAllSelected).toBe(false);
      expect(result.current.isIndeterminate).toBe(false);
      expect(result.current.selectedItems).toHaveLength(0);
    });
  });
});
