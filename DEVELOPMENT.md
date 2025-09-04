# Muka Design System - Development Guide

## 🎯 AI-IDE Optimized Development Workflow

This guide is optimized for AI-powered development environments like Cursor and Lovable, with a focus on Storybook as the primary design tool.

## 🚀 Quick Start

### 1. Setup Development Environment
```bash
# Install dependencies
npm install

# Start Storybook (primary design tool)
npm run storybook

# Build tokens
node scripts/build-tokens.js
```

### 2. Development Workflow
```bash
# 1. Design in Storybook
npm run storybook

# 2. Edit tokens (if needed)
# Edit files in tokens/ directory

# 3. Rebuild tokens
node scripts/build-tokens.js

# 4. Export to Figma (optional)
node scripts/export-for-figma.js
```

## 🎨 Design System Architecture

### Token Layers (Bottom to Top)
```
Primitives → Alias → Semantic → Component → Brand → Theme
```

### Brand Strategy
- **Muka**: Creative, modern, indigo-based
- **Wireframe**: Professional, neutral, gray-based

### Theme Strategy  
- **Light**: Bright backgrounds, dark text
- **Dark**: Dark backgrounds, light text

## 🤖 AI-IDE Integration

### For AI Assistants
When working with AI, use these prompts:

#### Component Development
```
"Create a [component] using the Muka design token system with:
- Support for primary/secondary/ghost variants
- Small/medium/large sizes
- Light/dark theme compatibility
- Muka and Wireframe brand support
- Proper semantic token usage"
```

#### Token Usage
```
"Use the Muka design tokens to style this component:
- Component tokens: button.color.primary.background.default
- Semantic tokens: color.action.default
- Alias tokens: alias.color.accent.default
- Never use primitive tokens directly"
```

#### Brand/Theme Testing
```
"Test this component with:
- Muka brand (light/dark themes)
- Wireframe brand (light/dark themes)
- All size variants
- All interaction states"
```

### Copy-Paste Code Examples

#### Button Component
```tsx
// ✅ Good - Uses semantic tokens
<Button 
  variant="primary"
  size="md"
  style={{
    backgroundColor: 'var(--button-color-primary-background-default)',
    color: 'var(--button-color-primary-text-default)'
  }}
>
  Action
</Button>

// ❌ Bad - Uses primitive tokens
<Button 
  style={{
    backgroundColor: 'var(--color-indigo-500)',
    color: 'var(--color-white)'
  }}
>
  Action
</Button>
```

#### CSS Custom Properties
```css
/* ✅ Good - Component-level tokens */
.button-primary {
  background-color: var(--button-color-primary-background-default);
  color: var(--button-color-primary-text-default);
  padding: var(--button-spacing-md-padding);
  border-radius: var(--button-radius-md);
}

/* ✅ Good - Semantic tokens */
.action-button {
  background-color: var(--color-action-default);
  color: var(--color-text-on-action);
}

/* ❌ Bad - Primitive tokens */
.button {
  background-color: var(--color-indigo-500);
  color: var(--color-white);
}
```

## 🎯 Storybook as Primary Design Tool

### Why Storybook?
- **Full semantic layer** preserved
- **Token references** maintained
- **Brand/theme toggles** work perfectly
- **AI-friendly** documentation
- **Component testing** built-in

### Storybook Controls
Use the toolbar to test:
- **Brand**: Muka ↔ Wireframe
- **Theme**: Light ↔ Dark
- **Layout**: Small ↔ Medium ↔ Large

### Story Structure
```tsx
// Basic variant
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

// Interactive playground
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Playground Button',
  },
};

// Real-world examples
export const CallToAction: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Sign Up Now',
  },
};
```

## 🔧 Token Development

### Adding New Tokens
```bash
# 1. Add primitive
echo '{"color": {"blue": {"500": {"$value": "#3b82f6"}}}}' >> tokens/base/primitives/color.json

# 2. Add alias reference
echo '{"color": {"brand": {"primary": {"$value": "{color.blue.500}"}}}}' >> tokens/base/alias/alias.json

# 3. Add semantic token
echo '{"color": {"action": {"default": {"$value": "{alias.color.brand.primary}"}}}}' >> tokens/base/semantic/semantic.json

# 4. Add component token
echo '{"button": {"color": {"primary": {"background": {"default": {"$value": "{color.action.default}"}}}}}}' >> tokens/base/component/button.json

# 5. Rebuild CSS
node scripts/build-tokens.js
```

