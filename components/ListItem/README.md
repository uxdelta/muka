# ListItem Component

A flexible list item component with support for leading icons/images, trailing chevrons, labels, and captions. Height adjusts automatically based on content presence.

## Features

- **Interactive**: Hover, pressed, and selected states
- **Accessible**: Keyboard navigation and screen reader support
- **Flexible leading content**: Icon or image
- **Optional trailing chevron**
- **Semantic HTML**: Support for different element types
- **Design tokens**: Uses Muka design system tokens

## Usage

```tsx
import { ListItem } from '@muka/design-system';

// Basic usage with icon
<ListItem
  label="Documents"
  caption="Folder"
  leadingIcon={<FolderIcon />}
  showChevron={true}
/>

// With image
<ListItem
  label="User Profile"
  caption="john@example.com"
  leadingImage="https://example.com/avatar.jpg"
  showChevron={true}
/>

// Interactive
<ListItem
  label="Clickable Item"
  caption="Has onClick handler"
  leadingIcon={<FolderIcon />}
  showChevron={true}
  onClick={() => console.log('Clicked!')}
/>

// As different semantic element
<ListItem
  label="Navigation Link"
  caption="Goes to settings"
  leadingIcon={<SettingsIcon />}
  showChevron={true}
  as="a"
  href="/settings"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Main label text |
| `caption` | `string` | `undefined` | Optional caption text below label |
| `leadingIcon` | `React.ReactNode` | `undefined` | Leading icon element |
| `leadingImage` | `string` | `undefined` | Leading image URL |
| `showChevron` | `boolean` | `false` | Show trailing chevron |
| `showDivider` | `boolean` | `true` | Show bottom divider |
| `onClick` | `() => void` | `undefined` | Click handler (makes item interactive) |
| `disabled` | `boolean` | `false` | Disabled state |
| `selected` | `boolean` | `false` | Selected state |
| `className` | `string` | `""` | Additional CSS classes |
| `as` | `'div' \| 'button' \| 'a' \| 'li'` | `'div'` | Semantic HTML element |
| `href` | `string` | `undefined` | URL for anchor elements |
| `type` | `'button' \| 'submit' \| 'reset'` | `undefined` | Button type |

## Notes

- `leadingIcon` and `leadingImage` are mutually exclusive - only one should be provided
- Height adjusts automatically based on content presence (no size prop)
- Interactive items support keyboard navigation (Enter/Space keys)
- Uses semantic tokens from Muka design system

## Accessibility

- Keyboard navigation support
- Proper ARIA attributes
- Focus-visible styles
- Screen reader friendly
- Sufficient color contrast
