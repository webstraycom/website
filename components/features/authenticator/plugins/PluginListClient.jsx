'use client';

import { Fragment, useMemo, useState } from 'react';
import { BadgeCheckIcon, PackageIcon, SearchIcon } from 'lucide-react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { REPOSITORIES } from '@/config/github';

const PluginItem = ({ plugin }) => (
  <Item className="p-0">
    <ItemMedia className="bg-muted rounded-lg p-2" variant="icon">
      <PackageIcon />
    </ItemMedia>
    <ItemContent className="gap-0">
      <ItemTitle className="gap-1">
        {plugin.title}
        <HoverCard openDelay={10} closeDelay={100}>
          <HoverCardTrigger asChild>
            <BadgeCheckIcon className="fill-foreground stroke-background size-4" />
          </HoverCardTrigger>
          <HoverCardContent side="top" className="flex max-w-44 flex-col gap-0.5">
            <span className="text-xs font-medium">Official Plugin</span>
            <span className="text-muted-foreground text-xs">
              This plugin is developed and maintained by WebStray.
            </span>
          </HoverCardContent>
        </HoverCard>
      </ItemTitle>
      <ItemDescription>{plugin.description}</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button asChild variant="outline">
        <a
          href={`${REPOSITORIES.PLUGIN_REGISTRY.PLUGIN_BASE_URL}/${plugin.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open
        </a>
      </Button>
    </ItemActions>
  </Item>
);

export const PluginListClient = ({ initialPlugins }) => {
  const [search, setSearch] = useState('');

  const filteredPlugins = useMemo(() => {
    return initialPlugins
      .filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [search, initialPlugins]);

  return (
    <div className="flex w-full max-w-2xl flex-col gap-8 px-4 pb-8 md:px-6 lg:px-6">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon className="text-muted-foreground size-4" />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search plugins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputGroupAddon align="inline-end">
          {filteredPlugins.length} {filteredPlugins.length === 1 ? 'plugin' : 'plugins'}
        </InputGroupAddon>
      </InputGroup>

      <div className="mt-4 flex flex-col gap-4">
        {filteredPlugins.length > 0 ? (
          filteredPlugins.map((plugin, index) => (
            <Fragment key={plugin.id}>
              <PluginItem plugin={plugin} />
              {index < filteredPlugins.length - 1 && <Separator className="my-1" />}
            </Fragment>
          ))
        ) : (
          <div className="text-muted-foreground py-10 text-center text-sm">
            No plugins found for "{search}"
          </div>
        )}
      </div>
    </div>
  );
};
