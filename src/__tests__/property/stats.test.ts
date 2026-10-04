import { describe, it } from 'vitest';
import fc from 'fast-check';
import {
  countCompleted,
  countPending,
  calculateCompletionPercentage,
  calculateStreak,
} from '../../utils/stats';
import type { Task } from '../../types';
import { PRIORITIES, STATUSES, SUBJECTS } from '../../types';

const priorityArbitrary = fc.constantFrom(...PRIORITIES);
const statusArbitrary = fc.constantFrom(...STATUSES);
const subjectArbitrary = fc.constantFrom(...SUBJECTS);

const taskArbitrary: fc.Arbitrary<Task> = fc.record({
  id: fc.string({ minLength: 1, maxLength: 10 }),
  title: fc.string({ minLength: 1, maxLength: 100 }),
  subject: subjectArbitrary,
  priority: priorityArbitrary,
  dueDate: fc.string({ minLength: 10, maxLength: 10 }),
  estimatedMinutes: fc.nat(480),
  status: statusArbitrary,
  createdAt: fc.string({ minLength: 10, maxLength: 10 }),
}) as fc.Arbitrary<Task>;

describe('statistics property-based tests', () => {
  it('completion percentage is always between 0 and 100 inclusive', () => {
    fc.assert(
      fc.property(fc.nat(1000), fc.nat(1000), (total, completed) => {
        const actualCompleted = Math.min(completed, total);
        const percentage = calculateCompletionPercentage(total, actualCompleted);
        return percentage >= 0 && percentage <= 100;
      })
    );
  });

  it('completed count never exceeds total count', () => {
    fc.assert(
      fc.property(fc.array(taskArbitrary), (tasks) => {
        const completed = countCompleted(tasks);
        const total = tasks.length;
        return completed <= total;
      })
    );
  });

  it('pending count never exceeds total count', () => {
    fc.assert(
      fc.property(fc.array(taskArbitrary), (tasks) => {
        const pending = countPending(tasks);
        const total = tasks.length;
        return pending <= total;
      })
    );
  });

  it('completed + pending equals total', () => {
    fc.assert(
      fc.property(fc.array(taskArbitrary), (tasks) => {
        const completed = countCompleted(tasks);
        const pending = countPending(tasks);
        return completed + pending === tasks.length;
      })
    );
  });

  it('completion percentage is 0 when total is 0', () => {
    fc.assert(
      fc.property(fc.nat(100), (completed) => {
        const percentage = calculateCompletionPercentage(0, completed);
        return percentage === 0;
      })
    );
  });

  it('completion percentage is 100 when all completed', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 1000 }), (total) => {
        const percentage = calculateCompletionPercentage(total, total);
        return percentage === 100;
      })
    );
  });

  it('streak is always non-negative', () => {
    fc.assert(
      fc.property(fc.array(taskArbitrary), (tasks) => {
        const streak = calculateStreak(tasks);
        return streak >= 0;
      })
    );
  });
});
