import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CursorTrail = () => {
  const [particles, setParticles] = useState([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || 'ontouchstart' in window) return;

    let lastTime = 0;

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < 40) return; // limit rate
      lastTime = now;

      const newParticle = {
        id: `${now}-${Math.random()}`,
        x: e.clientX,
        y: e.clientY,
      };

      setParticles((prev) => [...prev.slice(-12), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.6, scale: 1, x: p.x - 3, y: p.y - 3 }}
            animate={{ opacity: 0, scale: 0.2, y: p.y - 15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute w-2 h-2 rounded-full bg-primary/40 blur-[1px]"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
