// Tool-agnostic build using the manifest
const fs = require('fs');
const path = require('path');
const { loadAndMerge } = require('./utils/mergeTokens.cjs');

const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'));
const themeName = process.env.THEME || 'muka-light';
const patterns = manifest.themes[themeName];
if (!patterns) {
  console.error(`[build-custom] Unknown theme: ${themeName}`);
  process.exit(1);
}

const { merged, files } = loadAndMerge(patterns);

// Output raw merged for further tooling or AI-IDE consumption
const outDir = path.join(process.cwd(), manifest.exports.raw.buildPath);
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, manifest.exports.raw.file);
fs.writeFileSync(outFile, JSON.stringify(merged, null, 2));

console.log(`[build-custom] ${themeName} merged from ${files.length} files → ${outFile}`);
