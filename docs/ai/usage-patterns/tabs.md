# Tabs Component - Usage Patterns

## Overview

The Tabs component provides an accessible tab interface with keyboard navigation. It uses a compound component pattern with `<Tabs>`, `<TabList>`, `<Tab>`, and `<TabPanel>` following the WAI-ARIA Tabs Pattern.

## Token Usage

### Component Tokens (T4)

Always use component-specific tokens from the `tabs.*` namespace:

```css
.muka-tabs__list {
  border-bottom: 1px solid var(--tabs-color-border);
  gap: var(--tabs-gap);
}

.muka-tabs__trigger {
  padding: var(--tabs-padding-y) var(--tabs-padding-x);
  color: var(--tabs-color-foreground-default);
  border-bottom: 2px solid transparent;
}

.muka-tabs__trigger--current {
  color: var(--tabs-color-foreground-current);
  border-bottom-color: var(--tabs-color-border-current);
}
```

### States

```css
/* Default */
--tabs-color-foreground-default
--tabs-color-background-default

/* Hover */
--tabs-color-foreground-hover
--tabs-color-background-hover

/* Current (active) */
--tabs-color-foreground-current
--tabs-color-border-current

/* Disabled */
--tabs-color-foreground-disabled
```

## Composition Examples

### Basic Tabs (Uncontrolled)

```tsx
import { Tabs, TabList, Tab, TabPanel } from '@muka/ui';

<Tabs defaultValue="tab1">
  <TabList>
    <Tab value="tab1">Overview</Tab>
    <Tab value="tab2">Details</Tab>
    <Tab value="tab3">Settings</Tab>
  </TabList>
  
  <TabPanel value="tab1">
    <h2>Overview</h2>
    <p>Overview content goes here.</p>
  </TabPanel>
  
  <TabPanel value="tab2">
    <h2>Details</h2>
    <p>Detailed information goes here.</p>
  </TabPanel>
  
  <TabPanel value="tab3">
    <h2>Settings</h2>
    <p>Settings content goes here.</p>
  </TabPanel>
</Tabs>
```

### Controlled Tabs

```tsx
const [activeTab, setActiveTab] = useState('profile');

<Tabs value={activeTab} onChange={setActiveTab}>
  <TabList>
    <Tab value="profile">Profile</Tab>
    <Tab value="account">Account</Tab>
    <Tab value="notifications">Notifications</Tab>
  </TabList>
  
  <TabPanel value="profile">
    <ProfileSettings />
  </TabPanel>
  
  <TabPanel value="account">
    <AccountSettings />
  </TabPanel>
  
  <TabPanel value="notifications">
    <NotificationSettings />
  </TabPanel>
</Tabs>
```

### Tabs with Disabled Tab

```tsx
<Tabs defaultValue="tab1">
  <TabList>
    <Tab value="tab1">Enabled</Tab>
    <Tab value="tab2" disabled>Disabled</Tab>
    <Tab value="tab3">Enabled</Tab>
  </TabList>
  
  <TabPanel value="tab1">Content 1</TabPanel>
  <TabPanel value="tab2">Content 2 (not accessible)</TabPanel>
  <TabPanel value="tab3">Content 3</TabPanel>
</Tabs>
```

### Tabs with Icons

```tsx
<Tabs defaultValue="overview">
  <TabList>
    <Tab value="overview">
      <Icon name="home" variant="line" size="sm" />
      Overview
    </Tab>
    <Tab value="analytics">
      <Icon name="chart" variant="line" size="sm" />
      Analytics
    </Tab>
    <Tab value="settings">
      <Icon name="settings" variant="line" size="sm" />
      Settings
    </Tab>
  </TabList>
  
  <TabPanel value="overview">Overview content</TabPanel>
  <TabPanel value="analytics">Analytics content</TabPanel>
  <TabPanel value="settings">Settings content</TabPanel>
</Tabs>
```

### Tabs with Badges

```tsx
<Tabs defaultValue="all">
  <TabList>
    <Tab value="all">
      All <Badge variant="neutral">42</Badge>
    </Tab>
    <Tab value="unread">
      Unread <Badge variant="error">3</Badge>
    </Tab>
    <Tab value="archived">
      Archived <Badge variant="neutral">12</Badge>
    </Tab>
  </TabList>
  
  <TabPanel value="all">All messages</TabPanel>
  <TabPanel value="unread">Unread messages</TabPanel>
  <TabPanel value="archived">Archived messages</TabPanel>
</Tabs>
```

