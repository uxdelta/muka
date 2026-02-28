import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FileUpload, FileUploadItem } from '../../components/FileUpload';

describe('FileUpload Component', () => {
  describe('Rendering', () => {
    it('renders dropzone variant by default', () => {
      render(<FileUpload />);
      expect(screen.getByRole('button', { name: /upload files/i })).toBeInTheDocument();
    });

    it('renders with custom aria-label', () => {
      render(<FileUpload aria-label="Upload documents" />);
      expect(screen.getByRole('button', { name: /upload documents/i })).toBeInTheDocument();
    });

    it('renders default content when no children provided', () => {
      render(<FileUpload />);
      expect(screen.getByText(/drag files here or click to browse/i)).toBeInTheDocument();
    });

    it('renders custom children', () => {
      render(
        <FileUpload>
          <span>Custom upload text</span>
        </FileUpload>
      );
      expect(screen.getByText('Custom upload text')).toBeInTheDocument();
    });

    it('shows accepted file types hint', () => {
      render(<FileUpload accept="image/*,.pdf" />);
      expect(screen.getByText(/accepted: image\/\*,\.pdf/i)).toBeInTheDocument();
    });

    it('shows max size in hint', () => {
      render(<FileUpload accept=".pdf" maxSize={1024 * 1024} />);
      expect(screen.getByText(/max 1 MB/i)).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('applies sm size class', () => {
      render(<FileUpload size="sm" />);
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      expect(dropzone).toHaveClass('muka-fileupload--sm');
    });

    it('applies md size class by default', () => {
      render(<FileUpload />);
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      expect(dropzone).toHaveClass('muka-fileupload--md');
    });

    it('applies lg size class', () => {
      render(<FileUpload size="lg" />);
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      expect(dropzone).toHaveClass('muka-fileupload--lg');
    });
  });

  describe('Variant Styles', () => {
    it('applies dropzone variant class by default', () => {
      render(<FileUpload />);
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      expect(dropzone).toHaveClass('muka-fileupload--dropzone');
    });

    it('applies button variant class', () => {
      render(<FileUpload variant="button" />);
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      expect(dropzone).toHaveClass('muka-fileupload--button');
    });
  });

  describe('Disabled State', () => {
    it('applies disabled class when disabled', () => {
      render(<FileUpload disabled />);
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      expect(dropzone).toHaveClass('muka-fileupload--disabled');
    });

    it('sets aria-disabled when disabled', () => {
      render(<FileUpload disabled />);
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      expect(dropzone).toHaveAttribute('aria-disabled', 'true');
    });

    it('removes tabIndex when disabled', () => {
      render(<FileUpload disabled />);
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      expect(dropzone).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('File Selection', () => {
    it('calls onFilesChange when files are selected', async () => {
      const onFilesChange = vi.fn();
      render(<FileUpload onFilesChange={onFilesChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['test'], 'test.txt', { type: 'text/plain' });

      Object.defineProperty(input, 'files', { value: [file] });
      fireEvent.change(input);

      expect(onFilesChange).toHaveBeenCalledTimes(1);
      expect(onFilesChange).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            file: expect.objectContaining({ name: 'test.txt' }),
            status: 'success',
          }),
        ])
      );
    });

    it('allows multiple files when multiple prop is true', () => {
      render(<FileUpload multiple />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('multiple');
    });

    it('does not allow multiple files by default', () => {
      render(<FileUpload />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).not.toHaveAttribute('multiple');
    });

    it('sets accept attribute on input', () => {
      render(<FileUpload accept="image/*,.pdf" />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('accept', 'image/*,.pdf');
    });
  });

  describe('File Validation', () => {
    it('calls onError for files exceeding maxSize', () => {
      const onError = vi.fn();
      render(<FileUpload maxSize={100} onError={onError} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['x'.repeat(200)], 'large.txt', { type: 'text/plain' });

      Object.defineProperty(input, 'files', { value: [file] });
      fireEvent.change(input);

      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'size',
          file: expect.objectContaining({ name: 'large.txt' }),
        })
      );
    });

    it('calls onError for invalid file types', () => {
      const onError = vi.fn();
      render(<FileUpload accept=".pdf" onError={onError} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['test'], 'test.txt', { type: 'text/plain' });

      Object.defineProperty(input, 'files', { value: [file] });
      fireEvent.change(input);

      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'type',
          file: expect.objectContaining({ name: 'test.txt' }),
        })
      );
    });

    it('calls onError when maxFiles is exceeded', () => {
      const onError = vi.fn();
      render(<FileUpload maxFiles={1} multiple onError={onError} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const files = [
        new File(['a'], 'a.txt', { type: 'text/plain' }),
        new File(['b'], 'b.txt', { type: 'text/plain' }),
      ];

      Object.defineProperty(input, 'files', { value: files });
      fireEvent.change(input);

      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'count',
        })
      );
    });
  });

  describe('Keyboard Interaction', () => {
    it('opens file dialog on Enter key', () => {
      render(<FileUpload />);
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = vi.spyOn(input, 'click');

      fireEvent.keyDown(dropzone, { key: 'Enter' });
      expect(clickSpy).toHaveBeenCalled();
    });

    it('opens file dialog on Space key', () => {
      render(<FileUpload />);
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = vi.spyOn(input, 'click');

      fireEvent.keyDown(dropzone, { key: ' ' });
      expect(clickSpy).toHaveBeenCalled();
    });

    it('does not open file dialog when disabled', () => {
      render(<FileUpload disabled />);
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = vi.spyOn(input, 'click');

      fireEvent.keyDown(dropzone, { key: 'Enter' });
      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<FileUpload />);
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      expect(dropzone).toHaveAttribute('aria-dropeffect', 'copy');
    });

    it('input is hidden from accessibility tree', () => {
      render(<FileUpload />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('aria-hidden', 'true');
      expect(input).toHaveAttribute('tabIndex', '-1');
    });

    it('file list has accessible label', () => {
      const file = new File(['test'], 'test.txt', { type: 'text/plain' });
      render(
        <FileUpload
          files={[{ file, id: '1', status: 'success' }]}
          onFilesChange={() => {}}
        />
      );
      expect(screen.getByRole('list', { name: /uploaded files/i })).toBeInTheDocument();
    });
  });
});

