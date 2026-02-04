import React, { useEffect, type ReactNode } from 'react';
import type { Decorator } from '@storybook/react';

const THEME_LINK_ID = 'muka-theme-tokens';
const THEMES = ['muka-light', 'muka-dark', 'wireframe-light', 'wireframe-dark'] as const;
type ThemeId = (typeof THEMES)[number];

function ThemeWrapper({
  theme,
  children,
}: {
  theme: string;
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

  return React.createElement(React.Fragment, null, children);
}

export const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals?.theme as string) ?? 'muka-light';
  return React.createElement(ThemeWrapper, { theme }, React.createElement(Story));
};
