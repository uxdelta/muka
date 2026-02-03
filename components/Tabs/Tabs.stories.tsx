import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';
import './Tabs.css';

const meta: Meta<typeof Tabs> = {
  title: 'Design System/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Tabs Component

Compound component with full keyboard navigation and ARIA support.
- \`<Tabs>\` — Root provider (controlled or uncontrolled)
- \`<TabList>\` — Container with arrow key navigation
- \`<Tab>\` — Individual trigger
- \`<TabPanel>\` — Content panel

## Keyboard Navigation
- **Arrow Left/Right** — Move between tabs
- **Home/End** — Jump to first/last tab
- **Enter/Space** — Activate tab

## Token Architecture
- \`tabs.list.border\` — Bottom border of tab list
- \`tabs.trigger.color.{state}.{foreground|border}\`
- \`tabs.trigger.padding.{x|y}\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Tabs defaultValue="overview">
        <TabList>
          <Tab value="overview">Overzicht</Tab>
          <Tab value="costs">Kosten</Tab>
          <Tab value="comparison">Vergelijking</Tab>
        </TabList>
        <TabPanel value="overview">
          <p>Overzicht van uw voertuig en bijbehorende kosten.</p>
        </TabPanel>
        <TabPanel value="costs">
          <p>Gedetailleerd kostenoverzicht: bijtelling, wegenbelasting, verzekering.</p>
        </TabPanel>
        <TabPanel value="comparison">
          <p>Vergelijk privé vs. zakelijk eigendom.</p>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Tabs defaultValue="private">
        <TabList>
          <Tab value="private">Privé</Tab>
          <Tab value="business">Zakelijk</Tab>
          <Tab value="compare" disabled>Vergelijken</Tab>
        </TabList>
        <TabPanel value="private">
          <p>Privé eigendom berekening.</p>
        </TabPanel>
        <TabPanel value="business">
          <p>Zakelijk eigendom berekening.</p>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      <Tabs defaultValue="bijtelling">
        <TabList>
          <Tab value="bijtelling">Bijtelling</Tab>
          <Tab value="btw">BTW</Tab>
          <Tab value="afschrijving">Afschrijving</Tab>
          <Tab value="wegenbelasting">Wegenbelasting</Tab>
          <Tab value="verzekering">Verzekering</Tab>
        </TabList>
        <TabPanel value="bijtelling">
          <p>Bijtelling berekening op basis van cataloguswaarde en emissie.</p>
        </TabPanel>
        <TabPanel value="btw">
          <p>BTW aftrek regels voor zakelijke voertuigen.</p>
        </TabPanel>
        <TabPanel value="afschrijving">
          <p>Afschrijving schema voor uw voertuig.</p>
        </TabPanel>
        <TabPanel value="wegenbelasting">
          <p>Wegenbelasting op basis van gewicht en brandstoftype.</p>
        </TabPanel>
        <TabPanel value="verzekering">
          <p>Geschatte verzekeringspremie.</p>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

export const CompositionScenarioToggle: Story = {
  name: 'Composition: Scenario Toggle',
  render: () => (
    <div style={{ width: '400px' }}>
      <Tabs defaultValue="sidebyside">
        <TabList>
          <Tab value="private">Privé</Tab>
          <Tab value="business">Zakelijk</Tab>
          <Tab value="sidebyside">Naast elkaar</Tab>
        </TabList>
        <TabPanel value="private">
          <div style={{ padding: '1rem', border: '1px solid var(--color-border-default)', borderRadius: 'var(--card-radius-md)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Privé eigendom</h4>
            <p style={{ margin: 0, opacity: 0.7 }}>Geen bijtelling, wel volledig privé kosten.</p>
          </div>
        </TabPanel>
        <TabPanel value="business">
          <div style={{ padding: '1rem', border: '1px solid var(--color-border-default)', borderRadius: 'var(--card-radius-md)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Zakelijk eigendom</h4>
            <p style={{ margin: 0, opacity: 0.7 }}>Bijtelling van toepassing, BTW aftrekbaar.</p>
          </div>
        </TabPanel>
        <TabPanel value="sidebyside">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div style={{ padding: '0.75rem', border: '1px solid var(--color-border-default)', borderRadius: 'var(--card-radius-sm)' }}>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>Privé</h4>
              <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>€4.200/jaar</p>
            </div>
            <div style={{ padding: '0.75rem', border: '1px solid var(--color-border-default)', borderRadius: 'var(--card-radius-sm)' }}>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>Zakelijk</h4>
              <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>€3.100/jaar</p>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  ),
};
