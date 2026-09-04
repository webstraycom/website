'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import { Toaster } from '@/components/ui/sonner';

export const AdaptiveToaster = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)', {
    initializeWithValue: false,
  });

  return (
    <Toaster
      position={isDesktop ? 'bottom-center' : 'top-center'}
      className="z-150"
      toastOptions={{
        style: { fontFamily: 'var(--font-geist-sans), sans-serif' },
      }}
    />
  );
};
