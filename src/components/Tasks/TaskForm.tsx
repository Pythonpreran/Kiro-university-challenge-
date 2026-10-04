import { useState, useEffect, useRef } from 'react';
import type { Task, TaskFormData, ValidationErrors, Subject, Priority } from '../../types';
import { validateTask } from '../../utils/tasks';
import { getToday } from '../../utils/date';
import { SUBJECTS, PRIORITIES } from '../../types';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (data: TaskFormData) => void;
  onClose: () => void;
}

export function TaskForm({ task, onSubmit, onClose }: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: task?.title || '',
    subject: task?.subject || ('Other' as Subject),
    priority: task?.priority || ('medium' as Priority),
    dueDate: task?.dueDate || getToday(),
    estimatedMinutes: task?.estimatedMinutes || 30,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateTask(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSubmit(formData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'estimatedMinutes' ? parseInt(value, 10) || 0 : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="form-title">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 id="form-title" className="modal-title">
            {task ? 'Edit Task' : 'New Task'}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title *
            </label>
            <input
              ref={titleInputRef}
              type="text"
              id="title"
              name="title"
              className={`form-input ${errors.title ? 'error' : ''}`}
              value={formData.title}
              onChange={handleChange}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <span id="title-error" className="form-error">
                {errors.title}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              Subject *
            </label>
            <select
              id="subject"
              name="subject"
              className={`form-input ${errors.subject ? 'error' : ''}`}
              value={formData.subject}
              onChange={handleChange}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.subject && (
              <span id="subject-error" className="form-error">
                {errors.subject}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="priority" className="form-label">
              Priority *
            </label>
            <select
              id="priority"
              name="priority"
              className={`form-input ${errors.priority ? 'error' : ''}`}
              value={formData.priority}
              onChange={handleChange}
              aria-describedby={errors.priority ? 'priority-error' : undefined}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </select>
            {errors.priority && (
              <span id="priority-error" className="form-error">
                {errors.priority}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="form-input"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="estimatedMinutes" className="form-label">
              Estimated Time (minutes) *
            </label>
            <input
              type="number"
              id="estimatedMinutes"
              name="estimatedMinutes"
              className={`form-input ${errors.estimatedMinutes ? 'error' : ''}`}
              value={formData.estimatedMinutes}
              onChange={handleChange}
              min={1}
              max={480}
              aria-describedby={errors.estimatedMinutes ? 'minutes-error' : undefined}
            />
            {errors.estimatedMinutes && (
              <span id="minutes-error" className="form-error">
                {errors.estimatedMinutes}
              </span>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {task ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
