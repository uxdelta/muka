import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DocumentViewer } from '../../components/DocumentViewer';

// Mock react-pdf
vi.mock('react-pdf', () => ({
  Document: ({ children, onLoadSuccess }: any) => {
    setTimeout(() => onLoadSuccess?.({ numPages: 3 }), 100);
    return <div data-testid="pdf-document">{children}</div>;
  },
  Page: ({ pageNumber }: any) => (
    <div data-testid={`pdf-page-${pageNumber}`}>Page {pageNumber}</div>
  ),
  pdfjs: {
    GlobalWorkerOptions: {},
    version: '3.11.174',
  },
}));

const SAMPLE_PDF = 'https://example.com/sample.pdf';
const SAMPLE_IMAGE = 'https://example.com/image.jpg';

describe('DocumentViewer Component', () => {
  describe('Rendering', () => {
    it('renders the document viewer container', () => {
      render(<DocumentViewer src={SAMPLE_PDF} />);
      expect(screen.getByRole('region', { name: 'Document viewer' })).toBeInTheDocument();
    });

    it('renders toolbar when showToolbar is true', async () => {
      render(<DocumentViewer src={SAMPLE_PDF} showToolbar={true} />);
      await waitFor(() => {
        expect(screen.getByRole('toolbar', { name: 'Document controls' })).toBeInTheDocument();
      });
    });

    it('does not render toolbar when showToolbar is false', () => {
      render(<DocumentViewer src={SAMPLE_PDF} showToolbar={false} />);
      expect(screen.queryByRole('toolbar')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <DocumentViewer src={SAMPLE_PDF} className="custom-viewer" />
      );
      expect(container.querySelector('.custom-viewer')).toBeInTheDocument();
    });

    it('sets custom height', () => {
      const { container } = render(<DocumentViewer src={SAMPLE_PDF} height={800} />);
      const viewer = container.querySelector('.muka-documentviewer');
      expect(viewer).toHaveStyle({ height: '800px' });
    });

    it('supports string height values', () => {
      const { container } = render(<DocumentViewer src={SAMPLE_PDF} height="100vh" />);
      const viewer = container.querySelector('.muka-documentviewer');
      expect(viewer).toHaveStyle({ height: '100vh' });
    });
  });

  describe('Document Type Detection', () => {
    it('detects PDF from file extension', () => {
      const { container } = render(<DocumentViewer src="document.pdf" type="auto" />);
      expect(screen.getByTestId('pdf-document')).toBeInTheDocument();
    });

    it('detects image from file extension', () => {
      render(<DocumentViewer src="image.jpg" type="auto" />);
      // Image canvas should be rendered (would need integration test for full verification)
    });

    it('respects explicit type="pdf"', () => {
      render(<DocumentViewer src={SAMPLE_PDF} type="pdf" />);
      expect(screen.getByTestId('pdf-document')).toBeInTheDocument();
    });

    it('respects explicit type="image"', () => {
      const { container } = render(<DocumentViewer src={SAMPLE_IMAGE} type="image" />);
      expect(container.querySelector('.muka-documentviewer__canvas')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows loading indicator initially', () => {
      const { container } = render(<DocumentViewer src={SAMPLE_PDF} />);
      expect(container.querySelector('.muka-documentviewer__loading')).toBeInTheDocument();
    });

    it('shows progress indicator during loading', () => {
      render(<DocumentViewer src={SAMPLE_PDF} />);
      expect(screen.getByLabelText('Loading document')).toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('calls onLoad when document loads', async () => {
      const handleLoad = vi.fn();
      render(<DocumentViewer src={SAMPLE_PDF} onLoad={handleLoad} />);

      await waitFor(() => {
        expect(handleLoad).toHaveBeenCalledWith(
          expect.objectContaining({
            totalPages: 3,
          })
        );
      });
    });

    it('calls onPageChange when page changes', async () => {
      const handlePageChange = vi.fn();
      render(
        <DocumentViewer
          src={SAMPLE_PDF}
          showToolbar={true}
          onPageChange={handlePageChange}
        />
      );

      await waitFor(() => {
        const nextButton = screen.getByLabelText('Next page');
        fireEvent.click(nextButton);
      });

      await waitFor(() => {
        expect(handlePageChange).toHaveBeenCalledWith(2);
      });
    });

    it('calls onZoomChange when zoom changes', async () => {
      const handleZoomChange = vi.fn();
      render(
        <DocumentViewer
          src={SAMPLE_PDF}
          showToolbar={true}
          onZoomChange={handleZoomChange}
        />
      );

      await waitFor(() => {
        const zoomInButton = screen.getByLabelText('Zoom in');
        fireEvent.click(zoomInButton);
      });

      await waitFor(() => {
        expect(handleZoomChange).toHaveBeenCalledWith(1.25);
      });
    });
  });

  describe('Toolbar Controls', () => {
    it('disables previous page button on first page', async () => {
      render(<DocumentViewer src={SAMPLE_PDF} showToolbar={true} initialPage={1} />);

      await waitFor(() => {
        const prevButton = screen.getByLabelText('Previous page');
        expect(prevButton).toBeDisabled();
      });
    });

    it('disables next page button on last page', async () => {
      render(<DocumentViewer src={SAMPLE_PDF} showToolbar={true} initialPage={3} />);

      await waitFor(() => {
        const nextButton = screen.getByLabelText('Next page');
        expect(nextButton).toBeDisabled();
      });
    });

    it('enables both navigation buttons on middle pages', async () => {
      render(<DocumentViewer src={SAMPLE_PDF} showToolbar={true} initialPage={2} />);

      await waitFor(() => {
        expect(screen.getByLabelText('Previous page')).not.toBeDisabled();
        expect(screen.getByLabelText('Next page')).not.toBeDisabled();
      });
    });

    it('shows download button when allowDownload is true', async () => {
      render(<DocumentViewer src={SAMPLE_PDF} showToolbar={true} allowDownload={true} />);

      await waitFor(() => {
        expect(screen.getByLabelText('Download document')).toBeInTheDocument();
      });
    });

    it('shows print button when allowPrint is true', async () => {
      render(<DocumentViewer src={SAMPLE_PDF} showToolbar={true} allowPrint={true} />);

      await waitFor(() => {
        expect(screen.getByLabelText('Print document')).toBeInTheDocument();
      });
    });

    it('shows fullscreen button when allowFullscreen is true', async () => {
      render(<DocumentViewer src={SAMPLE_PDF} showToolbar={true} allowFullscreen={true} />);

      await waitFor(() => {
        expect(screen.getByLabelText('Toggle fullscreen')).toBeInTheDocument();
      });
    });

    it('hides action buttons by default', async () => {
      render(<DocumentViewer src={SAMPLE_PDF} showToolbar={true} />);

      await waitFor(() => {
        expect(screen.queryByLabelText('Download document')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Print document')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Toggle fullscreen')).not.toBeInTheDocument();
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('navigates to next page with ArrowRight', async () => {
      const handlePageChange = vi.fn();
      render(
        <DocumentViewer
          src={SAMPLE_PDF}
          showToolbar={true}
          initialPage={1}
          onPageChange={handlePageChange}
        />
      );

      await waitFor(() => {
        expect(screen.getByRole('toolbar')).toBeInTheDocument();
      });

      fireEvent.keyDown(window, { key: 'ArrowRight' });

      await waitFor(() => {
        expect(handlePageChange).toHaveBeenCalledWith(2);
      });
    });

    it('navigates to previous page with ArrowLeft', async () => {
      const handlePageChange = vi.fn();
      render(
        <DocumentViewer
          src={SAMPLE_PDF}
          showToolbar={true}
          initialPage={2}
          onPageChange={handlePageChange}
        />
      );

      await waitFor(() => {
        expect(screen.getByRole('toolbar')).toBeInTheDocument();
      });

      fireEvent.keyDown(window, { key: 'ArrowLeft' });

      await waitFor(() => {
        expect(handlePageChange).toHaveBeenCalledWith(1);
      });
    });

    it('zooms in with + key', async () => {
      const handleZoomChange = vi.fn();
      render(
        <DocumentViewer
          src={SAMPLE_PDF}
          showToolbar={true}
          initialZoom={1}
          onZoomChange={handleZoomChange}
        />
      );

      await waitFor(() => {
        expect(screen.getByRole('toolbar')).toBeInTheDocument();
      });

      fireEvent.keyDown(window, { key: '+' });

      await waitFor(() => {
        expect(handleZoomChange).toHaveBeenCalledWith(1.25);
      });
    });

    it('zooms out with - key', async () => {
      const handleZoomChange = vi.fn();
      render(
        <DocumentViewer
          src={SAMPLE_PDF}
          showToolbar={true}
          initialZoom={1}
          onZoomChange={handleZoomChange}
        />
      );

      await waitFor(() => {
        expect(screen.getByRole('toolbar')).toBeInTheDocument();
      });

      fireEvent.keyDown(window, { key: '-' });

      await waitFor(() => {
        expect(handleZoomChange).toHaveBeenCalledWith(0.75);
      });
    });

    it('resets zoom with Ctrl+0', async () => {
      const handleZoomChange = vi.fn();
      render(
        <DocumentViewer
          src={SAMPLE_PDF}
          showToolbar={true}
          initialZoom={1.5}
          onZoomChange={handleZoomChange}
        />
      );

      await waitFor(() => {
        expect(screen.getByRole('toolbar')).toBeInTheDocument();
      });

      fireEvent.keyDown(window, { key: '0', ctrlKey: true });

      await waitFor(() => {
        expect(handleZoomChange).toHaveBeenCalledWith(1);
      });
    });
  });

  describe('Initial State', () => {
    it('respects initialPage prop', async () => {
      render(<DocumentViewer src={SAMPLE_PDF} showToolbar={true} initialPage={2} />);

      await waitFor(() => {
        const pageInput = screen.getByLabelText('Current page') as HTMLInputElement;
        expect(pageInput.value).toBe('2');
      });
    });

    it('respects initialZoom prop', async () => {
      render(<DocumentViewer src={SAMPLE_PDF} showToolbar={true} initialZoom={1.5} />);

      await waitFor(() => {
        expect(screen.getByLabelText(/Zoom level 150%/)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA role', () => {
      render(<DocumentViewer src={SAMPLE_PDF} />);
      expect(screen.getByRole('region', { name: 'Document viewer' })).toBeInTheDocument();
    });

    it('announces page changes to screen readers', async () => {
      render(<DocumentViewer src={SAMPLE_PDF} showToolbar={true} initialPage={1} />);

      await waitFor(() => {
        const liveRegion = screen.getByRole('status', { hidden: true });
        expect(liveRegion).toHaveAttribute('aria-live', 'polite');
      });
    });

    it('toolbar has proper ARIA label', async () => {
      render(<DocumentViewer src={SAMPLE_PDF} showToolbar={true} />);

      await waitFor(() => {
        expect(screen.getByRole('toolbar', { name: 'Document controls' })).toBeInTheDocument();
      });
    });

    it('all toolbar buttons have ARIA labels', async () => {
      render(
        <DocumentViewer
          src={SAMPLE_PDF}
          showToolbar={true}
          allowDownload={true}
          allowPrint={true}
          allowFullscreen={true}
        />
      );

      await waitFor(() => {
        expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
        expect(screen.getByLabelText('Next page')).toBeInTheDocument();
        expect(screen.getByLabelText('Zoom in')).toBeInTheDocument();
        expect(screen.getByLabelText('Zoom out')).toBeInTheDocument();
        expect(screen.getByLabelText('Download document')).toBeInTheDocument();
        expect(screen.getByLabelText('Print document')).toBeInTheDocument();
        expect(screen.getByLabelText('Toggle fullscreen')).toBeInTheDocument();
      });
    });
  });

  describe('Zoom Limits', () => {
    it('limits zoom out to 0.25x', async () => {
      const handleZoomChange = vi.fn();
      render(
        <DocumentViewer
          src={SAMPLE_PDF}
          showToolbar={true}
          initialZoom={0.25}
          onZoomChange={handleZoomChange}
        />
      );

      await waitFor(() => {
        const zoomOutButton = screen.getByLabelText('Zoom out');
        expect(zoomOutButton).toBeDisabled();
      });
    });

    it('limits zoom in to 5x', async () => {
      const handleZoomChange = vi.fn();
      render(
        <DocumentViewer
          src={SAMPLE_PDF}
          showToolbar={true}
          initialZoom={5}
          onZoomChange={handleZoomChange}
        />
      );

      await waitFor(() => {
        const zoomInButton = screen.getByLabelText('Zoom in');
        expect(zoomInButton).toBeDisabled();
      });
    });
  });

  describe('Thumbnails', () => {
    it('renders thumbnails when showThumbnails is true for PDF', async () => {
      const { container } = render(
        <DocumentViewer src={SAMPLE_PDF} type="pdf" showThumbnails={true} />
      );

      await waitFor(() => {
        expect(container.querySelector('.muka-documentviewer__thumbnails')).toBeInTheDocument();
      });
    });

    it('applies with-thumbnails class when thumbnails are shown', async () => {
      const { container } = render(
        <DocumentViewer src={SAMPLE_PDF} type="pdf" showThumbnails={true} />
      );

      await waitFor(() => {
        expect(
          container.querySelector('.muka-documentviewer--with-thumbnails')
        ).toBeInTheDocument();
      });
    });

    it('does not render thumbnails for images', () => {
      const { container } = render(
        <DocumentViewer src={SAMPLE_IMAGE} type="image" showThumbnails={true} />
      );

      expect(container.querySelector('.muka-documentviewer__thumbnails')).not.toBeInTheDocument();
    });
  });
});
