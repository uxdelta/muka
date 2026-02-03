import React, { useState } from 'react';
import './Card.css';

export interface CardProps {
  /** Card content */
  children: React.ReactNode;

  /** Card variant */
  variant?: 'default' | 'interactive' | 'selected';

  /** Padding size — matches token system */
  padding?: 'sm' | 'md' | 'lg' | 'none';

  /** Border radius size */
  radius?: 'sm' | 'md' | 'lg';

  /** Semantic HTML element */
  as?: 'div' | 'article' | 'section' | 'aside';

  /** Click handler (makes card interactive) */
  onClick?: () => void;

  /** Selected state */
  selected?: boolean;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Card Component
 *
 * Built using the Muka design token system with support for:
 * - 3 variants: default, interactive, selected
 * - 3 padding sizes: sm, md, lg (plus none)
 * - 3 border radius sizes: sm, md, lg
 * - Interactive states: default, hover, pressed, selected
 * - Semantic HTML element support
 * - Multi-brand theming through design tokens
 *
 * Tokens used:
 * - card.color.{state}.{background|foreground|border}
 * - card.radius.{size}
 * - card.padding.{size}
 * - card.shadow.{state}
 * - card.border.{state}
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  radius = 'md',
  as = 'div',
  onClick,
  selected = false,
  className = '',
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const isInteractive = variant === 'interactive' || Boolean(onClick);
  const isSelected = variant === 'selected' || selected;
  const Element = as;

  const handleClick = () => {
    if (isInteractive && onClick) {
      onClick();
    }
  };

  const handleMouseDown = () => {
    if (isInteractive) setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleClick();
    }
  };

  const cardClasses = [
    'muka-card',
    `muka-card--padding-${padding}`,
    `muka-card--radius-${radius}`,
    isInteractive && 'muka-card--interactive',
    isSelected && 'muka-card--selected',
    isPressed && 'muka-card--pressed',
    className,
  ].filter(Boolean).join(' ');

  const interactiveProps = isInteractive
    ? {
        onClick: handleClick,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseLeave,
        onKeyDown: handleKeyDown,
        tabIndex: 0,
        role: 'button' as const,
      }
    : {};

  return (
    <Element className={cardClasses} {...interactiveProps} {...props}>
      {children}
    </Element>
  );
};

export default Card;
