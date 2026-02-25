# Badge Component - Usage Patterns

## Overview

The Badge component provides compact status indicators for labels, counts, and status information. Unlike Chip, badges are non-interactive and non-dismissible. They use semantic color variants to convey meaning.

## Token Usage

### Component Tokens (T4)

Always use component-specific tokens from the `badge.*` namespace:

```css
.muka-badge {
  background-color: var(--badge-color-neutral-background);
  color: var(--badge-color-neutral-foreground);
  padding: var(--badge-padding-md-y) var(--badge-padding-md-x);
  border-radius: var(--badge-radius);
  font-size: var(--text-label-sm-fontSize);
}

.muka-badge--md {
  height: var(--badge-height-md);
  gap: var(--badge-icon-gap-md);
}
```

### Color Variants

Each variant has dedicated color tokens:

```css
/* Neutral */
--badge-color-neutral-background
--badge-color-neutral-foreground

/* Info */
--badge-color-info-background
--badge-color-info-foreground

/* Success */
--badge-color-success-background
--badge-color-success-foreground

/* Warning */
--badge-color-warning-background
--badge-color-warning-foreground

/* Error */
--badge-color-error-background
--badge-color-error-foreground
```

## Composition Examples

### Basic Badge

```tsx
import { Badge } from '@muka/ui';

<Badge>New</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
```

### Badge with Icon

```tsx
import { Icon } from '@muka/ui';

<Badge 
  variant="success"
  icon={<Icon name="check" variant="fill" size="xs" />}
>
  Verified
</Badge>

<Badge 
  variant="error"
  icon={<Icon name="x" variant="fill" size="xs" />}
>
  Failed
</Badge>
```

### Badge with Dot Indicator

```tsx
<Badge variant="success" dot>Active</Badge>
<Badge variant="warning" dot>Pending</Badge>
<Badge variant="error" dot>Offline</Badge>
```

### Size Variants

```tsx
// Small
<Badge size="sm" variant="info">Small</Badge>

// Medium (default)
<Badge size="md" variant="info">Medium</Badge>

// Large
<Badge size="lg" variant="info">Large</Badge>
```

### Numerical Badges (Counts)

```tsx
<Badge variant="error">3</Badge>
<Badge variant="info">12</Badge>
<Badge variant="neutral">99+</Badge>
```

## Variant Selection Guide

### Neutral
**Use for:** General labels, categories, tags, metadata
**Visual:** Subtle gray background

```tsx
<Badge variant="neutral">Draft</Badge>
<Badge variant="neutral">Category</Badge>
```

### Info
**Use for:** Informational status, notifications, tips
**Visual:** Blue tones

```tsx
<Badge variant="info">New Feature</Badge>
<Badge variant="info">Beta</Badge>
```

### Success
**Use for:** Completed status, positive outcomes, verification
**Visual:** Green tones

```tsx
<Badge variant="success">Published</Badge>
<Badge variant="success">Verified</Badge>
<Badge variant="success">Completed</Badge>
```

### Warning
**Use for:** Cautionary status, pending actions, attention needed
**Visual:** Yellow/orange tones

```tsx
<Badge variant="warning">Pending</Badge>
<Badge variant="warning">Review Required</Badge>
```

### Error
**Use for:** Error status, failed actions, critical issues
**Visual:** Red tones

```tsx
<Badge variant="error">Failed</Badge>
<Badge variant="error">Offline</Badge>
<Badge variant="error">Rejected</Badge>
```

## Do's and Don'ts

### ✅ DO

**Use semantic variants that match meaning**
```tsx
<Badge variant="success">Active</Badge>
<Badge variant="error">Inactive</Badge>
<Badge variant="warning">Expiring Soon</Badge>
```

**Keep badge text short and scannable**
```tsx
<Badge>New</Badge>
<Badge>Pro</Badge>
<Badge>5</Badge>
```

**Use consistent variants across the app**
```tsx
// All "active" states use success variant
<Badge variant="success">Active</Badge>
<Badge variant="success">Online</Badge>
<Badge variant="success">Running</Badge>
```

**Match icon size to badge size**
```tsx
<Badge 
  size="sm"
  icon={<Icon name="check" size="xs" />}
>
  Verified
</Badge>
```

**Use badges to supplement, not replace, text**
```tsx
<div>
  <h3>John Doe <Badge variant="info">Admin</Badge></h3>
  <p>Administrator account with full access</p>
</div>
```

### ❌ DON'T

**Don't use long text in badges**
```tsx
{/* ❌ WRONG: Too much text */}
<Badge>This is a very long badge text that doesn't fit well</Badge>

{/* ✅ CORRECT: Short, concise text */}
<Badge>Important</Badge>
```

