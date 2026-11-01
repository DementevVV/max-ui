import type { Meta, StoryObj } from '@storybook/react-vite';

import Icon20Placeholder from '../../../.storybook/assets/icons/icon-20-placeholder.svg';
import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { Button } from '../Button';
import { ContextMenu } from './ContextMenu';
import { type ContextMenuItem, type ContextMenuProps } from './types';

const items: ContextMenuItem[] = [
  { id: 'reply', label: 'Ответить', before: <Icon20Placeholder /> },
  { id: 'copy', label: 'Копировать', before: <Icon20Placeholder />, hint: '⌘C' },
  { id: 'pin', label: 'Закрепить', before: <Icon20Placeholder />, disabled: true },
  {
    id: 'forward',
    label: 'Переслать',
    before: <Icon20Placeholder />,
    items: [
      { id: 'chat', label: 'В чат' },
      { id: 'channel', label: 'В канал' }
    ]
  },
  { id: 'delete', label: 'Удалить', before: <Icon20Placeholder />, mode: 'destructive', divider: true }
];

const meta = {
  title: 'Common/ContextMenu',
  component: ContextMenu,
  argTypes: {
    ...hideArgsControl(['items', 'actionBar', 'children', 'innerClassNames', 'open', 'defaultOpen', 'onOpenChange']),
    mode: { options: ['auto', 'desktop', 'mobile'], control: { type: 'inline-radio' } }
  },
  args: {
    items,
    mode: 'auto',
    children: null
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 360, padding: 24 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<ContextMenuProps>;

export default meta;
type Story = StoryObj<ContextMenuProps>;

export const Playground: Story = {
  render: (args) => (
    <ContextMenu {...args}>
      <Button variant="secondary" size="small">Действия</Button>
    </ContextMenu>
  )
};

export const WithActionBar: Story = {
  name: 'С панелью действий',
  render: (args) => (
    <ContextMenu
      {...args}
      actionBar={[
        { id: 'like', icon: <Icon20Placeholder />, label: 'Нравится' },
        { id: 'share', icon: <Icon20Placeholder />, label: 'Поделиться' },
        { id: 'save', icon: <Icon20Placeholder />, label: 'Сохранить' }
      ]}
    >
      <Button variant="secondary" size="small">Действия</Button>
    </ContextMenu>
  )
};
