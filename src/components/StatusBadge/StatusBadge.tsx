import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { Typography } from '../Typography';
import styles from './StatusBadge.module.scss';

export type StatusBadgeStatus = 'positive' | 'negative' | 'neutral' | 'warning';

export interface StatusBadgeProps extends Omit<ComponentProps<'span'>, 'children' | 'color'> {
  text: string
  status?: StatusBadgeStatus
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>((props, ref) => {
  const { className, text, status = 'neutral', ...rest } = props;

  return (
    <Typography.Text
      ref={ref}
      variant="detail"
      className={clsx(styles.label, styles[status], className)}
      {...rest}
    >
      {text}
    </Typography.Text>
  );
});

StatusBadge.displayName = 'StatusBadge';
