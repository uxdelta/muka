import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard } from '../../components/Skeleton';

describe('Skeleton Component', () => {
  describe('Rendering', () => {
    it('renders skeleton element', () => {
      const { container } = render(<Skeleton width={200} height={20} />);
      expect(container.querySelector('.muka-skeleton')).toBeInTheDocument();
    });

    it('applies default variant class', () => {
      const { container } = render(<Skeleton width={200} height={20} />);
      expect(container.querySelector('.muka-skeleton--rectangular')).toBeInTheDocument();
    });

    it('applies variant classes', () => {
      const { container, rerender } = render(<Skeleton variant="rectangular" />);
      expect(container.querySelector('.muka-skeleton--rectangular')).toBeInTheDocument();

      rerender(<Skeleton variant="circular" />);
      expect(container.querySelector('.muka-skeleton--circular')).toBeInTheDocument();

      rerender(<Skeleton variant="rounded" />);
      expect(container.querySelector('.muka-skeleton--rounded')).toBeInTheDocument();
    });

    it('applies animation classes', () => {
      const { container, rerender } = render(<Skeleton animation="pulse" />);
      expect(container.querySelector('.muka-skeleton--pulse')).toBeInTheDocument();

      rerender(<Skeleton animation="wave" />);
      expect(container.querySelector('.muka-skeleton--wave')).toBeInTheDocument();

      rerender(<Skeleton animation="none" />);
      expect(container.querySelector('.muka-skeleton--pulse')).not.toBeInTheDocument();
      expect(container.querySelector('.muka-skeleton--wave')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Skeleton className="custom-class" />);
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('Dimensions', () => {
    it('applies width as number (pixels)', () => {
      const { container } = render(<Skeleton width={200} />);
      const skeleton = container.querySelector('.muka-skeleton') as HTMLElement;
      expect(skeleton.style.width).toBe('200px');
    });

    it('applies width as string', () => {
      const { container } = render(<Skeleton width="100%" />);
      const skeleton = container.querySelector('.muka-skeleton') as HTMLElement;
      expect(skeleton.style.width).toBe('100%');
    });

    it('applies height as number (pixels)', () => {
      const { container } = render(<Skeleton height={20} />);
      const skeleton = container.querySelector('.muka-skeleton') as HTMLElement;
      expect(skeleton.style.height).toBe('20px');
    });

    it('applies height as string', () => {
      const { container } = render(<Skeleton height="2rem" />);
      const skeleton = container.querySelector('.muka-skeleton') as HTMLElement;
      expect(skeleton.style.height).toBe('2rem');
    });

    it('applies custom border radius as number', () => {
      const { container } = render(<Skeleton borderRadius={8} />);
      const skeleton = container.querySelector('.muka-skeleton') as HTMLElement;
      expect(skeleton.style.borderRadius).toBe('8px');
    });

    it('applies custom border radius as string', () => {
      const { container } = render(<Skeleton borderRadius="50%" />);
      const skeleton = container.querySelector('.muka-skeleton') as HTMLElement;
      expect(skeleton.style.borderRadius).toBe('50%');
    });
  });

  describe('Accessibility', () => {
    it('has aria-hidden attribute', () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.querySelector('.muka-skeleton');
      expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    });

    it('is decorative (not in accessibility tree)', () => {
      render(<Skeleton />);
      const skeleton = screen.queryByRole('presentation');
      expect(skeleton).not.toBeInTheDocument();
    });
  });

  describe('Custom Styles', () => {
    it('applies custom inline styles', () => {
      const { container } = render(
        <Skeleton style={{ margin: '10px', opacity: 0.5 }} />
      );
      const skeleton = container.querySelector('.muka-skeleton') as HTMLElement;
      expect(skeleton.style.margin).toBe('10px');
      expect(skeleton.style.opacity).toBe('0.5');
    });

    it('merges custom styles with dimension styles', () => {
      const { container } = render(
        <Skeleton width={100} height={50} style={{ backgroundColor: 'red' }} />
      );
      const skeleton = container.querySelector('.muka-skeleton') as HTMLElement;
      expect(skeleton.style.width).toBe('100px');
      expect(skeleton.style.height).toBe('50px');
      expect(skeleton.style.backgroundColor).toBe('red');
    });
  });
});

describe('SkeletonText Component', () => {
  describe('Rendering', () => {
    it('renders text skeleton container', () => {
      const { container } = render(<SkeletonText />);
      expect(container.querySelector('.muka-skeleton-text')).toBeInTheDocument();
    });

    it('renders default 3 lines', () => {
      const { container } = render(<SkeletonText />);
      const skeletons = container.querySelectorAll('.muka-skeleton');
      expect(skeletons).toHaveLength(3);
    });

    it('renders custom number of lines', () => {
      const { container } = render(<SkeletonText lines={5} />);
      const skeletons = container.querySelectorAll('.muka-skeleton');
      expect(skeletons).toHaveLength(5);
    });

    it('applies custom last line width', () => {
      const { container } = render(<SkeletonText lines={3} lastLineWidth="75%" />);
      const skeletons = container.querySelectorAll('.muka-skeleton');
      const lastSkeleton = skeletons[skeletons.length - 1] as HTMLElement;
      expect(lastSkeleton.style.width).toBe('75%');
    });

    it('applies full width to non-last lines', () => {
      const { container } = render(<SkeletonText lines={3} lastLineWidth="60%" />);
      const skeletons = container.querySelectorAll('.muka-skeleton');
      const firstSkeleton = skeletons[0] as HTMLElement;
      expect(firstSkeleton.style.width).toBe('100%');
    });

    it('applies full width to all lines when only one line', () => {
      const { container } = render(<SkeletonText lines={1} lastLineWidth="60%" />);
      const skeletons = container.querySelectorAll('.muka-skeleton');
      const skeleton = skeletons[0] as HTMLElement;
      expect(skeleton.style.width).toBe('100%');
    });
  });

  describe('Spacing', () => {
    it('applies normal spacing by default', () => {
      const { container } = render(<SkeletonText />);
      const textContainer = container.querySelector('.muka-skeleton-text') as HTMLElement;
      expect(textContainer.style.gap).toContain('var(--skeleton-text-spacing-normal)');
    });

    it('applies tight spacing when specified', () => {
      const { container } = render(<SkeletonText spacing="tight" />);
      const textContainer = container.querySelector('.muka-skeleton-text') as HTMLElement;
      expect(textContainer.style.gap).toContain('var(--skeleton-text-spacing-tight)');
    });
  });

  describe('Animation', () => {
    it('applies animation to all lines', () => {
      const { container } = render(<SkeletonText animation="wave" />);
      const skeletons = container.querySelectorAll('.muka-skeleton--wave');
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });
});

describe('SkeletonAvatar Component', () => {
  describe('Rendering', () => {
    it('renders avatar skeleton', () => {
      const { container } = render(<SkeletonAvatar />);
      expect(container.querySelector('.muka-skeleton-avatar')).toBeInTheDocument();
    });

    it('renders with circular variant', () => {
      const { container } = render(<SkeletonAvatar />);
      expect(container.querySelector('.muka-skeleton--circular')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<SkeletonAvatar className="custom" />);
      expect(container.querySelector('.custom')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders all size variants', () => {
      const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
      
      sizes.forEach(size => {
        const { container } = render(<SkeletonAvatar size={size} />);
        const skeleton = container.querySelector('.muka-skeleton') as HTMLElement;
        expect(skeleton.style.width).toContain(`var(--skeleton-avatar-size-${size})`);
        expect(skeleton.style.height).toContain(`var(--skeleton-avatar-size-${size})`);
      });
    });

    it('defaults to md size', () => {
      const { container } = render(<SkeletonAvatar />);
      const skeleton = container.querySelector('.muka-skeleton') as HTMLElement;
      expect(skeleton.style.width).toContain('var(--skeleton-avatar-size-md)');
    });
  });

  describe('Animation', () => {
    it('applies animation', () => {
      const { container } = render(<SkeletonAvatar animation="wave" />);
      expect(container.querySelector('.muka-skeleton--wave')).toBeInTheDocument();
    });
  });
});

describe('SkeletonCard Component', () => {
  describe('Rendering', () => {
    it('renders card skeleton container', () => {
      const { container } = render(<SkeletonCard />);
      expect(container.querySelector('.muka-skeleton-card')).toBeInTheDocument();
    });

    it('renders image by default', () => {
      const { container } = render(<SkeletonCard />);
      const skeletons = container.querySelectorAll('.muka-skeleton');
      expect(skeletons.length).toBeGreaterThan(1);
    });

    it('hides image when showImage is false', () => {
      const { container: withImage } = render(<SkeletonCard showImage={true} />);
      const { container: withoutImage } = render(<SkeletonCard showImage={false} />);
      
      const withImageSkeletons = withImage.querySelectorAll('.muka-skeleton');
      const withoutImageSkeletons = withoutImage.querySelectorAll('.muka-skeleton');
      
      expect(withImageSkeletons.length).toBeGreaterThan(withoutImageSkeletons.length);
    });

    it('renders actions by default', () => {
      const { container } = render(<SkeletonCard />);
      const skeletons = container.querySelectorAll('.muka-skeleton');
      expect(skeletons.length).toBeGreaterThanOrEqual(2);
    });

    it('hides actions when showActions is false', () => {
      const { container: withActions } = render(<SkeletonCard showActions={true} />);
      const { container: withoutActions } = render(<SkeletonCard showActions={false} />);
      
      const withActionsSkeletons = withActions.querySelectorAll('.muka-skeleton');
      const withoutActionsSkeletons = withoutActions.querySelectorAll('.muka-skeleton');
      
      expect(withActionsSkeletons.length).toBeGreaterThan(withoutActionsSkeletons.length);
    });
  });

  describe('Customization', () => {
    it('applies custom image height', () => {
      const { container } = render(<SkeletonCard imageHeight={250} />);
      const skeletons = container.querySelectorAll('.muka-skeleton');
      const imageSkeleton = skeletons[0] as HTMLElement;
      expect(imageSkeleton.style.height).toBe('250px');
    });

    it('renders custom number of text lines', () => {
      const { container } = render(<SkeletonCard lines={5} showImage={false} showActions={false} />);
      const textContainer = container.querySelector('.muka-skeleton-text');
      const textLines = textContainer?.querySelectorAll('.muka-skeleton');
      expect(textLines?.length).toBe(5);
    });

    it('applies animation to all elements', () => {
      const { container } = render(<SkeletonCard animation="wave" />);
      const waveSkeletons = container.querySelectorAll('.muka-skeleton--wave');
      expect(waveSkeletons.length).toBeGreaterThan(0);
    });
  });
});
