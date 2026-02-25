# Select Component - Usage Patterns

## Overview

The Select component provides a native dropdown selection control with full accessibility support. It uses the Muka design token system and maintains consistency with the Input component's styling.

## Token Usage

### Component Tokens (T4)

Always use component-specific tokens from the `select.*` namespace:

```css
.muka-select__field {
  background-color: var(--select-field-color-default-background);
  border: 1px solid var(--select-field-color-default-border);
  color: var(--select-field-color-default-foreground);
  border-radius: var(--select-field-radius-md);
  padding: var(--select-field-padding-y) var(--select-field-padding-x);
}

.muka-select__field--md {
  height: var(--select-field-height-default);
  font-size: var(--text-input-md-fontSize);
  line-height: var(--text-input-md-lineHeight);
}
```

### States

```css
/* Default */
--select-field-color-default-background
--select-field-color-default-foreground
--select-field-color-default-border

/* Hover */
--select-field-color-hover-background
--select-field-color-hover-foreground
--select-field-color-hover-border

/* Focus */
--select-field-color-focus-background
--select-field-color-focus-foreground
--select-field-color-focus-border

/* Error */
--select-field-color-error-background
--select-field-color-error-foreground
--select-field-color-error-border

/* Disabled */
--select-field-color-disabled-background
--select-field-color-disabled-foreground
--select-field-color-disabled-border
```

## Composition Examples

### Basic Select

```tsx
import { Select } from '@muka/ui';

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
];

<Select 
  label="Country"
  options={countryOptions}
  value={country}
  onChange={(e) => setCountry(e.target.value)}
/>
```

### Select with Placeholder

```tsx
<Select 
  label="Select a Category"
  placeholder="Choose one..."
  options={categories}
  value={category}
  onChange={(e) => setCategory(e.target.value)}
/>
```

### Select with Helper Text

```tsx
<Select 
  label="Preferred Language"
  helperText="Select your primary language for communications"
  options={languages}
  value={language}
  onChange={(e) => setLanguage(e.target.value)}
/>
```

### Select with Error State

```tsx
<Select 
  label="Payment Method"
  options={paymentMethods}
  value={paymentMethod}
  onChange={(e) => setPaymentMethod(e.target.value)}
  error={!paymentMethod && submitted}
  errorMessage="Please select a payment method"
/>
```

### Select with Disabled Options

```tsx
const options = [
  { value: 'basic', label: 'Basic Plan' },
  { value: 'pro', label: 'Pro Plan' },
  { value: 'enterprise', label: 'Enterprise Plan', disabled: true },
];

<Select 
  label="Subscription Plan"
  options={options}
  value={plan}
  onChange={(e) => setPlan(e.target.value)}
/>
```

### Size Variants

```tsx
// Small
<Select size="sm" label="Size SM" options={options} />

// Medium (default)
<Select size="md" label="Size MD" options={options} />

// Large
<Select size="lg" label="Size LG" options={options} />
```

### Full-Width Select

```tsx
<Select 
  fullWidth
  label="Department"
  options={departments}
  value={department}
  onChange={(e) => setDepartment(e.target.value)}
/>
```

### Required Field

```tsx
<Select 
  label="Country"
  options={countries}
  value={country}
  onChange={(e) => setCountry(e.target.value)}
  required
  helperText="This field is required"
/>
```

## Do's and Don'ts

### ✅ DO

**Provide clear, actionable labels**
```tsx
<Select 
  label="Shipping Method"
  options={[
    { value: 'standard', label: 'Standard Shipping (5-7 days)' },
    { value: 'express', label: 'Express Shipping (2-3 days)' },
    { value: 'overnight', label: 'Overnight Shipping (1 day)' },
  ]}
/>
```

**Use placeholder for optional selections**
```tsx
<Select 
  label="Filter by Category"
  placeholder="All categories"
  options={categories}
/>
```

**Group related options logically**
```tsx
const stateOptions = [
  { value: 'ny', label: 'New York' },
  { value: 'ca', label: 'California' },
  { value: 'tx', label: 'Texas' },
  // ... alphabetically ordered
];
```

**Provide context with helper text**
```tsx
<Select 
  label="Time Zone"
  helperText="Used for scheduling and notifications"
  options={timeZones}
/>
```

**Use appropriate disabled states**
```tsx
<Select 
  label="Billing Plan"
  options={plans}
  disabled={!canChangePlan}
  helperText={!canChangePlan ? 'Contact support to change plans' : ''}
/>
```

### ❌ DON'T

**Don't use vague option labels**
```tsx
{/* ❌ WRONG: Unclear options */}
<Select 
  label="Option"
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]}
/>

{/* ✅ CORRECT: Descriptive options */}
<Select 
  label="Notification Frequency"
  options={[
    { value: 'realtime', label: 'Real-time' },
    { value: 'daily', label: 'Daily Digest' },
    { value: 'weekly', label: 'Weekly Summary' },
  ]}
/>
```

