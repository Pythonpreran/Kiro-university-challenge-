# StudyFlow Quality Skill

## Purpose
Ensure StudyFlow development follows established patterns, maintains code quality, and delivers a polished user experience.

## When to Use
Invoke this skill when:
- Creating new React components
- Implementing task management features
- Adding form validation
- Working with localStorage
- Writing tests
- Reviewing accessibility

## Core Principles

### 1. Simplicity First
- No over-engineering
- Prefer simple solutions over clever ones
- Avoid unnecessary abstractions
- Keep the complexity budget in mind (~20-30 source files, ~1500-2500 LOC)

### 2. TypeScript Strict Mode
- All code must pass TypeScript strict checks
- Avoid `any` type unless absolutely necessary
- Use explicit interfaces for object shapes
- Use const assertions for literal types

### 3. React Patterns
- Functional components only (no class components)
- Small, focused components (single responsibility)
- Custom hooks for logic extraction
- useState/useCallback for state management
- No Redux, Zustand, or external state libraries

### 4. Task Management UI
- Clear visual hierarchy
- Responsive design (mobile-first)
- Accessible labels and interactions
- Immediate feedback on actions
- Empty states for guidance

## Component Patterns

### Component Structure
```typescript
// 1. Types at top
interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
}

// 2. Component function
function TaskCard({ task, onComplete }: TaskCardProps) {
  // 3. Hooks
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 4. Handlers
  const handleClick = () => onComplete(task.id);
  
  // 5. Render
  return <div>...</div>;
}

// 6. Export
export { TaskCard };
```

### Form Validation Pattern
```typescript
function validateTask(data: Partial<TaskFormData>): ValidationResult {
  const errors: ValidationErrors = {};
  
  if (!data.title?.trim()) {
    errors.title = 'Title is required';
  } else if (data.title.length > 100) {
    errors.title = 'Title must be 100 characters or less';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
```

## localStorage Safety

### Read Pattern
```typescript
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    console.warn(`Failed to load ${key}`);
    return fallback;
  }
}
```

### Write Pattern
```typescript
function saveToStorage<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn('Storage full or unavailable', e);
    return false;
  }
}
```

## Testing Patterns

### Unit Tests
- Test utility functions heavily
- Use Arrange-Act-Assert pattern
- Test edge cases explicitly
- Keep tests deterministic

### Property-Based Tests
- Use fast-check library
- Test invariants (filtering returns subset, sorting preserves count)
- Verify boundary conditions
- Use custom arbitraries for domain types

## Accessibility Checklist

1. **Forms**
   - All inputs have associated labels
   - Error messages linked via aria-describedby
   - Focus management on modal open/close

2. **Interactive Elements**
   - Buttons have discernible text or aria-label
   - Checkbox states communicated via aria-pressed
   - Keyboard navigation works

3. **Visual Design**
   - Contrast ratios meet WCAG AA (4.5:1 for text)
   - Status not conveyed by color alone
   - Focus indicators visible

## Common Patterns in StudyFlow

### Filter and Sort
```typescript
const filtered = filterTasks(tasks, filters);
const sorted = sortTasks(filtered, sort);
```

### Statistics Calculation
```typescript
const stats = useMemo(() => calculateStats(tasks), [tasks]);
```

### Theme Toggle
```typescript
const { theme, toggleTheme } = useTheme();
// theme persists in localStorage
```

## Anti-Patterns to Avoid

1. **Over-abstraction**: Don't create "frameworks within the app"
2. **Premature optimization**: Profile before optimizing
3. **Deep component trees**: Keep nesting shallow
4. **Prop drilling**: Use context for deeply shared state
5. **Inline styles for logic**: Use CSS classes for conditional styling
6. **Uncontrolled effects**: Always specify dependencies

## Quick Reference

- **Add task**: `addTask(formData)` → creates with defaults
- **Update task**: `updateTask(id, updates)` → partial update
- **Delete task**: `deleteTask(id)` → removes from collection
- **Toggle status**: `toggleStatus(id)` → pending ↔ completed
- **Calculate stats**: `calculateStats(tasks)` → all metrics

## Verification Steps

Before submitting changes:
1. `npm run lint` passes with no errors
2. `npm test` passes all tests
3. `npm run build` succeeds
4. Manual test of key flows (create, edit, delete, complete)
5. Check responsive layout at 320px, 768px, 1024px
6. Verify accessibility with keyboard navigation
