# StudyFlow Demo Guide

This guide explains how to demonstrate the StudyFlow project in 3–5 minutes, showcasing all Kiro capabilities used.

## Demo Sequence (5 minutes)

### 1. Working Application (30 seconds)

**What to show**: The functional StudyFlow app running locally.

**Steps**:
```bash
npm install
npm run dev
```

**Demonstrate**:
- Dashboard with statistics
- Task list with seed data
- Create a new task
- Mark a task complete (watch dashboard update)
- Edit a task
- Delete a task
- Filter by status
- Sort by priority
- Toggle dark/light theme

**Key points**:
- Fully functional application
- Responsive design
- Real-time statistics
- localStorage persistence (refresh to verify)

### 2. Spec Files (30 seconds)

**What to show**: Spec-driven development artifacts.

**Files to open**:
- `.kiro/specs/studyflow/requirements.md`
- `.kiro/specs/studyflow/design.md`
- `.kiro/specs/studyflow/tasks.md`

**Key points**:
- EARS-style requirements (WHEN... THE SYSTEM SHALL...)
- Complete design document with architecture
- Task breakdown for implementation
- Created before coding, not after

### 3. Steering Files (30 seconds)

**What to show**: Persistent Kiro steering documents.

**Files to open**:
- `.kiro/steering/01-project.md` - Architecture and simplicity
- `.kiro/steering/02-code-style.md` - TypeScript and React patterns
- `.kiro/steering/03-testing.md` - Testing philosophy

**Key points**:
- Guide future development
- Enforce simplicity principle
- Code style standards
- Testing patterns with examples

### 4. Hooks (30 seconds)

**What to show**: Automated hooks for quality.

**Files to open**:
- `.kiro/hooks/lint-on-save.json`
- `.kiro/hooks/test-on-save.json`

**Demonstrate**:
1. Open a TypeScript file (e.g., `src/App.tsx`)
2. Make a change and save
3. Show the lint output in terminal (PostFileSave hook fires)

**Key points**:
- Automatic lint on TypeScript file saves
- Automatic tests when test files change
- JSON configuration, not manual scripts
- Improves code quality automatically

### 5. Property-Based Testing (45 seconds)

**What to show**: Property-based tests using fast-check.

**Files to open**:
- `src/__tests__/property/filter.test.ts`
- `src/__tests__/property/sort.test.ts`
- `src/__tests__/property/stats.test.ts`

**Run tests**:
```bash
npm test
```

**Explain**:
- Tests verify invariants across ALL inputs, not just examples
- `filterTasks` always returns subset of original
- `sortTasks` always preserves count
- `calculateCompletionPercentage` always 0-100

**Key points**:
- Uses fast-check library
- Tests mathematical properties
- Finds edge cases you didn't think to test
- 17 property-based tests across 3 files

### 6. Custom Agent (30 seconds)

**What to show**: StudyFlow QA Engineer custom agent.

**File to open**:
- `.kiro/agents/studyflow-qa.json`

**Demonstrate (optional)**:
Invoke the agent with: "Run all tests and report results"

**Key points**:
- Purpose-built for this project
- Can run tests, lint, build
- Has project context (steering, requirements)
- Conservative permissions (no destructive ops)

### 7. MCP Configuration (30 seconds)

**What to show**: MCP server configuration for external resources.

**File to open**:
- `.kiro/settings/mcp.json`

**File to show**:
- `resources/study-resource.md`

**Key points**:
- Configured fetch MCP server
- Can retrieve external study resources
- Main app does NOT depend on MCP
- Demonstrates MCP integration

### 8. StudyFlow Quality Power (45 seconds)

**What to show**: Custom Kiro Power with skills and references.

**Files to open**:
- `.kiro/powers/studyflow-quality/plugin.json`
- `.kiro/powers/studyflow-quality/skills/studyflow-quality/SKILL.md`
- `.kiro/powers/studyflow-quality/references/accessibility-checklist.md`
- `.kiro/powers/studyflow-quality/references/testing-patterns.md`

**Key points**:
- Complete power structure
- SKILL.md with React/TypeScript patterns
- Accessibility checklist reference
- Testing patterns reference
- Reusable knowledge for StudyFlow development

### 9. Cloud Workflow (30 seconds)

**What to show**: Cloud session documentation.

**File to open**:
- `CLOUD_WORKFLOW.md`

**Key points**:
- How to open in Kiro Web
- How to run commands in cloud
- Recommended cloud session tasks
- Hooks and agents work in cloud
- Steering files follow the project

### 10. Summary (15 seconds)

**Key points to emphasize**:
- **Small application**: ~20 source files, ~2000 LOC
- **Polished UX**: Responsive, accessible, functional
- **Excellent Kiro workflow**: Every capability used
- **Spec-driven**: Requirements and design before code
- **Quality automation**: Hooks, tests, agents
- **Cloud-ready**: Documented workflow for Kiro Web

## Quick Reference

### Commands to Run
```bash
# Install
npm install

# Development
npm run dev

# Tests
npm test

# Lint
npm run lint

# Build
npm run build
```

### Files to Highlight
```
.kiro/
├── specs/studyflow/          # Spec-driven development
│   ├── requirements.md
│   ├── design.md
│   └── tasks.md
├── steering/                 # Persistent guidance
│   ├── 01-project.md
│   ├── 02-code-style.md
│   └── 03-testing.md
├── hooks/                    # Automation
│   ├── lint-on-save.json
│   └── test-on-save.json
├── agents/                   # Custom agent
│   └── studyflow-qa.json
├── powers/studyflow-quality/ # Custom power
│   ├── plugin.json
│   ├── skills/
│   └── references/
└── settings/
    └── mcp.json              # MCP configuration
```

### Stats to Mention
- 59 tests (42 unit + 17 property-based)
- 6 test files
- ~20 source files
- ~2000 lines of code
- All lint checks pass
- Production build succeeds

## Bonus Points

If time permits, show:

1. **localStorage persistence**: Refresh the page and show data persists
2. **Theme persistence**: Change theme, refresh, theme is remembered
3. **Empty state**: Delete all tasks, show empty state message
4. **Validation**: Try to create task with empty title
5. **Responsive**: Resize browser to show mobile layout

## Questions to Expect

**Q: Why no backend/database?**
A: Intentionally simple. Demonstrates Kiro capabilities, not infrastructure complexity.

**Q: Why property-based testing?**
A: Tests invariants across all inputs, finds edge cases, mathematically robust.

**Q: What does the custom agent do?**
A: Runs quality checks (lint, test, build), reports issues, can fix small problems.

**Q: How do hooks work?**
A: JSON files in `.kiro/hooks/`, trigger on events (PostFileSave), run commands automatically.

**Q: What is a Power?**
A: Reusable knowledge package - skills (when/how to use) and references (documentation).

## Success Criteria

The demo succeeds when the viewer understands:

1. The application works and is useful
2. Specs were written before code
3. Steering guides development
4. Hooks automate quality checks
5. Property-based tests verify invariants
6. Custom agent helps with QA
7. MCP enables external resource access
8. Power provides reusable knowledge
9. Cloud workflow is documented and usable
10. Everything is intentionally simple but complete
