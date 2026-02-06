# Token Architecture Guide

## Overview

Our design token system uses a 4-layer architecture designed for multi-brand support and AI integration.

## Layer Structure

### 1. Primitives
**Purpose:** Raw design values (colors, spacing, typography scales)  
**Example:** `color.gray.9`, `spacing.4`, `font.size.lg`  
**Maintenance:** Rarely changed, forms foundation

```json
{
  "color": {
    "gray": {
      "9": { "$value": "#171717" }
    }
  },
  "spacing": {
    "4": { "$value": "1rem" }
  }
}
```

### 2. Alias (Brand Layer)
**Purpose:** Brand-specific decisions and personality  
**Example:** `alias.color.brand.primary`, `alias.font.brand.family`  
**Maintenance:** Modified per brand, key customization point

```json
{
  "alias": {
    "color": {
      "brand": {
        "primary": { "$value": "{color.gray.11}" }
      }
    },
    "font": {
      "brand": {
        "family": { "$value": "Funnel Display" }
      }
    }
  }
}
```

### 3. Semantic
**Purpose:** Usage intent and functional meaning  
**Example:** `color.action.default`, `color.surface.level1`  
**Maintenance:** Stable, defines system behavior

```json
{
  "color": {
    "action": {
      "default": { "$value": "{alias.color.brand.primary}" }
    },
    "surface": {
      "level1": { "$value": "{alias.color.neutral.3}" }
    }
  }
}
```

### 4. Component
**Purpose:** Component-specific implementations  
**Example:** `button.color.primary.background`, `input.border.focus`  
**Maintenance:** Evolves with component needs

```json
{
  "button": {
    "color": {
      "primary": {
        "background": {
          "default": { "$value": "{color.action.default}" }
        }
      }
    }
  }
}
```

## Token Reference Resolution

Our tokens resolve through the layer hierarchy:

```
button.color.primary.background.default 
    ↓ references
color.action.default 
    ↓ references  
alias.color.brand.primary 
    ↓ references
color.gray.11 
    ↓ resolves to
"#0a0a0a"
```

## Brand Customization

To create a new brand, override alias layer tokens:

```json
// themes/newbrand/base.json
{
  "alias": {
    "color": {
      "brand": {
        "primary": { "$value": "{color.blue.9}" }
      }
    },
    "font": {
      "brand": {
        "family": { "$value": "Custom Brand Font" }
      }
    }
  }
}
```

This single change propagates through semantic and component layers automatically.

## Token Naming Conventions

### Primitives
- `{category}.{scale}.{step}` - e.g., `color.gray.9`, `spacing.lg`
- `{category}.{property}.{variant}` - e.g., `font.size.xl`, `shadow.md`

### Alias
- `alias.{category}.{purpose}.{variant}` - e.g., `alias.color.brand.primary`
- `alias.{category}.{role}.{state}` - e.g., `alias.color.accent.hover`

### Semantic
- `{category}.{intent}.{variant}` - e.g., `color.action.default`
- `{category}.{context}.{level}` - e.g., `color.surface.level1`

### Component
- `{component}.{category}.{variant}.{property}.{state}` 
- e.g., `button.color.primary.background.hover`

## Responsive Layout Tokens

Layout tokens adapt to screen size via **breakpoint override files** — a single source of truth that drives both production CSS (`@media` queries) and design tool modes (Figma variable modes, Storybook layout switcher).

### Breakpoint Primitives

Breakpoints are defined in `tokens/t1-primitives/scale.json`:

| Name | Value   | Usage          |
|------|---------|----------------|
| sm   | 640px   | Small tablets   |
| md   | 768px   | Tablets         |
| lg   | 1024px  | Desktops        |
| xl   | 1280px  | Large screens   |

### Architecture: Override Files

Instead of inline responsive metadata, each breakpoint has its own override JSON file that redefines only the tokens that change:

```
tokens/
└── t2-alias/
    └── layout/
        ├── mobile.json          # Mobile-first base (default values)
        ├── tablet.json          # Tablet overrides (md breakpoint)
        └── desktop.json         # Desktop overrides (lg breakpoint)
```

Override files only contain the tokens that differ from the base. For example, `tablet.json`:

```json
{
  "section": {
    "padding": {
      "horizontal": {
        "default": { "$type": "spacing", "$value": "{size.xl}" }
      }
    }
  }
}
```

### Build Configuration

The `build/manifest.json` maps override files to breakpoint names:

```json
{
  "breakpoints": {
    "md": "tokens/t2-alias/layout/tablet.json",
    "lg": "tokens/t2-alias/layout/desktop.json"
  }
}
```

### Generated CSS Output

The build script produces three types of output from the same override files:

**1. `@media` blocks (production responsive):**
```css
@media (min-width: 768px) {
  :root {
    --section-padding-horizontal-default: 1.5rem;
  }
}
```

**2. `[data-layout]` blocks (Storybook / design tool forcing):**
```css
[data-layout="tablet"] {
  --section-padding-horizontal-default: 1.5rem;
}
```

### How It Works Across Tools

| Context | Mechanism | Behavior |
|---------|-----------|----------|
| **Production** | `@media` queries | Automatic — responds to viewport width |
| **Storybook** | `data-layout` attribute | Manual — select from toolbar dropdown |
| **Figma** | Tokens Studio variable modes | Manual — select from variable collection |

### Figma / Tokens Studio Integration

The `tokens/$themes.json` file includes a `"Layout"` group with three modes (Mobile, Tablet, Desktop). When synced via Tokens Studio, Figma creates a **Layout variable collection** with selectable modes, independent from the Theme collection.

### Currently Responsive Tokens

- `section.padding.horizontal.*` — Section horizontal padding
- `section.padding.vertical.*` — Section vertical padding
- `container.gap.*` — Container gaps
- `container.max-width.large` — Large container constraint
- `container.max-width.xlarge` — XL container constraint

## AI/RAG Enhancement

Tokens include metadata for AI systems:

```json
{
  "color": {
    "action": {
      "default": {
        "$value": "{alias.color.brand.primary}",
        "$meta": {
          "description": "Primary action color for CTAs",
          "usage": ["buttons", "links", "active states"],
          "accessibility": "Ensures 4.5:1 contrast ratio",
          "brand-importance": "high",
          "relationships": ["color.action.hover", "color.action.pressed"]
        }
      }
    }
  }
}
```

## Best Practices

1. **Start with primitives** - Define comprehensive scales first
2. **Use alias for brand decisions** - Never reference primitives directly from semantic
3. **Keep semantic stable** - Avoid frequent changes to usage patterns
4. **Document token purposes** - Add descriptions for clarity
5. **Test cross-brand** - Verify tokens work across all brand variants
6. **Validate accessibility** - Ensure contrast ratios and usability
7. **Review regularly** - Keep architecture clean and purposeful

## Maintenance Guidelines

- **Primitives**: Update rarely, major version changes only
- **Alias**: Update per brand, document rationale
- **Semantic**: Stable interface, careful changes
- **Component**: Evolve with component needs, maintain consistency

## File Structure

```
tokens/
├── base/
│   ├── primitives/          # Foundation tokens
│   ├── alias/               # Brand-specific mappings
│   ├── semantic/            # Usage-intent tokens
│   └── component/           # Component-specific tokens
└── themes/
    ├── muka/               # Muka brand overrides
    ├── whitelabel/         # WhiteLabel brand overrides
    └── layout/             # Responsive breakpoint tokens
```
