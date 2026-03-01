import React from 'react';
import './Icon.css';
import { getIconComponent, type IconName } from './iconRegistry';

export type { IconName } from './iconRegistry';

export interface IconProps {
  /** Registered icon name (RemixIcon). Use with variant for line/fill. */
  name?: IconName;

  /** Icon style when using name. Default line. */
  variant?: 'line' | 'fill';

  /** SVG element or custom content. Use when not using name. */
  children?: React.ReactNode;

  /** Size variant — uses icon.size tokens */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /** Color variant — uses icon.color tokens for theme-aware colors */
  colorVariant?: 'default' | 'subtle' | 'muted' | 'inverse';

  /** Color override (overrides colorVariant) */
  color?: string;

  /** Accessible label (sets aria-label) */
  label?: string;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Icon Component
 *
 * Wrapper that enforces consistent sizing and color inheritance.
 * Supports two modes: name (RemixIcon from registry) or children (custom SVG).
 * Provide exactly one of name or children.
 *
 * Tokens used:
 * - icon.size.{xs|sm|default|lg}
 */
export const Icon: React.FC<IconProps> = ({
  name,
  variant = 'line',
  children,
  size = 'md',
  colorVariant,
  color,
  label,
  className = '',
  ...props
}) => {
  const iconClasses = [
    'muka-icon',
    `muka-icon--${size}`,
    colorVariant && colorVariant !== 'default' && `muka-icon--${colorVariant}`,
    className,
  ].filter(Boolean).join(' ');

  let content: React.ReactNode;
  if (name) {
    const IconComponent = getIconComponent(name, variant);
    content = <IconComponent />;
  } else if (children !== undefined && children !== null) {
    content = children;
  } else {
    content = null;
  }

  return (
    <span
      className={iconClasses}
      style={color ? { color } : undefined}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={!label}
      {...props}
    >
      {content}
    </span>
  );
};

export default Icon;
