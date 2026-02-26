import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { CellSimple } from '../CellSimple';
import { RadioButton, RadioGroup, type RadioGroupProps } from './RadioGroup';

const meta = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  argTypes: {
    ...hideArgsControl(['children', 'onValueChange']),
    horizontalOverflow: {
      control: 'inline-radio',
      options: ['wrap', 'scroll'],
      description: 'Поведение при переполнении горизонтального ряда'
    }
  },
  args: {
    disabled: false,
    direction: 'vertical',
    appearance: 'themed',
    size: 'medium',
    compact: false,
    horizontalOverflow: 'wrap'
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<RadioGroupProps>;

export default meta;
type Story = StoryObj<RadioGroupProps>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  render: (args) => {
    const [value, setValue] = useState('option1');

    return (
      <RadioGroup
        {...args}
        name="playground"
        value={value}
        onValueChange={setValue}
      >
        <CellSimple
          as="label"
          before={<RadioButton value="option1" />}
          title="Опция 1"
          subtitle="Описание первой опции"
        />
        <CellSimple
          as="label"
          before={<RadioButton value="option2" />}
          title="Опция 2"
          subtitle="Описание второй опции"
        />
        <CellSimple
          as="label"
          before={<RadioButton value="option3" />}
          title="Опция 3"
          subtitle="Описание третьей опции"
        />
        <CellSimple
          as="label"
          before={<RadioButton value="option4" disabled />}
          title="Опция 4 (недоступна)"
        />
      </RadioGroup>
    );
  }
};

// ─── Standalone RadioButton ───────────────────────────────────────────────────

export const Standalone: Story = {
  name: 'Standalone RadioButton',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <RadioButton name="standalone" value="a" defaultChecked={false} />
      <RadioButton name="standalone" value="b" />
      <RadioButton name="standalone" value="c" disabled />
    </div>
  )
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  render: (args) => {
    const [value, setValue] = useState('a');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <RadioGroup
          {...args}
          name="small"
          size="small"
          direction="horizontal"
          value={value}
          onValueChange={setValue}
        >
          <RadioButton value="a" />
          <RadioButton value="b" />
          <RadioButton value="c" />
        </RadioGroup>
        <RadioGroup
          {...args}
          name="medium"
          size="medium"
          direction="horizontal"
          value={value}
          onValueChange={setValue}
        >
          <RadioButton value="a" />
          <RadioButton value="b" />
          <RadioButton value="c" />
        </RadioGroup>
      </div>
    );
  }
};

// ─── Appearances ──────────────────────────────────────────────────────────────

export const Appearances: Story = {
  name: 'Appearances',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        flexWrap: 'wrap'
      }}
    >
      <RadioButton
        name="app"
        value="themed"
        appearance="themed"
        defaultChecked
      />
      <RadioButton
        name="app"
        value="neutral"
        appearance="neutral"
        defaultChecked
      />
      <RadioButton
        name="app"
        value="contrast-pinned"
        appearance="contrast-pinned"
        defaultChecked
      />
      <RadioButton
        name="app"
        value="neutral-fade"
        appearance="neutral-fade"
        defaultChecked
      />
      <RadioButton
        name="app"
        value="accent-red"
        appearance="accent-red"
        defaultChecked
      />
      <RadioButton
        name="app"
        value="inherit"
        appearance="inherit"
        defaultChecked
      />
    </div>
  )
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  name: 'States',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {/* Unchecked */}
      <RadioButton name="states-a" value="0" />
      {/* Checked */}
      <RadioButton name="states-b" value="0" defaultChecked />
      {/* Disabled unchecked */}
      <RadioButton name="states-c" value="0" disabled />
      {/* Disabled checked */}
      <RadioButton name="states-d" value="0" disabled defaultChecked />
    </div>
  )
};

// ─── With Cell (recommended usage) ───────────────────────────────────────────

export const WithCell: Story = {
  name: 'With Cell (recommended)',
  render: (args) => {
    const [value, setValue] = useState('ios');

    return (
      <RadioGroup
        {...args}
        name="platform"
        value={value}
        onValueChange={setValue}
        direction="vertical"
      >
        <CellSimple
          as="label"
          before={<RadioButton value="ios" />}
          title="iOS"
          subtitle="Apple mobile platform"
        />
        <CellSimple
          as="label"
          before={<RadioButton value="android" />}
          title="Android"
          subtitle="Google mobile platform"
        />
        <CellSimple
          as="label"
          before={<RadioButton value="web" />}
          title="Web"
          subtitle="Browser environment"
        />
        <CellSimple
          as="label"
          before={<RadioButton value="other" disabled />}
          title="Other (unavailable)"
        />
      </RadioGroup>
    );
  }
};

// ─── Horizontal ──────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  name: 'Horizontal / Wrap',
  render: (args) => {
    const [value, setValue] = useState('month');

    return (
      <RadioGroup
        {...args}
        name="period"
        value={value}
        onValueChange={setValue}
        direction="horizontal"
        horizontalOverflow="wrap"
        compact
      >
        <CellSimple
          as="label"
          before={<RadioButton value="day" />}
          title="День"
        />
        <CellSimple
          as="label"
          before={<RadioButton value="week" />}
          title="Неделя"
        />
        <CellSimple
          as="label"
          before={<RadioButton value="month" />}
          title="Месяц"
        />
        <CellSimple
          as="label"
          before={<RadioButton value="quarter" />}
          title="Квартал"
        />
        <CellSimple
          as="label"
          before={<RadioButton value="year" />}
          title="Год"
        />
      </RadioGroup>
    );
  }
};

export const HorizontalScroll: Story = {
  name: 'Horizontal / Scroll',
  render: (args) => {
    const [value, setValue] = useState('month');

    return (
      <RadioGroup
        {...args}
        name="period-scroll"
        value={value}
        onValueChange={setValue}
        direction="horizontal"
        horizontalOverflow="scroll"
        compact
      >
        <CellSimple
          as="label"
          before={<RadioButton value="day" />}
          title="День"
        />
        <CellSimple
          as="label"
          before={<RadioButton value="week" />}
          title="Неделя"
        />
        <CellSimple
          as="label"
          before={<RadioButton value="month" />}
          title="Месяц"
        />
        <CellSimple
          as="label"
          before={<RadioButton value="quarter" />}
          title="Квартал"
        />
        <CellSimple
          as="label"
          before={<RadioButton value="year" />}
          title="Год"
        />
      </RadioGroup>
    );
  }
};

// ─── Compact ──────────────────────────────────────────────────────────────────

export const Compact: Story = {
  name: 'Compact',
  render: (args) => {
    const [value, setValue] = useState('android');

    return (
      <RadioGroup
        {...args}
        name="compact-demo"
        value={value}
        onValueChange={setValue}
        compact
      >
        <CellSimple
          as="label"
          before={<RadioButton value="ios" />}
          title="iOS"
          subtitle="Apple"
        />
        <CellSimple
          as="label"
          before={<RadioButton value="android" />}
          title="Android"
          subtitle="Google"
        />
        <CellSimple
          as="label"
          before={<RadioButton value="web" />}
          title="Web"
        />
        <CellSimple
          as="label"
          before={<RadioButton value="other" disabled />}
          title="Other (unavailable)"
        />
      </RadioGroup>
    );
  }
};
