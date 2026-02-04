#!/usr/bin/env node

/**
 * Muka UI CLI
 *
 * Commands:
 *   init        - Set up a project to use Muka UI
 *   link [path] - Set up npm link for local development
 *   components  - List available components
 */

const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];
const commandArgs = args.slice(1);

// Help text
const HELP = `
Muka UI CLI

Usage:
  muka-ui <command> [options]

Commands:
  init              Set up project for Muka UI (creates CLAUDE.md, guidelines)
  link [path]       Set up npm link for local muka-ui development
  components        List available Muka UI components

Options:
  --help, -h        Show this help message
  --version, -v     Show version

Examples:
  npx muka-ui init
  npx muka-ui link /path/to/muka
  npx muka-ui components
`;

// Version from package.json
function getVersion() {
  const pkg = require('../../package.json');
  return pkg.version;
}

// Main entry point
async function main() {
  // Handle flags
  if (!command || command === '--help' || command === '-h') {
    console.log(HELP);
    process.exit(0);
  }

  if (command === '--version' || command === '-v') {
    console.log(`muka-ui v${getVersion()}`);
    process.exit(0);
  }

  // Route to command handlers
  try {
    switch (command) {
      case 'init': {
        const init = require('../commands/init');
        await init(commandArgs);
        break;
      }
      case 'link': {
        const link = require('../commands/link');
        await link(commandArgs);
        break;
      }
      case 'components': {
        const components = require('../commands/components');
        await components(commandArgs);
        break;
      }
      default:
        console.error(`Unknown command: ${command}`);
        console.log(HELP);
        process.exit(1);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
