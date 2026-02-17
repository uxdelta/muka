import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tile } from '../../components/Tile';

describe('Tile Component', () => {
  describe('Rendering', () => {
    it('renders heading text', () => {
      render(<Tile heading="Product Title" />);
      expect(screen.getByText('Product Title')).toBeInTheDocument();
    });

    it('renders subheading when provided', () => {
      render(<Tile heading="Title" subheading="Subtitle" />);
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
    });

    it('does not render subheading when not provided', () => {
      const { container } = render(<Tile heading="Title" />);
      expect(container.querySelector('.muka-tile__subheading')).not.toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(<Tile heading="Title" description="Some description" />);
      expect(screen.getByText('Some description')).toBeInTheDocument();
    });

    it('does not render description when not provided', () => {
      const { container } = render(<Tile heading="Title" />);
      expect(container.querySelector('.muka-tile__description')).not.toBeInTheDocument();
    });

    it('applies default classes', () => {
      const { container } = render(<Tile heading="Title" />);
      expect(container.querySelector('.muka-tile')).toBeInTheDocument();
      expect(container.querySelector('.muka-tile--image-top')).toBeInTheDocument();
      expect(container.querySelector('.muka-tile--lg')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Tile heading="Title" className="custom" />);
      expect(container.querySelector('.muka-tile.custom')).toBeInTheDocument();
    });

    it('renders as article by default', () => {
      const { container } = render(<Tile heading="Title" />);
      expect(container.querySelector('article.muka-tile')).toBeInTheDocument();
    });

    it('renders as different semantic elements', () => {
      const { container, rerender } = render(<Tile heading="Title" as="div" />);
      expect(container.querySelector('div.muka-tile')).toBeInTheDocument();

      rerender(<Tile heading="Title" as="a" href="/test" />);
      const link = container.querySelector('a.muka-tile');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
    });
  });

  describe('Images', () => {
    it('renders main image when images provided', () => {
      render(<Tile heading="Title" images={['/img1.jpg']} imageAlt="Product" />);
      const img = screen.getByAltText('Product');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', '/img1.jpg');
    });

    it('does not render photos section when no images', () => {
      const { container } = render(<Tile heading="Title" />);
      expect(container.querySelector('.muka-tile__photos')).not.toBeInTheDocument();
    });

    it('renders thumbnails from remaining images', () => {
      const { container } = render(
        <Tile heading="Title" images={['/main.jpg', '/thumb1.jpg', '/thumb2.jpg']} />
      );
      const thumbnails = container.querySelectorAll('.muka-tile__thumbnail');
      expect(thumbnails).toHaveLength(2);
    });

    it('hides thumbnails when showThumbnails is false', () => {
      const { container } = render(
        <Tile heading="Title" images={['/main.jpg', '/thumb1.jpg']} showThumbnails={false} />
      );
      expect(container.querySelector('.muka-tile__thumbnails')).not.toBeInTheDocument();
    });

    it('does not show thumbnails for sm size', () => {
      const { container } = render(
        <Tile heading="Title" size="sm" images={['/main.jpg', '/thumb1.jpg']} />
      );
      expect(container.querySelector('.muka-tile__thumbnails')).not.toBeInTheDocument();
    });

    it('thumbnail images have empty alt text', () => {
      const { container } = render(
        <Tile heading="Title" images={['/main.jpg', '/thumb1.jpg', '/thumb2.jpg']} imageAlt="Product" />
      );
      const thumbnailImgs = container.querySelectorAll('.muka-tile__thumbnail img');
      expect(thumbnailImgs[0]).toHaveAttribute('alt', '');
      expect(thumbnailImgs[1]).toHaveAttribute('alt', '');
    });
  });

  describe('Layout Variants', () => {
    it('applies image position class', () => {
      const { container, rerender } = render(<Tile heading="Title" image="top" />);
      expect(container.querySelector('.muka-tile--image-top')).toBeInTheDocument();

      rerender(<Tile heading="Title" image="left" />);
      expect(container.querySelector('.muka-tile--image-left')).toBeInTheDocument();

      rerender(<Tile heading="Title" image="right" />);
      expect(container.querySelector('.muka-tile--image-right')).toBeInTheDocument();
    });

    it('applies size class', () => {
      const { container, rerender } = render(<Tile heading="Title" size="lg" />);
      expect(container.querySelector('.muka-tile--lg')).toBeInTheDocument();

      rerender(<Tile heading="Title" size="md" />);
      expect(container.querySelector('.muka-tile--md')).toBeInTheDocument();

      rerender(<Tile heading="Title" size="sm" />);
      expect(container.querySelector('.muka-tile--sm')).toBeInTheDocument();
    });

    it('renders all 9 variant combinations without error', () => {
      const positions = ['top', 'left', 'right'] as const;
      const sizes = ['lg', 'md', 'sm'] as const;

      positions.forEach((image) => {
        sizes.forEach((size) => {
          const { container } = render(
            <Tile
              heading="Title"
              subheading="Sub"
              description="Desc"
              image={image}
              size={size}
              images={['/img.jpg', '/thumb.jpg']}
            />
          );
          expect(container.querySelector(`.muka-tile--image-${image}`)).toBeInTheDocument();
          expect(container.querySelector(`.muka-tile--${size}`)).toBeInTheDocument();
        });
      });
    });
  });

  describe('Slots', () => {
    it('renders price slot', () => {
      render(<Tile heading="Title" price={<span data-testid="price">€99</span>} />);
      expect(screen.getByTestId('price')).toBeInTheDocument();
    });

    it('renders favourite slot on photo for lg', () => {
      const { container } = render(
        <Tile
          heading="Title"
          size="lg"
          images={['/img.jpg']}
          favourite={<button data-testid="fav">Fav</button>}
        />
      );
      const favContainer = container.querySelector('.muka-tile__favourite');
      expect(favContainer).toBeInTheDocument();
      expect(screen.getByTestId('fav')).toBeInTheDocument();
    });

    it('renders favourite inline for sm', () => {
      const { container } = render(
        <Tile
          heading="Title"
          size="sm"
          image="left"
          images={['/img.jpg']}
          favourite={<button data-testid="fav">Fav</button>}
        />
      );
      const actionContainer = container.querySelector('.muka-tile__action');
      expect(actionContainer).toBeInTheDocument();
      expect(screen.getByTestId('fav')).toBeInTheDocument();
    });

    it('renders action slot', () => {
      render(
        <Tile
          heading="Title"
          size="sm"
          image="left"
          action={<button data-testid="cart">Cart</button>}
        />
      );
      expect(screen.getByTestId('cart')).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('applies interactive class when onClick is provided', () => {
      const { container } = render(<Tile heading="Title" onClick={() => {}} />);
      expect(container.querySelector('.muka-tile--interactive')).toBeInTheDocument();
    });

    it('does not apply interactive class without onClick', () => {
      const { container } = render(<Tile heading="Title" />);
      expect(container.querySelector('.muka-tile--interactive')).not.toBeInTheDocument();
    });

    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Tile heading="Title" onClick={handleClick} />);

      await user.click(screen.getByText('Title'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard activation with Enter', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(<Tile heading="Title" onClick={handleClick} />);

      const tile = container.querySelector('.muka-tile') as HTMLElement;
      tile.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard activation with Space', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(<Tile heading="Title" onClick={handleClick} />);

      const tile = container.querySelector('.muka-tile') as HTMLElement;
      tile.focus();
      await user.keyboard('[Space]');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies pressed state on mouse down', () => {
      const { container } = render(<Tile heading="Title" onClick={() => {}} />);
      const tile = container.querySelector('.muka-tile') as HTMLElement;

      fireEvent.mouseDown(tile);
      expect(container.querySelector('.muka-tile--pressed')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has role="button" when interactive', () => {
      render(<Tile heading="Title" onClick={() => {}} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has tabIndex={0} when interactive', () => {
      const { container } = render(<Tile heading="Title" onClick={() => {}} />);
      expect(container.querySelector('.muka-tile')).toHaveAttribute('tabIndex', '0');
    });

    it('supports aria-label', () => {
      render(<Tile heading="Title" onClick={() => {}} aria-label="Product tile" />);
      expect(screen.getByRole('button', { name: 'Product tile' })).toBeInTheDocument();
    });

    it('supports aria-labelledby', () => {
      const { container } = render(
        <Tile heading="Title" onClick={() => {}} aria-labelledby="tile-label" />
      );
      expect(container.querySelector('.muka-tile')).toHaveAttribute('aria-labelledby', 'tile-label');
    });

    it('main image has alt text', () => {
      render(<Tile heading="Title" images={['/img.jpg']} imageAlt="Product photo" />);
      expect(screen.getByAltText('Product photo')).toBeInTheDocument();
    });
  });
});
