import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const ProgressBar = () => {
  const completion = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-primary via-orange-400 to-secondary transition-all duration-150 ease-out shadow-[0_0_10px_rgba(249,115,22,0.8)]"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
};
