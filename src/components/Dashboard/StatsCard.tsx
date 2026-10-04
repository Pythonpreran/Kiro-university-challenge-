interface StatsCardProps {
  label: string;
  value: number | string;
}

export function StatsCard({ label, value }: StatsCardProps) {
  return (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}
