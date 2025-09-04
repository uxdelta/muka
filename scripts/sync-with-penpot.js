const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import our existing functions
const { exportForPenpot } = require('./export-for-penpot.js');
const { importFromPenpot } = require('./import-from-penpot.js');

// Function to check if there are uncommitted changes
function hasUncommittedChanges() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    return status.trim().length > 0;
  } catch (error) {
    console.error('Error checking git status:', error.message);
    return false;
  }
}

// Function to commit changes
function commitChanges(message) {
  try {
    execSync('git add -A', { stdio: 'inherit' });
    execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
    console.log('✅ Changes committed to GitHub');
  } catch (error) {
    console.error('❌ Error committing changes:', error.message);
  }
}

// Function to push to GitHub
function pushToGitHub() {
  try {
    execSync('git push', { stdio: 'inherit' });
    console.log('✅ Changes pushed to GitHub');
  } catch (error) {
    console.error('❌ Error pushing to GitHub:', error.message);
  }
}

// Function to sync to Penpot (export)
function syncToPenpot() {
  console.log('📤 Syncing tokens TO Penpot...');
  
  // Check for uncommitted changes
  if (hasUncommittedChanges()) {
    console.log('⚠️  You have uncommitted changes. Committing them first...');
    commitChanges('feat: update tokens before Penpot sync');
  }
  
  // Export tokens for Penpot
  const outputPath = exportForPenpot();
  
  console.log('✅ Ready to import into Penpot!');
  console.log(`📁 File: ${outputPath}`);
  console.log('🔄 Next steps:');
  console.log('   1. Open Penpot');
  console.log('   2. Import the penpot-tokens.json file');
  console.log('   3. Make your changes in Penpot');
  console.log('   4. Export from Penpot when done');
  
  return outputPath;
}

// Function to sync from Penpot (import)
function syncFromPenpot(penpotExportPath) {
  console.log('📥 Syncing tokens FROM Penpot...');
  
  if (!penpotExportPath) {
    console.error('❌ Please provide the path to Penpot export file');
    console.log('Usage: node scripts/sync-with-penpot.js import <penpot-export.json>');
    return;
  }
  
  // Import tokens from Penpot
  const categorized = importFromPenpot(penpotExportPath);
  
  if (categorized) {
    // Rebuild CSS files
    console.log('🔄 Rebuilding CSS files...');
    try {
      execSync('node scripts/build-tokens.js', { stdio: 'inherit' });
      console.log('✅ CSS files rebuilt');
    } catch (error) {
      console.error('❌ Error rebuilding CSS files:', error.message);
    }
    
    // Commit changes
    console.log('💾 Committing changes...');
    commitChanges('feat: sync tokens from Penpot');
    
    // Push to GitHub
    console.log('🚀 Pushing to GitHub...');
    pushToGitHub();
    
    console.log('✅ Sync complete!');
    console.log('🔄 Your changes are now in GitHub and Storybook is updated');
  }
}

// Main function
function main() {
  const command = process.argv[2];
  const filePath = process.argv[3];
  
  switch (command) {
    case 'export':
    case 'to':
      syncToPenpot();
      break;
      
    case 'import':
    case 'from':
      syncFromPenpot(filePath);
      break;
      
    case 'help':
      console.log(`
🔄 Penpot Sync Workflow

Usage:
  node scripts/sync-with-penpot.js <command> [file]

Commands:
  export, to     Export tokens TO Penpot
  import, from   Import tokens FROM Penpot
  help           Show this help

Examples:
  node scripts/sync-with-penpot.js export
  node scripts/sync-with-penpot.js import penpot-export.json

Workflow:
  1. Export: node scripts/sync-with-penpot.js export
  2. Import penpot-tokens.json into Penpot
  3. Make changes in Penpot
  4. Export from Penpot
  5. Import: node scripts/sync-with-penpot.js import <file>
      `);
      break;
      
    default:
      console.error('❌ Unknown command:', command);
      console.log('Use "node scripts/sync-with-penpot.js help" for usage');
      process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { syncToPenpot, syncFromPenpot };
