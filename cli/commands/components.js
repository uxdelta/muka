/**
 * `muka-ui components` command
 *
 * Lists all available Muka UI components from the manifest.
 */

const manifest = require('../manifest.json');

/**
 * Format a component for display
 */
function formatComponent(component, verbose = false) {
  const lines = [];

  // Component name and description
  lines.push(`  ${component.name}`);
  lines.push(`    ${component.description}`);

  if (verbose) {
    // Variants
    if (component.variants && component.variants.length > 0) {
      lines.push(`    Variants: ${component.variants.join(', ')}`);
    }

    // Sizes
    if (component.sizes && component.sizes.length > 0) {
      lines.push(`    Sizes: ${component.sizes.join(', ')}`);
    }

    // Props
    if (component.props && component.props.length > 0) {
      lines.push(`    Props: ${component.props.join(', ')}`);
    }

    // Subcomponents
    if (component.subcomponents && component.subcomponents.length > 0) {
      lines.push(`    Includes: ${component.subcomponents.join(', ')}`);
    }
  }

  return lines.join('\n');
}

/**
 * Main components command
 */
async function components(args) {
  const verbose = args.includes('-v') || args.includes('--verbose');
  const showPlanned = args.includes('-p') || args.includes('--planned');

  console.log('\n🎨 Muka UI Components\n');

  // Available components
  console.log('Available:');
  console.log('─────────────────────────────────────────────');

  for (const component of manifest.components) {
    console.log(formatComponent(component, verbose));
    console.log('');
  }

  // Planned components
  if (showPlanned) {
    console.log('Planned (not yet available):');
    console.log('─────────────────────────────────────────────');

    for (const component of manifest.planned_components) {
      console.log(`  ${component.name} (${component.roadmap})`);
    }
    console.log('');
  }

  // Summary
  console.log('─────────────────────────────────────────────');
  console.log(`Total: ${manifest.components.length} available`);
  if (!showPlanned) {
    console.log(`       ${manifest.planned_components.length} planned (use --planned to show)`);
  }
  console.log('');
  console.log(`Storybook: ${manifest.storybook_url}`);
  console.log('');

  // Usage hint
  if (!verbose) {
    console.log('Tip: Use --verbose (-v) for detailed props and variants');
  }
  console.log('');
}

module.exports = components;
