import { ArrowRight } from 'lucide-react';
import { Hero } from '@/components/shared/Hero';
import { Button } from '@/components/ui/button';

const CONFIG = { USER: 'webstraycom', REPO: 'cli', };
const REPOSITORY_URL = `https://github.com/${CONFIG.USER}/${CONFIG.REPO}`;
const RELEASES_URL = `https://github.com/${CONFIG.USER}/${CONFIG.REPO}/releases/latest`;

const title = 'WebStray CLI';
const description = 'Unified command-line interface for WebStray products. Instant. Interactive. Scriptable. Powered by Node.js.';

export const generateMetadata = () => {
  return {
    title: title,
    openGraph: {
      title: title,
      description: description,
      images: [
        `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
      ],
    },
  };
}

export default function CliPage() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Hero
        announcement={{
          text: "CLI Documentation",
          link: '/docs/cli',
        }}
        title={title}
        description={description}
      >
        <div className="flex gap-2">
          <Button variant="outline" asChild size="default">
            <a href={REPOSITORY_URL} target="_blank" rel="noreferrer">
              Open on GitHub
            </a>
          </Button>
          <Button asChild size="default" className="gap-1">
            <a href={RELEASES_URL} target="_blank" rel="noreferrer">
              Download CLI
              <ArrowRight />
            </a>
          </Button>
        </div>
      </Hero>
    </div>
  );
}
