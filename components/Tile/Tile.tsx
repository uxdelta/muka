import React, { useState } from 'react';
import './Tile.css';

export interface TileProps {
  /** Heading text */
  heading: string;

  /** Subheading text */
  subheading?: string;

  /** Description text */
  description?: string;

  /** Image position relative to content */
  image?: 'top' | 'left' | 'right';

  /** Size variant controlling layout and typography scale */
  size?: 'lg' | 'md' | 'sm';

  /** Array of image URLs — first is main photo, rest are thumbnails */
  images?: string[];

  /** Alt text for the main image */
  imageAlt?: string;

  /** Whether to show the thumbnail strip (lg/md sizes only) */
  showThumbnails?: boolean;

  /** Price slot — accepts a PriceTag component or any ReactNode */
  price?: React.ReactNode;

  /** Favourite action slot — typically a ghost Button with heart Icon */
  favourite?: React.ReactNode;

  /** Trailing action slot — e.g. a shopping cart button (used in sm layouts) */
  action?: React.ReactNode;

  /** Click handler for the entire tile */
  onClick?: () => void;

  /** Semantic HTML element */
  as?: 'div' | 'article' | 'a';

  /** Href for anchor tiles (used with as="a") */
  href?: string;

  /** Additional CSS classes */
  className?: string;

  /** Accessible label */
  'aria-label'?: string;

  /** ID of element that labels this tile */
  'aria-labelledby'?: string;
}

export const Tile: React.FC<TileProps> = ({
  heading,
  subheading,
  description,
  image = 'top',
  size = 'lg',
  images,
  imageAlt = '',
  showThumbnails = true,
  price,
  favourite,
  action,
  onClick,
  as = 'article',
  href,
  className = '',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const isInteractive = Boolean(onClick) || as === 'a';
  const isSmall = size === 'sm';
  const hasThumbnails = showThumbnails && !isSmall && images && images.length > 1;

  const Element = as;

  const handleClick = () => {
    if (isInteractive && onClick) {
      onClick();
    }
  };

  const handleMouseDown = () => {
    if (isInteractive) setIsPressed(true);
  };

  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleClick();
    }
  };

  const tileClasses = [
    'muka-tile',
    `muka-tile--image-${image}`,
    `muka-tile--${size}`,
    isInteractive && 'muka-tile--interactive',
    isPressed && 'muka-tile--pressed',
    className,
  ].filter(Boolean).join(' ');

  const interactiveProps = isInteractive
    ? {
        onClick: handleClick,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseLeave,
        onKeyDown: handleKeyDown,
        tabIndex: 0,
        role: as === 'a' ? undefined : ('button' as const),
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
      }
    : {
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
      };

  const linkProps = as === 'a' ? { href } : {};

  const mainImage = images?.[0];
  const thumbnailImages = images?.slice(1);

  // Determine if favourite should overlay the photo or be inline
  const favouriteOnPhoto = favourite && !isSmall && mainImage;
  const favouriteInline = favourite && isSmall;

  // For right layout, content comes first in DOM
  const isRight = image === 'right';

  const photosSection = mainImage && (
    <div className="muka-tile__photos">
      {favouriteOnPhoto && (
        <div className="muka-tile__favourite">
          {favourite}
        </div>
      )}
      <div className="muka-tile__photo-main">
        <img src={mainImage} alt={imageAlt} />
      </div>
      {hasThumbnails && thumbnailImages && (
        <div className="muka-tile__thumbnails">
          {thumbnailImages.map((src, index) => (
            <div key={index} className="muka-tile__thumbnail">
              <img src={src} alt="" />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Small + left/right: header has heading/subheading/price in row with action
  const isSmallHorizontal = isSmall && image !== 'top';

  const contentSection = (
    <div className="muka-tile__content">
      <div className="muka-tile__header">
        <div className="muka-tile__text">
          <p className="muka-tile__heading">{heading}</p>
          {subheading && (
            <p className="muka-tile__subheading">{subheading}</p>
          )}
          {/* Small size: price goes under subheading */}
          {isSmall && price && (
            <div className="muka-tile__price">{price}</div>
          )}
        </div>
        {/* Large/Medium: price goes beside heading */}
        {!isSmall && price && (
          <div className="muka-tile__price">{price}</div>
        )}
        {/* Small horizontal: inline favourite or action beside text */}
        {isSmallHorizontal && (favouriteInline || action) && (
          <div className="muka-tile__action">
            {action || favourite}
          </div>
        )}
      </div>
      {description && (
        <p className="muka-tile__description">{description}</p>
      )}
      {/* Small top: favourite below content */}
      {isSmall && image === 'top' && favouriteInline && !action && (
        <div className="muka-tile__action">
          {favourite}
        </div>
      )}
    </div>
  );

  return (
    <Element className={tileClasses} {...interactiveProps} {...linkProps}>
      {isRight ? (
        <>
          {contentSection}
          {photosSection}
        </>
      ) : (
        <>
          {photosSection}
          {contentSection}
        </>
      )}
    </Element>
  );
};

export default Tile;
