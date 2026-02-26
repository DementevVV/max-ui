import { clsx } from 'clsx';
import {
  type ComponentProps,
  createContext,
  forwardRef,
  type ReactNode,
  useContext
} from 'react';

import { usePlatform } from '../../hooks';
import { type InnerClassNamesProp } from '../../types';
import radioButtonStyles from './RadioButton.module.scss';
import radioGroupStyles from './RadioGroup.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export type RadioButtonSize = 'small' | 'medium';
export type RadioButtonAppearance =
  | 'themed'
  | 'neutral'
  | 'contrast-pinned'
  | 'neutral-fade'
  | 'accent-red'
  | 'inherit';
export type RadioButtonInnerElementKey = 'ring';

export type RadioGroupDirection = 'horizontal' | 'vertical';
export type RadioGroupHorizontalOverflow = 'wrap' | 'scroll';

// ─── RadioGroup Context ───────────────────────────────────────────────────────

interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  appearance?: RadioButtonAppearance;
  size?: RadioButtonSize;
  compact?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export interface RadioGroupProps extends Omit<
ComponentProps<'div'>,
'onChange'
> {
  /** Имя для всех radio внутри группы (атрибут name у input) */
  name?: string;
  /** Controlled: текущее выбранное значение */
  value?: string;
  /** Controlled: callback при выборе значения */
  onValueChange?: (value: string) => void;
  /** Направление раскладки */
  direction?: RadioGroupDirection;
  /** Заблокировать всю группу */
  disabled?: boolean;
  /** Внешний вид всех RadioButton внутри (можно переопределить на каждом) */
  appearance?: RadioButtonAppearance;
  /** Размер всех RadioButton внутри (можно переопределить на каждом) */
  size?: RadioButtonSize;
  /** Компактный режим: меньшие отступы, размер кнопок small */
  compact?: boolean;
  /** Поведение при переполнении горизонтального ряда (только direction="horizontal") */
  horizontalOverflow?: RadioGroupHorizontalOverflow;
  children?: ReactNode;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (props, forwardedRef) => {
    const {
      className,
      name,
      value,
      onValueChange,
      direction = 'vertical',
      disabled,
      appearance,
      size,
      compact = false,
      horizontalOverflow = 'wrap',
      children,
      ...rest
    } = props;

    const rootClassName = clsx(
      radioGroupStyles.RadioGroup,
      radioGroupStyles[`RadioGroup_direction_${direction}`],
      direction === 'horizontal' &&
        radioGroupStyles[`RadioGroup_horizontal_${horizontalOverflow}`],
      { [radioGroupStyles.RadioGroup_compact]: compact },
      className
    );

    return (
      <RadioGroupContext.Provider
        value={{
          name,
          value,
          onValueChange,
          disabled,
          appearance,
          size,
          compact
        }}
      >
        <div
          ref={forwardedRef}
          role="radiogroup"
          className={rootClassName}
          {...rest}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

// ─── RadioButton ─────────────────────────────────────────────────────────────

export interface RadioButtonProps extends Omit<
ComponentProps<'input'>,
'size' | 'type'
> {
  size?: RadioButtonSize;
  appearance?: RadioButtonAppearance;
  innerClassNames?: InnerClassNamesProp<RadioButtonInnerElementKey>;
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (props, forwardedRef) => {
    const ctx = useContext(RadioGroupContext);

    const {
      className,
      size = ctx?.size ?? (ctx?.compact === true ? 'small' : 'medium'),
      appearance = ctx?.appearance ?? 'themed',
      disabled = ctx?.disabled ?? false,
      innerClassNames,
      value,
      checked,
      onChange,
      name,
      ...rest
    } = props;

    const platform = usePlatform();

    // Controlled by RadioGroup: checked = (groupValue === thisValue)
    const groupControlled = ctx?.value !== undefined;
    const controlledChecked = groupControlled ? ctx.value === value : undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      onChange?.(e);
      if (groupControlled && value !== undefined) {
        ctx?.onValueChange?.(String(value));
      }
    };

    const rootClassName = clsx(
      radioButtonStyles.RadioButton,
      radioButtonStyles[`RadioButton_size_${size}`],
      radioButtonStyles[`RadioButton_appearance_${appearance}`],
      radioButtonStyles[`RadioButton_platform_${platform}`],
      { [radioButtonStyles.RadioButton_disabled]: disabled },
      className
    );

    return (
      <span className={rootClassName}>
        <input
          ref={forwardedRef}
          type="radio"
          name={name ?? ctx?.name}
          value={value}
          disabled={disabled}
          className={radioButtonStyles.RadioButton__input}
          onChange={handleChange}
          {...(controlledChecked !== undefined
            ? { checked: controlledChecked }
            : { checked })}
          {...rest}
        />
        <span
          className={clsx(
            radioButtonStyles.RadioButton__ring,
            innerClassNames?.ring
          )}
        >
          <span className={radioButtonStyles.RadioButton__dot} />
        </span>
      </span>
    );
  }
);

RadioButton.displayName = 'RadioButton';
