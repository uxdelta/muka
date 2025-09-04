const fs = require('fs');
const path = require('path');

// Function to load Penpot export
function loadPenpotExport(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading Penpot export ${filePath}:`, error.message);
    return null;
  }
}

// Function to unflatten tokens back to nested structure
function unflattenTokens(flatTokens) {
  const nested = {};
  
  for (const [key, value] of Object.entries(flatTokens)) {
    const parts = key.split('.');
    let current = nested;
    
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
    
    current[parts[parts.length - 1]] = value;
  }
  
  return nested;
}

// Function to categorize tokens by type
function categorizeTokens(tokens) {
  const categorized = {
    primitives: {
      color: {},
      font: {},
      spacing: {},
      size: {},
      shadow: {},
      motion: {},
      layout: {}
    },
    alias: {},
    semantic: {},
    component: {
      button: {},
      input: {}
    },
    brands: {
      muka: {
        base: {},
        light: {},
        dark: {}
      },
      wireframe: {
        base: {},
        light: {},
        dark: {}
      }
    },
    layouts: {
      sm: {},
      md: {},
      lg: {}
    }
  };
  
  for (const [key, value] of Object.entries(tokens)) {
    const parts = key.split('.');
    
    // Categorize based on key structure
    if (parts[0] === 'color' && !parts[1].startsWith('alias') && !parts[1].startsWith('semantic')) {
      categorized.primitives.color[key] = value;
    } else if (parts[0] === 'font') {
      categorized.primitives.font[key] = value;
    } else if (parts[0] === 'spacing') {
      categorized.primitives.spacing[key] = value;
    } else if (parts[0] === 'size') {
      categorized.primitives.size[key] = value;
    } else if (parts[0] === 'shadow') {
      categorized.primitives.shadow[key] = value;
    } else if (parts[0] === 'motion') {
      categorized.primitives.motion[key] = value;
    } else if (parts[0] === 'layout') {
      categorized.primitives.layout[key] = value;
    } else if (key.startsWith('alias.')) {
      categorized.alias[key] = value;
    } else if (key.startsWith('semantic.') || key.startsWith('color.surface') || key.startsWith('color.text') || key.startsWith('color.border')) {
      categorized.semantic[key] = value;
    } else if (key.startsWith('button.')) {
      categorized.component.button[key] = value;
    } else if (key.startsWith('input.')) {
      categorized.component.input[key] = value;
    } else if (key.startsWith('brands.muka.')) {
      const brandKey = key.replace('brands.muka.', '');
      if (brandKey.startsWith('base.')) {
        categorized.brands.muka.base[brandKey.replace('base.', '')] = value;
      } else if (brandKey.startsWith('light.')) {
        categorized.brands.muka.light[brandKey.replace('light.', '')] = value;
      } else if (brandKey.startsWith('dark.')) {
        categorized.brands.muka.dark[brandKey.replace('dark.', '')] = value;
      }
    } else if (key.startsWith('brands.wireframe.')) {
      const brandKey = key.replace('brands.wireframe.', '');
      if (brandKey.startsWith('base.')) {
        categorized.brands.wireframe.base[brandKey.replace('base.', '')] = value;
      } else if (brandKey.startsWith('light.')) {
        categorized.brands.wireframe.light[brandKey.replace('light.', '')] = value;
      } else if (brandKey.startsWith('dark.')) {
        categorized.brands.wireframe.dark[brandKey.replace('dark.', '')] = value;
      }
    } else if (key.startsWith('layouts.')) {
      const layoutKey = key.replace('layouts.', '');
      if (layoutKey.startsWith('sm.')) {
        categorized.layouts.sm[layoutKey.replace('sm.', '')] = value;
      } else if (layoutKey.startsWith('md.')) {
        categorized.layouts.md[layoutKey.replace('md.', '')] = value;
      } else if (layoutKey.startsWith('lg.')) {
        categorized.layouts.lg[layoutKey.replace('lg.', '')] = value;
      }
    }
  }
  
  return categorized;
}

// Function to write categorized tokens to files
function writeCategorizedTokens(categorized, baseDir) {
  // Write primitives
  fs.writeFileSync(
    path.join(baseDir, 'base/primitives/color.json'),
    JSON.stringify(categorized.primitives.color, null, 2)
  );
  fs.writeFileSync(
    path.join(baseDir, 'base/primitives/font.json'),
    JSON.stringify(categorized.primitives.font, null, 2)
  );
  fs.writeFileSync(
    path.join(baseDir, 'base/primitives/spacing.json'),
    JSON.stringify(categorized.primitives.spacing, null, 2)
  );
  fs.writeFileSync(
    path.join(baseDir, 'base/primitives/size.json'),
    JSON.stringify(categorized.primitives.size, null, 2)
  );
  fs.writeFileSync(
    path.join(baseDir, 'base/primitives/shadow.json'),
    JSON.stringify(categorized.primitives.shadow, null, 2)
  );
  fs.writeFileSync(
    path.join(baseDir, 'base/primitives/motion.json'),
    JSON.stringify(categorized.primitives.motion, null, 2)
  );
  fs.writeFileSync(
    path.join(baseDir, 'base/primitives/layout.json'),
    JSON.stringify(categorized.primitives.layout, null, 2)
  );
  
  // Write alias
  fs.writeFileSync(
    path.join(baseDir, 'base/alias/alias.json'),
    JSON.stringify(categorized.alias, null, 2)
  );
  
  // Write semantic
  fs.writeFileSync(
    path.join(baseDir, 'base/semantic/semantic.json'),
    JSON.stringify(categorized.semantic, null, 2)
  );
  
  // Write components
  fs.writeFileSync(
    path.join(baseDir, 'base/component/button.json'),
    JSON.stringify(categorized.component.button, null, 2)
  );
  fs.writeFileSync(
    path.join(baseDir, 'base/component/input.json'),
    JSON.stringify(categorized.component.input, null, 2)
  );
  
  // Write brands
  fs.writeFileSync(
    path.join(baseDir, 'brands/muka/base.json'),
    JSON.stringify(categorized.brands.muka.base, null, 2)
  );
  fs.writeFileSync(
    path.join(baseDir, 'brands/muka/light.json'),
    JSON.stringify(categorized.brands.muka.light, null, 2)
  );
  fs.writeFileSync(
    path.join(baseDir, 'brands/muka/dark.json'),
    JSON.stringify(categorized.brands.muka.dark, null, 2)
  );
  
  fs.writeFileSync(
    path.join(baseDir, 'brands/wireframe/base.json'),
    JSON.stringify(categorized.brands.wireframe.base, null, 2)
  );
  fs.writeFileSync(
    path.join(baseDir, 'brands/wireframe/light.json'),
    JSON.stringify(categorized.brands.wireframe.light, null, 2)
  );
  fs.writeFileSync(
    path.join(baseDir, 'brands/wireframe/dark.json'),
    JSON.stringify(categorized.brands.wireframe.dark, null, 2)
  );
  
  // Write layouts
  fs.writeFileSync(
    path.join(baseDir, 'layouts/sm.json'),
    JSON.stringify(categorized.layouts.sm, null, 2)
  );
  fs.writeFileSync(
    path.join(baseDir, 'layouts/md.json'),
    JSON.stringify(categorized.layouts.md, null, 2)
  );
  fs.writeFileSync(
    path.join(baseDir, 'layouts/lg.json'),
    JSON.stringify(categorized.layouts.lg, null, 2)
  );
}

// Main function to import from Penpot
function importFromPenpot(penpotExportPath) {
  console.log('🔄 Importing tokens from Penpot...');
  
  const baseDir = path.join(__dirname, '../tokens');
  
  // Load Penpot export
  const penpotData = loadPenpotExport(penpotExportPath);
  if (!penpotData) {
    console.error('❌ Failed to load Penpot export');
    return;
  }
  
  // Extract tokens
  const tokens = penpotData.tokens || penpotData;
  
  // Categorize tokens
  const categorized = categorizeTokens(tokens);
  
  // Write categorized tokens to files
  writeCategorizedTokens(categorized, baseDir);
  
  console.log('✅ Tokens imported and categorized successfully!');
  console.log('📁 Files updated in tokens/ directory');
  console.log('🔄 Run "node scripts/build-tokens.js" to regenerate CSS files');
  
  return categorized;
}

// Run the import
if (require.main === module) {
  const penpotExportPath = process.argv[2];
  if (!penpotExportPath) {
    console.error('❌ Please provide the path to Penpot export file');
    console.log('Usage: node scripts/import-from-penpot.js <penpot-export.json>');
    process.exit(1);
  }
  
  importFromPenpot(penpotExportPath);
}

module.exports = { importFromPenpot };
