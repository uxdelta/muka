# View Modes Strategy

This guide documents the mobile-first view system in Muka UI — a set of overlay and navigation patterns built from composable building blocks.

## Overview

The view system provides 4 components that can be composed to create various mobile-first view patterns:

| Component    | Purpose                              | Figma Source         |
| ------------ | ------------------------------------ | -------------------- |
| **TopBar**   | Navigation bar at the top of views   | "Top Bar" component  |
| **BottomBar**| Action buttons or navigation tabs    | "Footer" component   |
| **Dialog**   | Modal/non-modal overlay card or view | "Dialog" compositions|
| **Sheet**    | Bottom-anchored sliding panel        | "Bottom Sheet" comps |

## Mobile-First View Taxonomy

Based on the Figma "Views" section annotations:

### 1. Top Level View
**Purpose:** App home screen and start screens of bottom navigation items.
**Composition:** `TopBar` + content area + `BottomBar(variant="navigation", floating)`
**Example:** Dashboard, Home tab, Search tab start screen.

### 2. Sub Level View
**Purpose:** Deeper content views, presentational content, or direct manipulation screens.
**Composition:** `TopBar` (with back button in leading slot) + content area
**Example:** Item detail page, article view, settings sub-page.

### 3. Modal Dialog (Large)
**Purpose:** Full-screen task views that require explicit completion/dismissal.
**Composition:** `Dialog(size="lg", modal)` with optional footer buttons.
**Behavior:** Cannot be dismissed by tapping backdrop. Must use explicit action.
**Example:** Edit profile, create new item, multi-step forms.

### 4. Non-Modal Dialog (Large)
**Purpose:** Supplementary overlays that can be dismissed by tapping backdrop.
**Composition:** `Sheet(snapPoint="full" | "half")` with draggable TopBar.
**Behavior:** Can be dismissed by tapping backdrop or pressing Escape.
**Example:** Preview panels, supplementary information.

### 5. Modal Dialog (Small)
**Purpose:** Confirmation dialogs and focused decisions.
**Composition:** `Dialog(size="sm", modal)` with footer action buttons.
**Behavior:** Cannot be dismissed by tapping backdrop.
**Example:** Delete confirmation, discard changes prompt.

### 6. Non-Modal Dialog (Small)
**Purpose:** Informational overlays without required actions.
**Composition:** `Dialog(size="sm", modal={false})` — no footer buttons.
**Behavior:** Can be dismissed by tapping backdrop.
**Example:** Quick info popups, help text overlays.

### 7. Bottom Sheet (Hugged)
**Purpose:** Context-specific actions or content that fits its natural height.
**Composition:** `Sheet(snapPoint="content")` with optional footer buttons.
**Behavior:** Draggable, dismissible via backdrop tap.
**Example:** Share menu, quick action picker, sorting options.

## When to Use Each Pattern

| Need                                    | Use                        |
| --------------------------------------- | -------------------------- |
| App-level navigation                    | TopBar + BottomBar(nav)    |
| Back-navigable content                  | TopBar with leading back   |
| Blocking confirmation                   | Dialog(sm, modal)          |
| Non-blocking information                | Dialog(sm, non-modal)      |
| Full-screen task/form                   | Dialog(lg, modal)          |
| Supplementary overlay                   | Sheet(half or full)        |
| Quick actions from context              | Sheet(content)             |

## Desktop Adaptation

### BottomBar Navigation

The BottomBar `navigation` variant supports two desktop transformation modes via the `desktopAs` prop:

#### Sidebar (`desktopAs="sidebar"`)
- On mobile: Standard bottom tab bar
- On desktop (lg breakpoint): Fixed vertical sidebar on the left
  - 240px width
  - Tabs become horizontal rows with icon + label
  - Hover state with background highlight

```tsx
<BottomBar variant="navigation" floating desktopAs="sidebar">
  <BottomBarTab icon={<HomeIcon />} label="Home" active />
  <BottomBarTab icon={<SearchIcon />} label="Search" />
</BottomBar>
```

#### Top Navigation (`desktopAs="topnav"`)
- On mobile: Standard bottom tab bar
- On desktop (lg breakpoint): Fixed horizontal navigation bar at the top
  - Tabs become inline items with underline active indicator
  - Centered within max-width container

```tsx
<BottomBar variant="navigation" desktopAs="topnav">
  <BottomBarTab icon={<HomeIcon />} label="Home" active />
  <BottomBarTab icon={<SearchIcon />} label="Search" />
</BottomBar>
```

### Dialog Desktop Behavior
- **Small Dialog:** Same centered card — constrained to 370px max-width
- **Large Dialog:** Transforms from full-height to centered card (max 640px) with rounded corners

### Sheet Desktop Behavior
- Transforms from bottom-anchored panel to centered card (max 480px)
- Maintains rounded corners on all sides on desktop

## Component Relationship Diagram

```
TopBar ─────────────────────────────┐
  ├─ Used standalone in page views  │
  ├─ Composed inside Dialog         │
  └─ Composed inside Sheet          │
                                    │
BottomBar ──────────────────────────┤
  ├─ Used standalone in page views  │
  ├─ Composed inside Dialog footer  │
  └─ Composed inside Sheet footer   │
                                    │
Dialog ─────────────────────────────┤
  ├─ Composes TopBar internally     │
  ├─ Accepts BottomBar as footer    │
  └─ Uses native <dialog> element   │
                                    │
Sheet ──────────────────────────────┘
  ├─ Composes TopBar(draggable)
  ├─ Accepts BottomBar as footer
  └─ Uses native <dialog> element
```

## Token Architecture

Each component has its own T4 component token file:

- `tokens/t4-components/topbar.json` — height, padding, title, drag-handle
- `tokens/t4-components/bottombar.json` — tab, actions, floating styles
- `tokens/t4-components/dialog.json` — backdrop, surface, shadow, sizing
- `tokens/t4-components/sheet.json` — backdrop, surface, shadow, drag-handle

All reference T3 semantic tokens (`color.surface`, `color.text`, `border.radius`, `shadow`, `spacing`) which in turn reference T2 alias and T1 primitive values.

## Figma Reference

- Views overview: [node 625:1852](https://www.figma.com/design/RL5IFLUJk4yeAFNXlsX4b5/Muka-UI-Figma-Library?node-id=625-1852)
- Header (TopBar): [node 653:9306](https://www.figma.com/design/RL5IFLUJk4yeAFNXlsX4b5/Muka-UI-Figma-Library?node-id=653-9306)
- Footer (BottomBar): [node 625:8012](https://www.figma.com/design/RL5IFLUJk4yeAFNXlsX4b5/Muka-UI-Figma-Library?node-id=625-8012)
