# Card Component - Usage Patterns

## Overview

The Card component is a versatile container for grouping related content. It supports multiple variants (default, interactive, selected), customizable padding and border radius, and full keyboard accessibility for interactive cards.

## Token Usage

### Component Tokens (T4)

Always use component-specific tokens from the `card.*` namespace:

```css
.muka-card {
  background-color: var(--card-color-default-background);
  border: 1px solid var(--card-color-default-border);
  box-shadow: var(--card-shadow-default);
}

.muka-card--padding-md {
  padding: var(--card-padding-md);
}

.muka-card--radius-md {
  border-radius: var(--card-radius-md);
}
```

### States

```css
/* Default */
--card-color-default-background
--card-color-default-border
--card-shadow-default

/* Interactive (hover) */
--card-color-interactive-background-hover
--card-color-interactive-border-hover
--card-shadow-interactive-hover

/* Interactive (pressed) */
--card-color-interactive-background-pressed
--card-color-interactive-border-pressed
--card-shadow-interactive-pressed

/* Selected */
--card-color-selected-background
--card-color-selected-border
--card-shadow-selected
```

## Composition Examples

### Basic Card

```tsx
import { Card } from '@muka/ui';

<Card>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</Card>
```

### Interactive Card (Clickable)

```tsx
<Card 
  variant="interactive"
  onClick={() => navigate('/details')}
  aria-label="View product details"
>
  <h3>Product Name</h3>
  <p>$99.99</p>
</Card>
```

### Selected Card

```tsx
<Card 
  variant="selected"
  onClick={() => setSelected(!selected)}
>
  <h3>Option A</h3>
  <p>This option is currently selected</p>
</Card>
```

### Padding Variants

```tsx
// No padding (useful for full-bleed content)
<Card padding="none">
  <img src="cover.jpg" alt="Cover" style={{ width: '100%' }} />
  <div style={{ padding: '16px' }}>
    <h3>Title</h3>
  </div>
</Card>

// Small padding
<Card padding="sm">
  <p>Small padding content</p>
</Card>

// Medium padding (default)
<Card padding="md">
  <p>Medium padding content</p>
</Card>

// Large padding
<Card padding="lg">
  <p>Large padding content</p>
</Card>
```

### Border Radius Variants

```tsx
// Small radius
<Card radius="sm">Sharp corners</Card>

// Medium radius (default)
<Card radius="md">Standard corners</Card>

// Large radius
<Card radius="lg">Rounded corners</Card>
```

### Semantic HTML Elements

```tsx
// Article card
<Card as="article">
  <h2>Blog Post Title</h2>
  <p>Post excerpt...</p>
</Card>

// Section card
<Card as="section">
  <h2>Features</h2>
  <ul>...</ul>
</Card>

// Aside card
<Card as="aside">
  <h3>Related Content</h3>
</Card>
```

### Disabled Interactive Card

```tsx
<Card 
  variant="interactive"
  disabled
  onClick={handleClick}
>
  <h3>Unavailable Option</h3>
  <p>This option is not available at the moment</p>
</Card>
```

## Do's and Don'ts

### ✅ DO

**Use cards to group related content**
```tsx
<Card>
  <h3>User Profile</h3>
  <p>Name: John Doe</p>
  <p>Email: john@example.com</p>
  <Button>Edit Profile</Button>
</Card>
```

**Use interactive variant for clickable cards**
```tsx
<Card 
  variant="interactive"
  onClick={() => navigate('/product/123')}
  aria-label="View product details"
>
  <img src={product.image} alt={product.name} />
  <h3>{product.name}</h3>
  <p>${product.price}</p>
</Card>
```

**Use semantic HTML elements appropriately**
```tsx
<Card as="article">
  <h2>Article Title</h2>
  <time dateTime="2026-02-25">February 25, 2026</time>
  <p>Article content...</p>
</Card>
```

**Provide aria-label for interactive cards**
```tsx
<Card 
  variant="interactive"
  onClick={handleSelect}
  aria-label={`Select ${option.name} plan`}
>
  <h3>{option.name}</h3>
  <p>{option.description}</p>
</Card>
```

**Use selected state for selectable options**
```tsx
{options.map(option => (
  <Card 
    key={option.id}
    variant={selectedId === option.id ? 'selected' : 'interactive'}
    onClick={() => setSelectedId(option.id)}
    aria-label={`Select ${option.name}`}
    aria-pressed={selectedId === option.id}
  >
    <h3>{option.name}</h3>
    <p>{option.description}</p>
  </Card>
))}
```

### ❌ DON'T

**Don't nest cards deeply**
```tsx
{/* ❌ WRONG: Too many nested cards */}
<Card>
  <Card>
    <Card>
      Content
    </Card>
  </Card>
</Card>

{/* ✅ CORRECT: Flat structure with sections */}
<Card>
  <div className="card-section">
    <h3>Section 1</h3>
    <p>Content</p>
  </div>
  <div className="card-section">
    <h3>Section 2</h3>
    <p>Content</p>
  </div>
</Card>
```

