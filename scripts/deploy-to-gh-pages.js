#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

/**
 * Deploy Storybook to GitHub Pages
 * This script automates the deployment process
 */

console.log('🚀 Deploying Storybook to GitHub Pages...\n');

try {
  // Check if we're on main branch
  const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  if (currentBranch !== 'main') {
    console.log('⚠️  Not on main branch. Switching to main...');
    execSync('git checkout main', { stdio: 'inherit' });
  }
  
  // Build tokens and Storybook
  console.log('📦 Building design tokens...');
  execSync('npm run build:tokens', { stdio: 'inherit' });
  
  console.log('🎨 Building Storybook...');
  execSync('npm run build-storybook', { stdio: 'inherit' });
  
  // Switch to gh-pages branch
  console.log('🔄 Switching to gh-pages branch...');
  try {
    execSync('git checkout gh-pages', { stdio: 'inherit' });
  } catch (error) {
    console.log('📝 Creating gh-pages branch...');
    execSync('git checkout -b gh-pages', { stdio: 'inherit' });
  }
  
  // Copy Storybook files to root
  console.log('📁 Copying Storybook files...');
  execSync('cp -r storybook-static/* .', { stdio: 'inherit' });
  execSync('rm -rf storybook-static', { stdio: 'inherit' });
  
  // Commit and push
  console.log('💾 Committing changes...');
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "deploy: update Storybook\n\n- Latest design tokens and components\n- Automated deployment"', { stdio: 'inherit' });
  
  console.log('🚀 Pushing to GitHub Pages...');
  execSync('git push origin gh-pages', { stdio: 'inherit' });
  
  // Switch back to main
  console.log('🔄 Switching back to main branch...');
  execSync('git checkout main', { stdio: 'inherit' });
  
  console.log('\n🎉 Deployment complete!');
  console.log('📋 Next steps:');
  console.log('1. Go to: https://github.com/uxdelta/muka/settings/pages');
  console.log('2. Set Source to "Deploy from a branch"');
  console.log('3. Set Branch to "gh-pages"');
  console.log('4. Wait 5-10 minutes for GitHub Pages to update');
  console.log('5. Visit: https://uxdelta.github.io/muka/');
  
} catch (error) {
  console.log('❌ Deployment failed:', error.message);
  console.log('\n🔧 Manual steps:');
  console.log('1. npm run build:tokens');
  console.log('2. npm run build-storybook');
  console.log('3. git checkout gh-pages');
  console.log('4. cp -r storybook-static/* .');
  console.log('5. git add . && git commit -m "deploy" && git push origin gh-pages');
}
