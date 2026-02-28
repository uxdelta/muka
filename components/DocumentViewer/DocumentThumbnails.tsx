import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export interface DocumentThumbnailsProps {
  src: string;
  totalPages: number;
  currentPage: number;
  onPageClick: (page: number) => void;
}

/**
 * DocumentThumbnails Component
 *
 * Sidebar displaying thumbnail previews of document pages.
 * Only supports PDF documents.
 */
export const DocumentThumbnails: React.FC<DocumentThumbnailsProps> = ({
  src,
  totalPages,
  currentPage,
  onPageClick,
}) => {
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());

  const handlePageLoad = (pageNumber: number) => {
    setLoadedPages(prev => new Set(prev).add(pageNumber));
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="muka-documentviewer__thumbnails" role="navigation" aria-label="Page thumbnails">
      <Document file={src} loading={null}>
        <div className="muka-documentviewer__thumbnails-list">
          {pages.map(pageNumber => (
            <button
              key={pageNumber}
              className={[
                'muka-documentviewer__thumbnail-item',
                currentPage === pageNumber && 'muka-documentviewer__thumbnail-item--selected',
              ].filter(Boolean).join(' ')}
              onClick={() => onPageClick(pageNumber)}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={currentPage === pageNumber ? 'page' : undefined}
            >
              <div className="muka-documentviewer__thumbnail-preview">
                <Page
                  pageNumber={pageNumber}
                  width={120}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  onLoadSuccess={() => handlePageLoad(pageNumber)}
                />
              </div>
              <span className="muka-documentviewer__thumbnail-label">
                {pageNumber}
              </span>
            </button>
          ))}
        </div>
      </Document>
    </div>
  );
};

export default DocumentThumbnails;
