import { expect } from '@storybook/test';

export const THEMES = {
  'muka-light': { brand: 'muka', mode: 'light' },
  'muka-dark': { brand: 'muka', mode: 'dark' },
  'wireframe-light': { brand: 'wireframe', mode: 'light' },
  'wireframe-dark': { brand: 'wireframe', mode: 'dark' },
} as const;

export type ThemeKey = keyof typeof THEMES;

/**
 * Verify that theme tokens are loaded correctly
 */
export function verifyThemeLoaded(globals: any) {
  const brand = globals.brand || 'muka';
  const mode = globals.mode || 'light';

  // Check that theme link element exists and has correct href
  const themeLink = document.querySelector('link[id*="theme"]') as HTMLLinkElement;
  expect(themeLink).toBeTruthy();
  expect(themeLink.href).toContain(`tokens-${brand}-${mode}.css`);
}

/**
 * Get computed CSS custom property value
 */
export function getCSSVariable(element: HTMLElement, varName: string): string {
  const styles = window.getComputedStyle(element);
  return styles.getPropertyValue(varName).trim();
}

/**
 * Verify component uses design tokens (not hardcoded values)
 */
export function verifyUsesTokens(element: HTMLElement, tokenNames: string[]) {
  for (const tokenName of tokenNames) {
    const value = getCSSVariable(element, `--${tokenName}`);
    expect(value).toBeTruthy();
    expect(value).not.toBe('initial');
    expect(value).not.toBe('');
  }
}
