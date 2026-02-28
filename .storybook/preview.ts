import type { Preview } from '@storybook/react';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { create } from 'storybook/theming';
import { withTheme } from './ThemeDecorator';

const docsTheme = create({
  base: 'light',
  brandTitle: 'Muka Design System',
});

// Custom viewports matching Muka token breakpoints
const customViewports = {
  mobile: {
    name: 'Mobile (640px)',
    styles: {
      width: '640px',
      height: '800px',
    },
    type: 'mobile',
  },
  tablet: {
    name: 'Tablet (768px)',
    styles: {
      width: '768px',
      height: '1024px',
    },
    type: 'tablet',
  },
  desktop: {
    name: 'Desktop (1024px)',
    styles: {
      width: '1024px',
      height: '768px',
    },
    type: 'desktop',
  },
  desktopWide: {
    name: 'Desktop Wide (1280px)',
    styles: {
      width: '1280px',
      height: '900px',
    },
    type: 'desktop',
  },
  responsive: {
    name: 'Responsive (100%)',
    styles: {
      width: '100%',
      height: '100%',
    },
    type: 'desktop',
  },
};

const preview: Preview = {
  globalTypes: {
    brand: {
      description: 'Design system brand',
      toolbar: {
        title: 'Brand',
        icon: 'circlehollow',
        items: [
          { value: 'muka', title: 'Muka' },
          { value: 'wireframe', title: 'Wireframe' },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: 'Color mode',
      toolbar: {
        title: 'Mode',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    brand: 'muka',
    mode: 'light',
    viewport: 'responsive',
  },
  decorators: [withTheme],
  parameters: {
    options: {
      storySort: {
        order: ['Documentation', 'Design Tokens', 'Components'],
      },
    },
    viewport: {
      viewports: {
        ...MINIMAL_VIEWPORTS,
        ...customViewports,
      },
      defaultViewport: 'responsive',
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RL5IFLUJk4yeAFNXlsX4b5/Muka-UI-Figma-Library?node-id=472-4248&t=EWdiRlfOlF96s9zJ-1',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: docsTheme,
    },
    layout: 'fullscreen',
  },
};

export default preview;
