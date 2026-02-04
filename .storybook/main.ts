import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials"
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