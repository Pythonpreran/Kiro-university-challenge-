# StudyFlow Design Document

## Architecture Overview

StudyFlow follows a simple, maintainable architecture suitable for a client-side React application:

```
src/
├── components/       # React UI components
├── hooks/           # Custom React hooks
├── utils/           # Pure utility functions
├── types/           # TypeScript type definitions
└── __tests__/       # Test files
```

### Design Principles
1. **Simplicity First**: No over-engineering. Use React state and localStorage.
2. **Functional Components**: All components are functional with hooks.
3. **Small Components**: Each component has a single responsibility.
4. **Pure Utilities**: Business logic in pure functions for easy testing.
5. **Accessibility Built-in**: ARIA labels, semantic HTML, keyboard navigation.

## Component Structure

### Component Hierarchy
```
App
├── ThemeProvider (context for dark/light mode)
│   ├── Layout
│   │   ├── Sidebar
│   │   │   ├── Dashboard
│   │   │   │   ├── StatsCard (multiple)
│   │   │   │   ├── ProgressBar
│   │   │   │   └── StreakDisplay
│   │   │   └── ThemeToggle
│   │   └── MainContent
│   │       ├── Header
│   │       │   ├── FilterBar
│   │       │   └── SortControl
│   │       ├── TaskList
│   │       │   ├── TaskCard (multiple)
│   │       │   └── EmptyState
│   │       └── TaskForm (modal/inline)
```

### Component Responsibilities

#### Layout Components
- **Layout**: Root layout container, manages responsive grid
- **Sidebar**: Dashboard area with statistics (collapsible on mobile)
- **MainContent**: Task management area

#### Dashboard Components
- **Dashboard**: Container for statistics
- **StatsCard**: Displays single metric (total, completed, pending, percentage)
- **ProgressBar**: Visual progress indicator
- **StreakDisplay**: Shows consecutive study days

#### Task Components
- **TaskList**: Renders filtered/sorted task collection
- **TaskCard**: Single task display with actions
- **TaskForm**: Create/edit form with validation
- **EmptyState**: Friendly message when no tasks

#### Control Components
- **FilterBar**: Status and category filter controls
- **SortControl**: Sort selection dropdown
- **ThemeToggle**: Dark/light mode switch

## Data Model

### Task Interface
```typescript
interface Task {
  id: string;
  title: string;
  subject: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  estimatedMinutes: number;
  status: 'pending' | 'completed';
  createdAt: string;
}
```

### Filter State
```typescript
interface FilterState {
  status: 'all' | 'pending' | 'completed';
  category: string; // 'all' or specific category
}

interface SortState {
  sortBy: 'dueDate' | 'priority';
  sortOrder: 'asc' | 'desc';
}
```

## State Management

### Application State
- **tasks**: `Task[]` - All task data
- **filters**: `FilterState` - Current filter settings
- **sort**: `SortState` - Current sort settings
- **theme**: `'light' | 'dark'` - UI theme
- **editingTask**: `Task | null` - Task being edited (if any)

### State Location
- **tasks**: Custom hook `useTasks` with localStorage sync
- **filters/sort**: Component state in `FilterBar`/`SortControl`
- **theme**: React Context via `ThemeProvider`
- **editingTask**: Component state in `TaskList` or `TaskForm`

### State Updates
```
User Action → Event Handler → Update State → localStorage Sync → UI Re-render
```

## localStorage Strategy

### Keys
- `studyflow-tasks`: JSON array of tasks
- `studyflow-theme`: Theme preference ('light' | 'dark')

### Operations
```typescript
// Load tasks
const loadTasks = (): Task[] => {
  try {
    const data = localStorage.getItem('studyflow-tasks');
    return data ? JSON.parse(data) : getSeedTasks();
  } catch {
    return getSeedTasks();
  }
};

// Save tasks
const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem('studyflow-tasks', JSON.stringify(tasks));
  } catch (e) {
    console.warn('Failed to save tasks:', e);
  }
};
```

### Synchronization
- Save immediately on any mutation (create, update, delete)
- Load once on application mount
- No periodic sync needed (single-tab application)

## Utility Functions

### Task Utilities (`src/utils/tasks.ts`)

```typescript
// Create a new task with defaults
createTask(data: Partial<Task>): Task

// Filter tasks by status and/or category
filterTasks(tasks: Task[], filters: FilterState): Task[]

// Sort tasks by priority or due date
sortTasks(tasks: Task[], sort: SortState): Task[]

// Calculate statistics
calculateStats(tasks: Task[]): TaskStats

// Generate unique ID
generateId(): string

// Validate task data
validateTask(data: Partial<Task>): ValidationResult
```

### Statistics Utilities (`src/utils/stats.ts`)

```typescript
// Count completed tasks
countCompleted(tasks: Task[]): number

// Count pending tasks
countPending(tasks: Task[]): number

// Calculate completion percentage (0-100)
calculateCompletionPercentage(total: number, completed: number): number

// Get tasks completed today
getTodayCompletedCount(tasks: Task[]): number

// Calculate study streak (consecutive days)
calculateStreak(tasks: Task[]): number
```

