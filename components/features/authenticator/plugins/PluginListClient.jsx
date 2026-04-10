"use client"

import { Fragment, useMemo, useState } from 'react';
import { BadgeCheckIcon, PackageIcon, SearchIcon } from 'lucide-react';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle, } from "@/components/ui/item"
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PLUGIN_BASE_URL } from '@/components/features/authenticator/plugins/config';

const PluginItem = ({ plugin }) => (
  <Item className='p-0'>
    <ItemMedia className='bg-muted p-2 rounded-lg' variant="icon">
      <PackageIcon />
    </ItemMedia>
    <ItemContent className='gap-0'>
      <ItemTitle className='gap-1'>
        {plugin.title}
        <HoverCard openDelay={10} closeDelay={100}>
          <HoverCardTrigger asChild>
            <BadgeCheckIcon className='size-4 fill-foreground stroke-background' />
          </HoverCardTrigger>
          <HoverCardContent side='top' className="flex flex-col max-w-44 gap-0.5">
            <span className="text-xs font-medium">Official Plugin</span>
            <span className='text-xs text-muted-foreground'>This plugin is developed and maintained by WebStray.</span>
          </HoverCardContent >
        </HoverCard>
      </ItemTitle>
      <ItemDescription>{plugin.description}</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button asChild variant='outline'>
        <a href={`${PLUGIN_BASE_URL}/${plugin.id}`} target="_blank" rel="noopener noreferrer">
          Open
        </a>
      </Button>
    </ItemActions>
  </Item>
);

export const PluginListClient = ({ initialPlugins }) => {
  const [search, setSearch] = useState("");

  const filteredPlugins = useMemo(() => {
    return initialPlugins.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    )
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [search, initialPlugins]);

  return (
    <div className='flex flex-col gap-8 w-full max-w-2xl pb-8 px-4 md:px-6 lg:px-6'>
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon className="size-4 text-muted-foreground" />
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

      <div className='flex flex-col gap-4 mt-4'>
        {filteredPlugins.length > 0 ? (
          filteredPlugins.map((plugin, index) => (
            <Fragment key={plugin.id}>
              <PluginItem plugin={plugin} />
              {index < filteredPlugins.length - 1 && <Separator className="my-1" />}
            </Fragment>
          ))
        ) : (
          <div className="text-center py-10 text-muted-foreground text-sm">
            No plugins found for "{search}"
          </div>
        )}
      </div>
    </div>
  );
};