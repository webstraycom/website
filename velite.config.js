import { defineConfig, s } from 'velite';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { rehypePreMetadata } from '@/lib/rehype-pre-metadata.mjs';

export default defineConfig({
  root: 'content',
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      rehypePreMetadata,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: 'github-dark',
            light: 'github-light',
          },
          keepBackground: false,
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
        },
      ],
    ],
  },
  collections: {
    docs: {
      name: 'Doc',
      pattern: '**/*.mdx',
      schema: s.object({
        title: s.string(),
        description: s.string().optional(),
        slug: s.path(),
        content: s.mdx(),
        toc: s.toc(),
        date: s.string().optional(),
      }),
    },
  },
});
