import { describe, it, expect } from 'vitest';
import { page } from 'vitest/browser';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ListItem } from '../../components/ListItem';
import '../../components/ListItem/ListItem.css';

// Mock icon components
const FolderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 4h6l2 2h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM10 13c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"/>
  </svg>
);

describe('ListItem Visual Regression Tests', () => {
  // Helper to render in a container for consistent screenshots
  // This renders directly to the browser's DOM so Playwright can access it
  const renderInContainer = async (component: React.ReactElement) => {
    // Create container in the page's DOM
    const container = document.createElement('div');
    container.setAttribute('data-testid', 'spec');
    container.style.width = '343px';
    container.style.background = 'white';
    document.body.appendChild(container);

    // Render React component to the browser DOM
    const root = createRoot(container);
    root.render(component);

    // Wait for React to finish rendering
    await new Promise(resolve => setTimeout(resolve, 0));

    return container;
  };

  describe('Basic Compositions', () => {
    it('should match default visual appearance', async () => {
      await renderInContainer(
        <ListItem
          label="Label"
          caption="Caption"
          leadingIcon={<FolderIcon />}
          showChevron={true}
        />
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match label only composition', async () => {
      await renderInContainer(
        <ListItem label="Label only" />
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match with leading icon', async () => {
      await renderInContainer(
        <ListItem
          label="Item with icon"
          caption="Leading icon example"
          leadingIcon={<FolderIcon />}
          showChevron={true}
        />
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match with leading image', async () => {
      await renderInContainer(
        <ListItem
          label="Item with image"
          caption="Leading image example"
          leadingImage="https://via.placeholder.com/48x48/6366f1/ffffff?text=IMG"
          showChevron={true}
        />
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match with caption', async () => {
      await renderInContainer(
        <ListItem
          label="Item with caption"
          caption="This is a caption providing additional context"
          leadingIcon={<FolderIcon />}
          showChevron={true}
        />
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match without divider', async () => {
      await renderInContainer(
        <ListItem
          label="Item without divider"
          caption="Divider is hidden"
          leadingIcon={<FolderIcon />}
          showChevron={true}
          showDivider={false}
        />
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });
  });

  describe('States', () => {
    it('should match default state', async () => {
      await renderInContainer(
        <ListItem
          label="Default state"
          caption="Normal appearance"
          leadingIcon={<FolderIcon />}
          showChevron={true}
        />
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match hover state', async () => {
      await renderInContainer(
        <ListItem
          label="Hover state"
          caption="Move mouse over"
          leadingIcon={<FolderIcon />}
          showChevron={true}
        />
      );

      const listItem = page.locator('.muka-listitem');
      await listItem.hover();

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match selected state', async () => {
      await renderInContainer(
        <ListItem
          label="Selected state"
          caption="Currently selected"
          leadingIcon={<FolderIcon />}
          showChevron={true}
          selected={true}
        />
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match disabled state', async () => {
      await renderInContainer(
        <ListItem
          label="Disabled state"
          caption="Not interactive"
          leadingIcon={<FolderIcon />}
          showChevron={true}
          disabled={true}
        />
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });
  });

  describe('List Groups', () => {
    it('should match list group with multiple items', async () => {
      await renderInContainer(
        <div>
          <ListItem
            label="Documents"
            caption="Folder"
            leadingIcon={<FolderIcon />}
            showChevron={true}
          />
          <ListItem
            label="Pictures"
            caption="Folder"
            leadingIcon={<FolderIcon />}
            showChevron={true}
          />
          <ListItem
            label="Videos"
            caption="Folder"
            leadingIcon={<FolderIcon />}
            showChevron={true}
          />
          <ListItem
            label="Downloads"
            caption="Folder"
            leadingIcon={<FolderIcon />}
            showChevron={true}
            showDivider={false}
          />
        </div>
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match user list', async () => {
      await renderInContainer(
        <div>
          <ListItem
            label="John Doe"
            caption="john.doe@example.com"
            leadingIcon={<UserIcon />}
            showChevron={true}
          />
          <ListItem
            label="Jane Smith"
            caption="jane.smith@example.com"
            leadingIcon={<UserIcon />}
            showChevron={true}
          />
          <ListItem
            label="Bob Johnson"
            caption="bob.johnson@example.com"
            leadingIcon={<UserIcon />}
            showChevron={true}
            showDivider={false}
          />
        </div>
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });
  });

  describe('Different Compositions', () => {
    it('should match full composition', async () => {
      await renderInContainer(
        <ListItem
          label="Full composition"
          caption="Icon + Label + Caption + Chevron"
          leadingIcon={<FolderIcon />}
          showChevron={true}
        />
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match minimal composition', async () => {
      await renderInContainer(
        <ListItem label="Minimal composition" />
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match icon and label only', async () => {
      await renderInContainer(
        <ListItem
          label="Icon and label"
          leadingIcon={<FolderIcon />}
        />
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });

    it('should match label and chevron only', async () => {
      await renderInContainer(
        <ListItem
          label="Label and chevron"
          showChevron={true}
        />
      );

      await expect.element(page.getByTestId('spec')).toMatchScreenshot();
      
      // Cleanup
      document.body.innerHTML = '';
    });
  });
});
