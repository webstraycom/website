import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/shared/Hero';
import { PluginList } from '@/components/features/authenticator/plugins/PluginList';
import { REPOSITORIES } from '@/config/github';

const title = 'Plugin Registry';
const description =
  'The official plugin registry for WebStray Authenticator. Installation is available using WebStray CLI or manually.';

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
};

export default function PluginsPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Hero
        announcement={{
          text: 'Add and create plugins using CLI',
          link: '/docs/cli/authenticator',
        }}
        title={title}
        description={description}
        className="pt-10 !pb-8"
      >
        <div className="flex w-full flex-col gap-2 min-[375px]:w-fit min-[375px]:flex-row">
          <Button variant="outline" asChild size="default">
            <a href={REPOSITORIES.PLUGIN_REGISTRY.REPOSITORY_URL} target="_blank" rel="noreferrer">
              Open on GitHub
            </a>
          </Button>
          <Button asChild size="default" className="gap-1">
            <Link href="/docs/authenticator/plugins">
              Learn More
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </Hero>
      <PluginList />
    </div>
  );
}
