# StudyFlow Project Steering

## Project Overview

StudyFlow is a smart study planner for students. It provides a clean dashboard for managing daily study tasks, tracking progress, and viewing productivity metrics.

**Primary Goal**: Help students organize their study tasks and visualize their progress.

**Secondary Goal**: Demonstrate excellent use of Kiro's agentic development capabilities for the Kiro University Challenge.

## Architecture Philosophy

### Keep It Simple
- This is a **client-side only** application
- **No backend**, **no authentication**, **no external databases**
- Use **React state** and **localStorage** for all data management
- Avoid over-engineering at all costs

### Key Architectural Decisions

1. **State Management**: React hooks + localStorage
   - No Redux, Zustand, or similar libraries
   - Custom hooks encapsulate state logic
   - localStorage provides persistence

2. **Styling**: Plain CSS with CSS variables
   - No Tailwind, styled-components, or CSS-in-JS
   - CSS variables enable theming
   - Mobile-first responsive design

3. **Testing**: Vitest for unit and property-based tests
   - Focus on utility functions (pure, easy to test)
   - Property-based tests for invariants
   - Minimal component tests

4. **Build Tool**: Vite
   - Fast development server
   - Simple configuration
   - TypeScript support out of the box

## What NOT to Do

### Do NOT Add
- User authentication
- Backend API
- Database (PostgreSQL, MongoDB, etc.)
- Payment processing
- Docker configuration
- Kubernetes manifests
- CI/CD pipelines
- Complex deployment infrastructure
- AI features (chatbots, recommendations)
- Real-time collaboration
- Push notifications
- Service workers
- PWA manifest

### Do NOT Use
- Redux, MobX, Zustand
- CSS frameworks (Tailwind, Bootstrap)
- UI libraries (Material-UI, Chakra)
- Complex routing libraries
- GraphQL
- Microservices architecture

### Do NOT Over-Abstract
- Avoid creating "frameworks within the app"
- Avoid premature optimization
- Avoid speculative generality
- Avoid deep inheritance hierarchies
- Avoid unnecessary design patterns

## Development Guidelines

### When in Doubt
1. Choose the simpler solution
2. Prefer fewer files over more
3. Prefer fewer dependencies over more
4. Prefer readable code over clever code
5. Prefer working code over perfect code

### Complexity Budget
- Total source files: ~20-30
- Total lines of code: ~1500-2500
- Total dependencies: minimal (React, Vitest)

If you find yourself exceeding these bounds significantly, **stop and reconsider**.

## Success Metrics

The project succeeds when:
1. The application is useful and usable
2. The code is maintainable and well-tested
3. All Kiro challenge requirements are demonstrable
4. A developer can understand the codebase in < 30 minutes
5. New features can be added without refactoring everything

## Remember

> "Simplicity is prerequisite for reliability." — Edsger W. Dijkstra

This project intentionally stays small. The value is in demonstrating Kiro's capabilities, not in building a complex product.
