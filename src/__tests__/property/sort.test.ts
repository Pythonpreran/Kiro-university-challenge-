import { describe, it } from 'vitest';
import fc from 'fast-check';
import { sortTasks } from '../../utils/tasks';
import type { Task, SortState } from '../../types';
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

const sortArbitrary: fc.Arbitrary<SortState> = fc.record({
  sortBy: fc.constantFrom('dueDate', 'priority'),
  sortOrder: fc.constantFrom('asc', 'desc'),
});

describe('sortTasks property-based tests', () => {
  it('sorting preserves task count', () => {
    fc.assert(
      fc.property(fc.array(taskArbitrary), sortArbitrary, (tasks, sort) => {
        const result = sortTasks(tasks, sort);
        return result.length === tasks.length;
      })
    );
  });

  it('sorting preserves all original tasks (no additions or deletions)', () => {
    fc.assert(
      fc.property(fc.array(taskArbitrary), sortArbitrary, (tasks, sort) => {
        const result = sortTasks(tasks, sort);
        const originalIds = new Set(tasks.map(t => t.id));
        const resultIds = new Set(result.map(t => t.id));
        return (
          originalIds.size === resultIds.size &&
          [...originalIds].every(id => resultIds.has(id))
        );
      })
    );
  });

  it('sorting is idempotent (sorting twice gives same order)', () => {
    fc.assert(
      fc.property(fc.array(taskArbitrary), sortArbitrary, (tasks, sort) => {
        const sorted1 = sortTasks(tasks, sort);
        const sorted2 = sortTasks(sorted1, sort);
        return sorted1.every((task, i) => task.id === sorted2[i].id);
      })
    );
  });

  it('sorting does not mutate original array', () => {
    fc.assert(
      fc.property(fc.array(taskArbitrary), sortArbitrary, (tasks, sort) => {
        const originalOrder = tasks.map(t => t.id);
        sortTasks(tasks, sort);
        const newOrder = tasks.map(t => t.id);
        return originalOrder.every((id, i) => id === newOrder[i]);
      })
    );
  });
});
