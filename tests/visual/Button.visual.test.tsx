import { describe, it, expect } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '../../components/Button';
import '../../components/Button/Button.css';

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
  // This renders directly to the browser's DOM so Playwright can access it
  const renderInContainer = async (component: React.ReactElement) => {
    // Create container in the page's DOM
    const container = document.createElement('div');
    container.setAttribute('data-testid', 'spec');
    container.style.width = '343px';
    container.style.background = 'white';
    container.style.padding = '1rem';
    document.body.appendChild(container);

    // Render React component to the browser DOM
    const root = createRoot(container);
    root.render(component);

    // Wait for React to finish rendering
    await new Promise(resolve => setTimeout(resolve, 0));

    return container;
  };

  describe('Variants', () => {
    it('should match primary button', async ({ page }) => {
      await renderInContainer(<Button variant="primary">Primary Button</Button>);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match secondary button', async ({ page }) => {
      await renderInContainer(<Button variant="secondary">Secondary Button</Button>);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match ghost button', async ({ page }) => {
      await renderInContainer(<Button variant="ghost">Ghost Button</Button>);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });
  });

  describe('Sizes', () => {
    it('should match small button', async ({ page }) => {
      await renderInContainer(<Button size="sm">Small Button</Button>);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match medium button', async ({ page }) => {
      await renderInContainer(<Button size="md">Medium Button</Button>);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match large button', async ({ page }) => {
      await renderInContainer(<Button size="lg">Large Button</Button>);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });
  });

  describe('States', () => {
    it('should match disabled state', async ({ page }) => {
      await renderInContainer(<Button disabled={true}>Disabled Button</Button>);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match hover state', async ({ page }) => {
      await renderInContainer(<Button>Hover Button</Button>);

      const button = page.locator('.muka-button');
      await button.hover();

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match pressed state', async ({ page }) => {
      await renderInContainer(<Button>Pressed Button</Button>);

      const button = page.locator('.muka-button');
      await button.click({ force: true });
      // Hold the click to simulate pressed state
      await page.waitForTimeout(100);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match full width button', async ({ page }) => {
      await renderInContainer(
        <div style={{ width: '343px' }}>
          <Button fullWidth={true}>Full Width Button</Button>
        </div>
      );

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });
  });

  describe('Icons', () => {
    it('should match button with left icon', async ({ page }) => {
      await renderInContainer(<Button iconLeft={<PlusIcon />}>Add Item</Button>);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match button with right icon', async ({ page }) => {
      await renderInContainer(<Button iconRight={<ChevronIcon />}>Continue</Button>);

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match button with both icons', async ({ page }) => {
      await renderInContainer(
        <Button iconLeft={<PlusIcon />} iconRight={<ChevronIcon />}>
          Add & Continue
        </Button>
      );

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match icon-only button', async ({ page }) => {
      await renderInContainer(
        <Button iconLeft={<PlusIcon />} iconOnly={true}>
          Add Item
        </Button>
      );

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });
  });

  describe('All Variants Showcase', () => {
    it('should match all variants and sizes', async ({ page }) => {
      await renderInContainer(
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
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match states comparison', async ({ page }) => {
      await renderInContainer(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Button variant="primary">Default</Button>
          <Button variant="primary" disabled={true}>Disabled</Button>
          <Button variant="primary" fullWidth={true}>Full Width</Button>
        </div>
      );

      const spec = await page.locator('[data-testid="spec"]').screenshot();
      expect(spec).toMatchImageSnapshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });
  });
});

