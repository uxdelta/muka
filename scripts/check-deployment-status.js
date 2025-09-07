#!/usr/bin/env node

const https = require('https');

/**
 * Check if Storybook is properly deployed
 */

console.log('🔍 Checking Storybook deployment status...\n');

const url = 'https://uxdelta.github.io/muka/';

// Simple HTTP request to check the page
const req = https.get(url, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`📊 Status Code: ${res.statusCode}`);
    console.log(`📄 Content Type: ${res.headers['content-type']}`);
    
    if (data.includes('Storybook') && data.includes('storybook')) {
      console.log('✅ Storybook is properly deployed!');
      console.log('🎨 Your design system is live and working');
    } else if (data.includes('Muka Design System') && data.includes('README')) {
      console.log('❌ Still showing README instead of Storybook');
      console.log('🔧 The GitHub Actions workflow may have failed');
      console.log('📋 Check: https://github.com/uxdelta/muka/actions');
    } else {
      console.log('⚠️  Unexpected content detected');
      console.log('📋 Check the page manually: ' + url);
    }
    
    console.log('\n🎯 Next steps:');
    console.log('1. Check GitHub Actions: https://github.com/uxdelta/muka/actions');
    console.log('2. Check GitHub Pages settings: https://github.com/uxdelta/muka/settings/pages');
    console.log('3. Wait 5-10 minutes for deployment to complete');
  });
});

req.on('error', (error) => {
  console.log('❌ Error checking deployment:', error.message);
  console.log('📋 Check manually: ' + url);
});

req.setTimeout(10000, () => {
  console.log('⏰ Request timeout - check manually: ' + url);
  req.destroy();
});
