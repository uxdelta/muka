import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  plugins: [react()],
  test: {
    name: 'browser',
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        { browser: 'chromium' },
      ],
    },
    globals: true,
    setupFiles: './vitest.browser.setup.ts',
    css: true,
    include: ['**/*.browser.spec.ts', '**/*.visual.test.tsx'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/storybook-static/**',
    ],
  },
});
