/**
 * `muka-ui link` command
 *
 * Sets up npm link for local muka-ui development:
 * - Validates the muka-ui source path
 * - Runs npm link in the muka-ui directory
 * - Runs npm link muka-ui in the current project
 */

const path = require('path');
const { execSync } = require('child_process');
const {
  dirExists,
  fileExists,
  findProjectRoot,
  prompt,
  readPackageJson
} = require('../lib/fs-utils');

/**
 * Execute a shell command and stream output
 */
function exec(command, options = {}) {
  console.log(`  $ ${command}`);
  try {
    execSync(command, {
      stdio: 'inherit',
      ...options
    });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Validate that a path is a muka-ui repository
 */
function validateMukaPath(mukaPath) {
  if (!dirExists(mukaPath)) {
    return { valid: false, error: `Directory does not exist: ${mukaPath}` };
  }

  const packageJsonPath = path.join(mukaPath, 'package.json');
  if (!fileExists(packageJsonPath)) {
    return { valid: false, error: `No package.json found in: ${mukaPath}` };
  }

  const pkg = readPackageJson(mukaPath);
  if (pkg?.name !== 'muka-ui') {
    return {
      valid: false,
      error: `Directory is not muka-ui (found package: ${pkg?.name || 'unknown'})`
    };
  }

  return { valid: true };
}

/**
 * Main link command
 */
async function link(args) {
  console.log('\n🔗 Muka UI Local Development Setup\n');

  // Find current project root
  const projectRoot = findProjectRoot();
  if (!projectRoot) {
    throw new Error('Could not find package.json. Are you in a Node.js project?');
  }

  // Get muka-ui path from args or prompt
  let mukaPath = args[0];

  if (!mukaPath) {
    console.log('To develop muka-ui locally alongside this project, provide the path');
    console.log('to your local muka-ui repository.\n');
    mukaPath = await prompt('Path to muka-ui repository');
  }

  if (!mukaPath) {
    console.log('No path provided. Aborting.\n');
    return;
  }

  // Resolve to absolute path
  mukaPath = path.resolve(mukaPath);

  // Validate the path
  const validation = validateMukaPath(mukaPath);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  console.log(`\nMuka UI path: ${mukaPath}`);
  console.log(`Project path: ${projectRoot}\n`);

  // Step 1: Build muka-ui
  console.log('Step 1: Building muka-ui...\n');
  const buildSuccess = exec('npm run build', { cwd: mukaPath });
  if (!buildSuccess) {
    throw new Error('Failed to build muka-ui. Check for errors above.');
  }

  // Step 2: Create global link in muka-ui
  console.log('\nStep 2: Creating global link...\n');
  const linkSuccess = exec('npm link', { cwd: mukaPath });
  if (!linkSuccess) {
    throw new Error('Failed to create npm link in muka-ui.');
  }

  // Step 3: Link muka-ui in the current project
  console.log('\nStep 3: Linking muka-ui in project...\n');
  const linkProjectSuccess = exec('npm link muka-ui', { cwd: projectRoot });
  if (!linkProjectSuccess) {
    throw new Error('Failed to link muka-ui in project.');
  }

  // Success
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✓ Local development link established!\n');
  console.log('Development workflow:');
  console.log('');
  console.log('  Terminal 1 (muka-ui):');
  console.log(`    cd ${mukaPath}`);
  console.log('    npm run dev');
  console.log('');
  console.log('  Terminal 2 (this project):');
  console.log(`    cd ${projectRoot}`);
  console.log('    npm run dev');
  console.log('');
  console.log('After making changes to muka-ui:');
  console.log(`    cd ${mukaPath} && npm run build`);
  console.log('');
  console.log('To unlink later:');
  console.log('    npm unlink muka-ui');
  console.log('    npm install muka-ui');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

module.exports = link;
