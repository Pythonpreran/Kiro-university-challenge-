import { useState, useCallback } from 'react';
import type { FilterState, SortState } from '../types';

const DEFAULT_FILTERS: FilterState = {
  status: 'all',
  subject: 'all',
};

const DEFAULT_SORT: SortState = {
  sortBy: 'dueDate',
  sortOrder: 'asc',
};

export function useFilters(): {
  filters: FilterState;
  setFilters: (updates: Partial<FilterState>) => void;
  sort: SortState;
  setSort: (updates: Partial<SortState>) => void;
  resetFilters: () => void;
} {
  const [filters, setFiltersState] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSortState] = useState<SortState>(DEFAULT_SORT);

  const setFilters = useCallback((updates: Partial<FilterState>) => {
    setFiltersState((prev) => ({ ...prev, ...updates }));
  }, []);

  const setSort = useCallback((updates: Partial<SortState>) => {
    setSortState((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
    setSortState(DEFAULT_SORT);
  }, []);

  return { filters, setFilters, sort, setSort, resetFilters };
}
