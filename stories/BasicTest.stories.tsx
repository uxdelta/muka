import type { Meta, StoryObj } from '@storybook/react';

// Simple test component
const TestDiv = () => {
  return (
    <div style={{ 
      padding: '20px', 
      background: '#f0f0f0', 
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif',
      color: '#333'
    }}>
      ✅ Basic test working! Storybook is rendering correctly.
    </div>
  );
};

const meta: Meta<typeof TestDiv> = {
  title: 'Debug/Basic Test',
  component: TestDiv,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Working: Story = {};
