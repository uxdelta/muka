import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PriceTag } from '../../components/PriceTag';

describe('PriceTag Component', () => {
  describe('Rendering', () => {
    it('renders currency symbol', () => {
      render(<PriceTag />);
      expect(screen.getByText('€')).toBeInTheDocument();
    });

    it('renders whole units', () => {
      render(<PriceTag wholeUnits="1.250" />);
      expect(screen.getByText('1.250')).toBeInTheDocument();
    });

    it('renders cents', () => {
      render(<PriceTag amount="99" />);
      expect(screen.getByText('99')).toBeInTheDocument();
    });

    it('renders unit label', () => {
      render(<PriceTag unit="night" />);
      expect(screen.getByText('/night')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      const { container } = render(<PriceTag />);
      expect(container.querySelector('.muka-price-tag')).toBeInTheDocument();
      expect(container.querySelector('.muka-price-tag--md')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<PriceTag className="custom" />);
      expect(container.querySelector('.muka-price-tag.custom')).toBeInTheDocument();
    });
  });

  describe('Currency', () => {
    it('renders Euro symbol for EUR', () => {
      render(<PriceTag currency="EUR" />);
      expect(screen.getByText('€')).toBeInTheDocument();
    });

    it('renders Dollar symbol for USD', () => {
      render(<PriceTag currency="USD" />);
      expect(screen.getByText('$')).toBeInTheDocument();
    });

    it('renders Pound symbol for GBP', () => {
      render(<PriceTag currency="GBP" />);
      expect(screen.getByText('£')).toBeInTheDocument();
    });

    it('renders Yen symbol for JPY', () => {
      render(<PriceTag currency="JPY" />);
      expect(screen.getByText('¥')).toBeInTheDocument();
    });
  });

  describe('Decimal separator', () => {
    it('uses comma by default', () => {
      render(<PriceTag />);
      expect(screen.getByText(',')).toBeInTheDocument();
    });

    it('uses dot when decimal="dot"', () => {
      render(<PriceTag decimal="dot" />);
      expect(screen.getByText('.')).toBeInTheDocument();
    });
  });

  describe('Visibility toggles', () => {
    it('hides cents when showCents is false', () => {
      const { container } = render(<PriceTag showCents={false} amount="99" />);
      expect(screen.queryByText('99')).not.toBeInTheDocument();
      expect(container.querySelector('.muka-price-tag__decimal')).not.toBeInTheDocument();
    });

    it('hides unit when showUnit is false', () => {
      render(<PriceTag showUnit={false} unit="night" />);
      expect(screen.queryByText('/night')).not.toBeInTheDocument();
    });

    it('shows cents by default', () => {
      render(<PriceTag amount="50" />);
      expect(screen.getByText('50')).toBeInTheDocument();
    });

    it('shows unit by default', () => {
      render(<PriceTag />);
      expect(screen.getByText('/unit')).toBeInTheDocument();
    });
  });

  describe('Size variants', () => {
    it('applies medium size class by default', () => {
      const { container } = render(<PriceTag />);
      expect(container.querySelector('.muka-price-tag--md')).toBeInTheDocument();
    });

    it('applies small size class', () => {
      const { container } = render(<PriceTag size="sm" />);
      expect(container.querySelector('.muka-price-tag--sm')).toBeInTheDocument();
    });
  });
});