describe('FileUploadItem Component', () => {
  const mockFile = new File(['test content'], 'test-file.txt', { type: 'text/plain' });

  describe('Rendering', () => {
    it('renders file name', () => {
      render(<FileUploadItem file={mockFile} />);
      expect(screen.getByText('test-file.txt')).toBeInTheDocument();
    });

    it('renders file size', () => {
      render(<FileUploadItem file={mockFile} />);
      expect(screen.getByText(/12 B/)).toBeInTheDocument();
    });

    it('shows progress during upload', () => {
      render(<FileUploadItem file={mockFile} status="uploading" progress={50} />);
      expect(screen.getByText(/50%/)).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('shows error message when status is error', () => {
      render(<FileUploadItem file={mockFile} status="error" error="Upload failed" />);
      expect(screen.getByText(/Upload failed/)).toBeInTheDocument();
    });

    it('shows success icon when upload completes', () => {
      render(<FileUploadItem file={mockFile} status="success" />);
      expect(screen.getByLabelText('Upload complete')).toBeInTheDocument();
    });

    it('shows error icon when upload fails', () => {
      render(<FileUploadItem file={mockFile} status="error" />);
      expect(screen.getByLabelText('Upload failed')).toBeInTheDocument();
    });
  });

  describe('Preview', () => {
    it('shows thumbnail when showPreview and previewUrl are provided', () => {
      render(
        <FileUploadItem
          file={mockFile}
          showPreview
          previewUrl="data:image/png;base64,test"
        />
      );
      const img = screen.getByAltText(/preview of test-file.txt/i);
      expect(img).toBeInTheDocument();
    });

    it('shows file icon when no preview available', () => {
      render(<FileUploadItem file={mockFile} />);
      expect(document.querySelector('.muka-fileupload-item__icon')).toBeInTheDocument();
    });
  });

  describe('Remove Action', () => {
    it('renders remove button when onRemove is provided', () => {
      const onRemove = vi.fn();
      render(<FileUploadItem file={mockFile} onRemove={onRemove} />);
      expect(screen.getByRole('button', { name: /remove test-file.txt/i })).toBeInTheDocument();
    });

    it('calls onRemove when remove button is clicked', () => {
      const onRemove = vi.fn();
      render(<FileUploadItem file={mockFile} onRemove={onRemove} />);
      fireEvent.click(screen.getByRole('button', { name: /remove test-file.txt/i }));
      expect(onRemove).toHaveBeenCalledTimes(1);
    });

    it('does not render remove button when onRemove is not provided', () => {
      render(<FileUploadItem file={mockFile} />);
      expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument();
    });
  });

  describe('Status Classes', () => {
    it('applies pending status class', () => {
      render(<FileUploadItem file={mockFile} status="pending" />);
      expect(document.querySelector('.muka-fileupload-item--pending')).toBeInTheDocument();
    });

    it('applies uploading status class', () => {
      render(<FileUploadItem file={mockFile} status="uploading" progress={50} />);
      expect(document.querySelector('.muka-fileupload-item--uploading')).toBeInTheDocument();
    });

    it('applies success status class', () => {
      render(<FileUploadItem file={mockFile} status="success" />);
      expect(document.querySelector('.muka-fileupload-item--success')).toBeInTheDocument();
    });

    it('applies error status class', () => {
      render(<FileUploadItem file={mockFile} status="error" />);
      expect(document.querySelector('.muka-fileupload-item--error')).toBeInTheDocument();
    });
  });
});
