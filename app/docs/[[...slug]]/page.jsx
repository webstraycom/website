import { docs } from '@content';
import { docsConfig } from '@/config/docs';
import { Mdx } from '@/components/mdx-components';
import { DocsSidebar } from '@/components/mdx/docs-sidebar';
import { TableOfContents } from '@/components/mdx/toc';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/Footer';
import { CopyPageButton } from '@/components/mdx/copy-button';

const DEFAULT_ROOT = 'general';

const getSlugPath = (slug) => Array.isArray(slug) ? slug.join('/') : (slug || '');

const getDocFromSlug = (slugPath) => {
  const target = slugPath || DEFAULT_ROOT;
  return docs.find((d) => d.slug === target);
};

const getDocNeighbours = (currentFolder, slugPath) => {
  const currentSection = docsConfig[currentFolder] || [];
  const flatItems = currentSection.flatMap(group => group.items);
  
  const currentIndex = flatItems.findIndex(item => item.href === `/docs/${slugPath}`);
  
  return {
    prevDoc: flatItems[currentIndex - 1] ?? null,
    nextDoc: flatItems[currentIndex + 1] ?? null
  };
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = getDocFromSlug(getSlugPath(slug));

  if (!doc) return {};

  const title = doc.title;
  const description = doc.description || 'Documentation';

  return {
    title: `${title} - WebStray Documentation`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
        },
      ],
    },
  };
}

export const PageButtons = ({ currentDoc, prevDoc, nextDoc }) => {
  return (
    <div className='flex items-start md:items-center gap-1.5'>
      <CopyPageButton doc={currentDoc} />
      {prevDoc && (
        <Button asChild variant="secondary" size='icon-sm' className="size-8 md:size-7">
          <Link href={prevDoc.href}>
            <ArrowLeft />
          </Link>
        </Button>
      )}
      {nextDoc && (
        <Button asChild variant="secondary" size='icon-sm' className="size-8 md:size-7">
          <Link href={nextDoc.href}>
            <ArrowRight />
          </Link>
        </Button>
      )}
    </div>
  )
}

export default async function DocPage({ params }) {
  const { slug } = await params;
  
  const slugPath = getSlugPath(slug);
  const currentFolder = (Array.isArray(slug) && slug[0]) || DEFAULT_ROOT;

  if (!slugPath || slugPath === 'general') {
    redirect('/docs/general/changelog');
  }

  const doc = getDocFromSlug(slugPath);
  if (!doc) notFound();

  const { prevDoc, nextDoc } = getDocNeighbours(currentFolder, slugPath);

  return (
    <div className="flex flex-1 flex-col xl:px-6">
      <main className="mt-14 max-w-7xl px-5 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 xl:mx-auto xl:grid-cols-[240px_minmax(0,720px)_240px] xl:px-0">
        <aside className="relative hidden text-sm lg:block">
          <div className="sticky top-14 flex h-[calc(100vh-3.5rem)] w-[240px] overflow-y-auto py-8 xl:flex">
            <DocsSidebar folder={currentFolder} />
            <Separator
              orientation="vertical"
              className="via-border absolute top-12 right-2 bottom-0 hidden h-full w-px bg-gradient-to-b from-transparent to-transparent lg:flex"
            />
          </div>
        </aside>
        <article className="flex w-full min-w-0 flex-col gap-6 py-8 text-neutral-800 dark:text-neutral-300">
          <div className="flex w-full flex-col gap-6 md:mx-auto md:max-w-[40rem]">
            <div className="flex flex-col gap-2">
              <div className='flex gap-4 justify-between'>
                <h1 className="!m-0 !text-3xl font-semibold tracking-tight sm:text-3xl break-words min-w-0">
                  {doc.title}
                </h1>
                <PageButtons currentDoc={doc} prevDoc={prevDoc} nextDoc={nextDoc} />
              </div>
              <p className="text-muted-foreground text-[1.05rem] sm:text-base sm:text-balance md:max-w-[80%]">
                {doc.description}
              </p>
            </div>
            <Mdx code={doc.content} />
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
              {prevDoc && (
                <Button asChild variant="secondary" className="w-full md:w-fit">
                  <Link href={prevDoc.href}>
                    <ArrowLeft className="h-4 w-4" />
                    {prevDoc.title}
                  </Link>
                </Button>
              )}
              {nextDoc && (
                <Button asChild variant="secondary" className="w-full md:w-fit md:ml-auto">
                  <Link href={nextDoc.href}>
                    {nextDoc.title}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
            <Footer className="!p-0" />
          </div>
        </article>
        <aside className="relative hidden text-sm xl:block">
          <div className="sticky top-14 flex h-[calc(100vh-3.5rem)] w-[240px] flex-col gap-2 overflow-hidden py-8 xl:flex">
            <p className="font-medium tracking-tight">On This Page</p>
            <TableOfContents toc={doc.toc} />
          </div>
        </aside>
      </main>
    </div>
  );
}
