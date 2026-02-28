import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import type { DocumentMetadata } from './DocumentViewer';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export interface DocumentCanvasProps {
  src: string;
  type: 'pdf' | 'image';
  currentPage: number;
  zoom: number;
  showPageNumbers?: boolean;
  onLoad: (metadata: DocumentMetadata) => void;
  onError: (error: Error) => void;
}

/**
 * DocumentCanvas Component
 *
 * Renders the document content area.
 * Supports both PDF and image rendering with zoom.
 */
export const DocumentCanvas: React.FC<DocumentCanvasProps> = ({
  src,
  type,
  currentPage,
  zoom,
  showPageNumbers,
  onLoad,
  onError,
}) => {
  const [pageWidth, setPageWidth] = useState<number>(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (canvasRef.current) {
        const containerWidth = canvasRef.current.offsetWidth - 32;
        setPageWidth(Math.min(containerWidth, 800));
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  if (type === 'image') {
    return (
      <ImageCanvas
        src={src}
        zoom={zoom}
        onLoad={onLoad}
        onError={onError}
        canvasRef={canvasRef}
      />
    );
  }

  return (
    <PDFCanvas
      src={src}
      currentPage={currentPage}
      zoom={zoom}
      pageWidth={pageWidth}
      showPageNumbers={showPageNumbers}
      onLoad={onLoad}
      onError={onError}
      canvasRef={canvasRef}
    />
  );
};

interface ImageCanvasProps {
  src: string;
  zoom: number;
  onLoad: (metadata: DocumentMetadata) => void;
  onError: (error: Error) => void;
  canvasRef: React.RefObject<HTMLDivElement>;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({
  src,
  zoom,
  onLoad,
  onError,
  canvasRef,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    onLoad({
      totalPages: 1,
      title: extractFilename(src),
    });
  };

  const handleImageError = () => {
    onError(new Error('Failed to load image'));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (zoom === 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [zoom]);

  return (
    <div
      ref={canvasRef}
      className="muka-documentviewer__canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
    >
      <div
        className="muka-documentviewer__page"
        style={{
          transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
          transformOrigin: 'center',
          transition: isDragging ? 'none' : 'transform 0.2s ease',
        }}
      >
        <img
          ref={imageRef}
          src={src}
          alt="Document"
          onLoad={handleImageLoad}
          onError={handleImageError}
          draggable={false}
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
};

interface PDFCanvasProps {
  src: string;
  currentPage: number;
  zoom: number;
  pageWidth: number;
  showPageNumbers?: boolean;
  onLoad: (metadata: DocumentMetadata) => void;
  onError: (error: Error) => void;
  canvasRef: React.RefObject<HTMLDivElement>;
}

const PDFCanvas: React.FC<PDFCanvasProps> = ({
  src,
  currentPage,
  zoom,
  pageWidth,
  showPageNumbers,
  onLoad,
  onError,
  canvasRef,
}) => {
  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    onLoad({
      totalPages: numPages,
      title: extractFilename(src),
    });
  };

  const handleDocumentLoadError = (error: Error) => {
    onError(error);
  };

  return (
    <div ref={canvasRef} className="muka-documentviewer__canvas">
      <Document
        file={src}
        onLoadSuccess={handleDocumentLoadSuccess}
        onLoadError={handleDocumentLoadError}
        loading={null}
      >
        <div
          className="muka-documentviewer__page"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease',
          }}
        >
          <Page
            pageNumber={currentPage}
            width={pageWidth}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
          {showPageNumbers && (
            <div className="muka-documentviewer__page-number">
              Page {currentPage}
            </div>
          )}
        </div>
      </Document>
    </div>
  );
};

function extractFilename(src: string): string {
  return src.split('/').pop() || 'document';
}

export default DocumentCanvas;
