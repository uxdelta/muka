// CSS generator using the manifest system
const fs = require('fs');
const path = require('path');
const { loadAndMerge } = require('./utils/mergeTokens.cjs');

const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'));

// Process each theme
Object.keys(manifest.themes).forEach(themeName => {
  console.log(`📦 Building ${themeName}...`);
  
  const patterns = manifest.themes[themeName];
  const { merged } = loadAndMerge(patterns);
  
  // Generate CSS variables
  const css = generateCSS(merged);
  
  // Write CSS file
  const outputPath = path.join(process.cwd(), 'styles', `tokens-${themeName}.css`);
  fs.writeFileSync(outputPath, css);
  
  console.log(`   ✅ Generated: tokens-${themeName}.css`);
});

function generateCSS(tokens) {
  let css = `/* Generated from manifest system */\n:root {\n`;
  
  // First pass: collect all token values
  const tokenMap = new Map();
  function collectTokens(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === 'object' && value.$value !== undefined) {
        const tokenPath = `${prefix}${key}`;
        tokenMap.set(tokenPath, value.$value);
      } else if (value && typeof value === 'object') {
        collectTokens(value, prefix + key + '.');
      }
    }
  }
  collectTokens(tokens);
  
  // Second pass: resolve references and generate CSS
  function resolveValue(value) {
    if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
      const ref = value.slice(1, -1);
      const resolved = tokenMap.get(ref);
      return resolved ? resolveValue(resolved) : value;
    }
    return value;
  }
  
  function processTokens(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === 'object' && value.$value !== undefined) {
        const cssVar = `--${prefix}${key}`.replace(/\./g, '-');
        const resolvedValue = resolveValue(value.$value);
        css += `  ${cssVar}: ${resolvedValue};\n`;
      } else if (value && typeof value === 'object') {
        processTokens(value, prefix + key + '-');
      }
    }
  }
  
  processTokens(tokens);
  css += '}\n';
  
  return css;
}

console.log('\n🎉 All CSS files generated successfully!');
