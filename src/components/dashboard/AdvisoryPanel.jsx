import React from 'react';
import { SoftCard, SoftBadge, SectionHeader } from '../ui/Neumorphic';
import { ShieldCheck, ShieldAlert, AlertTriangle, Wheat, Send, CheckCircle2 } from 'lucide-react';

const alertConfig = {
  critical: {
    icon: ShieldAlert,
    badgeVariant: 'critical',
    iconBg: 'bg-critical/10 border-critical/20',
    iconColor: 'text-critical',
    borderColor: 'border-l-critical/60',
    labelEn: 'Critical',
    labelHi: 'गंभीर',
  },
  warning: {
    icon: AlertTriangle,
    badgeVariant: 'warning',
    iconBg: 'bg-warning/10 border-warning/20',
    iconColor: 'text-warning',
    borderColor: 'border-l-warning/60',
    labelEn: 'Warning',
    labelHi: 'चेतावनी',
  },
  safe: {
    icon: ShieldCheck,
    badgeVariant: 'success',
    iconBg: 'bg-success/10 border-success/20',
    iconColor: 'text-success',
    borderColor: 'border-l-success/60',
    labelEn: 'Safe',
    labelHi: 'सुरक्षित',
  },
};

const AlertItem = ({ alert, index, language, onSendSMS }) => {
  const config = alertConfig[alert.type] || alertConfig.safe;
  const Icon = config.icon;
  
  const displayTitle = language === 'hi' ? alert.titleHi : alert.title;
  const displayBadge = language === 'hi' ? config.labelHi : config.labelEn;
  const displayMessage = language === 'hi' ? alert.messageHi : alert.message;

  const [sent, setSent] = React.useState(false);

  const handleSMS = () => {
    setSent(true);
    if (onSendSMS) onSendSMS(alert);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div
      className={`
        flex gap-3.5 p-4 rounded-xl 
        bg-bg-base/60 border border-subtle/20
        border-l-[3px] ${config.borderColor}
        transition-all duration-300 hover:bg-bg-elevated/40 hover:border-subtle/30
        animate-fade-in relative
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`shrink-0 p-2 rounded-lg border ${config.iconBg}`}>
        <Icon className={config.iconColor} size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1 flex-wrap pr-8">
          <h3 className="font-semibold text-foreground text-sm leading-tight">{displayTitle}</h3>
          <SoftBadge variant={config.badgeVariant}>{displayBadge}</SoftBadge>
        </div>
        <p className="text-xs text-muted leading-relaxed">{displayMessage}</p>
        
        {/* SMS Broadcast Action for Warnings/Critical */}
        {(alert.type === 'critical' || alert.type === 'warning') && (
          <button 
            onClick={handleSMS}
            disabled={sent}
            className={`absolute right-3 top-3 p-1.5 rounded-md transition-all duration-200 ${
              sent ? 'text-success bg-success/10 cursor-default' : 'text-muted hover:text-accent hover:bg-accent/10 cursor-pointer'
            }`}
            title={language === 'hi' ? 'किसानों को SMS भेजें' : 'Broadcast SMS to Farmers'}
          >
            {sent ? <CheckCircle2 size={14} /> : <Send size={14} />}
          </button>
        )}
      </div>
    </div>
  );
};

export const AdvisoryPanel = ({ alerts, isProcessing, language, onSendSMS }) => {
  return (
    <SoftCard className="h-full !p-5">
      <SectionHeader
        icon={Wheat}
        title={language === 'hi' ? "स्थानीय फसल सलाह" : "PostGIS Rule Advisories"}
        subtitle={isProcessing 
          ? (language === 'hi' ? 'स्थानिक डेटा का मूल्यांकन...' : 'Evaluating spatial intersections…') 
          : `${alerts.length} ${language === 'hi' ? 'सलाह' : 'spatial rules matched'}`}
      />

      <div className={`space-y-2.5 transition-all duration-500 ${isProcessing ? 'opacity-20 blur-[3px]' : 'opacity-100'}`}>
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="p-3 rounded-xl bg-success/5 border border-success/10 mb-3">
              <ShieldCheck size={28} className="text-success/40" />
            </div>
            <p className="text-muted text-sm font-medium">
              {language === 'hi' ? 'सब सुरक्षित है। कोई चेतावनी नहीं।' : 'All clear. No active alerts.'}
            </p>
          </div>
        ) : (
          alerts.map((alert, idx) => (
            <AlertItem key={idx} alert={alert} index={idx} language={language} onSendSMS={onSendSMS} />
          ))
        )}
      </div>
    </SoftCard>
  );
};