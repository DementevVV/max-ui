import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { Icon16Chevron } from '../../icons';
import { type InnerClassNamesProp } from '../../types';
import styles from './Dropdown.module.scss';

export type DropdownMode = 'primary' | 'secondary';
export type DropdownElementKey = 'body' | 'select' | 'icon';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps extends ComponentProps<'select'> {
  mode?: DropdownMode;
  compact?: boolean;
  options?: DropdownOption[];
  placeholder?: string;
  innerClassNames?: InnerClassNamesProp<DropdownElementKey>;
}

export const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  (props, forwardedRef) => {
    const {
      className,
      mode = 'primary',
      compact = false,
      options,
      placeholder,
      children,
      innerClassNames,
      disabled,
      ...rest
    } = props;

    const rootClassName = clsx(
      styles.Dropdown,
      styles[`Dropdown_mode_${mode}`],
      {
        [styles.Dropdown_compact]: compact,
        [styles.Dropdown_disabled]: disabled
      },
      className
    );

    const hasOptions = Array.isArray(options) && options.length > 0;
    const content = hasOptions
      ? options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))
      : children;

    return (
      <label className={rootClassName}>
        <div className={clsx(styles.Dropdown__body, innerClassNames?.body)}>
          <select
            ref={forwardedRef}
            className={clsx(styles.Dropdown__select, innerClassNames?.select)}
            disabled={disabled}
            {...rest}
          >
            {placeholder !== undefined && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {content}
          </select>

          <Icon16Chevron
            className={clsx(styles.Dropdown__icon, innerClassNames?.icon)}
          />
        </div>
      </label>
    );
  }
);

Dropdown.displayName = 'Dropdown';
