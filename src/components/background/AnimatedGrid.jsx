import React from 'react';

export const AnimatedGrid = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-30 select-none">
      <div 
        className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] animate-grid-drift"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Dynamic line sweep effect */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent top-0 animate-sweep pointer-events-none" />
    </div>
  );
};