### Brand Customization
```bash
# Muka brand override
echo '{"color": {"blue": {"500": {"$value": "#6366f1"}}}}' > tokens/brands/muka/base.json

# Wireframe brand override
echo '{"color": {"blue": {"500": {"$value": "#6b7280"}}}}' > tokens/brands/wireframe/base.json
```

### Token Naming Convention
```
{layer}.{category}.{subcategory}.{variant}.{state}
```

Examples:
- `button.color.primary.background.default`
- `color.action.default`
- `alias.color.accent.default`
- `color.gray.9`

## 🎨 Figma Integration (Optional)

### When to Use Figma
- **Design exploration** and ideation
- **Client presentations** and reviews
- **Visual design** refinement
- **Asset creation** and export

### Figma Limitations
- **No semantic layer** (tokens are flattened)
- **No token references** (direct values only)
- **Limited theme switching** (manual mode toggles)

### Export Process
```bash
# Export flattened tokens for Figma
node scripts/export-for-figma.js

# Import into Figma Variables
# Use Tokens Studio plugin
```

## 🔄 Development Workflow

### 1. Component Development
```bash
# Create new component
mkdir components/NewComponent
touch components/NewComponent/NewComponent.tsx
touch components/NewComponent/NewComponent.stories.tsx
touch components/NewComponent/README.md

# Add to Storybook
# Test with brand/theme toggles
# Document token usage
```

### 2. Token Updates
```bash
# Edit token files
# Rebuild CSS
node scripts/build-tokens.js

# Test in Storybook
# Verify brand/theme compatibility
```

### 3. Documentation
```bash
# Update component README
# Add AI-friendly examples
# Document token relationships
# Include copy-paste code
```

## 🧪 Testing Strategy

### Component Testing
- **All variants** (primary, secondary, ghost)
- **All sizes** (sm, md, lg)
- **All states** (default, hover, disabled)
- **All brands** (Muka, Wireframe)
- **All themes** (Light, Dark)

### Token Testing
- **Reference resolution** (aliases work correctly)
- **Brand overrides** (colors change appropriately)
- **Theme switching** (light/dark mode works)
- **CSS generation** (custom properties created)

### Accessibility Testing
- **Screen reader** compatibility
- **Keyboard navigation** support
- **Color contrast** ratios
- **Touch target** sizes

## 📚 Best Practices

### For AI Development
1. **Always use semantic tokens** in components
2. **Reference component tokens** for specific UI elements
3. **Never use primitives directly** in application code
4. **Test with all brand/theme combinations**
5. **Document token relationships** clearly

### For Component Design
1. **Start with Storybook** for design exploration
2. **Use brand/theme toggles** to test variations
3. **Document usage patterns** and examples
4. **Include accessibility** considerations
5. **Provide copy-paste** code examples

### For Token Management
1. **Keep primitives minimal** - only essential values
2. **Use aliases for reusability** - brand-agnostic references
3. **Semantic tokens for intent** - meaningful abstractions
4. **Component tokens for specificity** - UI element specific
5. **Test inheritance** across all layers

## 🐛 Troubleshooting

### Common Issues

#### Storybook Not Loading
```bash
# Clear cache
rm -rf node_modules/.cache/storybook

# Restart Storybook
npm run storybook
```

#### Tokens Not Updating
```bash
# Rebuild tokens
node scripts/build-tokens.js

# Check file paths
# Verify JSON syntax
# Test token references
```

#### Brand/Theme Not Switching
```bash
# Check CSS cascade
# Verify data attributes
# Test CSS custom properties
# Check Storybook decorators
```

#### AI Not Understanding Tokens
```bash
# Provide token examples
# Include token relationships
# Show copy-paste code
# Reference documentation
```

### Debug Mode
Enable debugging to see token values:
```css
[data-debug="true"] {
  outline: 1px solid red;
}
```

## 📖 Resources

### Documentation
- [Token Architecture](./tokens/README.md)
- [Component Guidelines](./components/README.md)
- [Storybook Setup](./.storybook/README.md)

### Tools
- **Storybook**: Primary design tool
- **Tokens Studio**: Visual token editor
- **Figma**: Design exploration (optional)
- **AI-IDE**: Development environment

### Standards
- **W3C Design Tokens**: Official specification
- **CSS Custom Properties**: Browser implementation
- **Design System Tokens**: Best practices

---

*This development guide is optimized for AI-IDE workflows and multi-brand design systems.*
