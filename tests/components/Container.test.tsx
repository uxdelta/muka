import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from '../../components/Container';

describe('Container Component', () => {
  describe('Rendering', () => {
    it('renders children', () => {
      render(<Container>Container content</Container>);
      expect(screen.getByText('Container content')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      const { container } = render(<Container>Content</Container>);
      expect(container.querySelector('.muka-container')).toBeInTheDocument();
      expect(container.querySelector('.muka-container--max-width-large')).toBeInTheDocument();
      expect(container.querySelector('.muka-container--gap-none')).toBeInTheDocument();
    });

    it('applies maxWidth variants', () => {
      const { container, rerender } = render(<Container maxWidth="small">Content</Container>);
      expect(container.querySelector('.muka-container--max-width-small')).toBeInTheDocument();

      rerender(<Container maxWidth="medium">Content</Container>);
      expect(container.querySelector('.muka-container--max-width-medium')).toBeInTheDocument();

      rerender(<Container maxWidth="xlarge">Content</Container>);
      expect(container.querySelector('.muka-container--max-width-xlarge')).toBeInTheDocument();
    });

    it('applies gap variants', () => {
      const { container, rerender } = render(<Container gap="default">Content</Container>);
      expect(container.querySelector('.muka-container--gap-default')).toBeInTheDocument();

      rerender(<Container gap="compact">Content</Container>);
      expect(container.querySelector('.muka-container--gap-compact')).toBeInTheDocument();

      rerender(<Container gap="spacious">Content</Container>);
      expect(container.querySelector('.muka-container--gap-spacious')).toBeInTheDocument();
    });

    it('renders as div by default', () => {
      const { container } = render(<Container>Content</Container>);
      expect(container.querySelector('div.muka-container')).toBeInTheDocument();
    });

    it('renders as custom element when as is provided', () => {
      const { container, rerender } = render(<Container as="main">Content</Container>);
      expect(container.querySelector('main.muka-container')).toBeInTheDocument();

      rerender(<Container as="article">Content</Container>);
      expect(container.querySelector('article.muka-container')).toBeInTheDocument();
    });

    it('merges className', () => {
      const { container } = render(<Container className="custom-class">Content</Container>);
      const el = container.querySelector('.muka-container');
      expect(el).toHaveClass('custom-class');
    });
  });
});
