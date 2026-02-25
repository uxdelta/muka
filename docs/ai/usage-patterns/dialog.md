# Dialog Component - Usage Patterns

## Overview

The Dialog component displays modal or non-modal overlays for focused interactions. It uses the native `<dialog>` element for proper focus management and accessibility. Supports two sizes (small centered card, large full-height panel) and integrates with TopBar and BottomBar components.

## Token Usage

### Component Tokens (T4)

Always use component-specific tokens from the `dialog.*` namespace:

```css
.muka-dialog__surface {
  background-color: var(--dialog-color-surface);
  border-radius: var(--dialog-radius-sm);
  box-shadow: var(--dialog-shadow);
}

.muka-dialog::backdrop {
  background-color: var(--dialog-color-backdrop);
}

.muka-dialog__body {
  padding: var(--dialog-padding-body);
}
```

### Size Variants

```css
/* Small (centered card) */
--dialog-size-sm-width
--dialog-radius-sm

/* Large (full-height on mobile, large card on desktop) */
--dialog-size-lg-width
--dialog-radius-lg
```

## Composition Examples

### Basic Dialog

```tsx
import { Dialog, Button } from '@muka/ui';

const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>
    Open Dialog
  </Button>
  
  <Dialog 
    open={open}
    onClose={() => setOpen(false)}
    title="Dialog Title"
  >
    <p>Dialog content goes here.</p>
  </Dialog>
</>
```

### Dialog with Custom Header Actions

```tsx
<Dialog 
  open={open}
  onClose={handleClose}
  title="Edit Profile"
  leading={
    <button onClick={handleClose} aria-label="Close">
      <Icon name="x" variant="line" size="md" />
    </button>
  }
  trailing={
    <Button size="sm" onClick={handleSave}>
      Save
    </Button>
  }
>
  <Input label="Name" />
  <Input label="Email" type="email" />
</Dialog>
```

### Dialog with Footer Actions

```tsx
<Dialog 
  open={open}
  onClose={handleClose}
  title="Confirm Action"
  footer={
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      <Button variant="ghost" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </div>
  }
>
  <p>Are you sure you want to proceed with this action?</p>
</Dialog>
```

### Large Dialog (Full-Height)

```tsx
<Dialog 
  open={open}
  onClose={handleClose}
  size="lg"
  title="Settings"
  leading={
    <button onClick={handleClose}>
      <Icon name="arrow-left" variant="line" size="md" />
    </button>
  }
>
  <div className="settings-content">
    {/* Long scrollable content */}
  </div>
</Dialog>
```

### Non-Modal Dialog

```tsx
<Dialog 
  open={open}
  onClose={handleClose}
  modal={false}
  title="Quick Info"
>
  <p>Click outside to dismiss this dialog.</p>
</Dialog>
```

### Confirmation Dialog

```tsx
<Dialog 
  open={showConfirm}
  onClose={() => setShowConfirm(false)}
  title="Delete Item?"
  size="sm"
  footer={
    <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
      <Button 
        variant="ghost" 
        onClick={() => setShowConfirm(false)}
        fullWidth
      >
        Cancel
      </Button>
      <Button 
        variant="primary" 
        onClick={handleDelete}
        fullWidth
      >
        Delete
      </Button>
    </div>
  }
>
  <p>This action cannot be undone. Are you sure you want to delete this item?</p>
</Dialog>
```

### Form Dialog

```tsx
<Dialog 
  open={open}
  onClose={handleClose}
  title="Add New User"
  footer={
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        Add User
      </Button>
    </div>
  }
>
  <form onSubmit={handleSubmit}>
    <Input label="Full Name" required />
    <Input label="Email" type="email" required />
    <Select 
      label="Role"
      options={[
        { value: 'admin', label: 'Administrator' },
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Viewer' },
      ]}
    />
  </form>
</Dialog>
```

## Size Selection Guide

### Small (`size="sm"`)
**Use for:** Confirmations, alerts, short forms, quick actions
**Visual:** Centered card with max-width, rounded corners, shadow
**Behavior:** Always centered, scrollable content if needed

```tsx
<Dialog size="sm" title="Quick Action">
  <p>Short content</p>
</Dialog>
```

### Large (`size="lg"`)
**Use for:** Complex forms, detailed views, settings pages
**Visual:** Full-height on mobile, large centered card on desktop
**Behavior:** More screen real estate, better for extensive content

```tsx
<Dialog size="lg" title="User Settings">
  {/* Extensive settings content */}
</Dialog>
```

## Do's and Don'ts

### ✅ DO

**Provide a clear title**
```tsx
<Dialog title="Edit Profile" open={open} onClose={handleClose}>
  {/* Content */}
</Dialog>
```

**Use appropriate size for content**
```tsx
{/* Small for quick actions */}
<Dialog size="sm" title="Delete?">
  <p>Confirm deletion?</p>
</Dialog>

{/* Large for complex forms */}
<Dialog size="lg" title="Create Account">
  <form>{/* Multiple fields */}</form>
</Dialog>
```

**Always provide onClose handler**
```tsx
<Dialog 
  open={open}
  onClose={() => setOpen(false)}
  title="Dialog"
>
  Content
</Dialog>
```

**Use footer for action buttons**
```tsx
<Dialog 
  title="Confirm"
  footer={
    <>
      <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
      <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
    </>
  }
>
  Content
</Dialog>
```

**Provide aria-label for dialogs without visible titles**
```tsx
<Dialog 
  open={open}
  onClose={handleClose}
  aria-label="User profile settings"
>
  {/* Content without TopBar title */}
</Dialog>
```

### ❌ DON'T

