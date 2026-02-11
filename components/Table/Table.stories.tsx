import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell } from './Table';
import './Table.css';

const meta: Meta<typeof Table> = {
  title: 'Design System/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Table Component

Data table with support for sorting, selection, and responsive layouts.

## Sub-components
- **Table**: Main wrapper
- **TableHead**: Header section
- **TableBody**: Body section
- **TableRow**: Row wrapper
- **TableCell**: Standard cell
- **TableHeaderCell**: Header cell with optional sorting

## Sizes
- sm, md, lg (affects cell padding)

## Features
- Sortable columns
- Row selection
- Fixed table layout
- Responsive horizontal scroll

## Usage

Use Table for displaying structured data like costs, comparisons, and reports.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Cell padding size',
    },
    fixedLayout: {
      control: { type: 'boolean' },
      description: 'Use fixed table layout',
    },
    responsive: {
      control: { type: 'boolean' },
      description: 'Enable responsive scroll',
    },
  },
  args: {
    size: 'md',
    fixedLayout: false,
    responsive: true,
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleData = [
  { id: 1, name: 'Tesla Model 3', fuel: 'Electric', cost: '€45.990', bijtelling: '16%' },
  { id: 2, name: 'BMW 3 Serie', fuel: 'Benzine', cost: '€52.500', bijtelling: '22%' },
  { id: 3, name: 'Audi A4', fuel: 'Diesel', cost: '€48.900', bijtelling: '22%' },
  { id: 4, name: 'Volkswagen ID.4', fuel: 'Electric', cost: '€44.990', bijtelling: '16%' },
];

export const Playground: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Voertuig</TableHeaderCell>
          <TableHeaderCell>Brandstof</TableHeaderCell>
          <TableHeaderCell align="right">Cataloguswaarde</TableHeaderCell>
          <TableHeaderCell align="right">Bijtelling</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.fuel}</TableCell>
            <TableCell align="right">{row.cost}</TableCell>
            <TableCell align="right">{row.bijtelling}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Small</h4>
        <Table size="sm">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Voertuig</TableHeaderCell>
              <TableHeaderCell align="right">Kosten</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow><TableCell>Tesla Model 3</TableCell><TableCell align="right">€45.990</TableCell></TableRow>
            <TableRow><TableCell>BMW 3 Serie</TableCell><TableCell align="right">€52.500</TableCell></TableRow>
          </TableBody>
        </Table>
      </div>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Medium (default)</h4>
        <Table size="md">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Voertuig</TableHeaderCell>
              <TableHeaderCell align="right">Kosten</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow><TableCell>Tesla Model 3</TableCell><TableCell align="right">€45.990</TableCell></TableRow>
            <TableRow><TableCell>BMW 3 Serie</TableCell><TableCell align="right">€52.500</TableCell></TableRow>
          </TableBody>
        </Table>
      </div>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Large</h4>
        <Table size="lg">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Voertuig</TableHeaderCell>
              <TableHeaderCell align="right">Kosten</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow><TableCell>Tesla Model 3</TableCell><TableCell align="right">€45.990</TableCell></TableRow>
            <TableRow><TableCell>BMW 3 Serie</TableCell><TableCell align="right">€52.500</TableCell></TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  ),
};

export const Sortable: Story = {
  render: function SortableStory() {
    type SortKey = 'name' | 'cost';
    const [sortKey, setSortKey] = useState<SortKey>('name');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

    const handleSort = (key: SortKey) => {
      if (sortKey === key) {
        setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
      } else {
        setSortKey(key);
        setSortDir('asc');
      }
    };

    const sortedData = [...sampleData].sort((a, b) => {
      const aVal = sortKey === 'cost' ? parseInt(a.cost.replace(/[^0-9]/g, '')) : a.name;
      const bVal = sortKey === 'cost' ? parseInt(b.cost.replace(/[^0-9]/g, '')) : b.name;
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell
              sortable
              sortDirection={sortKey === 'name' ? sortDir : null}
              onSort={() => handleSort('name')}
            >
              Voertuig
            </TableHeaderCell>
            <TableHeaderCell>Brandstof</TableHeaderCell>
            <TableHeaderCell
              align="right"
              sortable
              sortDirection={sortKey === 'cost' ? sortDir : null}
              onSort={() => handleSort('cost')}
            >
              Cataloguswaarde
            </TableHeaderCell>
            <TableHeaderCell align="right">Bijtelling</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.fuel}</TableCell>
              <TableCell align="right">{row.cost}</TableCell>
              <TableCell align="right">{row.bijtelling}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const Selectable: Story = {
  render: function SelectableStory() {
    const [selected, setSelected] = useState<number[]>([]);

    const toggleRow = (id: number) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    };

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Voertuig</TableHeaderCell>
            <TableHeaderCell>Brandstof</TableHeaderCell>
            <TableHeaderCell align="right">Cataloguswaarde</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleData.map((row) => (
            <TableRow
              key={row.id}
              selected={selected.includes(row.id)}
              onClick={() => toggleRow(row.id)}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.fuel}</TableCell>
              <TableCell align="right">{row.cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const CostBreakdown: Story = {
  name: 'Composition: Cost Breakdown',
  render: () => (
    <Table size="md">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Kostenpost</TableHeaderCell>
          <TableHeaderCell align="right">Per maand</TableHeaderCell>
          <TableHeaderCell align="right">Per jaar</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Afschrijving</TableCell>
          <TableCell align="right">€412</TableCell>
          <TableCell align="right">€4.944</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Verzekering</TableCell>
          <TableCell align="right">€85</TableCell>
          <TableCell align="right">€1.020</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Wegenbelasting</TableCell>
          <TableCell align="right">€0</TableCell>
          <TableCell align="right">€0</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Brandstof / Laden</TableCell>
          <TableCell align="right">€95</TableCell>
          <TableCell align="right">€1.140</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Onderhoud</TableCell>
          <TableCell align="right">€42</TableCell>
          <TableCell align="right">€504</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><strong>Totaal</strong></TableCell>
          <TableCell align="right"><strong>€634</strong></TableCell>
          <TableCell align="right"><strong>€7.608</strong></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const OwnershipComparison: Story = {
  name: 'Composition: Ownership Comparison',
  render: () => (
    <Table size="md">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Aspect</TableHeaderCell>
          <TableHeaderCell align="right">Priv&eacute;</TableHeaderCell>
          <TableHeaderCell align="right">Zakelijk</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Bruto kosten</TableCell>
          <TableCell align="right">€7.608</TableCell>
          <TableCell align="right">€7.608</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>BTW aftrek (21%)</TableCell>
          <TableCell align="right">-</TableCell>
          <TableCell align="right">-€1.598</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bijtelling (16%)</TableCell>
          <TableCell align="right">-</TableCell>
          <TableCell align="right">+€2.876</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Belastingvoordeel (37%)</TableCell>
          <TableCell align="right">-</TableCell>
          <TableCell align="right">-€2.815</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><strong>Netto kosten</strong></TableCell>
          <TableCell align="right"><strong>€7.608</strong></TableCell>
          <TableCell align="right"><strong>€6.071</strong></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
