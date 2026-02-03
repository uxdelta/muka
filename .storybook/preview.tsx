import type { Preview } from '@storybook/react-vite';
import React, { useEffect } from 'react';
import '../styles/base.css';
import '../styles/tokens-muka-light.css'; // Default theme loaded immediately
import manifest from '../build/manifest.json';

// Load Google Fonts for brand fonts
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Funnel+Display:wght@400;500;600;700&family=Funnel+Sans:wght@400;500;600;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);
// Extract theme configurations from manifest
const availableThemes = Object.keys(manifest.themes);

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
    theme: {
      description: 'Complete theme variant',
      defaultValue: availableThemes[0],
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: availableThemes.map(theme => {
          const [brand, mode] = theme.split('-');
          const icon = brand === 'muka' ? '🎨' : '📐';
          const modeIcon = mode === 'light' ? '☀️' : '🌙';
          return {
            value: theme,
            title: `${icon} ${brand} ${modeIcon} ${mode}`,
            left: icon,
          };
        }),
        dynamicTitle: true,
      },
    },
  },
  
  decorators: [
    (Story, context) => {
      const selectedTheme = context.globals.theme || availableThemes[0];
      const [brand, mode] = selectedTheme.split('-');
      
      // Apply theme to document body for global background
      useEffect(() => {
        document.body.setAttribute('data-brand', brand);
        document.body.setAttribute('data-theme', mode);
        
        // Dynamically load the correct CSS file
        const cssId = 'dynamic-tokens';
        
        // Remove existing dynamic CSS
        const existingLink = document.getElementById(cssId);
        if (existingLink) {
          existingLink.remove();
        }
        
        // Add new CSS link
        const link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.href = `/styles/tokens-${selectedTheme}.css`;
        document.head.appendChild(link);
        
        // Set appropriate background color based on theme
        const backgrounds = {
          'muka-light': '#fcfcfd',
          'muka-dark': '#0d1117',
          'wireframe-light': '#ffffff',
          'wireframe-dark': '#111111',
        };
        
        document.body.style.backgroundColor = backgrounds[selectedTheme] || '#ffffff';
        document.body.style.color = mode === 'dark' ? '#ffffff' : '#000000';
        document.body.style.transition = 'all 0.2s ease';
        
        return () => {
          document.body.removeAttribute('data-brand');
          document.body.removeAttribute('data-theme');
          document.body.style.backgroundColor = '';
          document.body.style.color = '';
          document.body.style.transition = '';
          
          // Clean up dynamic CSS
          const linkToRemove = document.getElementById(cssId);
          if (linkToRemove) {
            linkToRemove.remove();
          }
        };
      }, [selectedTheme, brand, mode]);
      
      return (
        <div 
          data-brand={brand} 
          data-theme={mode}
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