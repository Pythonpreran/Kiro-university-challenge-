# StudyFlow Testing Patterns

## Test Philosophy

### Test Behavior, Not Implementation
Tests verify what the code does, not how it does it internally.

### Focus on Utility Functions
Pure functions provide the best testing ROI. Test them comprehensively.

### Property-Based Testing for Invariants
Use fast-check to verify properties that hold across all inputs.

## Test Structure

### File Organization
```
src/__tests__/
├── utils/
│   ├── tasks.test.ts
│   ├── stats.test.ts
│   └── date.test.ts
└── property/
    ├── filter.test.ts
    ├── sort.test.ts
    └── stats.test.ts
```

### Test File Template
```typescript
import { describe, it, expect } from 'vitest';
import { functionName } from '../../utils/module';

describe('module name', () => {
  describe('functionName', () => {
    it('does something specific', () => {
      // Arrange
      const input = 'value';
      
      // Act
      const result = functionName(input);
      
      // Assert
      expect(result).toBe('expected');
    });
  });
});
```

## Unit Test Patterns

### Arrange-Act-Assert
```typescript
it('calculates percentage correctly', () => {
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

  it('returns 100 when all completed', () => {
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
  it('returns error for empty title', () => {
    const result = validateTask({ title: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.title).toBe('Title is required');
  });

  it('returns error for title exceeding max length', () => {
    const result = validateTask({ title: 'a'.repeat(101) });
    expect(result.errors.title).toBe('Title must be 100 characters or less');
  });
});
```

### Use Test Factories
```typescript
function createTestTask(overrides?: Partial<Task>): Task {
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

// Usage
const task1 = createTestTask({ status: 'completed' });
const task2 = createTestTask({ priority: 'high', title: 'Different' });
```

## Property-Based Test Patterns

### Custom Arbitraries
```typescript
import fc from 'fast-check';

const priorityArbitrary = fc.constantFrom('low', 'medium', 'high');
const statusArbitrary = fc.constantFrom('pending', 'completed');
const subjectArbitrary = fc.constantFrom('Mathematics', 'Science', 'English', 'History', 'Computer Science', 'Other');

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
```

### Invariant Testing
```typescript
describe('filterTasks properties', () => {
  it('filtering returns a subset of original', () => {
    fc.assert(
      fc.property(fc.array(taskArbitrary), filterArbitrary, (tasks, filters) => {
        const result = filterTasks(tasks, filters);
        return result.length <= tasks.length;
      })
    );
  });

  it('filtering never creates new tasks', () => {
    fc.assert(
      fc.property(fc.array(taskArbitrary), filterArbitrary, (tasks, filters) => {
        const result = filterTasks(tasks, filters);
        const originalIds = new Set(tasks.map(t => t.id));
        return result.every(t => originalIds.has(t.id));
      })
    );
  });
});
```

### Statistics Invariants
```typescript
it('completion percentage is always between 0 and 100', () => {
  fc.assert(
    fc.property(fc.nat(1000), fc.nat(1000), (total, completed) => {
      const actualCompleted = Math.min(completed, total);
      const percentage = calculateCompletionPercentage(total, actualCompleted);
      return percentage >= 0 && percentage <= 100;
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
```

## Testing Commands

```bash
# Run all tests once
npm test

# Run in watch mode
npm test:watch

# Run with coverage
npm test:coverage

# Run specific file
npm test -- tasks.test.ts

# Run property tests only
npm test -- property/
```

## What NOT to Test

### Low-Value Tests
- Snapshot tests (break too easily)
- Every prop combination on presentational components
- Third-party library behavior
- React internals

### Skip These
- CSS styling details (use visual testing)
- Deep component state transitions
- Implementation details that change frequently

## Determinism Rules

### Avoid Non-Deterministic Patterns
```typescript
// BAD: Depends on current time
const task = { createdAt: new Date().toISOString() };

// GOOD: Accept as parameter or use fixed date
const task = { createdAt: testDate };
```

```typescript
// BAD: Random values
const id = Math.random().toString();

// GOOD: Deterministic in tests
const id = 'test-id-1';
```

### Use Fixed Dates
```typescript
const TEST_DATE = '2024-01-15';
const TEST_TIMESTAMP = '2024-01-15T10:00:00Z';

const task = createTestTask({
  dueDate: TEST_DATE,
  createdAt: TEST_TIMESTAMP,
});
```

## Mocking Strategy

### Don't Mock What You Don't Own
- Don't mock React hooks
- Don't mock localStorage (use real or wrapper)
- Don't mock utility functions (test them directly)

### When to Mock
- External APIs (not applicable to StudyFlow)
- Complex dependencies that slow tests

## Coverage Philosophy

> 100% coverage is not the goal. Useful coverage is.

A test that verifies `2 + 2 = 4` provides 100% coverage of that line but zero value if the requirement was `2 + 2 = 5`.

### Focus On
- Business logic in utilities
- Validation rules
- Edge cases (empty arrays, boundary values)
- Invariants via property-based tests

### Don't Focus On
- Component render counts
- Internal state transitions
- Styling details
- Configuration code

## Test Checklist

Before committing:
- [ ] All existing tests pass
- [ ] New code has appropriate tests
- [ ] Edge cases covered
- [ ] No flaky tests
- [ ] Tests are deterministic
- [ ] No console errors in test output
- [ ] Coverage maintained or improved

## StudyFlow Test Examples

### Task Utilities
```typescript
// tasks.test.ts
describe('filterTasks', () => {
  it('filters by status', () => {
    const tasks = [
      createTestTask({ id: '1', status: 'pending' }),
      createTestTask({ id: '2', status: 'completed' }),
    ];
    const result = filterTasks(tasks, { status: 'pending', subject: 'all' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });
});
```

### Statistics Utilities
```typescript
// stats.test.ts
describe('calculateStats', () => {
  it('calculates all statistics correctly', () => {
    const tasks = [
      createTestTask({ status: 'completed' }),
      createTestTask({ status: 'pending' }),
      createTestTask({ status: 'completed' }),
    ];
    const stats = calculateStats(tasks);
    expect(stats.total).toBe(3);
    expect(stats.completed).toBe(2);
    expect(stats.percentage).toBe(67);
  });
});
```

### Property-Based
```typescript
// property/filter.test.ts
it('filtering by both status and subject returns intersection', () => {
  fc.assert(
    fc.property(
      fc.array(taskArbitrary),
      statusArbitrary,
      subjectArbitrary,
      (tasks, targetStatus, targetSubject) => {
        const result = filterTasks(tasks, { 
          status: targetStatus, 
          subject: targetSubject 
        });
        return result.every(t => 
          t.status === targetStatus && t.subject === targetSubject
        );
      }
    )
  );
});
```
