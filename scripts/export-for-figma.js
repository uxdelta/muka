const fs = require('fs');
const path = require('path');

// Function to load and merge JSON files
function loadJSONFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error.message);
    return {};
  }
}

// Function to flatten nested objects
function flattenObject(obj, prefix = '') {
  const flattened = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !obj[key].$type) {
        // Recursively flatten nested objects
        Object.assign(flattened, flattenObject(obj[key], newKey));
      } else {
        // This is a token value
        flattened[newKey] = obj[key];
      }
    }
  }
  
  return flattened;
}

// Function to resolve token references (simplified)
function resolveTokenReferences(tokens) {
  const resolved = {};
  
  for (const [key, value] of Object.entries(tokens)) {
    if (value.$value && typeof value.$value === 'string' && value.$value.startsWith('{')) {
      // Simple reference resolution - extract the referenced key
      const refKey = value.$value.replace(/[{}]/g, '');
      if (tokens[refKey] && tokens[refKey].$value) {
        resolved[key] = {
          ...value,
          $value: tokens[refKey].$value
        };
      } else {
        resolved[key] = value; // Keep original if reference not found
      }
    } else {
      resolved[key] = value;
    }
  }
  
  return resolved;
}

// Main function to export tokens for Figma Variables
function exportForFigma() {
  console.log('🚀 Exporting tokens for Figma Variables...');
  
  // Load all token files
  const baseDir = path.join(__dirname, '../tokens');
  
  // Load base tokens
  const primitives = loadJSONFile(path.join(baseDir, 'base/primitives/color.json'));
  const fonts = loadJSONFile(path.join(baseDir, 'base/primitives/font.json'));
  const spacing = loadJSONFile(path.join(baseDir, 'base/primitives/spacing.json'));
  const size = loadJSONFile(path.join(baseDir, 'base/primitives/size.json'));
  const shadow = loadJSONFile(path.join(baseDir, 'base/primitives/shadow.json'));
  const motion = loadJSONFile(path.join(baseDir, 'base/primitives/motion.json'));
  const layout = loadJSONFile(path.join(baseDir, 'base/primitives/layout.json'));
  
  const alias = loadJSONFile(path.join(baseDir, 'base/alias/alias.json'));
  const semantic = loadJSONFile(path.join(baseDir, 'base/semantic/semantic.json'));
  const button = loadJSONFile(path.join(baseDir, 'base/component/button.json'));
  const input = loadJSONFile(path.join(baseDir, 'base/component/input.json'));
  
  // Load brand tokens
  const mukaBase = loadJSONFile(path.join(baseDir, 'brands/muka/base.json'));
  const mukaLight = loadJSONFile(path.join(baseDir, 'brands/muka/light.json'));
  const mukaDark = loadJSONFile(path.join(baseDir, 'brands/muka/dark.json'));
  
  const wireframeBase = loadJSONFile(path.join(baseDir, 'brands/wireframe/base.json'));
  const wireframeLight = loadJSONFile(path.join(baseDir, 'brands/wireframe/light.json'));
  const wireframeDark = loadJSONFile(path.join(baseDir, 'brands/wireframe/dark.json'));
  
  // Load layout tokens
  const layoutSm = loadJSONFile(path.join(baseDir, 'layouts/sm.json'));
  const layoutMd = loadJSONFile(path.join(baseDir, 'layouts/md.json'));
  const layoutLg = loadJSONFile(path.join(baseDir, 'layouts/lg.json'));
  
  // Merge all tokens (base first, then overrides)
  const allTokens = {
    ...flattenObject(primitives),
    ...flattenObject(fonts),
    ...flattenObject(spacing),
    ...flattenObject(size),
    ...flattenObject(shadow),
    ...flattenObject(motion),
    ...flattenObject(layout),
    ...flattenObject(alias),
    ...flattenObject(semantic),
    ...flattenObject(button),
    ...flattenObject(input),
    ...flattenObject(mukaBase),
    ...flattenObject(mukaLight),
    ...flattenObject(mukaDark),
    ...flattenObject(wireframeBase),
    ...flattenObject(wireframeLight),
    ...flattenObject(wireframeDark),
    ...flattenObject(layoutSm),
    ...flattenObject(layoutMd),
    ...flattenObject(layoutLg)
  };
  
  // Resolve token references for Figma compatibility
  const resolvedTokens = resolveTokenReferences(allTokens);
  
  // Create Figma-compatible structure
  const figmaTokens = {
    name: "Muka Design System",
    description: "Multi-brand design system optimized for Figma Variables",
    version: "1.0.0",
    tokens: resolvedTokens
  };
  
  // Write the file
  const outputPath = path.join(baseDir, 'figma-tokens.json');
  fs.writeFileSync(outputPath, JSON.stringify(figmaTokens, null, 2));
  
  console.log(`✅ Tokens exported to: ${outputPath}`);
  console.log(`📊 Total tokens: ${Object.keys(resolvedTokens).length}`);
  console.log(`⚠️  Note: Token references have been flattened for Figma compatibility`);
  console.log(`💡 Your semantic layer is preserved in code/Storybook`);
  
  return outputPath;
}

// Run the export
if (require.main === module) {
  exportForFigma();
}

module.exports = { exportForFigma };
