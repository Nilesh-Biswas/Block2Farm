import React from 'react';

export const LEDIndicator = ({ status = 'online', label }) => {
  const isOnline = status === 'online';
  return (
    <div className="flex items-center gap-2">
      <div className={`h-2.5 w-2.5 rounded-full ${isOnline ? 'bg-green-500 shadow-led-green' : 'bg-accent shadow-led-red'} animate-pulse`} />
      {label && <span className="font-mono text-xs font-bold tracking-widest text-text-muted">{label}</span>}
    </div>
  );
};