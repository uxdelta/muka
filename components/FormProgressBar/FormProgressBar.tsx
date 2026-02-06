import React from 'react';
import './FormProgressBar.css';

export interface FormProgressBarStep {
  /** Label displayed below the step indicator */
  label: string;
}

export interface FormProgressBarProps {
  /**
   * Array of step configurations (2–5 steps supported).
   * Each step requires a label.
   */
  steps: FormProgressBarStep[];

  /**
   * Current active step (1-indexed).
   * - 0 = not started (all steps upcoming)
   * - 1..N = that step is active
   * - > N = all steps completed ("done")
   */
  currentStep: number;

  /** Callback when a completed (past) step indicator is clicked */
  onStepClick?: (stepIndex: number) => void;

  /** Additional CSS classes */
  className?: string;
}

type StepStatus = 'past' | 'current' | 'upcoming';
type ConnectorStatus = 'past' | 'current' | 'current-right' | 'upcoming';

/** Checkmark icon (heroicons-mini/check) for completed steps */
const CheckIcon: React.FC = () => (
  <svg
    className="muka-progress-bar__check-icon"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
      clipRule="evenodd"
    />
  </svg>
);

function getStepStatus(stepIndex: number, currentStep: number, totalSteps: number): StepStatus {
  if (currentStep <= 0) return 'upcoming';
  if (currentStep > totalSteps) return 'past';
  // currentStep is 1-indexed, stepIndex is 0-indexed
  const activeIndex = currentStep - 1;
  if (stepIndex < activeIndex) return 'past';
  if (stepIndex === activeIndex) return 'current';
  return 'upcoming';
}

function getConnectorStatus(
  connectorIndex: number,
  currentStep: number,
  totalSteps: number,
): ConnectorStatus {
  if (currentStep <= 0) return 'upcoming';
  if (currentStep > totalSteps) return 'past';

  const activeIndex = currentStep - 1;
  if (connectorIndex < activeIndex - 1) return 'past';
  if (connectorIndex === activeIndex - 1) return 'current';
  if (connectorIndex === activeIndex) return 'current-right';
  return 'upcoming';
}

/**
 * FormProgressBar Component
 *
 * A horizontal stepper/progress indicator for multi-step forms.
 * Shows numbered step indicators connected by progress lines.
 * Supports 2–5 steps with past, current, and upcoming states.
 *
 * Built using the Muka design token system with support for:
 * - Dynamic step counts (2–5)
 * - Step states: past (checkmark), current (number), upcoming (number)
 * - Animated connector lines showing progress
 * - Multi-brand theming through design tokens
 *
 * Tokens used:
 * - alias.color.accent.{default|contrast} — step indicator backgrounds
 * - color.surface.sunken — upcoming indicator/connector background
 * - color.text.default.{default|inverse} — indicator/label text
 * - text.label.{sm|md}.{regular|bold} — typography
 * - spacing.4, spacing.7 — layout spacing
 * - border.radius.full — circular indicators
 */
export const FormProgressBar: React.FC<FormProgressBarProps> = ({
  steps,
  currentStep,
  onStepClick,
  className = '',
}) => {
  const totalSteps = steps.length;

  const rootClasses = ['muka-progress-bar', className].filter(Boolean).join(' ');

  return (
    <div
      className={rootClasses}
      role="group"
      aria-label="Form progress"
    >
      <div className="muka-progress-bar__track">
        {/* Step indicators layer — positioned on top */}
        <div className="muka-progress-bar__steps">
          {steps.map((step, index) => {
            const status = getStepStatus(index, currentStep, totalSteps);
            const stepNumber = index + 1;
            const isPast = status === 'past';
            const isCurrent = status === 'current';

            const stepClasses = [
              'muka-progress-bar__step',
              `muka-progress-bar__step--${status}`,
            ].join(' ');

            const indicatorClasses = [
              'muka-progress-bar__indicator',
              `muka-progress-bar__indicator--${status}`,
            ].join(' ');

            const labelClasses = [
              'muka-progress-bar__label',
              isCurrent && 'muka-progress-bar__label--current',
            ].filter(Boolean).join(' ');

            const handleClick = isPast && onStepClick
              ? () => onStepClick(index)
              : undefined;

            return (
              <div
                key={index}
                className={stepClasses}
                aria-current={isCurrent ? 'step' : undefined}
              >
                <div
                  className={indicatorClasses}
                  onClick={handleClick}
                  role={handleClick ? 'button' : undefined}
                  tabIndex={handleClick ? 0 : undefined}
                  onKeyDown={
                    handleClick
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleClick();
                          }
                        }
                      : undefined
                  }
                  aria-label={
                    isPast
                      ? `Step ${stepNumber}: ${step.label} (completed)`
                      : isCurrent
                        ? `Step ${stepNumber}: ${step.label} (current)`
                        : `Step ${stepNumber}: ${step.label}`
                  }
                >
                  {isPast ? (
                    <CheckIcon />
                  ) : (
                    <span className="muka-progress-bar__number">{stepNumber}</span>
                  )}
                </div>
                <span className={labelClasses}>{step.label}</span>
              </div>
            );
          })}
        </div>

        {/* Connector lines layer — positioned behind indicators */}
        <div className="muka-progress-bar__connectors">
          {Array.from({ length: totalSteps - 1 }, (_, index) => {
            const status = getConnectorStatus(index, currentStep, totalSteps);
            const connectorClasses = [
              'muka-progress-bar__connector',
              `muka-progress-bar__connector--${status}`,
            ].join(' ');

            return <div key={index} className={connectorClasses} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default FormProgressBar;
