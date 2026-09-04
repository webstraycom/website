'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { CustomLink } from '@/components/shared/custom-link';
import { Logo } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export const MobileSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open navigation menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="max-w-[300px] gap-0">
        <SheetHeader className="gap-2">
          <SheetTitle>
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <Logo className="size-4" />
              WebStray
            </Link>
          </SheetTitle>
          <SheetDescription>
            WebStray is a digital company developing open-source software.
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Products" className="flex flex-col gap-2 px-4">
          <h2 className="text-foreground font-medium">Products</h2>
          <CustomLink href="/authenticator" onClick={() => setIsOpen(false)}>
            Authenticator
          </CustomLink>
          <CustomLink href="/starlight" onClick={() => setIsOpen(false)}>
            Starlight
          </CustomLink>
          <CustomLink href="/cli" onClick={() => setIsOpen(false)}>
            CLI
          </CustomLink>
          <CustomLink href="/docs" onClick={() => setIsOpen(false)}>
            Docs
          </CustomLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
