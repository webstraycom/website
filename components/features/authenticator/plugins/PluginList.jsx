import { CircleAlertIcon } from 'lucide-react';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { PluginListClient } from '@/components/features/authenticator/plugins/PluginListClient';
import { REPOSITORIES } from '@/config/github';

const ErrorMessage = () => (
  <Empty className="w-full">
    <EmptyHeader>
      <EmptyMedia className="bg-accent size-8" variant="icon">
        <CircleAlertIcon />
      </EmptyMedia>
      <EmptyTitle className="text-sm">Failed to load plugins list</EmptyTitle>
      <EmptyDescription>
        Please reload the page or try again later.
      </EmptyDescription>
    </EmptyHeader>
  </Empty>
);

export const PluginList = async () => {
  try {
    const response = await fetch(REPOSITORIES.PLUGIN_REGISTRY.REGISTRY_URL);

    if (!response.ok) return (
      <ErrorMessage />
    );

    const plugins = await response.json();

    return <PluginListClient initialPlugins={plugins} />;
  } catch {
    return <ErrorMessage />
  }
}
