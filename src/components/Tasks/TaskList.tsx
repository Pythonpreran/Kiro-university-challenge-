import { useState, useMemo } from 'react';
import type { Task, TaskFormData, FilterState, SortState } from '../../types';
import { filterTasks, sortTasks } from '../../utils/tasks';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';
import { EmptyState } from './EmptyState';

interface TaskListProps {
  tasks: Task[];
  filters: FilterState;
  sort: SortState;
  onAdd: (formData: TaskFormData) => void;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export function TaskList({
  tasks,
  filters,
  sort,
  onAdd,
  onToggle,
  onUpdate,
  onDelete,
}: TaskListProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);

  const filteredTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filters);
    return sortTasks(filtered, sort);
  }, [tasks, filters, sort]);

  const hasFilters = filters.status !== 'all' || filters.subject !== 'all';

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormSubmit = (formData: TaskFormData) => {
    if (editingTask) {
      onUpdate(editingTask.id, formData);
    } else {
      onAdd(formData);
    }
    setEditingTask(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  if (filteredTasks.length === 0) {
    return (
      <>
        <EmptyState hasFilters={hasFilters} onAddClick={() => setShowForm(true)} />
        {showForm && (
          <TaskForm onSubmit={handleFormSubmit} onClose={handleCloseForm} />
        )}
      </>
    );
  }

  return (
    <>
      <div className="task-list" role="list">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={handleEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}
    </>
  );
}
