import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from './Toggle';
import './Toggle.css';

import { Icon } from '../Icon';

const StackIcon = () => <Icon name="stack" variant="line" size="md" />;
const BellIcon = () => <Icon name="bell" variant="line" size="md" />;
const MoonIcon = () => <Icon name="moon" variant="line" size="md" />;

const meta: Meta<typeof Toggle> = {
  title: 'Design System/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Toggle Component

A switch control for binary on/off states.
Built using the Muka design token system with support for:
- On/Off states with smooth animation
- Optional label, caption, and icon
- Optional divider for list layouts
- Disabled state
- Multi-brand theming through design tokens

## Token Architecture
This component uses the following token layers:
- **Component tokens**: \`toggle.track.*\`, \`toggle.knob.*\`
- **Semantic tokens**: \`color.border.muted\`, \`color.text.*\`, \`color.action.*\`
- **Typography tokens**: \`text.label.lg.*\`, \`text.body.base.regular\`
        `,
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
    disabled: {
      control: 'boolean',
    },
    showDivider: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    caption: {
      control: 'text',
    },
  },
  args: {
    label: 'Label',
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

// ─── Playground ─────────────────────────────────────────
export const Playground: Story = {
  args: {
    label: 'Enable feature',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

// ─── States ─────────────────────────────────────────────
export const Off: Story = {
  args: {
    label: 'Off',
    checked: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const On: Story = {
  args: {
    label: 'On',
    checked: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const DisabledOn: Story = {
  args: {
    label: 'Disabled (on)',
    disabled: true,
    checked: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

// ─── With Caption ───────────────────────────────────────
export const WithCaption: Story = {
  args: {
    label: 'Notifications',
    caption: 'Receive push notifications for new messages',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

// ─── With Icon ──────────────────────────────────────────
export const WithIcon: Story = {
  args: {
    label: 'Dark mode',
    icon: <MoonIcon />,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

// ─── With Divider ───────────────────────────────────────
export const WithDivider: Story = {
  args: {
    label: 'Setting',
    showDivider: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

// ─── All States ─────────────────────────────────────────
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '320px' }}>
      <Toggle label="Off" />
      <Toggle label="On" defaultChecked />
      <Toggle label="Disabled" disabled />
      <Toggle label="Disabled (on)" disabled defaultChecked />
    </div>
  ),
};

// ─── Settings List ──────────────────────────────────────
export const SettingsList: Story = {
  name: 'Settings List',
  render: function SettingsListStory() {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSync: true,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '320px' }}>
        <Toggle
          label="Notifications"
          caption="Receive push notifications"
          icon={<BellIcon />}
          checked={settings.notifications}
          onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
          showDivider
        />
        <Toggle
          label="Dark mode"
          caption="Use dark theme"
          icon={<MoonIcon />}
          checked={settings.darkMode}
          onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
          showDivider
        />
        <Toggle
          label="Auto sync"
          caption="Sync data automatically"
          icon={<StackIcon />}
          checked={settings.autoSync}
          onChange={(e) => setSettings({ ...settings, autoSync: e.target.checked })}
        />
      </div>
    );
  },
};

// ─── Simple List ────────────────────────────────────────
export const SimpleList: Story = {
  name: 'Simple List',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '320px' }}>
      <Toggle label="Option 1" showDivider />
      <Toggle label="Option 2" showDivider />
      <Toggle label="Option 3" />
    </div>
  ),
};

// ─── Controlled ─────────────────────────────────────────
export const Controlled: Story = {
  render: function ControlledStory() {
    const [checked, setChecked] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px' }}>
        <Toggle
          label="Controlled toggle"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          State: {checked ? 'On' : 'Off'}
        </p>
      </div>
    );
  },
};
