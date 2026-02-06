import type { Preview } from '@storybook/react';
import { withTheme } from './ThemeDecorator';

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
    layout_mode: {
      description: 'Responsive layout mode',
      toolbar: {
        title: 'Layout',
        icon: 'mobile',
        items: [
          { value: 'responsive', title: 'Responsive (auto)' },
          { value: 'mobile', title: 'Mobile' },
          { value: 'tablet', title: 'Tablet' },
          { value: 'desktop', title: 'Desktop' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    brand: 'muka',
    mode: 'light',
    layout_mode: 'responsive',
  },
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: {
        brandTitle: 'Muka Design System',
        base: 'light',
      },
    },
    layout: 'centered',
  },
};

export default preview;
