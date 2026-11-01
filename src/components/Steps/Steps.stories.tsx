import type { Meta, StoryObj } from '@storybook/react-vite';

import { Steps, type StepsProps } from './Steps';

const meta = {
  title: 'Common/Steps',
  component: Steps,
  argTypes: {
    count: { control: { type: 'range', min: 1, max: 10, step: 1 } },
    progress: { control: { type: 'range', min: 0, max: 10, step: 1 } }
  },
  args: {
    count: 4,
    progress: 2,
    'aria-label': 'Шаги регистрации'
  }
} satisfies Meta<StepsProps>;

export default meta;
type Story = StoryObj<StepsProps>;

export const Playground: Story = {
  render: (props) => (
    <div style={{ width: 343 }}>
      <Steps {...props} />
    </div>
  )
};
