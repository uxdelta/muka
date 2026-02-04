/**
 * Accessibility utilities for WCAG 2.1 AA compliance
 */

// Declare process for TypeScript (available in Node and bundler environments)
declare const process: { env: { NODE_ENV?: string } } | undefined;

/** CSS class for visually hidden content that remains accessible to screen readers */
export const VISUALLY_HIDDEN_CLASS = 'muka-visually-hidden';

/**
 * Development-only warning for missing required accessibility props
 */
export function warnMissingA11yProp(
  component: string,
  condition: boolean,
  message: string
): void {
  // Check for development environment in a way that works with bundlers
  const isDev =
    typeof process !== 'undefined' &&
    process?.env?.NODE_ENV !== 'production';

  if (isDev && condition) {
    console.warn(`[${component}] Accessibility: ${message}`);
  }
}
