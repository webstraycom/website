'use client';

import { docsConfig } from '@/config/docs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function DocsSidebar({ folder }) {
  const pathname = usePathname();

  const sidebar = docsConfig[folder] || [];

  return (
    <nav className="flex flex-col items-start gap-3 overflow-y-auto no-scrollbar">
      {sidebar.map((section) => (
        <div key={section.title} className="flex flex-col gap-3 text-[0.8rem]">
          <h4 className="text-sm font-medium tracking-tight capitalize">{section.title}</h4>

          <ul className="flex flex-col gap-3 border-neutral-200 dark:border-neutral-800">
            {section.items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'group flex w-full items-center gap-2 rounded-md text-[0.8rem] leading-4',
                      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
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
