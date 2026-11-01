import {
  type KeyboardEvent,
  type MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';

// Внутренний хук модальных окон (BottomSheet, Dialog). Не экспортируется из пакета.

export type ModalStatus = 'closed' | 'open' | 'exiting';

export interface UseModalDialogOptions {
  open: boolean
  onClose: () => void
  /** Куда рендерить окно. undefined — корень MaxUI (или body, если его нет) */
  portalContainer?: HTMLElement | null
  /**
   * Страховка размонтирования: если событие конца анимации выхода не придёт
   * (prefers-reduced-motion, вкладка в фоне), окно закроется по таймеру
   */
  exitFallbackMs?: number
}

export interface UseModalDialogResult {
  status: ModalStatus
  /** Окно в DOM и контейнер портала определён */
  isMounted: boolean
  container: HTMLElement | null
  /** Ref якоря в месте рендера (по нему ищется корень MaxUI) */
  hostRef: MutableRefObject<HTMLSpanElement | null>
  /** Ref элемента с role="dialog": на него ставится фокус и внутри него держится Tab */
  dialogRef: MutableRefObject<HTMLDivElement | null>
  setStatus: (status: ModalStatus) => void
  /** Завершить анимацию выхода (вызывать из transitionend/animationend) */
  finishExit: () => void
  /** Держит фокус внутри окна при Tab / Shift+Tab */
  handleFocusTrapKeyDown: (event: KeyboardEvent<HTMLElement>) => void
  /** Актуальный onClose (без пересоздания обработчиков) */
  closeRef: MutableRefObject<() => void>
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(',');

const getFocusable = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    .filter((el) => !el.hasAttribute('hidden') && el.getAttribute('aria-hidden') !== 'true');

export const useModalDialog = (options: UseModalDialogOptions): UseModalDialogResult => {
  const { open, onClose, portalContainer, exitFallbackMs = 400 } = options;

  const [status, setStatus] = useState<ModalStatus>(open ? 'open' : 'closed');
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const hostRef = useRef<HTMLSpanElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    setStatus((prev) => {
      if (open) return 'open';
      return prev === 'closed' ? 'closed' : 'exiting';
    });
  }, [open]);

  useLayoutEffect(() => {
    if (portalContainer !== undefined) {
      setContainer(portalContainer);
      return;
    }
    const maxUiRoot = hostRef.current?.closest<HTMLElement>('[data-maxui-root="true"]');
    setContainer(maxUiRoot ?? document.body);
  }, [portalContainer]);

  const finishExit = useCallback((): void => {
    setStatus((prev) => (prev === 'exiting' ? 'closed' : prev));
  }, []);

  useEffect(() => {
    if (status !== 'exiting') return;
    const timer = window.setTimeout(finishExit, exitFallbackMs);
    return () => { window.clearTimeout(timer); };
  }, [status, exitFallbackMs, finishExit]);

  // Блокируем прокрутку фона, пока окно в DOM
  useEffect(() => {
    if (status === 'closed') return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [status]);

  useEffect(() => {
    if (status === 'closed') return;
    const handleKeyDown = (event: globalThis.KeyboardEvent): void => {
      if (event.key === 'Escape') closeRef.current();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [status]);

  // Фокус: при открытии — в окно, при закрытии — обратно на элемент, который его открыл
  const isMounted = status !== 'closed' && container !== null;
  useEffect(() => {
    if (!isMounted) return;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialogRef.current?.focus({ preventScroll: true });

    return () => {
      const target = returnFocusRef.current;
      returnFocusRef.current = null;
      if (target?.isConnected) target.focus({ preventScroll: true });
    };
  }, [isMounted]);

  const handleFocusTrapKeyDown = useCallback((event: KeyboardEvent<HTMLElement>): void => {
    if (event.key !== 'Tab') return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = getFocusable(dialog);
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || active === dialog)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  return {
    status,
    isMounted,
    container,
    hostRef,
    dialogRef,
    setStatus,
    finishExit,
    handleFocusTrapKeyDown,
    closeRef
  };
};
