interface EmptyStateProps {
  hasFilters: boolean;
  onAddClick: () => void;
}

export function EmptyState({ hasFilters, onAddClick }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-icon" role="img" aria-label="clipboard">
        📋
      </div>
      <h3 className="empty-title">
        {hasFilters ? 'No matching tasks' : 'No tasks yet'}
      </h3>
      <p className="empty-description">
        {hasFilters
          ? 'Try adjusting your filters to see more tasks.'
          : 'Get started by adding your first study task.'}
      </p>
      {!hasFilters && (
        <button className="btn btn-primary" onClick={onAddClick} style={{ marginTop: '16px' }}>
          Add Your First Task
        </button>
      )}
    </div>
  );
}
