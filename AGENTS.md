# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Muka is a multi-brand, multi-theme React design system. The only service is **Storybook** (port 6006), started via `npm run dev`. There are no databases, Docker containers, or external service dependencies.

### Dev commands

See `CLAUDE.md` for the full command reference. Key commands:

- `npm run dev` — starts Storybook on port 6006
- `npm run test:unit` — runs Vitest unit tests (199 tests across 9 files)
- `npm run build:tokens` — rebuilds design tokens (CSS custom properties)
- `npm run lint` — ESLint (note: ESLint is not yet configured; the script exists but no `.eslintrc` or `eslint.config.*` file is present, so it will exit with `eslint: not found`)

### Gotchas

- **Tokens must be built before Storybook**: Run `npm run build:tokens` if token CSS files are missing or stale. The `npm install` postinstall does not build tokens automatically.
- **Husky pre-commit hook**: Automatically rebuilds tokens and stages CSS when token files are committed. The `postinstall` script runs `husky install` which may emit a deprecation warning — this is harmless.
- **No ESLint binary**: The `npm run lint` script references `eslint` but it is not in `devDependencies` and no config file exists. This is the current state of the repo.
