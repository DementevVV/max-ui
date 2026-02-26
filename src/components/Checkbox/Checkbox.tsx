import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode, useEffect, useRef } from 'react';

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

export interface CheckboxProps extends Omit<ComponentProps<'input'>, 'size' | 'children'> {
  size?: CheckboxSize;
  appearance?: CheckboxAppearance;
  /** Неопределённое состояние (частично выбрано) */
  indeterminate?: boolean;
  innerClassNames?: InnerClassNamesProp<CheckboxInnerElementKey>;
  /** Текст метки. Когда передан — оборачивает чекбокс в <label> */
  children?: ReactNode;
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
      children,
      ...rest
    } = props;

    const platform = usePlatform();
    const innerRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const controlClassName = clsx(
      styles.Checkbox,
      styles[`Checkbox_size_${size}`],
      styles[`Checkbox_appearance_${appearance}`],
      styles[`Checkbox_platform_${platform}`],
      {
        [styles.Checkbox_disabled]: disabled,
        [styles.Checkbox_indeterminate]: indeterminate
      }
    );

    const svgIcon = (
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
    );

    const inputAndBox = (
      <>
        <input
          ref={mergeRefs(forwardedRef, innerRef)}
          type="checkbox"
          disabled={disabled}
          className={styles.Checkbox__input}
          {...rest}
        />
        <span className={styles.Checkbox__box}>{svgIcon}</span>
      </>
    );

    if (children) {
      return (
        <label
          className={clsx(
            styles.Checkbox__labelWrap,
            disabled && styles.Checkbox__labelWrap_disabled,
            className
          )}
        >
          <span className={controlClassName}>{inputAndBox}</span>
          <span className={styles.Checkbox__text}>{children}</span>
        </label>
      );
    }

    return (
      <span className={clsx(controlClassName, className)}>
        {inputAndBox}
      </span>
    );
  }
);

Checkbox.displayName = 'Checkbox';
