const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Token builder that uses the manifest.json to build themes correctly
 */
class TokenBuilder {
  constructor() {
    this.manifest = null;
    this.tokens = {};
  }

  // Load manifest configuration
  loadManifest() {
    const manifestPath = path.join(__dirname, '../build/manifest.json');
    this.manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    console.log('📋 Loaded manifest configuration');
  }

  // Load and merge tokens from file patterns
  loadTokensFromPattern(pattern) {
    const tokensDir = path.join(__dirname, '../tokens');
    const fullPattern = path.join(__dirname, '..', pattern);
    
    const files = glob.sync(fullPattern);
    let mergedTokens = {};
    
    files.forEach(file => {
      try {
        const tokenData = JSON.parse(fs.readFileSync(file, 'utf8'));
        this.deepMerge(mergedTokens, tokenData);
        console.log(`   ✅ Loaded ${path.relative(tokensDir, file)}`);
      } catch (error) {
        console.log(`   ⚠️  Error loading ${path.relative(tokensDir, file)}: ${error.message}`);
      }
    });
    return mergedTokens;
  }

  // Deep merge utility
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
  resolveTokenValue(value, tokens, visited = new Set()) {
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
    
    const resolvedValue = this.getTokenValue(tokenPath, tokens);
    if (resolvedValue !== null) {
      // If the resolved value is non-string (array/object), return it directly
      // when the reference is the entire value (not embedded in a larger string)
      if (typeof resolvedValue !== 'string' && value === tokenRef[0]) {
        return resolvedValue;
      }
      const newValue = value.replace(tokenRef[0], resolvedValue);
      return this.resolveTokenValue(newValue, tokens, visited);
    }
    
    return value;
  }

  /**
   * Fix invalid rgba( #hex, alpha) → rgba(r, g, b, alpha).
   * CSS rgba() does not accept hex; it requires numeric RGB values.
   */
  fixRgbaHexValues(value) {
    if (typeof value !== 'string') return value;
    return value.replace(
      /rgba\(\s*#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}),\s*([\d.]+)\s*\)/g,
      (_, hex, alpha) => {
        let r, g, b;
        if (hex.length === 3) {
          r = parseInt(hex[0] + hex[0], 16);
          g = parseInt(hex[1] + hex[1], 16);
          b = parseInt(hex[2] + hex[2], 16);
        } else {
          r = parseInt(hex.slice(0, 2), 16);
          g = parseInt(hex.slice(2, 4), 16);
          b = parseInt(hex.slice(4, 6), 16);
        }
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
    );
  }

  // Get token value by path (e.g., "color.gray.9")
  getTokenValue(tokenPath, tokens) {
    const pathParts = tokenPath.split('.');
    let current = tokens;
    
    for (const part of pathParts) {
      if (current && current[part]) {
        current = current[part];
      } else {
        return null;
      }
    }
    
    return current && current.$value ? current.$value : null;
  }

  // Resolve all token references in a token object
  resolveAllReferences(tokens) {
    const processObject = (obj) => {
      if (typeof obj !== 'object' || obj === null) return obj;
      
      if (obj.$value) {
        if (typeof obj.$value === 'string') {
          obj.$value = this.resolveTokenValue(obj.$value, tokens);
        } else if (typeof obj.$value === 'object' && !Array.isArray(obj.$value)) {
          // Resolve references inside composite token values (border, etc.)
          for (const key in obj.$value) {
            if (typeof obj.$value[key] === 'string') {
              obj.$value[key] = this.resolveTokenValue(obj.$value[key], tokens);
            }
          }
        }
        return obj;
      }
      
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key] = processObject(obj[key]);
        }
      }
      
      return obj;
    };
    
