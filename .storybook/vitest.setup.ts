import '@testing-library/jest-dom';
import { setProjectAnnotations } from '@storybook/react';
import * as preview from './preview';

// Apply Storybook preview configuration to tests
setProjectAnnotations(preview);

// Disable animations for consistent test snapshots
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }
  `;
  document.head.appendChild(style);
}
