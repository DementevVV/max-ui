import { type SpinnerAppearance } from '../Spinner';
import { type IconButtonAppearance, type IconButtonMode, type IconButtonSize, type IconButtonVariant } from './IconButton';

export const getIconButtonSpinnerSize = (iconButtonSize: IconButtonSize): number => {
  switch (iconButtonSize) {
    case 'xsmall': return 16;
    case 'small': return 20;
    default: return 24;
  }
};

export const getIconButtonVariantSpinnerAppearance = (iconButtonVariant: IconButtonVariant): SpinnerAppearance => {
  switch (iconButtonVariant) {
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

export const getIconButtonSpinnerAppearance = (iconButtonAppearance: IconButtonAppearance, iconButtonMode: IconButtonMode): SpinnerAppearance => {
  if (iconButtonMode === 'primary') {
    switch (iconButtonAppearance) {
      case 'themed':
      case 'negative':
      case 'neutral-themed':
        return 'contrast-static';
      case 'neutral':
        return 'contrast';
      case 'contrast-static':
        return 'primary-static';
    }
  }

  switch (iconButtonAppearance) {
    case 'themed': return 'themed';
    case 'negative': return 'negative';
    case 'neutral': return 'primary';
    case 'neutral-themed': return 'neutral-themed';
    case 'contrast-static': return 'contrast-static';
  }
};
