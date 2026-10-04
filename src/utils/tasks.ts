import type {
  Task,
  TaskFormData,
  FilterState,
  SortState,
  ValidationResult,
  ValidationErrors,
  Priority,
} from '../types';
import { getToday } from './date';

export function generateId(): string {
  return crypto.randomUUID();
}

const PRIORITY_ORDER: Record<Priority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export function validateTask(data: Partial<TaskFormData>): ValidationResult {
  const errors: ValidationErrors = {};

  if (!data.title || data.title.trim() === '') {
    errors.title = 'Title is required';
  } else if (data.title.length > 100) {
    errors.title = 'Title must be 100 characters or less';
  }

  if (!data.subject) {
    errors.subject = 'Subject is required';
  }

  if (!data.priority) {
    errors.priority = 'Priority is required';
  }

  if (!data.estimatedMinutes || data.estimatedMinutes < 1) {
    errors.estimatedMinutes = 'Estimated time must be at least 1 minute';
  } else if (data.estimatedMinutes > 480) {
    errors.estimatedMinutes = 'Estimated time cannot exceed 480 minutes';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createTask(formData: TaskFormData): Task {
  return {
    id: generateId(),
    title: formData.title.trim(),
    subject: formData.subject,
    priority: formData.priority,
    dueDate: formData.dueDate || getToday(),
    estimatedMinutes: formData.estimatedMinutes,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
}

export function filterTasks(tasks: Task[], filters: FilterState): Task[] {
  return tasks.filter((task) => {
    if (filters.status !== 'all' && task.status !== filters.status) {
      return false;
    }
    if (filters.subject !== 'all' && task.subject !== filters.subject) {
      return false;
    }
    return true;
  });
}

export function sortTasks(tasks: Task[], sort: SortState): Task[] {
  const sorted = [...tasks];

  sorted.sort((a, b) => {
    let comparison = 0;

    if (sort.sortBy === 'dueDate') {
      comparison = a.dueDate.localeCompare(b.dueDate);
    } else if (sort.sortBy === 'priority') {
      comparison = PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
    }

    return sort.sortOrder === 'asc' ? comparison : -comparison;
  });

  return sorted;
}

export function toggleTaskStatus(status: 'pending' | 'completed'): 'pending' | 'completed' {
  return status === 'pending' ? 'completed' : 'pending';
}

export function deleteTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((task) => task.id !== id);
}

export function updateTask(tasks: Task[], id: string, updates: Partial<Task>): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, ...updates } : task
  );
}

export function getTaskById(tasks: Task[], id: string): Task | undefined {
  return tasks.find((task) => task.id === id);
}
