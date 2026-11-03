import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

import { Counter, type CounterProps } from '../Counter';
import { type SpinnerAppearance } from '../Spinner';
import { type ButtonAppearance, type ButtonMode, type ButtonSize, type ButtonVariant } from './Button';

export const getButtonSpinnerSize = (buttonSize: ButtonSize): number => {
  switch (buttonSize) {
    case 'xsmall': return 16;
    case 'small': return 20;
    default: return 24;
  }
};

export const getButtonVariantSpinnerAppearance = (buttonVariant: ButtonVariant): SpinnerAppearance => {
  switch (buttonVariant) {
    case 'primary':
    case 'destructive':
      return 'contrast-static';
    case 'secondary':
    case 'ghost':
      return 'themed';
    case 'primary-contrast':
      return 'primary-static';
    case 'secondary-contrast':
    case 'overlay':
      return 'contrast-static';
  }
};

export const getButtonSpinnerAppearance = (buttonAppearance: ButtonAppearance, buttonMode: ButtonMode): SpinnerAppearance => {
  if (buttonMode === 'primary') {
    switch (buttonAppearance) {
      case 'themed':
      case 'negative':
      case 'neutral-themed':
        return 'contrast-static';
      case 'contrast-static': return 'primary-static';
      case 'neutral': return 'contrast';
    }
  }

  switch (buttonAppearance) {
    case 'themed': return 'themed';
    case 'negative': return 'negative';
    case 'neutral': return 'primary';
    case 'neutral-themed': return 'neutral-themed';
    case 'contrast-static': return 'contrast-static';
  }
};

export const getButtonCounterAppearance = (buttonAppearance: ButtonAppearance, buttonMode: ButtonMode): Pick<CounterProps, 'appearance' | 'mode'> => {
  if (buttonAppearance === 'negative') {
    return { mode: buttonMode === 'primary' ? 'inverse' : 'filled', appearance: 'negative' };
  } else if (buttonAppearance === 'neutral') {
    return { mode: buttonMode === 'primary' ? 'inverse' : 'filled', appearance: 'neutral' };
  } else if (buttonAppearance === 'neutral-themed') {
    return { mode: buttonMode === 'primary' ? 'inverse' : 'filled', appearance: 'neutral-themed' };
  } else if (buttonAppearance === 'contrast-static') {
    return { mode: buttonMode === 'primary' ? 'filled' : 'inverse', appearance: 'neutral-static' };
  }

  return { mode: buttonMode === 'primary' ? 'inverse' : 'filled', appearance: 'themed' };
};

// Цвета Counter внутри кнопки для каждого variant (appearance × mode)
export const getButtonVariantCounterAppearance = (buttonVariant: ButtonVariant): Pick<CounterProps, 'appearance' | 'mode'> => {
  switch (buttonVariant) {
    case 'primary':
      return { mode: 'inverse', appearance: 'themed' };
    case 'destructive':
      return { mode: 'inverse', appearance: 'negative' };
    case 'secondary':
    case 'ghost':
    case 'secondary-contrast':
      return { mode: 'filled', appearance: 'neutral' };
    case 'primary-contrast':
      return { mode: 'filled', appearance: 'neutral-static' };
    case 'overlay':
      return { mode: 'inverse', appearance: 'neutral-static' };
  }
};

export const injectButtonIndicator = (indicatorNode: ReactNode, buttonAppearance: ButtonAppearance, buttonMode: ButtonMode, disabled?: boolean, buttonVariant?: ButtonVariant): ReactNode => {
  if (!isValidElement(indicatorNode)) {
    return indicatorNode;
  }

  if (indicatorNode.type === Counter) {
    return cloneElement(
      indicatorNode as ReactElement<CounterProps>,
      {
        ...(buttonVariant != null
          ? getButtonVariantCounterAppearance(buttonVariant)
          : getButtonCounterAppearance(buttonAppearance, buttonMode)),
        disabled
      }
    );
  }

  return indicatorNode;
};
