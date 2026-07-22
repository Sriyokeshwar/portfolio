import React from 'react';
import { cn } from '../../utils/cn';

export const Badge = ({
  children = 'Available for Roles & Internships',
  status = 'active',
  className = '',
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide bg-success/10 text-success border border-success/30 backdrop-blur-md shadow-sm',
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
      </span>
      <span>{children}</span>
    </div>
  );
};
