import type { FilterState, Subject } from '../../types';
import { SUBJECTS } from '../../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="filter-group">
      <label htmlFor="filter-status" className="sr-only">
        Filter by status
      </label>
      <select
        id="filter-status"
        className="filter-select"
        value={filters.status}
        onChange={(e) =>
          onFilterChange({ status: e.target.value as FilterState['status'] })
        }
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <label htmlFor="filter-subject" className="sr-only">
        Filter by subject
      </label>
      <select
        id="filter-subject"
        className="filter-select"
        value={filters.subject}
        onChange={(e) =>
          onFilterChange({ subject: e.target.value as 'all' | Subject })
        }
      >
        <option value="all">All Subjects</option>
        {SUBJECTS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
