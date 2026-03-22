'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <Sun className="dark:hidden" />
          <Moon className="hidden dark:block" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="z-200">
        <p>Toggle Theme</p>
      </TooltipContent>
    </Tooltip>
  );
}
