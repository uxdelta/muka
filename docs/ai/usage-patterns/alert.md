# Alert Component - Usage Patterns

## Overview

The Alert component displays inline notification messages with contextual styling. It's used for form validation feedback, important notices, and status messages. It supports multiple variants, dismissible functionality, and custom actions.

## Token Usage

### Component Tokens (T4)

Always use component-specific tokens from the `alert.*` namespace:

```css
.muka-alert {
  background-color: var(--alert-color-info-background);
  border: 1px solid var(--alert-color-info-border);
  color: var(--alert-color-info-foreground);
  padding: var(--alert-padding-md);
  border-radius: var(--alert-radius);
}

.muka-alert__icon {
  color: var(--alert-color-info-icon);
}
```

### Variant Tokens

```css
/* Info */
--alert-color-info-background
--alert-color-info-foreground
--alert-color-info-border
--alert-color-info-icon

/* Success */
--alert-color-success-background
--alert-color-success-foreground
--alert-color-success-border
--alert-color-success-icon

/* Warning */
--alert-color-warning-background
--alert-color-warning-foreground
--alert-color-warning-border
--alert-color-warning-icon

/* Error */
--alert-color-error-background
--alert-color-error-foreground
--alert-color-error-border
--alert-color-error-icon
```

## Composition Examples

### Basic Alert

```tsx
import { Alert } from '@muka/ui';

<Alert variant="info">
  This is an informational message.
</Alert>

<Alert variant="success">
  Your changes have been saved successfully.
</Alert>

<Alert variant="warning">
  Your subscription will expire in 3 days.
</Alert>

<Alert variant="error">
  Unable to process your request. Please try again.
</Alert>
```

### Alert with Title

```tsx
<Alert variant="warning" title="Warning">
  Your session will expire in 5 minutes. Please save your work.
</Alert>

<Alert variant="error" title="Validation Error">
  Please correct the errors below before submitting the form.
</Alert>
```

### Dismissible Alert

```tsx
const [showAlert, setShowAlert] = useState(true);

{showAlert && (
  <Alert 
    variant="info"
    dismissible
    onDismiss={() => setShowAlert(false)}
  >
    This alert can be dismissed by clicking the X button.
  </Alert>
)}
```

### Alert with Action

```tsx
<Alert 
  variant="warning"
  title="Update Available"
  action={<Button size="sm" variant="tertiary">Update Now</Button>}
>
  A new version of the app is available.
</Alert>
```

### Alert with Custom Icon

```tsx
<Alert 
  variant="info"
  icon={<Icon name="lightbulb" variant="fill" size="md" />}
>
  Pro tip: Use keyboard shortcuts to work faster!
</Alert>
```

### Alert without Icon

```tsx
<Alert variant="info" hideIcon>
  This alert has no icon, just the message.
</Alert>
```

### Size Variants

```tsx
// Small
<Alert size="sm" variant="info">Small alert message</Alert>

// Medium (default)
<Alert size="md" variant="info">Medium alert message</Alert>

// Large
<Alert size="lg" variant="info">Large alert message</Alert>
```

## Variant Selection Guide

### Info
**Use for:** General information, tips, notices
**Role:** `status` (polite announcement)

```tsx
<Alert variant="info">
  Your profile was viewed 12 times this week.
</Alert>
```

### Success
**Use for:** Successful operations, confirmations, positive feedback
**Role:** `status` (polite announcement)

```tsx
<Alert variant="success">
  Payment processed successfully! Receipt sent to your email.
</Alert>
```

### Warning
**Use for:** Cautionary messages, expiring items, attention needed
**Role:** `status` (polite announcement)

```tsx
<Alert variant="warning">
  Your free trial ends in 3 days. Upgrade to continue using premium features.
</Alert>
```

### Error
**Use for:** Errors, validation failures, critical issues
**Role:** `alert` (assertive announcement)

```tsx
<Alert variant="error">
  Unable to connect to server. Please check your internet connection.
</Alert>
```

## Do's and Don'ts

### ✅ DO

**Use appropriate variants for context**
```tsx
<Alert variant="success">Account created successfully!</Alert>
<Alert variant="error">Failed to create account. Email already exists.</Alert>
```

**Provide clear, actionable messages**
```tsx
<Alert variant="warning" title="Incomplete Profile">
  Add your phone number to enable two-factor authentication.
</Alert>
```

**Use actions for immediate next steps**
```tsx
<Alert 
  variant="info"
  action={<Button size="sm">Learn More</Button>}
>
  New features are now available in your dashboard.
</Alert>
```

**Keep messages concise**
```tsx
<Alert variant="success">
  Settings saved successfully.
</Alert>
```

**Use titles for complex messages**
```tsx
<Alert variant="error" title="Form Validation Failed">
  Please fill in all required fields: Email, Password, and Name.
</Alert>
```

### ❌ DON'T

**Don't use wrong semantic variants**
```tsx
{/* ❌ WRONG: Success for error message */}
<Alert variant="success">Login failed</Alert>

{/* ✅ CORRECT: Error for error message */}
<Alert variant="error">Login failed. Please check your credentials.</Alert>
```

