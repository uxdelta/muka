import React from 'react';
import * as RemixIcons from '@remixicon/react';

export type IconRegistryEntry = {
  line: React.ComponentType<{ className?: string }>;
  fill: React.ComponentType<{ className?: string }>;
};

/**
 * Convert PascalCase to kebab-case
 * e.g., "ArrowLeftS" -> "arrow-left-s"
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

const NullComponent: React.ComponentType<{ className?: string }> = function NullIcon() {
  return null;
};

/**
 * Auto-generated registry of all RemixIcon components.
 * Icons are keyed by kebab-case name (e.g., "arrow-left", "delete-bin-2", "more-2").
 *
 * Usage: <Icon name="arrow-left" variant="line" />
 *
 * Note: This includes all ~2,800 RemixIcons for development convenience.
 * Before production release, consider trimming to only used icons for smaller bundles.
 */
export const iconRegistry: Record<string, IconRegistryEntry> = {};

// Build registry from all RemixIcon exports
// Pattern: Ri{Name}Line, Ri{Name}Fill, or Ri{Name} (single-variant)
const iconExports = RemixIcons as Record<string, React.ComponentType<{ className?: string }>>;

const exportNames = Object.keys(iconExports);
for (let i = 0; i < exportNames.length; i++) {
  const exportName = exportNames[i];
  const Component = iconExports[exportName];

  if (!exportName.startsWith('Ri')) continue;
  if (typeof Component !== 'function') continue;

  const isLine = exportName.endsWith('Line');
  const isFill = exportName.endsWith('Fill');

  let baseName: string;
  if (isLine || isFill) {
    // Extract name: "RiArrowLeftLine" -> "ArrowLeft"
    baseName = exportName.slice(2, -4);
  } else {
    // Single-variant icon: "RiSortDesc" -> "SortDesc"
    baseName = exportName.slice(2);
  }

  const kebabName = toKebabCase(baseName);

  if (!iconRegistry[kebabName]) {
    iconRegistry[kebabName] = {
      line: NullComponent,
      fill: NullComponent,
    };
  }

  if (isLine) {
    iconRegistry[kebabName].line = Component;
  } else if (isFill) {
    iconRegistry[kebabName].fill = Component;
  } else {
    // Single-variant icons use the same component for both
    iconRegistry[kebabName].line = Component;
    iconRegistry[kebabName].fill = Component;
  }
}

// For icons without both variants, use the available one for both
const registryKeys = Object.keys(iconRegistry);
for (let i = 0; i < registryKeys.length; i++) {
  const entry = iconRegistry[registryKeys[i]];
  if (entry.line === NullComponent && entry.fill !== NullComponent) {
    entry.line = entry.fill;
  } else if (entry.fill === NullComponent && entry.line !== NullComponent) {
    entry.fill = entry.line;
  }
}

export type IconName = string;

export function getIconComponent(
  name: IconName,
  variant: 'line' | 'fill'
): React.ComponentType<{ className?: string }> {
  const entry = iconRegistry[name];
  if (!entry) return NullComponent;
  return variant === 'fill' ? entry.fill : entry.line;
}
