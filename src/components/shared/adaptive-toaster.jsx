'use client';

import { Toaster } from '@/components/ui/sonner';
import { useMediaQuery } from '@/hooks/use-media-query';

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
