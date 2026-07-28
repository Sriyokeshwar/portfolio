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
    'relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full select-none overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary/40 transform-gpu z-10 backdrop-blur-2xl';

  const variants = {
    primary:
      'bg-gradient-to-r from-primary/90 via-secondary/80 to-accent/80 text-white shadow-[0_12px_35px_rgba(96,165,250,0.24)] hover:shadow-[0_16px_45px_rgba(96,165,250,0.28)] hover:brightness-105',
    secondary:
      'bg-gradient-to-r from-secondary/90 to-accent/70 text-white shadow-[0_12px_35px_rgba(34,211,238,0.18)] hover:shadow-[0_16px_45px_rgba(34,211,238,0.24)] hover:brightness-105',
    outline:
      'border border-white/15 text-text-primary bg-white/8 hover:border-primary/35 hover:bg-white/12',
    ghost:
      'text-text-muted hover:text-text-primary hover:bg-white/8',
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
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-screen"
        style={{
          background: `radial-gradient(circle 70px at var(--mx, 50%) var(--my, 50%), rgba(255, 255, 255, 0.28), transparent 82%)`,
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
