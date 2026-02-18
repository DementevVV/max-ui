import type { Meta, StoryObj } from '@storybook/react-vite';

import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { Dropdown, type DropdownProps } from './Dropdown';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true }
];

const meta = {
  title: 'Forms/Dropdown',
  component: Dropdown,
  argTypes: {
    ...hideArgsControl(['innerClassNames', 'children'])
  },
  args: {
    mode: 'secondary',
    compact: false,
    disabled: false,
    placeholder: 'Выберите сервис',
    defaultValue: ''
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<DropdownProps>;

export default meta;
type Story = StoryObj<DropdownProps>;

export const Playground: Story = {
  render: (args) => <Dropdown {...args} options={options} />
};
