import { FrownIcon } from 'lucide-react';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { CustomLink } from '@/components/shared/custom-link';
import { NotFoundSearch } from '@/components/shared/not-found-search';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-dvh">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FrownIcon />
          </EmptyMedia>
          <EmptyTitle>404 - Not Found</EmptyTitle>
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist. Try searching for what you need
            below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <NotFoundSearch />
          <EmptyDescription>
            Lost? Go to <CustomLink href="/">homepage</CustomLink>
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </div>
  );
}
