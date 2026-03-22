'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { CircleCheckIcon, LoaderIcon } from 'lucide-react';

const ITEMS = [
  {
    id: '1',
    text: 'Encrypting data...',
    description: 'Please wait while your passwords encrypting...',
    icon: <LoaderIcon className="size-4 animate-spin" />,
  },
  {
    id: '2',
    text: 'Exported 10 items!',
    description: 'Selected items has been saved to file!',
    icon: <CircleCheckIcon className="size-4" />,
  },
  {
    id: '3',
    text: 'Decrypting data...',
    description: 'Please wait while your passwords decrypting...',
    icon: <LoaderIcon className="size-4 animate-spin" />,
  },
  {
    id: '4',
    text: 'Imported 10 items!',
    description: 'Selected items has been imported to database!',
    icon: <CircleCheckIcon className="size-4" />,
  },
];

export const BoxStack = () => {
  const [activeOffset, setActiveOffset] = useState(0);
  const [hoveredPos, setHoveredPos] = useState(null);

  const nextItem = useCallback(() => {
    setActiveOffset((prev) => (prev + 1) % ITEMS.length);
  }, []);

  return (
    <div className="flex h-full items-end justify-center select-none">
      <div className="relative h-23 w-60 cursor-pointer" onClick={nextItem}>
        {ITEMS.map((item, i) => {
          const position = (i - activeOffset + ITEMS.length) % ITEMS.length;

          let extraY = 0;
          if (hoveredPos !== null && hoveredPos !== 0) {
            if (position === hoveredPos) {
              extraY = position * 15 - 40 - position * 10;
            } else {
              extraY = 30;
            }
          }

          return (
            <motion.div
              key={item.id}
              onMouseEnter={() => setHoveredPos(position)}
              onMouseLeave={() => setHoveredPos(null)}
              layout
              initial={false}
              animate={{
                y: -position * 15 + 8 + extraY,
                scale: 1 - position * 0.06,
                zIndex: ITEMS.length - position,
                opacity: 1,
              }}
              whileTap={{ scale: position === 0 ? 1.02 : 1 - position * 0.06 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 40,
                mass: 2,
              }}
              className="bg-background absolute inset-0 flex items-start justify-center rounded-lg border font-normal shadow-xs dark:bg-neutral-900 dark:shadow-none"
              tabIndex={-1}
            >
              <div className="flex w-full flex-col gap-1 p-3">
                <div className="flex items-center gap-1">
                  {item.icon}
                  <span className="text-sm">{item.text}</span>
                </div>
                <span className="text-muted-foreground text-xs">{item.description}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
