import { clsx } from 'clsx';
import {
  type ComponentProps,
  createContext,
  forwardRef,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';

import { hasReactNode } from '../../helpers';
import { usePlatform } from '../../hooks';
import { Icon16CloseIos, Icon20CloseFilled } from '../../icons';
import { type InnerClassNamesProp } from '../../types';
import styles from './Toast.module.scss';

export type ToastAppearance =
  | 'themed'
  | 'neutral'
  | 'positive'
  | 'negative'
  | 'contrast-static';

export type ToastInnerElementKey =
  | 'content'
  | 'message'
  | 'description'
  | 'action'
  | 'close';

export interface ToastAction {
  label: ReactNode;
  onClick?: () => void;
  autoClose?: boolean;
}

export interface ToastProps extends ComponentProps<'div'> {
  message: ReactNode;
  description?: ReactNode;
  appearance?: ToastAppearance;
  action?: ToastAction;
  dismissible?: boolean;
  onClose?: () => void;
  closeButtonLabel?: string;
  innerClassNames?: InnerClassNamesProp<ToastInnerElementKey>;
}

export interface ToastOptions {
  id?: string;
  message: ReactNode;
  description?: ReactNode;
  appearance?: ToastAppearance;
  action?: ToastAction;
  dismissible?: boolean;
  className?: string;
  closeButtonLabel?: string;
  innerClassNames?: InnerClassNamesProp<ToastInnerElementKey>;
  duration?: number;
}

interface ToastRecord extends ToastOptions {
  id: string;
}

interface ToastContextInterface {
  show: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}

const noop = (): void => {};

const ToastContext = createContext<ToastContextInterface>({
  show: () => '',
  dismiss: noop,
  clear: noop
});

export const useToast = (): ToastContextInterface => useContext(ToastContext);

export interface ToastProviderProps {
  children: ReactNode;
  maxVisible?: number;
  defaultDuration?: number;
  portalContainer?: HTMLElement | null;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>((props, ref) => {
  const {
    className,
    message,
    description,
    appearance = 'neutral',
    action,
    dismissible = true,
    onClose,
    closeButtonLabel = 'Закрыть уведомление',
    innerClassNames,
    ...rest
  } = props;

  const isErrorToast = appearance === 'negative';

  const platform = usePlatform();

  return (
    <div
      ref={ref}
      role={isErrorToast ? 'alert' : 'status'}
      aria-live={isErrorToast ? 'assertive' : 'polite'}
      aria-atomic="true"
      className={clsx(
        styles.Toast,
        styles[`Toast_appearance_${appearance}`],
        className
      )}
      {...rest}
    >
      <div className={clsx(styles.Toast__content, innerClassNames?.content)}>
        <div className={clsx(styles.Toast__message, innerClassNames?.message)}>
          {message}
        </div>

        {hasReactNode(description) && (
          <div
            className={clsx(
              styles.Toast__description,
              innerClassNames?.description
            )}
          >
            {description}
          </div>
        )}
      </div>

      {hasReactNode(action?.label) && (
        <button
          type="button"
          className={clsx(styles.Toast__action, innerClassNames?.action)}
          onClick={action?.onClick}
        >
          {action?.label}
        </button>
      )}

      {dismissible && (
        <button
          type="button"
          aria-label={closeButtonLabel}
          className={clsx(styles.Toast__close, innerClassNames?.close)}
          onClick={onClose}
        >
          {platform === 'ios' ? <Icon16CloseIos /> : <Icon20CloseFilled />}
        </button>
      )}
    </div>
  );
});

Toast.displayName = 'Toast';

export const ToastProvider = (props: ToastProviderProps): JSX.Element => {
  const {
    children,
    maxVisible = 3,
    defaultDuration = 3000,
    portalContainer
  } = props;
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const [resolvedPortalContainer, setResolvedPortalContainer] =
    useState<HTMLElement | null>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<
  Record<string, ReturnType<typeof setTimeout> | undefined>
  >({});
  const counterRef = useRef(0);

  const clearTimer = (id: string): void => {
    const timer = timersRef.current[id];
    if (timer !== undefined) {
      clearTimeout(timer);
      timersRef.current[id] = undefined;
    }
  };

  const dismiss = useCallback((id: string): void => {
    clearTimer(id);

    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clear = useCallback((): void => {
    Object.values(timersRef.current).forEach((timer) => {
      clearTimeout(timer);
    });
    timersRef.current = {};
    setToasts([]);
  }, []);

  const show = useCallback(
    (options: ToastOptions): string => {
      counterRef.current += 1;
      const id = options.id ?? `toast-${Date.now()}-${counterRef.current}`;
      const duration = options.duration ?? defaultDuration;

      const nextToast: ToastRecord = {
        ...options,
        id
      };

      setToasts((prev) => {
        const next = [...prev.filter((toast) => toast.id !== id), nextToast];

        if (next.length <= maxVisible) {
          return next;
        }

        const removed = next.slice(0, next.length - maxVisible);

        removed.forEach((toast) => {
          clearTimer(toast.id);
        });

        return next.slice(-maxVisible);
      });

      if (duration > 0) {
        const existingTimer = timersRef.current[id];
        if (existingTimer) {
          clearTimeout(existingTimer);
        }

        timersRef.current[id] = setTimeout(() => {
          dismiss(id);
        }, duration);
      }

      return id;
    },
    [defaultDuration, dismiss, maxVisible]
  );

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((timer) => {
        clearTimeout(timer);
      });
      timersRef.current = {};
    };
  }, []);

  const contextValue = useMemo<ToastContextInterface>(
    () => ({
      show,
      dismiss,
      clear
    }),
    [show, dismiss, clear]
  );

  const canUseDOM = typeof document !== 'undefined';

  useEffect(() => {
    if (!canUseDOM) {
      return;
    }

    if (portalContainer !== undefined && portalContainer !== null) {
      setResolvedPortalContainer(portalContainer);
      return;
    }

    const maxUiRoot = hostRef.current?.closest(
      '[data-maxui-root="true"]'
    ) as HTMLElement | null;

    setResolvedPortalContainer(maxUiRoot ?? document.body);
  }, [canUseDOM, portalContainer]);

  return (
    <ToastContext.Provider value={contextValue}>
      <div ref={hostRef} style={{ display: 'contents' }}>
        {children}
      </div>

      {canUseDOM &&
        resolvedPortalContainer !== null &&
        createPortal(
          <div
            className={styles.ToastViewport}
            aria-live="polite"
            aria-atomic="true"
          >
            {toasts.map((toast) => {
              const handleClose = (): void => {
                dismiss(toast.id);
              };

              const handleAction = (): void => {
                toast.action?.onClick?.();
                if (toast.action?.autoClose !== false) {
                  dismiss(toast.id);
                }
              };

              return (
                <Toast
                  key={toast.id}
                  message={toast.message}
                  description={toast.description}
                  appearance={toast.appearance}
                  dismissible={toast.dismissible}
                  className={toast.className}
                  closeButtonLabel={toast.closeButtonLabel}
                  innerClassNames={toast.innerClassNames}
                  action={
                    toast.action
                      ? {
                        ...toast.action,
                        onClick: handleAction
                      }
                      : undefined
                  }
                  onClose={handleClose}
                />
              );
            })}
          </div>,
          resolvedPortalContainer
        )}
    </ToastContext.Provider>
  );
};
