#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Setup automation for design token building
 * This script helps set up both GitHub Actions and pre-commit hooks
 */

console.log('🚀 Setting up design token automation...\n');

// Check if we're in a git repository
try {
  execSync('git rev-parse --git-dir', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ Not in a git repository. Please run this from your project root.');
  process.exit(1);
}

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found. Please run this from your project root.');
  process.exit(1);
}

// Check if husky is installed
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const hasHusky = packageJson.devDependencies?.husky || packageJson.dependencies?.husky;

if (!hasHusky) {
  console.log('📦 Installing Husky for pre-commit hooks...');
  try {
    execSync('npm install --save-dev husky', { stdio: 'inherit' });
    console.log('✅ Husky installed');
  } catch (error) {
    console.error('❌ Failed to install Husky:', error.message);
    console.log('💡 You can install it manually: npm install --save-dev husky');
  }
}

// Setup husky
if (hasHusky || fs.existsSync('node_modules/husky')) {
  console.log('🔧 Setting up Husky pre-commit hook...');
  try {
    execSync('npx husky init', { stdio: 'inherit' });
    console.log('✅ Husky initialized');
  } catch (error) {
    console.log('⚠️ Husky setup may have failed, but continuing...');
  }
}

// Check if GitHub Actions directory exists
const githubDir = '.github/workflows';
if (!fs.existsSync(githubDir)) {
  console.log('📁 Creating GitHub Actions directory...');
  fs.mkdirSync(githubDir, { recursive: true });
  console.log('✅ GitHub Actions directory created');
}

// Check if workflow files exist
const buildTokensWorkflow = path.join(githubDir, 'build-tokens.yml');
const deployStorybookWorkflow = path.join(githubDir, 'deploy-storybook.yml');

if (fs.existsSync(buildTokensWorkflow)) {
  console.log('✅ Build tokens workflow already exists');
} else {
  console.log('⚠️ Build tokens workflow not found. Please ensure .github/workflows/build-tokens.yml exists');
}

if (fs.existsSync(deployStorybookWorkflow)) {
  console.log('✅ Deploy Storybook workflow already exists');
} else {
  console.log('⚠️ Deploy Storybook workflow not found. Please ensure .github/workflows/deploy-storybook.yml exists');
}

console.log('\n🎉 Automation setup complete!\n');

console.log('📋 What happens now:');
console.log('1. 🔄 GitHub Actions will automatically rebuild tokens when you push changes to:');
console.log('   - tokens/ directory');
console.log('   - build/manifest.json');
console.log('   - scripts/build-tokens.js');
console.log('');
console.log('2. 🎨 Storybook will be automatically deployed when CSS files change');
console.log('');
console.log('3. 🪝 Pre-commit hooks will rebuild tokens locally before commits');
console.log('');

console.log('🧪 To test the automation:');
console.log('1. Make a small change to a token file');
console.log('2. Commit and push: git add . && git commit -m "test" && git push');
console.log('3. Check the Actions tab in GitHub to see the workflow running');
console.log('');

console.log('📚 For more information, see:');
console.log('- DEVELOPMENT.md - Development workflow');
console.log('- .github/workflows/ - GitHub Actions configuration');
console.log('- .husky/ - Pre-commit hooks');
