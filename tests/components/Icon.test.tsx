import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Icon } from '../../components/Icon';

const CustomSvg = () => (
  <svg data-testid="custom-svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 0h24v24H0z" />
  </svg>
);

describe('Icon Component', () => {
  describe('By name (RemixIcon)', () => {
    it('renders when name is provided', () => {
      const { container } = render(<Icon name="home" size="md" />);
      const wrapper = container.querySelector('.muka-icon');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper?.querySelector('svg')).toBeInTheDocument();
    });

    it('uses line variant by default', () => {
      const { container } = render(<Icon name="heart" />);
      expect(container.querySelector('.muka-icon svg')).toBeInTheDocument();
    });

    it('uses fill variant when specified', () => {
      const { container } = render(<Icon name="heart" variant="fill" />);
      expect(container.querySelector('.muka-icon svg')).toBeInTheDocument();
    });

    it('applies size class', () => {
      const { container } = render(<Icon name="home" size="lg" />);
      expect(container.querySelector('.muka-icon--lg')).toBeInTheDocument();
    });
  });

  describe('By children', () => {
    it('renders custom SVG when children is provided', () => {
      render(
        <Icon size="md">
          <CustomSvg />
        </Icon>
      );
      expect(screen.getByTestId('custom-svg')).toBeInTheDocument();
    });

    it('applies size and color to wrapper when using children', () => {
      const { container } = render(
        <Icon size="sm" color="red">
          <CustomSvg />
        </Icon>
      );
      const wrapper = container.querySelector('.muka-icon');
      expect(wrapper).toHaveClass('muka-icon--sm');
      expect(wrapper).toHaveAttribute('style');
      expect((wrapper as HTMLElement).style.color).toBe('red');
    });
  });

  describe('Accessibility', () => {
    it('sets aria-label and role when label is provided', () => {
      render(<Icon name="home" label="Home" />);
      const el = screen.getByRole('img', { name: 'Home' });
      expect(el).toBeInTheDocument();
    });

    it('has presentation role when no label', () => {
      const { container } = render(<Icon name="home" />);
      const wrapper = container.querySelector('.muka-icon');
      expect(wrapper).toHaveAttribute('role', 'presentation');
    });
  });

  describe('Unknown or missing name', () => {
    it('renders wrapper without crashing when name is not in registry', () => {
      const { container } = render(
        <Icon name={'unknown' as 'home'} size="md" />
      );
      const wrapper = container.querySelector('.muka-icon');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper?.querySelector('svg')).not.toBeInTheDocument();
    });

    it('renders nothing when neither name nor children provided', () => {
      const { container } = render(<Icon size="md" />);
      const wrapper = container.querySelector('.muka-icon');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper?.children.length).toBe(0);
    });
  });
});
