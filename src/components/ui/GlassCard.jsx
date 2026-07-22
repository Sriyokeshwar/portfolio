import React from 'react';
import { cn } from '../../utils/cn';

export const GlassCard = ({
  children,
  className = '',
  hoverGlow = true,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'glass-panel rounded-3xl p-6 relative overflow-hidden transition-all duration-500 group',
        hoverGlow &&
          'hover:border-primary/40 hover:shadow-glow hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {/* Subtle top-light gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
      {children}
    </div>
  );
};
