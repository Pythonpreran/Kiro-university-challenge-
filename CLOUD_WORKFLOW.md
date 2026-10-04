# StudyFlow Cloud Workflow

This document describes how to work with StudyFlow in Kiro Web / cloud sessions.

## Opening in Kiro Web

### Prerequisites
- Repository pushed to GitHub, GitLab, or other supported Git host
- Kiro Web access configured

### Steps

1. **Open Kiro Web**
   - Navigate to your Kiro Web instance
   - Sign in with your credentials

2. **Clone/Open Repository**
   - Select "Open Repository" or "Clone Repository"
   - Enter the repository URL
   - Wait for the repository to clone

3. **Verify Project Setup**
   - Open a terminal in Kiro Web
   - Run `npm install` to install dependencies
   - Run `npm run dev` to start the development server

## Starting a Cloud Session

### Development Session

```
npm install
npm run dev
```

The development server will start and be accessible via the preview URL provided by Kiro Web.

### Test Session

```
npm test
```

All tests should pass (59 tests across 6 test files).

### Build Session

```
npm run build
```

Production build outputs to `dist/` directory.

## Synchronizing Project Steering

The `.kiro/steering/` directory contains project-specific rules that follow the repository:

- **01-project.md**: Architecture and simplicity guidelines
- **02-code-style.md**: TypeScript, React, and accessibility standards
- **03-testing.md**: Testing philosophy and patterns

These steering files are automatically loaded when working in Kiro Web, ensuring consistent guidance across all sessions.

## Running Commands in Cloud

### Available Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install all dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run oxlint for code quality |
| `npm test` | Run all tests once |
| `npm test:watch` | Run tests in watch mode |
| `npm test:coverage` | Run tests with coverage report |

### Development Server

The development server runs on the default Vite port (5173). In Kiro Web, this is automatically forwarded to a preview URL.

## Recommended Cloud Session Tasks

### Task 1: Feature Enhancement (Easy)

**Goal**: Add a "Clear All Completed" button to the dashboard.

**Steps**:
1. Read the requirements in `.kiro/specs/studyflow/requirements.md`
2. Read the design in `.kiro/specs/studyflow/design.md`
3. Add a button to the Dashboard component
4. Implement the clear function in useTasks hook
5. Run tests: `npm test`
6. Run lint: `npm run lint`
7. Build: `npm run build`

**Success Criteria**:
- Button appears in dashboard
- Clicking removes all completed tasks
- Tests pass
- Build succeeds

### Task 2: Accessibility Audit (Medium)

**Goal**: Verify and fix accessibility issues.

**Steps**:
1. Read `.kiro/powers/studyflow-quality/references/accessibility-checklist.md`
2. Use the StudyFlow QA Engineer agent to audit the codebase
3. Run keyboard navigation tests in the preview
4. Fix any issues found
5. Run tests: `npm test`
6. Build: `npm run build`

**Success Criteria**:
- All interactive elements keyboard accessible
- No contrast issues
- Screen reader compatible
- Tests pass

### Task 3: Test Coverage Improvement (Medium)

**Goal**: Add tests for uncovered edge cases.

**Steps**:
1. Run `npm test:coverage` to see current coverage
2. Identify uncovered utility functions
3. Add unit tests for edge cases
4. Add property-based tests for new invariants
5. Verify all tests pass

**Success Criteria**:
- Coverage improved
- All tests pass
- Property-based tests verify invariants

### Task 4: UI Enhancement (Easy)

**Goal**: Add due date filter (overdue, today, this week, all).

**Steps**:
1. Update FilterState type in `src/types/index.ts`
2. Add date utility functions for filtering
3. Update FilterBar component
4. Update filterTasks utility
5. Add tests for new filter
6. Run tests and build

**Success Criteria**:
- New filter dropdown appears
- Filtering works correctly
- Tests pass
- Build succeeds

## Using Custom Agents

The StudyFlow QA Engineer agent is available in `.kiro/agents/studyflow-qa.json`.

**To use in cloud session**:
1. The agent is automatically available in Kiro
2. Invoke the agent with tasks like:
   - "Run all tests and report results"
   - "Check lint issues"
   - "Verify build succeeds"
   - "Audit accessibility"

**Agent capabilities**:
- Read files
- Search codebase
- Run lint, test, build commands
- Make small fixes

## Hooks in Cloud Sessions

The project has two hooks configured:

1. **Lint on Save**: Automatically runs `npm run lint` when TypeScript/TSX files are saved
2. **Test on Save**: Automatically runs `npm test` when test files are saved

These hooks activate automatically in cloud sessions.

## MCP Configuration

The MCP configuration in `.kiro/settings/mcp.json` enables the fetch server for retrieving external resources.

**To use**:
1. Ask the agent to fetch a study resource URL
2. The content is retrieved via MCP
3. Summarize and save to `resources/study-resource.md`

## Troubleshooting

### Development Server Not Starting

```
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Tests Failing

```
# Run tests with verbose output
npm test -- --reporter=verbose
```

### Build Failing

```
# Check TypeScript errors
npx tsc --noEmit

# Check for import issues
npm run build 2>&1 | grep -i "error"
```

### Hooks Not Running

Hooks activate on next session start. Restart the Kiro session if hooks were just added.

## Cloud Session Best Practices

1. **Commit Frequently**: Small commits are easier to review and revert
2. **Run Tests Before Commit**: `npm test` should always pass
3. **Check Lint**: `npm run lint` should have no errors
4. **Build Before Push**: `npm run build` should succeed
5. **Use Steering**: Let `.kiro/steering/` files guide development
6. **Use the QA Agent**: Let the agent run quality checks

## Related Documentation

- [Requirements](/.kiro/specs/studyflow/requirements.md)
- [Design](/.kiro/specs/studyflow/design.md)
- [Tasks](/.kiro/specs/studyflow/tasks.md)
- [Demo Guide](/DEMO.md)
- [Kiro Features](/KIRO_FEATURES.md)
