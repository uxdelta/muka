# Multi-Brand Design System Strategy

## Philosophy

Our design system supports multiple brands while maintaining a single codebase through strategic token architecture. Each brand maintains its unique identity while sharing common semantic patterns and component behaviors.

## Brand Differentiation Strategy

### Core Principle: Alias Layer Customization
Brand differences are primarily handled through the alias layer, allowing surgical modifications that propagate throughout the entire system.

```
Base System → Brand Overrides → Unified Output
    ↓              ↓               ↓
primitives → alias overrides → semantic → component
```

## Brand Differentiation Levels

### Level 1: Alias Layer Overrides (Primary Method)
Modify brand-specific tokens in the alias layer for maximum impact with minimal effort:

```json
// Base alias (neutral starting point)
{
  "alias": {
    "color": {
      "brand": {
        "primary": "{color.gray.11}",
        "secondary": "{color.gray.9}"
      }
    },
    "font": {
      "brand": {
        "family": "Arial",
        "weight": {
          "semibold": "600"
        }
      }
    }
  }
}

// Muka brand override
{
  "alias": {
    "color": {
      "brand": {
        "primary": "{color.orange.9}",
        "secondary": "{color.blue.7}"
      }
    },
    "font": {
      "brand": {
        "family": "Funnel Display",
        "weight": {
          "semibold": "600"
        }
      }
    }
  }
}

// WhiteLabel brand override
{
  "alias": {
    "color": {
      "brand": {
        "primary": "{color.blue.9}",
        "secondary": "{color.green.7}"
      }
    },
    "font": {
      "brand": {
        "family": "Helvetica",
        "weight": {
          "semibold": "500"
        }
      }
    }
  }
}
```

### Level 2: Semantic Overrides (When Needed)
Modify usage patterns for brands with different interaction philosophies:

```json
// Brand with different interaction patterns
{
  "color": {
    "action": {
      "hover": {
        "$value": "{alias.color.brand.secondary}"  // Different hover logic
      }
    },
    "feedback": {
      "success": {
        "$value": "{alias.color.accent.success}"   // Brand-specific feedback colors
      }
    }
  }
}
```

### Level 3: Component Overrides (Rare)
Brand-specific component variations for unique requirements:

```json
// Brand with unique styling requirements
{
  "button": {
    "radius": {
      "md": { "$value": "0px" }  // Square buttons for this brand
    },
    "shadow": {
      "default": { "$value": "{shadow.lg}" }  // More prominent shadows
    }
  }
}
```

## Current Brand Implementations

### Muka Brand
**Personality:** Modern, approachable, creative  
**Key Characteristics:**
- Orange primary color (`#ff6b35`)
- Funnel Display typography
- Rounded, friendly interface elements
- Subtle shadows and depth

```json
// themes/muka/base.json
{
  "alias": {
    "font": {
      "brand": {
        "family": "Funnel Display"
      },
      "plain": {
        "family": "Funnel Sans"
      },
      "mono": {
        "family": "Menlo"
      },
      "script": {
        "family": "Yesteryear"
      }
    }
  }
}
```

### WhiteLabel Brand
**Personality:** Professional, clean, versatile  
**Key Characteristics:**
- Blue primary color (`#2563eb`)
- Helvetica typography system
- Clean, minimal interface
- Sharp, professional edges

```json
// themes/whitelabel/base.json
{
  "alias": {
    "font": {
      "brand": {
        "family": "Helvetica"
      },
      "plain": {
        "family": "Helvetica"
      },
      "mono": {
        "family": "Lucida Console"
      },
      "script": {
        "family": "Times New Roman"
      }
    }
  }
}
```

## Brand Implementation Workflow

### 1. Brand Analysis & Planning
```markdown
Brand Assessment Checklist:
- [ ] Define brand personality and values
- [ ] Establish color palette and meanings
- [ ] Select typography system
- [ ] Determine interaction patterns
- [ ] Define accessibility requirements
- [ ] Identify unique brand needs
```

### 2. Create Brand Token Set
```bash
# Create new brand directory
mkdir themes/[brandname]

# Create base brand tokens
touch themes/[brandname]/base.json
touch themes/[brandname]/light.json  
touch themes/[brandname]/dark.json
```

### 3. Define Alias Overrides
Start with the most impactful changes:

