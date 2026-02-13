import { useEffect, useState } from 'react';

import { noop } from '../helpers';

type SystemColorScheme = 'light' | 'dark';

interface Params {
  listenChanges?: boolean
}

export const useSystemColorScheme = ({
  listenChanges
}: Params = {}): SystemColorScheme => {
  const [colorScheme, setColorScheme] = useState<SystemColorScheme>(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  const handleSchemeChanged = (event: MediaQueryListEvent): void => {
    setColorScheme(() => (event.matches ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return noop;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setColorScheme(() => (mediaQuery.matches ? 'dark' : 'light'));
    if (!listenChanges) {
      return noop;
    }

    mediaQuery.addEventListener('change', handleSchemeChanged);
    return () => {
      mediaQuery.removeEventListener('change', handleSchemeChanged);
    };
  }, [listenChanges]);

  return colorScheme;
};
