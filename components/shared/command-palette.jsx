'use client';

import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpenText, GlobeIcon, SearchIcon, CornerDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Kbd } from '@/components/ui/kbd';
import { cn } from '@/lib/utils';

const GROUP_CONFIG = {
  pages: {
    label: 'Pages',
    icon: GlobeIcon,
  },
  docs: {
    label: 'Documentation',
    icon: BookOpenText,
  },
};

const SearchItem = memo(
  ({ page, groupKey }) => {
    const GroupIcon = GROUP_CONFIG[groupKey].icon;

    return (
      <Item size="xs" className="p-0">
        <ItemMedia className="bg-muted size-8 rounded-lg border" variant="icon">
          <GroupIcon />
        </ItemMedia>
        <ItemContent className="min-w-0">
          <ItemTitle className="truncate text-sm font-medium">{page.title}</ItemTitle>
          <ItemDescription className="text-muted-foreground truncate text-xs">
            {page.description}
          </ItemDescription>
        </ItemContent>
      </Item>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.page.url === nextProps.page.url && prevProps.groupKey === nextProps.groupKey;
  },
);
SearchItem.displayName = 'SearchItem';

export const CommandPalette = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState({});
  const [activePageUrl, setActivePageUrl] = useState('');

  useEffect(() => {
    const loadSearchIndex = async () => {
      try {
        const response = await fetch('/search-index.json');
        if (!response.ok)
          throw new Error(`Failed to load search index! Status: ${response.status}`);
        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadSearchIndex();
  }, []);

  useEffect(() => {
    const down = (e) => {
      if (e.key?.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    if (!open) {
      setActivePageUrl('');
    }
  }, [open]);

  const handleSelect = useCallback(
    (url) => {
      if (url) {
        router.push(url);
        setOpen(false);
      }
    },
    [router],
  );

  const activePage = useMemo(() => {
    if (!activePageUrl) return null;

    for (const items of Object.values(results)) {
      const found = items.find((page) => page.url === activePageUrl);
      if (found) return found;
    }
    return null;
  }, [activePageUrl, results]);

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => setOpen(true)}
        variant="secondary"
        className="bg-muted/50 text-muted-foreground hover:text-muted-foreground pr-30 font-normal"
      >
        <SearchIcon />
        Search...
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command value={activePageUrl} onValueChange={setActivePageUrl}>
          <CommandInput placeholder="Search pages and documentation..." />
          <CommandList className="h-72">
            <CommandEmpty className="text-muted-foreground flex flex-1 items-center justify-center">
              No results found.
            </CommandEmpty>

            {Object.entries(results).map(([groupKey, pages]) => {
              if (!pages || pages.length === 0) return null;

              return (
                <CommandGroup key={groupKey} heading={GROUP_CONFIG[groupKey].label}>
                  {pages.map((page) => (
                    <CommandItem
                      key={page.url}
                      value={page.url}
                      keywords={[page.title, page.description]}
                      onSelect={() => handleSelect(page.url)}
                    >
                      <SearchItem page={page} groupKey={groupKey} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}
          </CommandList>
          <CommandFooter className="px-4 py-3">
            <div className="text-muted-foreground flex w-full min-w-0 items-center gap-2 text-xs">
              <Kbd className="bg-background border dark:border-none">
                <CornerDownLeft />
              </Kbd>
              <div className="flex min-w-0 gap-1">
                <span className="shrink-0">Go to</span>
                <span className={cn(activePage && 'font-medium', 'truncate')}>
                  {activePage ? activePage.title : 'page'}
                </span>
              </div>
            </div>
          </CommandFooter>
        </Command>
      </CommandDialog>
    </div>
  );
};
