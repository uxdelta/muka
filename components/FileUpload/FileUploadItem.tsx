import React from 'react';
import { Icon } from '../Icon';
import { Progress } from '../Progress';
import { Button } from '../Button';
import './FileUpload.css';

export interface FileUploadItemProps {
  /** File object */
  file: File;

  /** Upload progress (0-100) */
  progress?: number;

  /** Upload status */
  status?: 'pending' | 'uploading' | 'success' | 'error';

  /** Error message */
  error?: string;

  /** Callback when file is removed */
  onRemove?: () => void;

  /** Show image preview thumbnail */
  showPreview?: boolean;

  /** Additional CSS classes */
  className?: string;
}

/**
 * FileUploadItem Component
 *
 * Displays an individual file in the upload list with progress,
 * preview thumbnail, and remove action.
 *
 * @accessibility WCAG 2.1 AA compliant
 * - Remove button has accessible label
 * - Status is conveyed through aria-label
 * - Error messages are associated with item
 */
export const FileUploadItem: React.FC<FileUploadItemProps> = ({
  file,
  progress = 0,
  status = 'pending',
  error,
  onRemove,
  showPreview = false,
  className = '',
}) => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  // Generate preview for images
  React.useEffect(() => {
    if (showPreview && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file, showPreview]);

  const itemClasses = [
    'muka-fileupload-item',
    `muka-fileupload-item--${status}`,
    className,
  ].filter(Boolean).join(' ');

  // Get file type icon
  const getFileIcon = () => {
    if (file.type.startsWith('image/')) {
      return <Icon name="image" variant="line" size="md" />;
    } else if (file.type.includes('pdf')) {
      return <Icon name="file-pdf" variant="line" size="md" />;
    } else if (file.type.includes('word') || file.type.includes('document')) {
      return <Icon name="file-word" variant="line" size="md" />;
    } else {
      return <Icon name="file" variant="line" size="md" />;
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <Icon name="check" variant="fill" size="sm" color="var(--color-text-success-default)" />;
      case 'error':
        return <Icon name="error-warning" variant="fill" size="sm" color="var(--color-text-error-default)" />;
      default:
        return null;
    }
  };

  const ariaLabel = `${file.name}, ${formatFileSize(file.size)}, ${status}${error ? `, error: ${error}` : ''}`;

  return (
    <div className={itemClasses} role="listitem" aria-label={ariaLabel}>
      {/* Preview or icon */}
      <div className="muka-fileupload-item__preview">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt=""
            className="muka-fileupload-item__preview-image"
          />
        ) : (
          <div className="muka-fileupload-item__icon">
            {getFileIcon()}
          </div>
        )}
      </div>

      {/* File info */}
      <div className="muka-fileupload-item__content">
        <div className="muka-fileupload-item__header">
          <span className="muka-fileupload-item__name">{file.name}</span>
          <span className="muka-fileupload-item__size">{formatFileSize(file.size)}</span>
        </div>

        {/* Progress bar for uploading state */}
        {status === 'uploading' && (
          <div className="muka-fileupload-item__progress">
            <Progress value={progress} size="sm" />
          </div>
        )}

        {/* Error message */}
        {status === 'error' && error && (
          <div className="muka-fileupload-item__error" role="alert">
            {error}
          </div>
        )}
      </div>

      {/* Status icon or remove button */}
      <div className="muka-fileupload-item__actions">
        {getStatusIcon()}
        {onRemove && (
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            iconLeft={<Icon name="x" variant="line" size="sm" />}
            onClick={onRemove}
            aria-label={`Remove ${file.name}`}
            className="muka-fileupload-item__remove"
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default FileUploadItem;
