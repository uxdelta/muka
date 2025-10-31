import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    name: 'browser',
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
    },
    globals: true,
    setupFiles: './vitest.browser.setup.ts',
    css: true,
    include: ['**/*.browser.spec.ts'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/storybook-static/**',
    ],
  },
});
