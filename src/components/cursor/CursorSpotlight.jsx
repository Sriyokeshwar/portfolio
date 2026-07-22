import React from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CursorSpotlight = () => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(249, 115, 22, 0.06), transparent 80%)`,
      }}
    />
  );
};
