import React from 'react';
import { useTiltEffect } from '../../hooks/useTiltEffect';
import { cn } from '../../utils/cn';

export const TiltCard = ({ children, className = '', maxAngle = 8 }) => {
  const tiltRef = useTiltEffect(maxAngle);

  return (
    <div
      ref={tiltRef}
      className={cn(
        'will-change-transform transform-gpu transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
};
