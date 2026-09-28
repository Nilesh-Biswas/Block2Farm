import React from 'react';
import { ShieldCheck, ShieldAlert, Wheat, MapPin, CheckCircle2 } from 'lucide-react';

export const AdvisoryPanel = ({ alerts, isProcessing, language }) => {
  // We'll hardcode the critical layout to match the exact Tailwind specs requested
  const hasCritical = alerts.some(a => a.type === 'critical');

  return (
    <div className="h-full bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col">
      {/* 1. Main Container & Header */}
      <div className="flex items-center gap-2 mb-5">
        <MapPin size={22} className="text-slate-400" />
        <div>
          <h2 className="text-white font-bold text-lg leading-tight">PostGIS Rule Advisories</h2>
          <p className="text-slate-400 text-sm">
            {isProcessing ? 'Evaluating spatial intersections...' : (hasCritical ? '1 spatial rule matched' : '0 spatial rules matched')}
          </p>
        </div>
      </div>

      <div className={`flex-1 transition-all duration-500 ${isProcessing ? 'opacity-20 blur-[3px]' : 'opacity-100'}`}>
        {!hasCritical ? (
          <div className="flex flex-col items-center justify-center py-10 text-center h-full">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-3">
              <ShieldCheck size={28} className="text-emerald-400" />
            </div>
            <p className="text-slate-400 text-sm font-medium">
              All clear. No spatial rules intersected.
            </p>
          </div>
        ) : (
          /* 2. The Alert Card (Inner Container) */
          <div className="bg-slate-800/50 border-l-4 border-red-500 p-5 rounded-r-lg flex flex-col animate-fade-in relative">
            
            {/* Grid layout to keep icon isolated on the left, and all text perfectly flush on the right */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <ShieldAlert size={18} className="text-red-500" />
              </div>
              
              <div className="flex-1 flex flex-col">
                {/* 3. Card Header (Flex Row) */}
                <div className="flex items-center justify-between w-full">
                  <h3 className="font-bold text-white text-base tracking-wide">PostGIS Flood Alert</h3>
                  <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-xs px-2 py-0.5 rounded font-bold tracking-wider uppercase">
                    CRITICAL
                  </span>
                </div>
                
                {/* 4. Context Badge */}
                <div className="mt-2">
                  <span className="bg-amber-500/10 text-amber-400 text-xs font-mono px-2 py-1 rounded w-max inline-block">
                    Target: Wheat (Harvest Stage)
                  </span>
                </div>

                {/* 5. Body Text */}
                <p className="text-slate-300 text-sm leading-relaxed mt-2.5">
                  <span className="text-slate-100 font-semibold">30m DEM</span> inference shows orographic pooling. <span className="text-slate-100 font-semibold">35mm rain expected</span>. <span className="text-slate-100 font-semibold">Suspend irrigation immediately</span>.
                </p>
              </div>
            </div>

            {/* 6. Automated Status Footer */}
            <div className="mt-4 pt-3 border-t border-slate-700 flex flex-row items-center w-full">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono bg-emerald-500/10 px-3 py-2 rounded-md w-full">
                <CheckCircle2 size={14} className="shrink-0" />
                <span>Auto-SMS Dispatched via Bhashini (Hindi)</span>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
