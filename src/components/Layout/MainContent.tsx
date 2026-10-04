import { useState } from 'react';
import type { Task, TaskFormData, FilterState, SortState } from '../../types';
import { TaskList } from '../Tasks/TaskList';
import { TaskForm } from '../Tasks/TaskForm';
import { FilterBar } from '../Controls/FilterBar';
import { SortControl } from '../Controls/SortControl';

interface MainContentProps {
  tasks: Task[];
  filters: FilterState;
  sort: SortState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onSortChange: (updates: Partial<SortState>) => void;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onAdd: (formData: TaskFormData) => void;
}

export function MainContent({
  tasks,
  filters,
  sort,
  onFilterChange,
  onSortChange,
  onToggle,
  onUpdate,
  onDelete,
  onAdd,
}: MainContentProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="main-content">
      <header className="main-header">
        <h2 className="page-title">My Tasks</h2>
        <div className="controls">
          <FilterBar filters={filters} onFilterChange={onFilterChange} />
          <SortControl sort={sort} onSortChange={onSortChange} />
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + New Task
          </button>
        </div>
      </header>

      <TaskList
        tasks={tasks}
        filters={filters}
        sort={sort}
        onAdd={onAdd}
        onToggle={onToggle}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />

      {showForm && (
        <TaskForm
          onSubmit={(formData) => {
            onAdd(formData);
            setShowForm(false);
          }}
          onClose={() => setShowForm(false)}
        />
      )}
    </main>
  );
}
