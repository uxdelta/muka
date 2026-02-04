import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '../../components/Card';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('renders children', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.querySelector('.muka-card')).toBeInTheDocument();
      expect(container.querySelector('.muka-card--padding-md')).toBeInTheDocument();
      expect(container.querySelector('.muka-card--radius-md')).toBeInTheDocument();
    });

    it('applies padding variants', () => {
      const { container, rerender } = render(<Card padding="sm">Content</Card>);
      expect(container.querySelector('.muka-card--padding-sm')).toBeInTheDocument();

      rerender(<Card padding="lg">Content</Card>);
      expect(container.querySelector('.muka-card--padding-lg')).toBeInTheDocument();

      rerender(<Card padding="none">Content</Card>);
      expect(container.querySelector('.muka-card--padding-none')).toBeInTheDocument();
    });

    it('applies radius variants', () => {
      const { container, rerender } = render(<Card radius="sm">Content</Card>);
      expect(container.querySelector('.muka-card--radius-sm')).toBeInTheDocument();

      rerender(<Card radius="lg">Content</Card>);
      expect(container.querySelector('.muka-card--radius-lg')).toBeInTheDocument();
    });

    it('renders as different semantic elements', () => {
      const { container, rerender } = render(<Card as="article">Content</Card>);
      expect(container.querySelector('article')).toBeInTheDocument();

      rerender(<Card as="section">Content</Card>);
      expect(container.querySelector('section')).toBeInTheDocument();

      rerender(<Card as="aside">Content</Card>);
      expect(container.querySelector('aside')).toBeInTheDocument();
    });
  });

  describe('Interactive Behavior', () => {
    it('becomes interactive when onClick is provided', () => {
      const { container } = render(<Card onClick={() => {}}>Content</Card>);
      expect(container.querySelector('.muka-card--interactive')).toBeInTheDocument();
    });

    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card onClick={handleClick}>Content</Card>);

      await user.click(screen.getByText('Content'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies selected state', () => {
      const { container } = render(<Card selected>Content</Card>);
      expect(container.querySelector('.muka-card--selected')).toBeInTheDocument();
    });

    it('applies pressed state on mouse down', () => {
      const { container } = render(<Card onClick={() => {}}>Content</Card>);
      const card = container.querySelector('.muka-card') as HTMLElement;

      fireEvent.mouseDown(card);
      expect(container.querySelector('.muka-card--pressed')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has role="button" when interactive', () => {
      render(<Card onClick={() => {}}>Content</Card>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has tabIndex={0} when interactive', () => {
      render(<Card onClick={() => {}}>Content</Card>);
      expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '0');
    });

    it('supports keyboard activation with Enter', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card onClick={handleClick}>Content</Card>);

      const card = screen.getByRole('button');
      card.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard activation with Space', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card onClick={handleClick}>Content</Card>);

      const card = screen.getByRole('button');
      card.focus();
      await user.keyboard('[Space]');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has aria-pressed when selected', () => {
      render(
        <Card onClick={() => {}} selected>
          Content
        </Card>
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    });

    it('has aria-disabled when disabled', () => {
      render(
        <Card onClick={() => {}} disabled>
          Content
        </Card>
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });

    it('has tabIndex={-1} when disabled', () => {
      render(
        <Card onClick={() => {}} disabled>
          Content
        </Card>
      );
      expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '-1');
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Card onClick={handleClick} disabled>
          Content
        </Card>
      );

      const card = container.querySelector('.muka-card') as HTMLElement;
      // Disabled cards have pointer-events: none and aria-disabled
      // Verify it doesn't have click handler bound and is properly disabled
      fireEvent.click(card);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('applies disabled class', () => {
      const { container } = render(
        <Card onClick={() => {}} disabled>
          Content
        </Card>
      );
      expect(container.querySelector('.muka-card--disabled')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(
        <Card onClick={() => {}} aria-label="Product card">
          Content
        </Card>
      );
      expect(screen.getByRole('button', { name: 'Product card' })).toBeInTheDocument();
    });

    it('supports aria-labelledby', () => {
      render(
        <>
          <h2 id="card-title">Card Title</h2>
          <Card onClick={() => {}} aria-labelledby="card-title">
            Content
          </Card>
        </>
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-labelledby', 'card-title');
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Card onClick={() => {}} aria-describedby="card-desc">
            Content
          </Card>
          <p id="card-desc">Description</p>
        </>
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-describedby', 'card-desc');
    });
  });
});
