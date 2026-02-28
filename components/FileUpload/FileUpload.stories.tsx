import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { within, expect, fn } from 'storybook/test';
import { FileUpload } from './FileUpload';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { verifyThemeLoaded, verifyUsesTokens } from '../../.storybook/theme-test-utils';
import './FileUpload.css';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/Input/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# FileUpload Component

The FileUpload component provides document management with drag-and-drop support, file validation, and upload progress tracking.

## Features
- Drag-and-drop file selection
- Click to browse files
- File type validation
- File size validation
- Multiple file support
- Upload progress display
- Image preview thumbnails
- Remove file action
- Error state handling
- Multi-brand theming through design tokens

## Variants
- **dropzone**: Large drop zone area (default)
- **button**: Compact button-style upload

## Token Architecture
This component uses the following token layers:
- **Component tokens**: \`fileupload.dropzone.background.{state}\`
- **Semantic tokens**: \`color.surface.subtle\`, \`color.border.default\`
- **Spacing tokens**: \`spacing.8\`, \`spacing.3\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['dropzone', 'button'],
      description: 'Visual variant',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    multiple: {
      control: { type: 'boolean' },
      description: 'Allow multiple files',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
    showPreview: {
      control: { type: 'boolean' },
      description: 'Show image previews',
    },
    accept: {
      control: { type: 'text' },
      description: 'Accepted file types (MIME types)',
    },
    maxSize: {
      control: { type: 'number' },
      description: 'Maximum file size in bytes',
    },
    maxFiles: {
      control: { type: 'number' },
      description: 'Maximum number of files',
    },
  },
  args: {
    variant: 'dropzone',
    size: 'md',
    multiple: false,
    disabled: false,
    showPreview: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    variant: 'dropzone',
  },
};

export const WithPreview: Story = {
  args: {
    variant: 'dropzone',
    showPreview: true,
    accept: 'image/*',
  },
  parameters: {
    docs: {
      description: {
        story: 'FileUpload with image preview thumbnails enabled.',
      },
    },
  },
};

export const Multiple: Story = {
  args: {
    variant: 'dropzone',
    multiple: true,
    maxFiles: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'FileUpload allowing multiple files with a maximum limit.',
      },
    },
  },
};

export const WithFileTypeValidation: Story = {
  args: {
    variant: 'dropzone',
    accept: 'image/*,.pdf,.doc,.docx',
    multiple: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'FileUpload with file type restrictions. Only images, PDFs, and Word documents are accepted.',
      },
    },
  },
};

export const WithSizeLimit: Story = {
  args: {
    variant: 'dropzone',
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'FileUpload with maximum file size limit of 10MB.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    variant: 'dropzone',
    disabled: true,
  },
};

// Size variants
export const Small: Story = {
  args: {
    variant: 'dropzone',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    variant: 'dropzone',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    variant: 'dropzone',
    size: 'lg',
  },
};

// Button variant
export const ButtonVariant: Story = {
  args: {
    variant: 'button',
    accept: '.pdf',
  },
  render: (args) => (
    <FileUpload {...args}>
      <Button variant="secondary" iconLeft={<Icon name="upload" variant="line" size="sm" />}>
        Upload Document
      </Button>
    </FileUpload>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact button variant for space-constrained UIs.',
      },
    },
  },
};

// Custom content
export const CustomContent: Story = {
  args: {
    variant: 'dropzone',
    accept: 'image/*',
    multiple: true,
  },
  render: (args) => (
    <FileUpload {...args}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 'var(--spacing-3)',
        padding: 'var(--spacing-6)'
      }}>
        <Icon name="image" variant="line" size="lg" />
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: 'var(--text-size-md)', 
            fontWeight: 'var(--text-weight-medium)',
            color: 'var(--color-text-default-default)',
            marginBottom: 'var(--spacing-1)'
          }}>
            Drop images here
          </div>
          <div style={{ 
            fontSize: 'var(--text-size-sm)', 
            color: 'var(--color-text-muted-default)' 
          }}>
            or click to browse from your device
          </div>
        </div>
      </div>
    </FileUpload>
  ),
  parameters: {
    docs: {
      description: {
        story: 'FileUpload with custom drop zone content.',
      },
    },
  },
};

// Controlled state example
export const ControlledState: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <FileUpload
          files={files}
          onFilesChange={setFiles}
          multiple
          showPreview
          accept="image/*"
        />
        <div style={{ 
          fontSize: 'var(--text-size-sm)', 
          color: 'var(--color-text-subtle-default)' 
        }}>
          Selected files: {files.length}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'FileUpload with controlled state management.',
      },
    },
  },
};

// With upload function
export const WithUploadFunction: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    
    const mockUpload = async (file: File) => {
      // Simulate upload with delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Simulate 80% success rate
      const success = Math.random() > 0.2;
      
      return {
        success,
        url: success ? `https://example.com/uploads/${file.name}` : undefined,
        error: success ? undefined : 'Upload failed',
      };
    };
    
    return (
      <FileUpload
        files={files}
        onFilesChange={setFiles}
        uploadFn={mockUpload}
        multiple
        showPreview
        accept="image/*,.pdf"
        maxSize={5 * 1024 * 1024}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'FileUpload with simulated upload progress. Files will show upload progress and success/error states.',
      },
    },
  },
};

