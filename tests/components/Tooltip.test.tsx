import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from '../../components/Tooltip';
import { Button } from '../../components/Button';

describe('Tooltip Component', () => {
  describe('Rendering', () => {
    it('renders trigger element', () => {
      render(
        <Tooltip content="Test tooltip">
          <Button>Hover me</Button>
        </Tooltip>
      );
      expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
    });

    it('does not render tooltip content initially', () => {
      render(
        <Tooltip content="Test tooltip">
          <Button>Hover me</Button>
        </Tooltip>
      );
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('renders tooltip content on hover', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Test tooltip" delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await user.hover(button);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        expect(screen.getByText('Test tooltip')).toBeInTheDocument();
      });
    });

    it('renders rich content', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip
          content={
            <div>
              <strong>Title</strong>
              <p>Description</p>
            </div>
          }
          delayDuration={0}
        >
          <Button>Hover me</Button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
      });
    });

    it('applies default variant class', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Test tooltip" variant="default" delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      await waitFor(() => {
        const tooltip = document.querySelector('.muka-tooltip__content--default');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('applies contrast variant class', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Test tooltip" variant="contrast" delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      await waitFor(() => {
        const tooltip = document.querySelector('.muka-tooltip__content--contrast');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('applies custom className', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Test tooltip" className="custom-class" delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      await waitFor(() => {
        const tooltip = document.querySelector('.custom-class');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('renders arrow element', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Test tooltip" delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      await waitFor(() => {
        const arrow = document.querySelector('.muka-tooltip__arrow');
        expect(arrow).toBeInTheDocument();
      });
    });
  });

  describe('Positioning', () => {
    it('positions tooltip on top by default', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Test tooltip" delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      await waitFor(() => {
        const tooltip = document.querySelector('[data-side="top"]');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('positions tooltip on specified side', async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <Tooltip content="Test tooltip" side="right" delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      await waitFor(() => {
        const tooltip = document.querySelector('[data-side="right"]');
        expect(tooltip).toBeInTheDocument();
      });

      await user.unhover(screen.getByRole('button'));
      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });

      rerender(
        <Tooltip content="Test tooltip" side="bottom" delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      await waitFor(() => {
        const tooltip = document.querySelector('[data-side="bottom"]');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('aligns tooltip to center by default', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Test tooltip" delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      await waitFor(() => {
        const tooltip = document.querySelector('[data-align="center"]');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('aligns tooltip to specified alignment', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Test tooltip" align="start" delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      await waitFor(() => {
        const tooltip = document.querySelector('[data-align="start"]');
        expect(tooltip).toBeInTheDocument();
      });
    });
  });

  describe('Interactive Behavior', () => {
    it('shows tooltip on hover', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Test tooltip" delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await user.hover(button);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('hides tooltip on unhover', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Test tooltip" delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await user.hover(button);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      await user.unhover(button);

      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });

    it('shows tooltip on focus', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Test tooltip" delayDuration={0}>
          <Button>Focus me</Button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await user.tab();

      await waitFor(() => {
        expect(button).toHaveFocus();
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('respects delay duration', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Test tooltip" delayDuration={500}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await user.hover(button);

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      await waitFor(
        () => {
          expect(screen.getByRole('tooltip')).toBeInTheDocument();
        },
        { timeout: 600 }
      );
    });

    it('shows instantly when delayDuration is 0', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Test tooltip" delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await user.hover(button);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('does not render when disabled', () => {
      render(
        <Tooltip content="Test tooltip" disabled>
          <Button>Hover me</Button>
        </Tooltip>
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  describe('Controlled Mode', () => {
    it('supports controlled open state', async () => {
      const onOpenChange = vi.fn();
      const { rerender } = render(
        <Tooltip content="Test tooltip" open={false} onOpenChange={onOpenChange}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      rerender(
        <Tooltip content="Test tooltip" open={true} onOpenChange={onOpenChange}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('calls onOpenChange when state changes', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(
        <Tooltip content="Test tooltip" onOpenChange={onOpenChange} delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await user.hover(button);

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });

      await user.unhover(button);

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('Styling', () => {
    it('applies custom maxWidth style', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Test tooltip" maxWidth={200} delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      await waitFor(() => {
        const tooltip = document.querySelector('.muka-tooltip__content');
        expect(tooltip).toHaveStyle({ maxWidth: '200px' });
      });
    });

    it('accepts maxWidth as string', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Test tooltip" maxWidth="15rem" delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      await waitFor(() => {
        const tooltip = document.querySelector('.muka-tooltip__content');
        expect(tooltip).toHaveStyle({ maxWidth: '15rem' });
      });
    });
  });

  describe('Accessibility', () => {
    it('has correct role', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Test tooltip" delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Test tooltip" delayDuration={0}>
          <Button>Focus me</Button>
        </Tooltip>
      );

      await user.tab();

      await waitFor(() => {
        expect(screen.getByRole('button')).toHaveFocus();
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('supports Escape key to close', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Test tooltip" delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles empty content', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="" delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      await waitFor(() => {
        const tooltip = screen.queryByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('handles multiple children', () => {
      render(
        <Tooltip content="Test tooltip">
          <div>
            <Button>Button 1</Button>
          </div>
        </Tooltip>
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders correctly when disabled is toggled', async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <Tooltip content="Test tooltip" disabled delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      rerender(
        <Tooltip content="Test tooltip" disabled={false} delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      await user.hover(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });
  });
});
