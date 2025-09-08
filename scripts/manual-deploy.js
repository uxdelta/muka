#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

/**
 * Manual deployment script
 * This builds Storybook locally and provides instructions for manual deployment
 */

console.log('🚀 Manual Storybook Deployment\n');

try {
  // Build tokens
  console.log('📦 Building design tokens...');
  execSync('npm run build:tokens', { stdio: 'inherit' });
  console.log('✅ Tokens built successfully\n');
  
  // Build Storybook
  console.log('🎨 Building Storybook...');
  execSync('npm run build-storybook', { stdio: 'inherit' });
  console.log('✅ Storybook built successfully\n');
  
  // Check if storybook-static exists
  if (fs.existsSync('storybook-static')) {
    const files = fs.readdirSync('storybook-static');
    console.log(`📁 storybook-static contains ${files.length} files`);
    
    if (files.includes('index.html')) {
      console.log('✅ index.html found');
      console.log('\n🎯 Manual deployment options:');
      console.log('1. Use GitHub CLI: gh pages deploy storybook-static');
      console.log('2. Use git subtree: git subtree push --prefix storybook-static origin gh-pages');
      console.log('3. Check GitHub Actions: https://github.com/uxdelta/muka/actions');
      console.log('\n📋 GitHub Pages should be set to "Deploy from a branch" with "gh-pages" branch');
    } else {
      console.log('❌ index.html not found in storybook-static');
    }
  } else {
    console.log('❌ storybook-static folder not found');
  }
  
} catch (error) {
  console.log('❌ Error during build:', error.message);
  console.log('\n🔧 Try running manually:');
  console.log('npm run build:tokens');
  console.log('npm run build-storybook');
}
