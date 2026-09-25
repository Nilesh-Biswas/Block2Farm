import React from 'react';
import { CloudRain, Thermometer, Wind, Loader2, Zap } from 'lucide-react';
import { SoftWell, SoftBadge, SectionHeader } from '../ui/Neumorphic';

const StatCell = ({ icon: Icon, iconColor, glowColor, value, unit, label }) => (
  <div className="flex flex-col items-center p-4 rounded-xl bg-bg-base border border-subtle/20 group transition-all duration-300 hover:border-accent/20">
    <div className={`p-2.5 rounded-lg mb-3 border transition-all duration-300 ${glowColor}`}>
      <Icon size={18} className={iconColor} />
    </div>
    <span className="font-display font-extrabold text-2xl text-foreground tabular-nums tracking-tight">
      {value}<span className="text-sm text-muted ml-0.5 font-semibold">{unit}</span>
    </span>
    <span className="text-[9px] font-bold tracking-[0.25em] text-muted mt-2 uppercase">{label}</span>
  </div>
);

export const WeatherTerminal = ({ data, isProcessing }) => {
  return (
    <div className="glass-card rounded-[var(--radius-card)] p-5 h-full flex flex-col justify-between shadow-card border border-subtle/30">
      {/* Header */}
      <SectionHeader
        icon={Zap}
        title="Live Telemetry"
        subtitle={isProcessing ? 'Processing…' : 'Real-time feed'}
        badge={
          isProcessing ? (
            <SoftBadge variant="warning" pulse>Syncing</SoftBadge>
          ) : (
            <SoftBadge variant="success">
              <span className="relative flex h-1.5 w-1.5">
                <span className="dot-pulse absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
              </span>
              Online
            </SoftBadge>
          )
        }
      >
        <span className="font-mono text-[10px] text-muted/40 tracking-wider hidden sm:block">
          {isProcessing ? '▓▓▓▓▓▓▓' : 'STREAM::OK'}
        </span>
      </SectionHeader>

      {/* Data Grid */}
      <div className={`grid grid-cols-3 gap-3 transition-all duration-500 ${isProcessing ? 'opacity-20 blur-[3px]' : 'opacity-100'}`}>
        <StatCell 
          icon={Thermometer} iconColor="text-critical" 
          glowColor="bg-critical/5 border-critical/15 group-hover:border-critical/30" 
          value={data.temp} unit="°C" label="Temp" 
        />
        <StatCell 
          icon={CloudRain} iconColor="text-cyan" 
          glowColor="bg-cyan-dim border-cyan/15 group-hover:border-cyan/30" 
          value={data.rain} unit="mm" label="Rain" 
        />
        <StatCell 
          icon={Wind} iconColor="text-accent-light" 
          glowColor="bg-accent-dim border-accent/15 group-hover:border-accent/30" 
          value={data.wind} unit="km/h" label="Wind" 
        />
      </div>
    </div>
  );
};