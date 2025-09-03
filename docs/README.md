# Muka Design System Documentation

Welcome to the Muka Design System documentation. This system is designed for multi-brand support with AI-first development workflows.

## 📋 Table of Contents

- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Contributing](#contributing)

## 🏗️ Architecture

Our design system uses a 4-layer token architecture optimized for multi-brand support and AI integration:

```
primitives → alias → semantic → component
```

- **Primitives:** Raw design values (colors, spacing, typography)
- **Alias:** Brand-specific decisions and personality
- **Semantic:** Usage intent and functional meaning  
- **Component:** Component-specific implementations

## 🚀 Quick Start

### Understanding the Token Structure

```json
// Example: Button primary background resolution
"button.color.primary.background.default" 
    ↓ references
"color.action.default" 
    ↓ references  
"alias.color.brand.primary" 
    ↓ references
"color.gray.11" 
    ↓ resolves to
"#0a0a0a"
```

### Current Brands

- **Muka:** Modern, creative brand with orange primary color
- **WhiteLabel:** Professional, clean brand with blue primary color

### AI-First Development

This system is optimized for AI-assisted development using tools like Cursor, with rich metadata and clear architectural patterns.

## 📚 Documentation

### Architecture & Decisions
- [ADR-001: Token Architecture](./architecture/adr-001-token-architecture.md) - Core architectural decisions and rationale

### Implementation Guides
- [Token Architecture Guide](./guides/token-architecture-guide.md) - Complete guide to our token system
- [RAG Implementation Guide](./guides/rag-implementation.md) - Building AI-enhanced design systems
- [Multi-Brand Strategy](./guides/multi-brand-strategy.md) - Supporting multiple brands efficiently

### Workflows
- [Development Workflow](./workflows/development-workflow.md) - AI-first development practices

## 🎯 Key Principles

1. **GitHub as Single Source of Truth** - All design decisions live in the repository
2. **AI-First Development** - Optimized for AI-assisted workflows
3. **Multi-Brand Support** - Easy brand customization through alias layer
4. **Lightweight & Maintainable** - Simple architecture, powerful results
5. **Future-Proof** - Independent of design tool limitations

## 🔧 Tools

- **Primary Development:** Cursor with AI assistance
- **Design Exploration:** Figma (concepts only, not token management)
- **Cross-Platform:** Compatible with Penpot and other tools
- **Version Control:** Git-based workflow with automated validation

## 📖 Contributing

When working with this design system:

1. **Read the Architecture Guide** to understand token relationships
2. **Use AI assistance** in Cursor for consistency and validation
3. **Prefer alias layer changes** for brand customization
4. **Document design decisions** in ADRs when making architectural changes
5. **Test across brands** to ensure compatibility

## 🎨 Brand Customization

To create a new brand variant:

1. Create folder: `themes/[brandname]/`
2. Define alias overrides: Start with `base.json`
3. Test propagation: Verify changes affect all components
4. Document rationale: Explain brand decisions
5. Generate build: Create brand-specific token sets

## 🔍 Need Help?

- Check the [Token Architecture Guide](./guides/token-architecture-guide.md) for token usage
- Review [Multi-Brand Strategy](./guides/multi-brand-strategy.md) for brand customization
- See [Development Workflow](./workflows/development-workflow.md) for AI-assisted processes
- Ask Cursor AI for context-aware assistance with token modifications

---

*This design system embraces the future of AI-assisted development while maintaining clean, maintainable architecture.*
