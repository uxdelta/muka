import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-onboarding",
    "@storybook/addon-docs",
    "@storybook/addon-designs",
    "@storybook/addon-a11y"
    // Note: @storybook/addon-vitest not loaded in Storybook UI
    // Story tests run via CLI: npm run test:stories
    // Play functions still work in Storybook - just no test panel
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  "staticDirs": [
    { from: "../styles", to: "/styles" },
    "../public"
  ],
  "core": {
    "disableTelemetry": true
  },
  "typescript": {
    "check": false,
    "reactDocgen": false
  }
};

export default config;