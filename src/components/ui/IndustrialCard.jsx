import React from 'react';

export const IndustrialCard = ({ children, className = '', hideVents = false }) => {
  return (
    <div className={`relative rounded-lg bg-chassis p-6 shadow-card hover:-translate-y-1 hover:shadow-floating transition-all duration-300 ease-out bg-screws ${className}`}>
      {!hideVents && (
        <div className="absolute top-4 right-4 flex gap-1">
          <div className="h-6 w-1 rounded-full bg-recessed shadow-recessed" />
          <div className="h-6 w-1 rounded-full bg-recessed shadow-recessed" />
          <div className="h-6 w-1 rounded-full bg-recessed shadow-recessed" />
        </div>
      )}
      <div className="relative z-10 pt-2">{children}</div>
    </div>
  );
};