# StudyFlow Code Style Steering

## TypeScript Guidelines

### Strict Mode
TypeScript strict mode is enabled. Leverage the type system fully.

### Type Definitions
```typescript
// PREFER: Explicit interfaces for object shapes
interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed';
}

// AVOID: Inline type literals scattered throughout
const processTask = (task: { id: string; title: string }) => { ... }
```

### Avoid `any`
```typescript
// AVOID
const data: any = fetchData();

// PREFER
const data: unknown = fetchData();
if (isValidData(data)) {
  // data is now typed
}
```

Only use `any` when interfacing with untyped third-party code and document why.

### Use Const Assertions
```typescript
// PREFER
const PRIORITIES = ['low', 'medium', 'high'] as const;
type Priority = typeof PRIORITIES[number];

// AVOID
type Priority = 'low' | 'medium' | 'high'; // manually repeated
```

## React Guidelines

### Functional Components Only
```typescript
// PREFER
function TaskCard({ task }: TaskCardProps) {
  return <div>{task.title}</div>;
}

// AVOID
class TaskCard extends React.Component<TaskCardProps> {
  render() {
    return <div>{this.props.task.title}</div>;
  }
}
```

### Component Structure
```typescript
// 1. Types/Interfaces at top
interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
}

// 2. Component function
function TaskCard({ task, onComplete }: TaskCardProps) {
  // 3. Hooks at the top
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 4. Event handlers
  const handleClick = () => {
    onComplete(task.id);
  };
  
  // 5. Render
  return (
    <div>
      {/* ... */}
    </div>
  );
}

// 6. Export at bottom
export { TaskCard };
```

### Small Components
Each component should do one thing well.

```typescript
// GOOD: Focused component
function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="progress-bar">
      <div style={{ width: `${percentage}%` }} />
    </div>
  );
}

// BAD: Doing too much
function TaskWithProgressAndActionsAndEditing({ task }: Props) {
  // 200 lines of mixed concerns...
}
```

### Custom Hooks for Logic
```typescript
// PREFER: Extract logic to hooks
function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const addTask = useCallback((task: Task) => {
    setTasks(prev => [...prev, task]);
  }, []);
  
  return { tasks, addTask };
}

// Then in component
function TaskList() {
  const { tasks, addTask } = useTasks();
  // ...
}
```

## Naming Conventions

### Variables and Functions
```typescript
// Use camelCase
const taskCount = 5;
function calculatePercentage() { }

// Use descriptive names
const completedTaskCount = 5;  // GOOD
const count = 5;               // BAD (too vague)

// Boolean names should read naturally
const isComplete = true;
const hasCompletedTasks = true;
const canSubmit = false;
```

### Components
```typescript
// PascalCase for components
function TaskCard() { }
function ProgressBar() { }

// Match filename to component name
// TaskCard.tsx exports TaskCard
```

### Types and Interfaces
```typescript
// PascalCase with descriptive suffixes
interface TaskCardProps { }
interface FilterState { }
type Status = 'pending' | 'completed';
```

### Constants
```typescript
// SCREAMING_SNAKE_CASE for true constants
const MAX_TITLE_LENGTH = 100;
const STORAGE_KEY = 'studyflow-tasks';

// camelCase for configuration objects
const defaultFilters = {
  status: 'all',
  category: 'all'
};
```

## Formatting Rules

### Imports
```typescript
// 1. External imports first
import { useState, useCallback } from 'react';

// 2. Internal imports second
import { Task } from '../types';
import { formatDate } from '../utils/date';

// 3. Types last (if using type-only imports)
import type { FilterState } from '../types';
```

### Functions
```typescript
// Arrow functions for short utilities
const add = (a: number, b: number) => a + b;

// Function declarations for components
function TaskCard() { }

// Named exports for utilities
export function filterTasks(tasks: Task[], filter: Filter): Task[] {
  // ...
}
```

### JSX
```typescript
// Multiline JSX is properly indented
return (
  <div className="task-card">
    <h3>{task.title}</h3>
    <p>{task.subject}</p>
  </div>
);

// Conditional rendering with && for simple cases
{isLoading && <Spinner />}

// Ternary for either/or
{isComplete ? 'Completed' : 'Pending'}

// Early returns to avoid deep nesting
if (!task) {
  return null;
}
return <TaskCard task={task} />;
```

## Accessibility Rules

### Always Include
```typescript
// Labels for inputs
<label htmlFor="task-title">Title</label>
<input id="task-title" type="text" />

// Buttons with text or aria-label
<button aria-label="Delete task">
  <TrashIcon />
</button>

// Alt text for images
<img src="icon.png" alt="Task completed" />

// Form validation messages linked to inputs
<input aria-describedby="title-error" />
<span id="title-error">Title is required</span>
```

### Focus Management
```typescript
// Auto-focus on modal open
useEffect(() => {
  if (isOpen) {
    firstInputRef.current?.focus();
  }
}, [isOpen]);
```

### Semantic HTML
```typescript
// Use appropriate elements
<button>Click me</button>  // NOT <div onClick={...}>
<nav>...</nav>             // NOT <div class="nav">
<main>...</main>           // NOT <div class="main">
<article>...</article>     // NOT <div class="article">
```

## Error Handling

### User-Facing Errors
```typescript
// Show friendly messages
try {
  saveToStorage(tasks);
} catch (error) {
  // Log for debugging
  console.error('Storage error:', error);
  // User sees nothing broken
}
```

### Validation
```typescript
// Validate at boundaries
function createTask(data: unknown): Task | ValidationError {
  if (!isValidTaskData(data)) {
    return { error: 'Invalid task data' };
  }
  return {
    id: generateId(),
    ...data,
    createdAt: new Date().toISOString()
  };
}
```

## Comments

### When to Comment
```typescript
// Good: Explain WHY, not WHAT
// Using parseInt instead of Number() to handle "123abc" cases
const value = parseInt(input, 10);

// Good: Document non-obvious business logic
// Streak counts consecutive days, resetting on any day with no completions
function calculateStreak(tasks: Task[]): number {
  // ...
}

// Bad: Comment explains what code already says
// Increment count by 1
count += 1;
```

### JSDoc for Public APIs
```typescript
/**
 * Filters tasks by status and/or category.
 * @param tasks - The task collection to filter
 * @param filters - Filter criteria
 * @returns A new array containing only matching tasks
 */
export function filterTasks(tasks: Task[], filters: FilterState): Task[] {
  // ...
}
```

## File Organization

### One Component Per File
```
TaskCard.tsx exports TaskCard
ProgressBar.tsx exports ProgressBar
```

### Group Related Files
```
components/
  Dashboard/
    Dashboard.tsx
    StatsCard.tsx
    ProgressBar.tsx
  Tasks/
    TaskList.tsx
    TaskCard.tsx
```

### Utilities by Domain
```
utils/
  tasks.ts      // Task operations
  stats.ts      // Statistics calculations
  date.ts       // Date utilities
  storage.ts    // localStorage helpers
```

## Remember

> Code is read more often than it is written. Prioritize readability over cleverness.

> The best code is no code. The second best is simple, clear code.

When uncertain, ask: "Would a new developer understand this immediately?"
