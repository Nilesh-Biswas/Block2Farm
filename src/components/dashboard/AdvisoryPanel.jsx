import React from 'react';
import { SoftCard, SoftBadge, SectionHeader } from '../ui/Neumorphic';
import { ShieldCheck, ShieldAlert, AlertTriangle, Wheat } from 'lucide-react';

const alertConfig = {
  critical: {
    icon: ShieldAlert,
    badgeVariant: 'critical',
    iconBg: 'bg-critical/10 border-critical/20',
    iconColor: 'text-critical',
    borderColor: 'border-l-critical/60',
    label: 'Critical',
  },
  warning: {
    icon: AlertTriangle,
    badgeVariant: 'warning',
    iconBg: 'bg-warning/10 border-warning/20',
    iconColor: 'text-warning',
    borderColor: 'border-l-warning/60',
    label: 'Warning',
  },
  safe: {
    icon: ShieldCheck,
    badgeVariant: 'success',
    iconBg: 'bg-success/10 border-success/20',
    iconColor: 'text-success',
    borderColor: 'border-l-success/60',
    label: 'Safe',
  },
};

const AlertItem = ({ alert, index }) => {
  const config = alertConfig[alert.type] || alertConfig.safe;
  const Icon = config.icon;

  return (
    <div
      className={`
        flex gap-3.5 p-4 rounded-xl 
        bg-bg-base/60 border border-subtle/20
        border-l-[3px] ${config.borderColor}
        transition-all duration-300 hover:bg-bg-elevated/40 hover:border-subtle/30
        animate-fade-in
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`shrink-0 p-2 rounded-lg border ${config.iconBg}`}>
        <Icon className={config.iconColor} size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="font-semibold text-foreground text-sm leading-tight">{alert.title}</h3>
          <SoftBadge variant={config.badgeVariant}>{config.label}</SoftBadge>
        </div>
        <p className="text-xs text-muted leading-relaxed">{alert.message}</p>
      </div>
    </div>
  );
};

export const AdvisoryPanel = ({ alerts, isProcessing }) => {
  return (
    <SoftCard className="h-full !p-5">
      <SectionHeader
        icon={Wheat}
        title="Agro-Advisories"
        subtitle={`${alerts.length} active ${alerts.length === 1 ? 'alert' : 'alerts'}`}
      />

      <div className={`space-y-2.5 transition-all duration-500 ${isProcessing ? 'opacity-20 blur-[3px]' : 'opacity-100'}`}>
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="p-3 rounded-xl bg-success/5 border border-success/10 mb-3">
              <ShieldCheck size={28} className="text-success/40" />
            </div>
            <p className="text-muted text-sm font-medium">All clear. No active alerts.</p>
          </div>
        ) : (
          alerts.map((alert, idx) => (
            <AlertItem key={idx} alert={alert} index={idx} />
          ))
        )}
      </div>
    </SoftCard>
  );
};