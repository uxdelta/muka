# Component Gap Analysis: Nieuwbouw UI

**Issue:** BUK-2
**Date:** 2026-02-27
**Team:** Buka Pintu
**Project:** PI 0 - Design System Foundation

---

## Executive Summary

This audit analyzes the Muka design system (v0.1.0, 32 shipped components) against the anticipated needs of a nieuwbouw (new construction/real estate) application UI. The analysis identifies **4 critical gaps** and **6 enhancement opportunities** with build/adapt/use recommendations.

---

## Current Muka Component Inventory

### Shipped Components (32)

| Category | Components |
|----------|------------|
| **Forms** | Button, Input, Select, Checkbox, CheckboxTile, Radio, RadioTile, Toggle, SegmentGroup, DatePicker |
| **Display** | Badge, Chip, Alert, Toast, Progress, FormProgressBar, Icon, PriceTag |
| **Layout** | Card, Tile, Section, Container, Divider, Label, ListItem |
| **Navigation** | TopBar, BottomBar, BottomBarTab |
| **Overlay** | Dialog, Sheet |
| **Data** | Table, Tabs |

### Planned Components (tokens exist, no React implementation)

Accordion, Avatar, Autocomplete, Collapsible, Combobox, ContextMenu, Field, Fieldset, Form, Menu, Menubar, Meter, NavigationMenu, NumberField, Popover, PreviewCard, ScrollArea, Separator, Slider, Togglegroup, Toolbar, Tooltip

---

## Gap Analysis by Nieuwbouw UI Need

### 1. Data Tables

**Status:** USE (available)

| Requirement | Muka Support | Notes |
|-------------|--------------|-------|
| Basic table structure | ✅ Table, TableHead, TableBody, TableRow, TableCell | Full support |
| Column sorting | ✅ TableHeaderCell with `sortable`, `sortDirection`, `onSort` | Ascending/descending |
| Row selection | ⚠️ Partial | Checkbox in cell; no built-in selection state |
| Pagination | ❌ Missing | Needs to be built |
| Column filtering | ❌ Missing | Needs to be built |
| Fixed headers | ⚠️ Partial | `fixedLayout` for column widths; sticky headers need CSS |
| Responsive scroll | ✅ `responsive` prop | Horizontal scroll on overflow |
| Row expansion | ❌ Missing | For nested data/details |

**Recommendation:** **ADAPT** - The Table component provides a solid foundation but needs extension for enterprise data features:
- Build `TablePagination` sub-component
- Add row selection state management utilities
- Consider headless table library integration (TanStack Table) for complex filtering/grouping

**Priority:** P1 - Core nieuwbouw functionality (property listings, document lists, task tables)

---

### 2. Timeline Components

**Status:** BUILD (gap)

No timeline component exists in Muka. This is a critical gap for construction project tracking.

| Required Feature | Use Case |
|-----------------|----------|
| Vertical timeline | Construction phases, milestone tracking |
| Horizontal timeline | Gantt-style project overview |
| Timeline item states | Completed, current, upcoming, blocked |
| Date markers | Phase start/end dates |
| Milestone markers | Key deliverables |
| Collapsible sections | Phase details expansion |

**Recommendation:** **BUILD** - New component required

**Proposed Components:**
1. `Timeline` - Container with vertical/horizontal orientation
2. `TimelineItem` - Individual event/milestone
3. `TimelineSeparator` - Connector line between items
4. `TimelineContent` - Content area for item details

**Design Considerations:**
- Reuse Badge variants for status indicators
- Reuse Chip for labels/tags
- Use existing Progress patterns for completion indicators
- Follow FormProgressBar visual language for step indicators

**Priority:** P1 - Core nieuwbouw functionality (project phases, construction milestones)

---

### 3. Status Badges

**Status:** USE (available)

| Requirement | Muka Support | Notes |
|-------------|--------------|-------|
| Semantic variants | ✅ neutral, info, success, warning, error | Covers common states |
| Size options | ✅ sm, md, lg | Good flexibility |
| Icon support | ✅ `icon` prop | Leading icon |
| Dot indicator | ✅ `dot` prop | Minimal status indicator |

**Current Badge variants vs. Nieuwbouw needs:**

| Nieuwbouw Status | Muka Variant | Fit |
|------------------|--------------|-----|
| In Progress | `info` | ✅ |
| Completed | `success` | ✅ |
| Pending Approval | `warning` | ✅ |
| Blocked/Failed | `error` | ✅ |
| Draft/Inactive | `neutral` | ✅ |
| Under Review | `info` or custom | ⚠️ May need variant |
| Overdue | `error` | ✅ |

**Recommendation:** **USE** - Badge component covers most needs

**Enhancement suggestions:**
- Add `outline` appearance variant (like Chip has)
- Consider adding `pulse` animation for attention-needed states
- Add construction-specific semantic colors to alias layer if needed

**Priority:** P3 - Works as-is, enhancements are nice-to-have

---

### 4. Document Viewer

**Status:** BUILD (gap)

No document viewing capabilities exist in Muka. This is critical for construction documentation (permits, blueprints, contracts).

| Required Feature | Use Case |
|-----------------|----------|
| PDF rendering | Contracts, permits, specifications |
| Image viewing | Site photos, blueprints |
| Zoom controls | Detail inspection |
| Page navigation | Multi-page documents |
| Thumbnail sidebar | Quick page navigation |
| Download action | Save local copy |
| Print action | Physical copies |
| Fullscreen mode | Detailed review |
| Annotations | Review comments (stretch) |

**Recommendation:** **BUILD** - New compound component required

