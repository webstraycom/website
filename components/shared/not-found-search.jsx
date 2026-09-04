'use client';

import { memo, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpenText, GlobeIcon, SearchIcon } from 'lucide-react';
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteLabel,
  AutocompleteList,
} from '@/components/ui/custom-autocomplete';
import { InputGroupAddon } from '@/components/ui/input-group';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';

const GROUP_CONFIG = {
  pages: { icon: GlobeIcon },
  docs: { icon: BookOpenText },
};

const SearchItem = memo(({ page, groupValue }) => {
  const Icon = GROUP_CONFIG[groupValue].icon;

  return (
    <Item size="xs" className="p-0">
      <ItemMedia className="bg-muted size-8 rounded-lg border" variant="icon">
        <Icon />
      </ItemMedia>
      <ItemContent className="min-w-0">
        <ItemTitle className="truncate text-sm">{page.title}</ItemTitle>
        <ItemDescription className="!text-muted-foreground truncate text-xs">
          {page.description}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
});
SearchItem.displayName = 'SearchItem';

const useSearchPages = (query) => {
  const [results, setResults] = useState({ pages: [], docs: [] });
  const { pages, docs } = results;

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

  const searchResults = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();

    const filterGroup = (groupArray) =>
      groupArray.filter(
        (page) =>
          page.title.toLowerCase().includes(trimmedQuery) ||
          page.url.toLowerCase().includes(trimmedQuery) ||
          page.description?.toLowerCase().includes(trimmedQuery),
      );

    return [
      { value: 'pages', label: 'Pages', items: filterGroup(pages).slice(0, 3) },
      { value: 'docs', label: 'Documentation', items: filterGroup(docs).slice(0, 3) },
    ];
  }, [query, pages, docs]);

  return { searchResults };
};

export const NotFoundSearch = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const { searchResults } = useSearchPages(query);

  return (
    <Autocomplete
      items={searchResults}
      itemToStringValue={(page) => page.title}
      autoHighlight
      filter={null}
      value={query}
      onValueChange={(nextValue) => setQuery(nextValue)}
    >
      <AutocompleteInput id="search-input" placeholder="Try searching for pages...">
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </AutocompleteInput>
      <AutocompleteContent align="center" className="w-[260px]">
        <AutocompleteEmpty>No pages found.</AutocompleteEmpty>
        <AutocompleteList>
          {(group) => (
            <AutocompleteGroup key={group.value} items={group.items}>
              <AutocompleteLabel>{group.label}</AutocompleteLabel>
              <AutocompleteCollection>
                {(page) => (
                  <AutocompleteItem
                    key={page.url}
                    value={page}
                    onClick={() => {
                      if (page?.url) router.push(page.url);
                    }}
                  >
                    <SearchItem page={page} groupValue={group.value} />
                  </AutocompleteItem>
                )}
              </AutocompleteCollection>
            </AutocompleteGroup>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  );
};
