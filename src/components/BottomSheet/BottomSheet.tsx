import { clsx } from 'clsx';
import {
  type CSSProperties,
  forwardRef,
  type ReactNode,
  type TransitionEvent,
  useId
} from 'react';
import { createPortal } from 'react-dom';

import { mergeRefs } from '../../helpers';
import { useDrag } from '../../hooks';
import { useModalDialog } from '../../hooks/use-modal-dialog';
import { type InnerClassNamesProp } from '../../types';
import { Typography } from '../Typography';
import styles from './BottomSheet.module.scss';

export type BottomSheetElementKey = 'overlay' | 'sheet' | 'handle' | 'header';

export interface BottomSheetProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  /** Доступное имя шторки, если нет видимого заголовка */
  'aria-label'?: string
  /** Минимальная высота шторки */
  minHeight?: CSSProperties['minHeight']
  innerClassNames?: InnerClassNamesProp<BottomSheetElementKey>
  /** Закрытие перетаскиванием за ручку */
  enableDrag?: boolean
  /** Куда рендерить шторку. По умолчанию — корень MaxUI (или body, если его нет) */
  portalContainer?: HTMLElement | null
}

export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>((props, forwardedRef) => {
  const {
    open,
    onClose,
    children,
    title,
    'aria-label': ariaLabel,
    minHeight = 'auto',
    innerClassNames,
    enableDrag = true,
    portalContainer
  } = props;

  const titleId = useId();
  const {
    status,
    isMounted,
    container,
    hostRef,
    dialogRef,
    setStatus,
    finishExit,
    handleFocusTrapKeyDown,
    closeRef
  } = useModalDialog({ open, onClose, portalContainer });

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>): void => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') {
      return;
    }
    finishExit();
  };

  const {
    dragging,
    dragOffset,
    suppressClickRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel
  } = useDrag({
    enabled: enableDrag && status === 'open',
    onClose: () => {
      setStatus('exiting');
      closeRef.current();
    }
  });

  const handleOverlayClick = (): void => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    closeRef.current();
  };

  const host = <span ref={hostRef} className={styles.host} />;

  if (!isMounted || container === null) {
    return host;
  }

  const exiting = status === 'exiting';
  const transform = dragging
    ? `translateY(${dragOffset}px)`
    : `translateY(${exiting ? 100 : 0}%)`;

  return (
    <>
      {host}
      {createPortal(
        <div
          className={clsx(styles.overlay, { [styles.overlayClosing]: exiting }, innerClassNames?.overlay)}
          onClick={handleOverlayClick}
        >
          <div
            ref={mergeRefs(dialogRef, forwardedRef)}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-label={title ? undefined : ariaLabel}
            tabIndex={-1}
            className={clsx(
              styles.sheet,
              innerClassNames?.sheet,
              { [styles.sheet_dragging]: dragging, [styles.sheet_exiting]: exiting }
            )}
            style={{ minHeight, transform }}
            onClick={(event) => { event.stopPropagation(); }}
            onKeyDown={handleFocusTrapKeyDown}
            onTransitionEnd={handleTransitionEnd}
          >
            {enableDrag && (
              <div
                className={clsx(styles.handle, innerClassNames?.handle)}
                role="button"
                tabIndex={0}
                aria-label="Закрыть: перетащите вниз или нажмите"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    closeRef.current();
                  }
                }}
              />
            )}
            {title && (
              <div className={clsx(styles.header, innerClassNames?.header)}>
                <Typography.Text id={titleId} variant="detail-strong">
                  {title}
                </Typography.Text>
              </div>
            )}
            <div className={styles.content}>
              {children}
            </div>
          </div>
        </div>,
        container
      )}
    </>
  );
});

BottomSheet.displayName = 'BottomSheet';
