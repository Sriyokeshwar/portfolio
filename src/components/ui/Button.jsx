import React, { useState } from 'react';
import { useMagneticHover } from '../../hooks/useMagneticHover';
import { useCursor } from '../../context/CursorContext';
import { cn } from '../../utils/cn';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  href,
  onClick,
  className = '',
  icon: Icon,
  magnetic = true,
  cursorLabel,
  ...props
}) => {
  const magneticRef = useMagneticHover(magnetic ? 0.35 : 0);
  const { setCursor, resetCursor } = useCursor();
  const [ripples, setRipples] = useState([]);

  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-[background-color,border-color,color,box-shadow] duration-300 rounded-full select-none overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary/50 transform-gpu z-10';

  const variants = {
    primary:
      'bg-gradient-to-r from-primary via-orange-500 to-amber-500 text-white shadow-glow hover:shadow-orange-500/70 hover:brightness-110',
    secondary:
      'bg-gradient-to-r from-secondary to-cyan-500 text-white shadow-cyanGlow hover:shadow-cyan-500/70 hover:brightness-110',
    outline:
      'border border-surface-border text-text-primary bg-bg-card/40 backdrop-blur-md hover:border-primary/50 hover:bg-primary/10',
    ghost:
      'text-text-muted hover:text-text-primary hover:bg-white/5',
  };

  const sizes = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-3 gap-2',
    lg: 'text-base px-8 py-4 gap-2.5 font-semibold',
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      ref={magneticRef}
      href={href}
      onClick={handleClick}
      onMouseEnter={() =>
        cursorLabel ? setCursor('hover-link', cursorLabel) : setCursor('hover-link')
      }
      onMouseLeave={resetCursor}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {/* Dynamic Specular Sheen (Mouse-following reflection shine) */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
        style={{
          background: `radial-gradient(circle 60px at var(--mx, 50%) var(--my, 50%), rgba(255, 255, 255, 0.4), transparent 80%)`,
        }}
      />

      {/* Ripple elements */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/40 rounded-full animate-ping pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 100,
            height: 100,
          }}
        />
      ))}

      {Icon && <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />}
      <span className="relative z-10">{children}</span>
    </Component>
  );
};
