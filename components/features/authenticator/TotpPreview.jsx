'use client';

import { useState, useEffect, Fragment } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const VALUES = ['814602', '987654', '024852'];

export const TotpPreview = ({ initialIndex = 0 }) => {
  const [index, setIndex] = useState(initialIndex);
  const currentToken = VALUES[index];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % VALUES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-1.5">
      {currentToken.split('').map((char, charIndex) => (
        <Fragment key={charIndex}>
          <span className="bg-accent relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-md">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`${index}-${charIndex}`}
                initial={{ y: '100%' }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-100%' }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  delay: charIndex * 0.05,
                }}
                className="absolute inset-0 flex items-center justify-center font-mono text-base leading-none font-medium will-change-transform"
              >
                {char}
              </motion.span>
            </AnimatePresence>
          </span>
          {charIndex === 2 && <div />}
        </Fragment>
      ))}
    </div>
  );
};