**Don't write overly long messages**
```tsx
{/* ❌ WRONG: Too verbose */}
<Alert variant="info">
  This is a very long informational message that contains way too much 
  information and could be broken down into smaller, more digestible pieces 
  or simplified significantly to improve user comprehension and readability.
</Alert>

{/* ✅ CORRECT: Concise with link for more */}
<Alert 
  variant="info"
  action={<a href="/docs">Learn more</a>}
>
  Your account has new features available.
</Alert>
```

**Don't stack multiple alerts**
```tsx
{/* ❌ WRONG: Alert overload */}
<Alert variant="info">Info message 1</Alert>
<Alert variant="info">Info message 2</Alert>
<Alert variant="warning">Warning message</Alert>
<Alert variant="success">Success message</Alert>

{/* ✅ CORRECT: Single alert or grouped messages */}
<Alert variant="info" title="Multiple Updates">
  <ul>
    <li>Feature A is now available</li>
    <li>Bug fixes for issue B</li>
    <li>Performance improvements</li>
  </ul>
</Alert>
```

**Don't override component tokens**
```css
/* ❌ WRONG: Using primitive tokens */
.custom-alert {
  background: var(--color-blue-1);
  border-color: var(--color-blue-5);
}

/* ✅ CORRECT: Using component tokens */
.custom-alert.muka-alert--info {
  background-color: var(--alert-color-info-background);
  border-color: var(--alert-color-info-border);
}
```

**Don't use dismissible for critical errors**
```tsx
{/* ❌ WRONG: Critical error can be dismissed */}
<Alert variant="error" dismissible>
  Payment failed. Transaction was not completed.
</Alert>

{/* ✅ CORRECT: Critical error requires action */}
<Alert 
  variant="error"
  action={<Button size="sm">Retry Payment</Button>}
>
  Payment failed. Please update your payment method.
</Alert>
```

## Accessibility

### Automatic Features
- Uses `role="alert"` for error variant (immediate announcement)
- Uses `role="status"` for other variants (polite announcement)
- Uses `aria-live="assertive"` for alerts, `"polite"` for status
- Color is not the only indicator (icons and text provide meaning)
- Dismiss button has accessible label

### Best Practices

**Ensure messages are clear without visual context**
```tsx
<Alert variant="error">
  Password must be at least 8 characters long.
</Alert>
```

**Provide context for actions**
```tsx
<Alert 
  variant="warning"
  action={
    <Button size="sm" aria-label="Renew subscription now">
      Renew
    </Button>
  }
>
  Subscription expires soon.
</Alert>
```

## Form Integration

### Form Validation Error
```tsx
const [errors, setErrors] = useState<string[]>([]);

{errors.length > 0 && (
  <Alert variant="error" title="Please fix the following errors:">
    <ul>
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  </Alert>
)}
```

### Success Confirmation
```tsx
const [submitted, setSubmitted] = useState(false);

{submitted && (
  <Alert variant="success" dismissible onDismiss={() => setSubmitted(false)}>
    Form submitted successfully! We'll be in touch soon.
  </Alert>
)}
```

## Common Patterns

### Page-Level Alert
```tsx
<div className="page-container">
  <Alert variant="warning" title="Maintenance Notice">
    System maintenance scheduled for tonight at 11 PM EST. Services may be 
    temporarily unavailable.
  </Alert>
  
  {/* Page content */}
</div>
```

### Inline Form Feedback
```tsx
<form>
  <Input label="Email" type="email" />
  <Input label="Password" type="password" />
  
  {loginError && (
    <Alert variant="error">
      Invalid email or password. Please try again.
    </Alert>
  )}
  
  <Button type="submit">Sign In</Button>
</form>
```

### Temporary Success Message
```tsx
const [showSuccess, setShowSuccess] = useState(false);

const handleSave = async () => {
  await saveData();
  setShowSuccess(true);
  setTimeout(() => setShowSuccess(false), 5000);
};

{showSuccess && (
  <Alert variant="success">
    Changes saved successfully!
  </Alert>
)}
```

### Alert with Action Button
```tsx
<Alert 
  variant="info"
  title="Cookie Consent"
  action={
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button size="sm" variant="tertiary" onClick={handleAccept}>
        Accept
      </Button>
      <Button size="sm" variant="ghost" onClick={handleDecline}>
        Decline
      </Button>
    </div>
  }
>
  We use cookies to improve your experience on our site.
</Alert>
```

### Alert List (Multiple Alerts)
```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
  <Alert variant="error">
    Unable to load user data. Please refresh the page.
  </Alert>
  
  <Alert variant="warning">
    Some features may be limited in your current plan.
  </Alert>
</div>
```

### Persistent Alert
```tsx
// Don't use dismissible for important persistent alerts
<Alert variant="warning" title="Account Verification Required">
  Please verify your email address to access all features. 
  <a href="/verify">Resend verification email</a>
</Alert>
```

### Update Notification
```tsx
const [updateAvailable, setUpdateAvailable] = useState(true);

{updateAvailable && (
  <Alert 
    variant="info"
    dismissible
    onDismiss={() => setUpdateAvailable(false)}
    action={
      <Button size="sm" onClick={handleUpdate}>
        Update Now
      </Button>
    }
  >
    A new version is available.
  </Alert>
)}
```

### Contextual Help
```tsx
<Alert variant="info" hideIcon>
  <strong>Tip:</strong> Press Ctrl+K to open the command palette.
</Alert>
```
