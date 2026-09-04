'use client';

import { useActiveItem } from '@/components/mdx/hooks/use-active-item';
import { cn } from '@/lib/utils';

export const TableOfContents = ({ toc }) => {
  const itemIds = toc.flatMap((item) => [
    item.url.replace('#', ''),
    ...(item.items?.map((sub) => sub.url.replace('#', '')) || []),
  ]);

  const activeId = useActiveItem(itemIds);

  return (
    <nav aria-label="Table of contents">
      <ul className="no-scrollbar scroll-fade scroll-fade-24 flex flex-col gap-2 overflow-y-auto text-[0.8rem]">
        {toc.map((item) => (
          <li key={item.url} className="flex flex-col gap-2">
            <a
              href={item.url}
              className={cn(
                'hover:text-foreground block leading-4 no-underline transition-colors',
                activeId === item.url.replace('#', '')
                  ? 'text-foreground'
                  : 'text-muted-foreground',
              )}
              aria-current={activeId === item.url.replace('#', '') ? 'location' : undefined}
            >
              {item.title}
            </a>
            {item.items?.length > 0 && (
              <ul className="flex flex-col gap-2 pl-4">
                {item.items.map((subItem) => (
                  <li key={subItem.url}>
                    <a
                      href={subItem.url}
                      className={cn(
                        'hover:text-foreground block leading-4 no-underline transition-colors',
                        activeId === subItem.url.replace('#', '')
                          ? 'text-foreground font-medium'
                          : 'text-muted-foreground',
                      )}
                      aria-current={
                        activeId === subItem.url.replace('#', '') ? 'location' : undefined
                      }
                    >
                      {subItem.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
