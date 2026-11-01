import { render, type RenderResult } from '@testing-library/react';
import { type ReactElement } from 'react';

import { MaxUI } from '../components/MaxUI';
import { type PlatformType } from '../types';

interface RenderOptions {
  platform?: PlatformType
  colorScheme?: 'light' | 'dark'
}

export const renderWithMaxUI = (ui: ReactElement, options: RenderOptions = {}): RenderResult => {
  const { platform = 'ios', colorScheme = 'light' } = options;

  return render(
    <MaxUI
      platform={platform}
      colorScheme={colorScheme}
    >
      {ui}
    </MaxUI>
  );
};
