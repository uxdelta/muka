const fs = require('fs');
const path = require('path');

/**
 * Simple token-to-CSS converter for Storybook preview
 * Converts your JSON design tokens to CSS custom properties
 */
class TokenBuilder {
  constructor() {
    this.tokens = {};
    this.resolvedTokens = {};
  }

  // Load all token files in the correct order
  loadTokens() {
    const tokenOrder = [
      'base/primitives/color.json',
      'base/primitives/font.json',
      'base/primitives/spacing.json',
      'base/primitives/size.json',
      'base/primitives/shadow.json',
      'base/primitives/motion.json',
      'base/primitives/layout.json',
      'base/alias/alias.json',
      // Brand base tokens override alias layer
      'brands/muka/base.json',
      'brands/wireframe/base.json',
      'base/semantic/semantic.json',
      'base/component/button.json',
      'base/component/input.json'
    ];

    console.log('🏗️  Loading design tokens...');
    
    tokenOrder.forEach(tokenPath => {
      const fullPath = path.join(__dirname, '../tokens', tokenPath);
      if (fs.existsSync(fullPath)) {
        const tokenData = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        this.mergeTokens(tokenData);
        console.log(`   ✅ Loaded ${tokenPath}`);
      } else {
        console.log(`   ⚠️  Missing ${tokenPath}`);
      }
    });
  }

  // Merge token objects
  mergeTokens(newTokens) {
    this.deepMerge(this.tokens, newTokens);
  }

  deepMerge(target, source) {
    for (const key in source) {
      if (key.startsWith('$')) continue; // Skip metadata
      
      if (source[key] && typeof source[key] === 'object' && !source[key].$value) {
        if (!target[key]) target[key] = {};
        this.deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  // Resolve token references like {color.gray.9}
  resolveTokenValue(value, visited = new Set()) {
    if (typeof value !== 'string' || !value.includes('{')) {
      return value;
    }

    const tokenRef = value.match(/\{([^}]+)\}/);
    if (!tokenRef) return value;

    const tokenPath = tokenRef[1];
    
    // Prevent circular references
    if (visited.has(tokenPath)) {
      console.warn(`⚠️  Circular reference detected: ${tokenPath}`);
      return value;
    }
    
    visited.add(tokenPath);
    
    const resolvedValue = this.getTokenValue(tokenPath);
    if (resolvedValue !== null) {
      const newValue = value.replace(tokenRef[0], resolvedValue);
      return this.resolveTokenValue(newValue, visited);
    }
    
    return value;
  }

  // Get token value by path (e.g., "color.gray.9")
  getTokenValue(tokenPath) {
    const pathParts = tokenPath.split('.');
    let current = this.tokens;
    
    for (const part of pathParts) {
      if (current && current[part]) {
        current = current[part];
      } else {
        console.warn(`⚠️  Token not found: ${tokenPath}`);
        return null;
      }
    }
    
    return current && current.$value ? current.$value : null;
  }

  // Convert tokens to CSS custom properties
  generateCSS() {
    console.log('🎨 Generating CSS custom properties...');
    
    let css = `/* Muka Design System Tokens */\n/* Generated automatically from design tokens */\n\n:root {\n`;
    
    this.processTokensForCSS(this.tokens, '', (name, value) => {
      const resolvedValue = this.resolveTokenValue(value);
      css += `  --${name}: ${resolvedValue};\n`;
    });
    
    css += '}\n';
    return css;
  }

  // Recursively process tokens for CSS generation
  processTokensForCSS(obj, prefix, callback) {
    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith('$')) continue; // Skip metadata
      
      const cssName = prefix ? `${prefix}-${key}` : key;
      
      if (value && typeof value === 'object' && value.$value) {
        // This is a token with a value
        if (value.$type === 'typography' && typeof value.$value === 'object') {
          // Handle typography tokens specially - flatten the object
          for (const [prop, propValue] of Object.entries(value.$value)) {
            const resolvedPropValue = this.resolveTokenValue(propValue);
            callback(`${cssName}-${prop}`, resolvedPropValue);
          }
        } else {
          // Regular token with simple value
          const resolvedValue = this.resolveTokenValue(value.$value);
          callback(cssName, resolvedValue);
        }
      } else if (value && typeof value === 'object') {
        // This is a nested object, recurse
        this.processTokensForCSS(value, cssName, callback);
      }
    }
  }

