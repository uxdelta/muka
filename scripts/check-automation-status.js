#!/usr/bin/env node

const { execSync } = require('child_process');

/**
 * Check GitHub Actions automation status
 * This script helps verify that workflows are running properly
 */

console.log('🔍 Checking GitHub Actions automation status...\n');

try {
  // Check if gh CLI is available
  try {
    execSync('gh --version', { stdio: 'ignore' });
  } catch (error) {
    console.log('❌ GitHub CLI (gh) not found. Install it for detailed status:');
    console.log('   brew install gh  # macOS');
    console.log('   Or visit: https://cli.github.com/\n');
    console.log('📋 Manual check:');
    console.log('   1. Go to: https://github.com/uxdelta/muka/actions');
    console.log('   2. Look for "Build Design Tokens" workflow');
    console.log('   3. Check if it completed successfully\n');
    process.exit(0);
  }

  // Check recent workflow runs
  console.log('📊 Recent workflow runs:');
  try {
    const runs = execSync('gh run list --repo uxdelta/muka --limit 5', { encoding: 'utf8' });
    console.log(runs);
  } catch (error) {
    console.log('❌ Could not fetch workflow runs. Check manually:');
    console.log('   https://github.com/uxdelta/muka/actions\n');
  }

  // Check if GitHub Pages is enabled
  console.log('🌐 GitHub Pages status:');
  try {
    const pages = execSync('gh api repos/uxdelta/muka/pages', { encoding: 'utf8' });
    const pagesData = JSON.parse(pages);
    console.log(`✅ GitHub Pages: ${pagesData.status}`);
    console.log(`   URL: https://uxdelta.github.io/muka/`);
    console.log(`   Source: ${pagesData.source.type}`);
  } catch (error) {
    console.log('❌ GitHub Pages not configured or accessible');
    console.log('   Make sure Pages is enabled in repository settings\n');
  }

  console.log('\n🎯 Next steps:');
  console.log('1. Check workflow runs: https://github.com/uxdelta/muka/actions');
  console.log('2. Visit live Storybook: https://uxdelta.github.io/muka/');
  console.log('3. Make a token change to test automation');

} catch (error) {
  console.log('❌ Error checking status:', error.message);
  console.log('\n📋 Manual verification:');
  console.log('1. Actions: https://github.com/uxdelta/muka/actions');
  console.log('2. Pages: https://github.com/uxdelta/muka/settings/pages');
  console.log('3. Live Storybook: https://uxdelta.github.io/muka/');
}
