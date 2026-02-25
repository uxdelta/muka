# Muka Product Brief

## Vision & Mission

Muka is an AI-native, multi-brand React design system where GitHub is the single source of truth. Every token, component, and guideline is structured for both human developers and AI assistants to consume.

**Mission:** Ship a production-grade, accessible, multi-brand design system that is equally usable by developers and AI coding tools. Every design decision is code, every code decision is documented for retrieval.

## Target Audience

- **Solo developers and small teams** building multi-brand products who need a lightweight, token-driven system without heavy framework dependencies.
- **AI-assisted development workflows** -- developers using Claude Code, Cursor, or similar tools who benefit from RAG-optimized documentation and structured token metadata.
- **Design system contributors** who want to add brands or components by modifying token JSON and following documented patterns, not by reverse-engineering source code.

## Key Differentiators

1. **GitHub-first.** All design decisions live in code. No Figma-to-code sync fragility. JSON tokens are the source of truth.
2. **4-layer token architecture.** Primitives > alias > semantic > component. Surgical brand customization at the alias layer without touching components.
3. **True multi-brand.** Not just light/dark theming. Muka and Wireframe are genuinely different brands (different typography, color personalities, radius strategies) sharing one component codebase.
4. **RAG-optimized.** Token metadata (`$rag`) and structured documentation enable AI tools to retrieve accurate, contextual design system knowledge.
5. **Mobile-first view system.** Four composable building blocks (TopBar, BottomBar, Dialog, Sheet) express 7 distinct mobile view patterns and adapt to desktop.
6. **Developer-centric.** CSS custom properties, BEM class naming with `muka-` prefix, composable React APIs with explicit slots.
7. **Lightweight.** React peer dependency (>=16.8), single icon dependency (`@remixicon/react`), no runtime CSS-in-JS.

## Current Scope

| Area | Status |
|------|--------|
| Shipped components | 30 (see `components/index.ts`) |
| T4 component token files | 22 on disk, 46 planned in `build/manifest.json` |
| Brand/theme combos | 4: muka-light, muka-dark, wireframe-light, wireframe-dark |
| Responsive breakpoints | mobile (base), tablet (md/768px), desktop (lg/1024px), wide (xl/1280px) |
| Unit tests | 9 components covered |
| Visual regression tests | 2 components covered |
| Figma Code Connect mappings | 2 (Button, ListItem) |
| Storybook stories | 30 (one per component) |
| CI/CD | Automated token build on push, Storybook deploy to GitHub Pages |

**Partially done:** RAG metadata is documented as a pattern (`docs/guides/rag-implementation.md`) but not yet applied to token files. 24 manifest-referenced components have token definitions but no React implementation.

## Feature Pillars

These are the 8 areas of work that drive Muka toward v1.0:

1. **Token System** -- Complete the 4-layer token architecture. Add the 24 missing T4 token files, wire up responsive breakpoints, add RAG metadata.
2. **Core Components** -- Build the remaining manifest components (Accordion, Tooltip, Avatar, Popover, NavigationMenu, and others). Refine existing components.
3. **Multi-Brand System** -- Solidify Muka and Wireframe brands. Resolve the "WhiteLabel" naming inconsistency. Audit token parity. Document the "add a new brand" workflow.
4. **View Modes & Layout** -- Implement the mobile-first view system: BottomBar desktop adaptations (`desktopAs` variants), Sheet snap points, Dialog responsive transformation.
5. **Testing & Quality** -- Unit tests for all components, visual regression across all 4 brand/theme combos, accessibility audits, CI coverage thresholds.
6. **AI/RAG Integration** -- Enrich tokens with `$rag` metadata. Create component generation rules. Build a usage pattern database.
7. **Figma Code Connect** -- Map all shipped components to the Figma library. Document the mapping workflow.
8. **Documentation & Storybook** -- Component docs, token system docs in Storybook, component status tracking, changelog.

## Success Criteria

A component is "done" when it has all of:

- T4 component tokens in `tokens/t4-components/`
- CSS using those tokens (never hardcoded values)
- Storybook story with all variants
- Unit test (Vitest + React Testing Library)
- Visual regression test (Vitest browser mode + Playwright)
- Figma Code Connect mapping

System-level criteria:

- All 4 brand/theme combinations render correctly for every component
- WCAG AA minimum for all color combinations (4.5:1 contrast for normal text, 3:1 for large text)
- Token build and Storybook deploy run in CI without manual intervention
- A new brand can be added by creating alias override JSON files and running the build -- no component code changes required
- AI assistants can generate correct components by retrieving token metadata and documentation from the repository

## Non-Goals

- **Not a Figma Variables sync system.** Figma is for design exploration, not token management (per ADR-001).
- **Not an application framework.** No routing, state management, or data fetching.
- **No runtime theme switching via JavaScript.** Themes are applied via CSS custom property scoping at the root.
- **No backward compatibility during v0.x.** APIs may change until v1.0. Move fast, fix forward.
- **Not exhaustive.** Focus on the 46 components in the manifest. Extend deliberately, not speculatively.
