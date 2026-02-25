# Input Component - Usage Patterns

## Overview

The Input component provides text input functionality with built-in label, helper text, error states, and icon support. It uses the Muka design token system for consistent styling across all brand/theme combinations.

## Token Usage

### Component Tokens (T4)

Always use component-specific tokens from the `input.*` namespace:

```css
.muka-input__field {
  background-color: var(--input-field-color-default-background);
  border: 1px solid var(--input-field-color-default-border);
  color: var(--input-field-color-default-foreground);
  border-radius: var(--input-field-radius-md);
  padding: var(--input-field-padding-y) var(--input-field-padding-x);
}

.muka-input__field--md {
  height: var(--input-field-height-default);
  font-size: var(--text-input-md-fontSize);
  line-height: var(--text-input-md-lineHeight);
}
```

### States

Input supports dedicated tokens for all interactive states:

```css
/* Default */
--input-field-color-default-background
--input-field-color-default-foreground
--input-field-color-default-border

/* Hover */
--input-field-color-hover-background
--input-field-color-hover-foreground
--input-field-color-hover-border

/* Focus */
--input-field-color-focus-background
--input-field-color-focus-foreground
--input-field-color-focus-border

/* Error */
--input-field-color-error-background
--input-field-color-error-foreground
--input-field-color-error-border

/* Disabled */
--input-field-color-disabled-background
--input-field-color-disabled-foreground
--input-field-color-disabled-border
```

## Composition Examples

### Basic Input

```tsx
import { Input } from '@muka/ui';

<Input 
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Input with Helper Text

```tsx
<Input 
  label="Username"
  helperText="Choose a unique username (3-20 characters)"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>
```

### Input with Error State

```tsx
<Input 
  label="Password"
  type="password"
  error={passwordError}
  errorMessage="Password must be at least 8 characters"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
```

### Input with Icons

```tsx
import { Icon } from '@muka/ui';

// Leading icon (search)
<Input 
  placeholder="Search..."
  iconLeft={<Icon name="search" variant="line" size="md" />}
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>

// Trailing icon (password visibility toggle)
<Input 
  label="Password"
  type={showPassword ? 'text' : 'password'}
  iconRight={
    <button onClick={() => setShowPassword(!showPassword)}>
      <Icon name={showPassword ? 'eye-off' : 'eye'} variant="line" size="md" />
    </button>
  }
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
```

### Size Variants

```tsx
// Small (height: 32px)
<Input size="sm" label="Small Input" />

// Medium (height: 40px) - Default
<Input size="md" label="Medium Input" />

// Large (height: 48px)
<Input size="lg" label="Large Input" />
```

### Full-Width Input

```tsx
<Input 
  fullWidth
  label="Full Name"
  placeholder="John Doe"
/>
```

### Required Field

```tsx
<Input 
  label="Email"
  type="email"
  required
  helperText="This field is required"
/>
```

### Read-Only Input

```tsx
<Input 
  label="Order ID"
  value="ORD-12345"
  readOnly
/>
```

## Type Variants

### Text Input
```tsx
<Input type="text" label="Full Name" />
```

### Email Input
```tsx
<Input type="email" label="Email Address" />
```

### Password Input
```tsx
<Input type="password" label="Password" />
```

### Number Input
```tsx
<Input type="number" label="Quantity" />
```

### Telephone Input
```tsx
<Input type="tel" label="Phone Number" />
```

### URL Input
```tsx
<Input type="url" label="Website" />
```

### Search Input
```tsx
<Input 
  type="search" 
  placeholder="Search..."
  iconLeft={<Icon name="search" variant="line" size="md" />}
/>
```

## Do's and Don'ts

### ✅ DO

**Use clear, descriptive labels**
```tsx
<Input 
  label="Email Address"
  placeholder="you@example.com"
/>
```

**Provide helpful error messages**
```tsx
<Input 
  label="Email"
  error={!isValidEmail(email)}
  errorMessage="Please enter a valid email address (e.g., user@example.com)"
/>
```

**Use helper text for formatting requirements**
```tsx
<Input 
  label="Phone Number"
  type="tel"
  helperText="Format: (555) 123-4567"