## Do's and Don'ts

### ✅ DO

**Use clear, concise tab labels**
```tsx
<TabList>
  <Tab value="overview">Overview</Tab>
  <Tab value="details">Details</Tab>
  <Tab value="history">History</Tab>
</TabList>
```

**Keep tab count reasonable (3-7 tabs)**
```tsx
<Tabs defaultValue="tab1">
  <TabList>
    <Tab value="tab1">Tab 1</Tab>
    <Tab value="tab2">Tab 2</Tab>
    <Tab value="tab3">Tab 3</Tab>
    <Tab value="tab4">Tab 4</Tab>
  </TabList>
  {/* Panels */}
</Tabs>
```

**Use consistent value props**
```tsx
{/* Tab and TabPanel values must match */}
<Tab value="settings">Settings</Tab>
<TabPanel value="settings">Settings content</TabPanel>
```

**Provide default value**
```tsx
<Tabs defaultValue="first">
  <TabList>
    <Tab value="first">First Tab</Tab>
    <Tab value="second">Second Tab</Tab>
  </TabList>
  {/* Panels */}
</Tabs>
```

**Use semantic content in panels**
```tsx
<TabPanel value="profile">
  <section aria-labelledby="profile-heading">
    <h2 id="profile-heading">Profile Information</h2>
    {/* Content */}
  </section>
</TabPanel>
```

### ❌ DON'T

**Don't have mismatched Tab/TabPanel values**
```tsx
{/* ❌ WRONG: Values don't match */}
<Tab value="tab1">First</Tab>
<TabPanel value="first">Content</TabPanel>

{/* ✅ CORRECT: Matching values */}
<Tab value="tab1">First</Tab>
<TabPanel value="tab1">Content</TabPanel>
```

**Don't use too many tabs**
```tsx
{/* ❌ WRONG: Too many tabs */}
<TabList>
  <Tab value="1">Tab 1</Tab>
  <Tab value="2">Tab 2</Tab>
  {/* ... 15 more tabs ... */}
</TabList>

{/* ✅ CORRECT: Reasonable number */}
<TabList>
  <Tab value="all">All</Tab>
  <Tab value="active">Active</Tab>
  <Tab value="archived">Archived</Tab>
</TabList>
```

**Don't nest tabs within tabs**
```tsx
{/* ❌ WRONG: Nested tabs create confusion */}
<Tabs>
  <TabList>
    <Tab value="main1">Main 1</Tab>
  </TabList>
  <TabPanel value="main1">
    <Tabs>
      <TabList>
        <Tab value="sub1">Sub 1</Tab>
      </TabList>
    </Tabs>
  </TabPanel>
</Tabs>

{/* ✅ CORRECT: Use sections or different navigation */}
<Tabs>
  <TabList>
    <Tab value="section1">Section 1</Tab>
    <Tab value="section2">Section 2</Tab>
  </TabList>
</Tabs>
```

**Don't override component tokens**
```css
/* ❌ WRONG: Using primitive tokens */
.custom-tabs {
  border-color: var(--color-gray-3);
}

/* ✅ CORRECT: Using component tokens */
.custom-tabs .muka-tabs__list {
  border-color: var(--tabs-color-border);
}
```

**Don't use tabs for sequential steps**
```tsx
{/* ❌ WRONG: Tabs for wizard steps */}
<Tabs>
  <TabList>
    <Tab value="step1">Step 1</Tab>
    <Tab value="step2">Step 2</Tab>
    <Tab value="step3">Step 3</Tab>
  </TabList>
</Tabs>

{/* ✅ CORRECT: Use stepper or wizard component */}
<Stepper activeStep={currentStep}>
  <Step>Step 1</Step>
  <Step>Step 2</Step>
  <Step>Step 3</Step>
</Stepper>
```

## Accessibility

### Automatic Features
- Uses `role="tablist"` with `aria-orientation="horizontal"`
- Uses `role="tab"` with `aria-selected`, `aria-controls`
- Uses `role="tabpanel"` with `aria-labelledby`
- Keyboard navigation: Arrow Left/Right, Home/End
- Roving tabindex pattern (only active tab is focusable)
- Space/Enter to activate tab

### Best Practices

