import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tile } from './Tile';
import { PriceTag } from '../PriceTag';
import { Button } from '../Button';
import { Icon } from '../Icon';
import './Tile.css';
import '../PriceTag/PriceTag.css';

const PLACEHOLDER_IMAGES = [
  'https://picsum.photos/seed/tile1/1280/720',
  'https://picsum.photos/seed/tile2/400/400',
  'https://picsum.photos/seed/tile3/400/400',
  'https://picsum.photos/seed/tile4/400/400',
  'https://picsum.photos/seed/tile5/400/400',
  'https://picsum.photos/seed/tile6/400/400',
  'https://picsum.photos/seed/tile7/400/400',
  'https://picsum.photos/seed/tile8/400/400',
];

const SQUARE_IMAGES = [
  'https://picsum.photos/seed/sq1/400/400',
  'https://picsum.photos/seed/sq2/400/400',
  'https://picsum.photos/seed/sq3/400/400',
  'https://picsum.photos/seed/sq4/400/400',
];

const FavouriteButton = () => (
  <Button
    variant="ghost"
    iconOnly
    aria-label="Add to favourites"
    iconLeft={<Icon name="heart" variant="line" size="md" />}
  >
    Favourite
  </Button>
);

const CartButton = () => (
  <Button
    variant="ghost"
    iconOnly
    aria-label="Add to cart"
    iconLeft={<Icon name="shopping-cart" variant="line" size="md" />}
  >
    Add to cart
  </Button>
);

