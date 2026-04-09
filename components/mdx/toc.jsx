'use client';

import { useActiveItem } from '@/components/mdx/hooks/use-active-item';
import { cn } from '@/lib/utils';

export function TableOfContents({ toc }) {
  const itemIds = toc.flatMap((item) => [
    item.url.replace('#', ''),
    ...(item.items?.map((sub) => sub.url.replace('#', '')) || []),
  ]);

  const activeId = useActiveItem(itemIds);

  return (
    <ul className="flex flex-col gap-3 text-[0.8rem] overflow-y-auto no-scrollbar">
      {toc.map((item) => (
        <li key={item.url} className="flex flex-col gap-3">
          <a
            href={item.url}
            className={cn(
              'hover:text-foreground block leading-4 no-underline transition-colors',
              activeId === item.url.replace('#', '') ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            {item.title}
          </a>
          {item.items?.length > 0 && (
            <ul className="flex flex-col gap-3 pl-4">
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
  );
}
