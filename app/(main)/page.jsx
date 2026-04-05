import { Hero } from '@/components/shared/Hero';
import { Button } from '@/components/ui/button';

const title = 'WebStray Open Source';
const description = `At WebStray, we focus on creating open source technologies. We develop primarily web and cloud technologies, but we're not limited to them. All our products are open source.`;

export async function generateMetadata() {
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

export default function WebStrayPage() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Hero
        announcement={{ text: "Authenticator is out! See what's new", link: '/authenticator' }}
        title={title}
        description={description}
      >
        <div className="flex gap-2">
          <Button asChild variant="outline" size="default">
            <a href="mailto:contact@webstray.com">Contact Us</a>
          </Button>
          <Button asChild size="default">
            <a href="https://github.com/webstraycom" target="_blank" rel="noreferrer">
              Open on GitHub
            </a>
          </Button>
        </div>
      </Hero>
    </div>
  );
}
