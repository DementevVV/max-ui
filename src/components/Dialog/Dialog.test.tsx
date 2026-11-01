import { act, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { renderWithMaxUI } from '../../test/render';
import { Button } from '../Button';
import { Dialog, type DialogProps } from './Dialog';

const Demo = (props: Partial<DialogProps> & { onDelete?: () => void, onCloseSpy?: () => void }) => {
  const { onDelete, onCloseSpy, ...rest } = props;
  const [open, setOpen] = useState(false);
  const close = (): void => {
    onCloseSpy?.();
    setOpen(false);
  };

  return (
    <>
      <button type="button" onClick={() => { setOpen(true); }}>Удалить чат</button>
      <Dialog
        title="Удалить чат?"
        description="Это действие нельзя отменить."
        actions={(
          <>
            <Button
              variant="destructive"
              stretched
              onClick={() => {
                onDelete?.();
                close();
              }}
            >
              Удалить
            </Button>
            <Button
              variant="secondary"
              stretched
              onClick={close}
            >
              Отмена
            </Button>
          </>
        )}
        {...rest}
        open={open}
        onClose={close}
      />
    </>
  );
};

const openDialog = async (user = userEvent.setup()) => {
  await user.click(screen.getByRole('button', { name: 'Удалить чат' }));
  return user;
};

describe('Dialog', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('не рендерится в закрытом состоянии', () => {
    renderWithMaxUI(<Demo />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('модальный диалог: имя из заголовка, описание из description, в корне MaxUI', async () => {
    renderWithMaxUI(<Demo />);
    await openDialog();

    const dialog = screen.getByRole('dialog', { name: 'Удалить чат?' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleDescription('Это действие нельзя отменить.');
    expect(dialog.closest('[data-maxui-root="true"]')).not.toBeNull();
    expect(dialog).toHaveFocus();
  });

  it('действие вызывает обработчик и закрывает диалог', async () => {
    const onDelete = vi.fn();
    renderWithMaxUI(<Demo onDelete={onDelete} />);
    const user = await openDialog();

    await user.click(screen.getByRole('button', { name: 'Удалить' }));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('Tab не выпускает фокус за пределы диалога', async () => {
    renderWithMaxUI(<Demo />);
    const user = await openDialog();

    await user.tab();
    expect(screen.getByRole('button', { name: 'Удалить' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Отмена' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Удалить' })).toHaveFocus();
  });

  it('обычный диалог закрывается кликом по оверлею', async () => {
    const onCloseSpy = vi.fn();
    renderWithMaxUI(<Demo onCloseSpy={onCloseSpy} />);
    await openDialog();

    fireEvent.click(screen.getByRole('dialog').parentElement as HTMLElement);

    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('alert: role="alertdialog", клик по оверлею не закрывает, Escape закрывает', async () => {
    const onCloseSpy = vi.fn();
    renderWithMaxUI(<Demo alert onCloseSpy={onCloseSpy} />);
    const user = await openDialog();

    const dialog = screen.getByRole('alertdialog', { name: 'Удалить чат?' });
    fireEvent.click(dialog.parentElement as HTMLElement);
    expect(onCloseSpy).not.toHaveBeenCalled();

    await user.keyboard('{Escape}');
    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('после закрытия размонтируется даже без transitionend и возвращает фокус', () => {
    vi.useFakeTimers();
    renderWithMaxUI(<Demo />);
    const opener = screen.getByRole('button', { name: 'Удалить чат' });
    opener.focus();
    fireEvent.click(opener);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    act(() => { vi.advanceTimersByTime(500); });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  it('без заголовка использует aria-label', async () => {
    renderWithMaxUI(<Demo title={undefined} aria-label="Подтверждение" />);
    await openDialog();

    expect(screen.getByRole('dialog', { name: 'Подтверждение' })).toBeInTheDocument();
  });
});
