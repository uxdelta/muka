import type { Preview } from '@storybook/react';
import '../styles/base.css';
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
  },
  initialGlobals: {
    theme: 'muka-light',
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
