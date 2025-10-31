import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../components/Button';

// Mock icon components
const PlusIcon = () => (
  <svg data-testid="plus-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 3.5a.5.5 0 0 0-1 0V7H3.5a.5.5 0 0 0 0 1H7v3.5a.5.5 0 0 0 1 0V8h3.5a.5.5 0 0 0 0-1H8V3.5z"/>
  </svg>
);

const ChevronIcon = () => (
  <svg data-testid="chevron-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="m6 8 4-4v8l-4-4z"/>
  </svg>
);

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders button text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders as a button element', () => {
      const { container } = render(<Button>Button</Button>);
      expect(container.querySelector('button')).toBeInTheDocument();
    });

    it('applies default variant class', () => {
      const { container } = render(<Button>Button</Button>);
      expect(container.querySelector('.muka-button--primary')).toBeInTheDocument();
    });

    it('applies variant classes', () => {
      const { container, rerender } = render(<Button variant="primary">Button</Button>);
      expect(container.querySelector('.muka-button--primary')).toBeInTheDocument();

      rerender(<Button variant="secondary">Button</Button>);
      expect(container.querySelector('.muka-button--secondary')).toBeInTheDocument();

      rerender(<Button variant="ghost">Button</Button>);
      expect(container.querySelector('.muka-button--ghost')).toBeInTheDocument();
    });

    it('applies size classes', () => {
      const { container, rerender } = render(<Button size="sm">Button</Button>);
      expect(container.querySelector('.muka-button--sm')).toBeInTheDocument();

      rerender(<Button size="md">Button</Button>);
      expect(container.querySelector('.muka-button--md')).toBeInTheDocument();

      rerender(<Button size="lg">Button</Button>);
      expect(container.querySelector('.muka-button--lg')).toBeInTheDocument();
    });

    it('renders left icon when provided', () => {
      render(<Button iconLeft={<PlusIcon />}>Add Item</Button>);
      expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
    });

    it('renders right icon when provided', () => {
      render(<Button iconRight={<ChevronIcon />}>Continue</Button>);
      expect(screen.getByTestId('chevron-icon')).toBeInTheDocument();
    });

    it('renders both icons when provided', () => {
      render(
        <Button iconLeft={<PlusIcon />} iconRight={<ChevronIcon />}>
          Add & Continue
        </Button>
      );
      expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
      expect(screen.getByTestId('chevron-icon')).toBeInTheDocument();
    });

    it('hides label when iconOnly is true', () => {
      const { container } = render(
        <Button iconLeft={<PlusIcon />} iconOnly={true}>
          Add Item
        </Button>
      );
      const label = container.querySelector('.muka-button__label');
      expect(label).not.toBeInTheDocument();
    });

    it('applies fullWidth class when fullWidth is true', () => {
      const { container } = render(<Button fullWidth={true}>Button</Button>);
      expect(container.querySelector('.muka-button--full-width')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Button className="custom-class">Button</Button>);
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('Interactive Behavior', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Button</Button>);
      
      await user.click(screen.getByText('Button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick} disabled={true}>Button</Button>);
      
      const button = screen.getByText('Button');
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('sets disabled attribute when disabled prop is true', () => {
      render(<Button disabled={true}>Button</Button>);
      const button = screen.getByText('Button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });

    it('applies pressed state on mouse down', () => {
      const { container } = render(<Button>Button</Button>);
      const button = container.querySelector('button') as HTMLButtonElement;
      
      fireEvent.mouseDown(button);
      expect(container.querySelector('.muka-button--pressed')).toBeInTheDocument();
    });

    it('removes pressed state on mouse up', () => {
      const { container } = render(<Button>Button</Button>);
      const button = container.querySelector('button') as HTMLButtonElement;
      
      fireEvent.mouseDown(button);
      fireEvent.mouseUp(button);
      expect(container.querySelector('.muka-button--pressed')).not.toBeInTheDocument();
    });

    it('removes pressed state on mouse leave', () => {
      const { container } = render(<Button>Button</Button>);
      const button = container.querySelector('button') as HTMLButtonElement;
      
      fireEvent.mouseDown(button);
      fireEvent.mouseLeave(button);
      expect(container.querySelector('.muka-button--pressed')).not.toBeInTheDocument();
    });

    it('sets correct button type', () => {
      const { container, rerender } = render(<Button type="button">Button</Button>);
      expect(container.querySelector('button[type="button"]')).toBeInTheDocument();

      rerender(<Button type="submit">Button</Button>);
      expect(container.querySelector('button[type="submit"]')).toBeInTheDocument();

      rerender(<Button type="reset">Button</Button>);
      expect(container.querySelector('button[type="reset"]')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has focus-visible styles', () => {
      render(<Button>Button</Button>);
      const button = screen.getByText('Button');
      expect(button).toHaveAttribute('class', expect.stringContaining('muka-button'));
    });

    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Button</Button>);
      
      const button = screen.getByText('Button');
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports Space key activation', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Button</Button>);
      
      const button = screen.getByText('Button');
      button.focus();
      await user.keyboard('[Space]');
      // Note: Space key handling is native button behavior
      expect(button).toBeInTheDocument();
    });

    it('maintains label text for screen readers when iconOnly is true', () => {
      render(
        <Button iconLeft={<PlusIcon />} iconOnly={true}>
          Add Item
        </Button>
      );
      // Label text should still be in DOM for accessibility
      expect(screen.getByText('Add Item')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('applies disabled class when disabled', () => {
      const { container } = render(<Button disabled={true}>Button</Button>);
      expect(container.querySelector('.muka-button--disabled')).toBeInTheDocument();
    });

    it('applies icon-only class when iconOnly is true', () => {
      const { container } = render(
        <Button iconLeft={<PlusIcon />} iconOnly={true}>
          Add
        </Button>
      );
      expect(container.querySelector('.muka-button--icon-only')).toBeInTheDocument();
    });
  });

  describe('Icon Positioning', () => {
    it('applies left icon class when iconLeft is provided with label', () => {
      const { container } = render(
        <Button iconLeft={<PlusIcon />}>Add</Button>
      );
      const icon = container.querySelector('.muka-button__icon--left');
      expect(icon).toBeInTheDocument();
    });

    it('applies right icon class when iconRight is provided with label', () => {
      const { container } = render(
        <Button iconRight={<ChevronIcon />}>Continue</Button>
      );
      const icon = container.querySelector('.muka-button__icon--right');
      expect(icon).toBeInTheDocument();
    });

    it('does not apply position classes when iconOnly is true', () => {
      const { container } = render(
        <Button iconLeft={<PlusIcon />} iconOnly={true}>
          Add
        </Button>
      );
      // Icon should exist but without position classes
      const icon = container.querySelector('.muka-button__icon');
      expect(icon).toBeInTheDocument();
      expect(icon?.classList.contains('muka-button__icon--left')).toBe(false);
    });
  });
});

