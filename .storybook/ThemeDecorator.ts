import React, { useEffect, type ReactNode } from 'react';
import type { Decorator } from '@storybook/react';
import { Section } from '../components/Section';
import { Container } from '../components/Container';

const THEME_LINK_ID = 'muka-theme-tokens';
const BRANDS = ['muka', 'wireframe'] as const;
const MODES = ['light', 'dark'] as const;

type Brand = (typeof BRANDS)[number];
type Mode = (typeof MODES)[number];

// Map viewport addon names to layout modes for data-layout attribute
function getLayoutModeFromViewport(viewportName: string | undefined): string | undefined {
  if (!viewportName || viewportName === 'responsive') return undefined;

  // Map viewport names to layout modes
  const viewportToLayout: Record<string, string> = {
    mobile: 'mobile',
    tablet: 'tablet',
    desktop: 'desktop',
    desktopWide: 'desktop', // Wide desktop still uses desktop layout
  };

  return viewportToLayout[viewportName];
}

function ThemeWrapper({
  brand,
  mode,
  dataLayout,
  children,
}: {
  brand: string;
  mode: string;
  dataLayout: string | undefined;
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

  return React.createElement(
    'div',
    { 'data-layout': dataLayout, style: { display: 'contents' } },
    children
  );
}

export const withTheme: Decorator = (Story, context) => {
  const brand = (context.globals?.brand as string) ?? 'muka';
  const mode = (context.globals?.mode as string) ?? 'light';

  // Read viewport from the viewport addon instead of custom layout_mode
  const viewportName = (context.globals?.viewport as string) ?? 'responsive';
  const dataLayout = getLayoutModeFromViewport(viewportName);

  return React.createElement(
    ThemeWrapper,
    { brand, mode, dataLayout },
    React.createElement(Story)
  );
};

export const withLayout: Decorator = (Story, context) => {
  // Skip wrapper for fullscreen stories
  if (context.parameters?.layout === 'fullscreen') {
    return React.createElement(Story);
  }

  return React.createElement(
    Section,
    null,
    React.createElement(Container, null, React.createElement(Story))
  );
};
