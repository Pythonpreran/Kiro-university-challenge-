# StudyFlow - Smart Study Planner

A polished web application for students to manage daily study tasks, track progress, and view productivity metrics. Built for the Kiro University Challenge.

## Features

- **Dashboard**: Total tasks, completed, pending, completion percentage, today's progress, streak tracking
- **Task Management**: Create, edit, delete, and complete tasks with validation
- **Filtering & Sorting**: Filter by status/subject, sort by priority/due date
- **Theme Support**: Light and dark themes with persistence
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Offline Support**: All data stored in localStorage

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Run linter
npm run lint
```

## Project Structure

```
src/
├── components/         # React UI components
│   ├── Controls/       # Filter, sort, theme toggle
│   ├── Dashboard/      # Stats, progress, streak
│   ├── Layout/         # Sidebar, main content
│   └── Tasks/          # Task list, card, form
├── hooks/              # Custom React hooks
│   ├── useFilters.ts   # Filter/sort state
│   ├── useTasks.ts     # Task CRUD + localStorage
│   └── useTheme.ts     # Theme state
├── types/              # TypeScript interfaces
├── utils/              # Pure utility functions
│   ├── date.ts         # Date utilities
│   ├── seedData.ts     # Sample tasks
│   ├── stats.ts        # Statistics calculations
│   ├── storage.ts      # localStorage helpers
│   └── tasks.ts        # Task operations
└── __tests__/          # Test files
    ├── property/       # Property-based tests
    └── utils/          # Unit tests
```

## Technology Stack

- **React 19** - UI framework
- **TypeScript 6** - Type safety
- **Vite 8** - Build tool
- **Vitest 3** - Testing framework
- **fast-check** - Property-based testing
- **oxlint** - Linting

## Architecture

- **No backend** - Client-side only
- **No state library** - React hooks + localStorage
- **No CSS framework** - Plain CSS with variables
- **No routing** - Single-page application

## Kiro Features Demonstrated

This project demonstrates all Kiro University Challenge lessons:

1. **Spec-Driven Development** - See `.kiro/specs/studyflow/`
2. **Steering Documents** - See `.kiro/steering/`
3. **Hooks** - See `.kiro/hooks/`
4. **Property-Based Testing** - See `src/__tests__/property/`
5. **Custom Agent** - See `.kiro/agents/studyflow-qa.json`
6. **MCP Integration** - See `.kiro/settings/mcp.json`
7. **Custom Power** - See `.kiro/powers/studyflow-quality/`
8. **Cloud Workflow** - See `CLOUD_WORKFLOW.md`

## Documentation

- [Requirements](/.kiro/specs/studyflow/requirements.md)
- [Design](/.kiro/specs/studyflow/design.md)
- [Tasks](/.kiro/specs/studyflow/tasks.md)
- [Demo Guide](/DEMO.md)
- [Kiro Features](/KIRO_FEATURES.md)
- [Cloud Workflow](/CLOUD_WORKFLOW.md)

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run linter |
| `npm test` | Run all tests |
| `npm test:watch` | Run tests in watch mode |
| `npm test:coverage` | Run tests with coverage |

## Testing

- **59 tests** across 6 test files
- **42 unit tests** for utility functions
- **17 property-based tests** for invariants
- Tests use Vitest and fast-check
- Focus on behavior, not implementation

## Design Principles

1. **Simplicity First** - No over-engineering
2. **TypeScript Strict** - Full type safety
3. **Functional Components** - Modern React patterns
4. **Small Components** - Single responsibility
5. **Pure Utilities** - Easy to test
6. **Accessible** - WCAG AA compliant

## Seed Data

The application initializes with 5 sample tasks demonstrating:
- Various subjects (Mathematics, Science, English, History, Computer Science)
- Different priorities (high, medium, low)
- Mixed statuses (pending, completed)
- Varied due dates (past, today, future)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (responsive design)

## License

MIT

## Author

Built for Kiro University Challenge