**Don't nest dialogs**
```tsx
{/* ❌ WRONG: Dialog within dialog */}
<Dialog open={open1}>
  <Dialog open={open2}>
    Nested content
  </Dialog>
</Dialog>

{/* ✅ CORRECT: Use sequential dialogs */}
{open1 && <Dialog>First dialog</Dialog>}
{open2 && <Dialog>Second dialog</Dialog>}
```

**Don't use dialog for non-critical content**
```tsx
{/* ❌ WRONG: Dialog for simple tooltip */}
<Dialog title="Info">
  <p>Hover for more info</p>
</Dialog>

{/* ✅ CORRECT: Use tooltip or popover */}
<Tooltip content="More info">Info</Tooltip>
```

**Don't forget to handle Escape key**
```tsx
{/* ❌ WRONG: No close handler */}
<Dialog open={open} title="Dialog">
  Content
</Dialog>

{/* ✅ CORRECT: Has onClose */}
<Dialog open={open} onClose={() => setOpen(false)} title="Dialog">
  Content
</Dialog>
```

**Don't override component tokens**
```css
/* ❌ WRONG: Using primitive tokens */
.custom-dialog {
  background: var(--color-white);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

/* ✅ CORRECT: Using component tokens */
.custom-dialog .muka-dialog__surface {
  background-color: var(--dialog-color-surface);
  box-shadow: var(--dialog-shadow);
}
```

**Don't use too many footer buttons**
```tsx
{/* ❌ WRONG: Too many actions */}
<Dialog 
  footer={
    <>
      <Button>Action 1</Button>
      <Button>Action 2</Button>
      <Button>Action 3</Button>
      <Button>Action 4</Button>
    </>
  }
>
  Content
</Dialog>

{/* ✅ CORRECT: Primary + secondary action */}
<Dialog 
  footer={
    <>
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Save</Button>
    </>
  }
>
  Content
</Dialog>
```

## Accessibility

### Automatic Features
- Uses native `<dialog>` element for focus trap
- Escape key closes the dialog
- Focus returns to trigger element on close
- `aria-modal="true"` for modal dialogs
- Backdrop prevents interaction with background (modal mode)

### Best Practices

**Provide accessible labels**
```tsx
<Dialog 
  open={open}
  onClose={handleClose}
  title="Settings"
  aria-describedby="dialog-description"
>
  <p id="dialog-description">
    Configure your account settings.
  </p>
</Dialog>
```

**Ensure keyboard navigation**
```tsx
<Dialog 
  open={open}
  onClose={handleClose}
  title="Form"
  footer={
    <>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button type="submit" onClick={handleSubmit}>Submit</Button>
    </>
  }
>
  {/* Form fields are keyboard accessible */}
</Dialog>
```

## Common Patterns

### Delete Confirmation
```tsx
const [showDelete, setShowDelete] = useState(false);

<>
  <Button variant="ghost" onClick={() => setShowDelete(true)}>
    Delete
  </Button>
  
  <Dialog 
    open={showDelete}
    onClose={() => setShowDelete(false)}
    title="Delete Item?"
    size="sm"
    footer={
      <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
        <Button variant="ghost" onClick={() => setShowDelete(false)} fullWidth>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleDelete} fullWidth>
          Delete
        </Button>
      </div>
    }
  >
    <p>This action cannot be undone. Are you sure?</p>
  </Dialog>
</>
```

### Multi-Step Dialog
```tsx
const [step, setStep] = useState(1);

<Dialog 
  open={open}
  onClose={handleClose}
  title={`Step ${step} of 3`}
  footer={
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', width: '100%' }}>
      <Button 
        variant="ghost" 
        onClick={() => setStep(step - 1)}
        disabled={step === 1}
      >
        Back
      </Button>
      <Button 
        variant="primary"
        onClick={() => step === 3 ? handleComplete() : setStep(step + 1)}
      >
        {step === 3 ? 'Complete' : 'Next'}
      </Button>
    </div>
  }
>
  {step === 1 && <div>Step 1 content</div>}
  {step === 2 && <div>Step 2 content</div>}
  {step === 3 && <div>Step 3 content</div>}
</Dialog>
```

### Loading Dialog
```tsx
<Dialog 
  open={isProcessing}
  onClose={() => {}}
  title="Processing..."
  size="sm"
>
  <div style={{ textAlign: 'center', padding: '24px' }}>
    <Spinner size="lg" />
    <p>Please wait while we process your request.</p>
  </div>
</Dialog>
```

### Success/Error Feedback Dialog
```tsx
<Dialog 
  open={showSuccess}
  onClose={() => setShowSuccess(false)}
  title="Success!"
  size="sm"
  footer={
    <Button variant="primary" onClick={() => setShowSuccess(false)} fullWidth>
      Done
    </Button>
  }
>
  <div style={{ textAlign: 'center' }}>
    <Icon name="check-circle" variant="fill" size="xl" color="green" />
    <p>Your changes have been saved successfully.</p>
  </div>
</Dialog>
```

### Settings Dialog
```tsx
<Dialog 
  open={open}
  onClose={handleClose}
  size="lg"
  title="Settings"
  leading={
    <button onClick={handleClose} aria-label="Close">
      <Icon name="x" variant="line" size="md" />
    </button>
  }
  footer={
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  }
>
  <Tabs defaultValue="general">
    <TabList>
      <Tab value="general">General</Tab>
      <Tab value="security">Security</Tab>
      <Tab value="notifications">Notifications</Tab>
    </TabList>
    
    <TabPanel value="general">
      {/* General settings */}
    </TabPanel>
    <TabPanel value="security">
      {/* Security settings */}
    </TabPanel>
    <TabPanel value="notifications">
      {/* Notification settings */}
    </TabPanel>
  </Tabs>
</Dialog>
```
