# Button Component

## 🎯 AI-IDE Optimized Design System Component

The Button component demonstrates the Muka design token architecture with full semantic layer support, multi-brand theming, and AI-friendly documentation.

## 📋 Quick Reference

### Props
```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconOnly?: boolean;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}
```

### Usage Examples
```tsx
// Basic usage
<Button variant="primary" size="md">Click me</Button>

// With icons
<Button iconLeft={<PlusIcon />} iconRight={<ChevronIcon />}>
  Add & Continue
</Button>

// Icon-only (accessible)
<Button iconLeft={<PlusIcon />} iconOnly={true}>
  Add Item
</Button>
```

## 🏗️ Token Architecture

### Component Layer
- `button.color.{variant}.background.{state}` - Background colors
- `button.color.{variant}.text.{state}` - Text colors  
- `button.spacing.{size}.padding` - Padding values
- `button.radius.{size}` - Border radius
- `button.typography.{size}` - Font properties

### Semantic Layer
- `color.action.default` - Primary action color
- `color.surface.level2` - Secondary surface color
- `color.text.default` - Default text color

### Alias Layer
- `alias.color.accent.default` - Brand accent color
- `alias.color.neutral.2` - Neutral surface color
- `alias.font.brand.family` - Brand font family

### Primitive Layer
- `color.gray.9` - Raw color values
- `spacing.3` - Raw spacing values
- `font.size.md` - Raw font sizes

## 🎨 Multi-Brand Support

### Muka Brand
- **Personality**: Modern, creative, professional
- **Colors**: Indigo-based palette
- **Use Case**: Creative agencies, design tools

### Wireframe Brand  
- **Personality**: Neutral, professional, enterprise
- **Colors**: Gray-based palette
- **Use Case**: Enterprise applications, wireframes

## 🌓 Theme Support

### Light Theme
- Bright backgrounds, dark text
- Optimized for daytime use
- High contrast ratios

### Dark Theme
- Dark backgrounds, light text  
- Reduced eye strain
- Consistent contrast ratios

## 🤖 AI Development Guidelines

### For AI-IDE Integration
1. **Always use component tokens first** - `button.color.primary.background.default`
2. **Fall back to semantic tokens** - `color.action.default`
3. **Never reference primitives directly** in components
4. **Test with all brand/theme combinations** using Storybook

### Copy-Paste Code
```tsx
// ✅ Good - Uses component tokens
<Button 
  style={{
    backgroundColor: 'var(--button-color-primary-background-default)',
    color: 'var(--button-color-primary-text-default)'
  }}
>
  Action
</Button>

// ❌ Bad - Uses primitive tokens directly
<Button 
  style={{
    backgroundColor: 'var(--color-indigo-500)',
    color: 'var(--color-white)'
  }}
>
  Action
</Button>
```

### AI Prompt Examples
- "Create a primary button using Muka design tokens"
- "Make this button match the secondary variant from our design system"
- "Apply proper semantic tokens for an action button"
- "Test this component with both Muka and Wireframe brands"

## 🔧 Development Workflow

### 1. Design in Storybook
- Use brand/theme toggles in toolbar
- Test all variants and states
- Verify accessibility

### 2. Code in AI-IDE
- Reference token names from Storybook
- Use CSS custom properties
- Follow semantic layer patterns

### 3. Export to Figma (Optional)
- Use flattened tokens for design exploration
- Accept loss of semantic layer
- Focus on visual design, not token relationships

## 📊 Token Relationships

### Primary Button Chain
```
button.color.primary.background.default
  → color.action.default
  → alias.color.accent.default
  → [brand-specific color]
```

### Secondary Button Chain  
```
button.color.secondary.background.default
  → color.surface.level2
  → alias.color.neutral.2
  → [brand-specific color]
```

## 🎯 Best Practices

### Accessibility
- Always provide `children` text (even for icon-only buttons)
- Use proper ARIA labels when needed
- Ensure sufficient touch target size (44px minimum)

### Performance
- Use CSS custom properties for dynamic theming
- Avoid inline styles for token values
- Leverage CSS cascade for theme switching

### Maintainability
- Follow token naming conventions
- Document token relationships
- Test across all brand/theme combinations

## 🔄 Migration Guide

### From Legacy API
```tsx
// Old API (deprecated)
<Button icon="plus" iconPosition="left">Add</Button>

// New API
<Button iconLeft={<PlusIcon />}>Add</Button>
```

### From Figma Variables
- Figma uses flattened tokens (no semantic layer)
- Code preserves full token relationships
- Use Storybook for accurate token references

## 📚 Related Components
- [Input](./Input/README.md) - Form input component
- [Typography](./Typography/README.md) - Text components
- [Layout](./Layout/README.md) - Layout utilities

## 🐛 Troubleshooting

### Common Issues
1. **Colors not updating** - Check brand/theme selection in Storybook
2. **Icons not showing** - Ensure icon components are imported
3. **Spacing inconsistent** - Verify token references are correct
4. **Accessibility warnings** - Add proper ARIA labels

### Debug Mode
Enable debug mode to see token values:
```tsx
<Button data-debug="true" variant="primary">
  Debug Button
</Button>
```

---

*This component is part of the Muka Design System - optimized for AI-IDE development and multi-brand applications.*