  // Build tokens for Storybook
  async build() {
    console.log('🚀 Building design tokens for Storybook...\n');
    
    try {
      // Load all tokens
      this.loadTokens();
      
      // Generate base CSS
      const css = this.generateCSS();
      
      // Ensure output directory exists
      const outputDir = path.join(__dirname, '../styles');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // Write base CSS file
      const outputPath = path.join(outputDir, 'tokens.css');
      fs.writeFileSync(outputPath, css);
      
      console.log(`✅ Base tokens built successfully!`);
      console.log(`📁 Output: ${outputPath}`);
      console.log(`🎨 Generated ${css.split('\\n').length - 4} CSS custom properties`);
      
      // Build all theme combinations
      this.buildAllThemes();
      
    } catch (error) {
      console.error('❌ Error building tokens:', error);
      process.exit(1);
    }
  }

  // Build all brand/theme combinations
  buildAllThemes() {
    console.log('\n🎨 Building brand/theme combinations...\n');
    
    const combinations = [
      { brand: 'muka', theme: 'light' },
      { brand: 'muka', theme: 'dark' },
      { brand: 'wireframe', theme: 'light' },
      { brand: 'wireframe', theme: 'dark' }
    ];
    
    combinations.forEach(({ brand, theme }) => {
      console.log(`📦 Building ${brand}-${theme}...`);
      
      try {
        // Load theme-specific tokens
        const themeTokens = this.loadThemeTokens(brand, theme);
        const css = this.generateThemeCSS(themeTokens, brand, theme);
        
        // Write theme-specific CSS
        const outputDir = path.join(__dirname, '../styles');
        const outputPath = path.join(outputDir, `tokens-${brand}-${theme}.css`);
        fs.writeFileSync(outputPath, css);
        
        console.log(`   ✅ Generated: tokens-${brand}-${theme}.css`);
      } catch (error) {
        console.error(`   ❌ Error building ${brand}-${theme}:`, error.message);
      }
    });
    
    console.log('\n🎉 All theme combinations built successfully!');
  }

  // Load theme-specific token overrides
  loadThemeTokens(brand, theme) {
    // Start with base tokens (deep copy)
    let themeTokens = JSON.parse(JSON.stringify(this.tokens));
    
    // Apply theme-specific overrides
    const themePath = path.join(__dirname, '../tokens/brands', brand, `${theme}.json`);
    if (fs.existsSync(themePath)) {
      const themeOverrides = JSON.parse(fs.readFileSync(themePath, 'utf8'));
      this.deepMergeTheme(themeTokens, themeOverrides);
    }
    
    return themeTokens;
  }

  // Deep merge utility for theme tokens
  deepMergeTheme(target, source) {
    for (const key in source) {
      if (key.startsWith('$')) continue; // Skip metadata
      
      if (source[key] && typeof source[key] === 'object' && !source[key].$value) {
        if (!target[key]) target[key] = {};
        this.deepMergeTheme(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }

  // Generate theme-specific CSS with data attributes
  generateThemeCSS(tokens, brand, theme) {
    let css = `/* Muka Design System - ${brand} ${theme} theme */\n`;
    css += `/* Generated automatically from design tokens */\n\n`;
    css += `[data-brand="${brand}"][data-theme="${theme}"] {\n`;
    
    this.processTokensForCSS(tokens, '', (name, value) => {
      const resolvedValue = this.resolveTokenValue(value);
      css += `  --${name}: ${resolvedValue};\n`;
    });
    
    css += '}\n\n';
    
    // Add root fallback for default theme
    if (brand === 'muka' && theme === 'light') {
      css += `/* Default theme fallback */\n:root {\n`;
      this.processTokensForCSS(tokens, '', (name, value) => {
        const resolvedValue = this.resolveTokenValue(value);
        css += `  --${name}: ${resolvedValue};\n`;
      });
      css += '}\n';
    }
    
    return css;
  }
}

// Run the build if this file is executed directly
if (require.main === module) {
  const builder = new TokenBuilder();
  builder.build();
}

module.exports = TokenBuilder;
