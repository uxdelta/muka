# Radio Component - Usage Patterns

## Overview

The Radio component provides a circular selection control for single-choice options within a group. Unlike checkboxes, only one radio button can be selected at a time within a named group.

## Token Usage

### Component Tokens (T4)

Always use component-specific tokens from the `radio.*` namespace:

```css
.muka-radio__indicator {
  width: var(--radio-size-md);
  height: var(--radio-size-md);
  border-radius: 50%;
  background-color: var(--radio-color-default-background);
  border: 1px solid var(--radio-color-default-border);
}

.muka-radio__dot {
  width: var(--radio-dot-size-md);
  height: var(--radio-dot-size-md);
  background-color: var(--radio-color-checked-dot);
}
```

### States

```css
/* Default (unchecked) */
--radio-color-default-background
--radio-color-default-border
--radio-color-default-dot

/* Checked */
--radio-color-checked-background
--radio-color-checked-border
--radio-color-checked-dot

/* Disabled */
--radio-color-disabled-background
--radio-color-disabled-border
--radio-color-disabled-dot
```

## Composition Examples

### Basic Radio Group

```tsx
import { Radio } from '@muka/ui';

const [gender, setGender] = useState('');

<div role="radiogroup" aria-label="Gender">
  <Radio 
    label="Male"
    name="gender"
    value="male"
    checked={gender === 'male'}
    onChange={(e) => setGender(e.target.value)}
  />
  
  <Radio 
    label="Female"
    name="gender"
    value="female"
    checked={gender === 'female'}
    onChange={(e) => setGender(e.target.value)}
  />
  
  <Radio 
    label="Other"
    name="gender"
    value="other"
    checked={gender === 'other'}
    onChange={(e) => setGender(e.target.value)}
  />
</div>
```

### Radio Group with Fieldset

```tsx
<fieldset>
  <legend>Shipping Method</legend>
  
  <Radio 
    label="Standard Shipping (5-7 days) - Free"
    name="shipping"
    value="standard"
    checked={shipping === 'standard'}
    onChange={(e) => setShipping(e.target.value)}
  />
  
  <Radio 
    label="Express Shipping (2-3 days) - $9.99"
    name="shipping"
    value="express"
    checked={shipping === 'express'}
    onChange={(e) => setShipping(e.target.value)}
  />
  
  <Radio 
    label="Overnight Shipping (1 day) - $19.99"
    name="shipping"
    value="overnight"
    checked={shipping === 'overnight'}
    onChange={(e) => setShipping(e.target.value)}
  />
</fieldset>
```

### Size Variants

```tsx
// Small (16px)
<Radio size="sm" label="Small Radio" name="size" value="sm" />

// Medium (20px) - Default
<Radio size="md" label="Medium Radio" name="size" value="md" />

// Large (24px)
<Radio size="lg" label="Large Radio" name="size" value="lg" />
```

### Disabled Radio

```tsx
<Radio 
  label="Option not available"
  name="options"
  value="unavailable"
  disabled
/>

<Radio 
  label="Pre-selected option"
  name="options"
  value="preselected"
  checked
  disabled
/>
```

### Uncontrolled Radio

```tsx
<Radio 
  label="Option A"
  name="option"
  value="a"
  defaultChecked
/>

<Radio 
  label="Option B"
  name="option"
  value="b"
/>
```

## Do's and Don'ts

### ✅ DO

**Use for mutually exclusive options**
```tsx
<fieldset>
  <legend>Payment Method</legend>
  <Radio label="Credit Card" name="payment" value="card" />
  <Radio label="PayPal" name="payment" value="paypal" />
  <Radio label="Bank Transfer" name="payment" value="bank" />
</fieldset>
```

**Always use the same name for grouped radios**
```tsx
// All radios in the group share the same name
<Radio label="Yes" name="consent" value="yes" />
<Radio label="No" name="consent" value="no" />
```

**Provide clear, descriptive labels**
```tsx
<Radio 
  label="Send me weekly email updates"
  name="emailFrequency"
  value="weekly"
/>
```

