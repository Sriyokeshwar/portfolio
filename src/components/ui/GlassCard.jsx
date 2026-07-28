import React from 'react';
import { cn } from '../../utils/cn';

export const GlassCard = ({
  children,
  className = '',
  contentClassName = '',
  hoverGlow = true,
  glowColor = 'rgba(96, 165, 250, 0.24)',
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      style={{ '--card-glow-color': glowColor }}
      className={cn(
        'liquid-glass rounded-[24px] p-6 relative overflow-hidden transition-all duration-500 group transform-gpu transform-style-preserve-3d active:scale-[0.98] active:brightness-95 md:active:scale-100 md:active:brightness-100',
        hoverGlow &&
          'hover:border-primary/40 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(2,6,23,0.32)]',
        className
      )}
      {...props}
    >
      {/* Dynamic Specular Sheen (Mouse-following reflection light overlay) */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-screen z-20"
        style={{
          background: `radial-gradient(circle 320px at var(--mx, 50%) var(--my, 50%), rgba(255, 255, 255, 0.16), transparent 78%)`,
        }}
      />

      {/* Dynamic Back-Glow Bloom (Glow matching category color following the cursor) */}
      {hoverGlow && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl -z-10"
          style={{
            background: `radial-gradient(circle 200px at var(--mx, 50%) var(--my, 50%), var(--card-glow-color), transparent 80%)`,
          }}
        />
      )}

      {/* Ambient Mobile/Tablet Static Pulsing Glow */}
      {!hoverGlow && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none blur-3xl -z-10 animate-pulse-slow"
          style={{
            background: `radial-gradient(circle 180px at 50% 50%, var(--card-glow-color), transparent 85%)`,
          }}
        />
      )}

      {/* High-quality premium top border highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity" />

      {/* Central content container preserving 3D stack */}
      <div className={cn("relative z-10 transform-style-preserve-3d", contentClassName)}>{children}</div>
    </div>
  );
};
