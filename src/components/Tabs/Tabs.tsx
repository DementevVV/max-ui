import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { type InnerClassNamesProp } from '../../types';
import { EllipsisText } from '../EllipsisText';
import { Tappable } from '../Tappable';
import styles from './Tabs.module.scss';

// ─── TabsItem ────────────────────────────────────────────────────────────────

export type TabsItemInnerElementKey = 'icon' | 'label' | 'badge';
export type TabsItemJustify = 'start' | 'center' | 'end';

export interface TabsItemProps extends ComponentProps<'button'> {
  /** Иконка слева (или сверху при direction=vertical) */
  icon?: ReactNode;
  /** Текстовая подпись */
  label?: ReactNode;
  /** Бейдж / счётчик (например, <Counter /> или <Dot />) */
  badge?: ReactNode;
  /** Активная вкладка */
  selected?: boolean;
  /** Выравнивание контента (иконка + текст + бейдж) внутри вкладки */
  justify?: TabsItemJustify;
  innerClassNames?: InnerClassNamesProp<TabsItemInnerElementKey>;
}

export const TabsItem = forwardRef<HTMLButtonElement, TabsItemProps>(
  (props, ref) => {
    const {
      className,
      icon,
      label,
      badge,
      selected = false,
      disabled = false,
      justify = 'center',
      innerClassNames,
      children,
      ...rest
    } = props;

    const rootClassName = clsx(
      styles.TabsItem,
      styles[`TabsItem_justify_${justify}`],
      {
        [styles.TabsItem_selected]: selected,
        [styles.TabsItem_disabled]: disabled,
        [styles.TabsItem_withIcon]: hasReactNode(icon),
        [styles.TabsItem_withLabel]:
          hasReactNode(label) || hasReactNode(children)
      },
      className
    );

    const labelContent = label ?? children;

    return (
      <Tappable
        ref={ref}
        as="button"
        role="tab"
        aria-selected={selected}
        disabled={disabled}
        className={rootClassName}
        {...rest}
      >
        {hasReactNode(icon) && (
          <span className={clsx(styles.TabsItem__icon, innerClassNames?.icon)}>
            {icon}
          </span>
        )}

        {hasReactNode(labelContent) && (
          <EllipsisText
            maxLines={1}
            className={clsx(styles.TabsItem__label, innerClassNames?.label)}
          >
            {labelContent}
          </EllipsisText>
        )}

        {hasReactNode(badge) && (
          <span
            className={clsx(styles.TabsItem__badge, innerClassNames?.badge)}
          >
            {badge}
          </span>
        )}
      </Tappable>
    );
  }
);

TabsItem.displayName = 'TabsItem';

// ─── Tabs ─────────────────────────────────────────────────────────────────────

export type TabsDirection = 'horizontal' | 'vertical';

export type TabsSize = 'small' | 'medium' | 'large';
export type TabsMode = 'default' | 'segmented';
export type TabsAlign = 'start' | 'center' | 'end' | 'stretch';
export type TabsAppearance =
  | 'themed'
  | 'contrast-pinned'
  | 'neutral-fade'
  | 'accent-red'
  | 'inherit';

export interface TabsProps extends ComponentProps<'div'> {
  /** Направление расположения вкладок */
  direction?: TabsDirection;
  /** Размер вкладок */
  size?: TabsSize;
  /** Режим отображения */
  mode?: TabsMode;
  /** Выравнивание вкладок по главной оси */
  align?: TabsAlign;
  /** Цвет индикатора и активной вкладки */
  appearance?: TabsAppearance;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {
    className,
    children,
    direction = 'horizontal',
    size = 'medium',
    mode = 'default',
    align = 'center',
    appearance = 'themed',
    ...rest
  } = props;

  const rootClassName = clsx(
    styles.Tabs,
    styles[`Tabs_direction_${direction}`],
    styles[`Tabs_size_${size}`],
    styles[`Tabs_mode_${mode}`],
    styles[`Tabs_align_${align}`],
    styles[`Tabs_appearance_${appearance}`],
    className
  );

  return (
    <div
      ref={ref}
      role="tablist"
      aria-orientation={direction === 'vertical' ? 'vertical' : 'horizontal'}
      className={rootClassName}
      {...rest}
    >
      {children}
    </div>
  );
});

Tabs.displayName = 'Tabs';
