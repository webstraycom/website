import { ArrowRight } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/custom-command';

export function ComandPalettePreview() {
  return (
    <Command className="w-full gap-2 rounded-lg border p-3">
      <CommandInput className="h-6 text-xs" placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty className="text-muted-foreground text-xs">No results found.</CommandEmpty>
        <CommandGroup className="flex flex-col gap-2" heading="Passwords">
          <CommandItem>
            <ArrowRight className="size-3" />
            <span>Add password</span>
          </CommandItem>
          <CommandItem>
            <ArrowRight className="size-3" />
            <span>Import passwords</span>
          </CommandItem>
          <CommandItem>
            <ArrowRight className="size-3" />
            <span>Export passwords</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
