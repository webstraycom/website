'use client';

import { useState } from 'react';
import { ArrowRight, SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const COMMANDS = ['Add password', 'Import passwords', 'Export passwords'];

export const CommandPalettePreview = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-popover flex min-h-48 flex-col gap-2 rounded-xl border p-2">
      <div className="bg-input/30 border-input/30 text-muted-foreground flex h-7 items-center gap-1.5 rounded-md border pl-2 text-xs">
        <SearchIcon className="size-3" />
        Search commands and secrets...
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground pl-2 text-xs">Commands</span>
        <ul className="flex flex-col gap-0.75">
          {COMMANDS.map((command, index) => {
            const isActive = activeIndex === index;

            return (
              <li
                key={command}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  'flex h-7 items-center gap-2 rounded-md px-2 text-xs select-none',
                  isActive ? 'bg-muted/50 text-foreground' : 'text-muted-foreground',
                )}
              >
                <ArrowRight className="size-3 shrink-0" />
                <span>{command}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
