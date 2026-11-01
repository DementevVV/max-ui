import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { Button } from '../Button';
import { Input } from '../Input';
import { Dialog, type DialogProps } from './Dialog';

const meta = {
  title: 'Common/Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Модальное окно по центру экрана, например подтверждение действия. Фокус переходит в окно и не выходит из него по Tab, после закрытия возвращается на кнопку, которая его открыла. `alert` — диалог подтверждения: `role="alertdialog"`, клик по оверлею не закрывает.'
      }
    }
  },
  argTypes: {
    ...hideArgsControl(['children', 'actions', 'onClose', 'open', 'innerClassNames', 'portalContainer']),
    actionsLayout: { options: ['vertical', 'horizontal'], control: { type: 'inline-radio' } }
  },
  args: {
    title: 'Удалить чат?',
    description: 'Переписка удалится у вас. Это действие нельзя отменить.',
    alert: true,
    actionsLayout: 'vertical'
  }
} satisfies Meta<DialogProps>;

export default meta;
type Story = StoryObj<DialogProps>;

export const Confirm: Story = {
  name: 'Подтверждение',
  render: (args) => {
    const [open, setOpen] = useState(false);
    const close = (): void => { setOpen(false); };

    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <Button variant="destructive" size="small" onClick={() => { setOpen(true); }}>
          Удалить чат
        </Button>
        <Dialog
          {...args}
          open={open}
          onClose={close}
          actions={(
            <>
              <Button variant="destructive" stretched onClick={close}>Удалить</Button>
              <Button variant="secondary" stretched onClick={close}>Отмена</Button>
            </>
          )}
        />
      </div>
    );
  }
};

export const WithContent: Story = {
  name: 'С содержимым',
  args: {
    title: 'Новая папка',
    description: undefined,
    alert: false,
    actionsLayout: 'horizontal'
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const close = (): void => { setOpen(false); };

    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <Button variant="secondary" size="small" onClick={() => { setOpen(true); }}>
          Создать папку
        </Button>
        <Dialog
          {...args}
          open={open}
          onClose={close}
          actions={(
            <>
              <Button variant="secondary" stretched onClick={close}>Отмена</Button>
              <Button variant="primary" stretched onClick={close}>Создать</Button>
            </>
          )}
        >
          <Input placeholder="Название папки" />
        </Dialog>
      </div>
    );
  }
};
