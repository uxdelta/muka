import React from 'react';
import {
  RiHomeLine,
  RiHomeFill,
  RiSearchLine,
  RiSearchFill,
  RiBellLine,
  RiBellFill,
  RiUserLine,
  RiUserFill,
  RiArrowLeftLine,
  RiArrowLeftFill,
  RiCloseLine,
  RiCloseFill,
  RiMore2Line,
  RiMore2Fill,
  RiHeartLine,
  RiHeartFill,
  RiCarLine,
  RiCarFill,
  RiCalculatorLine,
  RiCalculatorFill,
  RiBarChartLine,
  RiBarChartFill,
} from '@remixicon/react';

export type IconRegistryEntry = {
  line: React.ComponentType<{ className?: string }>;
  fill: React.ComponentType<{ className?: string }>;
};

/**
 * Registry of RemixIcon components keyed by kebab-case name.
 * Only icons used by the design system are included for tree-shaking.
 * To add more: import from @remixicon/react and add to the map and IconName.
 */
export const iconRegistry: Record<string, IconRegistryEntry> = {
  home: { line: RiHomeLine, fill: RiHomeFill },
  search: { line: RiSearchLine, fill: RiSearchFill },
  bell: { line: RiBellLine, fill: RiBellFill },
  user: { line: RiUserLine, fill: RiUserFill },
  'arrow-left': { line: RiArrowLeftLine, fill: RiArrowLeftFill },
  x: { line: RiCloseLine, fill: RiCloseFill },
  'dots-vertical': { line: RiMore2Line, fill: RiMore2Fill },
  heart: { line: RiHeartLine, fill: RiHeartFill },
  car: { line: RiCarLine, fill: RiCarFill },
  calculator: { line: RiCalculatorLine, fill: RiCalculatorFill },
  'bar-chart': { line: RiBarChartLine, fill: RiBarChartFill },
};

export type IconName = keyof typeof iconRegistry;

export function getIconComponent(
  name: IconName,
  variant: 'line' | 'fill'
): React.ComponentType<{ className?: string }> {
  const entry = iconRegistry[name];
  if (!entry) return () => null;
  return variant === 'fill' ? entry.fill : entry.line;
}
