import React from 'react';

// --- Glass Card (Primary container) ---
export const SoftCard = ({ children, className = '', glow = false }) => (
  <div className={`
    glass-card rounded-[var(--radius-card)] p-6 
    shadow-card transition-all duration-300 
    hover:shadow-card-hover hover:-translate-y-[1px]
    ${glow ? 'border-accent/20 shadow-glow-accent' : ''}
    ${className}
  `}>
    {children}
  </div>
);

// --- Tactile Button ---
export const SoftButton = ({ children, onClick, active, disabled, variant = 'default', size = 'md', className = '' }) => {
  const baseStyle = `
    relative flex items-center justify-center gap-2 
    rounded-[var(--radius-base)] font-semibold 
    transition-all duration-200 ease-out
    select-none cursor-pointer border
  `;

  const sizes = {
    sm: 'px-4 py-2 text-xs min-h-[36px]',
    md: 'px-5 py-2.5 text-sm min-h-[44px]',
    lg: 'px-8 py-3.5 text-base min-h-[52px]',
  };
  
  const defaultStyle = active 
    ? "bg-accent/15 text-accent border-accent/30 shadow-[inset_0_0_20px_rgba(124,106,255,0.1)]" 
    : "bg-bg-surface text-foreground/80 border-subtle/50 hover:border-accent/30 hover:text-accent hover:bg-accent/5 active:scale-[0.97]";
    
  const primaryStyle = `
    bg-gradient-to-r from-accent to-[#5b4fcf] text-white border-transparent
    shadow-glow-accent hover:shadow-[0_0_30px_var(--color-accent-glow)]
    active:scale-[0.97]
  `;

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`
        ${baseStyle} ${sizes[size]}
        ${variant === 'primary' ? primaryStyle : defaultStyle} 
        ${disabled ? 'opacity-30 cursor-not-allowed pointer-events-none' : ''} 
        ${className}
      `}
    >
      {children}
    </button>
  );
};

// --- Glass Well (Inset container for maps/charts) ---
export const SoftWell = ({ children, className = '' }) => (
  <div className={`
    bg-bg-deep/50 rounded-[var(--radius-card)] overflow-hidden
    shadow-inset border border-subtle/20 relative
    ${className}
  `}>
    {children}
  </div>
);

// --- Glowing Status Badge ---
export const SoftBadge = ({ children, variant = 'default', pulse = false, className = '' }) => {
  const variants = {
    default: 'bg-bg-elevated text-muted border-subtle/30',
    accent: 'bg-accent/15 text-accent border-accent/30 shadow-glow-accent',
    success: 'bg-success/15 text-success border-success/30 shadow-glow-cyan',
    warning: 'bg-warning/15 text-warning border-warning/30',
    critical: 'bg-critical/15 text-critical border-critical/30',
    cyan: 'bg-cyan/15 text-cyan border-cyan/30 shadow-glow-cyan',
  };

  return (
    <span className={`
      inline-flex items-center gap-1.5 px-2.5 py-0.5 
      rounded-full text-[10px] font-bold uppercase tracking-wider border
      backdrop-blur-md
      ${variants[variant] || variants.default}
      ${pulse ? 'animate-pulse' : ''}
      ${className}
    `}>
      {children}
    </span>
  );
};

// --- Section Header with Icon ---
export const SectionHeader = ({ icon: Icon, title, subtitle, badge, children }) => (
  <div className="flex items-start justify-between gap-4 mb-4">
    <div className="flex items-start gap-3">
      {Icon && (
        <div className="p-2 rounded-lg bg-bg-elevated border border-subtle/30 shrink-0">
          <Icon size={18} className="text-accent" />
        </div>
      )}
      <div>
        <h3 className="font-display font-semibold text-foreground text-lg tracking-tight">{title}</h3>
        {subtitle && (
          <p className="text-muted text-sm mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
    <div className="flex items-center gap-3 shrink-0">
      {children}
      {badge}
    </div>
  </div>
);