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

  /** Disabled state (prevents interaction) */
  disabled?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Accessible label for cards without visible text */
  'aria-label'?: string;

  /** ID of element that labels this card */
  'aria-labelledby'?: string;

  /** ID of element that describes this card */
  'aria-describedby'?: string;
}

/**
 * Card Component
 *
 * Built using the Muka design token system with support for:
 * - 3 variants: default, interactive, selected
 * - 3 padding sizes: sm, md, lg (plus none)
 * - 3 border radius sizes: sm, md, lg
 * - Interactive states: default, hover, pressed, selected, disabled
 * - Semantic HTML element support
 * - Multi-brand theming through design tokens
 *
 * @accessibility WCAG 2.1 AA compliant
 * - Interactive cards have role="button" for assistive technology
 * - Keyboard support: Enter and Space keys activate the card
 * - Focus indicator meets WCAG 2.4.7 (visible focus)
 * - aria-pressed indicates selected state for toggle behavior
 * - aria-disabled and tabIndex management for disabled state
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  radius = 'md',
  as = 'div',
  onClick,
  selected = false,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const isInteractive = (variant === 'interactive' || Boolean(onClick)) && !disabled;
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
    disabled && 'muka-card--disabled',
    className,
  ].filter(Boolean).join(' ');

  // Determine if this card should have interactive role (even if disabled)
  const hasInteractiveIntent = variant === 'interactive' || Boolean(onClick);

  const interactiveProps = hasInteractiveIntent
    ? {
        onClick: isInteractive ? handleClick : undefined,
        onMouseDown: isInteractive ? handleMouseDown : undefined,
        onMouseUp: isInteractive ? handleMouseUp : undefined,
        onMouseLeave: isInteractive ? handleMouseLeave : undefined,
        onKeyDown: isInteractive ? handleKeyDown : undefined,
        tabIndex: disabled ? -1 : 0,
        role: 'button' as const,
        'aria-pressed': isSelected || undefined,
        'aria-disabled': disabled || undefined,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        'aria-describedby': ariaDescribedby,
      }
    : {
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        'aria-describedby': ariaDescribedby,
      };

  return (
    <Element className={cardClasses} {...interactiveProps} {...props}>
      {children}
    </Element>
  );
};

export default Card;
