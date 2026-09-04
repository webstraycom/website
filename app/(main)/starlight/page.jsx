import { StarlightPlaygroundDialog } from '@/components/features/starlight/starlight-playground-dialog';
import { Hero } from '@/components/shared/hero';
import { Button } from '@/components/ui/button';
import { REPOSITORIES } from '@/config/github';

const title = 'WebStray Starlight';
const description =
  'Starlight is a web service designed to generate dynamic preview images for GitHub repositories.';

export const generateMetadata = () => {
  return {
    title,
    openGraph: {
      title,
      description,
      images: [
        `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
      ],
    },
  };
};

export default function StarlightPage() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Hero
        announcement={{
          text: 'Starlight is now powered by Next.js',
          link: '/docs/starlight',
        }}
        title={title}
        description={description}
      >
        <div className="flex gap-2">
          <StarlightPlaygroundDialog />
          <Button asChild size="default">
            <a href={REPOSITORIES.STARLIGHT} target="_blank" rel="noreferrer">
              Open on GitHub
            </a>
          </Button>
        </div>
      </Hero>
    </div>
  );
}
