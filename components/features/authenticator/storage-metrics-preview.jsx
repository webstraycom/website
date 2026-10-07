import { NumberTicker } from '@/components/ui/number-ticker';
import { cn } from '@/lib/utils';

const MetricsRow = ({ label, value, className }) => (
  <div
    className={cn(
      'bg-popover text-muted-foreground z-2 flex w-50 items-center justify-between rounded-lg border px-2 py-1',
      className,
    )}
  >
    <dt>{label}</dt>
    <dd className="font-mono">
      <span className="sr-only">{value} milliseconds</span>
      <span aria-hidden="true" className="flex items-baseline gap-1">
        <NumberTicker
          value={value}
          decimalPlaces={2}
          className="!text-muted-foreground font-mono tracking-tighter whitespace-pre-wrap"
        />
        <span>ms</span>
      </span>
    </dd>
  </div>
);

export const StorageMetricsPreview = () => {
  return (
    <dl className="flex flex-col gap-4">
      <MetricsRow label="Importing Data" value={264.84} className="mr-5" />
      <MetricsRow label="Exporting Data" value={426.18} className="ml-5" />
      <MetricsRow label="Fetching Data" value={140.48} className="mr-5" />
    </dl>
  );
};
