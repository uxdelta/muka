import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmptyState } from '../../components/EmptyState';

const TestIcon = () => (
  <svg data-testid="test-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const TestIllustration = () => (
  <img data-testid="test-illustration" src="/test.svg" alt="" />
);

describe('EmptyState Component', () => {
  describe('Rendering', () => {
    it('renders title', () => {
      render(<EmptyState title="No items" />);
      expect(screen.getByText('No items')).toBeInTheDocument();
    });

    it('renders title as h3 element', () => {
      const { container } = render(<EmptyState title="No items" />);
      expect(container.querySelector('h3')).toBeInTheDocument();
      expect(container.querySelector('h3')).toHaveTextContent('No items');
    });

    it('renders description when provided', () => {
      render(<EmptyState title="No items" description="Add your first item" />);
      expect(screen.getByText('Add your first item')).toBeInTheDocument();
    });

    it('does not render description when not provided', () => {
      const { container } = render(<EmptyState title="No items" />);
      expect(container.querySelector('.muka-emptystate__description')).not.toBeInTheDocument();
    });

    it('renders icon when provided', () => {
      render(<EmptyState title="No items" icon={<TestIcon />} />);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders illustration when provided', () => {
      render(<EmptyState title="No items" illustration={<TestIllustration />} />);
      expect(screen.getByTestId('test-illustration')).toBeInTheDocument();
    });

    it('prefers illustration over icon when both provided', () => {
      render(
        <EmptyState
          title="No items"
          icon={<TestIcon />}
          illustration={<TestIllustration />}
        />
      );
      expect(screen.getByTestId('test-illustration')).toBeInTheDocument();
      expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
    });

    it('applies default size class', () => {
      const { container } = render(<EmptyState title="No items" />);
      expect(container.querySelector('.muka-emptystate--md')).toBeInTheDocument();
    });

    it('applies size classes', () => {
      const { container, rerender } = render(<EmptyState title="No items" size="sm" />);
      expect(container.querySelector('.muka-emptystate--sm')).toBeInTheDocument();

      rerender(<EmptyState title="No items" size="md" />);
      expect(container.querySelector('.muka-emptystate--md')).toBeInTheDocument();

      rerender(<EmptyState title="No items" size="lg" />);
      expect(container.querySelector('.muka-emptystate--lg')).toBeInTheDocument();
    });

    it('applies default alignment class', () => {
      const { container } = render(<EmptyState title="No items" />);
      expect(container.querySelector('.muka-emptystate--center')).toBeInTheDocument();
    });

    it('applies alignment classes', () => {
      const { container, rerender } = render(<EmptyState title="No items" align="center" />);
      expect(container.querySelector('.muka-emptystate--center')).toBeInTheDocument();

      rerender(<EmptyState title="No items" align="left" />);
      expect(container.querySelector('.muka-emptystate--left')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<EmptyState title="No items" className="custom-class" />);
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('renders primary action button', () => {
      render(
        <EmptyState
          title="No items"
          primaryAction={{
            label: 'Add item',
            onClick: vi.fn(),
          }}
        />
      );
      expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
    });

    it('renders secondary action button', () => {
      render(
        <EmptyState
          title="No items"
          secondaryAction={{
            label: 'Learn more',
            onClick: vi.fn(),
          }}
        />
      );
      expect(screen.getByRole('button', { name: 'Learn more' })).toBeInTheDocument();
    });

    it('renders both action buttons', () => {
      render(
        <EmptyState
          title="No items"
          primaryAction={{
            label: 'Add item',
            onClick: vi.fn(),
          }}
          secondaryAction={{
            label: 'Learn more',
            onClick: vi.fn(),
          }}
        />
      );
      expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Learn more' })).toBeInTheDocument();
    });

    it('does not render actions container when no actions provided', () => {
      const { container } = render(<EmptyState title="No items" />);
      expect(container.querySelector('.muka-emptystate__actions')).not.toBeInTheDocument();
    });

    it('calls primary action onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <EmptyState
          title="No items"
          primaryAction={{
            label: 'Add item',
            onClick: handleClick,
          }}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Add item' }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls secondary action onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <EmptyState
          title="No items"
          secondaryAction={{
            label: 'Learn more',
            onClick: handleClick,
          }}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Learn more' }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders primary action with icon', () => {
      render(
        <EmptyState
          title="No items"
          primaryAction={{
            label: 'Add item',
            onClick: vi.fn(),
            icon: <TestIcon />,
          }}
        />
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has role="status"', () => {
      const { container } = render(<EmptyState title="No items" />);
      expect(container.querySelector('[role="status"]')).toBeInTheDocument();
    });

    it('marks visual element as decorative', () => {
      const { container } = render(
        <EmptyState title="No items" icon={<TestIcon />} />
      );
      const visual = container.querySelector('.muka-emptystate__visual');
      expect(visual).toHaveAttribute('aria-hidden', 'true');
    });

    it('uses semantic heading for title', () => {
      render(<EmptyState title="No items" />);
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('No items');
    });

    it('action buttons are keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <EmptyState
          title="No items"
          primaryAction={{
            label: 'Add item',
            onClick: handleClick,
          }}
        />
      );

      const button = screen.getByRole('button', { name: 'Add item' });
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Content Composition', () => {
    it('renders with all props provided', () => {
      const { container } = render(
        <EmptyState
          title="No items"
          description="Add your first item"
          icon={<TestIcon />}
          primaryAction={{
            label: 'Add item',
            onClick: vi.fn(),
            icon: <TestIcon />,
          }}
          secondaryAction={{
            label: 'Learn more',
            onClick: vi.fn(),
          }}
          size="lg"
          align="left"
          className="custom"
        />
      );

      expect(screen.getByText('No items')).toBeInTheDocument();
      expect(screen.getByText('Add your first item')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Learn more' })).toBeInTheDocument();
      expect(container.querySelector('.muka-emptystate--lg')).toBeInTheDocument();
      expect(container.querySelector('.muka-emptystate--left')).toBeInTheDocument();
      expect(container.querySelector('.custom')).toBeInTheDocument();
    });

    it('renders minimal variant with only title', () => {
      const { container } = render(<EmptyState title="No items" />);
      
      expect(screen.getByText('No items')).toBeInTheDocument();
      expect(container.querySelector('.muka-emptystate__description')).not.toBeInTheDocument();
      expect(container.querySelector('.muka-emptystate__visual')).not.toBeInTheDocument();
      expect(container.querySelector('.muka-emptystate__actions')).not.toBeInTheDocument();
    });
  });

  describe('Button Variants and Sizes', () => {
    it('renders primary action with primary variant', () => {
      const { container } = render(
        <EmptyState
          title="No items"
          primaryAction={{
            label: 'Add item',
            onClick: vi.fn(),
          }}
        />
      );
      expect(container.querySelector('.muka-button--primary')).toBeInTheDocument();
    });

    it('renders secondary action with secondary variant', () => {
      const { container } = render(
        <EmptyState
          title="No items"
          secondaryAction={{
            label: 'Learn more',
            onClick: vi.fn(),
          }}
        />
      );
      expect(container.querySelector('.muka-button--secondary')).toBeInTheDocument();
    });

    it('passes size prop to action buttons', () => {
      const { container, rerender } = render(
        <EmptyState
          title="No items"
          size="sm"
          primaryAction={{
            label: 'Add item',
            onClick: vi.fn(),
          }}
        />
      );
      expect(container.querySelector('.muka-button--sm')).toBeInTheDocument();

      rerender(
        <EmptyState
          title="No items"
          size="lg"
          primaryAction={{
            label: 'Add item',
            onClick: vi.fn(),
          }}
        />
      );
      expect(container.querySelector('.muka-button--lg')).toBeInTheDocument();
    });
  });
});
