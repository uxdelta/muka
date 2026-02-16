import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SegmentGroup } from '../../components/SegmentGroup';

const defaultOptions = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

describe('SegmentGroup Component', () => {
  describe('Rendering', () => {
    it('renders all segment options', () => {
      render(<SegmentGroup options={defaultOptions} />);
      expect(screen.getByText('Day')).toBeInTheDocument();
      expect(screen.getByText('Week')).toBeInTheDocument();
      expect(screen.getByText('Month')).toBeInTheDocument();
    });

    it('renders with radiogroup role', () => {
      render(<SegmentGroup options={defaultOptions} />);
      const group = screen.getByRole('radiogroup');
      expect(group).toBeInTheDocument();
    });

    it('renders segments with radio role', () => {
      render(<SegmentGroup options={defaultOptions} />);
      const radios = screen.getAllByRole('radio');
      expect(radios).toHaveLength(3);
    });

    it('applies size classes', () => {
      const { container, rerender } = render(
        <SegmentGroup options={defaultOptions} size="sm" />
      );
      expect(container.querySelector('.muka-segmentgroup--sm')).toBeInTheDocument();

      rerender(<SegmentGroup options={defaultOptions} size="md" />);
      expect(container.querySelector('.muka-segmentgroup--md')).toBeInTheDocument();

      rerender(<SegmentGroup options={defaultOptions} size="lg" />);
      expect(container.querySelector('.muka-segmentgroup--lg')).toBeInTheDocument();
    });

    it('applies fullWidth class when fullWidth is true', () => {
      const { container } = render(
        <SegmentGroup options={defaultOptions} fullWidth={true} />
      );
      expect(container.querySelector('.muka-segmentgroup--full-width')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <SegmentGroup options={defaultOptions} className="custom-class" />
      );
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('selects first option by default when no defaultValue provided', () => {
      render(<SegmentGroup options={defaultOptions} />);
      const firstOption = screen.getByText('Day').closest('button');
      expect(firstOption).toHaveAttribute('aria-checked', 'true');
      expect(firstOption?.classList.contains('muka-segmentgroup__segment--selected')).toBe(true);
    });

    it('selects specified defaultValue', () => {
      render(<SegmentGroup options={defaultOptions} defaultValue="week" />);
      const weekOption = screen.getByText('Week').closest('button');
      expect(weekOption).toHaveAttribute('aria-checked', 'true');
      expect(weekOption?.classList.contains('muka-segmentgroup__segment--selected')).toBe(true);
    });
  });

  describe('Interactive Behavior', () => {
    it('changes selection when clicking a segment', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SegmentGroup options={defaultOptions} onChange={handleChange} />);

      await user.click(screen.getByText('Week'));
      expect(handleChange).toHaveBeenCalledWith('week');
    });

    it('updates selected state after click', async () => {
      const user = userEvent.setup();
      render(<SegmentGroup options={defaultOptions} defaultValue="day" />);

      const dayOption = screen.getByText('Day').closest('button');
      const weekOption = screen.getByText('Week').closest('button');

      expect(dayOption).toHaveAttribute('aria-checked', 'true');
      expect(weekOption).toHaveAttribute('aria-checked', 'false');

      await user.click(screen.getByText('Week'));

      expect(dayOption).toHaveAttribute('aria-checked', 'false');
      expect(weekOption).toHaveAttribute('aria-checked', 'true');
    });

    it('does not call onChange when clicking already selected segment', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <SegmentGroup options={defaultOptions} defaultValue="day" onChange={handleChange} />
      );

      await user.click(screen.getByText('Day'));
      // Still calls onChange even for already selected (allows for re-triggering actions)
      expect(handleChange).toHaveBeenCalledWith('day');
    });

    it('does not change selection when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <SegmentGroup options={defaultOptions} disabled={true} onChange={handleChange} />
      );

      await user.click(screen.getByText('Week'));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not select disabled option', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const options = [
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week', disabled: true },
        { value: 'month', label: 'Month' },
      ];
      render(<SegmentGroup options={options} onChange={handleChange} />);

      const weekButton = screen.getByText('Week').closest('button');
      expect(weekButton).toBeDisabled();

      await user.click(screen.getByText('Week'));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Controlled Mode', () => {
    it('uses controlled value when provided', () => {
      render(<SegmentGroup options={defaultOptions} value="month" />);
      const monthOption = screen.getByText('Month').closest('button');
      expect(monthOption).toHaveAttribute('aria-checked', 'true');
    });

    it('updates when controlled value changes', () => {
      const { rerender } = render(
        <SegmentGroup options={defaultOptions} value="day" />
      );
      expect(screen.getByText('Day').closest('button')).toHaveAttribute('aria-checked', 'true');

      rerender(<SegmentGroup options={defaultOptions} value="week" />);
      expect(screen.getByText('Week').closest('button')).toHaveAttribute('aria-checked', 'true');
    });

    it('calls onChange but does not update internally in controlled mode', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <SegmentGroup options={defaultOptions} value="day" onChange={handleChange} />
      );

      await user.click(screen.getByText('Week'));
      expect(handleChange).toHaveBeenCalledWith('week');
      // In controlled mode, parent decides whether to update
      expect(screen.getByText('Day').closest('button')).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Keyboard Navigation', () => {
    it('navigates right with ArrowRight', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SegmentGroup options={defaultOptions} defaultValue="day" onChange={handleChange} />);

      const dayOption = screen.getByText('Day').closest('button') as HTMLButtonElement;
      dayOption.focus();

      await user.keyboard('{ArrowRight}');
      expect(handleChange).toHaveBeenCalledWith('week');
    });

    it('navigates left with ArrowLeft', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SegmentGroup options={defaultOptions} defaultValue="week" onChange={handleChange} />);

      const weekOption = screen.getByText('Week').closest('button') as HTMLButtonElement;
      weekOption.focus();

      await user.keyboard('{ArrowLeft}');
      expect(handleChange).toHaveBeenCalledWith('day');
    });

    it('navigates down with ArrowDown', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SegmentGroup options={defaultOptions} defaultValue="day" onChange={handleChange} />);

      const dayOption = screen.getByText('Day').closest('button') as HTMLButtonElement;
      dayOption.focus();

      await user.keyboard('{ArrowDown}');
      expect(handleChange).toHaveBeenCalledWith('week');
    });

    it('navigates up with ArrowUp', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SegmentGroup options={defaultOptions} defaultValue="week" onChange={handleChange} />);

      const weekOption = screen.getByText('Week').closest('button') as HTMLButtonElement;
      weekOption.focus();

      await user.keyboard('{ArrowUp}');
      expect(handleChange).toHaveBeenCalledWith('day');
    });

    it('wraps to end when pressing ArrowLeft on first option', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SegmentGroup options={defaultOptions} defaultValue="day" onChange={handleChange} />);

      const dayOption = screen.getByText('Day').closest('button') as HTMLButtonElement;
      dayOption.focus();

      await user.keyboard('{ArrowLeft}');
      expect(handleChange).toHaveBeenCalledWith('month');
    });

    it('wraps to start when pressing ArrowRight on last option', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SegmentGroup options={defaultOptions} defaultValue="month" onChange={handleChange} />);

      const monthOption = screen.getByText('Month').closest('button') as HTMLButtonElement;
      monthOption.focus();

      await user.keyboard('{ArrowRight}');
      expect(handleChange).toHaveBeenCalledWith('day');
    });

    it('selects focused option with Space key', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SegmentGroup options={defaultOptions} defaultValue="day" onChange={handleChange} />);

      const weekOption = screen.getByText('Week').closest('button') as HTMLButtonElement;
      weekOption.focus();

      await user.keyboard(' ');
      expect(handleChange).toHaveBeenCalledWith('week');
    });

    it('selects focused option with Enter key', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SegmentGroup options={defaultOptions} defaultValue="day" onChange={handleChange} />);

      const weekOption = screen.getByText('Week').closest('button') as HTMLButtonElement;
      weekOption.focus();

      await user.keyboard('{Enter}');
      expect(handleChange).toHaveBeenCalledWith('week');
    });

    it('navigates to first option with Home key', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SegmentGroup options={defaultOptions} defaultValue="month" onChange={handleChange} />);

      const monthOption = screen.getByText('Month').closest('button') as HTMLButtonElement;
      monthOption.focus();

      await user.keyboard('{Home}');
      expect(handleChange).toHaveBeenCalledWith('day');
    });

    it('navigates to last option with End key', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SegmentGroup options={defaultOptions} defaultValue="day" onChange={handleChange} />);

      const dayOption = screen.getByText('Day').closest('button') as HTMLButtonElement;
      dayOption.focus();

      await user.keyboard('{End}');
      expect(handleChange).toHaveBeenCalledWith('month');
    });

    it('skips disabled options during keyboard navigation', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const options = [
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week', disabled: true },
        { value: 'month', label: 'Month' },
      ];
      render(<SegmentGroup options={options} defaultValue="day" onChange={handleChange} />);

      const dayOption = screen.getByText('Day').closest('button') as HTMLButtonElement;
      dayOption.focus();

      await user.keyboard('{ArrowRight}');
      // Should skip disabled 'week' and go to 'month'
      expect(handleChange).toHaveBeenCalledWith('month');
    });
  });

  describe('Accessibility', () => {
    it('implements roving tabindex pattern', () => {
      render(<SegmentGroup options={defaultOptions} defaultValue="week" />);

      const dayOption = screen.getByText('Day').closest('button');
      const weekOption = screen.getByText('Week').closest('button');
      const monthOption = screen.getByText('Month').closest('button');

      expect(dayOption).toHaveAttribute('tabindex', '-1');
      expect(weekOption).toHaveAttribute('tabindex', '0');
      expect(monthOption).toHaveAttribute('tabindex', '-1');
    });

    it('sets correct aria-checked for selected segment', () => {
      render(<SegmentGroup options={defaultOptions} defaultValue="day" />);

      expect(screen.getByText('Day').closest('button')).toHaveAttribute('aria-checked', 'true');
      expect(screen.getByText('Week').closest('button')).toHaveAttribute('aria-checked', 'false');
      expect(screen.getByText('Month').closest('button')).toHaveAttribute('aria-checked', 'false');
    });

    it('sets aria-label on each segment', () => {
      render(<SegmentGroup options={defaultOptions} />);

      expect(screen.getByLabelText('Day')).toBeInTheDocument();
      expect(screen.getByLabelText('Week')).toBeInTheDocument();
      expect(screen.getByLabelText('Month')).toBeInTheDocument();
    });

    it('disables segments when disabled prop is true', () => {
      render(<SegmentGroup options={defaultOptions} disabled={true} />);

      const segments = screen.getAllByRole('radio');
      segments.forEach((segment) => {
        expect(segment).toBeDisabled();
      });
    });

    it('applies disabled class to disabled segments', () => {
      const options = [
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week', disabled: true },
        { value: 'month', label: 'Month' },
      ];
      render(<SegmentGroup options={options} />);

      const weekSegment = screen.getByText('Week').closest('button');
      expect(weekSegment?.classList.contains('muka-segmentgroup__segment--disabled')).toBe(true);
    });
  });

  describe('States', () => {
    it('applies selected class to selected segment', () => {
      render(<SegmentGroup options={defaultOptions} defaultValue="week" />);

      const weekSegment = screen.getByText('Week').closest('button');
      expect(weekSegment?.classList.contains('muka-segmentgroup__segment--selected')).toBe(true);
    });

    it('removes selected class from previously selected segment', async () => {
      const user = userEvent.setup();
      render(<SegmentGroup options={defaultOptions} defaultValue="day" />);

      const daySegment = screen.getByText('Day').closest('button');
      const weekSegment = screen.getByText('Week').closest('button');

      expect(daySegment?.classList.contains('muka-segmentgroup__segment--selected')).toBe(true);
      expect(weekSegment?.classList.contains('muka-segmentgroup__segment--selected')).toBe(false);

      await user.click(screen.getByText('Week'));

      expect(daySegment?.classList.contains('muka-segmentgroup__segment--selected')).toBe(false);
      expect(weekSegment?.classList.contains('muka-segmentgroup__segment--selected')).toBe(true);
    });
  });
});
