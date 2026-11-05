'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const VALUES = ['814602', '987654', '024852'];

const TotpPreviewItem = ({ initialIndex = 0 }) => {
  const [index, setIndex] = useState(initialIndex);
  const currentToken = VALUES[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % VALUES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1.5 select-none">
      {currentToken.split('').map((char, charIndex) => (
        <span
          key={charIndex}
          className={`bg-popover relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-md border font-mono font-medium ${charIndex === 2 ? 'mr-1.5' : ''}`}
        >
          <AnimatePresence mode="popLayout">
            <motion.span
              key={`${index}-${charIndex}`}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: charIndex * 0.05,
              }}
              className="absolute inset-0 flex items-center justify-center text-base will-change-transform"
            >
              {char}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </div>
  );
};

export const TotpPreview = () => (
  <div className="flex flex-col gap-4" aria-hidden="true">
    <TotpPreviewItem />
    <TotpPreviewItem initialIndex={1} />
    <TotpPreviewItem initialIndex={2} />
  </div>
);
