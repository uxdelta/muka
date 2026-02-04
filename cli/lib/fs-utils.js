/**
 * File system utilities for the Muka UI CLI
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * Check if a file exists
 */
function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a directory exists
 */
function dirExists(dirPath) {
  try {
    const stat = fs.statSync(dirPath);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Create directory recursively if it doesn't exist
 */
function ensureDir(dirPath) {
  if (!dirExists(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Read a file and return its contents
 */
function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Write content to a file
 */
function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf-8');
}

/**
 * Load and process a template file with placeholder replacement
 */
function loadTemplate(templateName, replacements = {}) {
  const templatePath = path.join(__dirname, '..', 'templates', templateName);
  let content = readFile(templatePath);

  // Replace all {{PLACEHOLDER}} patterns
  for (const [key, value] of Object.entries(replacements)) {
    const pattern = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    content = content.replace(pattern, value);
  }

  return content;
}

/**
 * Prompt user for yes/no confirmation
 */
function confirm(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(`${question} (y/N): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

/**
 * Prompt user for text input
 */
function prompt(question, defaultValue = '') {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const defaultText = defaultValue ? ` (${defaultValue})` : '';
    rl.question(`${question}${defaultText}: `, (answer) => {
      rl.close();
      resolve(answer || defaultValue);
    });
  });
}

/**
 * Find the project root (directory containing package.json)
 */
function findProjectRoot(startDir = process.cwd()) {
  let currentDir = startDir;

  while (currentDir !== path.dirname(currentDir)) {
    const packageJsonPath = path.join(currentDir, 'package.json');
    if (fileExists(packageJsonPath)) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }

  return null;
}

/**
 * Read and parse package.json from a directory
 */
function readPackageJson(dir) {
  const packageJsonPath = path.join(dir, 'package.json');
  if (!fileExists(packageJsonPath)) {
    return null;
  }
  return JSON.parse(readFile(packageJsonPath));
}

module.exports = {
  fileExists,
  dirExists,
  ensureDir,
  readFile,
  writeFile,
  loadTemplate,
  confirm,
  prompt,
  findProjectRoot,
  readPackageJson
};
