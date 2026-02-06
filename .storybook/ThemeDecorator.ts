import React, { useEffect, type ReactNode } from 'react';
import type { Decorator } from '@storybook/react';

const THEME_LINK_ID = 'muka-theme-tokens';
const THEMES = ['muka-light', 'muka-dark', 'wireframe-light', 'wireframe-dark'] as const;
type ThemeId = (typeof THEMES)[number];

const LAYOUT_MODES = ['responsive', 'mobile', 'tablet', 'desktop'] as const;
type LayoutMode = (typeof LAYOUT_MODES)[number];

function ThemeWrapper({
  theme,
  layoutMode,
  children,
}: {
  theme: string;
  layoutMode: string;
  children: ReactNode;
}) {
  useEffect(() => {
    const isValidTheme = THEMES.indexOf(theme as ThemeId) !== -1;
    const href = `/styles/tokens-${isValidTheme ? theme : 'muka-light'}.css`;
    let link = document.getElementById(THEME_LINK_ID) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = THEME_LINK_ID;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = href;
  }, [theme]);

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
  const theme = (context.globals?.theme as string) ?? 'muka-light';
  const layoutMode = (context.globals?.layout_mode as string) ?? 'responsive';
  return React.createElement(
    ThemeWrapper,
    { theme, layoutMode },
    React.createElement(Story)
  );
};