**Use fieldset and legend for groups**
```tsx
<fieldset>
  <legend>Notification Preferences</legend>
  <Radio label="All notifications" name="notif" value="all" />
  <Radio label="Important only" name="notif" value="important" />
  <Radio label="None" name="notif" value="none" />
</fieldset>
```

**Pre-select a default option when appropriate**
```tsx
<Radio 
  label="Standard Shipping"
  name="shipping"
  value="standard"
  defaultChecked
/>
<Radio 
  label="Express Shipping"
  name="shipping"
  value="express"
/>
```

### ❌ DON'T

**Don't use radios for multi-select**
```tsx
{/* ❌ WRONG: Use checkboxes for multiple selections */}
<Radio label="JavaScript" name="skills" value="js" />
<Radio label="Python" name="skills" value="py" />
<Radio label="Java" name="skills" value="java" />

{/* ✅ CORRECT: Use checkboxes */}
<Checkbox label="JavaScript" />
<Checkbox label="Python" />
<Checkbox label="Java" />
```

**Don't use different names in the same group**
```tsx
{/* ❌ WRONG: Different names won't group correctly */}
<Radio label="Yes" name="answer1" value="yes" />
<Radio label="No" name="answer2" value="no" />

{/* ✅ CORRECT: Same name for all options */}
<Radio label="Yes" name="answer" value="yes" />
<Radio label="No" name="answer" value="no" />
```

**Don't use radios for binary choices**
```tsx
{/* ❌ WRONG: Radio for simple yes/no */}
<Radio label="Yes" name="subscribe" value="yes" />
<Radio label="No" name="subscribe" value="no" />

{/* ✅ CORRECT: Use toggle or checkbox */}
<Toggle 
  label="Subscribe to newsletter"
  checked={subscribed}
  onChange={(e) => setSubscribed(e.target.checked)}
/>
```

**Don't have a single radio option**
```tsx
{/* ❌ WRONG: Single radio (can't be unchecked) */}
<Radio label="I agree to terms" name="terms" value="agree" />

{/* ✅ CORRECT: Use checkbox for single option */}
<Checkbox label="I agree to terms and conditions" />
```

**Don't override component tokens**
```css
/* ❌ WRONG: Using primitive tokens */
.custom-radio {
  border-color: var(--color-blue-5);
}

/* ✅ CORRECT: Using component tokens */
.custom-radio .muka-radio__indicator {
  border-color: var(--radio-color-default-border);
}
```

**Don't forget labels**
```tsx
{/* ❌ WRONG: No label */}
<Radio name="option" value="a" />

{/* ✅ CORRECT: Has label */}
<Radio label="Option A" name="option" value="a" />
```

## Accessibility

### Automatic Features
- Label automatically associated with radio via `htmlFor`/`id`
- Native keyboard support (Arrow keys to navigate, Space to select)
- Focus indicator meets WCAG 2.4.7
- Only one radio in a group is focusable (roving tabindex)

### Best Practices

**Use fieldset and legend for groups**
```tsx
<fieldset>
  <legend>Choose your plan</legend>
  <Radio label="Free Plan" name="plan" value="free" />
  <Radio label="Pro Plan" name="plan" value="pro" />
  <Radio label="Enterprise Plan" name="plan" value="enterprise" />
</fieldset>
```

**Provide context in labels**
```tsx
<Radio 
  label="Basic Plan - $9/month - Up to 5 users"
  name="plan"
  value="basic"
/>
```

## Form Integration

### Controlled Radio Group
```tsx
const [plan, setPlan] = useState('basic');

<form onSubmit={handleSubmit}>
  <fieldset>
    <legend>Select Plan</legend>
    
    <Radio 
      label="Basic - $9/month"
      name="plan"
      value="basic"
      checked={plan === 'basic'}
      onChange={(e) => setPlan(e.target.value)}
    />
    
    <Radio 
      label="Pro - $29/month"
      name="plan"
      value="pro"
      checked={plan === 'pro'}
      onChange={(e) => setPlan(e.target.value)}
    />
    
    <Radio 
      label="Enterprise - $99/month"
      name="plan"
      value="enterprise"
      checked={plan === 'enterprise'}
      onChange={(e) => setPlan(e.target.value)}
    />
  </fieldset>
  
  <Button type="submit">Continue</Button>
</form>
```

