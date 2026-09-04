'use client';

import { CheckIcon } from 'lucide-react';
import { InputGroupButton } from '@/components/ui/input-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const CopyButton = ({ active, onCopy, icon, hint }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <InputGroupButton onClick={onCopy} size="icon-xs" aria-label={hint}>
        {active ? <CheckIcon /> : icon}
      </InputGroupButton>
    </TooltipTrigger>
    <TooltipContent side="top">{active ? 'Copied!' : hint}</TooltipContent>
  </Tooltip>
);
