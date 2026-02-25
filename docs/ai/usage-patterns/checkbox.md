# Checkbox Component - Usage Patterns

## Overview

The Checkbox component provides a square selection control for multi-choice options. It supports checked, unchecked, and indeterminate states with full accessibility support.

## Token Usage

### Component Tokens (T4)

Always use component-specific tokens from the `checkbox.*` namespace:

```css
.muka-checkbox__indicator {
  width: var(--checkbox-size-md);
  height: var(--checkbox-size-md);
  border-radius: var(--checkbox-radius);
  background-color: var(--checkbox-color-default-background);
  border: 1px solid var(--checkbox-color-default-border);
}

.muka-checkbox__icon {
  width: var(--checkbox-icon-size-md);
  height: var(--checkbox-icon-size-md);
  color: var(--checkbox-color-checked-icon);
}
```

### States

```css
/* Default (unchecked) */
--checkbox-color-default-background
--checkbox-color-default-border
--checkbox-color-default-icon

/* Checked */
--checkbox-color-checked-background
--checkbox-color-checked-border
--checkbox-color-checked-icon

/* Indeterminate */
--checkbox-color-indeterminate-background
--checkbox-color-indeterminate-border
--checkbox-color-indeterminate-icon

/* Disabled */
--checkbox-color-disabled-background
--checkbox-color-disabled-border
--checkbox-color-disabled-icon
```

## Composition Examples

### Basic Checkbox

```tsx
import { Checkbox } from '@muka/ui';

<Checkbox 
  label="Accept terms and conditions"
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
/>
```

### Checkbox without Label

```tsx
<Checkbox 
  checked={selected}
  onChange={(e) => setSelected(e.target.checked)}
  aria-label="Select item"
/>
```

### Indeterminate State (Parent Checkbox)

```tsx
const [items, setItems] = useState([
  { id: 1, checked: false },
  { id: 2, checked: true },
  { id: 3, checked: false },
]);

const checkedCount = items.filter(item => item.checked).length;
const allChecked = checkedCount === items.length;
const someChecked = checkedCount > 0 && checkedCount < items.length;

<Checkbox 
  label="Select All"
  checked={allChecked}
  indeterminate={someChecked}
  onChange={(e) => {
    const newChecked = e.target.checked;
    setItems(items.map(item => ({ ...item, checked: newChecked })));
  }}
/>
```

### Size Variants

```tsx
// Small (16px)
<Checkbox size="sm" label="Small Checkbox" />

// Medium (20px) - Default
<Checkbox size="md" label="Medium Checkbox" />

// Large (24px)
<Checkbox size="lg" label="Large Checkbox" />
```

### Disabled State

```tsx
<Checkbox 
  label="Option not available"
  disabled
  checked={false}
/>

<Checkbox 
  label="Pre-selected option"
  disabled
  checked={true}
/>
```

### Uncontrolled Checkbox

```tsx
<Checkbox 
  label="Remember me"
  defaultChecked={true}
  name="remember"
/>
```

## Do's and Don'ts

### ✅ DO

**Use clear, concise labels**
```tsx
<Checkbox label="Send me email notifications" />
<Checkbox label="I agree to the terms of service" />
```

**Use indeterminate for parent checkboxes**
```tsx
<div>
  <Checkbox 
    label="All Features"
    checked={allFeaturesSelected}
    indeterminate={someFeaturesSelected}
    onChange={handleSelectAll}
  />
  
  <div style={{ marginLeft: '24px' }}>
    <Checkbox label="Feature A" checked={features.a} onChange={handleFeatureA} />
    <Checkbox label="Feature B" checked={features.b} onChange={handleFeatureB} />
    <Checkbox label="Feature C" checked={features.c} onChange={handleFeatureC} />
  </div>
</div>
```

**Group related checkboxes**
```tsx
<fieldset>
  <legend>Email Preferences</legend>
  <Checkbox label="Product updates" />
  <Checkbox label="Weekly newsletter" />
  <Checkbox label="Promotional offers" />
</fieldset>
```

**Provide context for standalone checkboxes**
```tsx
<Checkbox 
  label="I have read and agree to the Privacy Policy"
  required
/>
```

**Match checkbox size to text size**
```tsx
<Checkbox 
  size="sm"
  label={<span style={{ fontSize: '14px' }}>Small text with small checkbox</span>}
/>
```

### ❌ DON'T

**Don't use checkboxes for mutually exclusive options**
```tsx
{/* ❌ WRONG: Mutually exclusive with checkboxes */}
<div>
  <Checkbox label="Male" checked={gender === 'male'} />
  <Checkbox label="Female" checked={gender === 'female'} />
  <Checkbox label="Other" checked={gender === 'other'} />
</div>

{/* ✅ CORRECT: Use Radio buttons */}
<RadioGroup value={gender} onChange={setGender}>
  <Radio value="male" label="Male" />
  <Radio value="female" label="Female" />
  <Radio value="other" label="Other" />
</RadioGroup>
```

**Don't use long or complex labels**
```tsx
{/* ❌ WRONG: Too much text in label */}
<Checkbox label="By checking this box, you acknowledge that you have read, understood, and agree to be bound by all terms and conditions..." />

{/* ✅ CORRECT: Concise label with link */}
<Checkbox label={
  <>
    I agree to the <a href="/terms">Terms and Conditions</a>
  </>
} />
```

