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
  RiArrowRightLine,
  RiArrowRightFill,
  RiArrowDownSLine,
  RiArrowDownSFill,
  RiArrowUpLine,
  RiArrowUpFill,
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
  RiAddLine,
  RiAddFill,
  RiInformationLine,
  RiInformationFill,
  RiCheckLine,
  RiCheckFill,
  RiErrorWarningLine,
  RiErrorWarningFill,
  RiFileTextLine,
  RiFileTextFill,
  RiLayoutGridLine,
  RiLayoutGridFill,
  RiStarLine,
  RiStarFill,
  RiMoonLine,
  RiMoonFill,
  RiSortAsc,
  RiSortDesc,
  RiShoppingCartLine,
  RiShoppingCartFill,
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
  'arrow-right': { line: RiArrowRightLine, fill: RiArrowRightFill },
  'arrow-down': { line: RiArrowDownSLine, fill: RiArrowDownSFill },
  'arrow-up': { line: RiArrowUpLine, fill: RiArrowUpFill },
  x: { line: RiCloseLine, fill: RiCloseFill },
  'dots-vertical': { line: RiMore2Line, fill: RiMore2Fill },
  heart: { line: RiHeartLine, fill: RiHeartFill },
  car: { line: RiCarLine, fill: RiCarFill },
  calculator: { line: RiCalculatorLine, fill: RiCalculatorFill },
  'bar-chart': { line: RiBarChartLine, fill: RiBarChartFill },
  add: { line: RiAddLine, fill: RiAddFill },
  information: { line: RiInformationLine, fill: RiInformationFill },
  check: { line: RiCheckLine, fill: RiCheckFill },
  'error-warning': { line: RiErrorWarningLine, fill: RiErrorWarningFill },
  'file-text': { line: RiFileTextLine, fill: RiFileTextFill },
  stack: { line: RiLayoutGridLine, fill: RiLayoutGridFill },
  star: { line: RiStarLine, fill: RiStarFill },
  moon: { line: RiMoonLine, fill: RiMoonFill },
  'sort-asc': { line: RiSortAsc, fill: RiSortAsc },   // Remix has single variant
  'sort-desc': { line: RiSortDesc, fill: RiSortDesc }, // Remix has single variant
  'shopping-cart': { line: RiShoppingCartLine, fill: RiShoppingCartFill },
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
