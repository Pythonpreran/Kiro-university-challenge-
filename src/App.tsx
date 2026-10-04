import { useTasks } from './hooks/useTasks';
import { useTheme } from './hooks/useTheme';
import { useFilters } from './hooks/useFilters';
import { calculateStats } from './utils/stats';
import { Sidebar } from './components/Layout/Sidebar';
import { MainContent } from './components/Layout/MainContent';

function App() {
  const { tasks, addTask, updateTask, deleteTask, toggleStatus } = useTasks();
  const { theme, toggleTheme } = useTheme();
  const { filters, setFilters, sort, setSort } = useFilters();

  const stats = calculateStats(tasks);

  return (
    <div className="app-layout">
      <Sidebar stats={stats} theme={theme} onThemeToggle={toggleTheme} />
      <MainContent
        tasks={tasks}
        filters={filters}
        sort={sort}
        onFilterChange={setFilters}
        onSortChange={setSort}
        onToggle={toggleStatus}
        onUpdate={updateTask}
        onDelete={deleteTask}
        onAdd={addTask}
      />
    </div>
  );
}

export default App;
