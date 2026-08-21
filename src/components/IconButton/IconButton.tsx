import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import {
  type ComponentProps,
  type ElementType,
  forwardRef,
  type MouseEventHandler
} from 'react';

import { getSubtree } from '../../helpers';
import { useButtonLikeProps, usePlatform } from '../../hooks';
import { type AsChildProp, type InnerClassNamesProp } from '../../types';
import { type ButtonVariant } from '../Button';
import { Ripple } from '../Ripple';
import { Spinner } from '../Spinner';
import {
  getIconButtonSpinnerAppearance,
  getIconButtonSpinnerSize,
  getIconButtonVariantSpinnerAppearance
} from './helpers';
import styles from './IconButton.module.scss';

export type IconButtonSize = 'xsmall' | 'small' | 'medium' | 'large';
export type IconButtonMode = 'primary' | 'secondary' | 'tertiary' | 'link';
export type IconButtonAppearance =
  | 'themed'
  | 'negative'
  | 'neutral'
  | 'neutral-themed'
  | 'contrast-static';
export type IconButtonVariant = ButtonVariant;
export type IconButtonInnerElementKey =
  | 'content'
  | 'spinnerContainer'
  | 'spinner';

export interface IconButtonProps extends ComponentProps<'button'>, AsChildProp {
  /**
   * `xsmall` доступен только вместе с `variant` (в legacy-API трактуется как `small`)
   */
  size?: IconButtonSize
  mode?: IconButtonMode
  appearance?: IconButtonAppearance
  /**
   * Новый канонический API дизайн-системы MAX (семейство `Button/*` из Figma).
   * Если задан — `mode`/`appearance` игнорируются, размеры берутся из новой шкалы
   * (квадрат 32/40/52/60 со скруглением 45%).
   */
  variant?: IconButtonVariant
  disabled?: boolean
  loading?: boolean
  innerClassNames?: InnerClassNamesProp<IconButtonInnerElementKey>
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, forwardedRef) => {
    const {
      children,
      className,
      disabled,
      innerClassNames,
      loading,
      onClick,
      asChild = false,
      size = 'medium',
      mode = 'primary',
      appearance = 'themed',
      variant,
      ...rest
    } = props;

    const rootElement: ElementType = 'button';
    const Comp = asChild ? Slot : rootElement;

    const platform = usePlatform();
    const buttonLikeProps = useButtonLikeProps({
      asChild,
      children,
      disabled,
      rootElement,
      loading
    });

    const inactive = disabled || loading;
    const withVariant = variant != null;
    const withRipple = platform === 'android' && (withVariant || mode !== 'link');
    // в legacy-API нет xsmall-габаритов — не оставляем кнопку без размерного класса
    const sizeClassKey = !withVariant && size === 'xsmall' ? 'small' : size;

    const clickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
      if (loading) return;
      onClick?.(event);
    };

    const rootClassName = clsx(
      styles.IconButton,
      withVariant
        ? [styles.IconButton_withVariant, styles[`IconButton_variant_${variant}`]]
        : [styles[`IconButton_appearance_${appearance}`], styles[`IconButton_mode_${mode}`]],
      styles[`IconButton_size_${sizeClassKey}`],
      {
        [styles.IconButton_loading]: loading,
        [styles.IconButton_disabled]: disabled,
        [styles.IconButton_activeMode_highlight]: !inactive && !withRipple,
        [styles.IconButton_activeMode_ripple]: !inactive && withRipple
      },
      className
    );

    return (
      <Comp
        ref={forwardedRef}
        className={rootClassName}
        onClick={clickHandler}
        {...buttonLikeProps}
        {...rest}
      >
        {loading && (
          <span
            className={clsx(
              styles.IconButton__spinnerContainer,
              innerClassNames?.spinnerContainer
            )}
          >
            <Spinner
              className={clsx(innerClassNames?.spinner)}
              size={getIconButtonSpinnerSize(size)}
              appearance={withVariant ? getIconButtonVariantSpinnerAppearance(variant) : getIconButtonSpinnerAppearance(appearance, mode)}
            />
          </span>
        )}

        <Slottable>
          {getSubtree({ asChild, children }, (children) => (
            <span
              key="subtree-container"
              className={clsx(
                styles.IconButton__content,
                innerClassNames?.content
              )}
            >
              {children}
            </span>
          ))}
        </Slottable>

        {withRipple && !inactive && (
          <Ripple className={styles.IconButton__ripple} />
        )}
      </Comp>
    );
  }
);

IconButton.displayName = 'IconButton';
