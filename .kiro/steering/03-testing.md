# StudyFlow Testing Steering

## Testing Philosophy

### Test Behavior, Not Implementation
Tests should verify what the code does, not how it does it.

```typescript
// GOOD: Test the behavior
describe('filterTasks', () => {
  it('returns only pending tasks when filtering by pending status', () => {
    const tasks = [
      { id: '1', status: 'pending', title: 'Task 1' },
      { id: '2', status: 'completed', title: 'Task 2' },
    ];
    const result = filterTasks(tasks, { status: 'pending', category: 'all' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });
});

// BAD: Testing implementation details
it('calls the filter function twice', () => {
  // This couples the test to how the code works internally
});
```

### Test Utility Functions Heavily
Pure functions are easy to test and provide the most value.

```typescript
// These get comprehensive test coverage
- filterTasks()
- sortTasks()
- calculateCompletionPercentage()
- validateTask()
- formatDate()
```

### Test Important User-Facing Behavior
Don't test every component prop combination. Focus on critical paths.

```typescript
// Worth testing
- Creating a task with valid data succeeds
- Creating a task with invalid data shows errors
- Toggling task completion updates status
- Dashboard statistics reflect task changes

// Not worth testing (too granular)
- Every possible prop combination on a display component
- Snapshot tests that break on any change
- Internal state transitions
```

## Vitest Configuration

### Basic Setup
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
```

### Test File Location
```
src/
  __tests__/
    utils/
      tasks.test.ts
      stats.test.ts
      date.test.ts
      storage.test.ts
    property/
      filter.test.ts
      sort.test.ts
      stats.test.ts
```

### Running Tests
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific file
npm test -- tasks.test.ts

# Watch mode (use --run for single execution)
npm test -- --run
```

## Unit Test Patterns

### Arrange-Act-Assert
```typescript
it('calculates completion percentage correctly', () => {
  // Arrange
  const total = 10;
  const completed = 3;
  
  // Act
  const percentage = calculateCompletionPercentage(total, completed);
  
  // Assert
  expect(percentage).toBe(30);
});
```

### Test Edge Cases
```typescript
describe('calculateCompletionPercentage', () => {
  it('returns 0 when total is 0', () => {
    expect(calculateCompletionPercentage(0, 0)).toBe(0);
  });

  it('returns 100 when all tasks completed', () => {
    expect(calculateCompletionPercentage(5, 5)).toBe(100);
  });

  it('rounds to nearest integer', () => {
    expect(calculateCompletionPercentage(3, 1)).toBe(33);
  });
});
```

### Test Error Conditions
```typescript
describe('validateTask', () => {
  it('returns error when title is missing', () => {
    const result = validateTask({ title: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.title).toBe('Title is required');
  });

  it('returns error when title exceeds max length', () => {
    const result = validateTask({ title: 'a'.repeat(101) });
    expect(result.errors.title).toBe('Title must be 100 characters or less');
  });
});
```

## Property-Based Testing

### Why Property-Based Testing
Property-based tests verify that certain properties (invariants) hold for all inputs, not just the examples we think to test.

### Properties to Test

#### Filtering Invariants
```typescript
import { describe, it, expect } from 'vitest';
import fc from 'fast-check';

describe('filterTasks properties', () => {
  it('filtering returns a subset of original tasks', () => {
    fc.assert(
      fc.property(
        fc.array(fc.anything()),
        fc.record({ status: fc.string(), category: fc.string() }),
        (tasks, filters) => {
          const result = filterTasks(tasks as Task[], filters);
          return result.length <= tasks.length;
        }
      )
    );
  });

  it('filtering never creates new tasks', () => {
    fc.assert(
      fc.property(tasksArbitrary, filterArbitrary, (tasks, filters) => {
        const result = filterTasks(tasks, filters);
        const originalIds = new Set(tasks.map(t => t.id));
        return result.every(t => originalIds.has(t.id));
      })
    );
  });
});
```

#### Sorting Invariants
```typescript
it('sorting preserves count', () => {
  fc.assert(
    fc.property(tasksArbitrary, sortArbitrary, (tasks, sort) => {
      const result = sortTasks(tasks, sort);
      return result.length === tasks.length;
    })
  );
});

it('sorting is idempotent (sorting twice gives same result)', () => {
  fc.assert(
    fc.property(tasksArbitrary, sortArbitrary, (tasks, sort) => {
      const sorted1 = sortTasks(tasks, sort);
      const sorted2 = sortTasks(sorted1, sort);
      return sorted1.every((task, i) => task.id === sorted2[i].id);
    })
  );
});
```

