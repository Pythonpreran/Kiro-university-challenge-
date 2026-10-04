import type { Task, Subject, Priority, Status } from '../types';
import { getToday } from './date';

function daysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

export function getSeedTasks(): Task[] {
  return [
    {
      id: 'seed-1',
      title: 'Complete algebra homework',
      subject: 'Mathematics' as Subject,
      priority: 'high' as Priority,
      dueDate: getToday(),
      estimatedMinutes: 45,
      status: 'pending' as Status,
      createdAt: daysAgo(1) + 'T10:00:00Z',
    },
    {
      id: 'seed-2',
      title: 'Read chapter 5 - Biology',
      subject: 'Science' as Subject,
      priority: 'medium' as Priority,
      dueDate: daysFromNow(1),
      estimatedMinutes: 30,
      status: 'pending' as Status,
      createdAt: daysAgo(2) + 'T14:30:00Z',
    },
    {
      id: 'seed-3',
      title: 'Write essay draft',
      subject: 'English' as Subject,
      priority: 'high' as Priority,
      dueDate: daysFromNow(2),
      estimatedMinutes: 60,
      status: 'pending' as Status,
      createdAt: daysAgo(1) + 'T09:00:00Z',
    },
    {
      id: 'seed-4',
      title: 'Review World War II notes',
      subject: 'History' as Subject,
      priority: 'low' as Priority,
      dueDate: daysAgo(1),
      estimatedMinutes: 20,
      status: 'completed' as Status,
      createdAt: daysAgo(3) + 'T16:00:00Z',
    },
    {
      id: 'seed-5',
      title: 'Practice JavaScript exercises',
      subject: 'Computer Science' as Subject,
      priority: 'medium' as Priority,
      dueDate: daysFromNow(3),
      estimatedMinutes: 40,
      status: 'completed' as Status,
      createdAt: daysAgo(2) + 'T11:00:00Z',
    },
  ];
}
