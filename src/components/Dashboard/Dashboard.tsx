import type { TaskStats } from '../../types';
import { StatsCard } from './StatsCard';
import { ProgressBar } from './ProgressBar';
import { StreakDisplay } from './StreakDisplay';

interface DashboardProps {
  stats: TaskStats;
}

export function Dashboard({ stats }: DashboardProps) {
  return (
    <section className="dashboard" aria-label="Dashboard">
      <div className="stats-grid">
        <StatsCard label="Total Tasks" value={stats.total} />
        <StatsCard label="Completed" value={stats.completed} />
        <StatsCard label="Pending" value={stats.pending} />
        <StatsCard label="Today Done" value={stats.todayCompleted} />
      </div>
      <ProgressBar percentage={stats.percentage} />
      <StreakDisplay streak={stats.streak} />
    </section>
  );
}
