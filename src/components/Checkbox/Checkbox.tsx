import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, useEffect, useRef } from 'react';

import { mergeRefs } from '../../helpers';
import { usePlatform } from '../../hooks';
import { type InnerClassNamesProp } from '../../types';
import styles from './Checkbox.module.scss';

export type CheckboxSize = 'small' | 'medium';
export type CheckboxAppearance =
  | 'themed'
  | 'neutral'
  | 'contrast-pinned'
  | 'neutral-fade'
  | 'accent-red'
  | 'inherit';
export type CheckboxInnerElementKey = 'icon';

export interface CheckboxProps extends Omit<ComponentProps<'input'>, 'size'> {
  size?: CheckboxSize;
  appearance?: CheckboxAppearance;
  /** Неопределённое состояние (частично выбрано) */
  indeterminate?: boolean;
  innerClassNames?: InnerClassNamesProp<CheckboxInnerElementKey>;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, forwardedRef) => {
    const {
      className,
      size = 'medium',
      appearance = 'themed',
      indeterminate = false,
      innerClassNames,
      disabled,
      ...rest
    } = props;

    const platform = usePlatform();
    const innerRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const rootClassName = clsx(
      styles.Checkbox,
      styles[`Checkbox_size_${size}`],
      styles[`Checkbox_appearance_${appearance}`],
      styles[`Checkbox_platform_${platform}`],
      {
        [styles.Checkbox_disabled]: disabled,
        [styles.Checkbox_indeterminate]: indeterminate
      },
      className
    );

    return (
      <span className={rootClassName}>
        <input
          ref={mergeRefs(forwardedRef, innerRef)}
          type="checkbox"
          disabled={disabled}
          className={styles.Checkbox__input}
          {...rest}
        />
        <span className={styles.Checkbox__box}>
          <svg
            className={clsx(styles.Checkbox__icon, innerClassNames?.icon)}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {indeterminate
              ? (
                <line
                  x1="4"
                  y1="8"
                  x2="12"
                  y2="8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )
              : (
                <polyline
                  points="3.5,8 6.5,11 12.5,5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
          </svg>
        </span>
      </span>
    );
  }
);

Checkbox.displayName = 'Checkbox';
