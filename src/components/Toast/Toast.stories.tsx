import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef } from 'react';

import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { Button } from '../Button';
import {
  Toast,
  type ToastAppearance,
  type ToastProps,
  ToastProvider,
  useToast
} from './Toast';

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  args: {
    appearance: 'neutral',
    message: 'Изменения сохранены',
    description: 'Можно продолжать работу.',
    dismissible: true
  },
  argTypes: {
    ...hideArgsControl(['onClose'])
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<ToastProps>;

export default meta;
type Story = StoryObj<ToastProps>;

export const Preview: Story = {};

const DemoButtons = (): JSX.Element => {
  const { show, clear } = useToast();
  const counterRef = useRef(0);

  const openToast = (appearance: ToastAppearance): void => {
    counterRef.current += 1;

    show({
      appearance,
      message: `Операция #${counterRef.current}`,
      description: 'Синхронизация завершена',
      action: {
        label: 'Отменить',
        onClick: () => {},
        autoClose: true
      }
    });
  };

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button
        size="small"
        onClick={() => {
          openToast('neutral');
        }}
      >
        Neutral
      </Button>
      <Button
        size="small"
        onClick={() => {
          openToast('themed');
        }}
      >
        Themed
      </Button>
      <Button
        size="small"
        mode="secondary"
        onClick={() => {
          openToast('positive');
        }}
      >
        Positive
      </Button>
      <Button
        size="small"
        appearance="negative"
        onClick={() => {
          openToast('negative');
        }}
      >
        Negative
      </Button>
      <Button size="small" mode="secondary" onClick={clear}>
        Clear
      </Button>
    </div>
  );
};

export const WithProvider: Story = {
  render: () => (
    <ToastProvider>
      <DemoButtons />
    </ToastProvider>
  )
};
