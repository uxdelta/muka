import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import { Avatar } from './Avatar';
import { AvatarGroup } from './AvatarGroup';
import { Icon } from '../Icon';
import { verifyThemeLoaded, verifyUsesTokens } from '../../.storybook/theme-test-utils';
import './Avatar.css';

const UserIcon = () => <Icon name="user" variant="line" size="md" />;

const meta: Meta<typeof Avatar> = {
  title: 'Components/Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Avatar Component

The Avatar component displays user representation with multiple fallback options:
1. Image (src) - Primary display if available
2. Icon (icon) - Custom icon fallback
3. Initials (name) - Generated from name
4. Default icon - Generic user icon

## Features
- 5 sizes: xs, sm, md, lg, xl
- 2 shapes: circle, square
- Status indicators: online, offline, busy, away
- Loading and error states
- Clickable support with keyboard accessibility
- AvatarGroup for stacked display with overflow

## Token Architecture
This component uses the following token layers:
- **Component tokens**: \`avatar.size.{size}\`, \`avatar.color.status.{status}\`
- **Semantic tokens**: \`color.surface.level2\`, \`color.text.default\`
- **Primitive tokens**: \`size.3xl\`, \`radius.full\`

When you change brand colors in the alias layer, all avatars automatically update!
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size variant',
    },
    shape: {
      control: { type: 'radio' },
      options: ['circle', 'square'],
      description: 'Shape variant',
    },
    status: {
      control: { type: 'select' },
      options: [undefined, 'online', 'offline', 'busy', 'away'],
      description: 'Status indicator',
    },
    statusPosition: {
      control: { type: 'radio' },
      options: ['top-right', 'bottom-right'],
      description: 'Status indicator position',
    },
    name: {
      control: { type: 'text' },
      description: 'Name for generating initials',
    },
    src: {
      control: { type: 'text' },
      description: 'Image source URL',
    },
    alt: {
      control: { type: 'text' },
      description: 'Alt text for image',
    },
  },
  args: {
    size: 'md',
    shape: 'circle',
    statusPosition: 'bottom-right',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'John Doe',
    name: 'John Doe',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <UserIcon />,
  },
};

export const WithInitials: Story = {
  args: {
    name: 'Jane Smith',
  },
};

export const SingleInitial: Story = {
  args: {
    name: 'Madonna',
  },
};

export const Fallback: Story = {
  args: {},
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar name="XS" size="xs" />
      <Avatar name="SM" size="sm" />
      <Avatar name="MD" size="md" />
      <Avatar name="LG" size="lg" />
      <Avatar name="XL" size="xl" />
    </div>
  ),
};

export const AllShapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar name="JD" shape="circle" size="lg" />
      <Avatar name="JD" shape="square" size="lg" />
    </div>
  ),
};

export const WithStatus: Story = {
  args: {
    name: 'John Doe',
    status: 'online',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar name="JD" status="online" size="lg" />
      <Avatar name="JD" status="offline" size="lg" />
      <Avatar name="JD" status="busy" size="lg" />
      <Avatar name="JD" status="away" size="lg" />
    </div>
  ),
};

export const StatusPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar name="JD" status="online" statusPosition="top-right" size="lg" />
      <Avatar name="JD" status="online" statusPosition="bottom-right" size="lg" />
    </div>
  ),
};

export const Clickable: Story = {
  args: {
    name: 'John Doe',
    onClick: () => alert('Avatar clicked!'),
  },
};

export const Loading: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'Loading user',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    await expect(canvas.getByRole('img')).toBeInTheDocument();
  },
};

export const ImageError: Story = {
  args: {
    src: 'https://invalid-url-that-will-fail.com/image.jpg',
    alt: 'Failed image',
    name: 'Fallback User',
  },
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar src="https://i.pravatar.cc/150?img=1" alt="User 1" />
      <Avatar src="https://i.pravatar.cc/150?img=2" alt="User 2" />
      <Avatar src="https://i.pravatar.cc/150?img=3" alt="User 3" />
      <Avatar name="User 4" />
      <Avatar name="User 5" />
    </AvatarGroup>
  ),
};

export const GroupAllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <AvatarGroup size="xs" max={4}>
        <Avatar name="A1" />
        <Avatar name="A2" />
        <Avatar name="A3" />
        <Avatar name="A4" />
        <Avatar name="A5" />
      </AvatarGroup>
      
      <AvatarGroup size="sm" max={4}>
        <Avatar name="B1" />
        <Avatar name="B2" />
        <Avatar name="B3" />
        <Avatar name="B4" />
        <Avatar name="B5" />
      </AvatarGroup>
      
      <AvatarGroup size="md" max={4}>
        <Avatar name="C1" />
        <Avatar name="C2" />
        <Avatar name="C3" />
        <Avatar name="C4" />
        <Avatar name="C5" />
      </AvatarGroup>
      
      <AvatarGroup size="lg" max={4}>
        <Avatar name="D1" />
        <Avatar name="D2" />
        <Avatar name="D3" />
        <Avatar name="D4" />
        <Avatar name="D5" />
      </AvatarGroup>
      
      <AvatarGroup size="xl" max={4}>
        <Avatar name="E1" />
        <Avatar name="E2" />
        <Avatar name="E3" />
        <Avatar name="E4" />
        <Avatar name="E5" />
      </AvatarGroup>
    </div>
  ),
};

export const GroupSpacing: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '8px' }}>Tight spacing</h4>
        <AvatarGroup spacing="tight" max={4}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
          <Avatar name="User 4" />
          <Avatar name="User 5" />
        </AvatarGroup>
      </div>
      
      <div>
        <h4 style={{ marginBottom: '8px' }}>Normal spacing</h4>
        <AvatarGroup spacing="normal" max={4}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
          <Avatar name="User 4" />
          <Avatar name="User 5" />
        </AvatarGroup>
      </div>
    </div>
  ),
};

export const GroupWithImages: Story = {
  render: () => (
    <AvatarGroup max={5} spacing="tight">
      <Avatar src="https://i.pravatar.cc/150?img=1" alt="User 1" />
      <Avatar src="https://i.pravatar.cc/150?img=2" alt="User 2" />
      <Avatar src="https://i.pravatar.cc/150?img=3" alt="User 3" />
      <Avatar src="https://i.pravatar.cc/150?img=4" alt="User 4" />
      <Avatar src="https://i.pravatar.cc/150?img=5" alt="User 5" />
      <Avatar src="https://i.pravatar.cc/150?img=6" alt="User 6" />
      <Avatar src="https://i.pravatar.cc/150?img=7" alt="User 7" />
    </AvatarGroup>
  ),
};

export const ComplexExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '12px' }}>User Profile</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Avatar 
            src="https://i.pravatar.cc/150?img=8" 
            alt="Sarah Johnson"
            size="xl"
            status="online"
            onClick={() => console.log('Profile clicked')}
          />
          <div>
            <h4 style={{ margin: 0 }}>Sarah Johnson</h4>
            <p style={{ margin: '4px 0 0', color: 'var(--color-text-muted-default)' }}>
              Product Designer
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '12px' }}>Team Members</h3>
        <AvatarGroup max={4} spacing="tight">
          <Avatar src="https://i.pravatar.cc/150?img=9" alt="Team member 1" status="online" />
          <Avatar src="https://i.pravatar.cc/150?img=10" alt="Team member 2" status="busy" />
          <Avatar name="John Smith" status="away" />
          <Avatar name="Emily Davis" status="offline" />
          <Avatar name="Michael Brown" />
          <Avatar name="Lisa Wilson" />
        </AvatarGroup>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '12px' }}>Different Content Types</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar src="https://i.pravatar.cc/150?img=11" alt="With image" size="lg" />
          <Avatar icon={<UserIcon />} size="lg" />
          <Avatar name="Jane Doe" size="lg" />
          <Avatar size="lg" />
        </div>
      </div>
    </div>
  ),
};

export const Accessibility: Story = {
  args: {
    name: 'Accessible User',
    'aria-label': 'User profile picture',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    const avatar = canvas.getByRole('img');
    await expect(avatar).toHaveAccessibleName('User profile picture');
  },
};

export const ThemeTest: Story = {
  args: {
    name: 'Theme Test',
  },
  play: async ({ canvasElement }) => {
    await verifyThemeLoaded();
    
    const canvas = within(canvasElement);
    const avatar = canvas.getByRole('img');
    
    await verifyUsesTokens(avatar, [
      'background-color',
      'color',
    ]);
  },
};
