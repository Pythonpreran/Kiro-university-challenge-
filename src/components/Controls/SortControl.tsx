import type { SortState } from '../../types';

interface SortControlProps {
  sort: SortState;
  onSortChange: (updates: Partial<SortState>) => void;
}

export function SortControl({ sort, onSortChange }: SortControlProps) {
  return (
    <div className="filter-group">
      <label htmlFor="sort-by" className="sr-only">
        Sort by
      </label>
      <select
        id="sort-by"
        className="filter-select"
        value={sort.sortBy}
        onChange={(e) =>
          onSortChange({ sortBy: e.target.value as SortState['sortBy'] })
        }
      >
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
      </select>

      <label htmlFor="sort-order" className="sr-only">
        Sort order
      </label>
      <select
        id="sort-order"
        className="filter-select"
        value={sort.sortOrder}
        onChange={(e) =>
          onSortChange({ sortOrder: e.target.value as SortState['sortOrder'] })
        }
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
