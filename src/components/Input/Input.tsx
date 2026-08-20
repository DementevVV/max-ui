import { clsx } from 'clsx';
import {
  type ComponentProps,
  forwardRef,
  type ReactNode
} from 'react';

import { hasReactNode } from '../../helpers';
import { type InnerClassNamesProp } from '../../types';
import { ClearableInput } from '../ClearableInput';
import styles from './Input.module.scss';

export type InputMode = 'primary' | 'secondary';
export type InputElementKey = 'container' | 'input' | 'clearButton' | 'body' | 'iconBefore' | 'iconAfter' | 'hint';

export interface InputProps extends ComponentProps<'input'> {
  mode?: InputMode
  compact?: boolean // todo здесь проп называется compact, а у Cell проп height: 'compact' | 'normal', по хорошему бы прийти к одному неймингу
  iconBefore?: ReactNode
  iconAfter?: ReactNode
  innerClassNames?: InnerClassNamesProp<InputElementKey>
  withClearButton?: boolean
  hint?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, forwardedRef) => {
  const {
    className,
    iconBefore,
    iconAfter,
    innerClassNames,
    withClearButton,
    hint,
    compact = false,
    mode = 'primary',
    ...rest
  } = props;

  const rootClassName = clsx(
    styles.Input,
    styles[`Input_mode_${mode}`],
    {
      [styles.Input_compact]: compact,
      [styles.Input_disabled]: rest.disabled
    },
    className
  );

  const field = (
    <label className={rootClassName}>
      {hasReactNode(iconBefore) && (
        <div className={clsx(styles.Input__iconBefore, innerClassNames?.iconBefore)}>
          {iconBefore}
        </div>
      )}

      <ClearableInput
        ref={forwardedRef}
        className={clsx(styles.Input__body, innerClassNames?.body)}
        withClearButton={withClearButton}
        innerClassNames={{
          input: clsx(styles.Input__input, innerClassNames?.input),
          clearButton: clsx(styles.Input__clearButton, innerClassNames?.clearButton)
        }}
        {...rest}
      />

      {hasReactNode(iconAfter) && (
        <div className={clsx(styles.Input__iconAfter, innerClassNames?.iconAfter)}>
          {iconAfter}
        </div>
      )}
    </label>
  );

  // Обёртка появляется только вместе с hint, чтобы не менять DOM существующих использований
  if (!hasReactNode(hint)) {
    return field;
  }

  return (
    <div className={clsx(innerClassNames?.container)}>
      {field}
      <div className={clsx(styles.Input__hint, innerClassNames?.hint)}>{hint}</div>
    </div>
  );
});

Input.displayName = 'Input';
