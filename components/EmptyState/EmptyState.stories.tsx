import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Icon } from '../Icon';
import './EmptyState.css';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/Information/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# EmptyState

Zero-state component for displaying when no data is available.
Used for empty tables, search results, dashboards, and initial states.

- 3 sizes: sm, md, lg
- Supports custom icons and illustrations
- Primary and secondary action buttons
- Center or left alignment
- Accessible with proper ARIA attributes
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    align: {
      control: { type: 'radio' },
      options: ['center', 'left'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Playground: Story = {
  args: {
    title: 'No items yet',
    description: 'Get started by creating your first item.',
    size: 'md',
    align: 'center',
  },
};

export const WithIcon: Story = {
  name: 'With Icon',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <EmptyState
        icon={<Icon name="folder-open" variant="line" size="lg" />}
        title="No documents yet"
        description="Upload your first document to get started."
      />
      <EmptyState
        icon={<Icon name="search" variant="line" size="lg" />}
        title="No results found"
        description="Try adjusting your search or filter criteria."
        size="sm"
      />
    </div>
  ),
};

export const WithPrimaryAction: Story = {
  name: 'With Primary Action',
  render: () => (
    <EmptyState
      icon={<Icon name="folder-open" variant="line" size="lg" />}
      title="No documents yet"
      description="Upload your first document to get started."
      primaryAction={{
        label: 'Upload document',
        onClick: () => console.log('Upload clicked'),
        icon: <Icon name="upload" variant="line" size="sm" />,
      }}
    />
  ),
};

export const WithBothActions: Story = {
  name: 'With Both Actions',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <EmptyState
        icon={<Icon name="folder" variant="line" size="lg" />}
        title="No projects"
        description="Create your first project to begin tracking."
        primaryAction={{
          label: 'Create project',
          onClick: () => console.log('Create clicked'),
        }}
        secondaryAction={{
          label: 'Learn more',
          onClick: () => console.log('Learn more clicked'),
        }}
      />
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <p style={{ marginBottom: '1rem', fontWeight: 600 }}>Small</p>
        <EmptyState
          icon={<Icon name="inbox" variant="line" size="sm" />}
          title="No messages"
          description="Your inbox is empty."
          size="sm"
        />
      </div>
      <div>
        <p style={{ marginBottom: '1rem', fontWeight: 600 }}>Medium (Default)</p>
        <EmptyState
          icon={<Icon name="inbox" variant="line" size="md" />}
          title="No messages"
          description="Your inbox is empty."
          size="md"
        />
      </div>
      <div>
        <p style={{ marginBottom: '1rem', fontWeight: 600 }}>Large</p>
        <EmptyState
          icon={<Icon name="inbox" variant="line" size="lg" />}
          title="No messages"
          description="Your inbox is empty."
          size="lg"
        />
      </div>
    </div>
  ),
};

export const LeftAligned: Story = {
  name: 'Left Aligned',
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <EmptyState
        icon={<Icon name="file" variant="line" size="md" />}
        title="No files"
        description="Upload files to see them here."
        align="left"
        primaryAction={{
          label: 'Upload files',
          onClick: () => console.log('Upload clicked'),
        }}
        secondaryAction={{
          label: 'Browse examples',
          onClick: () => console.log('Browse clicked'),
        }}
      />
    </div>
  ),
};

export const WithCustomIllustration: Story = {
  name: 'With Custom Illustration',
  render: () => (
    <EmptyState
      illustration={
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="50" fill="currentColor" opacity="0.1" />
          <circle cx="60" cy="60" r="30" fill="currentColor" opacity="0.2" />
          <circle cx="60" cy="60" r="15" fill="currentColor" opacity="0.3" />
        </svg>
      }
      title="No data available"
      description="Start collecting data to see insights here."
      primaryAction={{
        label: 'Get started',
        onClick: () => console.log('Get started clicked'),
      }}
    />
  ),
};

export const SearchResults: Story = {
  name: 'Use Case: Search Results',
  render: () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <EmptyState
        icon={<Icon name="search" variant="line" size="md" />}
        title="No results found"
        description='We couldn\'t find any results matching your search criteria. Try adjusting your filters or search terms.'
        secondaryAction={{
          label: 'Clear filters',
          onClick: () => console.log('Clear filters clicked'),
        }}
        size="sm"
      />
    </div>
  ),
};

export const TableEmpty: Story = {
  name: 'Use Case: Empty Table',
  render: () => (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: '8px' }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid #e5e5e5' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Recent Orders</h3>
      </div>
      <div style={{ padding: '2rem' }}>
        <EmptyState
          icon={<Icon name="shopping-bag" variant="line" size="md" />}
          title="No orders yet"
          description="When you place orders, they will appear here."
          primaryAction={{
            label: 'Browse products',
            onClick: () => console.log('Browse clicked'),
          }}
          size="sm"
        />
      </div>
    </div>
  ),
};

export const DashboardWidget: Story = {
  name: 'Use Case: Dashboard Widget',
  render: () => (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '1.5rem', maxWidth: '400px' }}>
      <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600 }}>Recent Activity</h3>
      <EmptyState
        icon={<Icon name="pulse" variant="line" size="sm" />}
        title="No activity yet"
        description="Your recent activity will appear here."
        size="sm"
        align="center"
      />
    </div>
  ),
};

export const InitialSetup: Story = {
  name: 'Use Case: Initial Setup',
  render: () => (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
      <EmptyState
        icon={<Icon name="rocket" variant="line" size="lg" />}
        title="Welcome to your workspace"
        description="Let's get you started by creating your first project. You can customize it later."
        primaryAction={{
          label: 'Create your first project',
          onClick: () => console.log('Create project clicked'),
          icon: <Icon name="add" variant="line" size="sm" />,
        }}
        secondaryAction={{
          label: 'Take a tour',
          onClick: () => console.log('Tour clicked'),
        }}
        size="lg"
      />
    </div>
  ),
};

export const MinimalNoDescription: Story = {
  name: 'Minimal (No Description)',
  render: () => (
    <EmptyState
      icon={<Icon name="mail" variant="line" size="md" />}
      title="No messages"
      size="sm"
    />
  ),
};

export const NoIconOrIllustration: Story = {
  name: 'No Icon or Illustration',
  render: () => (
    <EmptyState
      title="Coming soon"
      description="This feature is not yet available. Check back later."
      size="md"
    />
  ),
};
