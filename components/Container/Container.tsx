import React from 'react';
import './Container.css';

export interface ContainerProps {
  /** Container content */
  children: React.ReactNode;

  /** Max width — uses layout tokens (container.max-width) */
  maxWidth?: 'small' | 'medium' | 'large' | 'xlarge';

  /** Gap between direct children. Use "none" for max-width only (no flex). */
  gap?: 'none' | 'compact' | 'default' | 'spacious';

  /** Semantic HTML element */
  as?: 'div' | 'main' | 'article';

  /** Additional CSS classes */
  className?: string;
}

/**
 * Container Component
 *
 * Layout primitive that constrains content width and optionally applies gap
 * between children. Center-aligned by default. Use inside Section for
 * page-level layout.
 *
 * Tokens: container.max-width.{small|medium|large|xlarge},
 *        container.gap.{compact|default|spacious}
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'large',
  gap = 'none',
  as: Element = 'div',
  className = '',
  ...props
}) => {
  const containerClasses = [
    'muka-container',
    `muka-container--max-width-${maxWidth}`,
    `muka-container--gap-${gap}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <Element className={containerClasses} {...props}>
      {children}
    </Element>
  );
};

export default Container;
