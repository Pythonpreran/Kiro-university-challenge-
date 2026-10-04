# Kiro Features Mapping

This document maps each Kiro University Challenge lesson to the exact files and features in the StudyFlow project.

## Lesson 1: Spec-Driven Development

**Feature**: Complete specification before implementation.

**Files**:
- `.kiro/specs/studyflow/requirements.md` - EARS-style requirements
- `.kiro/specs/studyflow/design.md` - Architecture and component design
- `.kiro/specs/studyflow/tasks.md` - Implementation task breakdown

**How to demonstrate**:
1. Open each spec file
2. Show requirements were written in EARS format (WHEN... THE SYSTEM SHALL...)
3. Show design decisions documented
4. Show task list structure
5. Emphasize: created before coding, not after

## Lesson 2: Steering Documents

**Feature**: Persistent Kiro steering files for project guidance.

**Files**:
- `.kiro/steering/01-project.md` - Architecture and "keep it simple" philosophy
- `.kiro/steering/02-code-style.md` - TypeScript, React, accessibility standards
- `.kiro/steering/03-testing.md` - Testing philosophy and patterns

**How to demonstrate**:
1. Open each steering file
2. Show they contain real guidance with examples
3. Show code snippets demonstrating patterns
4. Explain: these guide all future development
5. Note: workspace-level rules take precedence over global

## Lesson 3: Hooks

**Feature**: Automated hooks for quality enforcement.

**Files**:
- `.kiro/hooks/lint-on-save.json` - Lint TypeScript on save
- `.kiro/hooks/test-on-save.json` - Run tests on test file save

**How to demonstrate**:
1. Open a `.ts` or `.tsx` file
2. Make a change and save
3. Show the lint output (hook fired automatically)
4. Open hook files to show JSON structure
5. Explain: PostFileSave trigger, regex matcher for file types

**Hook structure**:
```json
{
  "version": "v1",
  "hooks": [{
    "name": "Lint TypeScript Files on Save",
    "trigger": "PostFileSave",
    "matcher": "\\.(ts|tsx)$",
    "action": { "type": "command", "command": "npm run lint" }
  }]
}
```

## Lesson 4: Property-Based Testing

**Feature**: Property-based tests using fast-check library.

**Files**:
- `src/__tests__/property/filter.test.ts` - Filter invariants
- `src/__tests__/property/sort.test.ts` - Sort invariants
- `src/__tests__/property/stats.test.ts` - Statistics invariants

**Test count**: 17 property-based tests

**How to demonstrate**:
1. Open property test files
2. Show custom arbitraries for domain types
3. Show invariant properties being tested:
   - Filtering returns subset of original
   - Sorting preserves count
   - Completion percentage always 0-100
4. Run `npm test` to show all pass
5. Explain: tests ALL inputs, not just examples

**Example property**:
```typescript
it('filtering returns a subset of original', () => {
  fc.assert(
    fc.property(fc.array(taskArbitrary), filterArbitrary, (tasks, filters) => {
      const result = filterTasks(tasks, filters);
      return result.length <= tasks.length;
    })
  );
});
```

## Lesson 5: Custom Agent

**Feature**: Purpose-built custom Kiro agent for QA.

**Files**:
- `.kiro/agents/studyflow-qa.json`

**Agent capabilities**:
- Read files
- Search codebase
- Run lint, test, build commands
- Make small fixes with str_replace

**How to demonstrate**:
1. Open agent configuration file
2. Show welcome message and project context
3. Show tool permissions (conservative)
4. Invoke agent: "Run all tests and report results"
5. Show agent executing tests and reporting

**Agent configuration**:
```json
{
  "name": "StudyFlow QA Engineer",
  "description": "Reviews quality, runs tests, checks accessibility",
  "tools": {
    "read_file": { "enabled": true },
    "execute_pwsh": {
      "enabled": true,
      "allowedCommands": ["npm run lint", "npm test", "npm run build"]
    }
  }
}
```

## Lesson 6: MCP Integration

**Feature**: MCP server configuration for external resources.

**Files**:
- `.kiro/settings/mcp.json` - MCP configuration
- `resources/study-resource.md` - Placeholder for imported resources

