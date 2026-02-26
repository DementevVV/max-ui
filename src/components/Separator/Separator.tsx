import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import styles from './Separator.module.scss';

export type SeparatorOrientation = 'horizontal' | 'vertical';
export type SeparatorSpacing = 'none' | 'small' | 'medium' | 'large';

export interface SeparatorProps extends ComponentProps<'hr'> {
  /** Направление разделителя */
  orientation?: SeparatorOrientation;
  /** Отступы вокруг разделителя */
  spacing?: SeparatorSpacing;
  /** Отступ слева/сверху (горизонтальный отступ начала линии) */
  padStart?: boolean;
}

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(
  (props, forwardedRef) => {
    const {
      className,
      orientation = 'horizontal',
      spacing = 'none',
      padStart = false,
      ...rest
    } = props;

    const rootClassName = clsx(
      styles.Separator,
      styles[`Separator_orientation_${orientation}`],
      styles[`Separator_spacing_${spacing}`],
      { [styles.Separator_padStart]: padStart },
      className
    );

    return (
      <hr
        ref={forwardedRef}
        aria-orientation={orientation}
        className={rootClassName}
        {...rest}
      />
    );
  }
);

Separator.displayName = 'Separator';
