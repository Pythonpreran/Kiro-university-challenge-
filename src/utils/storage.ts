import { PRIORITIES, STATUSES, SUBJECTS } from '../types';
import type { Task } from '../types';

const TASKS_KEY = 'studyflow-tasks';
const THEME_KEY = 'studyflow-theme';

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    if (data === null) {
      return fallback;
    }
    return JSON.parse(data) as T;
  } catch {
    console.warn(`Failed to load ${key} from localStorage`);
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    console.warn(`Failed to save ${key} to localStorage`);
    return false;
  }
}

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const task = value as Record<string, unknown>;
  return (
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    SUBJECTS.includes(task.subject as Task['subject']) &&
    PRIORITIES.includes(task.priority as Task['priority']) &&
    typeof task.dueDate === 'string' &&
    typeof task.estimatedMinutes === 'number' &&
    Number.isFinite(task.estimatedMinutes) &&
    STATUSES.includes(task.status as Task['status']) &&
    typeof task.createdAt === 'string'
  );
}

/** Returns null when the value is absent, malformed, or not a task collection. */
export function loadTasks(): Task[] | null {
  const storedTasks = loadFromStorage<unknown>(TASKS_KEY, null);
  return Array.isArray(storedTasks) && storedTasks.every(isTask) ? storedTasks : null;
}

export function saveTasks(tasks: Task[]): boolean {
  return saveToStorage(TASKS_KEY, tasks);
}

export function loadTheme(): 'light' | 'dark' {
  const storedTheme = loadFromStorage<unknown>(THEME_KEY, 'light');
  return storedTheme === 'dark' ? 'dark' : 'light';
}

export function saveTheme(theme: 'light' | 'dark'): boolean {
  return saveToStorage(THEME_KEY, theme);
}
