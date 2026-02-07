import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section } from '../../components/Section';

describe('Section Component', () => {
  describe('Rendering', () => {
    it('renders children', () => {
      render(<Section>Section content</Section>);
      expect(screen.getByText('Section content')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      const { container } = render(<Section>Content</Section>);
      expect(container.querySelector('.muka-section')).toBeInTheDocument();
      expect(container.querySelector('.muka-section--padding-default')).toBeInTheDocument();
    });

    it('applies padding variants', () => {
      const { container, rerender } = render(<Section padding="compact">Content</Section>);
      expect(container.querySelector('.muka-section--padding-compact')).toBeInTheDocument();

      rerender(<Section padding="spacious">Content</Section>);
      expect(container.querySelector('.muka-section--padding-spacious')).toBeInTheDocument();
    });

    it('renders as section by default', () => {
      const { container } = render(<Section>Content</Section>);
      expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('renders as custom element when as is provided', () => {
      const { container, rerender } = render(<Section as="div">Content</Section>);
      expect(container.querySelector('div.muka-section')).toBeInTheDocument();

      rerender(<Section as="aside">Content</Section>);
      expect(container.querySelector('aside.muka-section')).toBeInTheDocument();
    });

    it('merges className', () => {
      const { container } = render(<Section className="custom-class">Content</Section>);
      const el = container.querySelector('.muka-section');
      expect(el).toHaveClass('custom-class');
    });
  });
});
