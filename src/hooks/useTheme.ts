import { useState, useEffect, useCallback } from 'react';
import { loadTheme, saveTheme } from '../utils/storage';

export function useTheme(): {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
} {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => loadTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme };
}