### Form with Multiple Radio Groups
```tsx
const [formData, setFormData] = useState({
  size: 'medium',
  color: 'blue',
  shipping: 'standard',
});

<form>
  <fieldset>
    <legend>Size</legend>
    <Radio label="Small" name="size" value="small" 
      checked={formData.size === 'small'}
      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
    />
    <Radio label="Medium" name="size" value="medium"
      checked={formData.size === 'medium'}
      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
    />
    <Radio label="Large" name="size" value="large"
      checked={formData.size === 'large'}
      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
    />
  </fieldset>
  
  <fieldset>
    <legend>Color</legend>
    <Radio label="Blue" name="color" value="blue"
      checked={formData.color === 'blue'}
      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
    />
    <Radio label="Red" name="color" value="red"
      checked={formData.color === 'red'}
      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
    />
  </fieldset>
</form>
```

## Common Patterns

### Pricing Plans
```tsx
const [selectedPlan, setSelectedPlan] = useState('pro');

<div className="pricing-options">
  {plans.map(plan => (
    <Card 
      key={plan.id}
      variant={selectedPlan === plan.id ? 'selected' : 'default'}
      onClick={() => setSelectedPlan(plan.id)}
    >
      <Radio 
        label={plan.name}
        name="plan"
        value={plan.id}
        checked={selectedPlan === plan.id}
        onChange={(e) => setSelectedPlan(e.target.value)}
      />
      <p className="price">${plan.price}/month</p>
      <ul>
        {plan.features.map(feature => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </Card>
  ))}
</div>
```

### Survey Question
```tsx
<fieldset>
  <legend>How satisfied are you with our service?</legend>
  
  <Radio label="Very Satisfied" name="satisfaction" value="5" />
  <Radio label="Satisfied" name="satisfaction" value="4" />
  <Radio label="Neutral" name="satisfaction" value="3" />
  <Radio label="Dissatisfied" name="satisfaction" value="2" />
  <Radio label="Very Dissatisfied" name="satisfaction" value="1" />
</fieldset>
```

### Settings Choice
```tsx
<fieldset>
  <legend>Theme Preference</legend>
  
  <Radio 
    label="Light Mode"
    name="theme"
    value="light"
    checked={theme === 'light'}
    onChange={(e) => setTheme(e.target.value)}
  />
  
  <Radio 
    label="Dark Mode"
    name="theme"
    value="dark"
    checked={theme === 'dark'}
    onChange={(e) => setTheme(e.target.value)}
  />
  
  <Radio 
    label="System Default"
    name="theme"
    value="system"
    checked={theme === 'system'}
    onChange={(e) => setTheme(e.target.value)}
  />
</fieldset>
```

### Conditional Fields Based on Selection
```tsx
const [accountType, setAccountType] = useState('personal');

<div>
  <fieldset>
    <legend>Account Type</legend>
    <Radio 
      label="Personal Account"
      name="accountType"
      value="personal"
      checked={accountType === 'personal'}
      onChange={(e) => setAccountType(e.target.value)}
    />
    <Radio 
      label="Business Account"
      name="accountType"
      value="business"
      checked={accountType === 'business'}
      onChange={(e) => setAccountType(e.target.value)}
    />
  </fieldset>
  
  {accountType === 'business' && (
    <Input 
      label="Company Name"
      required
    />
  )}
</div>
```

### Radio with Description
```tsx
<fieldset>
  <legend>Backup Frequency</legend>
  
  <div>
    <Radio 
      label="Daily Backups"
      name="backup"
      value="daily"
      checked={backup === 'daily'}
      onChange={(e) => setBackup(e.target.value)}
    />
    <p className="helper-text">Automatic backup every 24 hours</p>
  </div>
  
  <div>
    <Radio 
      label="Weekly Backups"
      name="backup"
      value="weekly"
      checked={backup === 'weekly'}
      onChange={(e) => setBackup(e.target.value)}
    />
    <p className="helper-text">Automatic backup every Sunday at 3 AM</p>
  </div>
</fieldset>
```