**Proposed Components:**
1. `DocumentViewer` - Main container managing state
2. `DocumentToolbar` - Zoom, page nav, actions
3. `DocumentCanvas` - Render area
4. `DocumentThumbnails` - Page preview sidebar

**Implementation Approach:**
- Use PDF.js or react-pdf for PDF rendering
- Use native `<img>` with zoom transforms for images
- Leverage existing Dialog/Sheet for fullscreen mode
- Reuse TopBar patterns for toolbar

**Priority:** P2 - Important but can be deferred to PI 1

---

## Additional Gaps Identified

### 5. File Upload

**Status:** BUILD (gap)

| Required Feature | Current Support |
|-----------------|-----------------|
| Drag-and-drop zone | ❌ Missing |
| File type validation | ❌ Missing |
| Upload progress | ⚠️ Progress component exists |
| File list display | ⚠️ Can use ListItem |
| Image preview | ❌ Missing |

**Recommendation:** **BUILD** `FileUpload` component

**Priority:** P1 - Core functionality for document management

---

### 6. Avatar

**Status:** PLANNED (tokens exist)

Avatar is in the manifest but not yet implemented. Needed for:
- User profiles
- Assignment indicators
- Team members display

**Recommendation:** **BUILD** - Prioritize implementation from existing token design

**Priority:** P2

---

### 7. Tooltip

**Status:** PLANNED (tokens exist)

Tooltip is in the manifest but not yet implemented. Needed for:
- Icon-only button explanations
- Status badge details
- Truncated text expansion

**Recommendation:** **BUILD** - Prioritize implementation from existing token design

**Priority:** P2

---

### 8. Empty State

**Status:** BUILD (gap)

| Required Feature | Current Support |
|-----------------|-----------------|
| Illustration slot | ❌ Missing |
| Title/description | ⚠️ Can compose |
| Action button | ✅ Button exists |

**Recommendation:** **BUILD** `EmptyState` component

**Priority:** P2

---

### 9. Skeleton/Loading State

**Status:** BUILD (gap)

| Required Feature | Current Support |
|-----------------|-----------------|
| Skeleton shapes | ❌ Missing |
| Pulse animation | ❌ Missing |
| Table skeleton | ❌ Missing |
| Card skeleton | ❌ Missing |

**Recommendation:** **BUILD** `Skeleton` component

**Priority:** P2

---

### 10. Dropdown Menu

**Status:** PLANNED (tokens exist)

Menu/ContextMenu tokens exist but no React implementation. Needed for:
- Row actions in tables
- Document actions
- User menu

**Recommendation:** **BUILD** - Prioritize implementation from existing token design

**Priority:** P1

---

## Summary: Build/Adapt/Use Decisions

| Component | Decision | Priority | Effort Estimate |
|-----------|----------|----------|-----------------|
| **Table** | ADAPT | P1 | M - Add pagination, selection state |
| **Timeline** | BUILD | P1 | L - New compound component |
| **Badge** | USE | P3 | S - Minor enhancements optional |
| **DocumentViewer** | BUILD | P2 | XL - Complex, external deps |
| **FileUpload** | BUILD | P1 | M - Drag-drop, validation |
| **Avatar** | BUILD | P2 | S - Tokens exist |
| **Tooltip** | BUILD | P2 | S - Tokens exist |
| **EmptyState** | BUILD | P2 | S - Simple composition |
| **Skeleton** | BUILD | P2 | M - Multiple variants |
| **Menu/ContextMenu** | BUILD | P1 | M - Tokens exist |

### Effort Key
- **S** (Small): 1-2 days
- **M** (Medium): 3-5 days
- **L** (Large): 1-2 weeks
- **XL** (Extra Large): 2+ weeks

---

## Recommended Build Order

### Phase 1: Immediate Needs (PI 0)
1. **Menu/ContextMenu** - Unblocks table row actions
2. **FileUpload** - Core document management
3. **Table enhancements** - Pagination, selection

### Phase 2: Core Nieuwbouw Features (PI 1)
4. **Timeline** - Project tracking
5. **Avatar** - User representation
6. **Tooltip** - UI polish

### Phase 3: Enhanced Experience (PI 2)
7. **DocumentViewer** - Full document handling
8. **Skeleton** - Loading states
9. **EmptyState** - Zero-state handling
10. **Badge enhancements** - Animation, variants

---

## Appendix: Full Component Mapping

### Nieuwbouw UI Patterns → Muka Components

| UI Pattern | Primary Components | Status |
|------------|-------------------|--------|
| Property listing table | Table, Badge, Button | ✅ Ready |
| Property detail card | Card, Tile, PriceTag | ✅ Ready |
| Search/filter bar | Input, Select, Button, SegmentGroup | ✅ Ready |
| Multi-step form wizard | FormProgressBar, Dialog/Sheet | ✅ Ready |
| Status dashboard | Badge, Progress, Card | ✅ Ready |
| Project timeline | Timeline (new) | ❌ Build |
| Document list | ListItem, Badge, Menu | ⚠️ Menu needed |
| Document preview | DocumentViewer (new) | ❌ Build |
| File upload area | FileUpload (new) | ❌ Build |
| User assignment | Avatar (planned) | ⚠️ Build from tokens |
| Notifications | Toast, Alert | ✅ Ready |
| Navigation | TopBar, BottomBar, Tabs | ✅ Ready |
| Modal dialogs | Dialog, Sheet | ✅ Ready |
| Form inputs | Input, Select, Checkbox, Radio, DatePicker, Toggle | ✅ Ready |

---

*Report generated for BUK-2. Updates should be tracked in Linear.*
