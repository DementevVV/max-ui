import { clsx } from 'clsx';
import {
  type ComponentProps,
  forwardRef,
  type KeyboardEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState
} from 'react';

import { mergeRefs } from '../../helpers';
import { Icon16Info } from '../../icons';
import { type InnerClassNamesProp } from '../../types';
import { type ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { Typography } from '../Typography';
import styles from './Tooltip.module.scss';

const MAX_WIDTH = 280;
const EDGE_GAP = 16;
const OFFSET = 4;
const CLOSE_DELAY_MS = 150;

export type TooltipInnerElementKey = 'trigger' | 'tooltip';

export interface TooltipProps extends Omit<ComponentProps<'span'>, 'children'> {
  /** Название поясняемого элемента: кнопка получит aria-label «Описание: {label}» */
  label: string
  /** Текст подсказки */
  text: string
  variant?: ButtonVariant
  innerClassNames?: InnerClassNamesProp<TooltipInnerElementKey>
}

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>((props, forwardedRef) => {
  const {
    className,
    label,
    text,
    variant = 'ghost',
    innerClassNames,
    ...rest
  } = props;

  const rootRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | undefined>(undefined);
  // Фокус от тапа/клика не должен открывать подсказку: это сделает click,
  // иначе focus откроет, а click тут же закроет
  const pointerFocusRef = useRef(false);
  const lastPointerTypeRef = useRef<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const tooltipId = useId();

  const clearCloseTimer = (): void => {
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = undefined;
  };

  const open = (): void => {
    clearCloseTimer();
    setIsOpen(true);
  };

  const close = useCallback((): void => {
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = undefined;
    setIsOpen(false);
  }, []);

  // Наведение — только для мыши: на тач-экранах pointerleave приходит сразу после тапа
  const handlePointerEnter = (event: PointerEvent<HTMLSpanElement>): void => {
    if (event.pointerType === 'mouse') open();
  };

  const handlePointerLeave = (event: PointerEvent<HTMLSpanElement>): void => {
    if (event.pointerType !== 'mouse') return;
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(close, CLOSE_DELAY_MS);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>): void => {
    if (event.key === 'Escape' && isOpen) {
      event.stopPropagation();
      close();
    }
  };

  const updatePosition = useCallback((): void => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const rect = trigger.getBoundingClientRect();
    const width = Math.min(MAX_WIDTH, window.innerWidth - EDGE_GAP * 2);
    const left = Math.min(
      Math.max(rect.left + rect.width / 2 - width / 2, EDGE_GAP),
      window.innerWidth - EDGE_GAP - width
    );
    const height = tooltip.offsetHeight;
    const below = rect.bottom + OFFSET;
    const top = below + height > window.innerHeight - EDGE_GAP
      ? Math.max(rect.top - OFFSET - height, EDGE_GAP)
      : below;

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }, []);

  useLayoutEffect(() => {
    if (isOpen) updatePosition();
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;

    // Тап вне подсказки закрывает её; позиция пересчитывается при прокрутке и ресайзе
    const handleOutsidePointerDown = (event: Event): void => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };

    document.addEventListener('pointerdown', handleOutsidePointerDown);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      document.removeEventListener('pointerdown', handleOutsidePointerDown);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, close, updatePosition]);

  useEffect(() => () => {
    window.clearTimeout(closeTimerRef.current);
  }, []);

  return (
    <span
      ref={mergeRefs(rootRef, forwardedRef)}
      className={clsx(styles.root, className)}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <IconButton
        ref={triggerRef}
        type="button"
        size="xsmall"
        variant={variant}
        className={clsx(styles.trigger, innerClassNames?.trigger)}
        aria-label={`Описание: ${label}`}
        aria-describedby={isOpen ? tooltipId : undefined}
        aria-expanded={isOpen}
        onPointerDown={(event) => {
          pointerFocusRef.current = true;
          lastPointerTypeRef.current = event.pointerType;
        }}
        onClick={() => {
          pointerFocusRef.current = false;
          // Мышью подсказка уже открыта наведением — клик её не закрывает;
          // на тач-экранах и с клавиатуры (Enter/Space) клик переключает
          if (lastPointerTypeRef.current === 'mouse') open();
          else if (isOpen) close();
          else open();
          lastPointerTypeRef.current = '';
        }}
        onFocus={() => {
          if (!pointerFocusRef.current) open();
        }}
        onBlur={() => {
          pointerFocusRef.current = false;
          close();
        }}
      >
        <Icon16Info />
      </IconButton>
      <div
        ref={tooltipRef}
        id={tooltipId}
        role="tooltip"
        className={clsx(styles.tooltip, { [styles.tooltip_open]: isOpen }, innerClassNames?.tooltip)}
      >
        <Typography.Text variant="description">{text}</Typography.Text>
      </div>
    </span>
  );
});

Tooltip.displayName = 'Tooltip';
