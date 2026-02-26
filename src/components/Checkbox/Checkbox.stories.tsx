import type { Meta, StoryObj } from '@storybook/react-vite';

import { CellSimple } from '../CellSimple';
import { Checkbox, type CheckboxProps } from './Checkbox';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  args: {
    disabled: false,
    indeterminate: false,
    size: 'medium',
    appearance: 'themed'
  }
} satisfies Meta<CheckboxProps>;

export default meta;
type Story = StoryObj<CheckboxProps>;

export const Playground: Story = {
  render: (args) => <Checkbox {...args} defaultChecked={false} />
};

export const Sizes: Story = {
  name: 'Sizes',
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Checkbox {...args} size="small" defaultChecked />
      <Checkbox {...args} size="medium" defaultChecked />
    </div>
  )
};

export const Appearances: Story = {
  name: 'Appearances',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        flexWrap: 'wrap'
      }}
    >
      <Checkbox {...args} appearance="themed" defaultChecked />
      <Checkbox {...args} appearance="neutral" defaultChecked />
      <Checkbox {...args} appearance="contrast-pinned" defaultChecked />
      <Checkbox {...args} appearance="neutral-fade" defaultChecked />
      <Checkbox {...args} appearance="accent-red" defaultChecked />
      <Checkbox {...args} appearance="inherit" defaultChecked />
    </div>
  )
};

export const States: Story = {
  name: 'States',
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Checkbox {...args} />
      <Checkbox {...args} defaultChecked />
      <Checkbox {...args} indeterminate />
      <Checkbox {...args} disabled />
      <Checkbox {...args} disabled defaultChecked />
    </div>
  )
};

export const WithLabel: Story = {
  name: 'With Label',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox {...args}>Я согласен с условиями использования</Checkbox>
      <Checkbox {...args} defaultChecked>
        Получать уведомления
      </Checkbox>
      <Checkbox {...args} indeterminate>
        Выбрать все (неопределённое)
      </Checkbox>
      <Checkbox {...args} disabled>
        Недоступный вариант
      </Checkbox>
    </div>
  )
};

export const WithCell: Story = {
  name: 'Cell with Checkbox',
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    )
  ],
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <CellSimple
        as="label"
        before={<Checkbox {...args} defaultChecked />}
        title="Option one"
        subtitle="Description"
      />
      <CellSimple
        as="label"
        before={<Checkbox {...args} indeterminate />}
        title="Option two (indeterminate)"
      />
      <CellSimple
        as="label"
        before={<Checkbox {...args} disabled />}
        title="Option three (disabled)"
      />
    </div>
  )
};
