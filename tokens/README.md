# Design Tokens Documentation

This directory contains all design tokens for the design system, organized in a hierarchical structure that promotes maintainability and scalability.

## Token Hierarchy

The tokens follow a clear hierarchy:

1. **Core Tokens** (`/base/core.json`)
   - Raw values and base tokens
   - Never referenced directly by components or other layers (except Semantic)
   - Includes: colors, spacing, typography, motion, elevation, radius, grid

2. **Semantic Tokens** (`/base/semantic.json`)
   - References core tokens
   - Provides meaningful, purpose-driven names
   - Single source of truth for design decisions
   - Includes: colors, motion, elevation, radius, grid

3. **Component Tokens** (`/base/component.json`)
   - References semantic tokens
   - Defines component-specific styles
   - Includes: button, input, etc.

4. **Brand Tokens** (`/brand/`)
   - References semantic tokens
   - Defines brand-specific overrides
   - Includes: muka.json, ormilon.json

5. **Layout Tokens** (`/base/layout.json`)
   - References semantic tokens
   - Defines responsive layout configurations
   - Includes: mobile, tablet, desktop specific values within the file

6. **Mode Tokens** (`/base/mode.json`)
   - References semantic tokens
   - Defines theme variations (light/dark) within the file
   - Includes: light, dark specific values within the file

### Token Hierarchy Diagram

```mermaid
graph TD
    subgraph "Core Layer"
        C[Core Tokens\n(base/core.json)]
        C --> C1[Colors]
        C --> C2[Spacing]
        C --> C3[Typography]
        C --> C4[Motion]
        C --> C5[Elevation]
        C --> C6[Radius]
        C --> C7[Grid]
    end

    subgraph "Semantic Layer"
        S[Semantic Tokens\n(base/semantic.json)]
        S --> S1[Colors]
        S --> S2[Motion]
        S --> S3[Elevation]
        S --> S4[Radius]
        S --> S5[Grid]
    end

    subgraph "Application Layer"
        A1[Component Tokens\n(base/component.json)]
        A2[Brand Tokens\n(brand/*.json)]
        A3[Layout Tokens\n(base/layout.json)]
        A4[Mode Tokens\n(base/mode.json)]
    end

    C --> S
    S --> A1
    S --> A2
    S --> A3
    S --> A4

    style C fill:#f9f,stroke:#333,stroke-width:2px
    style S fill:#bbf,stroke:#333,stroke-width:2px
    style A1 fill:#bfb,stroke:#333,stroke-width:2px
    style A2 fill:#bfb,stroke:#333,stroke-width:2px
    style A3 fill:#bfb,stroke:#333,stroke-width:2px
    style A4 fill:#bfb,stroke:#333,stroke-width:2px
```

The diagram above illustrates the logical hierarchy:
- **Core Layer** (Pink): Raw values and base tokens defined in `base/core.json`
- **Semantic Layer** (Blue): Purpose-driven tokens that reference core tokens, defined in `base/semantic.json`
- **Application Layer** (Green): Implementation-specific tokens that reference semantic tokens, defined in `base/component.json`, `brand/*.json`, `base/layout.json`, and `base/mode.json`

## Directory Structure

```
tokens/
├── base/              # Consolidated base tokens (core, semantic, component, layout, mode)
│   ├── component.json
│   ├── core.json
│   ├── layout.json
│   ├── mode.json
│   └── semantic.json
├── brand/             # Brand-specific token overrides
│   ├── muka.json
│   └── ormilon.json
├── $metadata.json     # Token metadata (includes token set order)
└── $themes.json       # Theme configurations (for Tokens Studio layering)
```

## Token Categories (within base files)

### Base Core Tokens (in `base/core.json`)
- `color`: Base color palette
- `spacing`: Base spacing scale
- `typography`: Base typography settings
- `motion`: Animation durations and easing
- `elevation`: Shadow definitions
- `radius`: Border radius values
- `grid`: Breakpoints and container sizes

### Base Semantic Tokens (in `base/semantic.json`)
- `color`: Purpose-driven color tokens
- `motion`: Semantic motion tokens
- `elevation`: Semantic elevation tokens
- `radius`: Semantic radius tokens
- `grid`: Semantic grid tokens

### Base Component Tokens (in `base/component.json`)
- Defines component-specific styles (e.g., `button`, `input`)

### Brand Tokens (in `brand/*.json`)
- Defines brand-specific overrides for colors, typography, etc.

### Base Layout Tokens (in `base/layout.json`)
- Defines responsive layout configurations (e.g., values for `mobile`, `tablet`, `desktop`)

### Base Mode Tokens (in `base/mode.json`)
- Defines theme variations (e.g., values for `light`, `dark`)

## Usage Guidelines

1. **Core tokens** are the foundation and should generally only be referenced by semantic tokens.
2. **Semantic tokens** provide meaning and should be the primary reference point for component, brand, layout, and mode tokens.
3. **Component, Brand, Layout, and Mode tokens** can override semantic tokens to provide specific styling based on context.
4. **Layer themes in Tokens Studio** using the `$themes.json` configuration (e.g., Base Brand -> Specific Brand -> Mode -> Layout).

## Token References (Examples - refer to specific token files for actual structure)

### Semantic Token References (e.g., in `base/semantic.json`)
```json
{
  "color": {
    "background": {
      "primary": {
        "value": "{core.color.gray.100}",
        "type": "color"
      }
      // ... other semantic color tokens referencing core colors
    }
    // ... other semantic categories referencing core tokens
  }
}
```

### Application Layer References (e.g., in `base/component.json`, `brand/*.json`, `base/layout.json`, `base/mode.json`)
```json
{
  "button": {
    "primary": {
      "background": {
        "value": "{semantic.color.action.primary.background}",
        "type": "color"
      }
      // ... other component tokens referencing semantic tokens
    }
  }
  // ... other application layer tokens referencing semantic or core tokens where appropriate (e.g., raw brand colors)
}
```

## Best Practices

1. **Maintain Hierarchy:** Core → Semantic → Component/Brand/Layout/Mode. Strive to follow this logical flow in your token references.
2. **Naming Conventions:** Use clear, semantic names. Follow consistent patterns.
3. **Token Types:** Always specify the correct type.
4. **Documentation:** Keep this documentation updated.
5. **Version Control:** Review token changes carefully and test thoroughly.

## Contributing

When adding or modifying tokens:
1. Understand the token hierarchy and place tokens in the correct file (`tokens/base/*.json` or `tokens/brand/*.json`).
2. Use semantic naming where appropriate.
3. Reference existing tokens according to the hierarchy.
4. Update this documentation (`tokens/README.md`).
5. Test your changes in Tokens Studio and on actual components across different themes and layouts. 