#### Statistics Invariants
```typescript
it('completion percentage is always between 0 and 100', () => {
  fc.assert(
    fc.property(fc.nat(100), fc.nat(100), (total, completed) => {
      // Ensure completed <= total
      const actualCompleted = Math.min(completed, total);
      const percentage = calculateCompletionPercentage(total, actualCompleted);
      return percentage >= 0 && percentage <= 100;
    })
  );
});

it('completed count never exceeds total', () => {
  fc.assert(
    fc.property(tasksArbitrary, (tasks) => {
      const completed = countCompleted(tasks);
      const total = tasks.length;
      return completed <= total;
    })
  );
});
```

#### Task Operations Invariants
```typescript
it('toggling status twice returns to original', () => {
  fc.assert(
    fc.property(statusArbitrary, (status) => {
      const toggled = toggleStatus(toggleStatus(status));
      return toggled === status;
    })
  );
});

it('deleting a task removes only that task', () => {
  fc.assert(
    fc.property(tasksArbitrary, fc.nat(), (tasks, index) => {
      if (tasks.length === 0) return true;
      const targetId = tasks[index % tasks.length].id;
      const remaining = deleteTask(tasks, targetId);
      
      return (
        remaining.length === tasks.length - 1 &&
        remaining.every(t => t.id !== targetId) &&
        remaining.every(t => tasks.some(original => original.id === t.id))
      );
    })
  );
});
```

### Custom Arbitraries
```typescript
// Define reusable test data generators
const priorityArbitrary = fc.constantFrom('low', 'medium', 'high');
const statusArbitrary = fc.constantFrom('pending', 'completed');

const taskArbitrary = fc.record({
  id: fc.string({ minLength: 1 }),
  title: fc.string({ minLength: 1, maxLength: 100 }),
  subject: fc.string(),
  priority: priorityArbitrary,
  dueDate: fc.dateString(), // ISO date string
  estimatedMinutes: fc.nat(480),
  status: statusArbitrary,
  createdAt: fc.dateString(),
});

const tasksArbitrary = fc.array(taskArbitrary);
```

## Test Determinism

### Avoid These Non-Deterministic Patterns
```typescript
// BAD: Depends on current time
const task = { createdAt: new Date().toISOString() };

// GOOD: Accept date as parameter or use fixed date
const task = { createdAt: testDate };
```

```typescript
// BAD: Random values
const id = Math.random().toString();

// GOOD: Deterministic in tests
const id = 'test-id-1';
```

### Use Test Utilities for Consistency
```typescript
function createTestTask(overrides?: Partial<Task>): Task {
  return {
    id: 'test-id',
    title: 'Test Task',
    subject: 'Math',
    priority: 'medium',
    dueDate: '2024-01-15',
    estimatedMinutes: 30,
    status: 'pending',
    createdAt: '2024-01-10T10:00:00Z',
    ...overrides,
  };
}

// Then in tests
const task1 = createTestTask({ id: 'task-1', status: 'completed' });
const task2 = createTestTask({ id: 'task-2', title: 'Different Title' });
```

## What NOT to Test

### Skip These Low-Value Tests
- Snapshot tests (break too easily, provide little value)
- Every prop combination on presentational components
- Third-party library behavior (they test their own code)
- React's internal behavior (React is well-tested)
- CSS styling details (visual testing is better for this)

### Test Coverage Philosophy
> 100% coverage is not the goal. Useful coverage is.

A test that verifies `2 + 2 = 4` provides 100% coverage of that line but zero value if the requirement was `2 + 2 = 5` and we never test the actual business rule.

## Test Commands

```bash
# Run tests once (CI mode)
npm test -- --run

# Run tests in watch mode (development)
npm test

# Run with coverage report
npm test -- --coverage

# Run specific test file
npm test -- tasks.test.ts

# Run property-based tests only
npm test -- property/
```

## Remember

> Tests give you confidence to refactor. If tests are brittle, you lose that confidence.

> A few well-chosen tests beat many low-value tests.

> Property-based tests find bugs you didn't think to look for.
