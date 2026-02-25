# Button Component - Usage Patterns

## Overview

The Button component is the primary interactive element for user actions. It uses the Muka design token system to support 4 variants, 3 sizes, and multiple states across all brand/theme combinations.

## Token Usage

### Component Tokens (T4)

Always use component-specific tokens from the `button.*` namespace:

```css
.muka-button--primary {
  background-color: var(--button-color-primary-background-default);
  color: var(--button-color-primary-foreground-default);
  box-shadow: var(--button-color-primary-shadow-default);
}

.muka-button--md {
  padding: var(--button-padding-md-y) var(--button-padding-md-x);
  border-radius: var(--button-radius-md);
  font-size: var(--text-label-md-fontSize);
  line-height: var(--text-label-md-lineHeight);
}
```

### States & Variants

Each variant has dedicated tokens for all interactive states:

```css
/* Default */
--button-color-{variant}-background-default
--button-color-{variant}-foreground-default
--button-color-{variant}-shadow-default

/* Hover */
--button-color-{variant}-background-hover
--button-color-{variant}-foreground-hover
--button-color-{variant}-shadow-hover

/* Pressed/Active */
--button-color-{variant}-background-pressed
--button-color-{variant}-foreground-pressed
--button-color-{variant}-shadow-pressed

/* Disabled */
--button-color-{variant}-background-disabled
--button-color-{variant}-foreground-disabled
--button-color-{variant}-shadow-disabled
```

Where `{variant}` is: `primary`, `secondary`, `tertiary`, or `ghost`.

## Composition Examples

### Basic Button

```tsx
import { Button } from '@muka/ui';

// Primary action (default)
<Button onClick={handleSubmit}>
  Submit Form
</Button>

// Secondary action
<Button variant="secondary" onClick={handleCancel}>
  Cancel
</Button>
```

### Button with Icons

```tsx
import { Button } from '@muka/ui';
import { Icon } from '@muka/ui';

// Leading icon
<Button 
  variant="primary" 
  iconLeft={<Icon name="plus" variant="line" size="sm" />}
>
  Add Item
</Button>

// Trailing icon
<Button 
  variant="secondary" 
  iconRight={<Icon name="arrow-right" variant="line" size="sm" />}
>
  Next
</Button>

// Icon only (requires aria-label)
<Button 
  variant="tertiary" 
  iconLeft={<Icon name="settings" variant="line" size="md" />}
  iconOnly
  aria-label="Settings"
>
  Settings
</Button>
```

### Size Variants

```tsx
// Small (32px min-height)
<Button size="sm" variant="secondary">
  Small Button
</Button>

// Medium (40px min-height) - Default
<Button size="md" variant="primary">
  Medium Button
</Button>

// Large (48px min-height)
<Button size="lg" variant="primary">
  Large Button
</Button>
```

### Full-Width Layout

```tsx
<Button fullWidth variant="primary">
  Full Width Button
</Button>
```

### Form Integration

```tsx
<form onSubmit={handleSubmit}>
  {/* Submit button */}
  <Button type="submit" variant="primary">
    Save Changes
  </Button>
  
  {/* Reset button */}
  <Button type="reset" variant="ghost">
    Reset Form
  </Button>
</form>
```

## Variant Selection Guide

### Primary
**Use for:** Main call-to-action, form submissions, primary actions
**Visual:** High contrast background with shadow, most prominent

```tsx
<Button variant="primary">Create Account</Button>
```

### Secondary
**Use for:** Supporting actions, complementary to primary
**Visual:** Subtle background with inner shadow, less prominent than primary

```tsx
<Button variant="secondary">Learn More</Button>
```

### Tertiary
**Use for:** Alternative actions, tinted background with border
**Visual:** Light accent background with accent border and text

```tsx
<Button variant="tertiary">View Details</Button>
```

### Ghost
**Use for:** Minimal actions, navigation, icon buttons
**Visual:** Transparent background, border appears on hover

```tsx
<Button variant="ghost">Cancel</Button>
```

## Do's and Don'ts

### ✅ DO

**Use semantic HTML button attributes**
```tsx
<Button type="submit" disabled={isSubmitting}>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</Button>
```

**Provide aria-label for icon-only buttons**
```tsx
<Button 
  iconOnly 
  iconLeft={<Icon name="close" />}
  aria-label="Close dialog"
>
  Close
</Button>
```

