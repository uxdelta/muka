import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FileUpload, type FileWithStatus } from './FileUpload';
import { Button } from '../Button';
import { Icon } from '../Icon';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# FileUpload Component

A file upload component with drag-and-drop support for document management.

## Features
- Drag-and-drop file selection
- Click to browse files
- File type validation
- File size validation
- Multiple file support
- Upload progress display
- Image preview thumbnails
- Error state handling

## Variants
- **dropzone**: Full drop zone area (default)
- **button**: Compact button-style trigger

## Sizes
- sm, md (default), lg
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['dropzone', 'button'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    multiple: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    showPreview: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    accept: 'image/*,.pdf,.doc,.docx',
    multiple: true,
  },
};

export const SingleFile: Story = {
  args: {
    accept: '.pdf',
    multiple: false,
  },
};

export const ImageUpload: Story = {
  args: {
    accept: 'image/*',
    multiple: true,
    showPreview: true,
    maxSize: 5 * 1024 * 1024, // 5MB
  },
};

export const WithMaxFiles: Story = {
  args: {
    accept: 'image/*,.pdf',
    multiple: true,
    maxFiles: 3,
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    accept: 'image/*,.pdf',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    accept: 'image/*,.pdf',
    multiple: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    accept: 'image/*,.pdf',
  },
};

export const ButtonVariant: Story = {
  args: {
    variant: 'button',
    accept: '.pdf',
  },
  render: (args) => (
    <FileUpload {...args}>
      <Button variant="secondary" iconLeft={<Icon name="upload-2" size="sm" />}>
        Upload Document
      </Button>
    </FileUpload>
  ),
};

export const CustomContent: Story = {
  args: {
    accept: 'image/*',
    multiple: true,
    showPreview: true,
  },
  render: (args) => (
    <FileUpload {...args}>
      <Icon name="image" size="lg" />
      <span style={{ fontWeight: 500 }}>Drop your images here</span>
      <span style={{ fontSize: '0.875rem', color: 'var(--color-text-subtle-default)' }}>
        PNG, JPG, GIF up to 10MB
      </span>
    </FileUpload>
  ),
};

// Simulated upload function
const simulateUpload = (
  file: File,
  onProgress: (progress: number) => void
): Promise<{ success: boolean; error?: string }> => {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        clearInterval(interval);
        onProgress(100);
        // Simulate random failure for demo
        if (Math.random() > 0.8) {
          resolve({ success: false, error: 'Network error' });
        } else {
          resolve({ success: true });
        }
      } else {
        onProgress(progress);
      }
    }, 200);
  });
};

export const WithUploadProgress: Story = {
  args: {
    accept: 'image/*,.pdf',
    multiple: true,
    showPreview: true,
    uploadFn: simulateUpload,
  },
};

export const Controlled: Story = {
  render: () => {
    const [files, setFiles] = useState<FileWithStatus[]>([]);

    return (
      <div style={{ width: '400px' }}>
        <FileUpload
          accept="image/*,.pdf"
          multiple
          showPreview
          files={files}
          onFilesChange={setFiles}
          onError={(error) => console.log('Error:', error)}
        />
        <div style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
          Selected files: {files.length}
        </div>
      </div>
    );
  },
};

export const WithValidationErrors: Story = {
  render: () => {
    const [errors, setErrors] = useState<string[]>([]);

    return (
      <div style={{ width: '400px' }}>
        <FileUpload
          accept=".pdf"
          maxSize={1024 * 1024} // 1MB
          maxFiles={2}
          multiple
          onError={(error) => setErrors((prev) => [...prev, error.message])}
        />
        {errors.length > 0 && (
          <div
            style={{
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: 'var(--color-state-error-subtle)',
              borderRadius: 'var(--border-radius-md)',
              fontSize: '0.875rem',
              color: 'var(--color-state-error-foreground)',
            }}
          >
            <strong>Validation errors:</strong>
            <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem' }}>
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};
