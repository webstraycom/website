import { ArrowDownIcon } from 'lucide-react';
import { Hero } from '@/components/shared/Hero';
import { Button } from '@/components/ui/button';
import { AuthenticatorBentoGrid } from '@/components/features/authenticator/AuthenticatorBentoGrid';
import { REPOSITORIES } from '@/config/github';

const title = 'WebStray Authenticator';
const description =
  'Secure, hardware-bound desktop password manager. Built for privacy. Engineered for extensibility. Powered by NW.js.';

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

export default function AuthenticatorPage() {
  return (
    <div className="flex flex-col justify-center">
      <Hero
        announcement={{
          text: 'Authenticator Plugin Registry',
          link: '/authenticator/plugins',
        }}
        title={title}
        description={description}
        className="pt-10 !pb-8"
      >
        <div className="flex w-full flex-col gap-2 min-[375px]:w-fit min-[375px]:flex-row">
          <Button variant="outline" asChild size="default">
            <a href={REPOSITORIES.AUTHENTICATOR} target="_blank" rel="noreferrer">
              Open on GitHub
            </a>
          </Button>
          <Button asChild size="default" className="gap-1">
            <a href={`${REPOSITORIES.AUTHENTICATOR}/releases/latest`} target="_blank" rel="noreferrer">
              <ArrowDownIcon />
              Download for Windows
            </a>
          </Button>
        </div>
      </Hero>
      <AuthenticatorBentoGrid />
    </div>
  );
}