**How to demonstrate**:
1. Open MCP configuration file
2. Show fetch server configuration
3. Show resources placeholder file
4. Explain: agent can fetch URLs via MCP
5. Note: main app does NOT depend on MCP

**MCP configuration**:
```json
{
  "mcpServers": {
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"],
      "disabled": false
    }
  }
}
```

## Bonus Lesson 1: Custom Power

**Feature**: Complete Kiro Power with skills and references.

**Files**:
- `.kiro/powers/studyflow-quality/plugin.json` - Power manifest
- `.kiro/powers/studyflow-quality/skills/studyflow-quality/SKILL.md` - Main skill
- `.kiro/powers/studyflow-quality/references/accessibility-checklist.md`
- `.kiro/powers/studyflow-quality/references/testing-patterns.md`

**How to demonstrate**:
1. Open plugin.json to show manifest structure
2. Open SKILL.md to show comprehensive patterns
3. Open reference files to show detailed documentation
4. Explain: reusable knowledge for StudyFlow development
5. Show code snippets in skill file

**Power structure**:
```
studyflow-quality/
├── plugin.json           # Manifest
├── skills/
│   └── studyflow-quality/
│       └── SKILL.md      # When/how to use
└── references/
    ├── accessibility-checklist.md
    └── testing-patterns.md
```

## Bonus Lesson 2: Cloud Workflow

**Feature**: Cloud-ready workflow documentation.

**Files**:
- `CLOUD_WORKFLOW.md` - Complete cloud session guide

**How to demonstrate**:
1. Open CLOUD_WORKFLOW.md
2. Show sections:
   - Opening in Kiro Web
   - Running commands in cloud
   - Recommended tasks
   - Using agents and hooks in cloud
3. Explain: steering files follow the project
4. Show: all Kiro features work in cloud sessions

**Recommended cloud tasks**:
1. Add "Clear All Completed" button (Easy)
2. Accessibility audit (Medium)
3. Test coverage improvement (Medium)
4. Add due date filter (Easy)

## Summary Table

| Lesson | Feature | Primary File(s) | How to Demo |
|--------|---------|-----------------|-------------|
| 1 | Spec-Driven Development | `.kiro/specs/studyflow/*.md` | Open spec files, show EARS requirements |
| 2 | Steering Documents | `.kiro/steering/*.md` | Open steering files, show guidance with examples |
| 3 | Hooks | `.kiro/hooks/*.json` | Save a TS file, show lint running automatically |
| 4 | Property-Based Testing | `src/__tests__/property/*.ts` | Run tests, show invariant properties |
| 5 | Custom Agent | `.kiro/agents/studyflow-qa.json` | Open config, invoke agent |
| 6 | MCP Integration | `.kiro/settings/mcp.json` | Open config, show fetch server |
| Bonus 1 | Custom Power | `.kiro/powers/studyflow-quality/` | Open plugin.json and skill files |
| Bonus 2 | Cloud Workflow | `CLOUD_WORKFLOW.md` | Open file, show cloud instructions |

## Statistics

- **Spec files**: 3 (requirements, design, tasks)
- **Steering files**: 3 (project, code-style, testing)
- **Hooks**: 2 (lint-on-save, test-on-save)
- **Property-based tests**: 17 (filter: 6, sort: 4, stats: 7)
- **Unit tests**: 42 (total: 59 tests)
- **Custom agents**: 1 (StudyFlow QA Engineer)
- **Power skills**: 1 (studyflow-quality)
- **Power references**: 2 (accessibility, testing)
- **MCP servers**: 1 (fetch)
- **Source files**: ~20
- **Lines of code**: ~2000

## Verification Checklist

- [x] Spec files exist and are meaningful
- [x] Steering files exist with real guidance
- [x] Hooks exist and execute correctly
- [x] Property-based tests pass
- [x] Custom agent configuration valid
- [x] MCP configuration documented
- [x] Power correctly structured
- [x] Cloud workflow documented
- [x] `npm install` succeeds
- [x] `npm run lint` passes
- [x] `npm test` passes
- [x] `npm run build` succeeds
- [x] Application runs with `npm run dev`
