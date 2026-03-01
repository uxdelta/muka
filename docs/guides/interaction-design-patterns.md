# Interaction Design Patterns

This guide documents the interaction design patterns implemented in the Muka navigation flow, covering view hierarchy, dialog behavior, form handling, and confirmation flows.

## Overview

The navigation flow demonstrates a complete user journey through different view levels and modal states:

```
Top-Level View (Home)
    ↓ tap item
Sub-Level View (Project Details)
    ↓ tap "Edit Project"
Modal Dialog (Edit Project)
    ↓ close/cancel with unsaved changes
Confirmation Sheet (Save Changes?)
```

## View Hierarchy

### Surface Elevation

Views and dialogs use a layered surface system for visual hierarchy:

| Layer | Token | Usage |
|-------|-------|-------|
| Views (Home, Details) | `--color-surface-level2` | Base view background |
| Dialogs & Sheets | `--color-surface-level3` | Elevated overlays |

This creates visual separation between the underlying view and overlaid dialogs.

### Text Color Tokens

Use semantic text tokens for theme-responsive typography:

| Purpose | Token |
|---------|-------|
| Headings | `--color-text-default-default` |
| Descriptions/Captions | `--color-text-subtle-default` |

```tsx
<h2 style={{ color: 'var(--color-text-default-default)' }}>
  Welcome Back
</h2>
<p style={{ color: 'var(--color-text-subtle-default)' }}>
  Your recent items
</p>
```

## Top-Level View Pattern

The app home screen with navigation tabs.

**Composition:**
- `TopBar` with title only (no back button)
- Content area with `Section` and `Container`
- `BottomBar(variant="navigation", floating)` with tabs

**Characteristics:**
- No back button — this is the navigation root
- Floating bottom bar for primary navigation
- Background: `surface-level2`

```tsx
<TopBar title="Home" bordered />
<div style={{ flex: 1, overflow: 'auto' }}>
  <HomeContent />
</div>
<BottomBar variant="navigation" floating>
  <BottomBarTab icon={<Icon name="home" />} label="Home" active />
  <BottomBarTab icon={<Icon name="search" />} label="Search" />
  <BottomBarTab icon={<Icon name="user" />} label="Profile" />
</BottomBar>
```

## Sub-Level View Pattern

A deeper content view navigated from a top-level view.

**Composition:**
- `TopBar` with back button in leading slot
- Content area
- No bottom navigation bar

**Characteristics:**
- Back button returns to parent view
- No floating bottom bar — user is focused on this content
- Background: `surface-level2`

```tsx
<TopBar
  title="Project Details"
  leading={<BackButton onClick={goBack} />}
  bordered
/>
<div style={{ flex: 1, overflow: 'auto' }}>
  <ProjectDetailContent />
</div>
```

## Edit Dialog Pattern

A modal dialog for editing content, with specific UX considerations.

**Composition:**
- `Dialog(size="lg", modal)`
- Close button only (no back button) in trailing slot
- Form content with `Input` and `Select` components
- `BottomBar(variant="actions")` footer with Cancel/Save

**Design Decisions:**

### 1. Close Button Only, No Back Button

Edit dialogs use only a close button because:
- The dialog is a discrete task, not part of a navigation hierarchy
- "Back" implies returning to a previous step; "Close" implies dismissing the task
- Simplifies the mental model: close = exit this task

```tsx
<Dialog
  title="Edit Project"
  size="lg"
  modal
  trailing={<CloseButton onClick={handleCloseOrCancel} />}
  footer={
    <BottomBar variant="actions">
      <Button variant="secondary" size="lg" onClick={handleCloseOrCancel}>
        Cancel
      </Button>
      <Button variant="primary" size="lg" onClick={handleSaveChanges}>
        Save
      </Button>
    </BottomBar>
  }
>
  {/* Form content */}
</Dialog>
```

### 2. Form Layout

Forms inside dialogs use:
- `Section(padding="compact")` for consistent spacing
- `Container(gap="compact")` for field spacing
- `fullWidth` prop on inputs for edge-to-edge fields

```tsx
<Section padding="compact">
  <Container gap="compact">
    <Input label="Project Name" fullWidth />
    <Input label="Description" fullWidth />
    <Select label="Visibility" options={[...]} fullWidth />
  </Container>
</Section>
```

## Unsaved Changes Confirmation Pattern

When a user attempts to close or cancel with unsaved changes, show a confirmation sheet.

**Trigger Conditions:**
- User has modified form values (dirty state)
- User clicks Close button OR Cancel button

**Non-Trigger Conditions:**
- User clicks Save button (no confirmation needed)
- No changes have been made (close immediately)

### Change Detection

Track initial values and compare against current state:

