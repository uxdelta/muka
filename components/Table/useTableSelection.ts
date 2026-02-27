import { useState, useCallback, useMemo } from 'react';

export interface UseTableSelectionOptions<T> {
  /** Array of items that can be selected */
  items: T[];

  /** Function to extract unique ID from an item */
  getItemId: (item: T) => string;

  /** Initial selected item IDs */
  initialSelected?: string[];
}

export interface UseTableSelectionReturn<T> {
  /** Set of currently selected item IDs */
  selectedIds: Set<string>;

  /** Check if a specific item is selected */
  isSelected: (id: string) => boolean;

  /** True if all items are selected */
  isAllSelected: boolean;

  /** True if some but not all items are selected */
  isIndeterminate: boolean;

  /** Toggle selection of a single item */
  toggleItem: (id: string) => void;

  /** Toggle selection of all items */
  toggleAll: () => void;

  /** Select all items */
  selectAll: () => void;

  /** Clear all selections */
  clearSelection: () => void;

  /** Array of currently selected items */
  selectedItems: T[];
}

/**
 * useTableSelection Hook
 *
 * A headless hook for managing table row selection state.
 * Provides select all, toggle, and indeterminate state support.
 *
 * @example
 * ```tsx
 * const {
 *   selectedIds,
 *   isSelected,
 *   isAllSelected,
 *   isIndeterminate,
 *   toggleItem,
 *   toggleAll,
 * } = useTableSelection({
 *   items: data,
 *   getItemId: (item) => item.id,
 * });
 * ```
 */
export function useTableSelection<T>({
  items,
  getItemId,
  initialSelected = [],
}: UseTableSelectionOptions<T>): UseTableSelectionReturn<T> {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(initialSelected)
  );

  const allItemIds = useMemo(
    () => new Set(items.map(getItemId)),
    [items, getItemId]
  );

  const isSelected = useCallback(
    (id: string) => selectedIds.has(id),
    [selectedIds]
  );

  const isAllSelected = useMemo(() => {
    if (items.length === 0) return false;
    return items.every((item) => selectedIds.has(getItemId(item)));
  }, [items, selectedIds, getItemId]);

  const isIndeterminate = useMemo(() => {
    if (items.length === 0) return false;
    const selectedCount = items.filter((item) =>
      selectedIds.has(getItemId(item))
    ).length;
    return selectedCount > 0 && selectedCount < items.length;
  }, [items, selectedIds, getItemId]);

  const toggleItem = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    if (isAllSelected) {
      // Deselect all current items
      setSelectedIds((prev) => {
        const next = new Set(prev);
        items.forEach((item) => next.delete(getItemId(item)));
        return next;
      });
    } else {
      // Select all current items
      setSelectedIds((prev) => {
        const next = new Set(prev);
        items.forEach((item) => next.add(getItemId(item)));
        return next;
      });
    }
  }, [items, getItemId, isAllSelected]);

  const selectAll = useCallback(() => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      items.forEach((item) => next.add(getItemId(item)));
      return next;
    });
  }, [items, getItemId]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const selectedItems = useMemo(
    () => items.filter((item) => selectedIds.has(getItemId(item))),
    [items, selectedIds, getItemId]
  );

  return {
    selectedIds,
    isSelected,
    isAllSelected,
    isIndeterminate,
    toggleItem,
    toggleAll,
    selectAll,
    clearSelection,
    selectedItems,
  };
}

export default useTableSelection;
