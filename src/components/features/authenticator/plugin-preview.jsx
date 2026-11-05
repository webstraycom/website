import {
  ArchiveIcon,
  BellRingIcon,
  BrushCleaningIcon,
  CalendarClockIcon,
  EthernetPortIcon,
  GaugeIcon,
  HardDriveIcon,
  InboxIcon,
  KeySquareIcon,
  MailIcon,
  SaveIcon,
  SearchIcon,
  StarIcon,
  Trash2Icon,
  UserLockIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ROW_1_ICONS = [BellRingIcon, InboxIcon, Trash2Icon, StarIcon, SaveIcon];
const ROW_2_ICONS = [SearchIcon, ArchiveIcon, BrushCleaningIcon, KeySquareIcon, HardDriveIcon];
const ROW_3_ICONS = [EthernetPortIcon, UserLockIcon, MailIcon, CalendarClockIcon, GaugeIcon];

const PluginPreviewRow = ({ icons, className }) => {
  const doubledIcons = [...icons, ...icons];

  return (
    <div className={cn('flex w-max', className)}>
      {doubledIcons.map((Icon, index) => (
        <div key={index} className="pr-2">
          <div className="bg-popover text-muted-foreground hover:bg-muted hover:border-primary/30 hover:text-foreground z-2 rounded-lg border p-2.5">
            <Icon className="size-5" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const PluginPreview = () => (
  <div
    className="flex w-full flex-col gap-2 [mask-image:linear-gradient(to_right,transparent,white,transparent)]"
    aria-hidden="true"
  >
    <PluginPreviewRow icons={ROW_1_ICONS} className="-translate-x-1/6" />
    <PluginPreviewRow icons={ROW_2_ICONS} />
    <PluginPreviewRow icons={ROW_3_ICONS} className="-translate-x-1/6" />
  </div>
);
