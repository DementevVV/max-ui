import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, useEffect, useMemo } from 'react';

import { isIos } from '../../helpers';
import { useSystemColorScheme } from '../../hooks';
import styles from './MaxUI.module.scss';
import { MaxUIContext, type MaxUIContextInterface } from './MaxUIContext';

export interface MaxUIProps extends Partial<MaxUIContextInterface> {
  children: ComponentProps<'div'>['children'];

  className?: ComponentProps<'div'>['className'];
  resetBody?: boolean;
}

export const MaxUI = forwardRef<HTMLDivElement, MaxUIProps>((props, ref) => {
  const {
    children,
    className,
    resetBody = false,
    colorScheme: colorSchemeProp,
    platform = isIos() ? 'ios' : 'android'
  } = props;

  const systemColorScheme = useSystemColorScheme({
    listenChanges: !colorSchemeProp
  });
  const colorScheme = colorSchemeProp ?? systemColorScheme;

  useEffect(() => {
    if (!resetBody || typeof document === 'undefined') {
      return;
    }

    const body = document.body;
    const currentResetCount = Number(body.dataset.maxUiBodyResetCount ?? '0');

    if (currentResetCount === 0) {
      body.dataset.maxUiBodyPrevMargin = body.style.margin;
      body.style.margin = '0';
    }

    body.dataset.maxUiBodyResetCount = String(currentResetCount + 1);

    return () => {
      const appliedResetCount = Number(body.dataset.maxUiBodyResetCount ?? '1');
      const nextResetCount = Math.max(appliedResetCount - 1, 0);

      if (nextResetCount === 0) {
        const prevMargin = body.dataset.maxUiBodyPrevMargin;

        if (prevMargin !== undefined) {
          body.style.margin = prevMargin;
        } else {
          body.style.removeProperty('margin');
        }

        delete body.dataset.maxUiBodyResetCount;
        delete body.dataset.maxUiBodyPrevMargin;

        return;
      }

      body.dataset.maxUiBodyResetCount = String(nextResetCount);
    };
  }, [resetBody]);

  const config = useMemo<MaxUIContextInterface>(
    () => ({
      colorScheme,
      platform
    }),
    [colorScheme, platform]
  );

  const rootClassName = clsx(
    styles.MaxUI,
    styles[`MaxUI_colorScheme_${colorScheme}`],
    styles[`MaxUI_platform_${platform}`],
    className
  );

  return (
    <MaxUIContext.Provider value={config}>
      <div ref={ref} className={rootClassName}>
        {children}
      </div>
    </MaxUIContext.Provider>
  );
});

MaxUI.displayName = 'MaxUI';
