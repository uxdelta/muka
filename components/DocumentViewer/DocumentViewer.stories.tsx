import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, fn } from 'storybook/test';
import { DocumentViewer } from './DocumentViewer';
import { verifyThemeLoaded, verifyUsesTokens } from '../../.storybook/theme-test-utils';
import './DocumentViewer.css';

const meta: Meta<typeof DocumentViewer> = {
  title: 'Components/Display/DocumentViewer',
  component: DocumentViewer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# DocumentViewer Component

A comprehensive viewer for PDFs, images, and other documents with built-in navigation and controls.

## Features
- **PDF Rendering**: Uses react-pdf for high-quality PDF display
- **Image Viewing**: Native image support with zoom and pan
- **Navigation**: Page controls, zoom, and keyboard shortcuts
- **Actions**: Download, print, and fullscreen modes
- **Thumbnails**: Optional sidebar with page previews (PDF only)
- **Accessibility**: Full keyboard navigation and screen reader support

## Token Architecture
This component uses the following token layers:
- **Component tokens**: \`documentviewer.toolbar.background\`, \`documentviewer.canvas.background\`
- **Semantic tokens**: \`color.surface.default\`, \`color.border.default\`
- **Spacing tokens**: \`spacing.4\`, \`spacing.12\`

## Keyboard Shortcuts
- **Arrow Keys**: Navigate pages (PDF) or pan (Image)
- **+/-**: Zoom in/out
- **Ctrl/Cmd + 0**: Reset zoom to 100%
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['pdf', 'image', 'auto'],
      description: 'Document type (auto-detect from file extension)',
    },
    showToolbar: {
      control: { type: 'boolean' },
      description: 'Show toolbar with controls',
    },
    showThumbnails: {
      control: { type: 'boolean' },
      description: 'Show thumbnail sidebar (PDF only)',
    },
    showPageNumbers: {
      control: { type: 'boolean' },
      description: 'Show page numbers on pages',
    },
    allowDownload: {
      control: { type: 'boolean' },
      description: 'Allow document download',
    },
    allowPrint: {
      control: { type: 'boolean' },
      description: 'Allow document printing',
    },
    allowFullscreen: {
      control: { type: 'boolean' },
      description: 'Allow fullscreen mode',
    },
    height: {
      control: { type: 'number' },
      description: 'Viewer height in pixels',
    },
  },
  args: {
    type: 'auto',
    showToolbar: true,
    showThumbnails: false,
    showPageNumbers: true,
    allowDownload: false,
    allowPrint: false,
    allowFullscreen: false,
    height: 600,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample PDF URL (using a public PDF for demonstration)
const SAMPLE_PDF = 'https://pdfobject.com/pdf/sample.pdf';
const SAMPLE_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800';

// Basic variants
export const PDFViewer: Story = {
  args: {
    src: SAMPLE_PDF,
    type: 'pdf',
    showToolbar: true,
    height: 600,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic PDF viewer with toolbar controls',
      },
    },
  },
};

export const ImageViewer: Story = {
  args: {
    src: SAMPLE_IMAGE,
    type: 'image',
    showToolbar: true,
    height: 600,
  },
  parameters: {
    docs: {
      description: {
        story: 'Image viewer with zoom and pan support',
      },
    },
  },
};

export const WithThumbnails: Story = {
  args: {
    src: SAMPLE_PDF,
    type: 'pdf',
    showToolbar: true,
    showThumbnails: true,
    height: 600,
  },
  parameters: {
    docs: {
      description: {
        story: 'PDF viewer with thumbnail sidebar for quick page navigation',
      },
    },
  },
};

export const WithAllActions: Story = {
  args: {
    src: SAMPLE_PDF,
    type: 'pdf',
    showToolbar: true,
    allowDownload: true,
    allowPrint: true,
    allowFullscreen: true,
    height: 600,
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-featured viewer with download, print, and fullscreen actions',
      },
    },
  },
};

export const MinimalViewer: Story = {
  args: {
    src: SAMPLE_IMAGE,
    type: 'image',
    showToolbar: false,
    showPageNumbers: false,
    height: 600,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal viewer without toolbar - just the document',
      },
    },
  },
};

export const CompactHeight: Story = {
  args: {
    src: SAMPLE_PDF,
    type: 'pdf',
    showToolbar: true,
    height: 400,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact viewer for constrained spaces',
      },
    },
  },
};

export const FullHeight: Story = {
  args: {
    src: SAMPLE_PDF,
    type: 'pdf',
    showToolbar: true,
    showThumbnails: true,
    height: '80vh',
  },
  parameters: {
    docs: {
      description: {
        story: 'Full viewport height viewer',
      },
    },
  },
};

// Real-world examples
export const ContractViewer: Story = {
  args: {
    src: SAMPLE_PDF,
    type: 'pdf',
    showToolbar: true,
    allowDownload: true,
    allowPrint: true,
    height: 700,
    onPageChange: fn(),
    onLoad: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Document viewer for contracts and legal documents',
      },
    },
  },
};

export const BlueprintViewer: Story = {
  args: {
    src: SAMPLE_IMAGE,
    type: 'image',
    showToolbar: true,
    allowDownload: true,
    allowFullscreen: true,
    height: 600,
  },
  parameters: {
    docs: {
      description: {
        story: 'Image viewer for blueprints and floor plans',
      },
    },
  },
};

export const EmbeddedInDialog: Story = {
  render: () => (
    <div style={{ 
      maxWidth: '900px',
      padding: 'var(--spacing-4)',
      backgroundColor: 'var(--color-surface-default)',
      borderRadius: 'var(--border-radius-lg)',
      boxShadow: 'var(--shadow-lg)',
    }}>
      <h3 style={{ 
        margin: '0 0 var(--spacing-4) 0',
        color: 'var(--color-text-default-default)',
      }}>
        Document Preview
      </h3>
      <DocumentViewer
        src={SAMPLE_PDF}
        showToolbar={true}
        allowDownload={true}
        height={500}
      />
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Document viewer embedded in a dialog or modal',
      },
    },
  },
};

// Showcase
export const UsageShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ color: 'var(--color-text-default-default)', margin: '0 0 1rem 0' }}>
          📄 DocumentViewer Usage Examples
        </h3>
        <p style={{ color: 'var(--color-text-subtle-default)', margin: '0 0 2rem 0' }}>
          Different configurations for various use cases
        </p>
      </div>

      <div style={{ 
        padding: 'var(--spacing-4)', 
        backgroundColor: 'var(--color-surface-level1)', 
        borderRadius: 'var(--border-radius-md)',
        border: '1px solid var(--color-border-default)'
      }}>
        <h4 style={{ color: 'var(--color-text-default-default)', margin: '0 0 1rem 0' }}>
          Basic PDF Viewer
        </h4>
        <DocumentViewer
          src={SAMPLE_PDF}
          showToolbar={true}
          height={400}
        />
      </div>

      <div style={{ 
        padding: 'var(--spacing-4)', 
        backgroundColor: 'var(--color-surface-level1)', 
        borderRadius: 'var(--border-radius-md)',
        border: '1px solid var(--color-border-default)'
      }}>
        <h4 style={{ color: 'var(--color-text-default-default)', margin: '0 0 1rem 0' }}>
          Image Viewer with Actions
        </h4>
        <DocumentViewer
          src={SAMPLE_IMAGE}
          type="image"
          showToolbar={true}
          allowDownload={true}
          allowFullscreen={true}
          height={400}
        />
      </div>

      <div style={{ 
        padding: 'var(--spacing-3)', 
        backgroundColor: 'var(--color-surface-level1)', 
        borderRadius: 'var(--border-radius-sm)',
      }}>
        <p style={{ 
          color: 'var(--color-text-subtle-default)', 
          fontSize: 'var(--text-size-sm)', 
          margin: '0',
          lineHeight: '1.5'
        }}>
          💡 <strong>Usage tips:</strong><br/>
          • Use PDF viewer for contracts, permits, and legal documents<br/>
          • Use image viewer for blueprints, floor plans, and photos<br/>
          • Enable thumbnails for multi-page documents<br/>
          • Add download/print actions for documents users need to save
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
};

// Accessibility showcase
export const AccessibilityFeatures: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
      <div>
        <h3 style={{ color: 'var(--color-text-default-default)', margin: '0 0 1rem 0' }}>
          ♿ Accessibility Features
        </h3>
        <p style={{ color: 'var(--color-text-subtle-default)', margin: '0' }}>
          DocumentViewer is built with WCAG 2.1 AA compliance in mind
        </p>
      </div>

      <div style={{ 
        padding: 'var(--spacing-4)', 
        backgroundColor: 'var(--color-surface-level1)', 
        borderRadius: 'var(--border-radius-md)',
        border: '1px solid var(--color-border-default)'
      }}>
        <h4 style={{ color: 'var(--color-text-default-default)', margin: '0 0 1rem 0' }}>
          Keyboard Navigation
        </h4>
        <ul style={{ 
          color: 'var(--color-text-subtle-default)', 
          fontSize: 'var(--text-size-sm)',
          lineHeight: '1.6',
          margin: '0'
        }}>
          <li><kbd>←</kbd> <kbd>→</kbd> <kbd>↑</kbd> <kbd>↓</kbd> Navigate pages</li>
          <li><kbd>+</kbd> <kbd>-</kbd> Zoom in/out</li>
          <li><kbd>Ctrl/Cmd</kbd> + <kbd>0</kbd> Reset zoom</li>
          <li><kbd>Tab</kbd> Navigate toolbar controls</li>
        </ul>
      </div>

      <div style={{ 
        padding: 'var(--spacing-4)', 
        backgroundColor: 'var(--color-surface-level1)', 
        borderRadius: 'var(--border-radius-md)',
        border: '1px solid var(--color-border-default)'
      }}>
        <h4 style={{ color: 'var(--color-text-default-default)', margin: '0 0 1rem 0' }}>
          Screen Reader Support
        </h4>
        <ul style={{ 
          color: 'var(--color-text-subtle-default)', 
          fontSize: 'var(--text-size-sm)',
          lineHeight: '1.6',
          margin: '0'
        }}>
          <li>ARIA labels on all toolbar buttons</li>
          <li>Live region announcements for page changes</li>
          <li>Proper semantic HTML structure</li>
          <li>Focus management for modal interactions</li>
        </ul>
      </div>

      <DocumentViewer
        src={SAMPLE_PDF}
        showToolbar={true}
        height={400}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
};

// Interactive playground
export const Playground: Story = {
  args: {
    src: SAMPLE_PDF,
    type: 'pdf',
    showToolbar: true,
    showThumbnails: false,
    showPageNumbers: true,
    allowDownload: true,
    allowPrint: true,
    allowFullscreen: true,
    height: 600,
    onPageChange: fn(),
    onZoomChange: fn(),
    onLoad: fn(),
    onError: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - try different combinations of props! Use the controls below to test various configurations.',
      },
    },
  },
};

// Theme demonstration
export const ThemeDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-default-default)' }}>
          🎨 Brand & Theme Demonstration
        </h3>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-text-subtle-default)' }}>
          Use the toolbar above to switch brands and themes! Notice how the DocumentViewer
          automatically adapts its colors while maintaining readability.
        </p>
      </div>

      <DocumentViewer
        src={SAMPLE_PDF}
        showToolbar={true}
        showThumbnails={true}
        allowDownload={true}
        allowPrint={true}
        allowFullscreen={true}
        height={600}
      />

      <div style={{ 
        padding: 'var(--spacing-4)', 
        backgroundColor: 'var(--color-surface-level1)', 
        borderRadius: 'var(--border-radius-md)',
        border: '1px solid var(--color-border-default)'
      }}>
        <h4 style={{ 
          color: 'var(--color-text-default-default)', 
          margin: '0 0 1rem 0',
          fontSize: 'var(--text-size-md)'
        }}>
          Token Architecture in Action
        </h4>
        <p style={{ 
          color: 'var(--color-text-subtle-default)', 
          fontSize: 'var(--text-size-sm)', 
          margin: '0',
          lineHeight: '1.5'
        }}>
          💡 The DocumentViewer uses tokens like <code>documentviewer.toolbar.background</code>,
          <code>documentviewer.canvas.background</code>, and <code>documentviewer.page.shadow</code>
          which automatically adapt to different brands and themes.
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Interaction tests
export const LoadingState: Story = {
  tags: ['test'],
  args: {
    src: SAMPLE_PDF,
    showToolbar: true,
    height: 600,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests loading state display',
      },
    },
  },
};

export const ThemeTokenValidation: Story = {
  tags: ['test', 'theme'],
  args: {
    src: SAMPLE_PDF,
    showToolbar: true,
    height: 600,
  },
  play: async ({ canvasElement, globals }) => {
    const canvas = within(canvasElement);

    // Verify theme is loaded
    verifyThemeLoaded(globals);

    // Get viewer element
    const viewer = canvas.getByRole('region', { name: 'Document viewer' });

    // Verify uses design tokens
    verifyUsesTokens(viewer, [
      'documentviewer-container-background',
      'documentviewer-toolbar-background',
      'documentviewer-canvas-background',
    ]);

    // Verify toolbar exists
    const toolbar = canvas.getByRole('toolbar', { name: 'Document controls' });
    expect(toolbar).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests that DocumentViewer properly uses design tokens from the theme system.',
      },
    },
  },
};
