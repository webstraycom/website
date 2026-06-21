'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpenText, GlobeIcon, SearchIcon } from 'lucide-react';
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteGroup,
  AutocompleteLabel,
  AutocompleteCollection,
  AutocompleteList,
} from '@/components/ui/custom-autocomplete';
import { InputGroupAddon } from '@/components/ui/input-group';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';

const useSearchPages = (query) => {
  const [results, setResults] = useState({ pages: [], docs: [] });

  useEffect(() => {
    const loadSearchIndex = async () => {
      try {
        const response = await fetch('/search-index.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error('Failed to load search index file:', err);
      }
    };
    loadSearchIndex();
  }, []);

  const trimmedQuery = query.trim().toLowerCase();

  const filterGroup = (groupArray) =>
    groupArray.filter(
      (page) =>
        page.title.toLowerCase().includes(trimmedQuery) ||
        page.url.toLowerCase().includes(trimmedQuery) ||
        page.description?.toLowerCase().includes(trimmedQuery),
    );

  const filteredResults = !trimmedQuery
    ? { pages: results.pages.slice(0, 3), docs: [] }
    : {
        pages: filterGroup(results.pages).slice(0, 3),
        docs: filterGroup(results.docs).slice(0, 3),
      };

  const searchResults = [
    { value: 'pages', label: 'Pages', items: filteredResults.pages },
    { value: 'docs', label: 'Documentation', items: filteredResults.docs },
  ];

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
                    <Item size="xs" className="p-0">
                      <ItemMedia className="bg-muted size-8 rounded-lg border" variant="icon">
                        {group.value === 'docs' ? <BookOpenText /> : <GlobeIcon />}
                      </ItemMedia>
                      <ItemContent className="min-w-0">
                        <ItemTitle className="truncate">{page.title}</ItemTitle>
                        <ItemDescription className="!text-muted-foreground truncate">
                          {page.description}
                        </ItemDescription>
                      </ItemContent>
                    </Item>
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
