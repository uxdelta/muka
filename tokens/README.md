# Muka Design Tokens

## 🎯 AI-IDE Optimized Design Token Architecture

A lightweight, multi-brand, multi-theme design token system optimized for AI-powered development environments.

## 📁 Folder Structure

```
tokens/
├── base/                    # Foundation tokens
│   ├── primitives/         # Raw design values
│   ├── alias/              # Brand-agnostic references
│   ├── semantic/           # Meaningful abstractions
│   └── component/          # Component-specific tokens
├── brands/                 # Brand-specific overrides
│   ├── muka/              # Creative brand
│   └── wireframe/         # Enterprise brand
├── layouts/               # Responsive breakpoints
├── $themes.json           # Theme configuration
└── $metadata.json         # Token metadata
```

## 🏗️ Token Layers

### 1. Primitives Layer (`base/primitives/`)
**Raw design values** - colors, spacing, typography, etc.

```json
{
  "color": {
    "gray": {
      "1": { "$value": "#f8f9fa" },
      "9": { "$value": "#212529" }
    }
  },
  "spacing": {
    "3": { "$value": "12px" },
    "4": { "$value": "16px" }
  }
}
```

### 2. Alias Layer (`base/alias/`)
**Brand-agnostic references** - reusable across brands

```json
{
  "color": {
    "accent": {
      "default": { "$value": "{color.indigo.500}" },
      "hover": { "$value": "{color.indigo.600}" }
    },
    "neutral": {
      "1": { "$value": "{color.gray.1}" },
      "9": { "$value": "{color.gray.9}" }
    }
  }
}
```

### 3. Semantic Layer (`base/semantic/`)
**Meaningful abstractions** - design intent

```json
{
  "color": {
    "action": {
      "default": { "$value": "{alias.color.accent.default}" },
      "hover": { "$value": "{alias.color.accent.hover}" }
    },
    "surface": {
      "level1": { "$value": "{alias.color.neutral.1}" },
      "level2": { "$value": "{alias.color.neutral.2}" }
    }
  }
}
```

### 4. Component Layer (`base/component/`)
**Component-specific tokens** - button, input, etc.

```json
{
  "button": {
    "color": {
      "primary": {
        "background": {
          "default": { "$value": "{color.action.default}" },
          "hover": { "$value": "{color.action.hover}" }
        }
      }
    }
  }
}
```

## 🎨 Multi-Brand Architecture

### Brand Structure
Each brand has three files:
- `base.json` - Brand-specific primitives
- `light.json` - Light theme overrides
- `dark.json` - Dark theme overrides

### Muka Brand (`brands/muka/`)
```json
{
  "color": {
    "indigo": {
      "500": { "$value": "#6366f1" },
      "600": { "$value": "#4f46e5" }
    }
  }
}
```

### Wireframe Brand (`brands/wireframe/`)
```json
{
  "color": {
    "gray": {
      "500": { "$value": "#6b7280" },
      "600": { "$value": "#4b5563" }
    }
  }
}
```

## 🌓 Theme System

### Theme Configuration (`$themes.json`)
```json
[
  {
    "id": "base",
    "name": "Base",
    "selectedTokenSets": {
      "base/primitives/color": "enabled",
      "base/alias/alias": "enabled",
      "base/semantic/semantic": "enabled"
    }
  },
  {
    "id": "mode-light",
    "name": "Light",
    "selectedTokenSets": {
      "base": "enabled",
      "brands/muka/light": "enabled",
      "brands/wireframe/light": "enabled"
    }
  }
]
```

### Theme Groups
- **Base**: Foundation tokens
- **Mode**: Light/Dark themes
- **Brand**: Muka/Wireframe brands
- **Layout**: Small/Medium/Large breakpoints

## 🔧 Development Workflow