**Don't use badges for interactive elements**
```tsx
{/* ❌ WRONG: Badge used as button */}
<Badge onClick={handleClick}>Click me</Badge>

{/* ✅ CORRECT: Use Chip for interactive elements */}
<Chip onDismiss={handleDismiss}>Removable tag</Chip>
```

**Don't use wrong semantic variants**
```tsx
{/* ❌ WRONG: Success for error state */}
<Badge variant="success">Failed</Badge>

{/* ✅ CORRECT: Error for error state */}
<Badge variant="error">Failed</Badge>
```

**Don't override component tokens**
```css
/* ❌ WRONG: Using primitive colors */
.custom-badge {
  background: var(--color-red-5);
  color: var(--color-white);
}

/* ✅ CORRECT: Using component tokens */
.custom-badge.muka-badge--error {
  background-color: var(--badge-color-error-background);
  color: var(--badge-color-error-foreground);
}
```

**Don't stack too many badges**
```tsx
{/* ❌ WRONG: Visual clutter */}
<h3>
  Product Name 
  <Badge>New</Badge>
  <Badge>Sale</Badge>
  <Badge>Hot</Badge>
  <Badge>Limited</Badge>
</h3>

{/* ✅ CORRECT: One or two key badges */}
<h3>
  Product Name 
  <Badge variant="info">New</Badge>
  <Badge variant="warning">Sale</Badge>
</h3>
```

## Accessibility

### Automatic Features
- Uses `role="status"` for screen reader announcements
- Supports `aria-label` for additional context
- Color is not the only indicator (icons and text provide meaning)

### Best Practices

**Provide aria-label when needed**
```tsx
<Badge variant="error" aria-label="3 unread notifications">
  3
</Badge>
```

**Don't rely solely on color**
```tsx
{/* ✅ CORRECT: Icon + color convey meaning */}
<Badge 
  variant="success"
  icon={<Icon name="check" />}
>
  Verified
</Badge>
```

## Common Patterns

### Status Badge on Table Row
```tsx
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Order #1234</td>
      <td><Badge variant="success">Delivered</Badge></td>
      <td>2026-02-20</td>
    </tr>
    <tr>
      <td>Order #1235</td>
      <td><Badge variant="warning">Pending</Badge></td>
      <td>2026-02-22</td>
    </tr>
  </tbody>
</table>
```

### Notification Badge
```tsx
<button style={{ position: 'relative' }}>
  <Icon name="bell" variant="line" size="md" />
  <Badge 
    variant="error"
    size="sm"
    style={{
      position: 'absolute',
      top: '-4px',
      right: '-4px',
    }}
    aria-label="5 unread notifications"
  >
    5
  </Badge>
</button>
```

### User Role Badge
```tsx
<div className="user-card">
  <img src={user.avatar} alt={user.name} />
  <div>
    <h3>{user.name}</h3>
    <Badge variant="info">{user.role}</Badge>
  </div>
</div>
```

### Product Labels
```tsx
<Card>
  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
    <Badge variant="info">New</Badge>
    <Badge variant="warning">Limited Stock</Badge>
  </div>
  <h3>Product Name</h3>
  <p>$99.99</p>
</Card>
```

### Status with Dot Indicator
```tsx
<div className="status-list">
  <div>
    <Badge variant="success" dot>Active Services</Badge>
    <p>All systems operational</p>
  </div>
  <div>
    <Badge variant="error" dot>Failed Jobs</Badge>
    <p>3 jobs require attention</p>
  </div>
  <div>
    <Badge variant="warning" dot>Pending Reviews</Badge>
    <p>5 items awaiting review</p>
  </div>
</div>
```

### Feature Tag
```tsx
<h2>
  Premium Plan 
  <Badge variant="success">Most Popular</Badge>
</h2>
```

### Badge Group
```tsx
<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
  <Badge variant="neutral">JavaScript</Badge>
  <Badge variant="neutral">TypeScript</Badge>
  <Badge variant="neutral">React</Badge>
  <Badge variant="neutral">CSS</Badge>
</div>
```

### Online Status
```tsx
<div className="user-list">
  {users.map(user => (
    <div key={user.id} className="user-item">
      <img src={user.avatar} alt={user.name} />
      <span>{user.name}</span>
      <Badge 
        variant={user.online ? 'success' : 'neutral'}
        dot
        size="sm"
      >
        {user.online ? 'Online' : 'Offline'}
      </Badge>
    </div>
  ))}
</div>
```

### Count Badge
```tsx
<div style={{ display: 'flex', gap: '16px' }}>
  <div>
    <h4>Inbox</h4>
    <Badge variant="error">23</Badge>
  </div>
  <div>
    <h4>Drafts</h4>
    <Badge variant="neutral">5</Badge>
  </div>
  <div>
    <h4>Sent</h4>
    <Badge variant="neutral">142</Badge>
  </div>
</div>
```
