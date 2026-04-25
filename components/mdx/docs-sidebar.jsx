'use client';

import { useEffect, useRef } from 'react';
import { docsConfig } from '@/config/docs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const scrollPositions = {}; 

export function DocsSidebar({ folder }) {
  const pathname = usePathname();
  const scrollRef = useRef(null);
  const sidebar = docsConfig[folder] || [];

  useEffect(() => {
    const savedScrollPos = scrollPositions[folder];
    if (savedScrollPos && scrollRef.current) {
      scrollRef.current.scrollTop = savedScrollPos;
    }
  }, [folder]);

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollPositions[folder] = scrollRef.current.scrollTop;
    }
  };

  return (
    <nav ref={scrollRef} onScroll={handleScroll} className="no-scrollbar flex flex-col items-start gap-12 overflow-y-auto w-full font-medium">
      {sidebar.map((section) => (
        <div key={section.title} className="flex flex-col gap-2 text-[0.8rem] w-full max-w-48">
          <h4 className="text-sm pl-2 text-muted-foreground text-xs capitalize">{section.title}</h4>

          <ul className="flex flex-col gap-1">
            {section.items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'group flex text-primary hover:bg-muted py-1.5 px-2 w-full items-center gap-2 rounded-md text-[0.8rem] leading-4',
                      isActive ? 'bg-muted' : '',
                    )}
                  >
                    {item.title}
                    {item.marked && (
                      <span className="flex size-1.5 rounded-full bg-blue-500" title="New"></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
