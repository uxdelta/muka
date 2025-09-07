#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

/**
 * Diagnose GitHub Pages deployment issues
 */

console.log('🔍 Diagnosing GitHub Pages deployment...\n');

// Check if storybook-static exists
console.log('📁 Checking Storybook build:');
if (fs.existsSync('storybook-static')) {
  console.log('✅ storybook-static folder exists');
  const files = fs.readdirSync('storybook-static');
  console.log(`   Contains ${files.length} files`);
  
  if (files.includes('index.html')) {
    console.log('✅ index.html found');
  } else {
    console.log('❌ index.html missing');
  }
} else {
  console.log('❌ storybook-static folder missing');
  console.log('   Run: npm run build-storybook');
}

// Check package.json scripts
console.log('\n📦 Checking package.json scripts:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (packageJson.scripts['build-storybook']) {
    console.log('✅ build-storybook script exists');
  } else {
    console.log('❌ build-storybook script missing');
  }
} catch (error) {
  console.log('❌ Could not read package.json');
}

// Check workflow files
console.log('\n⚙️ Checking GitHub Actions workflows:');
const workflows = [
  '.github/workflows/deploy-storybook.yml',
  '.github/workflows/deploy-storybook-standalone.yml'
];

workflows.forEach(workflow => {
  if (fs.existsSync(workflow)) {
    console.log(`✅ ${workflow} exists`);
  } else {
    console.log(`❌ ${workflow} missing`);
  }
});

// Check git status
console.log('\n🔗 Checking git status:');
try {
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  if (status.trim()) {
    console.log('⚠️  Uncommitted changes detected');
    console.log('   Commit and push changes to trigger deployment');
  } else {
    console.log('✅ Working directory clean');
  }
} catch (error) {
  console.log('❌ Could not check git status');
}

console.log('\n🎯 Next steps:');
console.log('1. Check GitHub Pages settings: https://github.com/uxdelta/muka/settings/pages');
console.log('2. Check Actions tab: https://github.com/uxdelta/muka/actions');
console.log('3. Look for failed workflows (red X marks)');
console.log('4. Check workflow logs for error messages');
console.log('\n📖 For detailed troubleshooting, see: TROUBLESHOOTING.md');
