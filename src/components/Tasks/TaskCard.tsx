import type { Task } from '../../types';
import { formatDate, isPastDue } from '../../utils/date';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  const isOverdue = isPastDue(task.dueDate) && task.status === 'pending';

  return (
    <article className="task-card">
      <button
        className={`task-checkbox ${task.status === 'completed' ? 'completed' : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
        aria-pressed={task.status === 'completed'}
      />
      <div className="task-content">
        <div className="task-header">
          <h3 className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>
            {task.title}
          </h3>
          <div className="task-actions">
            <button
              className="btn-icon"
              onClick={() => onEdit(task)}
              aria-label={`Edit ${task.title}`}
            >
              ✏️
            </button>
            <button
              className="btn-icon"
              onClick={() => onDelete(task.id)}
              aria-label={`Delete ${task.title}`}
            >
              🗑️
            </button>
          </div>
        </div>
        <div className="task-meta">
          <span className="task-meta-item">{task.subject}</span>
          <span className={`task-meta-item ${isOverdue ? 'overdue' : ''}`}>
            📅 {formatDate(task.dueDate)}
            {isOverdue && ' (Overdue)'}
          </span>
          <span className="task-meta-item">⏱️ {task.estimatedMinutes} min</span>
          <span className={`priority-badge priority-${task.priority}`}>
            {task.priority}
          </span>
        </div>
      </div>
    </article>
  );
}
