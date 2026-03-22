import { Hero } from '@/components/shared/Hero';
import { Button } from '@/components/ui/button';
import { StarlightPlaygroundDialog } from '@/components/features/starlight/StarlightPlaygroundDialog';

export async function generateMetadata() {
  const title = 'Starlight';
  const description =
    'Starlight is a web application designed to generate preview images for GitHub repositories.';

  return {
    title: 'Starlight by WebStray',
    openGraph: {
      title: title,
      description: description,
      images: [
        `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
      ],
    },
  };
}

export default function StarlightPage() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Hero
        announcement={{
          text: "Starlight is out! See what's new",
          link: 'https://github.com/webstraycom/starlight',
        }}
        title="Starlight by WebStray"
        description="Starlight is a web application designed to generate preview images for GitHub repositories."
      >
        <div className="flex gap-2">
          <StarlightPlaygroundDialog />
          <Button asChild size="default">
            <a href="https://github.com/webstraycom/starlight" target="_blank" rel="noreferrer">
              Open on GitHub
            </a>
          </Button>
        </div>
      </Hero>
    </div>
  );
}
