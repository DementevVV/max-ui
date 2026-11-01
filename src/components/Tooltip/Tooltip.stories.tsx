import type { Meta, StoryObj } from '@storybook/react-vite';

import { Typography } from '../Typography';
import { Tooltip, type TooltipProps } from './Tooltip';

const meta = {
  title: 'Common/Tooltip',
  component: Tooltip,
  argTypes: {
    variant: {
      options: ['ghost', 'secondary', 'secondary-contrast', 'primary'],
      control: { type: 'select' }
    }
  },
  args: {
    label: 'Комиссия',
    text: 'Комиссия банка составляет 1% от суммы перевода, но не меньше 30 ₽.',
    variant: 'ghost'
  }
} satisfies Meta<TooltipProps>;

export default meta;
type Story = StoryObj<TooltipProps>;

export const Playground: Story = {};

export const InText: Story = {
  name: 'Рядом с текстом',
  render: (props) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <Typography.Text variant="body">Комиссия: 30 ₽</Typography.Text>
      <Tooltip {...props} />
    </div>
  )
};
