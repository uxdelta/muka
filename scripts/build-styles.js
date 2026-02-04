#!/usr/bin/env node

/**
 * Build Styles Script
 *
 * Bundles all CSS files (tokens + components) into dist/styles for package distribution.
 * Also copies CSS files next to compiled JS for bundler compatibility.
 * Creates an index.css that imports everything in the correct order.
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const DIST_STYLES_DIR = path.join(DIST_DIR, 'styles');
const STYLES_DIR = path.join(ROOT_DIR, 'styles');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');

async function buildStyles() {
  console.log('Building styles...');

  // Ensure dist/styles directory exists
  if (!fs.existsSync(DIST_STYLES_DIR)) {
    fs.mkdirSync(DIST_STYLES_DIR, { recursive: true });
  }

  // Copy token CSS files from styles/
  const tokenFiles = await glob('*.css', { cwd: STYLES_DIR });
  for (const file of tokenFiles) {
    const src = path.join(STYLES_DIR, file);
    const dest = path.join(DIST_STYLES_DIR, file);
    fs.copyFileSync(src, dest);
    console.log(`  Copied: styles/${file}`);
  }

  // Create components subdirectory in dist/styles
  const componentsStylesDir = path.join(DIST_STYLES_DIR, 'components');
  if (!fs.existsSync(componentsStylesDir)) {
    fs.mkdirSync(componentsStylesDir, { recursive: true });
  }

  // Copy component CSS files to dist/styles/components
  const componentCssFiles = await glob('*/*.css', { cwd: COMPONENTS_DIR });
  const componentNames = [];

  for (const file of componentCssFiles) {
    const src = path.join(COMPONENTS_DIR, file);
    const componentName = path.dirname(file);
    const cssFileName = path.basename(file);

    // Copy to dist/styles/components/
    const dest = path.join(componentsStylesDir, `${componentName}.css`);
    fs.copyFileSync(src, dest);
    componentNames.push(componentName);
    console.log(`  Copied: components/${file} -> dist/styles/components/${componentName}.css`);

    // Also copy CSS files next to compiled JS for bundler compatibility
    // This ensures `import './Button.css'` in compiled JS works
    const esmComponentDir = path.join(DIST_DIR, 'esm', 'components', componentName);
    const cjsComponentDir = path.join(DIST_DIR, 'cjs', 'components', componentName);

    if (fs.existsSync(esmComponentDir)) {
      fs.copyFileSync(src, path.join(esmComponentDir, cssFileName));
      console.log(`  Copied: components/${file} -> dist/esm/components/${componentName}/${cssFileName}`);
    }

    if (fs.existsSync(cjsComponentDir)) {
      fs.copyFileSync(src, path.join(cjsComponentDir, cssFileName));
      console.log(`  Copied: components/${file} -> dist/cjs/components/${componentName}/${cssFileName}`);
    }
  }

  // Create main index.css that imports everything
  const indexCss = `/* Muka UI - All Styles */
/* This file imports all tokens and component styles */

/* Base styles and fallbacks */
@import './base.css';

/* Default theme: muka-light */
/* To use a different theme, import the specific token file instead */
@import './tokens-muka-light.css';

/* Component styles */
${componentNames.map(name => `@import './components/${name}.css';`).join('\n')}
`;

  fs.writeFileSync(path.join(DIST_STYLES_DIR, 'index.css'), indexCss);
  console.log('  Created: dist/styles/index.css');

  // Create theme-specific entry points
  const themes = ['muka-light', 'muka-dark', 'wireframe-light', 'wireframe-dark'];
  for (const theme of themes) {
    const themeCss = `/* Muka UI - ${theme} theme */

/* Base styles and fallbacks */
@import './base.css';

/* Theme tokens */
@import './tokens-${theme}.css';

/* Component styles */
${componentNames.map(name => `@import './components/${name}.css';`).join('\n')}
`;
    fs.writeFileSync(path.join(DIST_STYLES_DIR, `${theme}.css`), themeCss);
    console.log(`  Created: dist/styles/${theme}.css`);
  }

  console.log('Styles build complete!');
}

buildStyles().catch(err => {
  console.error('Error building styles:', err);
  process.exit(1);
});
