import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTiltEffect } from '../../hooks/useTiltEffect';
import { cn } from '../../utils/cn';

export const TiltCard = ({ children, className = '', maxAngle = 8, parallaxOffset = 30 }) => {
  const tiltRef = useTiltEffect(maxAngle);
  const containerRef = useRef(null);

  // Track scroll position of this card in the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smoothly translate card vertically relative to viewport scroll progress
  // scrolling down moves the card UP (negative y) creating depth
  const y = useTransform(scrollYProgress, [0, 1], [parallaxOffset, -parallaxOffset]);

  return (
    <motion.div
      ref={containerRef}
      style={{ y }}
      className="w-full flex justify-center relative"
    >
      <div
        ref={tiltRef}
        className={cn(
          'will-change-transform transform-gpu transform-style-preserve-3d w-full',
          className
        )}
      >
        {children}
      </div>
    </motion.div>
  );
};
