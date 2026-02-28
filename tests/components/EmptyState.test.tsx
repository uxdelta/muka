import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmptyState } from '../../components/EmptyState';

const TestIcon = () => (
  <svg data-testid="test-icon" width="24" height="24" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const TestIllustration = () => (
  <img data-testid="test-illustration" src="/test.svg" alt="" />
);

describe('EmptyState Component', () => {
  describe('Rendering', () => {
    it('renders title', () => {
      render(<EmptyState title="No data" />);
      expect(screen.getByText('No data')).toBeInTheDocument();
    });

    it('renders title as h3 element', () => {
      const { container } = render(<EmptyState title="No data" />);
      const title = container.querySelector('h3');
      expect(title).toBeInTheDocument();
      expect(title?.textContent).toBe('No data');
    });

    it('renders description when provided', () => {
      render(<EmptyState title="No data" description="Nothing to show" />);
      expect(screen.getByText('Nothing to show')).toBeInTheDocument();
    });

    it('does not render description when not provided', () => {
      const { container } = render(<EmptyState title="No data" />);
      const description = container.querySelector('.muka-emptystate__description');
      expect(description).not.toBeInTheDocument();
    });

    it('renders icon when provided', () => {
      render(<EmptyState title="No data" icon={<TestIcon />} />);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders illustration when provided', () => {
      render(<EmptyState title="No data" illustration={<TestIllustration />} />);
      expect(screen.getByTestId('test-illustration')).toBeInTheDocument();
    });

    it('prefers illustration over icon when both provided', () => {
      render(
        <EmptyState 
          title="No data" 
          icon={<TestIcon />}
          illustration={<TestIllustration />}
        />
      );
      expect(screen.getByTestId('test-illustration')).toBeInTheDocument();
      expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
    });

    it('applies default size class', () => {
      const { container } = render(<EmptyState title="No data" />);
      expect(container.querySelector('.muka-emptystate--md')).toBeInTheDocument();
    });

    it('applies size classes', () => {
      const { container, rerender } = render(<EmptyState title="No data" size="sm" />);
      expect(container.querySelector('.muka-emptystate--sm')).toBeInTheDocument();

      rerender(<EmptyState title="No data" size="md" />);
      expect(container.querySelector('.muka-emptystate--md')).toBeInTheDocument();

      rerender(<EmptyState title="No data" size="lg" />);
      expect(container.querySelector('.muka-emptystate--lg')).toBeInTheDocument();
    });

    it('applies default alignment class', () => {
      const { container } = render(<EmptyState title="No data" />);
      expect(container.querySelector('.muka-emptystate--center')).toBeInTheDocument();
    });

    it('applies alignment classes', () => {
      const { container, rerender } = render(<EmptyState title="No data" align="center" />);
      expect(container.querySelector('.muka-emptystate--center')).toBeInTheDocument();

      rerender(<EmptyState title="No data" align="left" />);
      expect(container.querySelector('.muka-emptystate--left')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<EmptyState title="No data" className="custom-class" />);
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('renders primary action when provided', () => {
      const handleClick = vi.fn();
      render(
        <EmptyState
          title="No data"
          primaryAction={{
            label: 'Add item',
            onClick: handleClick,
          }}
        />
      );
      expect(screen.getByText('Add item')).toBeInTheDocument();
    });

    it('renders secondary action when provided', () => {
      const handleClick = vi.fn();
      render(
        <EmptyState
          title="No data"
          secondaryAction={{
            label: 'Learn more',
            onClick: handleClick,
          }}
        />
      );
      expect(screen.getByText('Learn more')).toBeInTheDocument();
    });

    it('renders both actions when provided', () => {
      const handlePrimary = vi.fn();
      const handleSecondary = vi.fn();
      render(
        <EmptyState
          title="No data"
          primaryAction={{
            label: 'Primary',
            onClick: handlePrimary,
          }}
          secondaryAction={{
            label: 'Secondary',
            onClick: handleSecondary,
          }}
        />
      );
      expect(screen.getByText('Primary')).toBeInTheDocument();
      expect(screen.getByText('Secondary')).toBeInTheDocument();
    });

    it('renders primary action icon when provided', () => {
      const handleClick = vi.fn();
      render(
        <EmptyState
          title="No data"
          primaryAction={{
            label: 'Add',
            onClick: handleClick,
            icon: <TestIcon />,
          }}
        />
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('calls onClick when primary action clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <EmptyState
          title="No data"
          primaryAction={{
            label: 'Add item',
            onClick: handleClick,
          }}
        />
      );
      
      await user.click(screen.getByText('Add item'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick when secondary action clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <EmptyState
          title="No data"
          secondaryAction={{
            label: 'Learn more',
            onClick: handleClick,
          }}
        />
      );
      
      await user.click(screen.getByText('Learn more'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not render actions container when no actions provided', () => {
      const { container } = render(<EmptyState title="No data" />);
      const actions = container.querySelector('.muka-emptystate__actions');
      expect(actions).not.toBeInTheDocument();
    });

    it('applies correct button classes', () => {
      const { container } = render(
        <EmptyState
          title="No data"
          primaryAction={{
            label: 'Primary',
            onClick: vi.fn(),
          }}
          secondaryAction={{
            label: 'Secondary',
            onClick: vi.fn(),
          }}
        />
      );
      
      const primaryButton = container.querySelector('.muka-emptystate__action--primary');
      const secondaryButton = container.querySelector('.muka-emptystate__action--secondary');
      
      expect(primaryButton).toBeInTheDocument();
      expect(secondaryButton).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has role="status" attribute', () => {
      const { container } = render(<EmptyState title="No data" />);
      const emptyState = container.querySelector('.muka-emptystate');
      expect(emptyState).toHaveAttribute('role', 'status');
    });

    it('uses h3 for title for proper heading hierarchy', () => {
      render(<EmptyState title="No data" />);
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toBeInTheDocument();
      expect(title.textContent).toBe('No data');
    });

    it('action buttons are keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <EmptyState
          title="No data"
          primaryAction={{
            label: 'Add item',
            onClick: handleClick,
          }}
        />
      );

      const button = screen.getByRole('button', { name: /Add item/i });
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('action buttons have type="button"', () => {
      render(
        <EmptyState
          title="No data"
          primaryAction={{
            label: 'Add',
            onClick: vi.fn(),
          }}
        />
      );

      const button = screen.getByRole('button', { name: /Add/i });
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('Layout', () => {
    it('renders visual container when icon provided', () => {
      const { container } = render(
        <EmptyState title="No data" icon={<TestIcon />} />
      );
      const visual = container.querySelector('.muka-emptystate__visual');
      expect(visual).toBeInTheDocument();
    });

    it('renders visual container when illustration provided', () => {
      const { container } = render(
        <EmptyState title="No data" illustration={<TestIllustration />} />
      );
      const visual = container.querySelector('.muka-emptystate__visual');
      expect(visual).toBeInTheDocument();
    });

    it('does not render visual container when no icon or illustration', () => {
      const { container } = render(<EmptyState title="No data" />);
      const visual = container.querySelector('.muka-emptystate__visual');
      expect(visual).not.toBeInTheDocument();
    });

    it('renders content container', () => {
      const { container } = render(<EmptyState title="No data" />);
      const content = container.querySelector('.muka-emptystate__content');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('renders with all elements in correct order', () => {
      const { container } = render(
        <EmptyState
          title="No data"
          description="Nothing here"
          icon={<TestIcon />}
          primaryAction={{
            label: 'Add',
            onClick: vi.fn(),
          }}
        />
      );

      const emptyState = container.querySelector('.muka-emptystate');
      const children = emptyState?.children;

      expect(children?.[0]).toHaveClass('muka-emptystate__visual');
      expect(children?.[1]).toHaveClass('muka-emptystate__content');
      expect(children?.[2]).toHaveClass('muka-emptystate__actions');
    });

    it('maintains structure with minimal props', () => {
      const { container } = render(<EmptyState title="No data" />);
      
      const emptyState = container.querySelector('.muka-emptystate');
      expect(emptyState).toBeInTheDocument();

      const content = container.querySelector('.muka-emptystate__content');
      expect(content).toBeInTheDocument();
    });
  });
});
