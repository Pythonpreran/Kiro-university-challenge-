import { describe, it, expect } from 'vitest';
import {
  validateTask,
  createTask,
  filterTasks,
  sortTasks,
  toggleTaskStatus,
  deleteTask,
  updateTask,
  getTaskById,
} from '../../utils/tasks';
import type { Task, TaskFormData, FilterState, SortState } from '../../types';

describe('task utilities', () => {
  describe('validateTask', () => {
    it('returns valid for correct data', () => {
      const data: TaskFormData = {
        title: 'Test Task',
        subject: 'Mathematics',
        priority: 'high',
        dueDate: '2024-01-15',
        estimatedMinutes: 30,
      };
      const result = validateTask(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('returns error for empty title', () => {
      const result = validateTask({ title: '' });
      expect(result.isValid).toBe(false);
      expect(result.errors.title).toBe('Title is required');
    });

    it('returns error for title over 100 characters', () => {
      const result = validateTask({ title: 'a'.repeat(101) });
      expect(result.isValid).toBe(false);
      expect(result.errors.title).toBe('Title must be 100 characters or less');
    });

    it('returns error for missing subject', () => {
      const result = validateTask({ title: 'Test', subject: undefined as unknown as TaskFormData['subject'] });
      expect(result.errors.subject).toBe('Subject is required');
    });

    it('returns error for invalid estimated minutes', () => {
      const result = validateTask({ title: 'Test', estimatedMinutes: 0 });
      expect(result.errors.estimatedMinutes).toBe('Estimated time must be at least 1 minute');
    });

    it('returns error for estimated minutes over 480', () => {
      const result = validateTask({ title: 'Test', estimatedMinutes: 500 });
      expect(result.errors.estimatedMinutes).toBe('Estimated time cannot exceed 480 minutes');
    });
  });

  describe('createTask', () => {
    it('creates task with generated id and default status', () => {
      const formData: TaskFormData = {
        title: 'Test Task',
        subject: 'Mathematics',
        priority: 'medium',
        dueDate: '2024-01-15',
        estimatedMinutes: 30,
      };
      const task = createTask(formData);

      expect(task.id).toBeDefined();
      expect(task.title).toBe('Test Task');
      expect(task.status).toBe('pending');
      expect(task.createdAt).toBeDefined();
    });

    it('trims whitespace from title', () => {
      const formData: TaskFormData = {
        title: '  Trimmed Title  ',
        subject: 'Mathematics',
        priority: 'low',
        dueDate: '2024-01-15',
        estimatedMinutes: 15,
      };
      const task = createTask(formData);
      expect(task.title).toBe('Trimmed Title');
    });
  });

  describe('filterTasks', () => {
    const tasks: Task[] = [
      { id: '1', title: 'Task 1', subject: 'Mathematics', priority: 'high', dueDate: '2024-01-15', estimatedMinutes: 30, status: 'pending', createdAt: '2024-01-10T00:00:00Z' },
      { id: '2', title: 'Task 2', subject: 'Science', priority: 'medium', dueDate: '2024-01-16', estimatedMinutes: 45, status: 'completed', createdAt: '2024-01-10T00:00:00Z' },
      { id: '3', title: 'Task 3', subject: 'Mathematics', priority: 'low', dueDate: '2024-01-17', estimatedMinutes: 20, status: 'pending', createdAt: '2024-01-10T00:00:00Z' },
    ];

    it('filters by status', () => {
      const filters: FilterState = { status: 'pending', subject: 'all' };
      const result = filterTasks(tasks, filters);
      expect(result).toHaveLength(2);
      expect(result.every(t => t.status === 'pending')).toBe(true);
    });

    it('filters by subject', () => {
      const filters: FilterState = { status: 'all', subject: 'Mathematics' };
      const result = filterTasks(tasks, filters);
      expect(result).toHaveLength(2);
      expect(result.every(t => t.subject === 'Mathematics')).toBe(true);
    });

    it('filters by both status and subject', () => {
      const filters: FilterState = { status: 'pending', subject: 'Mathematics' };
      const result = filterTasks(tasks, filters);
      expect(result).toHaveLength(2);
    });

    it('returns all tasks when filters are "all"', () => {
      const filters: FilterState = { status: 'all', subject: 'all' };
      const result = filterTasks(tasks, filters);
      expect(result).toHaveLength(3);
    });
  });

  describe('sortTasks', () => {
    const tasks: Task[] = [
      { id: '1', title: 'A', subject: 'Mathematics', priority: 'low', dueDate: '2024-01-17', estimatedMinutes: 30, status: 'pending', createdAt: '2024-01-10T00:00:00Z' },
      { id: '2', title: 'B', subject: 'Science', priority: 'high', dueDate: '2024-01-15', estimatedMinutes: 45, status: 'pending', createdAt: '2024-01-10T00:00:00Z' },
      { id: '3', title: 'C', subject: 'English', priority: 'medium', dueDate: '2024-01-16', estimatedMinutes: 20, status: 'pending', createdAt: '2024-01-10T00:00:00Z' },
    ];

    it('sorts by due date ascending', () => {
      const sort: SortState = { sortBy: 'dueDate', sortOrder: 'asc' };
      const result = sortTasks(tasks, sort);
      expect(result[0].id).toBe('2');
      expect(result[2].id).toBe('1');
    });

    it('sorts by due date descending', () => {
      const sort: SortState = { sortBy: 'dueDate', sortOrder: 'desc' };
      const result = sortTasks(tasks, sort);
      expect(result[0].id).toBe('1');
      expect(result[2].id).toBe('2');
    });

    it('sorts by priority descending (high first in asc)', () => {
      const sort: SortState = { sortBy: 'priority', sortOrder: 'asc' };
      const result = sortTasks(tasks, sort);
      expect(result[0].priority).toBe('high');
    });

    it('preserves task count after sorting', () => {
      const sort: SortState = { sortBy: 'dueDate', sortOrder: 'asc' };
      const result = sortTasks(tasks, sort);
      expect(result).toHaveLength(tasks.length);
    });
  });

  describe('toggleTaskStatus', () => {
    it('toggles from pending to completed', () => {
      expect(toggleTaskStatus('pending')).toBe('completed');
    });

    it('toggles from completed to pending', () => {
      expect(toggleTaskStatus('completed')).toBe('pending');
    });
  });

  describe('deleteTask', () => {
    const tasks: Task[] = [
      { id: '1', title: 'Task 1', subject: 'Mathematics', priority: 'high', dueDate: '2024-01-15', estimatedMinutes: 30, status: 'pending', createdAt: '2024-01-10T00:00:00Z' },
      { id: '2', title: 'Task 2', subject: 'Science', priority: 'medium', dueDate: '2024-01-16', estimatedMinutes: 45, status: 'completed', createdAt: '2024-01-10T00:00:00Z' },
    ];

    it('removes the specified task', () => {
      const result = deleteTask(tasks, '1');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2');
    });

    it('does not affect other tasks', () => {
      const result = deleteTask(tasks, '1');
      expect(result[0]).toEqual(tasks[1]);
    });
  });

  describe('updateTask', () => {
    const tasks: Task[] = [
      { id: '1', title: 'Task 1', subject: 'Mathematics', priority: 'high', dueDate: '2024-01-15', estimatedMinutes: 30, status: 'pending', createdAt: '2024-01-10T00:00:00Z' },
    ];

    it('updates specified task', () => {
      const result = updateTask(tasks, '1', { title: 'Updated Title' });
      expect(result[0].title).toBe('Updated Title');
    });

    it('preserves other tasks', () => {
      const result = updateTask([...tasks, { id: '2', title: 'Task 2', subject: 'Science', priority: 'low', dueDate: '2024-01-16', estimatedMinutes: 45, status: 'pending', createdAt: '2024-01-10T00:00:00Z' }], '1', { title: 'Updated' });
      expect(result[1].title).toBe('Task 2');
    });
  });

  describe('getTaskById', () => {
    const tasks: Task[] = [
      { id: '1', title: 'Task 1', subject: 'Mathematics', priority: 'high', dueDate: '2024-01-15', estimatedMinutes: 30, status: 'pending', createdAt: '2024-01-10T00:00:00Z' },
    ];

    it('finds task by id', () => {
      const result = getTaskById(tasks, '1');
      expect(result?.title).toBe('Task 1');
    });

    it('returns undefined for non-existent id', () => {
      const result = getTaskById(tasks, 'nonexistent');
      expect(result).toBeUndefined();
    });
  });
});
