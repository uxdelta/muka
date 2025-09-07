#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Enable GitHub Actions automation
 * This script renames the disabled workflow files back to active
 */

console.log('🚀 Enabling GitHub Actions automation...\n');

const workflowsDir = '.github/workflows';
const workflows = [
  'build-tokens.yml',
  'deploy-storybook.yml'
];

// Check if workflows directory exists
if (!fs.existsSync(workflowsDir)) {
  console.log('❌ No .github/workflows directory found.');
  process.exit(1);
}

// Enable each workflow
workflows.forEach(workflow => {
  const workflowPath = path.join(workflowsDir, workflow);
  const disabledPath = path.join(workflowsDir, `${workflow}.disabled`);
  
  if (fs.existsSync(disabledPath)) {
    try {
      fs.renameSync(disabledPath, workflowPath);
      console.log(`✅ Enabled: ${workflow}`);
    } catch (error) {
      console.log(`❌ Failed to enable ${workflow}: ${error.message}`);
    }
  } else if (fs.existsSync(workflowPath)) {
    console.log(`ℹ️  ${workflow} is already enabled`);
  } else {
    console.log(`❌ ${workflow} not found`);
  }
});

console.log('\n🎉 GitHub Actions automation has been enabled!');
console.log('\nTo disable later:');
console.log('1. Rename .yml files to .yml.disabled');
console.log('2. Or run: npm run disable:automation');
console.log('\nNote: You will now receive automation emails when workflows run.');
