import React from 'react';
import './Table.css';

/* ========================================
   Table Component and Sub-components
   ======================================== */

export interface TableProps {
  /** Table content (TableHead, TableBody) */
  children: React.ReactNode;

  /** Size variant affects cell padding */
  size?: 'sm' | 'md' | 'lg';

  /** Fixed layout for consistent column widths */
  fixedLayout?: boolean;

  /** Enable horizontal scroll on small screens */
  responsive?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Accessible caption for the table */
  caption?: string;
}

export interface TableHeadProps {
  /** TableRow elements */
  children: React.ReactNode;

  /** Additional CSS classes */
  className?: string;
}

export interface TableBodyProps {
  /** TableRow elements */
  children: React.ReactNode;

  /** Additional CSS classes */
  className?: string;
}

export interface TableRowProps {
  /** TableCell or TableHeaderCell elements */
  children: React.ReactNode;

  /** Row is selected */
  selected?: boolean;

  /** Row click handler */
  onClick?: (e: React.MouseEvent<HTMLTableRowElement>) => void;

  /** Additional CSS classes */
  className?: string;
}

export interface TableCellProps {
  /** Cell content */
  children: React.ReactNode;

  /** Text alignment */
  align?: 'left' | 'center' | 'right';

  /** Additional CSS classes */
  className?: string;

  /** Column span */
  colSpan?: number;

  /** Row span */
  rowSpan?: number;
}

export interface TableHeaderCellProps extends TableCellProps {
  /** Column is sortable */
  sortable?: boolean;

  /** Current sort direction */
  sortDirection?: 'asc' | 'desc' | null;

  /** Sort click handler */
  onSort?: () => void;

  /** Scope for accessibility */
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup';
}

const SortIcon = ({ direction }: { direction?: 'asc' | 'desc' | null }) => (
  <svg
    className={`muka-table__sort-icon ${direction ? `muka-table__sort-icon--${direction}` : ''}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12l7-7 7 7" />
  </svg>
);

/**
 * Table Component
 *
 * Data table with support for sorting, selection, and responsive layouts.
 *
 * Sizes: sm, md, lg (affects cell padding)
 * Features: sortable columns, row selection, fixed layout, responsive scroll
 */
export const Table: React.FC<TableProps> = ({
  children,
  size = 'md',
  fixedLayout = false,
  responsive = true,
  className = '',
  caption,
  ...props
}) => {
  const tableClasses = [
    'muka-table',
    `muka-table--${size}`,
    fixedLayout && 'muka-table--fixed',
    className,
  ].filter(Boolean).join(' ');

  const table = (
    <table className={tableClasses} {...props}>
      {caption && <caption className="muka-table__caption">{caption}</caption>}
      {children}
    </table>
  );

  if (responsive) {
    return <div className="muka-table-wrapper">{table}</div>;
  }

  return table;
};

/**
 * TableHead - Table header section
 */
export const TableHead: React.FC<TableHeadProps> = ({
  children,
  className = '',
  ...props
}) => {
  const headClasses = ['muka-table__head', className].filter(Boolean).join(' ');
  return (
    <thead className={headClasses} {...props}>
      {children}
    </thead>
  );
};

/**
 * TableBody - Table body section
 */
export const TableBody: React.FC<TableBodyProps> = ({
  children,
  className = '',
  ...props
}) => {
  const bodyClasses = ['muka-table__body', className].filter(Boolean).join(' ');
  return (
    <tbody className={bodyClasses} {...props}>
      {children}
    </tbody>
  );
};

/**
 * TableRow - Table row
 */
export const TableRow: React.FC<TableRowProps> = ({
  children,
  selected = false,
  onClick,
  className = '',
  ...props
}) => {
  const rowClasses = [
    'muka-table__row',
    selected && 'muka-table__row--selected',
    onClick && 'muka-table__row--clickable',
    className,
  ].filter(Boolean).join(' ');

  return (
    <tr
      className={rowClasses}
      onClick={onClick}
      aria-selected={selected || undefined}
      {...props}
    >
      {children}
    </tr>
  );
};

/**
 * TableCell - Standard table cell
 */
export const TableCell: React.FC<TableCellProps> = ({
  children,
  align = 'left',
  className = '',
  colSpan,
  rowSpan,
  ...props
}) => {
  const cellClasses = [
    'muka-table__cell',
    `muka-table__cell--${align}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <td className={cellClasses} colSpan={colSpan} rowSpan={rowSpan} {...props}>
      {children}
    </td>
  );
};

/**
 * TableHeaderCell - Header cell with optional sorting
 */
export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  children,
  align = 'left',
  sortable = false,
  sortDirection = null,
  onSort,
  scope = 'col',
  className = '',
  colSpan,
  rowSpan,
  ...props
}) => {
  const cellClasses = [
    'muka-table__header-cell',
    `muka-table__header-cell--${align}`,
    sortable && 'muka-table__header-cell--sortable',
    sortDirection && `muka-table__header-cell--sorted-${sortDirection}`,
    className,
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (sortable && onSort) {
      onSort();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (sortable && onSort && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onSort();
    }
  };

  return (
    <th
      className={cellClasses}
      scope={scope}
      colSpan={colSpan}
      rowSpan={rowSpan}
      onClick={sortable ? handleClick : undefined}
      onKeyDown={sortable ? handleKeyDown : undefined}
      tabIndex={sortable ? 0 : undefined}
      aria-sort={sortDirection === 'asc' ? 'ascending' : sortDirection === 'desc' ? 'descending' : undefined}
      {...props}
    >
      <span className="muka-table__header-content">
        {children}
        {sortable && <SortIcon direction={sortDirection} />}
      </span>
    </th>
  );
};

export default Table;
