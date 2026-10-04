interface StreakDisplayProps {
  streak: number;
}

export function StreakDisplay({ streak }: StreakDisplayProps) {
  return (
    <div className="streak-display">
      <span className="streak-icon" role="img" aria-label="fire">🔥</span>
      <span className="streak-text">
        <span className="streak-count">{streak}</span> day streak
      </span>
    </div>
  );
}