/>
```

**Match icon size to input size**
```tsx
<Input 
  size="sm"
  iconLeft={<Icon name="search" size="sm" />}
/>
```

**Use appropriate input types**
```tsx
<Input type="email" label="Email" />
<Input type="password" label="Password" />
<Input type="tel" label="Phone" />
```

### ❌ DON'T

**Don't use placeholder as a label**
```tsx
{/* ❌ WRONG: Placeholder-only label disappears */}
<Input placeholder="Enter your email" />

{/* ✅ CORRECT: Persistent label with helpful placeholder */}
<Input 
  label="Email Address"
  placeholder="you@example.com"
/>
```

**Don't show error without message**
```tsx
{/* ❌ WRONG: Error state with no explanation */}
<Input error={true} />

{/* ✅ CORRECT: Error with descriptive message */}
<Input 
  error={true}
  errorMessage="This field is required"
/>
```

**Don't nest interactive elements incorrectly**
```tsx
{/* ❌ WRONG: Button without proper event handling */}
<Input 
  iconRight={<button>Clear</button>}
/>

{/* ✅ CORRECT: Button with proper event handling */}
<Input 
  iconRight={
    <button 
      type="button"
      onClick={(e) => {
        e.preventDefault();
        handleClear();
      }}
      aria-label="Clear input"
    >
      <Icon name="x" variant="line" size="sm" />
    </button>
  }
/>
```

**Don't override component tokens**
```css
/* ❌ WRONG: Using primitive tokens */
.custom-input {
  border-color: var(--color-gray-4);
  padding: var(--space-2);
}

/* ✅ CORRECT: Using component tokens */
.custom-input .muka-input__field {
  border-color: var(--input-field-color-default-border);
  padding: var(--input-field-padding-y) var(--input-field-padding-x);
}
```

**Don't disable inputs without visual feedback**
```tsx
{/* ❌ WRONG: Disabled with no context */}
<Input disabled />

{/* ✅ CORRECT: Disabled with helper text */}
<Input 
  disabled
  label="Locked Field"
  helperText="This field is locked during processing"
/>
```

## Accessibility

### Automatic Features
- Label automatically associated with input via `htmlFor`/`id`
- Error messages linked via `aria-describedby`
- Helper text linked via `aria-describedby`
- Error state indicated via `aria-invalid`
- Required fields indicated visually and semantically

### Best Practices

**Use semantic HTML attributes**
```tsx
<Input 
  name="email"
  type="email"
  required
  autoComplete="email"
/>
```

**Provide context for screen readers**
```tsx
<Input 
  label="Credit Card Number"
  helperText="16-digit number on the front of your card"
  required
/>
```

## Form Integration

### Controlled Input
```tsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
});

<form onSubmit={handleSubmit}>
  <Input 
    label="Full Name"
    name="name"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    required
  />
  
  <Input 
    label="Email"
    name="email"
    type="email"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    required
  />
  
  <Button type="submit">Submit</Button>
</form>
```

### Form Validation
```tsx
const [email, setEmail] = useState('');
const [touched, setTouched] = useState(false);

const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const showError = touched && !isValid && email.length > 0;

<Input 
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  onBlur={() => setTouched(true)}
  error={showError}
  errorMessage={showError ? 'Please enter a valid email' : undefined}
/>
```

## Common Patterns

### Search Input
```tsx
<Input 
  type="search"
  placeholder="Search products..."
  iconLeft={<Icon name="search" variant="line" size="md" />}
  iconRight={
    query && (
      <button onClick={handleClear} aria-label="Clear search">
        <Icon name="x" variant="line" size="sm" />
      </button>
    )
  }
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>
```

### Password with Toggle
```tsx
const [showPassword, setShowPassword] = useState(false);

<Input 
  label="Password"
  type={showPassword ? 'text' : 'password'}
  iconRight={
    <button 
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      <Icon 
        name={showPassword ? 'eye-off' : 'eye'} 
        variant="line" 
        size="md" 
      />
    </button>
  }
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
```

### Input with Character Count
```tsx
const maxLength = 100;

<div>
  <Input 
    label="Bio"
    value={bio}
    onChange={(e) => setBio(e.target.value.slice(0, maxLength))}
    helperText={`${bio.length}/${maxLength} characters`}
  />
</div>
```
