import { act, fireEvent, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithMaxUI } from '../../test/render';
import { type ToastOptions, ToastProvider, type ToastProviderProps, useToast } from './Toast';

type ToastApi = ReturnType<typeof useToast>;

const setup = (providerProps: Partial<ToastProviderProps> = {}): { api: ToastApi } => {
  const ref: { api?: ToastApi } = {};

  const Capture = (): null => {
    ref.api = useToast();
    return null;
  };

  renderWithMaxUI(
    <ToastProvider {...providerProps}>
      <Capture />
    </ToastProvider>
  );

  return { api: ref.api as ToastApi };
};

const show = (api: ToastApi, options: ToastOptions): string => {
  let id = '';
  act(() => {
    id = api.show(options);
  });
  return id;
};

describe('ToastProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('показывает тост в live-регионе', () => {
    const { api } = setup();
    show(api, { message: 'Сохранено' });

    const message = screen.getByText('Сохранено');
    expect(message.closest('[aria-live="polite"]')).not.toBeNull();
  });

  it('портал монтируется в корень MaxUI', () => {
    const { api } = setup();
    show(api, { message: 'Сохранено' });

    expect(screen.getByText('Сохранено').closest('[data-maxui-root="true"]')).not.toBeNull();
  });

  it('автоматически скрывается через defaultDuration', () => {
    const { api } = setup({ defaultDuration: 1000 });
    show(api, { message: 'Сохранено' });

    act(() => { vi.advanceTimersByTime(999); });
    expect(screen.getByText('Сохранено')).toBeInTheDocument();

    act(() => { vi.advanceTimersByTime(1); });
    expect(screen.queryByText('Сохранено')).not.toBeInTheDocument();
  });

  it('duration: 0 отключает автозакрытие', () => {
    const { api } = setup({ defaultDuration: 1000 });
    show(api, { message: 'Навсегда', duration: 0 });

    act(() => { vi.advanceTimersByTime(60_000); });
    expect(screen.getByText('Навсегда')).toBeInTheDocument();
  });

  it('держит не больше maxVisible тостов, вытесняя самые старые', () => {
    const { api } = setup({ maxVisible: 2, defaultDuration: 0 });
    show(api, { message: 'Первый' });
    show(api, { message: 'Второй' });
    show(api, { message: 'Третий' });

    expect(screen.queryByText('Первый')).not.toBeInTheDocument();
    expect(screen.getByText('Второй')).toBeInTheDocument();
    expect(screen.getByText('Третий')).toBeInTheDocument();
  });

  it('повторный show с тем же id заменяет тост и перезапускает таймер', () => {
    const { api } = setup({ defaultDuration: 1000 });
    show(api, { id: 'upload', message: 'Загрузка…' });

    act(() => { vi.advanceTimersByTime(800); });
    show(api, { id: 'upload', message: 'Загружено' });

    expect(screen.queryByText('Загрузка…')).not.toBeInTheDocument();

    act(() => { vi.advanceTimersByTime(800); });
    expect(screen.getByText('Загружено')).toBeInTheDocument();

    act(() => { vi.advanceTimersByTime(200); });
    expect(screen.queryByText('Загружено')).not.toBeInTheDocument();
  });

  it('dismiss и clear убирают тосты', () => {
    const { api } = setup({ defaultDuration: 0 });
    const id = show(api, { message: 'Один' });
    show(api, { message: 'Два' });

    act(() => { api.dismiss(id); });
    expect(screen.queryByText('Один')).not.toBeInTheDocument();

    act(() => { api.clear(); });
    expect(screen.queryByText('Два')).not.toBeInTheDocument();
  });

  it('action закрывает тост по умолчанию, autoClose: false — оставляет', () => {
    const { api } = setup({ defaultDuration: 0 });
    const onUndo = vi.fn();
    const onRetry = vi.fn();
    show(api, { message: 'Удалено', action: { label: 'Отменить', onClick: onUndo } });
    show(api, { message: 'Ошибка', action: { label: 'Повторить', onClick: onRetry, autoClose: false } });

    fireEvent.click(screen.getByRole('button', { name: 'Отменить' }));
    expect(onUndo).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Удалено')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Повторить' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Ошибка')).toBeInTheDocument();
  });

  it('вытесненный тост не закрывает новый своим старым таймером', () => {
    const { api } = setup({ maxVisible: 1, defaultDuration: 1000 });
    show(api, { message: 'Старый' });

    act(() => { vi.advanceTimersByTime(900); });
    show(api, { message: 'Новый' });

    act(() => { vi.advanceTimersByTime(500); });
    expect(screen.getByText('Новый')).toBeInTheDocument();
  });
});