**Don't have too many options without search**
```tsx
{/* ❌ WRONG: 100+ options in a basic select */}
<Select 
  label="City"
  options={allCities} // 500+ items
/>

{/* ✅ CORRECT: Use autocomplete/search for large lists */}
<Autocomplete 
  label="City"
  options={allCities}
/>
```

**Don't forget error messages**
```tsx
{/* ❌ WRONG: Error with no explanation */}
<Select error={true} options={options} />

{/* ✅ CORRECT: Clear error message */}
<Select 
  error={true}
  errorMessage="Please select a valid option"
  options={options}
/>
```

**Don't override component tokens**
```css
/* ❌ WRONG: Using primitive tokens */
.custom-select {
  border-color: var(--color-gray-4);
}

/* ✅ CORRECT: Using component tokens */
.custom-select .muka-select__field {
  border-color: var(--select-field-color-default-border);
}
```

**Don't use select for binary choices**
```tsx
{/* ❌ WRONG: Select for yes/no */}
<Select 
  label="Subscribe to newsletter?"
  options={[
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ]}
/>

{/* ✅ CORRECT: Use Toggle or Checkbox */}
<Toggle 
  label="Subscribe to newsletter"
  checked={subscribed}
  onChange={(e) => setSubscribed(e.target.checked)}
/>
```

## Accessibility

### Automatic Features
- Label automatically associated with select via `htmlFor`/`id`
- Error messages linked via `aria-describedby`
- Helper text linked via `aria-describedby`
- Error state indicated via `aria-invalid`
- Native keyboard navigation (Arrow keys, Enter, Escape)

### Best Practices

**Use semantic attributes**
```tsx
<Select 
  name="country"
  required
  autoComplete="country"
  options={countries}
/>
```

**Provide helpful option labels**
```tsx
// Screen readers will announce both value and label
const options = [
  { value: 'usd', label: 'US Dollar (USD)' },
  { value: 'eur', label: 'Euro (EUR)' },
  { value: 'gbp', label: 'British Pound (GBP)' },
];
```

## Form Integration

### Controlled Select
```tsx
const [formData, setFormData] = useState({
  country: '',
  state: '',
  city: '',
});

<form onSubmit={handleSubmit}>
  <Select 
    label="Country"
    name="country"
    options={countries}
    value={formData.country}
    onChange={(e) => setFormData({ 
      ...formData, 
      country: e.target.value,
      state: '', // Reset dependent fields
      city: '',
    })}
    required
  />
  
  <Select 
    label="State"
    name="state"
    options={getStatesForCountry(formData.country)}
    value={formData.state}
    onChange={(e) => setFormData({ 
      ...formData, 
      state: e.target.value,
      city: '', // Reset dependent field
    })}
    disabled={!formData.country}
    required
  />
  
  <Button type="submit">Continue</Button>
</form>
```

### Form Validation
```tsx
const [category, setCategory] = useState('');
const [touched, setTouched] = useState(false);

const showError = touched && !category;

<Select 
  label="Category"
  options={categories}
  value={category}
  onChange={(e) => {
    setCategory(e.target.value);
    setTouched(true);
  }}
  onBlur={() => setTouched(true)}
  error={showError}
  errorMessage={showError ? 'Please select a category' : undefined}
  required
/>
```

## Common Patterns

### Cascading Selects
```tsx
const [country, setCountry] = useState('');
const [state, setState] = useState('');

<div>
  <Select 
    label="Country"
    options={countries}
    value={country}
    onChange={(e) => {
      setCountry(e.target.value);
      setState(''); // Reset dependent select
    }}
  />
  
  <Select 
    label="State/Province"
    options={getStatesForCountry(country)}
    value={state}
    onChange={(e) => setState(e.target.value)}
    disabled={!country}
    placeholder={!country ? 'Select a country first' : 'Choose...'}
  />
</div>
```

### Dynamic Options
```tsx
const [userType, setUserType] = useState('');

const roleOptions = userType === 'admin' 
  ? adminRoles 
  : userType === 'member' 
    ? memberRoles 
    : [];

<div>
  <Select 
    label="User Type"
    options={userTypes}
    value={userType}
    onChange={(e) => setUserType(e.target.value)}
  />
  
  <Select 
    label="Role"
    options={roleOptions}
    disabled={!userType}
    placeholder={!userType ? 'Select user type first' : 'Choose role...'}
  />
</div>
```

### Filter Select
```tsx
<Select 
  label="Sort By"
  options={[
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'date-newest', label: 'Date (Newest First)' },
    { value: 'date-oldest', label: 'Date (Oldest First)' },
  ]}
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
/>
```
