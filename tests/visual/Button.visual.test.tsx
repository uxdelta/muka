import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Button } from '../../components/Button';

// Mock icon components
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 3.5a.5.5 0 0 0-1 0V7H3.5a.5.5 0 0 0 0 1H7v3.5a.5.5 0 0 0 1 0V8h3.5a.5.5 0 0 0 0-1H8V3.5z"/>
  </svg>
);

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="m6 8 4-4v8l-4-4z"/>
  </svg>
);

describe('Button Visual Regression Tests', () => {
  // Helper to render in a container for consistent screenshots
  const renderInContainer = (component: React.ReactElement) => {
    const { container } = render(
      <div data-testid="spec" style={{ width: '343px', background: 'white', padding: '1rem' }}>
        {component}
      </div>
    );
    return container;
  };

  describe('Variants', () => {
    it('should match primary button', async ({ page }) => {
      renderInContainer(<Button variant="primary">Primary Button</Button>);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
    });

    it('should match secondary button', async ({ page }) => {
      renderInContainer(<Button variant="secondary">Secondary Button</Button>);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
    });

    it('should match ghost button', async ({ page }) => {
      renderInContainer(<Button variant="ghost">Ghost Button</Button>);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
    });
  });

  describe('Sizes', () => {
    it('should match small button', async ({ page }) => {
      renderInContainer(<Button size="sm">Small Button</Button>);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
    });

    it('should match medium button', async ({ page }) => {
      renderInContainer(<Button size="md">Medium Button</Button>);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
    });

    it('should match large button', async ({ page }) => {
      renderInContainer(<Button size="lg">Large Button</Button>);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
    });
  });

  describe('States', () => {
    it('should match disabled state', async ({ page }) => {
      renderInContainer(<Button disabled={true}>Disabled Button</Button>);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
    });

    it('should match hover state', async ({ page }) => {
      renderInContainer(<Button>Hover Button</Button>);

      const button = page.locator('.muka-button');
      await button.hover();

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
    });

    it('should match pressed state', async ({ page }) => {
      renderInContainer(<Button>Pressed Button</Button>);

      const button = page.locator('.muka-button');
      await button.click({ force: true });
      // Hold the click to simulate pressed state
      await page.waitForTimeout(100);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
    });

    it('should match full width button', async ({ page }) => {
      renderInContainer(
        <div style={{ width: '343px' }}>
          <Button fullWidth={true}>Full Width Button</Button>
        </div>
      );

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
    });
  });

  describe('Icons', () => {
    it('should match button with left icon', async ({ page }) => {
      renderInContainer(<Button iconLeft={<PlusIcon />}>Add Item</Button>);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
    });

    it('should match button with right icon', async ({ page }) => {
      renderInContainer(<Button iconRight={<ChevronIcon />}>Continue</Button>);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
    });

    it('should match button with both icons', async ({ page }) => {
      renderInContainer(
        <Button iconLeft={<PlusIcon />} iconRight={<ChevronIcon />}>
          Add & Continue
        </Button>
      );

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
    });

    it('should match icon-only button', async ({ page }) => {
      renderInContainer(
        <Button iconLeft={<PlusIcon />} iconOnly={true}>
          Add Item
        </Button>
      );

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
    });
  });

  describe('All Variants Showcase', () => {
    it('should match all variants and sizes', async ({ page }) => {
      renderInContainer(
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary" size="sm">Primary SM</Button>
          <Button variant="primary" size="md">Primary MD</Button>
          <Button variant="primary" size="lg">Primary LG</Button>
          <Button variant="secondary" size="sm">Secondary SM</Button>
          <Button variant="secondary" size="md">Secondary MD</Button>
          <Button variant="secondary" size="lg">Secondary LG</Button>
          <Button variant="ghost" size="sm">Ghost SM</Button>
          <Button variant="ghost" size="md">Ghost MD</Button>
          <Button variant="ghost" size="lg">Ghost LG</Button>
        </div>
      );

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
    });

    it('should match states comparison', async ({ page }) => {
      renderInContainer(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Button variant="primary">Default</Button>
          <Button variant="primary" disabled={true}>Disabled</Button>
          <Button variant="primary" fullWidth={true}>Full Width</Button>
        </div>
      );

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
    });
  });
});

