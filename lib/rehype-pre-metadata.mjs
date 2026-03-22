import { visit } from 'unist-util-visit';

export function rehypePreMetadata() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre') {
        const codeNode = node.children?.find((child) => child.tagName === 'code');

        if (codeNode?.tagName === 'code') {
          const content = codeNode.children?.[0]?.value || '';
          const lines = content.split('\n').length;

          const meta = node.meta || codeNode.data?.meta || '';

          // if (lines > 15 || meta.includes('collapsible')) {
          //   node.properties['data-collapsible'] = 'true'
          // }

          if (meta.includes('collapsible')) {
            node.properties['data-collapsible'] = 'true';
          }
        }
      }
    });
  };
}
