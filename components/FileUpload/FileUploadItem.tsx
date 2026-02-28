import React from 'react';
import { Progress } from '../Progress';
import { Icon } from '../Icon';
import { Button } from '../Button';

export interface FileUploadItemProps {
  /** The file object */
  file: File;

  /** Upload progress (0-100) */
  progress?: number;

  /** Upload status */
  status?: 'pending' | 'uploading' | 'success' | 'error';

  /** Error message if upload failed */
  error?: string;

  /** Preview URL for images */
  previewUrl?: string;

  /** Show image preview thumbnail */
  showPreview?: boolean;

  /** Callback when remove button is clicked */
  onRemove?: () => void;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function getFileIcon(file: File): 'file-text' | 'image' | 'file-pdf' | 'file' {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type === 'application/pdf') return 'file-pdf';
  if (file.type.startsWith('text/') || file.name.match(/\.(doc|docx|txt|rtf)$/i)) {
    return 'file-text';
  }
  return 'file';
}

export const FileUploadItem: React.FC<FileUploadItemProps> = ({
  file,
  progress = 0,
  status = 'pending',
  error,
  previewUrl,
  showPreview = false,
  onRemove,
}) => {
  const itemClasses = ['muka-fileupload-item', `muka-fileupload-item--${status}`]
    .filter(Boolean)
    .join(' ');

  const iconName = getFileIcon(file);
  const showThumbnail = showPreview && previewUrl;

  return (
    <div className={itemClasses}>
      <div className="muka-fileupload-item__preview">
        {showThumbnail ? (
          <img
            src={previewUrl}
            alt={`Preview of ${file.name}`}
            className="muka-fileupload-item__thumbnail"
          />
        ) : (
          <Icon name={iconName} size="md" className="muka-fileupload-item__icon" />
        )}
      </div>

      <div className="muka-fileupload-item__info">
        <span className="muka-fileupload-item__name" title={file.name}>
          {file.name}
        </span>
        <span className="muka-fileupload-item__meta">
          {formatBytes(file.size)}
          {status === 'uploading' && progress !== undefined && ` • ${Math.round(progress)}%`}
          {status === 'error' && error && (
            <span className="muka-fileupload-item__error"> • {error}</span>
          )}
        </span>
        {status === 'uploading' && (
          <Progress
            value={progress}
            size="sm"
            className="muka-fileupload-item__progress"
            aria-label={`Uploading ${file.name}: ${Math.round(progress)}%`}
          />
        )}
      </div>

      <div className="muka-fileupload-item__actions">
        {status === 'success' && (
          <Icon
            name="checkbox-circle"
            variant="fill"
            size="sm"
            className="muka-fileupload-item__status-icon muka-fileupload-item__status-icon--success"
            label="Upload complete"
          />
        )}
        {status === 'error' && (
          <Icon
            name="error-warning"
            variant="fill"
            size="sm"
            className="muka-fileupload-item__status-icon muka-fileupload-item__status-icon--error"
            label="Upload failed"
          />
        )}
        {onRemove && (
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            iconLeft={<Icon name="close" size="sm" />}
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

FileUploadItem.displayName = 'FileUploadItem';

export default FileUploadItem;
