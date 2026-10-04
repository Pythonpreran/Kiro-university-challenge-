# StudyFlow Requirements Specification

## Overview
StudyFlow is a smart study planner web application for students to manage daily study tasks, track progress, and view productivity metrics.

## Functional Requirements

### Task Management

#### Task Creation
- **REQ-TC-001**: WHEN a user submits the task creation form with valid data, THE SYSTEM SHALL create a new task with a unique ID.
- **REQ-TC-002**: WHEN a user creates a task without a title, THE SYSTEM SHALL display a validation message "Title is required".
- **REQ-TC-003**: WHEN a user creates a task with a title longer than 100 characters, THE SYSTEM SHALL display a validation message "Title must be 100 characters or less".
- **REQ-TC-004**: WHEN a user creates a task without a due date, THE SYSTEM SHALL default to today's date.
- **REQ-TC-005**: WHEN a user creates a task, THE SYSTEM SHALL set the status to "pending" by default.
- **REQ-TC-006**: WHEN a user creates a task, THE SYSTEM SHALL record the current timestamp as createdAt.

#### Task Editing
- **REQ-TE-001**: WHEN a user clicks the edit button on a task, THE SYSTEM SHALL open an editable form pre-populated with the task's current values.
- **REQ-TE-002**: WHEN a user saves edited task data with invalid values, THE SYSTEM SHALL display appropriate validation messages.
- **REQ-TE-003**: WHEN a user saves valid edited task data, THE SYSTEM SHALL update the task in place preserving its ID and createdAt timestamp.

#### Task Deletion
- **REQ-TD-001**: WHEN a user clicks the delete button on a task, THE SYSTEM SHALL remove that task from the collection.
- **REQ-TD-002**: WHEN a user deletes a task, THE SYSTEM SHALL NOT affect any other tasks in the collection.

#### Task Completion
- **REQ-TComp-001**: WHEN a user marks a pending task as complete, THE SYSTEM SHALL change the status to "completed".
- **REQ-TComp-002**: WHEN a user marks a completed task as incomplete, THE SYSTEM SHALL change the status back to "pending".
- **REQ-TComp-003**: WHEN a user toggles completion status twice, THE SYSTEM SHALL return the task to its original status.

### Filtering and Sorting

#### Filtering
- **REQ-F-001**: WHEN a user selects a status filter, THE SYSTEM SHALL display only tasks matching that status.
- **REQ-F-002**: WHEN a user selects a category filter, THE SYSTEM SHALL display only tasks matching that category.
- **REQ-F-003**: WHEN a user applies multiple filters, THE SYSTEM SHALL display tasks matching ALL filter criteria.
- **REQ-F-004**: WHEN filtering tasks, THE SYSTEM SHALL never create or destroy tasks, only change which are displayed.

#### Sorting
- **REQ-S-001**: WHEN a user selects "priority" sort, THE SYSTEM SHALL display tasks ordered by priority (high → medium → low).
- **REQ-S-002**: WHEN a user selects "due date" sort, THE SYSTEM SHALL display tasks ordered by due date (earliest first).
- **REQ-S-003**: WHEN sorting tasks, THE SYSTEM SHALL preserve the total number of tasks.

### Dashboard Statistics

#### Metrics Display
- **REQ-DM-001**: THE SYSTEM SHALL display the total number of tasks.
- **REQ-DM-002**: THE SYSTEM SHALL display the count of completed tasks.
- **REQ-DM-003**: THE SYSTEM SHALL display the count of pending tasks.
- **REQ-DM-004**: THE SYSTEM SHALL display the completion percentage, calculated as (completed / total) × 100, rounded to the nearest integer.
- **REQ-DM-005**: WHEN total tasks is zero, THE SYSTEM SHALL display completion percentage as 0.
- **REQ-DM-006**: THE completion percentage SHALL always be a value between 0 and 100 inclusive.

#### Progress Tracking
- **REQ-DP-001**: THE SYSTEM SHALL display a progress bar representing the completion percentage.
- **REQ-DP-002**: THE SYSTEM SHALL display today's completed task count.
- **REQ-DP-003**: THE SYSTEM SHALL calculate and display a streak count (consecutive days with at least one completed task).

### Data Persistence

#### localStorage
- **REQ-P-001**: WHEN a task is created, edited, or deleted, THE SYSTEM SHALL persist the updated task collection to localStorage.
- **REQ-P-002**: WHEN the application loads, THE SYSTEM SHALL restore tasks from localStorage if available.
- **REQ-P-003**: WHEN localStorage data is corrupted, THE SYSTEM SHALL initialize with the default seed tasks.
- **REQ-P-004**: THE SYSTEM SHALL use the key "studyflow-tasks" for localStorage persistence.

### User Interface

#### Responsive Design
- **REQ-UI-001**: THE SYSTEM SHALL display a usable layout on screens 320px wide and larger.
- **REQ-UI-002**: THE SYSTEM SHALL adapt the dashboard layout for mobile (single column) and desktop (sidebar + main content).

#### Accessibility
- **REQ-UI-003**: All interactive elements SHALL have accessible labels.
- **REQ-UI-004**: Form inputs SHALL have associated label elements.
- **REQ-UI-005**: Buttons SHALL have discernible text or aria-labels.
- **REQ-UI-006**: Color SHALL not be the only means of conveying information.

#### Empty States
- **REQ-UI-007**: WHEN no tasks exist, THE SYSTEM SHALL display an empty state message encouraging task creation.
- **REQ-UI-008**: WHEN filters return no results, THE SYSTEM SHALL display a message indicating no matching tasks.

#### Theme
- **REQ-UI-009**: THE SYSTEM SHALL support light and dark themes using CSS custom properties.
- **REQ-UI-010**: THE SYSTEM SHALL persist theme preference in localStorage.

## Data Model

### Task
```typescript
interface Task {
  id: string;           // Unique identifier (UUID)
  title: string;        // Task title (1-100 characters)
  subject: string;      // Category/subject
  priority: 'low' | 'medium' | 'high';
  dueDate: string;      // ISO date string (YYYY-MM-DD)
  estimatedMinutes: number;  // Positive integer
  status: 'pending' | 'completed';
  createdAt: string;    // ISO timestamp
}
```

### Categories (Predefined)
- Mathematics
- Science
- English
- History
- Computer Science
- Other

## Non-Functional Requirements

### Performance
- **REQ-NF-001**: Task operations (create, edit, delete, toggle) SHALL complete within 100ms.
- **REQ-NF-002**: Dashboard statistics SHALL recalculate within 50ms of data changes.

### Reliability
- **REQ-NF-003**: THE SYSTEM SHALL not crash when localStorage is full or unavailable.

### Maintainability
- **REQ-NF-004**: THE SYSTEM SHALL use TypeScript with strict mode enabled.
- **REQ-NF-005**: THE SYSTEM SHALL avoid use of the `any` type except where unavoidable.

## Seed Data

On first launch (when no localStorage data exists), THE SYSTEM SHALL initialize with 5 sample tasks demonstrating various states, priorities, and categories.
