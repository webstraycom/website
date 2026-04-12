'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/Logo';
import { CustomLink } from '@/components/shared/CustomLink';

export function MobileSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="max-w-[300px] gap-0">
        <SheetHeader className="gap-2">
          <SheetTitle>
            <Link href="/" className="flex items-center gap-2">
              <Logo className="size-4" />
              WebStray
            </Link>
          </SheetTitle>
          <SheetDescription>
            WebStray is a digital company developing open-source software.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 px-4">
          <span className="text-foreground font-medium">Products</span>
          <CustomLink href="/authenticator">Authenticator</CustomLink>
          <CustomLink href="/starlight">Starlight</CustomLink>
          <CustomLink href="/cli">CLI</CustomLink>
          <CustomLink href="/docs">Docs</CustomLink>
        </div>
      </SheetContent>
    </Sheet>
  );
}
