import { defineConfig, mergeConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { storybookViteConfig } from '@storybook/react-vite';
import { playwright } from '@vitest/browser-playwright';

export default mergeConfig(
  storybookViteConfig,
  defineConfig({
    plugins: [
      storybookTest({
        // Path to Storybook config
        configDir: '.storybook',
        // Tags to include/exclude
        tags: {
          include: ['test'],
          exclude: ['no-test'],
          skip: ['skip-test'],
        },
      }),
    ],
    test: {
      name: 'storybook',
      browser: {
        enabled: true,
        provider: playwright(),
        instances: [
          { browser: 'chromium', headless: true },
        ],
      },
      // Setup file for story tests
      setupFiles: ['./.storybook/vitest.setup.ts'],
      globals: true,
      // Story files are auto-detected by the plugin based on .storybook/main.ts
    },
  })
);
