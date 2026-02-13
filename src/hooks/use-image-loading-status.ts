import { type HTMLAttributeReferrerPolicy, useEffect, useState } from 'react';

export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

export const useImageLoadingStatus = (
  src?: string,
  referrerPolicy?: HTMLAttributeReferrerPolicy
): ImageLoadingStatus => {
  const [loadingStatus, setLoadingStatus] =
    useState<ImageLoadingStatus>('idle');

  useEffect(() => {
    if (!src) {
      setLoadingStatus('error');
      return;
    }

    if (typeof window?.Image === 'undefined') {
      return;
    }

    let isMounted = true;
    const image = new window.Image();

    const updateStatus = (status: ImageLoadingStatus) => () => {
      if (!isMounted) return;
      setLoadingStatus(status);
    };

    setLoadingStatus('loading');
    image.onload = updateStatus('loaded');
    image.onerror = updateStatus('error');
    image.src = src;
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }

    return () => {
      isMounted = false;
    };
  }, [src, referrerPolicy]);

  return loadingStatus;
};