```json
// themes/[brandname]/base.json
{
  "alias": {
    "color": {
      "brand": {
        "primary": "{color.[brand-color].9}",
        "secondary": "{color.[accent-color].7}"
      }
    },
    "font": {
      "brand": {
        "family": "[Brand Font Family]"
      }
    }
  }
}
```

### 4. Test and Validate
```bash
# Build brand-specific token set
npm run build:tokens -- --brand=[brandname]

# Test component generation
npm run test:components -- --brand=[brandname]

# Validate accessibility
npm run test:a11y -- --brand=[brandname]
```

### 5. Document Brand Guidelines
```markdown
# [Brand Name] Design Guidelines

## Brand Identity
- Primary Color: [color] - [meaning/usage]
- Secondary Color: [color] - [meaning/usage]
- Typography: [font family] - [personality traits]

## Token Overrides
- alias.color.brand.primary → [specific color]
- alias.font.brand.family → [specific font]

## Usage Guidelines
- [Specific brand requirements]
- [Accessibility considerations]
- [Brand-specific patterns]
```

## Theme Variations (Light/Dark)

Each brand supports light and dark theme variations:

```json
// themes/muka/light.json
{
  "alias": {
    "color": {
      "neutral": {
        "1": "{color.gray.1}",    // Light background
        "11": "{color.gray.11}"   // Dark text
      }
    }
  }
}

// themes/muka/dark.json  
{
  "alias": {
    "color": {
      "neutral": {
        "1": "{color.gray.11}",   // Dark background
        "11": "{color.gray.1}"    // Light text
      }
    }
  }
}
```

## Maintenance Guidelines

### Best Practices
1. **Prefer alias layer changes** over deeper overrides
2. **Document brand rationale** for future reference and team understanding
3. **Test cross-brand compatibility** regularly to ensure system stability
4. **Keep semantic layer stable** across all brands
5. **Use component overrides sparingly** to maintain consistency
6. **Validate accessibility** across all brand variants

### Brand Update Process
1. **Analyze impact** of proposed changes
2. **Update alias layer** tokens
3. **Test component propagation** across system
4. **Validate accessibility standards** are maintained
5. **Update documentation** with rationale
6. **Deploy and monitor** for issues

### Quality Assurance Checklist
- [ ] All components render correctly with new brand tokens
- [ ] Accessibility standards maintained (WCAG AA minimum)
- [ ] Typography scales work across all contexts
- [ ] Color contrasts meet requirements
- [ ] Brand guidelines documented
- [ ] Team trained on brand-specific patterns

## Brand Onboarding Checklist

### Pre-Implementation
- [ ] Brand personality and values defined
- [ ] Color palette selected and validated
- [ ] Typography system chosen
- [ ] Accessibility requirements confirmed
- [ ] Unique brand needs identified

### Implementation
- [ ] Brand folder structure created
- [ ] Alias layer overrides defined
- [ ] Theme variations (light/dark) configured
- [ ] Component generation tested
- [ ] Cross-brand compatibility verified

### Documentation & Training
- [ ] Brand guidelines documented
- [ ] Token override rationale explained
- [ ] Usage examples created
- [ ] Team training completed
- [ ] Build pipeline configured

### Launch & Maintenance
- [ ] Brand tokens deployed
- [ ] Monitoring systems configured
- [ ] Feedback collection process established
- [ ] Regular review schedule set
- [ ] Update procedures documented

## Advanced Multi-Brand Patterns

### Conditional Token Loading
```javascript
// Dynamic brand loading based on context
const loadBrandTokens = (brandName, theme = 'light') => {
  const baseTokens = require('./base/tokens.json');
  const brandOverrides = require(`./themes/${brandName}/base.json`);
  const themeOverrides = require(`./themes/${brandName}/${theme}.json`);
  
  return mergeTokens(baseTokens, brandOverrides, themeOverrides);
};
```

### Brand-Specific Component Variants
```tsx
// Component that adapts to brand context
const BrandButton = ({ brand, variant, children }) => {
  const brandTokens = useBrandTokens(brand);
  
  return (
    <button 
      className={`button button--${variant} button--${brand}`}
      style={{
        backgroundColor: brandTokens.color.action.default,
        fontFamily: brandTokens.alias.font.brand.family
      }}
    >
      {children}
    </button>
  );
};
```

This multi-brand strategy ensures each brand maintains its unique identity while benefiting from a shared, maintainable design system foundation.
