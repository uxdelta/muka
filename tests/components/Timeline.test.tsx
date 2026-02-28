import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timeline } from '../../components/Timeline/Timeline';
import { TimelineItem } from '../../components/Timeline/TimelineItem';
import { TimelineSeparator } from '../../components/Timeline/TimelineSeparator';
import { TimelineContent } from '../../components/Timeline/TimelineContent';
import { TimelineIcon } from '../../components/Timeline/TimelineIcon';

const MockIcon = () => (
  <svg data-testid="mock-icon" width="16" height="16" viewBox="0 0 16 16">
    <circle cx="8" cy="8" r="4" />
  </svg>
);

describe('Timeline Component', () => {
  describe('Rendering', () => {
    it('renders timeline container', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline')).toBeInTheDocument();
    });

    it('renders vertical orientation by default', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline--vertical')).toBeInTheDocument();
    });

    it('renders horizontal orientation', () => {
      const { container } = render(
        <Timeline orientation="horizontal">
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline--horizontal')).toBeInTheDocument();
    });

    it('applies left alignment by default', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline--align-left')).toBeInTheDocument();
    });

    it('applies right alignment', () => {
      const { container } = render(
        <Timeline align="right">
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline--align-right')).toBeInTheDocument();
    });

    it('applies alternate alignment', () => {
      const { container } = render(
        <Timeline align="alternate">
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline--align-alternate')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <Timeline className="custom-class">
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('renders as ordered list for vertical', () => {
      const { container } = render(
        <Timeline orientation="vertical">
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('ol')).toBeInTheDocument();
    });

    it('renders as unordered list for horizontal', () => {
      const { container } = render(
        <Timeline orientation="horizontal">
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('ul')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has accessible timeline label', () => {
      render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(screen.getByLabelText('Timeline')).toBeInTheDocument();
    });

    it('horizontal timeline has list role', () => {
      const { container } = render(
        <Timeline orientation="horizontal">
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      const list = container.querySelector('ul');
      expect(list).toHaveAttribute('role', 'list');
    });
  });
});

describe('TimelineItem Component', () => {
  describe('Rendering', () => {
    it('renders timeline item', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline-item')).toBeInTheDocument();
    });

    it('applies upcoming status by default', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline-item--upcoming')).toBeInTheDocument();
    });

    it('applies completed status', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem status="completed">
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline-item--completed')).toBeInTheDocument();
    });

    it('applies current status', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem status="current">
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline-item--current')).toBeInTheDocument();
    });

    it('applies blocked status', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem status="blocked">
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline-item--blocked')).toBeInTheDocument();
    });

    it('stores date in data attribute when provided as string', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem date="2026-01-15">
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      const item = container.querySelector('.muka-timeline-item');
      expect(item).toHaveAttribute('data-date', '2026-01-15');
    });

    it('formats date when provided as Date object', () => {
      const date = new Date('2026-01-15');
      const { container } = render(
        <Timeline>
          <TimelineItem date={date}>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      const item = container.querySelector('.muka-timeline-item');
      expect(item).toHaveAttribute('data-date');
    });

    it('applies custom className', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem className="custom-item">
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.custom-item')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('sets aria-current for current status', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem status="current">
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      const item = container.querySelector('.muka-timeline-item');
      expect(item).toHaveAttribute('aria-current', 'step');
    });

    it('does not set aria-current for non-current items', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem status="completed">
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      const item = container.querySelector('.muka-timeline-item');
      expect(item).not.toHaveAttribute('aria-current');
    });

    it('stores status in data attribute', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem status="completed">
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      const item = container.querySelector('.muka-timeline-item');
      expect(item).toHaveAttribute('data-status', 'completed');
    });
  });
});

describe('TimelineSeparator Component', () => {
  describe('Rendering', () => {
    it('renders separator', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline-separator')).toBeInTheDocument();
    });

    it('applies solid variant by default', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline-separator--solid')).toBeInTheDocument();
    });

    it('applies dashed variant', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator variant="dashed" />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline-separator--dashed')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator className="custom-separator" />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.custom-separator')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('is hidden from screen readers', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      const separator = container.querySelector('.muka-timeline-separator');
      expect(separator).toHaveAttribute('aria-hidden', 'true');
    });
  });
});

describe('TimelineIcon Component', () => {
  describe('Rendering', () => {
    it('renders icon container', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline-icon')).toBeInTheDocument();
    });

    it('applies upcoming status by default', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline-icon--upcoming')).toBeInTheDocument();
    });

    it('applies completed status', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon status="completed" />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline-icon--completed')).toBeInTheDocument();
    });

    it('applies current status', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon status="current" />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline-icon--current')).toBeInTheDocument();
    });

    it('applies blocked status', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon status="blocked" />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline-icon--blocked')).toBeInTheDocument();
    });

    it('renders dot when no icon provided', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline-icon__dot')).toBeInTheDocument();
    });

    it('renders custom icon when provided', () => {
      render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon icon={<MockIcon />} />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon className="custom-icon" />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.custom-icon')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('is hidden from screen readers', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      const icon = container.querySelector('.muka-timeline-icon');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });
});

describe('TimelineContent Component', () => {
  describe('Rendering', () => {
    it('renders content container', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Test Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.muka-timeline-content')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>Test Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders complex children', () => {
      render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent>
              <h4>Heading</h4>
              <p>Description</p>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(screen.getByText('Heading')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineSeparator />
            <TimelineIcon />
            <TimelineContent className="custom-content">Content</TimelineContent>
          </TimelineItem>
        </Timeline>
      );
      expect(container.querySelector('.custom-content')).toBeInTheDocument();
    });
  });
});

describe('Timeline Integration', () => {
  it('renders multiple timeline items', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem status="completed">
          <TimelineSeparator />
          <TimelineIcon />
          <TimelineContent>Task 1</TimelineContent>
        </TimelineItem>
        <TimelineItem status="current">
          <TimelineSeparator />
          <TimelineIcon />
          <TimelineContent>Task 2</TimelineContent>
        </TimelineItem>
        <TimelineItem status="upcoming">
          <TimelineSeparator />
          <TimelineIcon />
          <TimelineContent>Task 3</TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    const items = container.querySelectorAll('.muka-timeline-item');
    expect(items).toHaveLength(3);
  });

  it('renders complete timeline structure', () => {
    render(
      <Timeline orientation="vertical" align="left">
        <TimelineItem status="completed" date="2026-01-15">
          <TimelineSeparator />
          <TimelineIcon icon={<MockIcon />} />
          <TimelineContent>
            <h4>Completed Task</h4>
            <p>Description</p>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem status="current">
          <TimelineSeparator variant="solid" />
          <TimelineIcon status="current" />
          <TimelineContent>Current Task</TimelineContent>
        </TimelineItem>
        <TimelineItem status="upcoming">
          <TimelineSeparator variant="dashed" />
          <TimelineIcon status="upcoming" />
          <TimelineContent>Future Task</TimelineContent>
        </TimelineItem>
      </Timeline>
    );

    expect(screen.getByText('Completed Task')).toBeInTheDocument();
    expect(screen.getByText('Current Task')).toBeInTheDocument();
    expect(screen.getByText('Future Task')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });
});
