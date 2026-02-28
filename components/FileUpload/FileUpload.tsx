import React, { useState, useRef, useCallback, forwardRef } from 'react';
import { FileUploadItem, type FileUploadItemProps } from './FileUploadItem';
import './FileUpload.css';

export interface FileUploadError {
  type: 'size' | 'type' | 'count';
  message: string;
  file?: File;
}

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export interface FileWithStatus {
  file: File;
  id: string;
  progress?: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  previewUrl?: string;
}

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onError'> {
  /** Accepted file types (MIME types or extensions, e.g., "image/*,.pdf") */
  accept?: string;

  /** Allow multiple file selection */
  multiple?: boolean;

  /** Maximum file size in bytes */
  maxSize?: number;

  /** Maximum number of files */
  maxFiles?: number;

  /** Disabled state */
  disabled?: boolean;

  /** Current files (controlled mode) */
  files?: FileWithStatus[];

  /** Callback when files change */
  onFilesChange?: (files: FileWithStatus[]) => void;

  /** Callback when validation error occurs */
  onError?: (error: FileUploadError) => void;

  /** Upload function for each file */
  uploadFn?: (file: File, onProgress: (progress: number) => void) => Promise<UploadResult>;

  /** Visual variant */
  variant?: 'dropzone' | 'button';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Show image previews */
  showPreview?: boolean;

  /** Custom content for the drop zone */
  children?: React.ReactNode;

  /** Accessible label */
  'aria-label'?: string;
}

