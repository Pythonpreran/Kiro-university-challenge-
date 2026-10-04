import { useState, useEffect, useCallback } from 'react';
import type { Task, TaskFormData } from '../types';
import { loadTasks, saveTasks } from '../utils/storage';
import { getSeedTasks } from '../utils/seedData';
import { createTask, deleteTask as deleteTaskUtil, updateTask as updateTaskUtil, toggleTaskStatus } from '../utils/tasks';

export function useTasks(): {
  tasks: Task[];
  addTask: (formData: TaskFormData) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleStatus: (id: string) => void;
} {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = loadTasks();
    return storedTasks ?? getSeedTasks();
  });

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((formData: TaskFormData) => {
    const newTask = createTask(formData);
    setTasks((previousTasks) => [...previousTasks, newTask]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((previousTasks) => updateTaskUtil(previousTasks, id, updates));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((previousTasks) => deleteTaskUtil(previousTasks, id));
  }, []);

  const toggleStatus = useCallback((id: string) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, status: toggleTaskStatus(task.status) }
          : task
      )
    );
  }, []);

  return { tasks, addTask, updateTask, deleteTask, toggleStatus };
}
