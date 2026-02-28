import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from './Timeline';
import { TimelineItem } from './TimelineItem';
import { TimelineSeparator } from './TimelineSeparator';
import { TimelineContent } from './TimelineContent';
import { TimelineIcon } from './TimelineIcon';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import './Timeline.css';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Display/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Timeline Component

A flexible timeline component for displaying events, milestones, and progress.
Perfect for construction project tracking, order history, and process flows.

## Features

- Vertical and horizontal orientations
- Multiple alignment options (left, right, alternate)
- Status-based styling (completed, current, upcoming, blocked)
- Date display support
- Fully accessible with ARIA support
- Multi-brand theming through design tokens

## Usage

The Timeline component is a composite component with multiple sub-components:
- \`Timeline\` - Container component
- \`TimelineItem\` - Individual event/milestone
- \`TimelineSeparator\` - Connector line between items
- \`TimelineIcon\` - Status indicator circle
- \`TimelineContent\` - Content area for item details

## Status States

- **completed**: Past/finished events (green)
- **current**: Active/ongoing events (blue)
- **upcoming**: Future/planned events (gray)
- **blocked**: Stopped/blocked events (red)
        `,
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation',
    },
    align: {
      control: { type: 'radio' },
      options: ['left', 'right', 'alternate'],
      description: 'Content alignment (vertical only)',
    },
  },
  args: {
    orientation: 'vertical',
    align: 'left',
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Playground: Story = {
  render: (args) => (
    <Timeline {...args}>
      <TimelineItem status="completed" date="2026-01-15">
        <TimelineSeparator />
        <TimelineIcon />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Foundation Complete</h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
            All foundation work finished and inspected
          </p>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="current" date="2026-02-20">
        <TimelineSeparator />
        <TimelineIcon />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Framing In Progress</h4>
          <Badge variant="info">In Progress</Badge>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="upcoming" date="2026-03-15">
        <TimelineSeparator variant="dashed" />
        <TimelineIcon />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Electrical & Plumbing</h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
            Scheduled to begin mid-March
          </p>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};

export const AllStatusStates: Story = {
  name: 'Status States',
  render: () => (
    <Timeline orientation="vertical" align="left">
      <TimelineItem status="completed">
        <TimelineSeparator />
        <TimelineIcon />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Completed Task</h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
            This task has been completed successfully
          </p>
          <Badge variant="success">Completed</Badge>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="current">
        <TimelineSeparator />
        <TimelineIcon />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Current Task</h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
            This task is currently in progress
          </p>
          <Badge variant="info">In Progress</Badge>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="upcoming">
        <TimelineSeparator variant="dashed" />
        <TimelineIcon />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Upcoming Task</h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
            This task is planned for the future
          </p>
          <Badge variant="neutral">Upcoming</Badge>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="blocked">
        <TimelineSeparator variant="dashed" />
        <TimelineIcon />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Blocked Task</h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
            This task is blocked and cannot proceed
          </p>
          <Badge variant="error">Blocked</Badge>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};

export const WithCustomIcons: Story = {
  name: 'Custom Icons',
  render: () => (
    <Timeline orientation="vertical" align="left">
      <TimelineItem status="completed">
        <TimelineSeparator />
        <TimelineIcon icon={<Icon name="check" variant="fill" size="sm" />} />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Site Survey</h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
            Initial site assessment completed
          </p>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="completed">
        <TimelineSeparator />
        <TimelineIcon icon={<Icon name="home" variant="line" size="sm" />} />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Foundation Work</h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
            Foundation laid and cured
          </p>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="current">
        <TimelineSeparator />
        <TimelineIcon icon={<Icon name="star" variant="fill" size="sm" />} />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Framing</h4>
          <Badge variant="info">Week 3 of 4</Badge>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="upcoming">
        <TimelineSeparator variant="dashed" />
        <TimelineIcon icon={<Icon name="error-warning" variant="line" size="sm" />} />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Inspection Required</h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
            Scheduled for next week
          </p>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};

export const HorizontalOrientation: Story = {
  name: 'Horizontal Layout',
  render: () => (
    <Timeline orientation="horizontal">
      <TimelineItem status="completed">
        <TimelineIcon icon={<Icon name="check" variant="fill" size="sm" />} />
        <TimelineSeparator />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Planning</h4>
          <Badge variant="success" size="sm">Done</Badge>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="completed">
        <TimelineIcon icon={<Icon name="check" variant="fill" size="sm" />} />
        <TimelineSeparator />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Foundation</h4>
          <Badge variant="success" size="sm">Done</Badge>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="current">
        <TimelineIcon icon={<Icon name="star" variant="fill" size="sm" />} />
        <TimelineSeparator />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Framing</h4>
          <Badge variant="info" size="sm">Active</Badge>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="upcoming">
        <TimelineIcon />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Interior</h4>
          <Badge variant="neutral" size="sm">Planned</Badge>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};

export const AlternatingAlignment: Story = {
  name: 'Alternating Alignment',
  render: () => (
    <Timeline orientation="vertical" align="alternate">
      <TimelineItem status="completed" date="Jan 10, 2026">
        <TimelineSeparator />
        <TimelineIcon icon={<Icon name="check" variant="fill" size="sm" />} />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Permits Approved</h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
            All building permits received
          </p>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="completed" date="Jan 15, 2026">
        <TimelineSeparator />
        <TimelineIcon icon={<Icon name="check" variant="fill" size="sm" />} />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Excavation Complete</h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
            Site prepared and leveled
          </p>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="current" date="Feb 20, 2026">
        <TimelineSeparator />
        <TimelineIcon icon={<Icon name="star" variant="fill" size="sm" />} />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Structural Work</h4>
          <Badge variant="info">In Progress</Badge>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="upcoming" date="Mar 15, 2026">
        <TimelineSeparator variant="dashed" />
        <TimelineIcon />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>MEP Installation</h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
            Mechanical, electrical, and plumbing
          </p>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};

export const RightAlignment: Story = {
  name: 'Right Alignment',
  render: () => (
    <Timeline orientation="vertical" align="right">
      <TimelineItem status="completed" date="2026-01-15">
        <TimelineSeparator />
        <TimelineIcon icon={<Icon name="check" variant="fill" size="sm" />} />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Project Kickoff</h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
            Team assembled and roles assigned
          </p>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="current" date="2026-02-20">
        <TimelineSeparator />
        <TimelineIcon />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Development Phase</h4>
          <Badge variant="info">Week 2 of 8</Badge>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="upcoming" date="2026-04-01">
        <TimelineSeparator variant="dashed" />
        <TimelineIcon />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Testing & QA</h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
            Comprehensive testing phase
          </p>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};

export const ConstructionProject: Story = {
  name: 'Construction Project Example',
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <h3 style={{ marginTop: 0, marginBottom: '24px' }}>Project Timeline: New Building Construction</h3>
      <Timeline orientation="vertical" align="left">
        <TimelineItem status="completed" date="Jan 5, 2026">
          <TimelineSeparator />
          <TimelineIcon icon={<Icon name="check" variant="fill" size="sm" />} />
          <TimelineContent>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Site Preparation</h4>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
              Land clearing, grading, and utility setup complete
            </p>
            <div style={{ marginTop: '8px' }}>
              <Badge variant="success" size="sm">Completed</Badge>
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem status="completed" date="Jan 15, 2026">
          <TimelineSeparator />
          <TimelineIcon icon={<Icon name="check" variant="fill" size="sm" />} />
          <TimelineContent>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Foundation Work</h4>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
              Footings poured, foundation walls erected, waterproofing applied
            </p>
            <div style={{ marginTop: '8px' }}>
              <Badge variant="success" size="sm">Completed</Badge>
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem status="current" date="Feb 1 - Feb 28, 2026">
          <TimelineSeparator />
          <TimelineIcon icon={<Icon name="star" variant="fill" size="sm" />} />
          <TimelineContent>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Framing & Structural Work</h4>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
              Wood framing for walls, floors, and roof structure
            </p>
            <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Badge variant="info" size="sm">In Progress</Badge>
              <Badge variant="neutral" size="sm">Week 3/4</Badge>
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem status="upcoming" date="Mar 15, 2026">
          <TimelineSeparator variant="dashed" />
          <TimelineIcon />
          <TimelineContent>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>MEP Rough-In</h4>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
              Electrical wiring, plumbing pipes, HVAC ductwork installation
            </p>
            <div style={{ marginTop: '8px' }}>
              <Badge variant="neutral" size="sm">Scheduled</Badge>
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem status="upcoming" date="Apr 1, 2026">
          <TimelineSeparator variant="dashed" />
          <TimelineIcon />
          <TimelineContent>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Insulation & Drywall</h4>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
              Thermal insulation and interior wall finishing
            </p>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem status="upcoming" date="May 1, 2026">
          <TimelineSeparator variant="dashed" />
          <TimelineIcon />
          <TimelineContent>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Final Finishes</h4>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
              Flooring, painting, fixtures, and trim work
            </p>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  ),
};

export const WithBlockedItem: Story = {
  name: 'With Blocked Status',
  render: () => (
    <Timeline orientation="vertical" align="left">
      <TimelineItem status="completed">
        <TimelineSeparator />
        <TimelineIcon icon={<Icon name="check" variant="fill" size="sm" />} />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Design Phase</h4>
          <Badge variant="success">Completed</Badge>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="completed">
        <TimelineSeparator />
        <TimelineIcon icon={<Icon name="check" variant="fill" size="sm" />} />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Permit Application</h4>
          <Badge variant="success">Completed</Badge>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="blocked">
        <TimelineSeparator variant="dashed" />
        <TimelineIcon icon={<Icon name="error-warning" variant="fill" size="sm" />} />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Construction Start</h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-subtle-default)' }}>
            Waiting for permit approval from city
          </p>
          <div style={{ marginTop: '8px' }}>
            <Badge variant="error">Blocked</Badge>
          </div>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="upcoming">
        <TimelineSeparator variant="dashed" />
        <TimelineIcon />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Site Preparation</h4>
          <Badge variant="neutral">Planned</Badge>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};

export const Minimal: Story = {
  name: 'Minimal Example',
  render: () => (
    <Timeline>
      <TimelineItem status="completed">
        <TimelineSeparator />
        <TimelineIcon />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Task 1 Complete</h4>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="current">
        <TimelineSeparator />
        <TimelineIcon />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Task 2 In Progress</h4>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="upcoming">
        <TimelineSeparator />
        <TimelineIcon />
        <TimelineContent>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Task 3 Upcoming</h4>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};
