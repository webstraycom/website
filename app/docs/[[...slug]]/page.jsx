import { docs } from '@content';
import { Mdx } from '@/components/mdx-components';
import { DocsSidebar } from '@/components/mdx/docs-sidebar';
import { TableOfContents } from '@/components/mdx/toc';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/Footer';

const DEFAULT_ROOT = 'general';

const getDocFromParams = (slug) => {
  const targetSlug = slug && slug.length > 0 ? slug.join('/') : DEFAULT_ROOT;

  return docs.find((d) => d.slug === targetSlug);
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = getDocFromParams(slug);

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

export default async function DocPage({ params }) {
  const { slug } = await params;

  const slugPath = slug ? (Array.isArray(slug) ? slug.join('/') : slug) : '';

  if (slugPath === 'general' || slugPath === '') {
    redirect('/docs/general/changelog');
  }

  const doc = getDocFromParams(slug);

  if (!doc) return notFound();

  const currentFolder = slug && slug.length > 0 ? slug[0] : DEFAULT_ROOT;

  const folderDocs = docs.filter((d) => d.slug.startsWith(currentFolder));
  const currentIndex = folderDocs.findIndex((d) => d.slug === doc.slug);

  const prevDoc = folderDocs[currentIndex - 1];
  const nextDoc = folderDocs[currentIndex + 1];

  return (
    <div className="flex flex-1 flex-col xl:px-6">
      <main className="mt-14 max-w-7xl px-5 lg:grid lg:grid-cols-[240px_1fr] lg:gap-10 xl:mx-auto xl:grid-cols-[240px_1fr_240px] xl:px-0">
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
          <div className="flex w-full flex-col gap-6 md:mx-auto md:max-w-[40rem] xl:max-w-3xl">
            <div className="flex flex-col gap-2">
              <h1 className="!m-0 !text-3xl font-semibold tracking-tight sm:text-3xl">
                {doc.title}
              </h1>
              <p className="text-muted-foreground text-[1.05rem] sm:text-base sm:text-balance md:max-w-[80%]">
                {doc.description}
              </p>
            </div>
            <Mdx code={doc.content} />
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
              {prevDoc ? (
                <Button asChild variant="secondary" className="w-full md:w-fit">
                  <Link href={`/docs/${prevDoc.slug}`}>
                    <ArrowLeft className="h-4 w-4" />
                    {prevDoc.title}
                  </Link>
                </Button>
              ) : (
                <div />
              )}
              {nextDoc ? (
                <Button asChild variant="secondary" className="w-full md:w-fit">
                  <Link href={`/docs/${nextDoc.slug}`}>
                    {nextDoc.title}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <div />
              )}
            </div>
            <Footer className="!p-0" />
          </div>
        </article>
        <aside className="relative hidden text-sm xl:block">
          <div className="sticky top-14 flex h-[calc(100vh-3.5rem)] w-[240px] flex-col gap-3 overflow-hidden py-8 xl:flex">
            <p className="font-medium tracking-tight">On This Page</p>
            <TableOfContents toc={doc.toc} />
          </div>
        </aside>
      </main>
    </div>
  );
}
