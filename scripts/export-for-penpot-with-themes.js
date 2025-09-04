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

// Function to create theme-specific tokens
function createThemeTokens(baseTokens, themeOverrides) {
  const themeTokens = { ...baseTokens };
  
  // Apply theme overrides
  for (const [key, value] of Object.entries(themeOverrides)) {
    themeTokens[key] = value;
  }
  
  return themeTokens;
}

// Main function to export tokens with themes for Penpot
function exportForPenpotWithThemes() {
  console.log('🚀 Exporting tokens with themes for Penpot...');
  
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
  
  // Create base tokens (all primitives + base components)
  const baseTokens = {
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
    ...flattenObject(input)
  };
  
  // Create theme-specific token files
  const themes = {
    // Mode Themes
    'light-mode': createThemeTokens(baseTokens, {
      ...flattenObject(mukaLight),
      ...flattenObject(wireframeLight)
    }),
    
    'dark-mode': createThemeTokens(baseTokens, {
      ...flattenObject(mukaDark),
      ...flattenObject(wireframeDark)
    }),
    
    // Brand Themes
    'muka-brand': createThemeTokens(baseTokens, {
      ...flattenObject(mukaBase),
      ...flattenObject(mukaLight),
      ...flattenObject(mukaDark)
    }),
    
    'wireframe-brand': createThemeTokens(baseTokens, {
      ...flattenObject(wireframeBase),
      ...flattenObject(wireframeLight),
      ...flattenObject(wireframeDark)
    }),
    
    // Layout Themes
    'small-layout': createThemeTokens(baseTokens, {
      ...flattenObject(layoutSm)
    }),
    
    'medium-layout': createThemeTokens(baseTokens, {
      ...flattenObject(layoutMd)
    }),
    
    'large-layout': createThemeTokens(baseTokens, {
      ...flattenObject(layoutLg)
    })
  };
  
  // Create output directory
  const outputDir = path.join(baseDir, 'penpot-themes');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write theme files
  for (const [themeName, tokens] of Object.entries(themes)) {
    const themeData = {
      name: themeName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: `${themeName.replace('-', ' ')} theme for Muka Design System`,
      version: "1.0.0",
      tokens: tokens
    };
    
    const outputPath = path.join(outputDir, `${themeName}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(themeData, null, 2));
    console.log(`✅ Created theme: ${themeName}.json`);
  }
  
  // Create main combined file
  const combinedTokens = {
    name: "Muka Design System",
    description: "Multi-brand design system with light/dark modes and responsive layouts",
    version: "1.0.0",
    tokens: baseTokens
  };
  
  const combinedPath = path.join(baseDir, 'penpot-tokens.json');
  fs.writeFileSync(combinedPath, JSON.stringify(combinedTokens, null, 2));
  
  console.log(`✅ Created combined tokens: penpot-tokens.json`);
  console.log(`📁 Theme files created in: ${outputDir}`);
  console.log(`📊 Total themes: ${Object.keys(themes).length}`);
  
  return { combinedPath, outputDir };
}

// Run the export
if (require.main === module) {
  exportForPenpotWithThemes();
}

module.exports = { exportForPenpotWithThemes };