// Error handling example
export const ErrorHandling: Story = {
  render: () => {
    const [error, setError] = useState<string | null>(null);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <FileUpload
          accept="image/*"
          maxSize={1024 * 1024} // 1MB
          maxFiles={3}
          multiple
          onError={(err) => {
            setError(err.message);
            setTimeout(() => setError(null), 5000);
          }}
        />
        {error && (
          <div style={{ 
            padding: 'var(--spacing-3)',
            backgroundColor: 'var(--color-surface-error-subtle)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-size-sm)',
            color: 'var(--color-text-error-default)'
          }}>
            {error}
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'FileUpload with error handling. Try uploading files larger than 1MB or more than 3 files to see error messages.',
      },
    },
  },
};

// Real-world examples
export const DocumentUpload: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    
    return (
      <div style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: 'var(--spacing-4)' }}>
          <h3 style={{ 
            margin: '0 0 var(--spacing-2) 0', 
            color: 'var(--color-text-default-default)',
            fontSize: 'var(--text-size-lg)',
            fontWeight: 'var(--text-weight-semibold)'
          }}>
            Upload Documents
          </h3>
          <p style={{ 
            margin: 0, 
            color: 'var(--color-text-subtle-default)',
            fontSize: 'var(--text-size-sm)'
          }}>
            Upload contracts, agreements, or supporting documents. Accepted formats: PDF, Word, or images up to 10MB.
          </p>
        </div>
        
        <FileUpload
          files={files}
          onFilesChange={setFiles}
          accept="image/*,.pdf,.doc,.docx"
          multiple
          maxSize={10 * 1024 * 1024}
          maxFiles={5}
          showPreview
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Real-world example of document upload with multiple file types and validation.',
      },
    },
  },
};

export const ProfilePhotoUpload: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    
    return (
      <div style={{ maxWidth: '400px' }}>
        <div style={{ marginBottom: 'var(--spacing-4)' }}>
          <h3 style={{ 
            margin: '0 0 var(--spacing-2) 0', 
            color: 'var(--color-text-default-default)',
            fontSize: 'var(--text-size-lg)',
            fontWeight: 'var(--text-weight-semibold)'
          }}>
            Profile Photo
          </h3>
          <p style={{ 
            margin: 0, 
            color: 'var(--color-text-subtle-default)',
            fontSize: 'var(--text-size-sm)'
          }}>
            Upload a profile photo. Maximum size: 2MB.
          </p>
        </div>
        
        <FileUpload
          files={files}
          onFilesChange={setFiles}
          accept="image/*"
          maxSize={2 * 1024 * 1024}
          maxFiles={1}
          showPreview
        >
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 'var(--spacing-2)',
            padding: 'var(--spacing-4)'
          }}>
            <Icon name="user" variant="line" size="lg" />
            <span style={{ fontSize: 'var(--text-size-sm)' }}>
              Click to upload photo
            </span>
          </div>
        </FileUpload>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Real-world example of single profile photo upload.',
      },
    },
  },
};

// Interactive playground
export const Playground: Story = {
  args: {
    variant: 'dropzone',
    size: 'md',
    multiple: true,
    showPreview: true,
    accept: 'image/*,.pdf',
    maxSize: 10 * 1024 * 1024,
    maxFiles: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - try different combinations of props!',
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
          Use the toolbar above to switch brands and themes! Notice how the FileUpload component 
          automatically adapts to different brand personalities and color schemes.
        </p>
      </div>
      
      <FileUpload
        multiple
        accept="image/*,.pdf"
        showPreview
      />
      
      <div style={{ 
        padding: 'var(--spacing-4)', 
        backgroundColor: 'var(--color-surface-level1)', 
        borderRadius: 'var(--border-radius-md)',
        border: '1px solid var(--color-border-default)'
      }}>
        <p style={{ 
          color: 'var(--color-text-subtle-default)', 
          fontSize: 'var(--text-size-sm)', 
          margin: '0',
          lineHeight: '1.5'
        }}>
          💡 <strong>Pro tip:</strong> The drop zone colors, borders, and states change when you switch brands/themes, 
          maintaining consistent visual hierarchy and accessibility across all combinations!
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: `
## Brand & Theme Switching

The FileUpload component uses design tokens to seamlessly adapt across all brand/theme combinations.

**Try switching between combinations using the Brand and Theme controls in the toolbar above!**
        `,
      },
    },
  },
};

// ============================================================================
// INTERACTION TESTS WITH PLAY FUNCTIONS
// ============================================================================

export const ThemeTokenValidation: Story = {
  tags: ['test', 'theme'],
  args: {
    variant: 'dropzone',
  },
  play: async ({ canvasElement, globals }) => {
    const canvas = within(canvasElement);

    // Verify theme is loaded
    verifyThemeLoaded(globals);

    // Get dropzone element
    const dropzone = canvas.getByRole('button', { name: /upload files/i });

    // Verify uses design tokens
    verifyUsesTokens(dropzone, [
      'fileupload-dropzone-padding',
      'fileupload-dropzone-borderRadius',
      'fileupload-dropzone-background-default',
      'fileupload-dropzone-border-default',
    ]);

    // Verify computed styles are not empty
    const styles = window.getComputedStyle(dropzone);
    expect(styles.padding).not.toBe('0px');
    expect(styles.borderRadius).not.toBe('0px');
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests that FileUpload properly uses design tokens from the theme system.',
      },
    },
  },
};
