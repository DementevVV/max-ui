import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { usePlatform } from '../../hooks';
import { Icon16CloseIos, Icon20CloseAndroid } from '../../icons';
import { type InnerClassNamesProp } from '../../types';
import styles from './InlineAlert.module.scss';

export type InlineAlertAppearance =
  | 'themed'
  | 'neutral'
  | 'positive'
  | 'negative'
  | 'contrast-static';

export type InlineAlertInnerElementKey =
  | 'icon'
  | 'content'
  | 'title'
  | 'description'
  | 'action'
  | 'close';

export interface InlineAlertProps extends ComponentProps<'div'> {
  heading?: ReactNode;
  description?: ReactNode;
  actionLabel?: ReactNode;
  onActionClick?: () => void;
  dismissible?: boolean;
  onClose?: () => void;
  closeButtonLabel?: string;
  appearance?: InlineAlertAppearance;
  icon?: ReactNode;
  innerClassNames?: InnerClassNamesProp<InlineAlertInnerElementKey>;
}

export const InlineAlert = forwardRef<HTMLDivElement, InlineAlertProps>(
  (props, ref) => {
    const {
      className,
      heading,
      description,
      actionLabel,
      onActionClick,
      dismissible = false,
      onClose,
      closeButtonLabel = 'Закрыть уведомление',
      appearance = 'neutral',
      icon,
      children,
      innerClassNames,
      ...rest
    } = props;

    const platform = usePlatform();
    const bodyContent = description ?? children;

    return (
      <div
        ref={ref}
        role={appearance === 'negative' ? 'alert' : 'status'}
        aria-live={appearance === 'negative' ? 'assertive' : 'polite'}
        aria-atomic="true"
        className={clsx(
          styles.InlineAlert,
          styles[`InlineAlert_appearance_${appearance}`],
          className
        )}
        {...rest}
      >
        {hasReactNode(icon) && (
          <span
            className={clsx(styles.InlineAlert__icon, innerClassNames?.icon)}
          >
            {icon}
          </span>
        )}

        <div
          className={clsx(
            styles.InlineAlert__content,
            innerClassNames?.content
          )}
        >
          {hasReactNode(heading) && (
            <div
              className={clsx(
                styles.InlineAlert__title,
                innerClassNames?.title
              )}
            >
              {heading}
            </div>
          )}

          {hasReactNode(bodyContent) && (
            <div
              className={clsx(
                styles.InlineAlert__description,
                innerClassNames?.description
              )}
            >
              {bodyContent}
            </div>
          )}

          {hasReactNode(actionLabel) && (
            <button
              type="button"
              className={clsx(
                styles.InlineAlert__action,
                innerClassNames?.action
              )}
              onClick={onActionClick}
            >
              {actionLabel}
            </button>
          )}
        </div>

        {dismissible && (
          <button
            type="button"
            aria-label={closeButtonLabel}
            className={clsx(styles.InlineAlert__close, innerClassNames?.close)}
            onClick={onClose}
          >
            {platform === 'ios' ? <Icon16CloseIos /> : <Icon20CloseAndroid />}
          </button>
        )}
      </div>
    );
  }
);

InlineAlert.displayName = 'InlineAlert';
