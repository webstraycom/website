import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/Logo';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { MobileSheet } from '@/components/shared/MobileSheet';
import { cn } from '@/lib/utils';
import { GITHUB_BASE } from '@/config/github';

export const Header = () => {
  const navItems = [
    { href: '/authenticator', label: 'Authenticator' },
    { href: '/starlight', label: 'Starlight' },
    { href: '/cli', label: 'CLI' },
    { href: '/docs', label: 'Docs' },
  ];

  return (
    <header className="bg-background fixed top-0 right-0 left-0 z-100 flex h-14 justify-center px-4 text-sm md:px-6 lg:px-6">
      <div className="flex max-w-7xl flex-1 items-center justify-between">
        <Separator className="via-border absolute bottom-0 flex h-px w-full bg-gradient-to-r from-transparent to-transparent md:hidden" />
        <div className="flex gap-3">
          <div className="flex items-center gap-4 md:hidden">
            <MobileSheet />
          </div>
          <NavigationMenu className="hidden items-center gap-2 md:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link href="/" className="flex flex-row items-center gap-2 py-1.5 pr-2.5">
                  <Logo className="size-4" />
                  <span>WebStray</span>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Separator orientation="vertical" className="mx-1 h-5" />
              </NavigationMenuItem>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    className={cn(navigationMenuTriggerStyle(), 'h-fit px-2.5 py-1.5')}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex h-5 items-center gap-2">
          <ThemeToggle />
          <Separator orientation="vertical" className="mr-2" />
          <Button asChild className="gap-1">
            <a href={GITHUB_BASE} target="_blank" rel="noreferrer">
              Open on GitHub
              <ArrowRight />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
