# AI Usage Patterns

This directory contains comprehensive usage pattern examples for the top 10 most commonly used Muka UI components. Each file demonstrates correct token usage, composition examples, and do/don't guidance to help developers and AI assistants build consistent, accessible interfaces.

## Available Components

### Form Controls
- **[Button](./button.md)** - Primary interactive element for user actions
- **[Input](./input.md)** - Text input with label, helper text, and error states
- **[Select](./select.md)** - Native dropdown selection control
- **[Checkbox](./checkbox.md)** - Multi-choice selection control
- **[Radio](./radio.md)** - Single-choice selection within a group

### Layout & Content
- **[Card](./card.md)** - Versatile container for grouping related content
- **[Tabs](./tabs.md)** - Accessible tab interface with keyboard navigation

### Feedback & Status
- **[Badge](./badge.md)** - Compact status indicators and labels
- **[Alert](./alert.md)** - Inline notification messages with contextual styling

### Overlays
- **[Dialog](./dialog.md)** - Modal and non-modal overlays for focused interactions

## What's Inside Each File

Every usage pattern document includes:

### 1. Token Usage
- Component-specific token references (T4 layer)
- State-specific tokens (hover, focus, active, disabled, etc.)
- Proper CSS custom property usage
- Never using primitive tokens (T1) directly

### 2. Composition Examples
- Basic usage patterns
- Size and variant demonstrations
- Real-world integration examples
- Edge cases and special states

### 3. Do's and Don'ts
- ✅ Best practices with correct examples
- ❌ Common mistakes with corrections
- Semantic HTML guidance
- Accessibility considerations

### 4. Common Patterns
- Real-world usage scenarios
- Integration with other components
- Form patterns
- Advanced techniques

## Token Architecture Quick Reference

Muka uses a 4-layer token system. **Always use T4 (component) or T3 (semantic) tokens** in your code:

```css
/* ✅ CORRECT: Component tokens (T4) */
.muka-button--primary {
  background-color: var(--button-color-primary-background-default);
  padding: var(--button-padding-md-y) var(--button-padding-md-x);
}

/* ❌ WRONG: Primitive tokens (T1) */
.muka-button--primary {
  background-color: var(--color-blue-6);
  padding: var(--space-2) var(--space-4);
}
```

### Token Layers

1. **T1 - Primitives**: Raw values (never use directly)
2. **T2 - Alias**: Brand-agnostic semantic references
3. **T3 - Semantics**: Meaningful abstractions (action, surface, text)
4. **T4 - Components**: Component-specific tokens (use these!)

## Multi-Brand/Theme Support

All components automatically adapt to 4 brand/theme combinations through design tokens:

- **muka-light** - Vibrant indigo theme (default)
- **muka-dark** - Dark mode with adjusted indigo
- **wireframe-light** - Professional gray theme
- **wireframe-dark** - Gray dark mode

No code changes needed—tokens handle all variations.

## Accessibility Guidelines

All components follow WCAG 2.1 AA standards:

- ✅ Proper semantic HTML
- ✅ ARIA attributes where needed
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Screen reader announcements
- ✅ Color contrast ratios

## Usage for AI Assistants

When generating code:

1. **Always reference these patterns** for correct token usage
2. **Follow the do's and don'ts** to avoid common mistakes
3. **Use semantic HTML** as shown in examples
4. **Include accessibility attributes** demonstrated in patterns
5. **Compose components** using the proven patterns
6. **Never override component tokens** with primitives

## Quick Start Example

```tsx
import { Button, Input, Card } from '@muka/ui';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Card padding="lg">
      <h2>Sign In</h2>
      
      <Input 
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <Input 
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
      <Button 
        variant="primary" 
        fullWidth
        type="submit"
      >
        Sign In
      </Button>
    </Card>
  );
}
```

## Related Documentation

- **[Token Architecture Guide](../../guides/token-architecture-guide.md)** - Deep dive into the 4-layer token system
- **[Component Development](../../guides/component-development.md)** - How to build new components
- **[Multi-Brand Strategy](../../guides/multi-brand-strategy.md)** - Brand and theme system overview

## Contributing

When adding new usage patterns:

1. Follow the established format (Token Usage → Composition → Do's/Don'ts → Patterns)
2. Include both positive and negative examples
3. Show real-world use cases
4. Emphasize accessibility
5. Reference component tokens, never primitives
6. Test examples across all 4 brand/theme combinations

---

**Last Updated**: February 2026  
**Component Version**: Muka UI v1.0  
**Maintained by**: Muka Design System Team
