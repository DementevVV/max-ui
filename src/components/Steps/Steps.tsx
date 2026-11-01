import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import styles from './Steps.module.scss';

export interface StepsProps extends ComponentProps<'div'> {
  /** Количество шагов */
  count: number
  /** Сколько шагов пройдено (0…count) */
  progress: number
}

export const Steps = forwardRef<HTMLDivElement, StepsProps>((props, ref) => {
  const { className, count, progress, ...rest } = props;

  const total = Math.max(0, Math.floor(count));
  const done = Math.min(Math.max(0, Math.floor(progress)), total);

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={done}
      aria-valuetext={`Шаг ${done} из ${total}`}
      className={clsx(styles.Steps, className)}
      {...rest}
    >
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={clsx(styles.Steps__step, {
            [styles.Steps__step_active]: i < done
          })}
        />
      ))}
    </div>
  );
});

Steps.displayName = 'Steps';