### Date Utilities (`src/utils/date.ts`)

```typescript
// Check if date is today
isToday(dateString: string): boolean

// Format date for display
formatDate(dateString: string): string

// Get today's date as ISO string
getToday(): string
```

### Storage Utilities (`src/utils/storage.ts`)

```typescript
// Load from localStorage with error handling
loadFromStorage<T>(key: string, fallback: T): T

// Save to localStorage with error handling
saveToStorage<T>(key: string, value: T): boolean
```

## Custom Hooks

### useTasks
Manages task state with localStorage persistence.

```typescript
function useTasks(): {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleStatus: (id: string) => void;
}
```

### useTheme
Manages theme preference with localStorage persistence.

```typescript
function useTheme(): {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
```

### useFilters
Manages filter and sort state.

```typescript
function useFilters(): {
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  sort: SortState;
  setSort: (sort: Partial<SortState>) => void;
}
```

## Testing Strategy

### Unit Tests (Vitest)
Focus on pure utility functions where business logic lives.

#### Priority Testing Targets
1. **Task utilities**: create, filter, sort, validate
2. **Statistics utilities**: counts, percentages, streak calculation
3. **Storage utilities**: load/save with error handling

### Property-Based Tests
Test invariants that hold across all inputs.

#### Properties to Test
1. Filtering never creates new tasks: `filterTasks(tasks, f).length <= tasks.length`
2. Sorting preserves count: `sortTasks(tasks, s).length === tasks.length`
3. Completion percentage bounds: `0 <= calculateCompletionPercentage(t, c) <= 100`
4. Toggle twice returns to original: `toggle(toggle(status)) === status`
5. Delete removes only target: `delete(tasks, id)` doesn't affect other tasks
6. Serialization round-trip: `parse(stringify(tasks))` equals original

### Component Tests
Limited to critical user interactions:
- Task creation with validation
- Task completion toggle
- Filter application

### Test Structure
```
src/__tests__/
├── utils/
│   ├── tasks.test.ts
│   ├── stats.test.ts
│   ├── date.test.ts
│   └── storage.test.ts
└── property/
    ├── filter.test.ts
    ├── sort.test.ts
    └── stats.test.ts
```

## Styling Approach

### CSS Variables (Theme Support)
```css
:root {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f5f5f5;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #666666;
  --color-accent: #3b82f6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --radius: 8px;
}

[data-theme="dark"] {
  --color-bg-primary: #1a1a1a;
  --color-bg-secondary: #262626;
  --color-text-primary: #f5f5f5;
  --color-text-secondary: #a3a3a3;
}
```

### Component Styling
- Simple CSS modules or inline styles
- Mobile-first responsive design
- Flexbox/Grid for layouts
- No CSS-in-JS libraries needed

### Responsive Breakpoints
- Mobile: < 768px (single column)
- Desktop: >= 768px (sidebar + main content)

## Error Handling

### User-Facing Errors
- Form validation: Inline messages next to fields
- Storage errors: Silent fallback, console warning
- Unexpected errors: Error boundary with friendly message

### Validation Rules
```typescript
const validationRules = {
  title: { required: true, maxLength: 100 },
  subject: { required: true },
  priority: { required: true, enum: ['low', 'medium', 'high'] },
  dueDate: { required: false, default: today },
  estimatedMinutes: { required: true, min: 1, max: 480 }
};
```

## Performance Considerations

### Optimization Strategy
1. **Memoization**: Use `useMemo` for filtered/sorted task lists
2. **Stable Keys**: Use task IDs as React keys
3. **Minimal Re-renders**: Keep state local when possible
4. **Lazy Operations**: Calculate stats on demand

### What We're NOT Doing
- No virtualization (list won't be large enough)
- No complex state management (Redux, Zustand, etc.)
- No service workers or offline support
- No code splitting (small app)

## File Structure Summary

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── Dashboard.tsx
│   │   ├── StatsCard.tsx
│   │   ├── ProgressBar.tsx
│   │   └── StreakDisplay.tsx
│   ├── Tasks/
│   │   ├── TaskList.tsx
│   │   ├── TaskCard.tsx
│   │   ├── TaskForm.tsx
│   │   └── EmptyState.tsx
│   ├── Layout/
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   └── MainContent.tsx
│   ├── Controls/
│   │   ├── FilterBar.tsx
│   │   ├── SortControl.tsx
│   │   └── ThemeToggle.tsx
│   └── App.tsx
├── hooks/
│   ├── useTasks.ts
│   ├── useTheme.ts
│   └── useFilters.ts
├── utils/
│   ├── tasks.ts
│   ├── stats.ts
│   ├── date.ts
│   ├── storage.ts
│   └── seedData.ts
├── types/
│   └── index.ts
├── __tests__/
│   ├── utils/
│   └── property/
├── main.tsx
└── index.css
```
