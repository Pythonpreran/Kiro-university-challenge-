import type { Task, TaskStats } from '../types';
import { getToday } from './date';

export function countCompleted(tasks: Task[]): number {
  return tasks.filter((task) => task.status === 'completed').length;
}

export function countPending(tasks: Task[]): number {
  return tasks.filter((task) => task.status === 'pending').length;
}

export function calculateCompletionPercentage(total: number, completed: number): number {
  if (total <= 0) {
    return 0;
  }

  const safeCompleted = Math.max(0, Math.min(completed, total));
  return Math.round((safeCompleted / total) * 100);
}

export function getTodayCompletedCount(tasks: Task[]): number {
  return tasks.filter(
    (task) => task.status === 'completed' && task.dueDate === getToday()
  ).length;
}

export function calculateStreak(tasks: Task[]): number {
  const completedDates = new Set(
    tasks
      .filter((task) => task.status === 'completed')
      .map((task) => task.dueDate)
  );

  let streak = 0;
  const currentDate = new Date(getToday());

  while (completedDates.has(currentDate.toISOString().split('T')[0])) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
}

export function calculateStats(tasks: Task[]): TaskStats {
  const total = tasks.length;
  const completed = countCompleted(tasks);
  const pending = countPending(tasks);
  const percentage = calculateCompletionPercentage(total, completed);
  const todayCompleted = getTodayCompletedCount(tasks);
  const streak = calculateStreak(tasks);

  return {
    total,
    completed,
    pending,
    percentage,
    todayCompleted,
    streak,
  };
}
