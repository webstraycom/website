'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { StarlightPlaygroundContent } from '@/components/features/starlight/StarlightPlaygroundContent';
import { usePlaygroundForm } from '@/components/features/starlight/hooks/usePlaygroundForm';
import { useMediaQuery } from '@/hooks/use-media-query';

const INITIAL_STATE = {
  activeTab: 'source',
  isRendering: false,
  imageGenerated: false,
  renderedUrl: '/starlight-placeholder.png',
};

export function StarlightPlaygroundDialog() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState(INITIAL_STATE);

  const form = usePlaygroundForm();

  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateState = (p) => setState((prev) => ({ ...prev, ...p }));

  const handleRender = () => {
    const separator = form.finalUrl.includes('?') ? '&' : '?';
    const newUrl = `${form.finalUrl}${separator}t=${Date.now()}`;

    const renderPromise = new Promise((resolve) => {
      updateState({
        isRendering: true,
        renderedUrl: newUrl,
        resolveRender: resolve,
      });
    });

    toast.promise(renderPromise, {
      loading: 'Generating your Starlight preview...',
      success: 'Preview rendered successfully!',
      error: 'Failed to generate image.',
    });
  };

  const handleImageLoaded = () => {
    setState((prev) => {
      const isNotPlaceholder = prev.renderedUrl !== '/starlight-placeholder.png';

      if (isNotPlaceholder && prev.resolveRender) {
        prev.resolveRender();
      }

      return {
        ...prev,
        isRendering: false,
        ...(prev.activeTab !== 'preview' && isNotPlaceholder && { imageGenerated: true }),
      };
    });
  };

  const resetState = () => {
    form.reset();
    updateState(INITIAL_STATE);
    toast.dismiss();
  };

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      resetState();
    }
  };

  const playgroundProps = {
    ...state,
    form,
    onTabChange: (v) =>
      updateState({ activeTab: v, ...(v === 'preview' && { imageGenerated: false }) }),
    onRender: handleRender,
    onImageLoaded: handleImageLoaded,
  };

  const renderButton = (
    <Button onClick={handleRender} className="gap-2" disabled={state.isRendering || !form.isValid}>
      {state.isRendering ? (
        <>
          <Loader className="size-4 animate-spin" />
          Rendering...
        </>
      ) : (
        'Render Image'
      )}
    </Button>
  );

  if (!mounted) {
    return <Button variant="outline">Playground</Button>;
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline">Playground</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Starlight Playground</DialogTitle>
            <DialogDescription>
              Here you can play with Starlight generation parameters
            </DialogDescription>
          </DialogHeader>
          <StarlightPlaygroundContent {...playgroundProps} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            {renderButton}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="outline">Playground</Button>
      </DrawerTrigger>
      <DrawerContent className="antialiased">
        <DrawerHeader className="text-left">
          <DrawerTitle>Starlight Playground</DrawerTitle>
          <DrawerDescription>
            Here you can play with Starlight generation parameters
          </DrawerDescription>
        </DrawerHeader>
        <StarlightPlaygroundContent drawerMode {...playgroundProps} />
        <DrawerFooter>
          {renderButton}
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