```tsx
const initialValues = { name: 'Alpha', description: '', visibility: 'private' };

const [projectName, setProjectName] = useState(initialValues.name);
const [projectDescription, setProjectDescription] = useState(initialValues.description);
const [visibility, setVisibility] = useState(initialValues.visibility);

const hasChanges =
  projectName !== initialValues.name ||
  projectDescription !== initialValues.description ||
  visibility !== initialValues.visibility;
```

### Close Handler Logic

```tsx
const handleCloseOrCancel = () => {
  if (hasChanges) {
    setConfirmSheetOpen(true);  // Show confirmation
  } else {
    setEditDialogOpen(false);   // Close immediately
  }
};

const handleSaveChanges = () => {
  // Save and close directly — no confirmation needed
  setEditDialogOpen(false);
};
```

## Confirmation Sheet Pattern

A non-modal bottom sheet for confirming destructive or data-losing actions.

**Composition:**
- `Sheet(snapPoint="content")` — hugs content height
- Non-modal (can be dismissed by tapping backdrop)
- Nested inside the parent Dialog
- Conditionally rendered only when needed

**Design Decisions:**

### 1. Non-Modal Sheet

The confirmation sheet is non-modal because:
- User can tap backdrop to dismiss and return to editing
- Less aggressive than a blocking modal
- Provides an "escape hatch" back to the form

### 2. Conditional Rendering

Only render the sheet when it's open to prevent it from appearing in the DOM prematurely:

```tsx
{confirmSheetOpen && (
  <Sheet
    open={confirmSheetOpen}
    onClose={() => setConfirmSheetOpen(false)}
    title="Save changes?"
    snapPoint="content"
  >
    {/* Content */}
  </Sheet>
)}
```

### 3. Full-Width Layout

The sheet content uses full-width layout with no padding:

```tsx
<Section padding="compact" style={{ padding: 0 }}>
  <Container gap="compact" style={{ maxWidth: 'none' }}>
    <p style={{ color: 'var(--color-text-subtle-default)' }}>
      You have made changes. Do you want to save them?
    </p>
    <BottomBar variant="actions">
      <Button variant="secondary" size="lg" onClick={handleDiscardChanges}>
        Discard
      </Button>
      <Button variant="primary" size="lg" onClick={handleConfirmSave}>
        Save
      </Button>
    </BottomBar>
  </Container>
</Section>
```

### 4. Action Button Order

- **Discard** (secondary): Left position, less prominent
- **Save** (primary): Right position, more prominent

This follows the convention of placing the "safe" or "constructive" action in the primary position.

### 5. Handler Behavior

```tsx
const handleConfirmSave = () => {
  setConfirmSheetOpen(false);
  setEditDialogOpen(false);
  // Save logic here
};

const handleDiscardChanges = () => {
  // Reset form to initial values
  setProjectName(initialValues.name);
  setProjectDescription(initialValues.description);
  setVisibility(initialValues.visibility);
  // Close both sheet and dialog
  setConfirmSheetOpen(false);
  setEditDialogOpen(false);
};
```

## ListItem Configuration

For rich list displays, configure ListItem with:

| Prop | Purpose |
|------|---------|
| `leadingImage` | Thumbnail or avatar image |
| `caption` | Secondary descriptive text |
| `showChevron` | Navigation affordance |

```tsx
<ListItem
  label="Project Alpha"
  caption="Last edited 2 hours ago"
  leadingImage="https://example.com/image.jpg"
  showChevron
  onClick={() => navigateTo('alpha')}
/>
```

## Complete Flow Summary

| Step | View/Component | User Action | Result |
|------|----------------|-------------|--------|
| 1 | Home (Top-Level) | Tap project item | Navigate to Project Details |
| 2 | Project Details (Sub-Level) | Tap "Edit Project" | Open Edit Dialog |
| 3 | Edit Dialog | Modify form fields | Track dirty state |
| 4a | Edit Dialog | Tap Save | Save & close (no confirmation) |
| 4b | Edit Dialog | Tap Close/Cancel (no changes) | Close immediately |
| 4c | Edit Dialog | Tap Close/Cancel (with changes) | Show Confirmation Sheet |
| 5a | Confirmation Sheet | Tap Save | Save & close all |
| 5b | Confirmation Sheet | Tap Discard | Reset form & close all |
| 5c | Confirmation Sheet | Tap backdrop | Return to Edit Dialog |

## Storybook Reference

Interactive demos of these patterns are available in Storybook:

- **Navigation Flow Demo**: `Views/Patterns/Navigation Flow Demo`
- **Sheet Dialog Demo**: `Views/Patterns/Sheet Dialog Demo`
- **Modal Dialog**: `Views/Patterns/Modal Dialog`

## Figma Reference

- Navigation Flow: [node 643-8634](https://www.figma.com/design/RL5IFLUJk4yeAFNXlsX4b5/Muka-UI-Figma-Library?node-id=643-8634)
