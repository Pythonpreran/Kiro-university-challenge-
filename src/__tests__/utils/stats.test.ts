import { describe, it, expect } from 'vitest';
import {
  countCompleted,
  countPending,
  calculateCompletionPercentage,
  getTodayCompletedCount,
  calculateStreak,
  calculateStats,
} from '../../utils/stats';
import type { Task } from '../../types';
import { getToday } from '../../utils/date';

function createTask(overrides: Partial<Task>): Task {
  return {
    id: 'test-id',
    title: 'Test Task',
    subject: 'Mathematics',
    priority: 'medium',
    dueDate: '2024-01-15',
    estimatedMinutes: 30,
    status: 'pending',
    createdAt: '2024-01-10T00:00:00Z',
    ...overrides,
  };
}

describe('statistics utilities', () => {
  describe('countCompleted', () => {
    it('counts completed tasks', () => {
      const tasks = [
        createTask({ id: '1', status: 'completed' }),
        createTask({ id: '2', status: 'pending' }),
        createTask({ id: '3', status: 'completed' }),
      ];
      expect(countCompleted(tasks)).toBe(2);
    });

    it('returns 0 for empty array', () => {
      expect(countCompleted([])).toBe(0);
    });
  });

  describe('countPending', () => {
    it('counts pending tasks', () => {
      const tasks = [
        createTask({ id: '1', status: 'pending' }),
        createTask({ id: '2', status: 'completed' }),
        createTask({ id: '3', status: 'pending' }),
      ];
      expect(countPending(tasks)).toBe(2);
    });
  });

  describe('calculateCompletionPercentage', () => {
    it('calculates percentage correctly', () => {
      expect(calculateCompletionPercentage(10, 3)).toBe(30);
    });

    it('returns 0 when total is 0', () => {
      expect(calculateCompletionPercentage(0, 0)).toBe(0);
    });

    it('returns 100 when all completed', () => {
      expect(calculateCompletionPercentage(5, 5)).toBe(100);
    });

    it('clamps impossible completion counts to the valid range', () => {
      expect(calculateCompletionPercentage(5, 9)).toBe(100);
      expect(calculateCompletionPercentage(5, -1)).toBe(0);
    });

    it('rounds to nearest integer', () => {
      expect(calculateCompletionPercentage(3, 1)).toBe(33);
      expect(calculateCompletionPercentage(7, 5)).toBe(71);
    });
  });

  describe('getTodayCompletedCount', () => {
    it('counts tasks completed today', () => {
      const today = getToday();
      const tasks = [
        createTask({ id: '1', status: 'completed', dueDate: today }),
        createTask({ id: '2', status: 'completed', dueDate: '2024-01-01' }),
        createTask({ id: '3', status: 'pending', dueDate: today }),
      ];
      expect(getTodayCompletedCount(tasks)).toBe(1);
    });
  });

  describe('calculateStreak', () => {
    it('returns 0 for no completed tasks', () => {
      expect(calculateStreak([])).toBe(0);
      expect(calculateStreak([createTask({ status: 'pending' })])).toBe(0);
    });

    it('calculates streak correctly', () => {
      const today = getToday();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      const tasks = [
        createTask({ status: 'completed', dueDate: today }),
        createTask({ status: 'completed', dueDate: yesterdayStr }),
      ];
      expect(calculateStreak(tasks)).toBeGreaterThanOrEqual(1);
    });
  });

  describe('calculateStats', () => {
    it('calculates all statistics', () => {
      const today = getToday();
      const tasks = [
        createTask({ id: '1', status: 'completed', dueDate: today }),
        createTask({ id: '2', status: 'pending' }),
        createTask({ id: '3', status: 'completed' }),
      ];

      const stats = calculateStats(tasks);

      expect(stats.total).toBe(3);
      expect(stats.completed).toBe(2);
      expect(stats.pending).toBe(1);
      expect(stats.percentage).toBe(67);
      expect(stats.streak).toBeGreaterThanOrEqual(0);
    });
  });
});
