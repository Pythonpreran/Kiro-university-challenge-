import { describe, it } from 'vitest';
import fc from 'fast-check';
import { filterTasks } from '../../utils/tasks';
import type { Task, FilterState } from '../../types';
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

const filterArbitrary: fc.Arbitrary<FilterState> = fc.record({
  status: fc.oneof(fc.constant('all'), statusArbitrary) as fc.Arbitrary<FilterState['status']>,
  subject: fc.oneof(fc.constant('all'), subjectArbitrary) as fc.Arbitrary<FilterState['subject']>,
});

describe('filterTasks property-based tests', () => {
  it('filtering never creates new tasks (result is always a subset)', () => {
    fc.assert(
      fc.property(fc.array(taskArbitrary), filterArbitrary, (tasks, filters) => {
        const result = filterTasks(tasks, filters);
        const originalIds = new Set(tasks.map(t => t.id));
        return result.every(t => originalIds.has(t.id));
      })
    );
  });

  it('filtering never returns more tasks than original', () => {
    fc.assert(
      fc.property(fc.array(taskArbitrary), filterArbitrary, (tasks, filters) => {
        const result = filterTasks(tasks, filters);
        return result.length <= tasks.length;
      })
    );
  });

  it('filtering with "all" filters returns same count', () => {
    fc.assert(
      fc.property(fc.array(taskArbitrary), (tasks) => {
        const result = filterTasks(tasks, { status: 'all', subject: 'all' });
        return result.length === tasks.length;
      })
    );
  });

  it('filtering by status only returns tasks with that status', () => {
    fc.assert(
      fc.property(
        fc.array(taskArbitrary),
        statusArbitrary,
        (tasks, targetStatus) => {
          const result = filterTasks(tasks, { status: targetStatus, subject: 'all' });
          return result.every(t => t.status === targetStatus);
        }
      )
    );
  });

  it('filtering by subject only returns tasks with that subject', () => {
    fc.assert(
      fc.property(
        fc.array(taskArbitrary),
        subjectArbitrary,
        (tasks, targetSubject) => {
          const result = filterTasks(tasks, { status: 'all', subject: targetSubject });
          return result.every(t => t.subject === targetSubject);
        }
      )
    );
  });

  it('filtering by both status and subject returns intersection', () => {
    fc.assert(
      fc.property(
        fc.array(taskArbitrary),
        statusArbitrary,
        subjectArbitrary,
        (tasks, targetStatus, targetSubject) => {
          const result = filterTasks(tasks, { status: targetStatus, subject: targetSubject });
          return result.every(t => 
            t.status === targetStatus && t.subject === targetSubject
          );
        }
      )
    );
  });
});
