import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Maximize2, MoveHorizontal } from 'lucide-react';

export const CustomCursor = () => {
  const { cursorState } = useCursor();
  const prefersReducedMotion = useReducedMotion();
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, prefersReducedMotion]);

  if (isTouchDevice || !isVisible) return null;

  const isHovered = cursorState.type !== 'default';

  return (
    <>
      {/* Primary Small Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: coords.x - 5,
          y: coords.y - 5,
          scale: cursorState.type === 'text' ? 0.3 : isHovered ? 0.5 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* Expanding Ring & Tooltip Label */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-primary/60 pointer-events-none z-50 flex items-center justify-center backdrop-blur-[2px]"
        animate={{
          x: coords.x - (isHovered ? 28 : 16),
          y: coords.y - (isHovered ? 28 : 16),
          width: isHovered ? 56 : 32,
          height: isHovered ? 56 : 32,
          backgroundColor: isHovered ? 'rgba(249, 115, 22, 0.12)' : 'transparent',
          borderColor: isHovered ? 'rgba(249, 115, 22, 0.8)' : 'rgba(249, 115, 22, 0.3)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.2 }}
      >
        {cursorState.label && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            {cursorState.label}
          </span>
        )}
        {cursorState.type === 'hover-image' && !cursorState.label && (
          <Maximize2 className="w-4 h-4 text-primary" />
        )}
        {cursorState.type === 'hover-drag' && !cursorState.label && (
          <MoveHorizontal className="w-4 h-4 text-primary" />
        )}
      </motion.div>
    </>
  );
};
