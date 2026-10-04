import type { TaskStats } from '../../types';
import { Dashboard } from '../Dashboard/Dashboard';
import { ThemeToggle } from '../Controls/ThemeToggle';

interface SidebarProps {
  stats: TaskStats;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export function Sidebar({ stats, theme, onThemeToggle }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="app-title">StudyFlow</h1>
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
      </div>
      <Dashboard stats={stats} />
    </aside>
  );
}
