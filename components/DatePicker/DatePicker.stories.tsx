import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import './DatePicker.css';

const meta: Meta<typeof DatePicker> = {
  title: 'Design System/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# DatePicker Component

Calendar component for selecting a single date.

## Features
- Month/year navigation
- Today indicator
- Min/max date constraints
- Dutch locale by default (nl-NL)
- Full keyboard navigation

## Sizes
- sm, md, lg

## Usage

Use DatePicker for trip date selection in kilometer tracking, or any form
that requires date input. Can be used standalone or integrated with Input
component via a popover.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
    locale: {
      control: { type: 'text' },
      description: 'Locale for formatting',
    },
  },
  args: {
    size: 'md',
    disabled: false,
    locale: 'nl-NL',
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Playground: Story = {
  render: function PlaygroundStory(args) {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div>
        <DatePicker {...args} value={date} onChange={setDate} />
        <p style={{ marginTop: '1rem', color: 'var(--color-text-subtle-default)' }}>
          Geselecteerd: {date ? date.toLocaleDateString('nl-NL') : 'Geen'}
        </p>
      </div>
    );
  },
};

export const WithPreselectedDate: Story = {
  render: function PreselectedStory() {
    const [date, setDate] = useState<Date | null>(new Date());
    return <DatePicker value={date} onChange={setDate} />;
  },
};

export const Sizes: Story = {
  render: function SizesStory() {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>Small</h4>
          <DatePicker size="sm" value={date} onChange={setDate} />
        </div>
        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>Medium (default)</h4>
          <DatePicker size="md" value={date} onChange={setDate} />
        </div>
        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>Large</h4>
          <DatePicker size="lg" value={date} onChange={setDate} />
        </div>
      </div>
    );
  },
};

export const WithMinMaxDates: Story = {
  name: 'With Min/Max Dates',
  render: function MinMaxStory() {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1); // First of month
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last of month

    return (
      <div>
        <DatePicker value={date} onChange={setDate} minDate={minDate} maxDate={maxDate} />
        <p style={{ marginTop: '1rem', color: 'var(--color-text-subtle-default)' }}>
          Alleen data in de huidige maand zijn selecteerbaar
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => <DatePicker disabled value={new Date()} />,
};

export const EnglishLocale: Story = {
  render: function EnglishStory() {
    const [date, setDate] = useState<Date | null>(new Date());
    return <DatePicker locale="en-US" value={date} onChange={setDate} />;
  },
};

export const TripDateSelection: Story = {
  name: 'Composition: Trip Date Selection',
  render: function TripDateStory() {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '320px' }}>
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 600,
            }}
          >
            Datum van de rit
          </label>
          <DatePicker
            value={date}
            onChange={setDate}
            maxDate={new Date()} // Can't select future dates
          />
        </div>
        {date && (
          <p style={{ color: 'var(--color-text-subtle-default)' }}>
            Rit geregistreerd voor: {date.toLocaleDateString('nl-NL', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
      </div>
    );
  },
};
