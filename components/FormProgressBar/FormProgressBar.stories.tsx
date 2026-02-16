import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FormProgressBar } from './FormProgressBar';
import './FormProgressBar.css';

const meta: Meta<typeof FormProgressBar> = {
  title: 'Components/Information/FormProgressBar',
  component: FormProgressBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# FormProgressBar Component

A horizontal stepper/progress indicator for multi-step forms.
Shows numbered step indicators connected by progress lines that visualise
how far the user has progressed.

**Features:**
- Supports 2–5 steps
- Three step states: **past** (checkmark), **current** (numbered, bold label), **upcoming** (numbered)
- Gradient connector lines that animate between states
- Click handler for completed steps (navigate back)
- Multi-brand theming through design tokens

## Token Architecture
This component uses the following token layers:
- **Alias tokens**: \`alias.color.accent.{default|contrast}\` — indicator fills
- **Semantic tokens**: \`color.surface.sunken\`, \`color.text.default.{default|inverse}\`
- **Typography tokens**: \`text.label.{sm|md}.{regular|bold}\`
- **Layout tokens**: \`spacing.4\`, \`spacing.7\`, \`border.radius.full\`
        `,
      },
    },
  },
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 0, max: 6 },
      description: 'Current active step (1-indexed). 0 = not started, > step count = done.',
    },
    steps: {
      control: 'object',
      description: 'Array of step objects with labels.',
    },
  },
  args: {
    steps: [
      { label: 'Account' },
      { label: 'Profile' },
      { label: 'Address' },
      { label: 'Payment' },
      { label: 'Review' },
    ],
    currentStep: 3,
  },
};

export default meta;
type Story = StoryObj<typeof FormProgressBar>;

// ─── Playground ─────────────────────────────────────────
export const Playground: Story = {};

// ─── All Progress States ────────────────────────────────
export const NotStarted: Story = {
  name: 'Not Started (step 0)',
  args: {
    currentStep: 0,
    steps: [
      { label: 'Account' },
      { label: 'Profile' },
      { label: 'Address' },
      { label: 'Payment' },
      { label: 'Review' },
    ],
  },
};

export const Step1Active: Story = {
  name: 'Step 1 Active',
  args: {
    currentStep: 1,
    steps: [
      { label: 'Account' },
      { label: 'Profile' },
      { label: 'Address' },
      { label: 'Payment' },
      { label: 'Review' },
    ],
  },
};

export const Step2Active: Story = {
  name: 'Step 2 Active',
  args: {
    currentStep: 2,
    steps: [
      { label: 'Account' },
      { label: 'Profile' },
      { label: 'Address' },
      { label: 'Payment' },
      { label: 'Review' },
    ],
  },
};

export const Step3Active: Story = {
  name: 'Step 3 Active',
  args: {
    currentStep: 3,
    steps: [
      { label: 'Account' },
      { label: 'Profile' },
      { label: 'Address' },
      { label: 'Payment' },
      { label: 'Review' },
    ],
  },
};

export const Step4Active: Story = {
  name: 'Step 4 Active',
  args: {
    currentStep: 4,
    steps: [
      { label: 'Account' },
      { label: 'Profile' },
      { label: 'Address' },
      { label: 'Payment' },
      { label: 'Review' },
    ],
  },
};

export const Step5Active: Story = {
  name: 'Step 5 Active',
  args: {
    currentStep: 5,
    steps: [
      { label: 'Account' },
      { label: 'Profile' },
      { label: 'Address' },
      { label: 'Payment' },
      { label: 'Review' },
    ],
  },
};

export const AllComplete: Story = {
  name: 'All Complete (done)',
  args: {
    currentStep: 6,
    steps: [
      { label: 'Account' },
      { label: 'Profile' },
      { label: 'Address' },
      { label: 'Payment' },
      { label: 'Review' },
    ],
  },
};

// ─── Step Count Variations ──────────────────────────────
export const TwoSteps: Story = {
  name: '2 Steps',
  args: {
    currentStep: 1,
    steps: [
      { label: 'Details' },
      { label: 'Confirm' },
    ],
  },
};

export const ThreeSteps: Story = {
  name: '3 Steps',
  args: {
    currentStep: 2,
    steps: [
      { label: 'Info' },
      { label: 'Verify' },
      { label: 'Done' },
    ],
  },
};

export const FourSteps: Story = {
  name: '4 Steps',
  args: {
    currentStep: 2,
    steps: [
      { label: 'Account' },
      { label: 'Profile' },
      { label: 'Payment' },
      { label: 'Review' },
    ],
  },
};

// ─── All States Overview ────────────────────────────────
export const AllStates: Story = {
  name: 'All States (overview)',
  render: () => {
    const steps = [
      { label: 'Account' },
      { label: 'Profile' },
      { label: 'Address' },
      { label: 'Payment' },
      { label: 'Review' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: 400 }}>
        {[0, 1, 2, 3, 4, 5, 6].map((step) => (
          <div key={step}>
            <p style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
              currentStep={step} {step === 0 ? '(not started)' : step > 5 ? '(done)' : ''}
            </p>
            <FormProgressBar steps={steps} currentStep={step} />
          </div>
        ))}
      </div>
    );
  },
};

// ─── Interactive Example ────────────────────────────────
export const Interactive: Story = {
  name: 'Interactive (with navigation)',
  render: function InteractiveStory() {
    const steps = [
      { label: 'Account' },
      { label: 'Profile' },
      { label: 'Address' },
      { label: 'Payment' },
      { label: 'Review' },
    ];

    const [current, setCurrent] = useState(1);

    return (
      <div style={{ maxWidth: 400 }}>
        <FormProgressBar
          steps={steps}
          currentStep={current}
          onStepClick={(index) => setCurrent(index + 1)}
        />
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current <= 0}
            style={{ padding: '6px 16px', cursor: 'pointer' }}
          >
            Back
          </button>
          <button
            onClick={() => setCurrent((c) => Math.min(steps.length + 1, c + 1))}
            disabled={current > steps.length}
            style={{ padding: '6px 16px', cursor: 'pointer' }}
          >
            {current >= steps.length ? 'Finish' : 'Next'}
          </button>
          <span style={{ alignSelf: 'center', fontSize: 14, color: '#666' }}>
            Step {current} / {steps.length}
          </span>
        </div>
      </div>
    );
  },
};
