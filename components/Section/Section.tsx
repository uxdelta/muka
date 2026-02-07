import React from 'react';
import './Section.css';

export interface SectionProps {
  /** Section content */
  children: React.ReactNode;

  /** Padding density — uses layout tokens (section.padding.vertical/horizontal) */
  padding?: 'compact' | 'default' | 'spacious';

  /** Semantic HTML element */
  as?: 'section' | 'div' | 'aside';

  /** Additional CSS classes */
  className?: string;
}

/**
 * Section Component
 *
 * Layout primitive that applies consistent vertical and horizontal padding
 * from the Muka layout token system. Responsive values come from
 * mobile/tablet/desktop layout tokens.
 *
 * Tokens: section.padding.vertical.{compact|default|spacious},
 *        section.padding.horizontal.{compact|default|spacious}
 */
export const Section: React.FC<SectionProps> = ({
  children,
  padding = 'default',
  as: Element = 'section',
  className = '',
  ...props
}) => {
  const sectionClasses = [
    'muka-section',
    `muka-section--padding-${padding}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <Element className={sectionClasses} {...props}>
      {children}
    </Element>
  );
};

export default Section;
