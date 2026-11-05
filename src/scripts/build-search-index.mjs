import fs from 'fs/promises';
import path from 'path';

export const buildSearchIndex = async (docs) => {
  console.log(`[Search Index]: Creating search index...`);

  const docsItems = docs.map((doc) => ({
    url: `/docs/${doc.slug}`,
    title: doc.title || 'Untitled',
    description: doc.description || 'There is no description for this page.',
  }));

  const staticPagesItems = [
    {
      url: '/',
      title: 'WebStray Open Source',
      description: 'WebStray is a digital company developing open source software.',
    },
    {
      url: '/authenticator',
      title: 'WebStray Authenticator',
      description: 'Secure, hardware-bound desktop password manager.',
    },
    {
      url: '/authenticator/plugins',
      title: 'Plugin Registry',
      description: 'The official plugin registry for WebStray Authenticator.',
    },
    {
      url: '/cli',
      title: 'WebStray CLI',
      description: 'Unified command-line interface for WebStray products.',
    },
    {
      url: '/starlight',
      title: 'WebStray Starlight',
      description:
        'Web service designed to generate dynamic preview images for GitHub repositories.',
    },
  ];

  const fullIndex = { pages: staticPagesItems, docs: docsItems };
  const totalCount = fullIndex.pages.length + fullIndex.docs.length;

  const outputPath = path.join(process.cwd(), 'public', 'search-index.json');
  await fs.writeFile(outputPath, JSON.stringify(fullIndex, null, 2));

  console.log(`[Search Index]: Search index succesfully created! Total pages: ${totalCount}`);
};
