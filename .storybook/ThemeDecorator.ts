import React, { useEffect, type ReactNode } from 'react';
import type { Decorator } from '@storybook/react';

const THEME_LINK_ID = 'muka-theme-tokens';
const BRANDS = ['muka', 'wireframe'] as const;
const MODES = ['light', 'dark'] as const;
const LAYOUT_MODES = ['responsive', 'mobile', 'tablet', 'desktop'] as const;

type Brand = (typeof BRANDS)[number];
type Mode = (typeof MODES)[number];

function ThemeWrapper({
  brand,
  mode,
  layoutMode,
  children,
}: {
  brand: string;
  mode: string;
  layoutMode: string;
  children: ReactNode;
}) {
  useEffect(() => {
    const validBrand = BRANDS.indexOf(brand as Brand) !== -1 ? brand : 'muka';
    const validMode = MODES.indexOf(mode as Mode) !== -1 ? mode : 'light';
    const href = `/styles/tokens-${validBrand}-${validMode}.css`;
    let link = document.getElementById(THEME_LINK_ID) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = THEME_LINK_ID;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = href;
  }, [brand, mode]);

  // Apply data-layout attribute for layout mode forcing.
  // "responsive" and "mobile" use no attribute (mobile is the base, responsive uses @media).
  const dataLayout =
    layoutMode !== 'responsive' && layoutMode !== 'mobile' ? layoutMode : undefined;

  return React.createElement(
    'div',
    { 'data-layout': dataLayout, style: { display: 'contents' } },
    children
  );
}

export const withTheme: Decorator = (Story, context) => {
  const brand = (context.globals?.brand as string) ?? 'muka';
  const mode = (context.globals?.mode as string) ?? 'light';
  const layoutMode = (context.globals?.layout_mode as string) ?? 'responsive';
  return React.createElement(
    ThemeWrapper,
    { brand, mode, layoutMode },
    React.createElement(Story)
  );
};
