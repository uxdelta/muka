import * as React from 'react';

// Browser-specific setup
if (typeof window !== 'undefined') {
  // Disable animations for visual tests
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
