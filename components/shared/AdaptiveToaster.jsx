'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Toaster } from '@/components/ui/sonner';

export function AdaptiveToaster() {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Toaster
      position={isDesktop ? 'bottom-center' : 'top-center'}
      className="z-150"
      toastOptions={{
        style: { fontFamily: 'var(--font-geist-sans), sans-serif' },
      }}
    />
  );
}
