import { clsx } from 'clsx';
import {
  type ComponentProps,
  createContext,
  forwardRef,
  type KeyboardEvent,
  type ReactNode,
  useContext,
  useId,
  useMemo,
  useState
} from 'react';

import { hasReactNode } from '../../helpers';
import { type InnerClassNamesProp } from '../../types';
import { EllipsisText } from '../EllipsisText';
import { Tappable } from '../Tappable';
import styles from './Tabs.module.scss';

// ─── TabsItem ────────────────────────────────────────────────────────────────

interface TabsContextInterface {
  activeValue?: string;
  onValueChange?: (value: string) => void;
  baseId: string;
  isValueMode: boolean;
  activationMode: TabsActivationMode;
}

const TabsContext = createContext<TabsContextInterface | null>(null);

const getTabValueId = (value: string): string => {
  return value.trim().replace(/\s+/g, '-').toLowerCase();
};

export type TabsItemInnerElementKey = 'icon' | 'label' | 'badge';
export type TabsItemJustify = 'start' | 'center' | 'end';

export interface TabsItemProps extends Omit<ComponentProps<'button'>, 'value'> {
  /** Значение вкладки (для value-based API) */
  value?: string;
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
    const tabsContext = useContext(TabsContext);

    const {
      className,
      value,
      icon,
      label,
      badge,
      selected = false,
      disabled = false,
      type = 'button',
      tabIndex,
      onClick,
      justify = 'center',
      innerClassNames,
      children,
      ...rest
    } = props;

    const isContextSelected =
      tabsContext?.isValueMode === true && value !== undefined
        ? tabsContext.activeValue === value
        : undefined;

    const resolvedSelected = isContextSelected ?? selected;

    const tabId =
      tabsContext?.isValueMode === true && value !== undefined
        ? `${tabsContext.baseId}-tab-${getTabValueId(value)}`
        : undefined;

    const panelId =
      tabsContext?.isValueMode === true && value !== undefined
        ? `${tabsContext.baseId}-panel-${getTabValueId(value)}`
        : undefined;

    const handleClick: TabsItemProps['onClick'] = (event) => {
      onClick?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (
        tabsContext?.isValueMode === true &&
        value !== undefined &&
        !disabled
      ) {
        tabsContext.onValueChange?.(value);
      }
    };

    const rootClassName = clsx(
      styles.TabsItem,
      styles[`TabsItem_justify_${justify}`],
      {
        [styles.TabsItem_selected]: resolvedSelected,
        [styles.TabsItem_disabled]: disabled,
        [styles.TabsItem_withIcon]: hasReactNode(icon),
        [styles.TabsItem_withLabel]:
          hasReactNode(label) || hasReactNode(children)
      },
      className
    );

    const labelContent = label ?? children;
    const resolvedTabIndex = tabIndex ?? (resolvedSelected ? 0 : -1);

    return (
      <Tappable
        ref={ref}
        as="button"
        type={type}
        role="tab"
        id={tabId}
        aria-controls={panelId}
        aria-selected={resolvedSelected}
        tabIndex={resolvedTabIndex}
        disabled={disabled}
        onClick={handleClick}
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
export type TabsActivationMode = 'manual' | 'automatic';
export type TabsAppearance =
  | 'themed'
  | 'contrast-pinned'
  | 'neutral-fade'
  | 'accent-red'
  | 'inherit';

export interface TabsProps extends ComponentProps<'div'> {
  /** Controlled: выбранное значение вкладки */
  value?: string;
  /** Uncontrolled: значение вкладки по умолчанию */
  defaultValue?: string;
  /** Callback при выборе вкладки */
  onValueChange?: (value: string) => void;
  /** Режим клавиатурной навигации */
  activationMode?: TabsActivationMode;
  /** Текстовая метка для скринридеров */
  ariaLabel?: string;
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
    value,
    defaultValue,
    onValueChange,
    activationMode = 'automatic',
    ariaLabel,
    'aria-label': ariaLabelFromProps,
    'aria-labelledby': ariaLabelledBy,
    direction = 'horizontal',
    size = 'medium',
    mode = 'default',
    align = 'center',
    appearance = 'themed',
    onKeyDown,
    ...rest
  } = props;

  const [internalValue, setInternalValue] = useState<string | undefined>(
    defaultValue
  );

  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internalValue;
  const isValueMode =
    value !== undefined ||
    defaultValue !== undefined ||
    onValueChange !== undefined;
  const baseId = useId();

  const handleValueChange = (nextValue: string): void => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  const isVertical = direction === 'vertical';

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const currentTab = event.target as HTMLElement | null;
    if (currentTab?.getAttribute('role') !== 'tab') return;

    const tablist = event.currentTarget;
    const tabs = Array.from(
      tablist.querySelectorAll<HTMLElement>('[role="tab"]:not(:disabled)')
    );
    if (!tabs.length) return;

    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex < 0) return;

    let nextIndex = currentIndex;
    const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';

    switch (event.key) {
      case prevKey:
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case nextKey:
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    nextTab.focus();

    if (activationMode === 'automatic') {
      nextTab.click();
    }
  };

  const contextValue = useMemo<TabsContextInterface>(
    () => ({
      activeValue,
      onValueChange: handleValueChange,
      baseId,
      isValueMode,
      activationMode
    }),
    [activeValue, baseId, isValueMode, activationMode]
  );

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
    <TabsContext.Provider value={contextValue}>
      <div
        ref={ref}
        role="tablist"
        aria-label={
          ariaLabel ??
          ariaLabelFromProps ??
          (ariaLabelledBy ? undefined : 'Вкладки')
        }
        aria-labelledby={ariaLabelledBy}
        aria-orientation={isVertical ? 'vertical' : 'horizontal'}
        className={rootClassName}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

Tabs.displayName = 'Tabs';

export interface TabsContentProps extends ComponentProps<'div'> {
  value: string;
  keepMounted?: boolean;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  (props, ref) => {
    const { className, value, keepMounted = false, children, ...rest } = props;
    const tabsContext = useContext(TabsContext);

    if (tabsContext === null || !tabsContext.isValueMode) {
      return (
        <div ref={ref} className={className} {...rest}>
          {children}
        </div>
      );
    }

    const valueId = getTabValueId(value);
    const panelId = `${tabsContext.baseId}-panel-${valueId}`;
    const tabId = `${tabsContext.baseId}-tab-${valueId}`;
    const selected = tabsContext.activeValue === value;

    if (!keepMounted && !selected) {
      return null;
    }

    return (
      <div
        ref={ref}
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId}
        hidden={!selected}
        tabIndex={selected ? 0 : -1}
        className={className}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = 'TabsContent';
