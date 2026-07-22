import React from 'react';
import { cn } from '../../utils/cn';

export const LiquidGlassLayer = ({ children, className = '' }) => {
  return (
    <div className={cn('relative rounded-3xl overflow-hidden liquid-glass', className)}>
      {/* Light sheen specular reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
