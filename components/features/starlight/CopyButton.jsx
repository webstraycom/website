'use client';

import { CheckIcon } from 'lucide-react';
import { InputGroupButton } from '@/components/ui/input-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const CopyButton = ({ active, onCopy, icon, tooltip }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <InputGroupButton onClick={onCopy} size="icon-xs">
        {active ? <CheckIcon /> : icon}
      </InputGroupButton>
    </TooltipTrigger>
    <TooltipContent side="top">{active ? 'Copied!' : tooltip}</TooltipContent>
  </Tooltip>
);
