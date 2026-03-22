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
import { DotPattern } from '@/components/ui/dot-pattern';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { GridPattern } from '@/components/ui/grid-pattern';
import { NumberTicker } from '@/components/ui/number-ticker';
import { Ripple } from '@/components/ui/ripple';
import { TotpPreview } from '@/components/features/authenticator/TotpPreview';
import { NotificationStackPreview } from '@/components/features/authenticator/NotificationStackPreview';
import { ComandPalettePreview } from '@/components/features/authenticator/ComandPalettePreview';
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
      'dark:bg-muted/30 bg-background flex flex-col overflow-hidden rounded-xl border shadow-xs md:min-h-[280px] dark:shadow-none',
      className,
    )}
  >
    <div className={cn('flex flex-col justify-between p-4', headerClassName)}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-base font-medium">
          <Icon className="size-4" />
          {title}
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="text-muted-foreground hidden text-sm md:block">{footer}</div>
    </div>
    <div
      className={cn('relative hidden flex-1 items-center justify-center md:flex', contentClassName)}
    >
      {children}
    </div>
  </div>
);

const MetricsRow = ({ label, value, className }) => (
  <div
    className={cn(
      'bg-background text-muted-foreground z-2 flex w-50 items-center justify-between rounded-lg border px-2 py-1 dark:bg-neutral-900',
      className,
    )}
  >
    <p>{label}</p>
    <div className="flex items-baseline gap-1 font-mono">
      <NumberTicker
        value={value}
        decimalPlaces={2}
        className="!text-muted-foreground font-mono tracking-tighter whitespace-pre-wrap"
      />
      <span>ms</span>
    </div>
  </div>
);

export const AuthenticatorBentoGrid = () => {
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-3 px-4 text-sm md:max-w-[800px] md:grid-cols-2 md:px-6 lg:px-6 xl:max-w-[1200px] xl:grid-cols-4">
      <BentoCard
        title="Zero-Knowledge Model"
        description={
          <>
            All sensitive data is <span className="text-foreground">encrypted locally</span> and{' '}
            <span className="text-foreground">never leaves</span> your machine.
          </>
        }
        footer={
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex items-center gap-1">
              <CheckIcon className="size-3" />
              Hardware-Bound Security
            </div>
            <div className="flex items-center gap-1">
              <CheckIcon className="size-3" />
              Local-Only Encryption
            </div>
            <div className="flex items-center gap-1">
              <CheckIcon className="size-3" />
              No Cloud Syncing
            </div>
          </div>
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
        className="md:col-span-1"
      >
        <DotPattern className="[mask-image:radial-gradient(150px_circle_at_center,rgba(255,255,255,0.4),transparent)]" />
        <div className="bg-background border-border z-2 flex items-center gap-1 rounded-full border px-2 py-1 dark:bg-neutral-900">
          <CpuIcon className="text-muted-foreground size-3.5" />
          <AnimatedShinyText>Machine ID</AnimatedShinyText>
        </div>
      </BentoCard>

      <BentoCard
        title="Secure Data Portability"
        description={
          <>
            Built-in utilities for importing and exporting{' '}
            <span className="text-foreground">encrypted JSON</span>.
          </>
        }
        icon={ArrowDownUp}
        className="md:col-span-1"
      >
        <GridPattern
          width={25}
          height={25}
          strokeDasharray={'4 2'}
          className={cn(
            '[mask-image:radial-gradient(120px_circle_at_center,rgba(255,255,255,0.3),transparent)]',
          )}
        />
        <NotificationStackPreview />
      </BentoCard>

      <BentoCard
        title="Extensible Plugin System"
        description={
          <>
            A robust core architecture implementing <span className="text-foreground">DI</span> and{' '}
            <span className="text-foreground">IoC patterns</span>.
          </>
        }
        icon={PackageIcon}
        className="md:col-span-1"
      >
        <DotPattern className="[mask-image:radial-gradient(150px_circle_at_center,rgba(255,255,255,0.4),transparent)]" />
        <div className="bg-background z-2 rounded-xl border p-3 dark:bg-neutral-900">
          <PackageIcon className="text-muted-foreground size-8" />
        </div>
      </BentoCard>

      <BentoCard
        title="Persistent Storage"
        description={
          <>
            High-performance, NeDB-based <span className="text-foreground">storage engine</span>.
          </>
        }
        icon={DatabaseIcon}
        className="md:col-span-1"
        contentClassName="flex-col gap-4"
      >
        <GridPattern
          width={24}
          height={24}
          className={cn(
            'top-1 [mask-image:radial-gradient(200px_circle_at_center,rgba(255,255,255,0.1),transparent)]',
          )}
        />
        <MetricsRow label="Importing Data" value={264.84} className="mr-5" />
        <MetricsRow label="Exporting Data" value={426.18} className="ml-5" />
        <MetricsRow label="Fetching Data" value={140.48} className="mr-5" />
      </BentoCard>

      <BentoCard
        title="Command-Driven Navigation"
        description={
          <>
            Built-in <span className="text-foreground">Command Palette</span> for instant
            keyboard-centric workflows.
          </>
        }
        icon={CommandIcon}
        className="max-h-[280px] overflow-hidden md:col-span-1"
        contentClassName="flex-col gap-4"
      >
        <div className="min-h-[245px] w-full max-w-2xs overflow-hidden px-4">
          <ComandPalettePreview />
        </div>
      </BentoCard>

      <BentoCard
        title="High-Performance UI"
        description={
          <>
            Fluid interface transitions and state-driven animations using{' '}
            <span className="text-foreground">Framer</span>.
          </>
        }
        icon={PencilRulerIcon}
        className="md:col-span-1"
        contentClassName="flex-col gap-4"
      >
        <GridPattern
          width={124}
          height={48}
          x="49.7%"
          y={10}
          strokeDasharray={'4 2'}
          className={cn(
            'top-1 [mask-image:radial-gradient(200px_circle_at_center,rgba(255,255,255,0.5),transparent)]',
          )}
        />
        <TotpPreview />
        <TotpPreview initialIndex={1} />
        <TotpPreview initialIndex={2} />
      </BentoCard>
    </div>
  );
};
