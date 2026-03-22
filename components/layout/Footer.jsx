import { cn } from '@/lib/utils';
import { CustomLink } from '@/components/shared/CustomLink';

export const Footer = ({ className }) => {
  return (
    <footer className={cn('flex w-full justify-center px-4 py-6 md:p-6 lg:p-8', className)}>
      <p className="text-muted-foreground text-center text-xs md:text-sm">
        Built by{' '}
        <CustomLink href="https://github.com/webstraycom" className="text-xs underline md:text-sm">
          WebStray
        </CustomLink>
        . The source code is available on{' '}
        <CustomLink
          href="https://github.com/webstraycom/website"
          className="text-xs underline md:text-sm"
        >
          GitHub
        </CustomLink>
        .
      </p>
    </footer>
  );
};
