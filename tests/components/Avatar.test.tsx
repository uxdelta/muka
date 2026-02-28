import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Avatar } from '../../components/Avatar/Avatar';
import { AvatarGroup } from '../../components/Avatar/AvatarGroup';

const UserIcon = () => (
  <svg data-testid="user-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

describe('Avatar Component', () => {
  describe('Rendering', () => {
    it('renders with initials from name', () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders with single initial for single name', () => {
      render(<Avatar name="Madonna" />);
      expect(screen.getByText('M')).toBeInTheDocument();
    });

    it('renders with image when src is provided', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User avatar" />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
      expect(img).toHaveAttribute('alt', 'User avatar');
    });

    it('renders with custom icon', () => {
      render(<Avatar icon={<UserIcon />} />);
      expect(screen.getByTestId('user-icon')).toBeInTheDocument();
    });

    it('renders fallback icon when no content provided', () => {
      const { container } = render(<Avatar />);
      expect(container.querySelector('.muka-avatar__fallback')).toBeInTheDocument();
    });

    it('applies default size and shape classes', () => {
      const { container } = render(<Avatar name="JD" />);
      expect(container.querySelector('.muka-avatar--md')).toBeInTheDocument();
      expect(container.querySelector('.muka-avatar--circle')).toBeInTheDocument();
    });

    it('applies size classes', () => {
      const { container, rerender } = render(<Avatar name="JD" size="xs" />);
      expect(container.querySelector('.muka-avatar--xs')).toBeInTheDocument();

      rerender(<Avatar name="JD" size="sm" />);
      expect(container.querySelector('.muka-avatar--sm')).toBeInTheDocument();

      rerender(<Avatar name="JD" size="md" />);
      expect(container.querySelector('.muka-avatar--md')).toBeInTheDocument();

      rerender(<Avatar name="JD" size="lg" />);
      expect(container.querySelector('.muka-avatar--lg')).toBeInTheDocument();

      rerender(<Avatar name="JD" size="xl" />);
      expect(container.querySelector('.muka-avatar--xl')).toBeInTheDocument();
    });

    it('applies shape classes', () => {
      const { container, rerender } = render(<Avatar name="JD" shape="circle" />);
      expect(container.querySelector('.muka-avatar--circle')).toBeInTheDocument();

      rerender(<Avatar name="JD" shape="square" />);
      expect(container.querySelector('.muka-avatar--square')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Avatar name="JD" className="custom-avatar" />);
      expect(container.querySelector('.custom-avatar')).toBeInTheDocument();
    });
  });

  describe('Fallback Chain', () => {
    it('shows image over icon when both provided', () => {
      const { container } = render(
        <Avatar 
          src="https://example.com/avatar.jpg" 
          alt="User" 
          icon={<UserIcon />} 
        />
      );
      expect(container.querySelector('.muka-avatar__image')).toBeInTheDocument();
      expect(screen.queryByTestId('user-icon')).not.toBeInTheDocument();
    });

    it('shows icon when image fails to load', async () => {
      const { container } = render(
        <Avatar 
          src="https://invalid-url.com/avatar.jpg" 
          alt="User" 
          icon={<UserIcon />}
        />
      );
      
      const img = container.querySelector('.muka-avatar__image') as HTMLImageElement;
      fireEvent.error(img);

      await waitFor(() => {
        expect(screen.getByTestId('user-icon')).toBeInTheDocument();
      });
    });

    it('shows initials when image fails and no icon provided', async () => {
      const { container } = render(
        <Avatar 
          src="https://invalid-url.com/avatar.jpg" 
          alt="User" 
          name="John Doe"
        />
      );
      
      const img = container.querySelector('.muka-avatar__image') as HTMLImageElement;
      fireEvent.error(img);

      await waitFor(() => {
        expect(screen.getByText('JD')).toBeInTheDocument();
      });
    });

    it('shows fallback icon when all else fails', async () => {
      const { container } = render(
        <Avatar src="https://invalid-url.com/avatar.jpg" alt="User" />
      );
      
      const img = container.querySelector('.muka-avatar__image') as HTMLImageElement;
      fireEvent.error(img);

      await waitFor(() => {
        expect(container.querySelector('.muka-avatar__fallback')).toBeInTheDocument();
      });
    });
  });

  describe('Status Indicator', () => {
    it('renders status indicator when status is provided', () => {
      const { container } = render(<Avatar name="JD" status="online" />);
      expect(container.querySelector('.muka-avatar__status--online')).toBeInTheDocument();
    });

    it('renders all status variants', () => {
      const { container, rerender } = render(<Avatar name="JD" status="online" />);
      expect(container.querySelector('.muka-avatar__status--online')).toBeInTheDocument();

      rerender(<Avatar name="JD" status="offline" />);
      expect(container.querySelector('.muka-avatar__status--offline')).toBeInTheDocument();

      rerender(<Avatar name="JD" status="busy" />);
      expect(container.querySelector('.muka-avatar__status--busy')).toBeInTheDocument();

      rerender(<Avatar name="JD" status="away" />);
      expect(container.querySelector('.muka-avatar__status--away')).toBeInTheDocument();
    });

    it('applies status position classes', () => {
      const { container, rerender } = render(
        <Avatar name="JD" status="online" statusPosition="top-right" />
      );
      expect(container.querySelector('.muka-avatar__status--top-right')).toBeInTheDocument();

      rerender(<Avatar name="JD" status="online" statusPosition="bottom-right" />);
      expect(container.querySelector('.muka-avatar__status--bottom-right')).toBeInTheDocument();
    });

    it('does not render status when status prop is not provided', () => {
      const { container } = render(<Avatar name="JD" />);
      expect(container.querySelector('.muka-avatar__status')).not.toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows loading state when image is loading', () => {
      const { container } = render(
        <Avatar src="https://example.com/avatar.jpg" alt="User" />
      );
      expect(container.querySelector('.muka-avatar--loading')).toBeInTheDocument();
      expect(container.querySelector('.muka-avatar__skeleton')).toBeInTheDocument();
    });

    it('removes loading state after image loads', async () => {
      const { container } = render(
        <Avatar src="https://example.com/avatar.jpg" alt="User" />
      );
      
      const img = container.querySelector('.muka-avatar__image') as HTMLImageElement;
      fireEvent.load(img);

      await waitFor(() => {
        expect(container.querySelector('.muka-avatar--loading')).not.toBeInTheDocument();
        expect(container.querySelector('.muka-avatar__skeleton')).not.toBeInTheDocument();
      });
    });
  });

  describe('Interactive Behavior', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Avatar name="JD" onClick={handleClick} />);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies clickable class when onClick is provided', () => {
      const { container } = render(<Avatar name="JD" onClick={() => {}} />);
      expect(container.querySelector('.muka-avatar--clickable')).toBeInTheDocument();
    });

    it('renders as button when onClick is provided', () => {
      render(<Avatar name="JD" onClick={() => {}} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders as div when onClick is not provided', () => {
      const { container } = render(<Avatar name="JD" />);
      const avatar = container.querySelector('.muka-avatar');
      expect(avatar?.tagName).toBe('DIV');
    });

    it('supports keyboard interaction with Enter key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Avatar name="JD" onClick={handleClick} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard interaction with Space key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Avatar name="JD" onClick={handleClick} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has accessible label from name', () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByRole('img')).toHaveAccessibleName('John Doe');
    });

    it('has accessible label from aria-label', () => {
      render(<Avatar name="JD" aria-label="User profile picture" />);
      expect(screen.getByRole('img')).toHaveAccessibleName('User profile picture');
    });

    it('has accessible label from alt when image is provided', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="John Doe" />);
      expect(screen.getByAltText('John Doe')).toBeInTheDocument();
    });

    it('warns when src is provided without alt', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<Avatar src="https://example.com/avatar.jpg" />);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('alt text')
      );
      consoleSpy.mockRestore();
    });

    it('does not warn when src has alt', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<Avatar src="https://example.com/avatar.jpg" alt="User" />);
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('status indicator has accessible label', () => {
      render(<Avatar name="JD" status="online" />);
      expect(screen.getByRole('status')).toHaveAccessibleName('Online');
    });

    it('has focus-visible styles when clickable', () => {
      render(<Avatar name="JD" onClick={() => {}} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('muka-avatar--clickable');
    });
  });

  describe('Initials Generation', () => {
    it('generates two-letter initials from full name', () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('generates initials from first and last name only', () => {
      render(<Avatar name="John Michael Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('generates single initial from single name', () => {
      render(<Avatar name="Prince" />);
      expect(screen.getByText('P')).toBeInTheDocument();
    });

    it('handles extra whitespace in names', () => {
      render(<Avatar name="  John   Doe  " />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('converts initials to uppercase', () => {
      render(<Avatar name="john doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });
});

describe('AvatarGroup Component', () => {
  describe('Rendering', () => {
    it('renders all avatars when count is less than max', () => {
      render(
        <AvatarGroup max={5}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
        </AvatarGroup>
      );
      expect(screen.getByText('U1')).toBeInTheDocument();
      expect(screen.getByText('U2')).toBeInTheDocument();
      expect(screen.getByText('U3')).toBeInTheDocument();
    });

    it('limits visible avatars to max prop', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
        </AvatarGroup>
      );
      expect(screen.getByText('U1')).toBeInTheDocument();
      expect(screen.getByText('U2')).toBeInTheDocument();
      expect(screen.queryByText('U3')).not.toBeInTheDocument();
    });

    it('shows overflow count when avatars exceed max', () => {
      render(
        <AvatarGroup max={3}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
          <Avatar name="User 4" />
          <Avatar name="User 5" />
        </AvatarGroup>
      );
      expect(screen.getByText('+2')).toBeInTheDocument();
    });

    it('applies spacing classes', () => {
      const { container, rerender } = render(
        <AvatarGroup spacing="tight">
          <Avatar name="User 1" />
        </AvatarGroup>
      );
      expect(container.querySelector('.muka-avatar-group--tight')).toBeInTheDocument();

      rerender(
        <AvatarGroup spacing="normal">
          <Avatar name="User 1" />
        </AvatarGroup>
      );
      expect(container.querySelector('.muka-avatar-group--normal')).toBeInTheDocument();
    });

    it('applies size class to group', () => {
      const { container } = render(
        <AvatarGroup size="lg">
          <Avatar name="User 1" />
        </AvatarGroup>
      );
      expect(container.querySelector('.muka-avatar-group--lg')).toBeInTheDocument();
    });

    it('propagates size to child avatars', () => {
      const { container } = render(
        <AvatarGroup size="lg">
          <Avatar name="User 1" />
        </AvatarGroup>
      );
      expect(container.querySelector('.muka-avatar--lg')).toBeInTheDocument();
    });

    it('preserves child avatar size if already set', () => {
      const { container } = render(
        <AvatarGroup size="md">
          <Avatar name="User 1" size="xl" />
        </AvatarGroup>
      );
      expect(container.querySelector('.muka-avatar--xl')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <AvatarGroup className="custom-group">
          <Avatar name="User 1" />
        </AvatarGroup>
      );
      expect(container.querySelector('.custom-group')).toBeInTheDocument();
    });
  });

  describe('Overflow Behavior', () => {
    it('shows correct overflow count for single overflow', () => {
      render(
        <AvatarGroup max={3}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
          <Avatar name="User 4" />
        </AvatarGroup>
      );
      expect(screen.getByText('+1')).toBeInTheDocument();
    });

    it('shows correct overflow count for multiple overflow', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
          <Avatar name="User 4" />
          <Avatar name="User 5" />
          <Avatar name="User 6" />
        </AvatarGroup>
      );
      expect(screen.getByText('+4')).toBeInTheDocument();
    });

    it('does not show overflow when count equals max', () => {
      render(
        <AvatarGroup max={3}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
        </AvatarGroup>
      );
      expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has role group', () => {
      render(
        <AvatarGroup>
          <Avatar name="User 1" />
        </AvatarGroup>
      );
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('has accessible label', () => {
      render(
        <AvatarGroup aria-label="Team members">
          <Avatar name="User 1" />
        </AvatarGroup>
      );
      expect(screen.getByRole('group')).toHaveAccessibleName('Team members');
    });

    it('overflow avatar has accessible label for singular', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
        </AvatarGroup>
      );
      expect(screen.getByLabelText('1 more person')).toBeInTheDocument();
    });

    it('overflow avatar has accessible label for plural', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
          <Avatar name="User 4" />
        </AvatarGroup>
      );
      expect(screen.getByLabelText('2 more people')).toBeInTheDocument();
    });
  });
});
