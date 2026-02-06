import type { Preview } from '@storybook/react';
import { withTheme } from './ThemeDecorator';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Design system theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['muka-light', 'muka-dark', 'wireframe-light', 'wireframe-dark'],
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
    theme: 'muka-light',
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
