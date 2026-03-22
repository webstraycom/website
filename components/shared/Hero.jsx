import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export const Hero = ({ announcement = {}, title, description, children }) => {
  return (
    <div className="flex flex-col items-center gap-4 px-5 py-10 md:mx-20 md:px-10 md:py-20">
      {announcement.text && announcement.link && (
        <Badge asChild variant="secondary" className="cursor-pointer border-none outline-none">
          <Link href={announcement.link}>
            <span className="bg-foreground flex size-1.5 rounded-full" title="New"></span>
            {announcement.text}
            <ArrowRight />
          </Link>
        </Badge>
      )}
      <h1 className="text-primary leading-tighter max-w-4xl text-center text-3xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
        {title}
      </h1>
      <p className="text-foreground max-w-4xl max-w-xl text-center text-base text-balance sm:text-lg">
        {description}
      </p>
      <div className="flex w-full justify-center">{children}</div>
    </div>
  );
};
