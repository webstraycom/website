'use client';

import * as runtime from 'react/jsx-runtime';
import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getIconForLanguageExtension } from '@/components/mdx/icons';
import { cn } from '@/lib/utils';

const useMDXComponent = (code) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const sharedComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn('font-heading mt-2 scroll-m-28 text-3xl font-bold tracking-tight', className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => {
    return (
      <h2
        className={cn(
          'font-heading [&+]*:[code]:text-xl mt-10 scroll-m-20 border-none text-xl font-medium tracking-tight first:mt-0 lg:mt-12 [&_h2:first-child]:mt-0 [&+.steps]:!mt-0 [&+.steps>h3]:!mt-4 [&+h3]:!mt-6 [&+p]:!mt-4',
          className,
        )}
        {...props}
      />
    );
  },
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        'font-heading mt-12 scroll-m-20 text-lg font-medium tracking-tight first:mt-0 [&+p]:!mt-4 *:[code]:text-xl',
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        'font-heading mt-8 scroll-m-20 text-base font-medium tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }) => (
    <h5
      className={cn('mt-8 scroll-m-20 text-base font-medium tracking-tight', className)}
      {...props}
    />
  ),
  h6: ({ className, ...props }) => (
    <h6
      className={cn('mt-8 scroll-m-20 text-base font-medium tracking-tight', className)}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        'focus-visible:text-foreground font-medium underline underline-offset-4 focus-visible:underline focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn('text-[15px] leading-relaxed [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong className={cn('text-[15px] font-medium', className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn('my-6 ml-6 list-disc text-[15px]', className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn('my-6 ml-6 list-decimal text-[15px]', className)} {...props} />
  ),
  li: ({ className, ...props }) => <li className={cn('mt-2 text-[15px]', className)} {...props} />,
  blockquote: ({ className, ...props }) => (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props} />
  ),
  img: ({ className, alt, ...props }) => (
    <img className={cn('rounded-md', className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }) => (
    <div className="no-scrollbar my-6 w-full overflow-y-auto rounded-xl border">
      <table
        className={cn(
          'relative w-full overflow-hidden border-none text-sm [&_tbody_tr:last-child]:border-b-0',
          className,
        )}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }) => <tr className={cn('m-0 border-b', className)} {...props} />,
  th: ({ className, ...props }) => (
    <th
      className={cn(
        'px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        'px-4 py-2 text-left whitespace-nowrap [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, children, ...props }) => {
    const preRef = useRef(null);
    const timeoutRef = useRef(null);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    const handleCopy = async () => {
      if (preRef.current) {
        const content = preRef.current.innerText;
        await navigator.clipboard.writeText(content);
        setIsCopied(true);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }
    };

    return (
      <div className="group relative z-5">
        <pre
          ref={preRef}
          className={cn(
            'no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 font-mono outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0',
            className,
          )}
          {...props}
        >
          {children}
        </pre>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleCopy}
          className={cn(
            'bg-code absolute right-2 z-20 size-7 transition-all',
            '[[data-rehype-pretty-code-figure]:has(figcaption)_&]:top-[-35px]',
            '[[data-rehype-pretty-code-figure]:not(:has(figcaption))_&]:top-1/2 [[data-rehype-pretty-code-figure]:not(:has(figcaption))_&]:-translate-y-1/2',
            '[[data-rehype-pretty-code-figure]:not(:has(figcaption)):has([data-line]+[data-line])_&]:top-2 [[data-rehype-pretty-code-figure]:not(:has(figcaption)):has([data-line]+[data-line])_&]:translate-y-0',
          )}
        >
          {isCopied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </Button>
      </div>
    );
  },
  figure: ({ className, ...props }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isCollapsible = props['data-collapsible'] === 'true';

    return (
      <figure
        className={cn(
          'group relative overflow-hidden',
          !isExpanded && isCollapsible ? 'max-h-[300px]' : 'max-h-none',
          className,
        )}
        {...props}
      >
        {props.children}
        {isCollapsible && (
          <div className={cn('absolute inset-x-0 bottom-0', 'flex flex-col')}>
            <div
              className={cn(
                'from-code via-code/50 flex h-20 w-full items-end justify-center bg-gradient-to-t to-transparent',
                isExpanded && 'h-fit pt-2.5 pb-6',
              )}
            >
              <Button
                variant="secondary"
                size="sm"
                onClick={() => (!isExpanded ? setIsExpanded(true) : setIsExpanded(false))}
              >
                {!isExpanded ? 'Expand' : 'Collapse'}
              </Button>
            </div>
            {!isExpanded && <div className="bg-code h-6 w-full"></div>}
          </div>
        )}
      </figure>
    );
  },
  figcaption: ({ className, children, ...props }) => {
    const iconExtension =
      'data-language' in props && typeof props['data-language'] === 'string'
        ? getIconForLanguageExtension(props['data-language'])
        : null;

    return (
      <figcaption
        className={cn(
          'text-muted-foreground [&_svg]:text-code-foreground flex items-center gap-2 font-mono [&_svg]:size-4 [&_svg]:opacity-70',
          className,
        )}
        {...props}
      >
        {iconExtension}
        {children}
      </figcaption>
    );
  },
  code: ({ className, ...props }) => {
    if (typeof props.children === 'string') {
      return (
        <code
          className={cn(
            'bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] break-words outline-none',
            className,
          )}
          {...props}
        />
      );
    }

    return <code className={cn('relative !font-mono text-sm', className)} {...props} />;
  },
  Step: ({ className, ...props }) => <h4 {...props} />,
  Steps: ({ className, ...props }) => (
    <div
      className={cn(
        '[&>h4]:step steps mb-12 [counter-reset:step] md:ml-4 md:border-l md:pl-8 [&>p]:text-[15px]',
        className,
      )}
      {...props}
    />
  ),
  Callout: ({ className, children, variant = 'default', ...props }) => (
    <div
      className={cn(
        'bg-muted/50 border-foreground-500-50 text-surface-foreground callout mt-6 w-auto rounded-xl p-4 first:mt-0',
        variant === 'success' && 'border-green-400/50 bg-green-400/10 text-green-400',
        variant === 'danger' && 'border-red-400/50 bg-red-400/10 text-red-400',
        variant === 'warning' && 'border-amber-400/50 bg-amber-400/10 text-amber-400',
        variant === 'info' && 'border-blue-400/50 bg-blue-400/10 text-blue-400',
        className,
      )}
      {...props}
    >
      <div className="text-[15px] leading-relaxed">{children}</div>
    </div>
  ),
};

export function Mdx({ code, components }) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={{ ...sharedComponents, ...components }} />
    </div>
  );
}
