import '@testing-library/jest-dom';
import * as React from 'react';

// Polyfill ResizeObserver for Radix UI components (used by Tooltip, etc.)
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
