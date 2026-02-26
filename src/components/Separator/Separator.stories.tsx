import type { Meta, StoryObj } from '@storybook/react-vite';

import { CellSimple } from '../CellSimple';
import { Panel } from '../Panel';
import { Separator, type SeparatorProps } from './Separator';

const meta = {
  title: 'Layout/Separator',
  component: Separator,
  args: {
    orientation: 'horizontal',
    spacing: 'none',
    padStart: false
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<SeparatorProps>;

export default meta;
type Story = StoryObj<SeparatorProps>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  render: (args) => (
    <Panel>
      <CellSimple title="Элемент 1" subtitle="Описание" />
      <Separator {...args} />
      <CellSimple title="Элемент 2" subtitle="Описание" />
      <Separator {...args} />
      <CellSimple title="Элемент 3" subtitle="Описание" />
    </Panel>
  )
};

// ─── Between cells ────────────────────────────────────────────────────────────

export const BetweenCells: Story = {
  name: 'Between Cells',
  render: () => (
    <Panel>
      <CellSimple title="Входящие" subtitle="3 новых сообщения" />
      <Separator />
      <CellSimple title="Отправленные" />
      <Separator />
      <CellSimple title="Архив" />
      <Separator />
      <CellSimple title="Корзина" />
    </Panel>
  )
};

// ─── padStart (список с иконкой) ──────────────────────────────────────────────

export const PadStart: Story = {
  name: 'padStart (отступ как в списке)',
  render: () => (
    <Panel>
      <CellSimple title="iOS" subtitle="Apple mobile platform" />
      <Separator padStart />
      <CellSimple title="Android" subtitle="Google mobile platform" />
      <Separator padStart />
      <CellSimple title="Web" subtitle="Browser environment" />
    </Panel>
  )
};

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const Spacing: Story = {
  name: 'Spacing',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span
        style={{
          padding: '0 16px',
          fontSize: 13,
          color: 'var(--text-secondary)'
        }}
      >
        none
      </span>
      <Separator spacing="none" />
      <span
        style={{
          padding: '0 16px',
          fontSize: 13,
          color: 'var(--text-secondary)'
        }}
      >
        small
      </span>
      <Separator spacing="small" />
      <span
        style={{
          padding: '0 16px',
          fontSize: 13,
          color: 'var(--text-secondary)'
        }}
      >
        medium
      </span>
      <Separator spacing="medium" />
      <span
        style={{
          padding: '0 16px',
          fontSize: 13,
          color: 'var(--text-secondary)'
        }}
      >
        large
      </span>
      <Separator spacing="large" />
    </div>
  )
};

// ─── Vertical ─────────────────────────────────────────────────────────────────

export const Vertical: Story = {
  name: 'Vertical',
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 48,
        padding: '0 16px'
      }}
    >
      <span style={{ fontSize: 15 }}>Лента</span>
      <Separator orientation="vertical" spacing="medium" />
      <span style={{ fontSize: 15 }}>Уведомления</span>
      <Separator orientation="vertical" spacing="medium" />
      <span style={{ fontSize: 15 }}>Профиль</span>
    </div>
  )
};
