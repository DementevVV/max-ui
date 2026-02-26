import type { Meta, StoryObj } from '@storybook/react-vite';

import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { Icon20CloseFilled } from '../../icons';
import { InlineAlert, type InlineAlertProps } from './InlineAlert';

const meta = {
  title: 'Feedback/InlineAlert',
  component: InlineAlert,
  args: {
    appearance: 'neutral',
    heading: 'Нет соединения',
    description: 'Проверьте интернет и попробуйте снова.',
    actionLabel: 'Повторить',
    dismissible: true
  },
  argTypes: {
    appearance: {
      control: { type: 'select' },
      options: ['themed', 'neutral', 'positive', 'negative', 'contrast-static']
    },
    ...hideArgsControl(['onActionClick', 'onClose'])
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<InlineAlertProps>;

export default meta;
type Story = StoryObj<InlineAlertProps>;

export const Playground: Story = {
  render: (args) => (
    <InlineAlert
      {...args}
      onActionClick={() => {
        // story action placeholder
      }}
      onClose={() => {
        // story action placeholder
      }}
    />
  )
};

export const Themed: Story = {
  args: {
    appearance: 'themed',
    heading: 'Изменения сохранены',
    description: 'Данные обновлены и синхронизированы.'
  }
};

export const Negative: Story = {
  args: {
    appearance: 'negative',
    heading: 'Не удалось отправить',
    description: 'Сервер временно недоступен.'
  }
};

export const Positive: Story = {
  args: {
    appearance: 'positive',
    heading: 'Успешно',
    description: 'Изменения применены.'
  }
};

export const WithIcon: Story = {
  args: {
    heading: 'Новые условия',
    description: 'Пожалуйста, ознакомьтесь с обновлениями.',
    icon: <Icon20CloseFilled />,
    dismissible: false,
    actionLabel: undefined
  }
};
