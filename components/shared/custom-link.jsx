import { cn } from '@/lib/utils';
import Link from 'next/link';

export const CustomLink = ({ href, children, className }) => {
  const isExternal = href.startsWith('http');
  const style = cn(
    'text-sm font-medium text-muted-foreground hover:text-primary hover:underline focus-visible:text-foreground focus-visible:outline-none focus-visible:underline underline-offset-4',
    className,
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={style}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={style}>
      {children}
    </Link>
  );
};
