import React from 'react';
import './TablePagination.css';
import { Icon } from '../Icon';

export interface TablePaginationLabels {
  /** Label for items per page selector */
  itemsPerPage?: string;
  /** Label for "of" in "1-10 of 100" */
  of?: string;
  /** Label for page (used with page numbers) */
  page?: string;
  /** Aria label for next page button */
  nextPage?: string;
  /** Aria label for previous page button */
  previousPage?: string;
  /** Aria label for first page button */
  firstPage?: string;
  /** Aria label for last page button */
  lastPage?: string;
}

export interface TablePaginationProps {
  /** Current page number (1-indexed) */
  page: number;

  /** Number of items per page */
  pageSize: number;

  /** Total number of items */
  totalItems: number;

  /** Callback when page changes */
  onPageChange: (page: number) => void;

  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void;

  /** Available page size options */
  pageSizeOptions?: number[];

  /** Show page size selector */
  showPageSizeSelector?: boolean;

  /** Show item range display ("1-10 of 100") */
  showItemRange?: boolean;

  /** Show page number buttons */
  showPageNumbers?: boolean;

  /** Maximum number of page buttons to show */
  maxPageButtons?: number;

  /** Custom labels for i18n */
  labels?: TablePaginationLabels;

  /** Additional CSS classes */
  className?: string;
}

const defaultLabels: Required<TablePaginationLabels> = {
  itemsPerPage: 'Items per page:',
  of: 'of',
  page: 'Page',
  nextPage: 'Next page',
  previousPage: 'Previous page',
  firstPage: 'First page',
  lastPage: 'Last page',
};

/**
 * TablePagination Component
 *
 * Pagination controls for table data display.
 * Can be used standalone or alongside the Table component.
 *
 * Features:
 * - Page size selector
 * - Item range display ("1-10 of 100")
 * - Page number buttons
 * - Previous/Next navigation
 * - First/Last page navigation
 * - Full keyboard accessibility
 * - i18n support through labels prop
 */
export const TablePagination: React.FC<TablePaginationProps> = ({
  page,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  showPageSizeSelector = true,
  showItemRange = true,
  showPageNumbers = true,
  maxPageButtons = 5,
  labels: customLabels,
  className = '',
}) => {
  const labels = { ...defaultLabels, ...customLabels };
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(e.target.value, 10);
    onPageSizeChange?.(newPageSize);
    // Reset to page 1 when page size changes
    onPageChange(1);
  };

  const handlePreviousPage = () => {
    if (canGoPrevious) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (canGoNext) {
      onPageChange(page + 1);
    }
  };

  const handleFirstPage = () => {
    if (canGoPrevious) {
      onPageChange(1);
    }
  };

  const handleLastPage = () => {
    if (canGoNext) {
      onPageChange(totalPages);
    }
  };

  // Calculate which page numbers to show
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    if (totalPages <= maxPageButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [];
    const halfButtons = Math.floor((maxPageButtons - 2) / 2);

    // Always show first page
    pages.push(1);

    if (page > halfButtons + 2) {
      pages.push('ellipsis');
    }

    // Calculate range around current page
    const start = Math.max(2, page - halfButtons);
    const end = Math.min(totalPages - 1, page + halfButtons);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - halfButtons - 1) {
      pages.push('ellipsis');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const paginationClasses = [
    'muka-table-pagination',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={paginationClasses} role="navigation" aria-label="Pagination">
      <div className="muka-table-pagination__left">
        {showPageSizeSelector && onPageSizeChange && (
          <div className="muka-table-pagination__page-size">
            <label className="muka-table-pagination__label">
              {labels.itemsPerPage}
            </label>
            <select
              className="muka-table-pagination__select"
              value={pageSize}
              onChange={handlePageSizeChange}
              aria-label={labels.itemsPerPage}
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {showItemRange && (
          <span className="muka-table-pagination__range">
            {startItem}-{endItem} {labels.of} {totalItems}
          </span>
        )}
      </div>

      <div className="muka-table-pagination__right">
        {showPageNumbers && totalPages > 1 && (
          <div className="muka-table-pagination__pages">
            <button
              type="button"
              className="muka-table-pagination__button muka-table-pagination__button--nav"
              onClick={handleFirstPage}
              disabled={!canGoPrevious}
              aria-label={labels.firstPage}
            >
              <Icon name="arrow-left" variant="line" size="sm" />
              <Icon name="arrow-left" variant="line" size="sm" />
            </button>

            <button
              type="button"
              className="muka-table-pagination__button muka-table-pagination__button--nav"
              onClick={handlePreviousPage}
              disabled={!canGoPrevious}
              aria-label={labels.previousPage}
            >
              <Icon name="arrow-left" variant="line" size="sm" />
            </button>

            {getPageNumbers().map((pageNum, index) => {
              if (pageNum === 'ellipsis') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="muka-table-pagination__ellipsis"
                    aria-hidden="true"
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={pageNum}
                  type="button"
                  className={[
                    'muka-table-pagination__button',
                    'muka-table-pagination__button--page',
                    pageNum === page && 'muka-table-pagination__button--active',
                  ].filter(Boolean).join(' ')}
                  onClick={() => onPageChange(pageNum)}
                  aria-label={`${labels.page} ${pageNum}`}
                  aria-current={pageNum === page ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              type="button"
              className="muka-table-pagination__button muka-table-pagination__button--nav"
              onClick={handleNextPage}
              disabled={!canGoNext}
              aria-label={labels.nextPage}
            >
              <Icon name="arrow-right" variant="line" size="sm" />
            </button>

            <button
              type="button"
              className="muka-table-pagination__button muka-table-pagination__button--nav"
              onClick={handleLastPage}
              disabled={!canGoNext}
              aria-label={labels.lastPage}
            >
              <Icon name="arrow-right" variant="line" size="sm" />
              <Icon name="arrow-right" variant="line" size="sm" />
            </button>
          </div>
        )}

        {/* Simple prev/next when page numbers are hidden */}
        {!showPageNumbers && totalPages > 1 && (
          <div className="muka-table-pagination__nav-only">
            <button
              type="button"
              className="muka-table-pagination__button muka-table-pagination__button--nav"
              onClick={handlePreviousPage}
              disabled={!canGoPrevious}
              aria-label={labels.previousPage}
            >
              <Icon name="arrow-left" variant="line" size="sm" />
            </button>

            <span className="muka-table-pagination__page-indicator">
              {labels.page} {page} {labels.of} {totalPages}
            </span>

            <button
              type="button"
              className="muka-table-pagination__button muka-table-pagination__button--nav"
              onClick={handleNextPage}
              disabled={!canGoNext}
              aria-label={labels.nextPage}
            >
              <Icon name="arrow-right" variant="line" size="sm" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TablePagination;
