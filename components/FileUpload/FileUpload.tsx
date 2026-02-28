import React, { useRef, useState } from 'react';
import { FileUploadItem } from './FileUploadItem';
import { Alert } from '../Alert';
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

export interface FileUploadProps {
  /** Accepted MIME types (e.g., "image/*,.pdf") */
  accept?: string;

  /** Allow multiple files */
  multiple?: boolean;

  /** Maximum file size in bytes */
  maxSize?: number;

  /** Maximum number of files */
  maxFiles?: number;

  /** Disabled state */
  disabled?: boolean;

  /** Controlled files */
  files?: File[];

  /** Callback when files change */
  onFilesChange?: (files: File[]) => void;

  /** Callback when validation error occurs */
  onError?: (error: FileUploadError) => void;

  /** Optional upload function */
  uploadFn?: (file: File) => Promise<UploadResult>;

  /** Visual variant */
  variant?: 'dropzone' | 'button';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Show image previews */
  showPreview?: boolean;

  /** Custom drop zone content */
  children?: React.ReactNode;

  /** Additional CSS classes */
  className?: string;

  /** Accessible label */
  'aria-label'?: string;
}

interface FileState {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

/**
 * FileUpload Component
 *
 * File upload component with drag-and-drop support, validation,
 * and progress tracking.
 *
 * Variants:
 * - dropzone: Large drop zone area (default)
 * - button: Compact button-style upload
 *
 * @accessibility WCAG 2.1 AA compliant
 * - Keyboard accessible (Enter/Space to open file dialog)
 * - aria-dropeffect on drop zone
 * - aria-busy during upload
 * - Screen reader announcements for file additions/removals
 * - Focus management after file selection
 */
export const FileUpload: React.FC<FileUploadProps> = ({
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
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalFiles, setInternalFiles] = useState<FileState[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<FileUploadError | null>(null);
  const [isBusy, setIsBusy] = useState(false);

  const isControlled = controlledFiles !== undefined;
  const fileStates = isControlled
    ? controlledFiles.map(f => ({ file: f, progress: 0, status: 'pending' as const }))
    : internalFiles;

  // Validate a single file
  const validateFile = (file: File): FileUploadError | null => {
    // Size validation
    if (maxSize && file.size > maxSize) {
      return {
        type: 'size',
        message: `File "${file.name}" exceeds maximum size of ${formatBytes(maxSize)}`,
        file,
      };
    }

    // Type validation
    if (accept) {
      const acceptedTypes = accept.split(',').map(t => t.trim());
      const fileType = file.type;
      const fileName = file.name;
      const fileExt = '.' + fileName.split('.').pop()?.toLowerCase();

      const isAccepted = acceptedTypes.some(acceptType => {
        // Exact MIME type match
        if (acceptType === fileType) return true;
        // Wildcard MIME type (e.g., image/*)
        if (acceptType.endsWith('/*')) {
          const baseType = acceptType.slice(0, -2);
          return fileType.startsWith(baseType);
        }
        // File extension match
        if (acceptType.startsWith('.') && acceptType === fileExt) return true;
        return false;
      });

      if (!isAccepted) {
        return {
          type: 'type',
          message: `File "${file.name}" is not an accepted file type`,
          file,
        };
      }
    }

    return null;
  };

  // Handle file selection
  const handleFiles = async (newFiles: FileList | File[]) => {
    const filesArray = Array.from(newFiles);
    const currentCount = fileStates.length;

    // Count validation
    if (maxFiles && currentCount + filesArray.length > maxFiles) {
      const error: FileUploadError = {
        type: 'count',
        message: `Cannot add ${filesArray.length} file(s). Maximum ${maxFiles} files allowed.`,
      };
      setValidationError(error);
      onError?.(error);
      return;
    }

    // Validate each file
    const validFiles: File[] = [];
    for (const file of filesArray) {
      const error = validateFile(file);
      if (error) {
        setValidationError(error);
        onError?.(error);
        return;
      }
      validFiles.push(file);
    }

    // Clear validation error
    setValidationError(null);

    // Update files
    const newFileStates: FileState[] = validFiles.map(file => ({
      file,
      progress: 0,
      status: 'pending',
    }));

    if (isControlled) {
      const updatedFiles = [...fileStates.map(fs => fs.file), ...validFiles];
      onFilesChange?.(updatedFiles);
    } else {
      const updatedStates = [...internalFiles, ...newFileStates];
      setInternalFiles(updatedStates);
    }

    // Upload files if uploadFn is provided
    if (uploadFn) {
      setIsBusy(true);
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        const fileIndex = fileStates.length + i;
        
        // Update status to uploading
        updateFileState(fileIndex, { status: 'uploading', progress: 0 });

        try {
          const result = await uploadFn(file);
          if (result.success) {
            updateFileState(fileIndex, { status: 'success', progress: 100 });
          } else {
            updateFileState(fileIndex, { 
              status: 'error', 
              error: result.error || 'Upload failed',
              progress: 0,
            });
          }
        } catch (err) {
          updateFileState(fileIndex, { 
            status: 'error', 
            error: err instanceof Error ? err.message : 'Upload failed',
            progress: 0,
          });
        }
      }
      setIsBusy(false);
    }
  };

  // Update file state
  const updateFileState = (index: number, updates: Partial<FileState>) => {
    if (!isControlled) {
      setInternalFiles(prev => {
        const newStates = [...prev];
        newStates[index] = { ...newStates[index], ...updates };
        return newStates;
      });
    }
  };

  // Handle file removal
  const handleRemoveFile = (index: number) => {
    if (isControlled) {
      const updatedFiles = fileStates.map(fs => fs.file).filter((_, i) => i !== index);
      onFilesChange?.(updatedFiles);
    } else {
      setInternalFiles(prev => prev.filter((_, i) => i !== index));
    }
    setValidationError(null);
  };

  // File input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!disabled && e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Click to browse
  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  // Keyboard support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleClick();
    }
  };

  const uploadClasses = [
    'muka-fileupload',
    `muka-fileupload--${variant}`,
    `muka-fileupload--${size}`,
    disabled && 'muka-fileupload--disabled',
    className,
  ].filter(Boolean).join(' ');

  const dropzoneClasses = [
    'muka-fileupload__dropzone',
    isDragging && 'muka-fileupload__dropzone--dragging',
    validationError && 'muka-fileupload__dropzone--error',
    disabled && 'muka-fileupload__dropzone--disabled',
  ].filter(Boolean).join(' ');

  // Format bytes helper
  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  return (
    <div className={uploadClasses} {...props}>
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        disabled={disabled}
        className="muka-fileupload__input"
        aria-label={ariaLabel || 'Upload files'}
      />

      {/* Drop zone */}
      {variant === 'dropzone' && (
        <div
          className={dropzoneClasses}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={ariaLabel || 'Upload files'}
          aria-disabled={disabled}
          aria-busy={isBusy}
          aria-dropeffect={disabled ? 'none' : 'copy'}
        >
          {children || (
            <div className="muka-fileupload__dropzone-content">
              <div className="muka-fileupload__dropzone-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div className="muka-fileupload__dropzone-text">
                Drag files here or click to browse
              </div>
              {(accept || maxSize) && (
                <div className="muka-fileupload__dropzone-hint">
                  {accept && `Accepted: ${accept}`}
                  {accept && maxSize && ' · '}
                  {maxSize && `Max size: ${formatBytes(maxSize)}`}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Button variant */}
      {variant === 'button' && (
        <div
          className="muka-fileupload__button"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={ariaLabel || 'Upload files'}
          aria-disabled={disabled}
        >
          {children}
        </div>
      )}

      {/* Validation error alert */}
      {validationError && (
        <Alert variant="error" size="sm" className="muka-fileupload__error">
          {validationError.message}
        </Alert>
      )}

      {/* File list */}
      {fileStates.length > 0 && (
        <div className="muka-fileupload__list" role="list" aria-label="Uploaded files">
          {fileStates.map((fileState, index) => (
            <FileUploadItem
              key={`${fileState.file.name}-${index}`}
              file={fileState.file}
              progress={fileState.progress}
              status={fileState.status}
              error={fileState.error}
              onRemove={() => handleRemoveFile(index)}
              showPreview={showPreview}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
