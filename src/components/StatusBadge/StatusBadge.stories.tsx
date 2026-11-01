import type { Meta, StoryObj } from '@storybook/react-vite';

import { StatusBadge, type StatusBadgeProps } from './StatusBadge';

const meta = {
  title: 'Common/StatusBadge',
  component: StatusBadge,
  argTypes: {
    status: { options: ['neutral', 'positive', 'warning', 'negative'], control: { type: 'inline-radio' } }
  },
  args: {
    text: 'Оплачено',
    status: 'positive'
  }
} satisfies Meta<StatusBadgeProps>;

export default meta;
type Story = StoryObj<StatusBadgeProps>;

export const Playground: Story = {};

export const AllStatuses: Story = {
  name: 'Все статусы',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <StatusBadge text="Черновик" status="neutral" />
      <StatusBadge text="Оплачено" status="positive" />
      <StatusBadge text="Ожидает" status="warning" />
      <StatusBadge text="Отклонено" status="negative" />
    </div>
  )
};