**Ensure tab content is meaningful**
```tsx
<TabPanel value="profile">
  <h2>Profile Settings</h2>
  <p>Manage your profile information and preferences.</p>
  {/* Form fields */}
</TabPanel>
```

**Don't disable the active tab**
```tsx
{/* Tab becomes disabled when not active */}
<Tab value="tab1" disabled={activeTab !== 'tab1'}>Tab 1</Tab>
```

## Common Patterns

### Dashboard Tabs
```tsx
<Tabs defaultValue="overview">
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="analytics">Analytics</Tab>
    <Tab value="reports">Reports</Tab>
    <Tab value="settings">Settings</Tab>
  </TabList>
  
  <TabPanel value="overview">
    <DashboardOverview />
  </TabPanel>
  
  <TabPanel value="analytics">
    <AnalyticsView />
  </TabPanel>
  
  <TabPanel value="reports">
    <ReportsView />
  </TabPanel>
  
  <TabPanel value="settings">
    <SettingsView />
  </TabPanel>
</Tabs>
```

### Product Details Tabs
```tsx
<Tabs defaultValue="description">
  <TabList>
    <Tab value="description">Description</Tab>
    <Tab value="specs">Specifications</Tab>
    <Tab value="reviews">Reviews (24)</Tab>
  </TabList>
  
  <TabPanel value="description">
    <p>{product.description}</p>
  </TabPanel>
  
  <TabPanel value="specs">
    <table>
      {/* Specifications table */}
    </table>
  </TabPanel>
  
  <TabPanel value="reviews">
    <ReviewsList reviews={product.reviews} />
  </TabPanel>
</Tabs>
```

### Settings with Tabs
```tsx
const [activeTab, setActiveTab] = useState('general');
const [hasChanges, setHasChanges] = useState(false);

<Tabs value={activeTab} onChange={(value) => {
  if (hasChanges) {
    if (confirm('You have unsaved changes. Continue?')) {
      setActiveTab(value);
      setHasChanges(false);
    }
  } else {
    setActiveTab(value);
  }
}}>
  <TabList>
    <Tab value="general">General</Tab>
    <Tab value="security">Security</Tab>
    <Tab value="notifications">Notifications</Tab>
  </TabList>
  
  <TabPanel value="general">
    <GeneralSettings onChange={() => setHasChanges(true)} />
  </TabPanel>
  
  <TabPanel value="security">
    <SecuritySettings onChange={() => setHasChanges(true)} />
  </TabPanel>
  
  <TabPanel value="notifications">
    <NotificationSettings onChange={() => setHasChanges(true)} />
  </TabPanel>
</Tabs>
```

### Tabs with URL Sync
```tsx
const [searchParams, setSearchParams] = useSearchParams();
const activeTab = searchParams.get('tab') || 'overview';

<Tabs 
  value={activeTab} 
  onChange={(value) => setSearchParams({ tab: value })}
>
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="details">Details</Tab>
    <Tab value="history">History</Tab>
  </TabList>
  
  <TabPanel value="overview">Overview content</TabPanel>
  <TabPanel value="details">Details content</TabPanel>
  <TabPanel value="history">History content</TabPanel>
</Tabs>
```

### Conditional Tabs
```tsx
const userRole = 'admin';

<Tabs defaultValue="general">
  <TabList>
    <Tab value="general">General</Tab>
    <Tab value="account">Account</Tab>
    {userRole === 'admin' && (
      <Tab value="admin">Admin Panel</Tab>
    )}
  </TabList>
  
  <TabPanel value="general">General content</TabPanel>
  <TabPanel value="account">Account content</TabPanel>
  {userRole === 'admin' && (
    <TabPanel value="admin">Admin content</TabPanel>
  )}
</Tabs>
```

### Tabs in Dialog
```tsx
<Dialog open={open} onClose={handleClose} size="lg" title="User Profile">
  <Tabs defaultValue="info">
    <TabList>
      <Tab value="info">Information</Tab>
      <Tab value="activity">Activity</Tab>
      <Tab value="permissions">Permissions</Tab>
    </TabList>
    
    <TabPanel value="info">
      <UserInfo user={user} />
    </TabPanel>
    
    <TabPanel value="activity">
      <UserActivity userId={user.id} />
    </TabPanel>
    
    <TabPanel value="permissions">
      <UserPermissions userId={user.id} />
    </TabPanel>
  </Tabs>
</Dialog>
```
