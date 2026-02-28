import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileUpload } from './FileUpload';
import { FileUploadItem } from './FileUploadItem';

// Create mock files for testing
const createMockFile = (name: string, size: number, type: string): File => {
  const file = new File(['a'.repeat(size)], name, { type });
  return file;
};

describe('FileUpload Component', () => {
  describe('Rendering', () => {
    it('renders dropzone variant by default', () => {
      render(<FileUpload />);
      expect(screen.getByRole('button', { name: /upload files/i })).toBeInTheDocument();
    });

    it('renders button variant', () => {
      render(
        <FileUpload variant="button">
          <button>Upload</button>
        </FileUpload>
      );
      expect(screen.getByRole('button', { name: /upload files/i })).toBeInTheDocument();
    });

    it('applies size classes', () => {
      const { container, rerender } = render(<FileUpload size="sm" />);
      expect(container.querySelector('.muka-fileupload--sm')).toBeInTheDocument();

      rerender(<FileUpload size="md" />);
      expect(container.querySelector('.muka-fileupload--md')).toBeInTheDocument();

      rerender(<FileUpload size="lg" />);
      expect(container.querySelector('.muka-fileupload--lg')).toBeInTheDocument();
    });

    it('renders custom children in dropzone', () => {
      render(
        <FileUpload>
          <div data-testid="custom-content">Custom Drop Zone</div>
        </FileUpload>
      );
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    it('applies disabled state', () => {
      render(<FileUpload disabled />);
      const dropzone = screen.getByRole('button');
      expect(dropzone).toHaveAttribute('aria-disabled', 'true');
    });

    it('renders with custom aria-label', () => {
      render(<FileUpload aria-label="Upload documents" />);
      expect(screen.getByRole('button', { name: 'Upload documents' })).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<FileUpload className="custom-class" />);
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('File Selection', () => {
    it('opens file dialog on click', async () => {
      const user = userEvent.setup();
      render(<FileUpload />);
      
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      
      const clickSpy = vi.fn();
      input.click = clickSpy;
      
      await user.click(dropzone);
      expect(clickSpy).toHaveBeenCalled();
    });

    it('opens file dialog on Enter key', async () => {
      const user = userEvent.setup();
      render(<FileUpload />);
      
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      
      const clickSpy = vi.fn();
      input.click = clickSpy;
      
      dropzone.focus();
      await user.keyboard('{Enter}');
      expect(clickSpy).toHaveBeenCalled();
    });

    it('opens file dialog on Space key', async () => {
      const user = userEvent.setup();
      render(<FileUpload />);
      
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      
      const clickSpy = vi.fn();
      input.click = clickSpy;
      
      dropzone.focus();
      await user.keyboard(' ');
      expect(clickSpy).toHaveBeenCalled();
    });

    it('does not open file dialog when disabled', async () => {
      const user = userEvent.setup();
      render(<FileUpload disabled />);
      
      const dropzone = screen.getByRole('button');
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      
      const clickSpy = vi.fn();
      input.click = clickSpy;
      
      await user.click(dropzone);
      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('handles file input change', () => {
      const handleChange = vi.fn();
      render(<FileUpload files={[]} onFilesChange={handleChange} />);
      
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('test.txt', 1024, 'text/plain');
      
      fireEvent.change(input, { target: { files: [file] } });
      
      expect(handleChange).toHaveBeenCalledWith([file]);
    });
  });

  describe('Drag and Drop', () => {
    it('handles drag enter', () => {
      const { container } = render(<FileUpload />);
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      
      fireEvent.dragEnter(dropzone, {
        dataTransfer: { files: [] }
      });
      
      expect(container.querySelector('.muka-fileupload__dropzone--dragging')).toBeInTheDocument();
    });

    it('handles drag leave', () => {
      const { container } = render(<FileUpload />);
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      
      fireEvent.dragEnter(dropzone, {
        dataTransfer: { files: [] }
      });
      
      fireEvent.dragLeave(dropzone, {
        dataTransfer: { files: [] }
      });
      
      expect(container.querySelector('.muka-fileupload__dropzone--dragging')).not.toBeInTheDocument();
    });

    it('handles file drop', () => {
      const handleChange = vi.fn();
      render(<FileUpload files={[]} onFilesChange={handleChange} />);
      
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      const file = createMockFile('test.txt', 1024, 'text/plain');
      
      fireEvent.drop(dropzone, {
        dataTransfer: { files: [file] }
      });
      
      expect(handleChange).toHaveBeenCalledWith([file]);
    });

    it('does not handle drop when disabled', () => {
      const handleChange = vi.fn();
      render(<FileUpload disabled onFilesChange={handleChange} />);
      
      const dropzone = screen.getByRole('button');
      const file = createMockFile('test.txt', 1024, 'text/plain');
      
      fireEvent.drop(dropzone, {
        dataTransfer: { files: [file] }
      });
      
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Validation', () => {
    it('validates file size', () => {
      const handleError = vi.fn();
      render(
        <FileUpload
          maxSize={1024} // 1KB
          onError={handleError}
        />
      );
      
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('large.txt', 2048, 'text/plain'); // 2KB
      
      fireEvent.change(input, { target: { files: [file] } });
      
      expect(handleError).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'size',
          file: file,
        })
      );
    });

    it('validates file type', () => {
      const handleError = vi.fn();
      render(
        <FileUpload
          accept="image/*"
          onError={handleError}
        />
      );
      
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('test.txt', 1024, 'text/plain');
      
      fireEvent.change(input, { target: { files: [file] } });
      
      expect(handleError).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'type',
          file: file,
        })
      );
    });

    it('validates file count', () => {
      const handleError = vi.fn();
      render(
        <FileUpload
          maxFiles={2}
          multiple
          onError={handleError}
        />
      );
      
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const files = [
        createMockFile('test1.txt', 1024, 'text/plain'),
        createMockFile('test2.txt', 1024, 'text/plain'),
        createMockFile('test3.txt', 1024, 'text/plain'),
      ];
      
      fireEvent.change(input, { target: { files } });
      
      expect(handleError).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'count',
        })
      );
    });

    it('accepts valid files', () => {
      const handleChange = vi.fn();
      const handleError = vi.fn();
      render(
        <FileUpload
          files={[]}
          accept="image/*"
          maxSize={1024 * 1024}
          onFilesChange={handleChange}
          onError={handleError}
        />
      );
      
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('test.jpg', 1024, 'image/jpeg');
      
      fireEvent.change(input, { target: { files: [file] } });
      
      expect(handleChange).toHaveBeenCalledWith([file]);
      expect(handleError).not.toHaveBeenCalled();
    });

    it('displays validation error alert', () => {
      render(
        <FileUpload
          maxSize={1024}
        />
      );
      
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('large.txt', 2048, 'text/plain');
      
      fireEvent.change(input, { target: { files: [file] } });
      
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('File List', () => {
    it('displays uploaded files', () => {
      const files = [createMockFile('test.txt', 1024, 'text/plain')];
      render(<FileUpload files={files} />);
      
      expect(screen.getByRole('list', { name: /uploaded files/i })).toBeInTheDocument();
      expect(screen.getByText('test.txt')).toBeInTheDocument();
    });

    it('removes file when remove button is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const files = [createMockFile('test.txt', 1024, 'text/plain')];
      
      render(<FileUpload files={files} onFilesChange={handleChange} />);
      
      const removeButton = screen.getByRole('button', { name: /remove test.txt/i });
      await user.click(removeButton);
      
      expect(handleChange).toHaveBeenCalledWith([]);
    });

    it('displays preview for images when showPreview is true', async () => {
      const files = [createMockFile('test.jpg', 1024, 'image/jpeg')];
      const { container } = render(<FileUpload files={files} showPreview />);
      
      // Preview image should be rendered (after URL.createObjectURL)
      await waitFor(() => {
        const img = container.querySelector('img.muka-fileupload-item__preview-image');
        expect(img).toBeInTheDocument();
      });
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component', () => {
      render(<FileUpload />);
      
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('test.txt', 1024, 'text/plain');
      
      fireEvent.change(input, { target: { files: [file] } });
      
      expect(screen.getByText('test.txt')).toBeInTheDocument();
    });

    it('works as controlled component', () => {
      const handleChange = vi.fn();
      const files = [createMockFile('test.txt', 1024, 'text/plain')];
      
      const { rerender } = render(
        <FileUpload files={files} onFilesChange={handleChange} />
      );
      
      expect(screen.getByText('test.txt')).toBeInTheDocument();
      
      // Update files
      const newFiles = [
        createMockFile('test1.txt', 1024, 'text/plain'),
        createMockFile('test2.txt', 1024, 'text/plain'),
      ];
      
      rerender(<FileUpload files={newFiles} onFilesChange={handleChange} />);
      
      expect(screen.getByText('test1.txt')).toBeInTheDocument();
      expect(screen.getByText('test2.txt')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<FileUpload />);
      
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      expect(dropzone).toHaveAttribute('aria-dropeffect', 'copy');
      expect(dropzone).toHaveAttribute('tabIndex', '0');
    });

    it('sets aria-busy during upload', () => {
      render(<FileUpload uploadFn={async () => ({ success: true })} />);
      
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('test.txt', 1024, 'text/plain');
      
      fireEvent.change(input, { target: { files: [file] } });
      
      // During upload, aria-busy should be true
      waitFor(() => {
        expect(dropzone).toHaveAttribute('aria-busy', 'true');
      });
    });

    it('is keyboard navigable', () => {
      render(<FileUpload />);
      
      const dropzone = screen.getByRole('button', { name: /upload files/i });
      expect(dropzone).toHaveAttribute('tabIndex', '0');
    });

    it('disabled state prevents keyboard interaction', () => {
      render(<FileUpload disabled />);
      
      const dropzone = screen.getByRole('button');
      expect(dropzone).toHaveAttribute('tabIndex', '-1');
      expect(dropzone).toHaveAttribute('aria-disabled', 'true');
    });
  });
});

describe('FileUploadItem Component', () => {
  const mockFile = createMockFile('test.txt', 1024, 'text/plain');

  describe('Rendering', () => {
    it('renders file name and size', () => {
      render(<FileUploadItem file={mockFile} />);
      
      expect(screen.getByText('test.txt')).toBeInTheDocument();
      expect(screen.getByText(/1 KB/i)).toBeInTheDocument();
    });

    it('applies status classes', () => {
      const { container, rerender } = render(
        <FileUploadItem file={mockFile} status="pending" />
      );
      expect(container.querySelector('.muka-fileupload-item--pending')).toBeInTheDocument();

      rerender(<FileUploadItem file={mockFile} status="uploading" />);
      expect(container.querySelector('.muka-fileupload-item--uploading')).toBeInTheDocument();

      rerender(<FileUploadItem file={mockFile} status="success" />);
      expect(container.querySelector('.muka-fileupload-item--success')).toBeInTheDocument();

      rerender(<FileUploadItem file={mockFile} status="error" />);
      expect(container.querySelector('.muka-fileupload-item--error')).toBeInTheDocument();
    });

    it('displays progress bar when uploading', () => {
      render(<FileUploadItem file={mockFile} status="uploading" progress={50} />);
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    });

    it('displays error message when status is error', () => {
      render(
        <FileUploadItem file={mockFile} status="error" error="Upload failed" />
      );
      
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Upload failed')).toBeInTheDocument();
    });

    it('displays success icon when status is success', () => {
      const { container } = render(
        <FileUploadItem file={mockFile} status="success" />
      );
      
      // Success icon should be rendered
      expect(container.querySelector('.muka-icon')).toBeInTheDocument();
    });

    it('renders remove button', () => {
      const handleRemove = vi.fn();
      render(<FileUploadItem file={mockFile} onRemove={handleRemove} />);
      
      expect(screen.getByRole('button', { name: /remove test.txt/i })).toBeInTheDocument();
    });
  });

  describe('Interactive Behavior', () => {
    it('calls onRemove when remove button is clicked', async () => {
      const user = userEvent.setup();
      const handleRemove = vi.fn();
      
      render(<FileUploadItem file={mockFile} onRemove={handleRemove} />);
      
      const removeButton = screen.getByRole('button', { name: /remove test.txt/i });
      await user.click(removeButton);
      
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });
  });

  describe('File Type Icons', () => {
    it('displays image icon for image files', () => {
      const imageFile = createMockFile('photo.jpg', 1024, 'image/jpeg');
      const { container } = render(<FileUploadItem file={imageFile} />);
      
      expect(container.querySelector('.muka-icon')).toBeInTheDocument();
    });

    it('displays PDF icon for PDF files', () => {
      const pdfFile = createMockFile('document.pdf', 1024, 'application/pdf');
      const { container } = render(<FileUploadItem file={pdfFile} />);
      
      expect(container.querySelector('.muka-icon')).toBeInTheDocument();
    });

    it('displays Word icon for Word files', () => {
      const wordFile = createMockFile('document.docx', 1024, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      const { container } = render(<FileUploadItem file={wordFile} />);
      
      expect(container.querySelector('.muka-icon')).toBeInTheDocument();
    });

    it('displays generic file icon for other file types', () => {
      const { container } = render(<FileUploadItem file={mockFile} />);
      
      expect(container.querySelector('.muka-icon')).toBeInTheDocument();
    });
  });

  describe('Preview', () => {
    it('displays image preview when showPreview is true', async () => {
      const imageFile = createMockFile('photo.jpg', 1024, 'image/jpeg');
      
      const { container } = render(<FileUploadItem file={imageFile} showPreview />);
      
      // Wait for preview to load
      await waitFor(() => {
        const img = container.querySelector('img.muka-fileupload-item__preview-image');
        expect(img).toBeInTheDocument();
      });
    });

    it('does not display preview for non-image files', () => {
      render(<FileUploadItem file={mockFile} showPreview />);
      
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-label with file info', () => {
      render(<FileUploadItem file={mockFile} status="pending" />);
      
      const item = screen.getByRole('listitem');
      expect(item).toHaveAttribute('aria-label', expect.stringContaining('test.txt'));
      expect(item).toHaveAttribute('aria-label', expect.stringContaining('1 KB'));
      expect(item).toHaveAttribute('aria-label', expect.stringContaining('pending'));
    });

    it('includes error in aria-label when present', () => {
      render(
        <FileUploadItem file={mockFile} status="error" error="Upload failed" />
      );
      
      const item = screen.getByRole('listitem');
      expect(item).toHaveAttribute('aria-label', expect.stringContaining('Upload failed'));
    });
  });
});
