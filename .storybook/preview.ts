import type { Preview } from '@storybook/react';
import '../styles/base.css';
import '../styles/tokens-muka-light.css';

const preview: Preview = {
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
