import React from 'react';
import { IndustrialCard } from '../ui/IndustrialCard';
import { AlertTriangle, Wheat } from 'lucide-react';

export const AgroAdvisory = ({ alerts }) => {
  return (
    <IndustrialCard className="h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-recessed rounded-full shadow-recessed">
          <Wheat className="text-text-muted" size={24} />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Agro-Advisory Rules</h2>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, idx) => (
          <div key={idx} className="flex gap-4 p-4 bg-recessed rounded-md shadow-recessed">
            <AlertTriangle className="text-accent shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wide mb-1">{alert.title}</h3>
              <p className="text-sm text-text-muted">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </IndustrialCard>
  );
};