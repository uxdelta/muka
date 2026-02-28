import React, { useState } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Input } from '../Input';

export interface DocumentToolbarProps {
  currentPage: number;
  totalPages: number;
  zoom: number;
  onPageChange: (page: number) => void;
  onZoomChange: (zoom: number) => void;
  onDownload?: () => void;
  onPrint?: () => void;
  onFullscreen?: () => void;
}

/**
 * DocumentToolbar Component
 *
 * Toolbar for document navigation and controls.
 * Includes page navigation, zoom controls, and action buttons.
 */
export const DocumentToolbar: React.FC<DocumentToolbarProps> = ({
  currentPage,
  totalPages,
  zoom,
  onPageChange,
  onZoomChange,
  onDownload,
  onPrint,
  onFullscreen,
}) => {
  const [pageInput, setPageInput] = useState(currentPage.toString());

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handlePageInputBlur = () => {
    const pageNum = parseInt(pageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
    } else {
      setPageInput(currentPage.toString());
    }
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePageInputBlur();
      e.currentTarget.blur();
    }
  };

  const handleZoomIn = () => {
    onZoomChange(zoom + 0.25);
  };

  const handleZoomOut = () => {
    onZoomChange(zoom - 0.25);
  };

  const handleResetZoom = () => {
    onZoomChange(1);
  };

  React.useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  const zoomPercentage = Math.round(zoom * 100);

  return (
    <div className="muka-documentviewer__toolbar" role="toolbar" aria-label="Document controls">
      <div className="muka-documentviewer__toolbar-section">
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          <Icon name="RiArrowLeftSLine" />
        </Button>

        <div className="muka-documentviewer__page-input">
          <input
            type="text"
            className="muka-documentviewer__page-number"
            value={pageInput}
            onChange={handlePageInputChange}
            onBlur={handlePageInputBlur}
            onKeyDown={handlePageInputKeyDown}
            aria-label="Current page"
            size={3}
          />
          <span className="muka-documentviewer__page-total">/ {totalPages}</span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          iconOnly
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
        >
          <Icon name="RiArrowRightSLine" />
        </Button>
      </div>

      <div className="muka-documentviewer__toolbar-section muka-documentviewer__toolbar-section--center">
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          onClick={handleZoomOut}
          disabled={zoom <= 0.25}
          aria-label="Zoom out"
        >
          <Icon name="RiZoomOutLine" />
        </Button>

        <button
          className="muka-documentviewer__zoom-display"
          onClick={handleResetZoom}
          aria-label={`Zoom level ${zoomPercentage}%, click to reset to 100%`}
        >
          {zoomPercentage}%
        </button>

        <Button
          variant="ghost"
          size="sm"
          iconOnly
          onClick={handleZoomIn}
          disabled={zoom >= 5}
          aria-label="Zoom in"
        >
          <Icon name="RiZoomInLine" />
        </Button>
      </div>

      <div className="muka-documentviewer__toolbar-section muka-documentviewer__toolbar-section--end">
        {onDownload && (
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            onClick={onDownload}
            aria-label="Download document"
          >
            <Icon name="RiDownloadLine" />
          </Button>
        )}

        {onPrint && (
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            onClick={onPrint}
            aria-label="Print document"
          >
            <Icon name="RiPrinterLine" />
          </Button>
        )}

        {onFullscreen && (
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            onClick={onFullscreen}
            aria-label="Toggle fullscreen"
          >
            <Icon name="RiFullscreenLine" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default DocumentToolbar;
