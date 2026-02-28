import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DocumentToolbar } from './DocumentToolbar';
import { DocumentCanvas } from './DocumentCanvas';
import { DocumentThumbnails } from './DocumentThumbnails';
import { Progress } from '../Progress';
import { Alert } from '../Alert';
import './DocumentViewer.css';

export interface DocumentMetadata {
  totalPages: number;
  title?: string;
  author?: string;
  fileSize?: number;
}

export interface DocumentViewerProps {
  src: string;
  type?: 'pdf' | 'image' | 'auto';
  
  initialPage?: number;
  initialZoom?: number;
  
  showToolbar?: boolean;
  showThumbnails?: boolean;
  showPageNumbers?: boolean;
  
  allowDownload?: boolean;
  allowPrint?: boolean;
  allowFullscreen?: boolean;
  
  onPageChange?: (page: number) => void;
  onZoomChange?: (zoom: number) => void;
  onLoad?: (metadata: DocumentMetadata) => void;
  onError?: (error: Error) => void;
  
  height?: string | number;
  className?: string;
}

/**
 * DocumentViewer Component
 *
 * A comprehensive viewer for PDFs, images, and other documents.
 * Supports zoom, page navigation, thumbnails, and various actions.
 *
 * Features:
 * - PDF rendering with react-pdf
 * - Image viewing with zoom/pan
 * - Toolbar with zoom controls and actions
 * - Optional thumbnail sidebar
 * - Loading and error states
 * - Keyboard navigation
 * - Fullscreen mode
 *
 * @accessibility WCAG 2.1 AA compliant
 * - Keyboard navigation (arrows for pages, +/- for zoom)
 * - Focus management
 * - Screen reader announcements
 * - ARIA labels on all controls
 */
export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  src,
  type = 'auto',
  initialPage = 1,
  initialZoom = 1,
  showToolbar = true,
  showThumbnails = false,
  showPageNumbers = true,
  allowDownload = false,
  allowPrint = false,
  allowFullscreen = false,
  onPageChange,
  onZoomChange,
  onLoad,
  onError,
  height = 600,
  className = '',
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [zoom, setZoom] = useState(initialZoom);
  const [metadata, setMetadata] = useState<DocumentMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const detectedType = type === 'auto' ? detectFileType(src) : type;

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    setZoom(initialZoom);
  }, [initialZoom]);

  const handlePageChange = useCallback((page: number) => {
    if (metadata && page >= 1 && page <= metadata.totalPages) {
      setCurrentPage(page);
      onPageChange?.(page);
    }
  }, [metadata, onPageChange]);

  const handleZoomChange = useCallback((newZoom: number) => {
    const clampedZoom = Math.min(Math.max(0.25, newZoom), 5);
    setZoom(clampedZoom);
    onZoomChange?.(clampedZoom);
  }, [onZoomChange]);

  const handleLoad = useCallback((meta: DocumentMetadata) => {
    setMetadata(meta);
    setIsLoading(false);
    onLoad?.(meta);
  }, [onLoad]);

  const handleError = useCallback((err: Error) => {
    setError(err);
    setIsLoading(false);
    onError?.(err);
  }, [onError]);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = src;
    link.download = extractFilename(src);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [src]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!metadata) return;

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          handlePageChange(currentPage - 1);
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          handlePageChange(currentPage + 1);
          break;
        case '+':
        case '=':
          e.preventDefault();
          handleZoomChange(zoom + 0.25);
          break;
        case '-':
        case '_':
          e.preventDefault();
          handleZoomChange(zoom - 0.25);
          break;
        case '0':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleZoomChange(1);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, zoom, metadata, handlePageChange, handleZoomChange]);

  const containerClasses = [
    'muka-documentviewer',
    isFullscreen && 'muka-documentviewer--fullscreen',
    showThumbnails && 'muka-documentviewer--with-thumbnails',
    className,
  ].filter(Boolean).join(' ');

  const containerStyle: React.CSSProperties = {
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      style={containerStyle}
      role="region"
      aria-label="Document viewer"
    >
      {showToolbar && metadata && (
        <DocumentToolbar
          currentPage={currentPage}
          totalPages={metadata.totalPages}
          zoom={zoom}
          onPageChange={handlePageChange}
          onZoomChange={handleZoomChange}
          onDownload={allowDownload ? handleDownload : undefined}
          onPrint={allowPrint ? handlePrint : undefined}
          onFullscreen={allowFullscreen ? handleFullscreen : undefined}
        />
      )}

      <div className="muka-documentviewer__content">
        {showThumbnails && metadata && detectedType === 'pdf' && (
          <DocumentThumbnails
            src={src}
            totalPages={metadata.totalPages}
            currentPage={currentPage}
            onPageClick={handlePageChange}
          />
        )}

        <div className="muka-documentviewer__main">
          {isLoading && (
            <div className="muka-documentviewer__loading" role="status">
              <Progress indeterminate variant="circle" size="lg" aria-label="Loading document" />
            </div>
          )}

          {error && (
            <div className="muka-documentviewer__error">
              <Alert
                variant="error"
                title="Failed to load document"
                description={error.message}
              />
            </div>
          )}

          {!error && (
            <DocumentCanvas
              src={src}
              type={detectedType}
              currentPage={currentPage}
              zoom={zoom}
              showPageNumbers={showPageNumbers}
              onLoad={handleLoad}
              onError={handleError}
            />
          )}
        </div>
      </div>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="visually-hidden"
      >
        {metadata && `Page ${currentPage} of ${metadata.totalPages}, zoom ${Math.round(zoom * 100)}%`}
      </div>
    </div>
  );
};

function detectFileType(src: string): 'pdf' | 'image' {
  const extension = src.split('.').pop()?.toLowerCase();
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'];
  return imageExtensions.includes(extension || '') ? 'image' : 'pdf';
}

function extractFilename(src: string): string {
  return src.split('/').pop() || 'document';
}

export default DocumentViewer;
