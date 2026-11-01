import { clsx } from 'clsx';
import {
  forwardRef,
  type ReactNode,
  type TransitionEvent,
  useId
} from 'react';
import { createPortal } from 'react-dom';

import { hasReactNode, mergeRefs } from '../../helpers';
import { useModalDialog } from '../../hooks/use-modal-dialog';
import { type InnerClassNamesProp } from '../../types';
import { Typography } from '../Typography';
import styles from './Dialog.module.scss';

export type DialogElementKey = 'overlay' | 'dialog' | 'title' | 'description' | 'body' | 'actions';

export interface DialogProps {
  open: boolean
  /** Закрытие по Escape, клику по оверлею (если не отключено) и из кнопок действий */
  onClose: () => void
  title?: ReactNode
  description?: ReactNode
  /** Произвольное содержимое между описанием и действиями */
  children?: ReactNode
  /** Кнопки действий: обычно `Button` с `variant` и `stretched` */
  actions?: ReactNode
  /** Раскладка кнопок: столбцом (по умолчанию, удобно на телефоне) или в строку */
  actionsLayout?: 'vertical' | 'horizontal'
  /**
   * Диалог подтверждения: `role="alertdialog"` и без закрытия по клику на оверлей —
   * пользователь должен явно выбрать действие. Escape по-прежнему закрывает
   */
  alert?: boolean
  /** Закрывать по клику на оверлей. По умолчанию `true`, для `alert` — `false` */
  closeOnOverlayClick?: boolean
  /** Доступное имя, если нет видимого заголовка */
  'aria-label'?: string
  innerClassNames?: InnerClassNamesProp<DialogElementKey>
  className?: string
  /** Куда рендерить диалог. По умолчанию — корень MaxUI (или body, если его нет) */
  portalContainer?: HTMLElement | null
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>((props, forwardedRef) => {
  const {
    open,
    onClose,
    title,
    description,
    children,
    actions,
    actionsLayout = 'vertical',
    alert = false,
    closeOnOverlayClick = !alert,
    'aria-label': ariaLabel,
    innerClassNames,
    className,
    portalContainer
  } = props;

  const titleId = useId();
  const descriptionId = useId();
  const {
    status,
    isMounted,
    container,
    hostRef,
    dialogRef,
    finishExit,
    handleFocusTrapKeyDown,
    closeRef
  } = useModalDialog({ open, onClose, portalContainer });

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>): void => {
    if (event.target !== event.currentTarget || event.propertyName !== 'opacity') return;
    finishExit();
  };

  const host = <span ref={hostRef} className={styles.host} />;

  if (!isMounted || container === null) {
    return host;
  }

  const exiting = status === 'exiting';
  const hasTitle = hasReactNode(title);
  const hasDescription = hasReactNode(description);

  return (
    <>
      {host}
      {createPortal(
        <div
          className={clsx(styles.Dialog__overlay, { [styles.Dialog__overlay_exiting]: exiting }, innerClassNames?.overlay)}
          onClick={() => {
            if (closeOnOverlayClick) closeRef.current();
          }}
        >
          <div
            ref={mergeRefs(dialogRef, forwardedRef)}
            role={alert ? 'alertdialog' : 'dialog'}
            aria-modal="true"
            aria-labelledby={hasTitle ? titleId : undefined}
            aria-label={hasTitle ? undefined : ariaLabel}
            aria-describedby={hasDescription ? descriptionId : undefined}
            tabIndex={-1}
            className={clsx(styles.Dialog, { [styles.Dialog_exiting]: exiting }, innerClassNames?.dialog, className)}
            onClick={(event) => { event.stopPropagation(); }}
            onKeyDown={handleFocusTrapKeyDown}
            onTransitionEnd={handleTransitionEnd}
          >
            {hasTitle && (
              <Typography.Text
                id={titleId}
                variant="title"
                className={clsx(styles.Dialog__title, innerClassNames?.title)}
              >
                {title}
              </Typography.Text>
            )}
            {hasDescription && (
              <Typography.Text
                id={descriptionId}
                variant="detail"
                color="secondary"
                className={clsx(styles.Dialog__description, innerClassNames?.description)}
              >
                {description}
              </Typography.Text>
            )}
            {hasReactNode(children) && (
              <div className={clsx(styles.Dialog__body, innerClassNames?.body)}>
                {children}
              </div>
            )}
            {hasReactNode(actions) && (
              <div
                className={clsx(
                  styles.Dialog__actions,
                  styles[`Dialog__actions_${actionsLayout}`],
                  innerClassNames?.actions
                )}
              >
                {actions}
              </div>
            )}
          </div>
        </div>,
        container
      )}
    </>
  );
});

Dialog.displayName = 'Dialog';
