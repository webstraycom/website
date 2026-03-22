'use client';

import Image from 'next/image';
import { FullscreenIcon, Loader } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const GeneratedImagePreview = ({ url, isRendering, onLoad }) => (
  <div className="relative aspect-[1280/640] w-full min-w-0 overflow-hidden rounded-lg border">
    <Image
      src={url}
      alt="Starlight Generated Image Preview"
      fill
      priority
      unoptimized
      onLoad={onLoad}
    />
    {!isRendering && url !== '/starlight-placeholder.png' && (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            size="icon-sm"
            className="absolute top-3 right-3"
            onClick={() => window.open(url, '_blank')}
          >
            <FullscreenIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">Open in fullscreen</TooltipContent>
      </Tooltip>
    )}
    <div
      className={cn(
        'bg-background/50 absolute inset-0 flex flex-col items-center justify-center gap-2 backdrop-blur-md transition-all duration-250',
        isRendering ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0',
      )}
      aria-hidden={!isRendering}
    >
      <div className="bg-muted rounded-lg p-2">
        <Loader className="text-foreground size-4 animate-spin" />
      </div>
      <p className="text-foreground text-sm font-medium">Processing your request...</p>
      <p className="text-muted-foreground max-w-3xs text-center text-xs font-medium">
        Please wait while we process your request. Do not refresh the page.
      </p>
    </div>
  </div>
);
