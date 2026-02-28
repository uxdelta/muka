# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev              # Start Storybook (primary development tool, port 6006)
npm run build            # Full build (tokens + components)
npm run build:tokens     # Rebuild design tokens from JSON → CSS custom properties
npm run build:components # Build React components (ESM, CJS, types)
npm test                 # Run all tests (Vitest)
npm run test:unit        # Unit tests only
npm run test:visual      # Visual regression tests
npm run test:visual:update  # Update visual test snapshots
npm run lint             # ESLint check
npm run validate:tokens  # Validate token JSON structure
```

## Architecture Overview

Muka is a multi-brand, multi-theme React design system with a 4-layer token architecture.

### Token System (tokens/)

The design token system uses 4 hierarchical layers with reference resolution:

1. **t1-primitives/** - Raw design values (colors, scales, typography). Never use directly in components.
2. **t2-alias/** - Brand-agnostic semantic references. Contains brand-specific overrides in `brand/muka/` and `brand/wireframe/`.
3. **t3-semantics/** - Meaningful abstractions with design intent (action, surface, text).
4. **t4-components/** - Component-specific tokens that reference semantic tokens.

**Token naming convention:** `{layer}.{category}.{subcategory}.{variant}.{state}`
Example: `button.color.primary.background.default`

**Build process:** `scripts/build-tokens.js` reads `build/manifest.json`, resolves token references (e.g., `"{color.gray.9}"`), and generates CSS custom properties in `styles/tokens-{brand}-{theme}.css`.

### Multi-Brand/Theme System

- **Brands:** Muka (creative/indigo), Wireframe (professional/gray)
- **Themes:** Light, Dark
- **4 combinations:** muka-light (default), muka-dark, wireframe-light, wireframe-dark

### Component Structure

Each component follows this pattern:
```
components/ComponentName/
├── ComponentName.tsx       # React FC with exported props interface
├── ComponentName.css       # Styles using CSS custom properties from tokens
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.test.tsx  # Unit tests
└── index.ts               # Export barrel
```

**CSS class convention:** BEM-like with `muka-` prefix (e.g., `.muka-button--primary`)

### Component Token Usage

Always use component tokens (t4) or semantic tokens (t3) in CSS, never primitives:

```css
.muka-button--primary {
  background-color: var(--button-color-primary-background-default);
  color: var(--button-color-primary-foreground-default);
  padding: var(--button-padding-md-y) var(--button-padding-md-x);
}
```

## Automation

- **Pre-commit hook (Husky):** Automatically runs `npm run build:tokens` and stages updated CSS when token files change
- **GitHub Actions:** Auto-builds tokens on push/PR, auto-deploys Storybook to GitHub Pages on push to main

## Testing Strategy

- **Unit tests:** Vitest + React Testing Library in `tests/components/`
- **Visual tests:** Vitest browser mode with Playwright in `tests/visual/`
- **Always test components across all 4 brand/theme combinations** using Storybook's theme switcher

## Interaction Design

Before implementing any view navigation or dialog flow, read `docs/guides/interaction-design-patterns.md` for behavioral rules and transition logic.

## Key Files

- `build/manifest.json` - Defines theme token sets for build
- `scripts/build-tokens.js` - Token build script
- `components/index.ts` - Component exports
- `.storybook/preview.tsx` - Theme switching and global decorators