**Use appropriate variants for visual hierarchy**
```tsx
<div className="actions">
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Cancel</Button>
</div>
```

**Match icon size to button size**
```tsx
<Button size="sm" iconLeft={<Icon name="plus" size="sm" />}>
  Add
</Button>
```

### ❌ DON'T

**Don't use multiple primary buttons in close proximity**
```tsx
{/* ❌ WRONG: Too many primary CTAs */}
<div>
  <Button variant="primary">Save Draft</Button>
  <Button variant="primary">Publish</Button>
  <Button variant="primary">Delete</Button>
</div>

{/* ✅ CORRECT: Clear hierarchy */}
<div>
  <Button variant="primary">Publish</Button>
  <Button variant="secondary">Save Draft</Button>
  <Button variant="ghost">Delete</Button>
</div>
```

**Don't forget aria-label on icon-only buttons**
```tsx
{/* ❌ WRONG: No accessible label */}
<Button iconOnly iconLeft={<Icon name="settings" />}>
  Settings
</Button>

{/* ✅ CORRECT: Accessible label provided */}
<Button 
  iconOnly 
  iconLeft={<Icon name="settings" />}
  aria-label="Open settings"
>
  Settings
</Button>
```

**Don't use buttons for navigation**
```tsx
{/* ❌ WRONG: Button for navigation */}
<Button onClick={() => navigate('/home')}>
  Go Home
</Button>

{/* ✅ CORRECT: Use a link styled as button or actual link */}
<a href="/home" className="muka-button muka-button--primary">
  Go Home
</a>
```

**Don't override component tokens with primitives**
```css
/* ❌ WRONG: Using primitive tokens */
.custom-button {
  background-color: var(--color-blue-6);
  padding: var(--space-3);
}

/* ✅ CORRECT: Using component tokens */
.custom-button {
  background-color: var(--button-color-primary-background-default);
  padding: var(--button-padding-md-y) var(--button-padding-md-x);
}
```

**Don't disable buttons without explanation**
```tsx
{/* ❌ WRONG: No context for disabled state */}
<Button disabled>Submit</Button>

{/* ✅ CORRECT: Provide context */}
<div>
  <Button disabled={!isFormValid}>Submit</Button>
  {!isFormValid && <p className="error">Please fill all required fields</p>}
</div>
```

## Accessibility

### Required Props
- `aria-label`: **Required** for `iconOnly` buttons
- `type`: Use `"submit"`, `"reset"`, or `"button"` for forms

### Optional ARIA Props
- `aria-pressed`: For toggle buttons
- `aria-expanded`: For buttons controlling expandable content
- `aria-controls`: ID of element the button controls
- `aria-haspopup`: For buttons triggering menus/dialogs

### Example: Toggle Button
```tsx
const [isExpanded, setIsExpanded] = useState(false);

<Button
  variant="tertiary"
  onClick={() => setIsExpanded(!isExpanded)}
  aria-expanded={isExpanded}
  aria-controls="content-panel"
>
  {isExpanded ? 'Hide' : 'Show'} Details
</Button>
```

## Brand & Theme Considerations

The Button component automatically adapts to all brand/theme combinations:

- **muka-light**: Vibrant indigo primary with high contrast
- **muka-dark**: Adjusted indigo with proper dark mode contrast
- **wireframe-light**: Professional gray tones
- **wireframe-dark**: Subtle gray variations for dark mode

No code changes needed—tokens handle all variations.

## Common Patterns

### Loading State
```tsx
const [isLoading, setIsLoading] = useState(false);

<Button 
  variant="primary" 
  disabled={isLoading}
  iconLeft={isLoading ? <Spinner size="sm" /> : undefined}
>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>
```

### Button Group
```tsx
<div className="button-group" style={{ display: 'flex', gap: '8px' }}>
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Preview</Button>
  <Button variant="ghost">Cancel</Button>
</div>
```

### Confirmation Dialog
```tsx
<Dialog>
  <Dialog.Title>Delete Item?</Dialog.Title>
  <Dialog.Content>This action cannot be undone.</Dialog.Content>
  <Dialog.Actions>
    <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
    <Button variant="primary" onClick={handleConfirm}>Delete</Button>
  </Dialog.Actions>
</Dialog>
```
