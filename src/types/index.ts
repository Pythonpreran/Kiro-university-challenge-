export const PRIORITIES = ['low', 'medium', 'high'] as const;
export type Priority = (typeof PRIORITIES)[number];

export const STATUSES = ['pending', 'completed'] as const;
export type Status = (typeof STATUSES)[number];

export const SUBJECTS = [
  'Mathematics',
  'Science',
  'English',
  'History',
  'Computer Science',
  'Other',
] as const;
export type Subject = (typeof SUBJECTS)[number];

export interface Task {
  id: string;
  title: string;
  subject: Subject;
  priority: Priority;
  dueDate: string;
  estimatedMinutes: number;
  status: Status;
  createdAt: string;
}

export interface FilterState {
  status: 'all' | Status;
  subject: 'all' | Subject;
}

export interface SortState {
  sortBy: 'dueDate' | 'priority';
  sortOrder: 'asc' | 'desc';
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  percentage: number;
  todayCompleted: number;
  streak: number;
}

export interface ValidationErrors {
  title?: string;
  subject?: string;
  priority?: string;
  estimatedMinutes?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}

export interface TaskFormData {
  title: string;
  subject: Subject;
  priority: Priority;
  dueDate: string;
  estimatedMinutes: number;
}
