import { act, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { renderWithMaxUI } from '../../test/render';
import { BottomSheet, type BottomSheetProps } from './BottomSheet';

const Demo = (props: Partial<BottomSheetProps> & { onCloseSpy?: () => void }) => {
  const { onCloseSpy, ...rest } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => { setOpen(true); }}>Открыть</button>
      <BottomSheet
        title="Выбор банка"
        {...rest}
        open={open}
        onClose={() => {
          onCloseSpy?.();
          setOpen(false);
        }}
      >
        <button type="button">Сбер</button>
        <button type="button">Т-Банк</button>
      </BottomSheet>
    </>
  );
};

// С фейковыми таймерами user-event зависает, поэтому в таких тестах — прямые события
const openSheetSync = (): void => {
  const opener = screen.getByRole('button', { name: 'Открыть' });
  opener.focus();
  fireEvent.click(opener);
};

const pressEscape = (): void => {
  fireEvent.keyDown(document, { key: 'Escape' });
};

const openSheet = async (user = userEvent.setup()) => {
  await user.click(screen.getByRole('button', { name: 'Открыть' }));
  return user;
};

describe('BottomSheet', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('не рендерится в закрытом состоянии', () => {
    renderWithMaxUI(<Demo />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('открывается модальным диалогом с именем из заголовка внутри корня MaxUI', async () => {
    renderWithMaxUI(<Demo />);
    await openSheet();

    const dialog = screen.getByRole('dialog', { name: 'Выбор банка' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog.closest('[data-maxui-root="true"]')).not.toBeNull();
  });

  it('без заголовка берёт имя из aria-label', async () => {
    renderWithMaxUI(<Demo title={undefined} aria-label="Фильтры" />);
    await openSheet();

    expect(screen.getByRole('dialog', { name: 'Фильтры' })).toBeInTheDocument();
  });

  it('переводит фокус в шторку и не выпускает его по Tab', async () => {
    renderWithMaxUI(<Demo enableDrag={false} />);
    const user = await openSheet();

    expect(screen.getByRole('dialog')).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('button', { name: 'Сбер' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Т-Банк' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Сбер' })).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Т-Банк' })).toHaveFocus();
  });

  it('Escape закрывает, шторка размонтируется даже без transitionend, фокус возвращается', async () => {
    vi.useFakeTimers();
    const onCloseSpy = vi.fn();
    renderWithMaxUI(<Demo onCloseSpy={onCloseSpy} />);
    openSheetSync();
    expect(screen.getByRole('dialog')).toHaveFocus();

    pressEscape();
    expect(onCloseSpy).toHaveBeenCalledTimes(1);

    act(() => { vi.advanceTimersByTime(500); });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Открыть' })).toHaveFocus();
  });

  it('клик по оверлею закрывает, клик внутри шторки — нет', async () => {
    const onCloseSpy = vi.fn();
    renderWithMaxUI(<Demo onCloseSpy={onCloseSpy} />);
    await openSheet();

    fireEvent.click(screen.getByRole('button', { name: 'Сбер' }));
    expect(onCloseSpy).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog').parentElement as HTMLElement);
    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('блокирует прокрутку страницы и восстанавливает её после закрытия', async () => {
    vi.useFakeTimers();
    document.body.style.overflow = 'scroll';
    renderWithMaxUI(<Demo />);
    openSheetSync();

    expect(document.body.style.overflow).toBe('hidden');

    pressEscape();
    act(() => { vi.advanceTimersByTime(500); });
    expect(document.body.style.overflow).toBe('scroll');
    document.body.style.overflow = '';
  });

  it('перетаскивание за ручку дальше порога закрывает, короткое — нет', async () => {
    const onCloseSpy = vi.fn();
    renderWithMaxUI(<Demo onCloseSpy={onCloseSpy} />);
    await openSheet();

    const handle = screen.getByRole('button', { name: /перетащите вниз/ });

    fireEvent.pointerDown(handle, { clientY: 100, pointerId: 1, button: 0, pointerType: 'touch' });
    fireEvent.pointerMove(handle, { clientY: 140, pointerId: 1, pointerType: 'touch' });
    fireEvent.pointerUp(handle, { clientY: 140, pointerId: 1, pointerType: 'touch' });
    expect(onCloseSpy).not.toHaveBeenCalled();

    fireEvent.pointerDown(handle, { clientY: 100, pointerId: 1, button: 0, pointerType: 'touch' });
    fireEvent.pointerMove(handle, { clientY: 220, pointerId: 1, pointerType: 'touch' });
    fireEvent.pointerUp(handle, { clientY: 220, pointerId: 1, pointerType: 'touch' });
    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('ручка закрывает шторку с клавиатуры', async () => {
    const onCloseSpy = vi.fn();
    renderWithMaxUI(<Demo onCloseSpy={onCloseSpy} />);
    const user = await openSheet();

    screen.getByRole('button', { name: /перетащите вниз/ }).focus();
    await user.keyboard('{Enter}');

    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });
});
