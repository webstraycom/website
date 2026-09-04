import { ArrowRight, SearchIcon } from 'lucide-react';

export const CommandPalettePreview = () => {
  return (
    <div className="bg-popover flex min-h-48 flex-col gap-2 rounded-xl border p-3">
      <div className="bg-input/30 border-input/30 text-muted-foreground flex h-7 items-center gap-2 rounded-md border pl-2 text-xs">
        <SearchIcon className="size-3" />
        Search commands and secrets...
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground pl-2 text-xs">Commands</span>
        <ul className="flex flex-col gap-0.75">
          <li className="bg-muted/50 flex h-7 items-center gap-2 rounded-md px-2 text-xs">
            <ArrowRight className="size-3" />
            <span>Add password</span>
          </li>
          <li className="text-muted-foreground flex h-7 items-center gap-2 px-2 text-xs">
            <ArrowRight className="size-3" />
            <span>Import passwords</span>
          </li>
          <li className="text-muted-foreground flex h-7 items-center gap-2 px-2 text-xs">
            <ArrowRight className="size-3" />
            <span>Export passwords</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
