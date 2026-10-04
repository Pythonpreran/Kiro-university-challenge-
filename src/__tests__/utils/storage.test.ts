import { afterEach, describe, expect, it, vi } from 'vitest';
import { loadTasks, loadTheme, saveTasks } from '../../utils/storage';
import type { Task } from '../../types';

const task: Task = {
  id: 'task-1',
  title: 'Review notes',
  subject: 'Science',
  priority: 'medium',
  dueDate: '2026-10-03',
  estimatedMinutes: 30,
  status: 'pending',
  createdAt: '2026-10-03T10:00:00.000Z',
};

afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('storage utilities', () => {
  it('returns null when there is no saved task collection', () => {
    expect(loadTasks()).toBeNull();
  });

  it('preserves a valid empty task collection', () => {
    localStorage.setItem('studyflow-tasks', '[]');
    expect(loadTasks()).toEqual([]);
  });

  it('restores a valid task collection', () => {
    expect(saveTasks([task])).toBe(true);
    expect(loadTasks()).toEqual([task]);
  });

  it('rejects malformed task data instead of exposing it to the application', () => {
    localStorage.setItem('studyflow-tasks', JSON.stringify({ unexpected: true }));
    expect(loadTasks()).toBeNull();
  });

  it('falls back to light mode for an invalid saved theme', () => {
    localStorage.setItem('studyflow-theme', JSON.stringify('neon'));
    expect(loadTheme()).toBe('light');
  });
});
