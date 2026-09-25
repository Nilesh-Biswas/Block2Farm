import React from 'react';

export const IndustrialButton = ({ children, variant = 'secondary', icon: Icon, onClick, className = '' }) => {
  const baseStyles = "relative flex items-center justify-center gap-2 px-6 py-3 rounded-md font-bold uppercase tracking-widest text-sm transition-all duration-150 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-[2px] active:shadow-pressed focus:outline-none min-h-[48px]";
  const variants = {
    primary: "bg-accent text-accent-foreground shadow-btn-primary hover:brightness-110",
    secondary: "bg-chassis text-text-primary shadow-card hover:text-accent",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};