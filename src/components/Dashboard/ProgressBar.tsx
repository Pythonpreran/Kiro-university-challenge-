interface ProgressBarProps {
  percentage: number;
}

export function ProgressBar({ percentage }: ProgressBarProps) {
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div className="progress-section">
      <div className="progress-header">
        <span className="progress-title">Overall Progress</span>
        <span className="progress-percentage">{clampedPercentage}%</span>
      </div>
      <div className="progress-bar" role="progressbar" aria-valuenow={clampedPercentage} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="progress-fill"
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    </div>
  );
}