const meta: Meta<typeof Tile> = {
  title: 'Components/Information/Tile',
  component: Tile,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RL5IFLUJk4yeAFNXlsX4b5/Muka-UI-Figma-Library?node-id=62-197&m=dev',
    },
    docs: {
      description: {
        component: `
# Tile Component

A versatile content tile for displaying items with images, text, and pricing. Supports 9 layout variants (3 image positions x 3 sizes).

## Image Positions
- **top**: Photo above content (default) — for card/grid layouts
- **left**: Photo on the left — for horizontal list layouts
- **right**: Photo on the right — mirror of left

## Sizes
- **lg**: Large — full gallery with thumbnails, detailed text
- **md**: Medium — constrained width (320px for top), gallery with thumbnails
- **sm**: Small — compact tile, single photo, minimal text

## Composition
The \`price\`, \`favourite\`, and \`action\` props accept ReactNode for flexible composition:
- Use \`<PriceTag />\` for the price slot
- Use \`<Button variant="ghost" iconOnly>\` for favourite/action slots
        `,
      },
    },
  },
  argTypes: {
    image: {
      control: { type: 'radio' },
      options: ['top', 'left', 'right'],
    },
    size: {
      control: { type: 'radio' },
      options: ['lg', 'md', 'sm'],
    },
    showThumbnails: {
      control: { type: 'boolean' },
    },
    showPriceTag: {
      control: { type: 'boolean' },
      description: 'Toggle price tag visibility',
      table: { category: 'Slots' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tile & { showPriceTag?: boolean }>;

// ─── Playground ─────────────────────────────────────────
export const Playground: Story = {
  args: {
    heading: 'Heading',
    subheading: 'Subheading',
    description: 'Mercatus artis in Pasar Malam Leerdam creaturas coloratas ab artificibus localibus praebet, cum ambitu iucundo et cibis viarum delectabilibus.',
    image: 'top',
    size: 'lg',
    images: PLACEHOLDER_IMAGES,
    imageAlt: 'Product photo',
    showThumbnails: true,
    showPriceTag: true,
    favourite: <FavouriteButton />,
  },
  render: ({ showPriceTag, size, ...args }: any) => (
    <Tile
      {...args}
      size={size}
      price={showPriceTag ? <PriceTag wholeUnits="0" amount="00" unit="unit" size={size === 'sm' ? 'sm' : 'md'} /> : undefined}
    />
  ),
};

// ─── Top + Large ────────────────────────────────────────
export const TopLarge: Story = {
  name: 'Top + Large',
  args: {
    heading: 'Heading',
    subheading: 'Subheading',
    description: 'Mercatus artis in Pasar Malam Leerdam creaturas coloratas ab artificibus localibus praebet, cum ambitu iucundo et cibis viarum delectabilibus. Venite et explorate hanc mirabilem celebrationem artis et saporum.',
    image: 'top',
    size: 'lg',
    images: PLACEHOLDER_IMAGES,
    price: <PriceTag wholeUnits="0" amount="00" unit="unit" />,
    favourite: <FavouriteButton />,
  },
};

// ─── Top + Medium ───────────────────────────────────────
export const TopMedium: Story = {
  name: 'Top + Medium',
  args: {
    heading: 'Heading',
    subheading: 'Subheading',
    description: 'Mercatus artis in Pasar Malam Leerdam creaturas coloratas ab artificibus localibus praebet.',
    image: 'top',
    size: 'md',
    images: PLACEHOLDER_IMAGES,
    price: <PriceTag wholeUnits="0" amount="00" unit="unit" size="sm" />,
    favourite: <FavouriteButton />,
  },
};

// ─── Top + Small ────────────────────────────────────────
export const TopSmall: Story = {
  name: 'Top + Small',
  render: () => (
    <div style={{ width: 180 }}>
      <Tile
        heading="Heading"
        subheading="Subheading"
        image="top"
        size="sm"
        images={SQUARE_IMAGES.slice(0, 1)}
        price={<PriceTag wholeUnits="0" amount="00" unit="unit" size="sm" />}
        favourite={<FavouriteButton />}
      />
    </div>
  ),
};

// ─── Left + Large ───────────────────────────────────────
export const LeftLarge: Story = {
  name: 'Left + Large',
  args: {
    heading: 'Heading',
    subheading: 'Subheading',
    description: 'Mercatus artis in Pasar Malam Leerdam creaturas coloratas ab artificibus localibus praebet, cum ambitu iucundo et cibis viarum delectabilibus.',
    image: 'left',
    size: 'lg',
    images: PLACEHOLDER_IMAGES,
    price: <PriceTag wholeUnits="0" amount="00" unit="unit" />,
    favourite: <FavouriteButton />,
  },
};

// ─── Left + Medium ──────────────────────────────────────
export const LeftMedium: Story = {
  name: 'Left + Medium',
  args: {
    heading: 'Heading',
    subheading: 'Subheading',
    description: 'Mercatus artis in Pasar Malam Leerdam creaturas coloratas ab artificibus localibus praebet.',
    image: 'left',
    size: 'md',
    images: PLACEHOLDER_IMAGES,
    price: <PriceTag wholeUnits="0" amount="00" unit="unit" />,
    favourite: <FavouriteButton />,
  },
};

// ─── Left + Small ───────────────────────────────────────
export const LeftSmall: Story = {
  name: 'Left + Small',
  args: {
    heading: 'Heading',
    subheading: 'Subheading',
    image: 'left',
    size: 'sm',
    images: SQUARE_IMAGES.slice(0, 1),
    price: <PriceTag wholeUnits="0" amount="00" unit="unit" size="sm" />,
    action: <CartButton />,
  },
};

// ─── Right + Large ──────────────────────────────────────
export const RightLarge: Story = {
  name: 'Right + Large',
  args: {
    heading: 'Heading',
    subheading: 'Subheading',
    description: 'Mercatus artis in Pasar Malam Leerdam creaturas coloratas ab artificibus localibus praebet, cum ambitu iucundo et cibis viarum delectabilibus.',
    image: 'right',
    size: 'lg',
    images: PLACEHOLDER_IMAGES,
    price: <PriceTag wholeUnits="0" amount="00" unit="unit" />,
    favourite: <FavouriteButton />,
  },
};

// ─── Right + Medium ─────────────────────────────────────
export const RightMedium: Story = {
  name: 'Right + Medium',
  args: {
    heading: 'Heading',
    subheading: 'Subheading',
    description: 'Mercatus artis in Pasar Malam Leerdam creaturas coloratas ab artificibus localibus praebet.',
    image: 'right',
    size: 'md',
    images: PLACEHOLDER_IMAGES,
    price: <PriceTag wholeUnits="0" amount="00" unit="unit" />,
    favourite: <FavouriteButton />,
  },
};

// ─── Right + Small ──────────────────────────────────────
export const RightSmall: Story = {
  name: 'Right + Small',
  args: {
    heading: 'Heading',
    subheading: 'Subheading',
    image: 'right',
    size: 'sm',
    images: SQUARE_IMAGES.slice(0, 1),
    price: <PriceTag wholeUnits="0" amount="00" unit="unit" size="sm" />,
    favourite: <FavouriteButton />,
  },
};

// ─── Grid Layout (Top + Small) ──────────────────────────
export const GridLayout: Story = {
  name: 'Grid Layout',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4, 16px)' }}>
      {SQUARE_IMAGES.map((img, i) => (
        <Tile
          key={i}
          heading="Heading"
          subheading="Subheading"
          image="top"
          size="sm"
          images={[img]}
          price={<PriceTag wholeUnits="0" amount="00" unit="unit" size="sm" />}
          favourite={<FavouriteButton />}
        />
      ))}
    </div>
  ),
};

// ─── List Layout (Left + Small) ─────────────────────────
export const ListLayout: Story = {
  name: 'List Layout',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4, 16px)' }}>
      {SQUARE_IMAGES.map((img, i) => (
        <Tile
          key={i}
          heading="Heading"
          subheading="Subheading"
          image="left"
          size="sm"
          images={[img]}
          price={<PriceTag wholeUnits="0" amount="00" unit="unit" size="sm" />}
          action={<CartButton />}
        />
      ))}
    </div>
  ),
};

// ─── Full-width List (Top + Large) ──────────────────────
export const FullWidthList: Story = {
  name: 'Full-width List',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {[0, 1].map((i) => (
        <Tile
          key={i}
          heading="Heading"
          subheading="Subheading"
          image="top"
          size="lg"
          images={PLACEHOLDER_IMAGES}
          price={<PriceTag wholeUnits="0" amount="00" unit="unit" />}
          favourite={<FavouriteButton />}
        />
      ))}
    </div>
  ),
};

// ─── Without Images ─────────────────────────────────────
export const WithoutImages: Story = {
  name: 'Without Images',
  args: {
    heading: 'Heading',
    subheading: 'Subheading',
    description: 'This tile has no images.',
    image: 'top',
    size: 'lg',
    price: <PriceTag wholeUnits="49" amount="99" unit="month" />,
  },
};

// ─── Without Thumbnails ─────────────────────────────────
export const WithoutThumbnails: Story = {
  name: 'Without Thumbnails',
  args: {
    heading: 'Heading',
    subheading: 'Subheading',
    image: 'top',
    size: 'lg',
    images: PLACEHOLDER_IMAGES,
    showThumbnails: false,
    price: <PriceTag wholeUnits="0" amount="00" unit="unit" />,
    favourite: <FavouriteButton />,
  },
};
