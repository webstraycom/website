import Link from 'next/link';
import { cn } from '@/lib/utils';

export const CustomLink = ({ href, className, ...props }) => {
  const isExternal = href.startsWith('http');
  const style = cn(
    'text-sm font-medium text-muted-foreground hover:text-primary hover:underline focus-visible:text-foreground focus-visible:outline-none focus-visible:underline underline-offset-4',
    className,
  );

  if (isExternal) {
    return <a {...props} href={href} target="_blank" rel="noreferrer" className={style} />;
  }

  return <Link {...props} href={href} className={style} />;
};