**Don't use card for every content block**
```tsx
{/* ❌ WRONG: Overuse of cards */}
<Card><p>Line 1</p></Card>
<Card><p>Line 2</p></Card>
<Card><p>Line 3</p></Card>

{/* ✅ CORRECT: Cards for meaningful groupings */}
<Card>
  <h3>Related Items</h3>
  <p>Line 1</p>
  <p>Line 2</p>
  <p>Line 3</p>
</Card>
```

**Don't use onClick without interactive variant**
```tsx
{/* ❌ WRONG: onClick on default variant */}
<Card onClick={handleClick}>
  Content
</Card>

{/* ✅ CORRECT: Use interactive variant */}
<Card variant="interactive" onClick={handleClick}>
  Content
</Card>
```

**Don't override component tokens**
```css
/* ❌ WRONG: Using primitive tokens */
.custom-card {
  background: var(--color-white);
  border: 1px solid var(--color-gray-3);
}

/* ✅ CORRECT: Using component tokens */
.custom-card.muka-card {
  background-color: var(--card-color-default-background);
  border-color: var(--card-color-default-border);
}
```

**Don't make entire card clickable with nested buttons**
```tsx
{/* ❌ WRONG: Nested interactive elements */}
<Card variant="interactive" onClick={handleCardClick}>
  <h3>Product</h3>
  <Button onClick={handleButtonClick}>Buy Now</Button>
</Card>

{/* ✅ CORRECT: Separate clickable areas */}
<Card>
  <h3 
    onClick={handleCardClick}
    style={{ cursor: 'pointer' }}
  >
    Product Name
  </h3>
  <p>Description</p>
  <Button onClick={handleButtonClick}>Buy Now</Button>
</Card>
```

## Accessibility

### Interactive Cards
- Automatically receive `role="button"`
- Support keyboard interaction (Enter and Space)
- Have visible focus indicator
- Support `aria-pressed` for selected state
- Support `aria-disabled` for disabled state
- Use `tabIndex={0}` for focusable, `-1` for disabled

### Best Practices

**Provide accessible labels**
```tsx
<Card 
  variant="interactive"
  onClick={handleClick}
  aria-label={`View details for ${product.name}`}
>
  <img src={product.image} alt="" />
  <h3>{product.name}</h3>
</Card>
```

**Use aria-labelledby for complex content**
```tsx
<Card 
  variant="interactive"
  onClick={handleClick}
  aria-labelledby="card-title-123"
  aria-describedby="card-desc-123"
>
  <h3 id="card-title-123">Product Name</h3>
  <p id="card-desc-123">Product description</p>
</Card>
```

## Common Patterns

### Product Card
```tsx
<Card 
  variant="interactive"
  onClick={() => navigate(`/products/${product.id}`)}
  aria-label={`View ${product.name} details`}
>
  <img 
    src={product.image} 
    alt={product.name}
    style={{ width: '100%', borderRadius: '8px' }}
  />
  <h3>{product.name}</h3>
  <p>{product.description}</p>
  <p className="price">${product.price}</p>
  <Badge variant="success">{product.stock} in stock</Badge>
</Card>
```

### Feature Card
```tsx
<Card padding="lg">
  <Icon name="zap" variant="fill" size="lg" />
  <h3>Fast Performance</h3>
  <p>Lightning-fast load times and smooth interactions</p>
</Card>
```

### Stat Card
```tsx
<Card>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div>
      <h4>Total Sales</h4>
      <p style={{ fontSize: '32px', fontWeight: 'bold' }}>$12,345</p>
    </div>
    <Icon name="trending-up" variant="line" size="lg" />
  </div>
  <p style={{ color: 'green' }}>+12% from last month</p>
</Card>
```

### Selectable Card (Single Choice)
```tsx
const [selected, setSelected] = useState<string>('basic');

{plans.map(plan => (
  <Card 
    key={plan.id}
    variant={selected === plan.id ? 'selected' : 'interactive'}
    onClick={() => setSelected(plan.id)}
    aria-pressed={selected === plan.id}
  >
    <h3>{plan.name}</h3>
    <p className="price">${plan.price}/month</p>
    <ul>
      {plan.features.map(feature => (
        <li key={feature}>{feature}</li>
      ))}
    </ul>
  </Card>
))}
```

### Image Card with Overlay
```tsx
<Card padding="none">
  <div style={{ position: 'relative' }}>
    <img 
      src={image.url} 
      alt={image.alt}
      style={{ width: '100%', display: 'block' }}
    />
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '16px',
      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
      color: 'white'
    }}>
      <h3>{image.title}</h3>
      <p>{image.description}</p>
    </div>
  </div>
</Card>
```

### Grid of Cards
```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '16px'
}}>
  {items.map(item => (
    <Card 
      key={item.id}
      variant="interactive"
      onClick={() => handleItemClick(item.id)}
    >
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </Card>
  ))}
</div>
```