**Don't nest interactive elements in labels**
```tsx
{/* ❌ WRONG: Button inside checkbox label */}
<Checkbox label={
  <span>
    Subscribe to newsletter <button>Learn more</button>
  </span>
} />

{/* ✅ CORRECT: Separate the controls */}
<div>
  <Checkbox label="Subscribe to newsletter" />
  <button>Learn more about our newsletter</button>
</div>
```

**Don't override component tokens**
```css
/* ❌ WRONG: Using primitive tokens */
.custom-checkbox {
  border-color: var(--color-blue-5);
}

/* ✅ CORRECT: Using component tokens */
.custom-checkbox .muka-checkbox__indicator {
  border-color: var(--checkbox-color-default-border);
}
```

**Don't forget labels for accessibility**
```tsx
{/* ❌ WRONG: No label or aria-label */}
<Checkbox checked={selected} onChange={handleChange} />

{/* ✅ CORRECT: Has visible label */}
<Checkbox label="Select item" checked={selected} onChange={handleChange} />

{/* ✅ ALSO CORRECT: Has aria-label */}
<Checkbox 
  checked={selected} 
  onChange={handleChange}
  aria-label="Select item"
/>
```

## Accessibility

### Automatic Features
- Label automatically associated with checkbox via `htmlFor`/`id`
- Native keyboard support (Space to toggle)
- Focus indicator meets WCAG 2.4.7
- Indeterminate state announced to screen readers

### Best Practices

**Use fieldset for checkbox groups**
```tsx
<fieldset>
  <legend>Select your interests</legend>
  <Checkbox label="Technology" name="interests" value="tech" />
  <Checkbox label="Sports" name="interests" value="sports" />
  <Checkbox label="Music" name="interests" value="music" />
</fieldset>
```

**Provide aria-label when no visible label**
```tsx
<Checkbox 
  checked={selected}
  onChange={handleToggle}
  aria-label="Select row"
/>
```

## Form Integration

### Controlled Checkboxes
```tsx
const [formData, setFormData] = useState({
  newsletter: false,
  terms: false,
  marketing: false,
});

<form onSubmit={handleSubmit}>
  <Checkbox 
    label="Subscribe to newsletter"
    name="newsletter"
    checked={formData.newsletter}
    onChange={(e) => setFormData({ 
      ...formData, 
      newsletter: e.target.checked 
    })}
  />
  
  <Checkbox 
    label="I accept the terms of service"
    name="terms"
    checked={formData.terms}
    onChange={(e) => setFormData({ 
      ...formData, 
      terms: e.target.checked 
    })}
    required
  />
  
  <Button 
    type="submit" 
    disabled={!formData.terms}
  >
    Submit
  </Button>
</form>
```

### Checkbox List (Multi-Select)
```tsx
const [selectedItems, setSelectedItems] = useState<string[]>([]);

const handleToggle = (value: string) => {
  setSelectedItems(prev =>
    prev.includes(value)
      ? prev.filter(item => item !== value)
      : [...prev, value]
  );
};

<div>
  {items.map(item => (
    <Checkbox 
      key={item.id}
      label={item.name}
      checked={selectedItems.includes(item.id)}
      onChange={() => handleToggle(item.id)}
    />
  ))}
</div>
```

## Common Patterns

### Select All Pattern
```tsx
const [selectedIds, setSelectedIds] = useState<string[]>([]);
const allIds = items.map(item => item.id);

const allSelected = selectedIds.length === allIds.length;
const someSelected = selectedIds.length > 0 && selectedIds.length < allIds.length;

<div>
  <Checkbox 
    label="Select All"
    checked={allSelected}
    indeterminate={someSelected}
    onChange={(e) => {
      setSelectedIds(e.target.checked ? allIds : []);
    }}
  />
  
  <div>
    {items.map(item => (
      <Checkbox 
        key={item.id}
        label={item.name}
        checked={selectedIds.includes(item.id)}
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedIds([...selectedIds, item.id]);
          } else {
            setSelectedIds(selectedIds.filter(id => id !== item.id));
          }
        }}
      />
    ))}
  </div>
</div>
```

### Table Row Selection
```tsx
<table>
  <thead>
    <tr>
      <th>
        <Checkbox 
          checked={allRowsSelected}
          indeterminate={someRowsSelected}
          onChange={handleSelectAll}
          aria-label="Select all rows"
        />
      </th>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    {rows.map(row => (
      <tr key={row.id}>
        <td>
          <Checkbox 
            checked={selectedRows.includes(row.id)}
            onChange={() => handleRowToggle(row.id)}
            aria-label={`Select ${row.name}`}
          />
        </td>
        <td>{row.name}</td>
        <td>{row.email}</td>
      </tr>
    ))}
  </tbody>
</table>
```

### Consent Checkbox
```tsx
const [consents, setConsents] = useState({
  terms: false,
  privacy: false,
  age: false,
});

const canSubmit = consents.terms && consents.privacy && consents.age;

<form>
  <Checkbox 
    label={<>I agree to the <a href="/terms">Terms of Service</a></>}
    checked={consents.terms}
    onChange={(e) => setConsents({ ...consents, terms: e.target.checked })}
    required
  />
  
  <Checkbox 
    label={<>I have read the <a href="/privacy">Privacy Policy</a></>}
    checked={consents.privacy}
    onChange={(e) => setConsents({ ...consents, privacy: e.target.checked })}
    required
  />
  
  <Checkbox 
    label="I confirm I am 18 years or older"
    checked={consents.age}
    onChange={(e) => setConsents({ ...consents, age: e.target.checked })}
    required
  />
  
  <Button type="submit" disabled={!canSubmit}>
    Create Account
  </Button>
</form>
```
