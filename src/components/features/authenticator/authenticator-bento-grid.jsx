import {
  ArrowDownUp,
  CheckIcon,
  CommandIcon,
  CpuIcon,
  DatabaseIcon,
  GlobeLockIcon,
  PackageIcon,
  PencilRulerIcon,
  UserRoundKeyIcon,
} from 'lucide-react';
import { CommandPalettePreview } from '@/components/features/authenticator/command-palette-preview';
import { NotificationStackPreview } from '@/components/features/authenticator/notification-stack-preview';
import { PluginPreview } from '@/components/features/authenticator/plugin-preview';
import { StorageMetricsPreview } from '@/components/features/authenticator/storage-metrics-preview';
import { TotpPreview } from '@/components/features/authenticator/totp-preview';
import { DotPattern } from '@/components/ui/dot-pattern';
import { Ripple } from '@/components/ui/ripple';
import { cn } from '@/lib/utils';

const BentoCard = ({
  title,
  description,
  footer,
  icon: Icon,
  children,
  className,
  headerClassName,
  contentClassName,
}) => (
  <div
    className={cn(
      'dark:bg-muted/30 bg-background flex flex-col overflow-hidden rounded-xl border md:h-[280px]',
      className,
    )}
  >
    <div className={cn('flex flex-col justify-between p-4', headerClassName)}>
      <div className="flex flex-col gap-2">
        <h3 className="flex items-center gap-1.5 text-base font-medium">
          <Icon className="size-4" />
          {title}
        </h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {footer && <div className="text-muted-foreground hidden text-sm md:block">{footer}</div>}
    </div>
    <div
      className={cn('relative hidden flex-1 items-center justify-center md:flex', contentClassName)}
    >
      {children}
    </div>
  </div>
);

export const AuthenticatorBentoGrid = () => {
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-3 px-4 text-sm md:max-w-[800px] md:grid-cols-2 md:px-6 lg:px-6 xl:max-w-[1200px] xl:grid-cols-4">
      <BentoCard
        title="Zero-Knowledge Architecture"
        description={
          <>
            All sensitive data is <span className="text-foreground">encrypted locally</span> and{' '}
            <span className="text-foreground">never leaves</span> your machine.
          </>
        }
        footer={
          <ul className="flex flex-col gap-2 text-xs">
            <li className="flex items-center gap-1">
              <CheckIcon className="size-3" />
              Hardware-bound security
            </li>
            <li className="flex items-center gap-1">
              <CheckIcon className="size-3" />
              Local-only encryption
            </li>
            <li className="flex items-center gap-1">
              <CheckIcon className="size-3" />
              No cloud syncing
            </li>
          </ul>
        }
        icon={UserRoundKeyIcon}
        className="flex-row md:col-span-2"
        headerClassName="md:w-1/2 h-full"
      >
        <div className="relative flex h-full w-full items-center justify-center">
          <Ripple mainCircleSize={70} numCircles={4} />
          <GlobeLockIcon className="text-muted-foreground size-5" />
        </div>
      </BentoCard>

      <BentoCard
        title="Hardware Binding"
        description={
          <>
            Database access is cryptographically tied to a unique{' '}
            <span className="text-foreground">machine ID</span>.
          </>
        }
        icon={CpuIcon}
      >
        <DotPattern className="[mask-image:radial-gradient(150px_circle_at_center,rgba(255,255,255,0.4),transparent)]" />
        <div className="bg-popover z-2 flex items-center gap-1 rounded-full border px-2 py-1">
          <CpuIcon className="text-muted-foreground size-3.5" />
          <span className="shimmer shimmer-duration-2500 shimmer-angle-0 text-muted-foreground">
            Machine ID
          </span>
        </div>
      </BentoCard>

      <BentoCard
        title="Secure Data Portability"
        description={
          <>
            Import and export of JSON data with{' '}
            <span className="text-foreground"> encrypted sensitive values</span>.
          </>
        }
        icon={ArrowDownUp}
      >
        <NotificationStackPreview />
      </BentoCard>

      <BentoCard
        title="Extensible Plugin System"
        description={
          <>
            An extensible architecture for{' '}
            <span className="text-foreground">additional functionality</span> integration.
          </>
        }
        icon={PackageIcon}
      >
        <PluginPreview />
      </BentoCard>

      <BentoCard
        title="Persistent Storage"
        description={
          <>
            High-performance, local <span className="text-foreground">storage engine</span> for
            secure data retention.
          </>
        }
        icon={DatabaseIcon}
      >
        <StorageMetricsPreview />
      </BentoCard>

      <BentoCard
        title="Command-Driven Navigation"
        description={
          <>
            Built-in <span className="text-foreground">command palette</span> for instant
            keyboard-centric workflows.
          </>
        }
        icon={CommandIcon}
      >
        <div className="w-full max-w-2xs px-4">
          <CommandPalettePreview />
        </div>
      </BentoCard>

      <BentoCard
        title="Modern Interface"
        description={
          <>
            Clean, minimal design with <span className="text-foreground">fluid transitions</span>{' '}
            and <span className="text-foreground">visual feedback</span>.
          </>
        }
        icon={PencilRulerIcon}
      >
        <TotpPreview />
      </BentoCard>
    </div>
  );
};
