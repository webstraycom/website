import { CircleAlertIcon } from 'lucide-react';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { PluginListClient } from '@/components/features/authenticator/plugins/plugin-list-client';
import { REPOSITORIES } from '@/config/github';

const getPlugins = async () => {
  try {
    const response = await fetch(REPOSITORIES.PLUGIN_REGISTRY.REGISTRY_URL, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
};

const ErrorMessage = () => (
  <Empty className="w-full">
    <EmptyHeader>
      <EmptyMedia className="bg-accent size-8" variant="icon">
        <CircleAlertIcon />
      </EmptyMedia>
      <EmptyTitle className="text-sm">Failed to load plugins list</EmptyTitle>
      <EmptyDescription>Please reload the page or try again later.</EmptyDescription>
    </EmptyHeader>
  </Empty>
);

export const PluginList = async () => {
  const plugins = await getPlugins();

  if (!plugins) {
    return <ErrorMessage />;
  }

  return <PluginListClient initialPlugins={plugins} />;
};
