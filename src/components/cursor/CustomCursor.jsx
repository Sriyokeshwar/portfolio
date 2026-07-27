import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Maximize2, MoveHorizontal } from 'lucide-react';
import { tokens } from '../../theme/tokens';

export const CustomCursor = () => {
  const { cursorState } = useCursor();
  const prefersReducedMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use Framer Motion raw values + springs for smooth lag-free GPU cursor trails
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotSpringConfig = { damping: 40, stiffness: 700, mass: 0.08 };
  const ringSpringConfig = { damping: 28, stiffness: 220, mass: 0.5 }; // Slower, heavier spring for high-fidelity trail

  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);
  
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
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
  
  // Adaptive custom colors matching theme tokens
  let cursorColor = tokens.colors.primary; // Orange default
  if (cursorState.label?.toLowerCase() === 'code' || cursorState.type === 'hover-link') {
    cursorColor = tokens.colors.primary;
  } else if (cursorState.label?.toLowerCase() === 'live' || cursorState.label?.toLowerCase() === 'contact') {
    cursorColor = tokens.colors.secondary; // Cyan
  } else if (cursorState.label?.toLowerCase() === 'resume') {
    cursorColor = tokens.colors.accent; // Violet
  }

  const ringBackgroundColor = isHovered ? `${cursorColor}1A` : 'rgba(0, 0, 0, 0)';

  return (
    <>
      {/* Primary Dot (Stiff spring, follows pointer instantly, uses Difference mix-blend) */}
      <motion.div
        className="fixed w-2 h-2 rounded-full pointer-events-none mix-blend-difference -translate-x-1/2 -translate-y-1/2"
        style={{
          left: dotX,
          top: dotY,
          backgroundColor: cursorColor,
          zIndex: tokens.zIndex.cursor,
        }}
        animate={{
          scale: cursorState.type === 'text' ? 0.3 : isHovered ? 0.6 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450 }}
      />

      {/* Outer Ring & Label (Bouncy lag/trail spring, expands and morphs on hover) */}
      <motion.div
        className="fixed rounded-full border pointer-events-none flex items-center justify-center backdrop-blur-[1px] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: ringX,
          top: ringY,
          borderColor: cursorColor,
          zIndex: tokens.zIndex.cursor,
        }}
        animate={{
          width: isHovered ? 64 : 28,
          height: isHovered ? 64 : 28,
          backgroundColor: ringBackgroundColor,
          boxShadow: isHovered ? `0 0 16px ${cursorColor}4D` : 'none', // Glow
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
      >
        {cursorState.label && (
          <span 
            className="text-[9px] font-extrabold uppercase tracking-widest"
            style={{ color: cursorColor }}
          >
            {cursorState.label}
          </span>
        )}
        {cursorState.type === 'hover-image' && !cursorState.label && (
          <Maximize2 className="w-3.5 h-3.5" style={{ color: cursorColor }} />
        )}
        {cursorState.type === 'hover-drag' && !cursorState.label && (
          <MoveHorizontal className="w-3.5 h-3.5" style={{ color: cursorColor }} />
        )}
      </motion.div>
    </>
  );
};
