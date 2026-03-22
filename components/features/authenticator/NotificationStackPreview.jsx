'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CircleCheckIcon, LoaderIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ITEMS = [
  { id: '1', text: 'Encrypting data...', icon: <LoaderIcon className="size-4 animate-spin" /> },
  { id: '2', text: 'Exported 10 items!', icon: <CircleCheckIcon className="size-4" /> },
  { id: '3', text: 'Decrypting data...', icon: <LoaderIcon className="size-4 animate-spin" /> },
  { id: '4', text: 'Imported 10 items!', icon: <CircleCheckIcon className="size-4" /> },
];

export const NotificationStackPreview = () => {
  const [items, setItems] = useState(ITEMS);

  const nextItem = useCallback(() => {
    setItems((prev) => {
      const [first, ...rest] = prev;
      const newItem = { ...first, id: `${first.id}-${Date.now()}` };
      return [...rest, newItem];
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(nextItem, 7500);
    return () => clearInterval(timer);
  }, [nextItem, items]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative h-12 w-52 cursor-pointer select-none" onClick={nextItem}>
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.7, y: -50 }}
              animate={{
                opacity: 1,
                y: -index * 10,
                scale: 1 - index * 0.06,
                zIndex: items.length - index,
              }}
              exit={{
                opacity: 0,
                y: 40,
                zIndex: 5,
                transition: { duration: 0.3, ease: 'easeInOut' },
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                mass: 1.2,
              }}
              className="bg-background absolute inset-0 flex items-center justify-center rounded-lg border text-neutral-600 shadow-xs outline-none backface-hidden dark:bg-neutral-900 dark:text-neutral-300 dark:shadow-none"
            >
              <div className={cn(`flex w-full items-center gap-2 pl-3`, index === 3 && 'hidden')}>
                {item.icon}
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
