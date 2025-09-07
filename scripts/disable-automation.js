#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Disable GitHub Actions automation
 * This script renames the workflow files to disable them
 */

console.log('🚫 Disabling GitHub Actions automation...\n');

const workflowsDir = '.github/workflows';
const workflows = [
  'build-tokens.yml',
  'deploy-storybook.yml'
];

// Check if workflows directory exists
if (!fs.existsSync(workflowsDir)) {
  console.log('❌ No .github/workflows directory found. Nothing to disable.');
  process.exit(0);
}

// Disable each workflow
workflows.forEach(workflow => {
  const workflowPath = path.join(workflowsDir, workflow);
  const disabledPath = path.join(workflowsDir, `${workflow}.disabled`);
  
  if (fs.existsSync(workflowPath)) {
    try {
      fs.renameSync(workflowPath, disabledPath);
      console.log(`✅ Disabled: ${workflow}`);
    } catch (error) {
      console.log(`❌ Failed to disable ${workflow}: ${error.message}`);
    }
  } else {
    console.log(`ℹ️  ${workflow} not found (already disabled?)`);
  }
});

console.log('\n🎉 GitHub Actions automation has been disabled!');
console.log('\nTo re-enable later:');
console.log('1. Rename .yml.disabled files back to .yml');
console.log('2. Or run: npm run enable:automation');
console.log('\nNote: You will no longer receive automation emails.');