    return processObject(tokens);
  }

  // Convert tokens to CSS custom properties
  generateCSS(tokens, brand = null, theme = null) {
    let css = '';
    
    if (brand && theme) {
      css += `/* Muka Design System - ${brand} ${theme} theme */\n`;
      css += `/* Generated automatically from design tokens */\n\n`;
      css += `[data-brand="${brand}"][data-theme="${theme}"] {\n`;
    } else {
      css += `/* Muka Design System Tokens */\n`;
      css += `/* Generated automatically from design tokens */\n\n`;
      css += `:root {\n`;
    }
    
    this.processTokensForCSS(tokens, '', (name, value) => {
      let resolvedValue = this.resolveTokenValue(value, tokens);
      resolvedValue = this.fixRgbaHexValues(resolvedValue);
      css += `  --${name}: ${resolvedValue};\n`;
    });
    
    css += '}\n';
    
    // Add root fallback for default theme
    if (brand === 'muka' && theme === 'light') {
      css += '\n/* Default theme fallback */\n:root {\n';
      this.processTokensForCSS(tokens, '', (name, value) => {
        let resolvedValue = this.resolveTokenValue(value, tokens);
        resolvedValue = this.fixRgbaHexValues(resolvedValue);
        css += `  --${name}: ${resolvedValue};\n`;
      });
      css += '}\n';
    }
    
    return css;
  }

  // Recursively process tokens for CSS generation
  processTokensForCSS(obj, prefix, callback) {
    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith('$')) continue; // Skip metadata
      
      const cssName = prefix ? `${prefix}-${key}` : key;
      
      if (value && typeof value === 'object' && value.$value !== undefined) {
        // This is a token with a value
        if (value.$type === 'typography' && typeof value.$value === 'object') {
          // Handle typography tokens specially - flatten the object
          for (const [prop, propValue] of Object.entries(value.$value)) {
            const resolvedPropValue = this.resolveTokenValue(propValue, obj);
            callback(`${cssName}-${prop}`, resolvedPropValue);
          }
        } else if (value.$type === 'border' && typeof value.$value === 'object') {
          // Handle border composite tokens: { color, width, style } → "width style color"
          const color = value.$value.color;
          const width = value.$value.width;
          const style = value.$value.style || 'solid';
          callback(cssName, `${width} ${style} ${color}`);
        } else if (value.$type === 'boxShadow' && Array.isArray(value.$value)) {
          // Handle boxShadow composite tokens: array of layers → CSS box-shadow
          const shadowStr = value.$value.map(layer => {
            const inset = layer.type === 'innerShadow' ? 'inset ' : '';
            return `${inset}${layer.x} ${layer.y} ${layer.blur} ${layer.spread} ${layer.color}`;
          }).join(', ');
          callback(cssName, shadowStr);
        } else {
          // Regular token with simple value
          const resolvedValue = this.resolveTokenValue(value.$value, obj);
          callback(cssName, resolvedValue);
        }
      } else if (value && typeof value === 'object' && !value.$value) {
        // This is a nested object, recurse
        this.processTokensForCSS(value, cssName, callback);
      }
    }
  }

  // Build tokens for Storybook
  async build() {
    console.log('🚀 Building design tokens for Storybook...\n');
    
    try {
      // Load manifest
      this.loadManifest();
      
      // Ensure output directory exists
      const outputDir = path.join(__dirname, '../styles');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // Build all themes
      this.buildAllThemes();
      
    } catch (error) {
      console.error('❌ Error building tokens:', error);
      process.exit(1);
    }
  }

  // Build all brand/theme combinations
  buildAllThemes() {
    console.log('\n🎨 Building brand/theme combinations...\n');
    
    const themes = Object.keys(this.manifest.themes);
    
    themes.forEach(themeName => {
      console.log(`📦 Building ${themeName}...`);
      
      try {
        // Load tokens for this theme
        const tokens = this.loadTokensForTheme(themeName);
        
        // Resolve all token references
        const resolvedTokens = this.resolveAllReferences(tokens);
        
        // Generate CSS
        const css = this.generateCSS(resolvedTokens);
        
        // Write CSS file
        const outputDir = path.join(__dirname, '../styles');
        const outputPath = path.join(outputDir, `tokens-${themeName}.css`);
        fs.writeFileSync(outputPath, css);
        
        console.log(`   ✅ Generated: tokens-${themeName}.css`);
      } catch (error) {
        console.error(`   ❌ Error building ${themeName}:`, error.message);
      }
    });
    
    console.log('\n🎉 All theme combinations built successfully!');
  }

  // Load tokens for a specific theme
  loadTokensForTheme(themeName) {
    const themeFiles = this.manifest.themes[themeName];
    let mergedTokens = {};
    
    console.log(`🏗️  Loading design tokens for ${themeName}...`);
    
    themeFiles.forEach(filePattern => {
      const tokens = this.loadTokensFromPattern(filePattern);
      this.deepMerge(mergedTokens, tokens);
    });
    
    return mergedTokens;
  }
}

// Run the build if this file is executed directly
if (require.main === module) {
  const builder = new TokenBuilder();
  builder.build();
}

module.exports = TokenBuilder;