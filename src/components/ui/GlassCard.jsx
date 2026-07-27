import React from 'react';
import { cn } from '../../utils/cn';

export const GlassCard = ({
  children,
  className = '',
  hoverGlow = true,
  glowColor = 'rgba(249, 115, 22, 0.25)', // Primary orange default
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      style={{ '--card-glow-color': glowColor }}
      className={cn(
        'glass-panel rounded-3xl p-6 relative overflow-hidden transition-all duration-500 group transform-gpu transform-style-preserve-3d',
        hoverGlow &&
          'hover:border-primary/45 hover:shadow-glass hover:-translate-y-1.5',
        className
      )}
      {...props}
    >
      {/* Dynamic Specular Sheen (Mouse-following reflection light overlay) */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay z-20"
        style={{
          background: `radial-gradient(circle 350px at var(--mx, 50%) var(--my, 50%), rgba(255, 255, 255, 0.12), transparent 80%)`,
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

      {/* High-quality premium top border highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />

      {/* Central content container preserving 3D stack */}
      <div className="relative z-10 transform-style-preserve-3d">{children}</div>
    </div>
  );
};
