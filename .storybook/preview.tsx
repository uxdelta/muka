import type { Preview } from '@storybook/react-vite';
import React, { useEffect } from 'react';
import '../styles/base.css';
import '../styles/tokens.css';
// Import all theme combinations
import '../styles/tokens-muka-light.css';
import '../styles/tokens-muka-dark.css';
import '../styles/tokens-whitelabel-light.css';
import '../styles/tokens-whitelabel-dark.css';

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
    backgrounds: {
      disable: true, // We'll handle backgrounds via themes
    },
    layout: 'centered',
  },
  
  globalTypes: {
    brand: {
      description: 'Brand variant',
      defaultValue: 'muka',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: 'muka', title: '🎨 Muka Brand', left: '🎨' },
          { value: 'whitelabel', title: '⚪ WhiteLabel', left: '⚪' },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Color theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'contrast',
        items: [
          { value: 'light', title: '☀️ Light', left: '☀️' },
          { value: 'dark', title: '🌙 Dark', left: '🌙' },
        ],
        dynamicTitle: true,
      },
    },
  },
  
  decorators: [
    (Story, context) => {
      const brand = context.globals.brand || 'muka';
      const theme = context.globals.theme || 'light';
      
      // Apply theme to document body for global background
      useEffect(() => {
        document.body.setAttribute('data-brand', brand);
        document.body.setAttribute('data-theme', theme);
        
        // Set appropriate background color based on theme
        const backgrounds = {
          'muka-light': '#fcfcfd',
          'muka-dark': '#0d1117',
          'whitelabel-light': '#ffffff',
          'whitelabel-dark': '#111111',
        };
        
        document.body.style.backgroundColor = backgrounds[`${brand}-${theme}`] || '#ffffff';
        document.body.style.color = theme === 'dark' ? '#ffffff' : '#000000';
        document.body.style.transition = 'all 0.2s ease';
        
        return () => {
          document.body.removeAttribute('data-brand');
          document.body.removeAttribute('data-theme');
          document.body.style.backgroundColor = '';
          document.body.style.color = '';
          document.body.style.transition = '';
        };
      }, [brand, theme]);
      
      return (
        <div 
          data-brand={brand} 
          data-theme={theme}
          style={{ 
            padding: '1rem',
            minHeight: '100vh',
            transition: 'all 0.2s ease'
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;