import { type ComponentProps, type FunctionComponent } from 'react';

import Icon16ChevronSvg from './16-chevron.svg';
import Icon16CloseIosSvg from './16-close-ios.svg';
import Icon16SearchOutlineSvg from './16-search-outline.svg';
import Icon20CloseAndroidSvg from './20-close-android.svg';
import Icon20CloseFilledSvg from './20-close-filled.svg';
import Icon24CloseAndroidSvg from './24-close-android.svg';

// Явная типизация нужна, чтобы в публичном dist/icons/index.d.ts не оставались
// импорты из '*.svg', которые не резолвятся у потребителей пакета
export type SvgIconComponent = FunctionComponent<ComponentProps<'svg'> & { title?: string }>;

export const Icon16Chevron: SvgIconComponent = Icon16ChevronSvg;
export const Icon16CloseIos: SvgIconComponent = Icon16CloseIosSvg;
export const Icon16SearchOutline: SvgIconComponent = Icon16SearchOutlineSvg;
export const Icon20CloseAndroid: SvgIconComponent = Icon20CloseAndroidSvg;
export const Icon20CloseFilled: SvgIconComponent = Icon20CloseFilledSvg;
export const Icon24CloseAndroid: SvgIconComponent = Icon24CloseAndroidSvg;
