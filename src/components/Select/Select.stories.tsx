import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { Select } from './Select';
import { type SelectOption, type SelectProps } from './types';

const banks: SelectOption[] = [
  { value: 'sber', label: 'Сбер', hint: 'Без комиссии' },
  { value: 'tbank', label: 'Т-Банк' },
  { value: 'alfa', label: 'Альфа-Банк' },
  { value: 'vtb', label: 'ВТБ', disabled: true, hint: 'Недоступен' },
  { value: 'gazprom', label: 'Газпромбанк' },
  { value: 'raif', label: 'Райффайзенбанк' }
];

const meta = {
  title: 'Common/Select',
  component: Select,
  argTypes: {
    ...hideArgsControl(['innerClassNames', 'customDropdownMenu', 'selectedOptions', 'options']),
    mode: { options: ['default', 'contrast'], control: { type: 'inline-radio' } },
    size: { options: ['large', 'medium'], control: { type: 'inline-radio' } }
  },
  args: {
    options: banks,
    placeholder: 'Выберите банк',
    'aria-label': 'Банк',
    mode: 'default',
    size: 'large',
    searchable: false,
    withClearButton: false,
    disabled: false,
    loading: false
  },
  decorators: [
    (Story) => (
      <div style={{ width: 343, padding: 16 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<SelectProps>;

export default meta;
type Story = StoryObj<SelectProps>;

export const Playground: Story = {};

export const Searchable: Story = {
  name: 'С поиском',
  args: {
    searchable: true,
    withClearButton: true,
    hint: 'Начните вводить название банка'
  }
};

export const Multiple: Story = {
  name: 'Множественный выбор',
  render: () => {
    const [value, setValue] = useState<string[]>(['sber', 'alfa']);

    return (
      <Select
        options={banks}
        multiple
        value={value}
        onValueChange={setValue}
        placeholder="Выберите банки"
        aria-label="Банки"
        withClearButton
      />
    );
  }
};
