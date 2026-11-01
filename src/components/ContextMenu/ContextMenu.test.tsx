import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { renderWithMaxUI } from '../../test/render';
import { Button } from '../Button';
import { ContextMenu } from './ContextMenu';
import { type ContextMenuItem, type ContextMenuProps } from './types';

const setup = (props: Partial<ContextMenuProps> = {}) => {
  const onCopy = vi.fn();
  const onDelete = vi.fn();
  const onPdf = vi.fn();

  const items: ContextMenuItem[] = [
    { id: 'copy', label: 'Копировать', onClick: onCopy },
    { id: 'pin', label: 'Закрепить', disabled: true },
    {
      id: 'export',
      label: 'Экспорт',
      items: [
        { id: 'pdf', label: 'PDF', onClick: onPdf },
        { id: 'csv', label: 'CSV' }
      ]
    },
    { id: 'delete', label: 'Удалить', mode: 'destructive', divider: true, onClick: onDelete }
  ];

  renderWithMaxUI(
    <ContextMenu items={items} {...props}>
      <Button>Действия</Button>
    </ContextMenu>
  );

  return { onCopy, onDelete, onPdf };
};

const openMenu = async (user = userEvent.setup()) => {
  await user.click(screen.getByRole('button', { name: 'Действия' }));
  return user;
};

describe('ContextMenu', () => {
  it('открывается кликом и показывает пункты меню', async () => {
    setup();
    await openMenu();

    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem').map((item) => item.textContent)).toEqual([
      'Копировать', 'Закрепить', 'Экспорт', 'Удалить'
    ]);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('клик по пункту вызывает onClick и закрывает меню', async () => {
    const { onCopy } = setup();
    const user = await openMenu();

    await user.click(screen.getByRole('menuitem', { name: 'Копировать' }));

    expect(onCopy).toHaveBeenCalledTimes(1);
    await waitFor(() => { expect(screen.queryByRole('menu')).not.toBeInTheDocument(); });
  });

  it('неактивный пункт не срабатывает', async () => {
    setup();
    const user = await openMenu();

    const pin = screen.getByRole('menuitem', { name: 'Закрепить' });
    await user.click(pin);

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('Escape закрывает меню', async () => {
    setup();
    const user = await openMenu();

    await user.keyboard('{Escape}');

    await waitFor(() => { expect(screen.queryByRole('menu')).not.toBeInTheDocument(); });
  });

  it('стрелки двигают фокус по пунктам, пропуская неактивные', async () => {
    setup();
    const user = await openMenu();

    await user.keyboard('{ArrowDown}');
    await waitFor(() => { expect(screen.getByRole('menuitem', { name: 'Копировать' })).toHaveFocus(); });

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Экспорт' })).toHaveFocus();
  });

  it('mobile: вложенное меню раскрывается аккордеоном внутри основного', async () => {
    const { onPdf } = setup({ mode: 'mobile' });
    const user = await openMenu();

    const exportItem = screen.getByRole('menuitem', { name: 'Экспорт' });
    expect(exportItem).toHaveAttribute('aria-haspopup', 'menu');
    expect(exportItem).toHaveAttribute('aria-expanded', 'false');

    await user.click(exportItem);
    expect(exportItem).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('menuitem', { name: 'PDF' }));
    expect(onPdf).toHaveBeenCalledTimes(1);
  });

  it('desktop: подменю открывается стрелкой вправо', async () => {
    setup({ mode: 'desktop' });
    const user = await openMenu();

    await user.keyboard('{ArrowDown}{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Экспорт' })).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    await waitFor(() => { expect(screen.getAllByRole('menu')).toHaveLength(2); });
    expect(screen.getByRole('menuitem', { name: 'PDF' })).toBeInTheDocument();
  });

  it('панель в портале получает классы темы MaxUI', async () => {
    setup();
    await openMenu();

    const menu = screen.getByRole('menu');
    expect(menu.closest('[class*="MaxUI_colorScheme_light"]')).not.toBeNull();
  });
});
