import React from 'react';

export const AuroraMesh = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top-right vibrant orange gradient blob */}
      <div className="absolute -top-32 -right-32 w-96 h-96 md:w-[32rem] md:h-[32rem] rounded-full bg-gradient-to-br from-primary/30 to-orange-600/10 blur-[100px] animate-pulse-slow" />

      {/* Bottom-left cyan gradient blob */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-full bg-gradient-to-tr from-secondary/25 to-cyan-500/10 blur-[110px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Center violet ambient mesh */}
      <div className="absolute bottom-10 right-1/4 w-96 h-96 md:w-[34rem] md:h-[34rem] rounded-full bg-gradient-to-tl from-accent/20 to-purple-800/10 blur-[120px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
    </div>
  );
};
