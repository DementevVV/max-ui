import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { Button } from '../Button';
import { CellList } from '../CellList';
import { CellSimple } from '../CellSimple';
import { BottomSheet, type BottomSheetProps } from './BottomSheet';

const meta = {
  title: 'Common/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Нижняя шторка. Модальный диалог: фокус переходит в шторку и не выходит из неё по Tab, после закрытия возвращается на кнопку, которая её открыла. Закрывается кликом по оверлею, клавишей Escape, ручкой (в том числе с клавиатуры) или перетаскиванием ручки вниз.'
      }
    }
  },
  argTypes: {
    ...hideArgsControl(['children', 'onClose', 'open', 'innerClassNames', 'portalContainer'])
  },
  args: {
    title: 'Выберите банк',
    enableDrag: true
  },
  decorators: [
    (Story, context) => {
      const [open, setOpen] = useState(false);

      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400, padding: 24 }}>
          <Button
            variant="secondary"
            size="small"
            onClick={() => { setOpen(true); }}
          >
            Открыть шторку
          </Button>
          <Story
            args={{
              ...context.args,
              open,
              onClose: () => { setOpen(false); }
            }}
          />
        </div>
      );
    }
  ]
} satisfies Meta<BottomSheetProps>;

export default meta;
type Story = StoryObj<BottomSheetProps>;

export const Playground: Story = {
  render: (args) => (
    <BottomSheet {...args}>
      <CellList filled>
        {['Сбер', 'Т-Банк', 'Альфа-Банк'].map((bank) => (
          <CellSimple
            key={bank}
            title={bank}
            showChevron
            onClick={args.onClose}
          />
        ))}
      </CellList>
      <Button
        variant="secondary"
        size="medium"
        stretched
        onClick={args.onClose}
      >
        Отмена
      </Button>
    </BottomSheet>
  )
};
