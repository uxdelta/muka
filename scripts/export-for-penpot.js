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

// Main function to export tokens for Penpot
function exportForPenpot() {
  console.log('🚀 Exporting tokens for Penpot...');
  
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
  
  // Create Penpot-compatible structure
  const penpotTokens = {
    name: "Muka Design System",
    description: "Multi-brand design system with light/dark modes and responsive layouts",
    version: "1.0.0",
    tokens: allTokens
  };
  
  // Write the file
  const outputPath = path.join(baseDir, 'penpot-tokens.json');
  fs.writeFileSync(outputPath, JSON.stringify(penpotTokens, null, 2));
  
  console.log(`✅ Tokens exported to: ${outputPath}`);
  console.log(`📊 Total tokens: ${Object.keys(allTokens).length}`);
  
  return outputPath;
}

// Run the export
if (require.main === module) {
  exportForPenpot();
}

module.exports = { exportForPenpot };