### 1. Token Creation
```bash
# Add new primitive
echo '{"color": {"blue": {"500": {"$value": "#3b82f6"}}}}' > tokens/base/primitives/color.json

# Add alias reference
echo '{"color": {"brand": {"primary": {"$value": "{color.blue.500}"}}}}' > tokens/base/alias/alias.json

# Rebuild CSS
node scripts/build-tokens.js
```

### 2. Brand Customization
```bash
# Override for Muka brand
echo '{"color": {"blue": {"500": {"$value": "#6366f1"}}}}' > tokens/brands/muka/base.json

# Override for Wireframe brand  
echo '{"color": {"blue": {"500": {"$value": "#6b7280"}}}}' > tokens/brands/wireframe/base.json
```

### 3. Component Usage
```css
/* Use component tokens */
.button {
  background-color: var(--button-color-primary-background-default);
  color: var(--button-color-primary-text-default);
  padding: var(--button-spacing-md-padding);
  border-radius: var(--button-radius-md);
}
```

## 🤖 AI-IDE Integration

### Token Naming Convention
```
{layer}.{category}.{subcategory}.{variant}.{state}
```

Examples:
- `button.color.primary.background.default`
- `color.action.default`
- `alias.color.accent.default`
- `color.gray.9`

### CSS Custom Properties
Tokens are converted to CSS custom properties:
```css
:root {
  --button-color-primary-background-default: #6366f1;
  --color-action-default: #6366f1;
  --alias-color-accent-default: #6366f1;
  --color-gray-9: #212529;
}
```

### Brand/Theme Switching
```html
<!-- Light theme, Muka brand -->
<html data-theme="light" data-brand="muka">

<!-- Dark theme, Wireframe brand -->
<html data-theme="dark" data-brand="wireframe">
```

## 📊 Token Relationships

### Reference Chain Example
```
button.color.primary.background.default
  → color.action.default
  → alias.color.accent.default
  → color.indigo.500 (Muka) / color.gray.500 (Wireframe)
```

### Inheritance Order
1. **Primitives** (base values)
2. **Alias** (brand-agnostic references)
3. **Semantic** (meaningful abstractions)
4. **Component** (component-specific)
5. **Brand** (brand-specific overrides)
6. **Theme** (light/dark overrides)

## 🎯 Best Practices

### For AI Development
1. **Always use semantic tokens** in components
2. **Reference component tokens** for specific UI elements
3. **Never use primitives directly** in application code
4. **Test with all brand/theme combinations**

### Token Organization
- **Keep primitives minimal** - only essential values
- **Use aliases for reusability** - brand-agnostic references
- **Semantic tokens for intent** - meaningful abstractions
- **Component tokens for specificity** - UI element specific

### Naming Guidelines
- **Descriptive names** - `color.action.default` not `color.blue`
- **Consistent structure** - `{category}.{subcategory}.{variant}`
- **State suffixes** - `.default`, `.hover`, `.disabled`
- **Size variants** - `.sm`, `.md`, `.lg`

## 🔄 Export Options

### For Figma Variables
```bash
# Export flattened tokens (no references)
node scripts/export-for-figma.js
```

### For Penpot
```bash
# Export with references preserved
node scripts/export-for-penpot.js
```

### For Storybook
```bash
# Generate CSS custom properties
node scripts/build-tokens.js
```

## 🐛 Troubleshooting

### Common Issues
1. **Token not found** - Check file path and JSON structure
2. **Reference not resolved** - Verify token exists and path is correct
3. **CSS not updating** - Rebuild tokens after changes
4. **Theme not switching** - Check data attributes and CSS cascade

### Debug Mode
Enable token debugging:
```css
[data-debug="true"] {
  outline: 1px solid red;
}
```

## 📚 Resources

### Tools
- **Tokens Studio** - Visual token editor
- **Style Dictionary** - Token transformation
- **Figma Variables** - Design tool integration
- **Penpot** - Alternative design tool

### Standards
- **W3C Design Tokens** - Official specification
- **CSS Custom Properties** - Browser implementation
- **Design System Tokens** - Best practices

---

*This token system is optimized for AI-IDE development and multi-brand applications.* 