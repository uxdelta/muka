/**
 * Detect conflicting dependencies that may interfere with Muka UI usage
 */

const path = require('path');
const { fileExists, readPackageJson } = require('./fs-utils');

// Dependencies that conflict with Muka UI's styling approach
const CONFLICTING_DEPS = {
  // CSS-in-JS libraries
  'styled-components': {
    type: 'warning',
    message: 'styled-components detected. Avoid using it for UI components — use Muka UI instead.'
  },
  '@emotion/react': {
    type: 'warning',
    message: '@emotion/react detected. Avoid using it for UI components — use Muka UI instead.'
  },
  '@emotion/styled': {
    type: 'warning',
    message: '@emotion/styled detected. Avoid using it for UI components — use Muka UI instead.'
  },

  // Tailwind CSS
  'tailwindcss': {
    type: 'warning',
    message: 'Tailwind CSS detected. Avoid using Tailwind utilities for UI components — use Muka UI components instead.'
  },

  // Other UI libraries (potential conflicts)
  '@chakra-ui/react': {
    type: 'warning',
    message: '@chakra-ui/react detected. Using multiple component libraries may cause styling conflicts.'
  },
  '@mui/material': {
    type: 'warning',
    message: '@mui/material detected. Using multiple component libraries may cause styling conflicts.'
  },
  'antd': {
    type: 'warning',
    message: 'Ant Design detected. Using multiple component libraries may cause styling conflicts.'
  }
};

/**
 * Check for conflicting dependencies in a project
 * @param {string} projectDir - Path to the project directory
 * @returns {Array<{name: string, type: string, message: string}>}
 */
function detectConflicts(projectDir) {
  const conflicts = [];
  const packageJson = readPackageJson(projectDir);

  if (!packageJson) {
    return conflicts;
  }

  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  };

  for (const [depName, config] of Object.entries(CONFLICTING_DEPS)) {
    if (allDeps[depName]) {
      conflicts.push({
        name: depName,
        version: allDeps[depName],
        ...config
      });
    }
  }

  // Check for Tailwind config file
  const tailwindConfigFiles = [
    'tailwind.config.js',
    'tailwind.config.ts',
    'tailwind.config.cjs',
    'tailwind.config.mjs'
  ];

  for (const configFile of tailwindConfigFiles) {
    if (fileExists(path.join(projectDir, configFile))) {
      // Only add if tailwindcss wasn't already detected
      if (!conflicts.find(c => c.name === 'tailwindcss')) {
        conflicts.push({
          name: 'tailwind.config',
          type: 'warning',
          message: `Tailwind config (${configFile}) detected. Avoid using Tailwind utilities for UI components.`
        });
      }
      break;
    }
  }

  return conflicts;
}

/**
 * Print conflicts to console with appropriate formatting
 * @param {Array} conflicts - Array of conflict objects
 */
function printConflicts(conflicts) {
  if (conflicts.length === 0) {
    console.log('✓ No conflicting dependencies detected\n');
    return;
  }

  console.log('\n⚠️  Potential conflicts detected:\n');

  for (const conflict of conflicts) {
    const icon = conflict.type === 'error' ? '✗' : '⚠';
    const versionStr = conflict.version ? ` (${conflict.version})` : '';
    console.log(`  ${icon} ${conflict.name}${versionStr}`);
    console.log(`    ${conflict.message}\n`);
  }

  console.log('  These are warnings, not blockers. Your project may have legitimate');
  console.log('  uses for these dependencies, but they should not be used for UI');
  console.log('  components that Muka UI provides.\n');
}

module.exports = {
  detectConflicts,
  printConflicts,
  CONFLICTING_DEPS
};
