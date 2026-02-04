import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../../components/Badge';

describe('Badge Component', () => {
  describe('Rendering', () => {
    it('renders children', () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      const { container } = render(<Badge>Badge</Badge>);
      expect(container.querySelector('.muka-badge')).toBeInTheDocument();
      expect(container.querySelector('.muka-badge--default')).toBeInTheDocument();
      expect(container.querySelector('.muka-badge--sm')).toBeInTheDocument();
    });

    it('applies variant classes', () => {
      const { container, rerender } = render(<Badge variant="success">Success</Badge>);
      expect(container.querySelector('.muka-badge--success')).toBeInTheDocument();

      rerender(<Badge variant="warning">Warning</Badge>);
      expect(container.querySelector('.muka-badge--warning')).toBeInTheDocument();

      rerender(<Badge variant="error">Error</Badge>);
      expect(container.querySelector('.muka-badge--error')).toBeInTheDocument();

      rerender(<Badge variant="info">Info</Badge>);
      expect(container.querySelector('.muka-badge--info')).toBeInTheDocument();
    });

    it('applies size classes', () => {
      const { container, rerender } = render(<Badge size="sm">Small</Badge>);
      expect(container.querySelector('.muka-badge--sm')).toBeInTheDocument();

      rerender(<Badge size="md">Medium</Badge>);
      expect(container.querySelector('.muka-badge--md')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Badge className="custom-badge">Badge</Badge>);
      expect(container.querySelector('.custom-badge')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has role="status" by default', () => {
      render(<Badge>Status</Badge>);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has aria-live="polite" by default', () => {
      const { container } = render(<Badge>Status</Badge>);
      expect(container.firstChild).toHaveAttribute('aria-live', 'polite');
    });

    it('has aria-live="assertive" for error variant', () => {
      const { container } = render(<Badge variant="error">Error</Badge>);
      expect(container.firstChild).toHaveAttribute('aria-live', 'assertive');
    });

    it('has aria-live="polite" for non-error variants', () => {
      const { container, rerender } = render(<Badge variant="success">Success</Badge>);
      expect(container.firstChild).toHaveAttribute('aria-live', 'polite');

      rerender(<Badge variant="warning">Warning</Badge>);
      expect(container.firstChild).toHaveAttribute('aria-live', 'polite');

      rerender(<Badge variant="info">Info</Badge>);
      expect(container.firstChild).toHaveAttribute('aria-live', 'polite');
    });

    it('supports custom role', () => {
      render(<Badge role="alert">Alert</Badge>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Badge aria-label="3 new notifications">3</Badge>);
      expect(screen.getByLabelText('3 new notifications')).toBeInTheDocument();
    });

    it('supports custom aria-live', () => {
      const { container } = render(<Badge aria-live="off">Static</Badge>);
      expect(container.firstChild).toHaveAttribute('aria-live', 'off');
    });

    it('is hidden from assistive tech when decorative', () => {
      const { container } = render(<Badge decorative>Icon</Badge>);
      expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    });

    it('does not have role when decorative', () => {
      render(<Badge decorative>Decorative</Badge>);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('role="none" removes semantic role', () => {
      render(<Badge role="none">Text</Badge>);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });
});
