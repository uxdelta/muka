/**
 * `muka-ui init` command
 *
 * Sets up a project for Muka UI usage:
 * - Creates CLAUDE.md with AI development guidelines
 * - Creates docs/muka-ui-guidelines.md with usage documentation
 * - Checks for conflicting dependencies and warns
 */

const path = require('path');
const {
  fileExists,
  ensureDir,
  loadTemplate,
  writeFile,
  confirm,
  findProjectRoot,
  readPackageJson
} = require('../lib/fs-utils');
const { detectConflicts, printConflicts } = require('../lib/detect-conflicts');
const manifest = require('../manifest.json');

/**
 * Generate component list for templates
 */
function generateComponentList() {
  const lines = manifest.components.map(c => {
    const variants = c.variants ? ` — ${c.variants.join(', ')}` : '';
    return `- \`${c.name}\`${variants}: ${c.description}`;
  });
  return lines.join('\n');
}

/**
 * Generate component table for guidelines
 */
function generateComponentTable() {
  const header = '| Component | Description | Key Props |';
  const separator = '|-----------|-------------|-----------|';
  const rows = manifest.components.map(c => {
    const props = c.props ? c.props.slice(0, 3).join(', ') + (c.props.length > 3 ? '...' : '') : '';
    return `| \`${c.name}\` | ${c.description} | ${props} |`;
  });
  return [header, separator, ...rows].join('\n');
}

/**
 * Generate planned component table
 */
function generatePlannedComponentTable() {
  const header = '| Component | Roadmap |';
  const separator = '|-----------|---------|';
  const rows = manifest.planned_components.map(c => {
    return `| ${c.name} | ${c.roadmap} |`;
  });
  return [header, separator, ...rows].join('\n');
}

/**
 * Get template replacements
 */
function getReplacements() {
  const pkg = require('../../package.json');
  return {
    STORYBOOK_URL: manifest.storybook_url,
    PACKAGE_NAME: manifest.package_name,
    VERSION: pkg.version,
    DATE: new Date().toISOString().split('T')[0],
    COMPONENT_LIST: generateComponentList(),
    COMPONENT_TABLE: generateComponentTable(),
    PLANNED_COMPONENT_TABLE: generatePlannedComponentTable()
  };
}

/**
 * Main init command
 */
async function init(args) {
  console.log('\n🎨 Muka UI Project Setup\n');

  // Find project root
  const projectRoot = findProjectRoot();
  if (!projectRoot) {
    throw new Error('Could not find package.json. Are you in a Node.js project?');
  }

  console.log(`Project: ${projectRoot}\n`);

  // Check for conflicting dependencies
  console.log('Checking dependencies...');
  const conflicts = detectConflicts(projectRoot);
  printConflicts(conflicts);

  // Get template replacements
  const replacements = getReplacements();

  // --- CLAUDE.md ---
  const claudeMdPath = path.join(projectRoot, 'CLAUDE.md');
  let createClaudeMd = true;

  if (fileExists(claudeMdPath)) {
    console.log('CLAUDE.md already exists.');
    createClaudeMd = await confirm('Overwrite with Muka UI template?');
  }

  if (createClaudeMd) {
    const claudeContent = loadTemplate('CLAUDE.md', replacements);
    writeFile(claudeMdPath, claudeContent);
    console.log('✓ Created CLAUDE.md\n');
  } else {
    console.log('⏭ Skipped CLAUDE.md\n');
  }

  // --- docs/muka-ui-guidelines.md ---
  const docsDir = path.join(projectRoot, 'docs');
  const guidelinesPath = path.join(docsDir, 'muka-ui-guidelines.md');

  ensureDir(docsDir);

  let createGuidelines = true;
  if (fileExists(guidelinesPath)) {
    console.log('docs/muka-ui-guidelines.md already exists.');
    createGuidelines = await confirm('Overwrite with latest guidelines?');
  }

  if (createGuidelines) {
    const guidelinesContent = loadTemplate('muka-ui-guidelines.md', replacements);
    writeFile(guidelinesPath, guidelinesContent);
    console.log('✓ Created docs/muka-ui-guidelines.md\n');
  } else {
    console.log('⏭ Skipped docs/muka-ui-guidelines.md\n');
  }

  // --- Check if muka-ui is installed ---
  const projectPkg = readPackageJson(projectRoot);
  const hasMukaUi = projectPkg?.dependencies?.['muka-ui'] ||
                    projectPkg?.devDependencies?.['muka-ui'];

  if (!hasMukaUi) {
    console.log('⚠️  muka-ui is not installed in this project.\n');
    console.log('   Run: npm install muka-ui');
    console.log('   Or for local development: npx muka-ui link /path/to/muka\n');
  }

  // --- Summary ---
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Setup complete!\n');
  console.log('Next steps:');
  console.log('1. Import styles in your app root:');
  console.log(`   import '${manifest.package_name}/styles';`);
  console.log('');
  console.log('2. Import components:');
  console.log(`   import { Button, Card } from '${manifest.package_name}';`);
  console.log('');
  console.log(`3. Browse components: ${manifest.storybook_url}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

module.exports = init;