function generateId(): string {
  return `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      accept,
      multiple = false,
      maxSize,
      maxFiles,
      disabled = false,
      files: controlledFiles,
      onFilesChange,
      onError,
      uploadFn,
      variant = 'dropzone',
      size = 'md',
      showPreview = false,
      children,
      className = '',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const [internalFiles, setInternalFiles] = useState<FileWithStatus[]>([]);
    const [isDragActive, setIsDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const files = controlledFiles ?? internalFiles;
    const setFiles = useCallback(
      (newFiles: FileWithStatus[] | ((prev: FileWithStatus[]) => FileWithStatus[])) => {
        const updatedFiles = typeof newFiles === 'function' ? newFiles(files) : newFiles;
        if (!controlledFiles) {
          setInternalFiles(updatedFiles);
        }
        onFilesChange?.(updatedFiles);
      },
      [controlledFiles, files, onFilesChange]
    );

    const validateFile = useCallback(
      (file: File): FileUploadError | null => {
        // Check file type
        if (accept) {
          const acceptedTypes = accept.split(',').map((t) => t.trim());
          const isAccepted = acceptedTypes.some((type) => {
            if (type.startsWith('.')) {
              return file.name.toLowerCase().endsWith(type.toLowerCase());
            }
            if (type.endsWith('/*')) {
              return file.type.startsWith(type.slice(0, -1));
            }
            return file.type === type;
          });
          if (!isAccepted) {
            return {
              type: 'type',
              message: `File type not accepted: ${file.name}`,
              file,
            };
          }
        }

        // Check file size
        if (maxSize && file.size > maxSize) {
          return {
            type: 'size',
            message: `File too large: ${file.name} (max ${formatBytes(maxSize)})`,
            file,
          };
        }

        return null;
      },
      [accept, maxSize]
    );

    const processFiles = useCallback(
      async (selectedFiles: FileList | File[]) => {
        const fileArray = Array.from(selectedFiles);

        // Check max files
        if (maxFiles && files.length + fileArray.length > maxFiles) {
          onError?.({
            type: 'count',
            message: `Maximum ${maxFiles} files allowed`,
          });
          return;
        }

        const newFiles: FileWithStatus[] = [];

        for (const file of fileArray) {
          const error = validateFile(file);
          if (error) {
            onError?.(error);
            continue;
          }

          const fileWithStatus: FileWithStatus = {
            file,
            id: generateId(),
            status: uploadFn ? 'pending' : 'success',
            previewUrl: showPreview && isImageFile(file) ? URL.createObjectURL(file) : undefined,
          };
          newFiles.push(fileWithStatus);
        }

        if (newFiles.length === 0) return;

        const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
        setFiles(updatedFiles);

        // Auto-upload if uploadFn provided
        if (uploadFn) {
          for (const fileWithStatus of newFiles) {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === fileWithStatus.id ? { ...f, status: 'uploading' as const, progress: 0 } : f
              )
            );

            try {
              const result = await uploadFn(fileWithStatus.file, (progress) => {
                setFiles((prev) =>
                  prev.map((f) => (f.id === fileWithStatus.id ? { ...f, progress } : f))
                );
              });

              setFiles((prev) =>
                prev.map((f) =>
                  f.id === fileWithStatus.id
                    ? {
                        ...f,
                        status: result.success ? ('success' as const) : ('error' as const),
                        error: result.error,
                        progress: 100,
                      }
                    : f
                )
              );
            } catch (err) {
              setFiles((prev) =>
                prev.map((f) =>
                  f.id === fileWithStatus.id
                    ? {
                        ...f,
                        status: 'error' as const,
                        error: err instanceof Error ? err.message : 'Upload failed',
                      }
                    : f
                )
              );
            }
          }
        }
      },
      [files, maxFiles, multiple, onError, setFiles, showPreview, uploadFn, validateFile]
    );

    const handleDragEnter = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          setIsDragActive(true);
        }
      },
      [disabled]
    );

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
    }, []);

    const handleDragOver = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          setIsDragActive(true);
        }
      },
      [disabled]
    );

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (disabled) return;

        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
          processFiles(droppedFiles);
        }
      },
      [disabled, processFiles]
    );

    const handleClick = useCallback(() => {
      if (!disabled) {
        inputRef.current?.click();
      }
    }, [disabled]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault();
          inputRef.current?.click();
        }
      },
      [disabled]
    );

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
          processFiles(selectedFiles);
        }
        // Reset input value to allow re-selecting the same file
        e.target.value = '';
      },
      [processFiles]
    );

    const handleRemoveFile = useCallback(
      (id: string) => {
        setFiles((prev) => {
          const fileToRemove = prev.find((f) => f.id === id);
          if (fileToRemove?.previewUrl) {
            URL.revokeObjectURL(fileToRemove.previewUrl);
          }
          return prev.filter((f) => f.id !== id);
        });
      },
      [setFiles]
    );

    const dropzoneClasses = [
      'muka-fileupload',
      `muka-fileupload--${variant}`,
      `muka-fileupload--${size}`,
      isDragActive && 'muka-fileupload--active',
      disabled && 'muka-fileupload--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const defaultContent = (
      <>
        <span className="muka-fileupload__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </span>
        <span className="muka-fileupload__text">
          {isDragActive ? 'Drop files here' : 'Drag files here or click to browse'}
        </span>
        {accept && (
          <span className="muka-fileupload__hint">
            Accepted: {accept}
            {maxSize && ` (max ${formatBytes(maxSize)})`}
          </span>
        )}
      </>
    );

    return (
      <div ref={ref} className="muka-fileupload-wrapper" {...props}>
        <div
          className={dropzoneClasses}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={ariaLabel ?? 'Upload files'}
          aria-disabled={disabled}
          aria-dropeffect="copy"
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={handleInputChange}
            className="muka-fileupload__input"
            tabIndex={-1}
            aria-hidden="true"
          />
          <div className="muka-fileupload__content">{children ?? defaultContent}</div>
        </div>

        {files.length > 0 && (
          <ul className="muka-fileupload__list" aria-label="Uploaded files">
            {files.map((fileWithStatus) => (
              <li key={fileWithStatus.id}>
                <FileUploadItem
                  file={fileWithStatus.file}
                  progress={fileWithStatus.progress}
                  status={fileWithStatus.status}
                  error={fileWithStatus.error}
                  previewUrl={fileWithStatus.previewUrl}
                  showPreview={showPreview}
                  onRemove={() => handleRemoveFile(fileWithStatus.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export { FileUploadItem, type FileUploadItemProps };
export default FileUpload;
